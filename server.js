const express = require("express");
const axios = require("axios");
const crypto = require("crypto");
const fs = require("fs");
const http = require("http");
const https = require("https");
const path = require("path");
const { exec, execFile } = require("child_process");
const { promisify } = require("util");
const execFileAsync = promisify(execFile);
const { SocksProxyAgent } = require("socks-proxy-agent");
const { STATE_CODE_ROWS } = require("./stateCodes");
const { CITY_CODE_ROWS } = require("./cityCodes");
const { ISP_CODE_ROWS } = require("./ispCodes");

/**
 * sing-box / 9proxy 简易控制台：聚合本机 9proxy 端口 API、代理列表、按 tag 切换并写 CONFIG_PATH；
 * 自定义远端 SOCKS 使用独立接口 `/api/switch-proxy-custom`。根路径 `/` 为静态 HTML 管理页。
 */
const app = express();
app.use(express.json({ limit: "64kb" }));
/** 本服务监听端口 */
const PORT = 3000;
/** sing-box 主配置路径（切换代理时会改写其中 SOCKS 出站） */
const CONFIG_PATH = "/etc/v2ray-agent/sing-box/conf/config.json";
/** 出站与 WiFi 名称等元数据，不参与 sing-box 路由语法 */
const USER_META_PATH = "/etc/v2ray-agent/sing-box/conf/proxy-user-meta.json";
/** 用户粘贴保存的 SOCKS5 代理（明文账密，与 sing-box 出站切换配合） */
const CUSTOM_PROXIES_PATH = path.join(
    path.dirname(USER_META_PATH),
    "custom-proxies.json"
);
/** 缓存最近一次 9proxy today_list 原始返回，便于排查上游数据问题 */
const TODAY_LIST_CACHE_PATH = path.join(
    path.dirname(USER_META_PATH),
    "today-list-cache.json"
);
/** ipinfo 州/省字段缓存（历史兼容） */
const IPINFO_CACHE = new Map();
/** ipinfo 国家/州/市缓存 */
const IP_GEO_CACHE = new Map();
/** 本机 9proxy 应用 HTTP 根地址（端口 API、today_list、forward 等） */
const NINE_PROXY_BASE = "http://127.0.0.1:8080";
/**
 * Node 上 axios 会默认使用环境变量里的 HTTP(S)_PROXY；PM2/systemd 常继承系统代理，
 * 导致访问本机 9proxy(127.0.0.1) 或 ipinfo 失败，而交互式 `node server.js` 无代理则正常。
 */
const AXIOS_OPTS_NO_PROXY = { proxy: false };
/** 未安装或未启动 9proxy 时各接口降级提示（仍可用用户管理、直连、自定义 SOCKS5） */
const NINE_PROXY_UNAVAILABLE_HINT =
    "代理服务未安装或未启动（本机端口无响应），今日代理与端口转发不可用；仍可使用用户管理、直连与自定义 SOCKS5。";
/** 供 today_list 降级：与 mergeCustomProxiesIntoList 兼容的空列表体 */
function emptyNineProxyTodayListBody() {
    return {
        data: [],
        nine_proxy_available: false,
        nine_proxy_message: NINE_PROXY_UNAVAILABLE_HINT
    };
}
/** 当 setting -d 解析失败时使用的默认本地端口起点 */
const DEFAULT_LOCAL_SOCKS_PORT = 60000;
/** 当 setting -d 解析失败时使用的默认端口数量 */
const DEFAULT_LOCAL_SOCKS_PORT_NUM = 256;

/**
 * 本机 9proxy CLI 路径（`setting -d`、`auth`、`proxy -b`）。
 * systemd/PM2 下 PATH 可能不含 `9proxy` 时，请设置环境变量 `NINE_PROXY_CLI` 为绝对路径。
 */
const NINE_PROXY_CLI = process.env.NINE_PROXY_CLI
    ? String(process.env.NINE_PROXY_CLI).trim()
    : "9proxy";

/**
 * 执行 9proxy 子进程（参数数组传入，避免 shell 注入）。
 * @param {string[]} args
 * @param {number} [timeoutMs]
 * @returns {Promise<{ ok: boolean, stdout: string, stderr: string, code: number|null, error?: string }>}
 */
async function nineProxyExecFile(args, timeoutMs) {
    const t = typeof timeoutMs === "number" && timeoutMs > 0 ? timeoutMs : 20000;
    try {
        const r = await execFileAsync(NINE_PROXY_CLI, args, {
            timeout: t,
            maxBuffer: 4 * 1024 * 1024,
            encoding: "utf8"
        });
        return {
            ok: true,
            stdout: String(r.stdout || ""),
            stderr: String(r.stderr || ""),
            code: 0
        };
    } catch (e) {
        return {
            ok: false,
            stdout: String(e.stdout || ""),
            stderr: String(e.stderr || ""),
            code: typeof e.code === "number" ? e.code : null,
            error: e.message || String(e)
        };
    }
}

/**
 * 自 `9proxy setting -d` 输出解析 `User Logged:`。
 * @param {string} text
 * @returns {boolean|null}
 */
function parseNineProxyUserLogged(text) {
    const m = String(text || "").match(/User\s+Logged:\s*(true|false)/i);
    if (!m) {
        return null;
    }
    return m[1].toLowerCase() === "true";
}

/**
 * 自 `9proxy proxy -b` 表格输出解析「Remaining IPs」列。
 * @param {string} text
 * @returns {number|null}
 */
function parseNineProxyRemainingIps(text) {
    const m = String(text || "").match(/\|\s*Remaining\s+IPs\s*\|\s*([\d\s]+)\s*\|/i);
    if (!m) {
        return null;
    }
    const n = Number(String(m[1]).replace(/\s/g, ""));
    return Number.isFinite(n) ? n : null;
}

/**
 * 将 `setting -d` 输出解析为键值表（如 `Start port`、`Num Port`）。
 * @param {string} text
 * @returns {Record<string, string>}
 */
function parseSettingDumpLines(text) {
    const out = {};
    const lines = String(text || "").split(/\r?\n/);
    for (let i = 0; i < lines.length; i += 1) {
        const line = String(lines[i] || "").trim();
        if (!line) {
            continue;
        }
        const idx = line.indexOf(":");
        if (idx <= 0) {
            continue;
        }
        const key = line.slice(0, idx).trim();
        const val = line.slice(idx + 1).trim();
        if (key) {
            out[key] = val;
        }
    }
    return out;
}

/**
 * 自 `setting -d` 文本解析本地端口范围。
 * @param {string} text
 * @returns {{ start: number, end: number, count: number }|null}
 */
function parsePortRangeFromSettingDump(text) {
    const kv = parseSettingDumpLines(text);
    const start = Number(kv["Start port"]);
    const count = Number(kv["Num Port"]);
    if (!Number.isInteger(start) || !Number.isInteger(count) || start <= 0 || count <= 0) {
        return null;
    }
    const end = start + count - 1;
    if (end > 65535) {
        return null;
    }
    return { start, end, count };
}

/**
 * 读取 `setting -d` 并返回端口范围；失败时回退默认范围。
 * @returns {Promise<{ start: number, end: number, count: number }>}
 */
async function getConfiguredLocalPortRange() {
    const fallback = {
        start: DEFAULT_LOCAL_SOCKS_PORT,
        end: DEFAULT_LOCAL_SOCKS_PORT + DEFAULT_LOCAL_SOCKS_PORT_NUM - 1,
        count: DEFAULT_LOCAL_SOCKS_PORT_NUM
    };
    const r = await nineProxyExecFile(["setting", "-d"], 15000);
    if (!r.ok) {
        return fallback;
    }
    const text = `${String(r.stdout || "")}\n${String(r.stderr || "")}`;
    return parsePortRangeFromSettingDump(text) || fallback;
}

/**
 * 请求 9proxy `today_list`，获取今日可用代理列表原始 JSON。
 * 若 9proxy 未安装或未启动，返回空 `data` 并带 `nine_proxy_available: false`，不抛错（仅自定义代理时仍可正常使用控制台）。
 * @returns {Promise<object>} 9proxy 返回体（含 data 或 proxy.data 等形态）
 */
async function getProxy() {
    try {
        const res = await axios.get(`${NINE_PROXY_BASE}/api/today_list?t=2&limit=200`, {
            ...AXIOS_OPTS_NO_PROXY,
            timeout: 25000
        });
        const body = res.data;
        if (body && typeof body === "object" && !Array.isArray(body)) {
            try {
                const rows = Array.isArray(body.data)
                    ? body.data
                    : Array.isArray(body.proxy?.data)
                        ? body.proxy.data
                        : [];

                const source = `${NINE_PROXY_BASE}/api/today_list?t=2&limit=200`;
                const makeRowKey = (row) => {
                    if (!row || typeof row !== "object") {
                        return "";
                    }
                    if (row.id != null && String(row.id).trim() !== "") {
                        return `id:${String(row.id).trim()}`;
                    }
                    const fallback = [
                        String(row.ip || "").trim(),
                        String(row.port || "").trim(),
                        String(row.username || "").trim(),
                        String(row.password || "").trim()
                    ].join("|");
                    if (fallback.replace(/\|/g, "") !== "") {
                        return `addr:${fallback}`;
                    }
                    return `hash:${crypto.createHash("sha256").update(JSON.stringify(row), "utf8").digest("hex")}`;
                };

                const now = new Date().toISOString();
                const oldEntries = [];
                const oldEntryByKey = new Map();
                try {
                    const oldText = fs.readFileSync(TODAY_LIST_CACHE_PATH, "utf8");
                    const oldObj = JSON.parse(oldText);
                    const legacyRows = Array.isArray(oldObj?.entries)
                        ? oldObj.entries
                        : Array.isArray(oldObj?.payload?.data)
                            ? oldObj.payload.data
                            : Array.isArray(oldObj?.payload?.proxy?.data)
                                ? oldObj.payload.proxy.data
                                : [];
                    for (let i = 0; i < legacyRows.length; i += 1) {
                        const it = legacyRows[i];
                        if (!it || typeof it !== "object") {
                            continue;
                        }
                        const row = it.row && typeof it.row === "object" ? it.row : it;
                        const key = String(it.key || makeRowKey(row)).trim();
                        if (!key || oldEntryByKey.has(key)) {
                            continue;
                        }
                        const wrapped = {
                            key,
                            row,
                            first_seen_at: it.first_seen_at || oldObj?.fetched_at || now,
                            last_seen_at: it.last_seen_at || oldObj?.fetched_at || now
                        };
                        oldEntries.push(wrapped);
                        oldEntryByKey.set(key, wrapped);
                    }
                } catch {
                    // 缓存文件不存在或损坏时，从空集合开始。
                }

                const merged = oldEntries.slice();
                const mergedByKey = new Map(oldEntryByKey);
                for (let i = 0; i < rows.length; i += 1) {
                    const row = rows[i];
                    if (!row || typeof row !== "object") {
                        continue;
                    }
                    const key = makeRowKey(row);
                    if (!key) {
                        continue;
                    }
                    const existing = mergedByKey.get(key);
                    if (existing) {
                        existing.row = row;
                        existing.last_seen_at = now;
                        continue;
                    }
                    const next = {
                        key,
                        row,
                        first_seen_at: now,
                        last_seen_at: now
                    };
                    merged.push(next);
                    mergedByKey.set(key, next);
                }

                fs.writeFileSync(
                    TODAY_LIST_CACHE_PATH,
                    `${JSON.stringify(
                        {
                            updated_at: now,
                            source,
                            total_unique: merged.length,
                            entries: merged
                        },
                        null,
                        2
                    )}\n`,
                    "utf8"
                );
            } catch (writeErr) {
                console.warn(
                    "[9proxy] today_list cache write failed:",
                    writeErr && writeErr.message ? writeErr.message : writeErr
                );
            }
            return { ...body, nine_proxy_available: true };
        }
        console.warn("[9proxy] today_list: 响应非对象，已降级为空列表");
        return {
            ...emptyNineProxyTodayListBody(),
            nine_proxy_error: "today_list 响应格式异常"
        };
    } catch (e) {
        console.warn("[9proxy] today_list:", e.message || e);
        return {
            ...emptyNineProxyTodayListBody(),
            nine_proxy_error: e.message || String(e)
        };
    }
}

/**
 * 从 today-list-cache 读取去重条目。
 * @returns {Array<{ key?: string, row?: object, first_seen_at?: string, last_seen_at?: string }>}
 */
function readTodayListCacheEntries() {
    try {
        const raw = fs.readFileSync(TODAY_LIST_CACHE_PATH, "utf8");
        const obj = JSON.parse(raw);
        return Array.isArray(obj?.entries) ? obj.entries : [];
    } catch {
        return [];
    }
}

/**
 * 通过 public_ip 在 today-list-cache 中查找对应 today_list `id`。
 * 命中多条时优先 `last_seen_at` 最新的一条。
 * @param {string} publicIp
 * @returns {string}
 */
function findTodayProxyIdByPublicIpFromCache(publicIp) {
    const target = String(publicIp || "").trim();
    if (!target) {
        return "";
    }
    const entries = readTodayListCacheEntries();
    let best = null;
    let bestTs = 0;
    for (let i = 0; i < entries.length; i += 1) {
        const entry = entries[i];
        if (!entry || typeof entry !== "object") {
            continue;
        }
        const row = entry.row && typeof entry.row === "object" ? entry.row : entry;
        const rowIp = String(row.public_ip || row.ip || "").trim();
        if (!rowIp || rowIp !== target) {
            continue;
        }
        const id = row.id != null ? String(row.id).trim() : "";
        if (!id) {
            continue;
        }
        const t = Date.parse(String(entry.last_seen_at || entry.first_seen_at || ""));
        const ts = Number.isFinite(t) ? t : 0;
        if (!best || ts >= bestTs) {
            best = id;
            bestTs = ts;
        }
    }
    return best || "";
}

/** @type {null | { rows: typeof STATE_CODE_ROWS, countries: string[], statesByCountry: Record<string, { state_code: string, state_name: string }[]>, citiesByCountry: Record<string, { city_code: string, city_name: string }[]>, ispsByCountry: Record<string, { isp_code: string, isp_name: string }[]> }} */
let memoLocationCodes = null;

/**
 * 从内置州/市/ISP 表整理国家与各层级代码，供前端筛选规则与新增代理选区（进程内缓存）。
 * @returns {{ rows: typeof STATE_CODE_ROWS, countries: string[], statesByCountry: Record<string, { state_code: string, state_name: string }[]>, citiesByCountry: Record<string, { city_code: string, city_name: string }[]>, ispsByCountry: Record<string, { isp_code: string, isp_name: string }[]> }}
 */
function getLocationCodes() {
    if (memoLocationCodes) {
        return memoLocationCodes;
    }
    const countriesSet = new Set();
    const statesByCountry = {};

    for (let i = 0; i < STATE_CODE_ROWS.length; i += 1) {
        const row = STATE_CODE_ROWS[i];
        const countryCode = row.country_code;
        const stateCode = row.state_code;
        if (!countryCode) {
            continue;
        }
        countriesSet.add(countryCode);
        if (!statesByCountry[countryCode]) {
            statesByCountry[countryCode] = [];
        }
        if (!stateCode) {
            continue;
        }
        const list = statesByCountry[countryCode];
        if (list.some((x) => x.state_code === stateCode)) {
            continue;
        }
        const stateName =
            row.state_name != null && String(row.state_name).trim() !== ""
                ? String(row.state_name).trim()
                : String(stateCode)
                      .split("_")
                      .map((part) =>
                          part ? part.charAt(0).toUpperCase() + part.slice(1).toLowerCase() : ""
                      )
                      .filter(Boolean)
                      .join(" ");
        list.push({
            state_code: stateCode,
            state_name: stateName
        });
    }

    const citiesByCountry = {};
    for (let i = 0; i < CITY_CODE_ROWS.length; i += 1) {
        const r = CITY_CODE_ROWS[i];
        const cc = r.country_code;
        if (!cc) {
            continue;
        }
        countriesSet.add(cc);
        if (!citiesByCountry[cc]) {
            citiesByCountry[cc] = [];
        }
        if (r.city_code) {
            citiesByCountry[cc].push({
                city_code: r.city_code,
                city_name: r.city_name != null ? String(r.city_name) : ""
            });
        }
    }

    const ispsByCountry = {};
    for (let i = 0; i < ISP_CODE_ROWS.length; i += 1) {
        const r = ISP_CODE_ROWS[i];
        const cc = r.country_code;
        if (!cc) {
            continue;
        }
        countriesSet.add(cc);
        if (!ispsByCountry[cc]) {
            ispsByCountry[cc] = [];
        }
        if (r.isp_code) {
            ispsByCountry[cc].push({
                isp_code: r.isp_code,
                isp_name: r.isp_name != null ? String(r.isp_name) : ""
            });
        }
    }

    const countries = Array.from(countriesSet).sort();
    countries.forEach((country) => {
        if (statesByCountry[country]) {
            statesByCountry[country].sort((a, b) =>
                String(a.state_name || a.state_code).localeCompare(
                    String(b.state_name || b.state_code),
                    "en"
                )
            );
        }
        if (citiesByCountry[country]) {
            citiesByCountry[country].sort((a, b) =>
                String(a.city_name).localeCompare(String(b.city_name), "en")
            );
        }
        if (ispsByCountry[country]) {
            ispsByCountry[country].sort((a, b) =>
                String(a.isp_name || a.isp_code).localeCompare(
                    String(b.isp_name || b.isp_code),
                    "en"
                )
            );
        }
    });

    memoLocationCodes = {
        rows: STATE_CODE_ROWS,
        countries,
        statesByCountry,
        citiesByCountry,
        ispsByCountry
    };
    return memoLocationCodes;
}

/**
 * 调用 ipinfo.io 解析公网 IP 的国家、州/省、城市；结果带内存缓存。
 * @param {string} ip
 * @returns {Promise<{ country: string, region: string, city: string }>}
 */
async function getIpGeo(ip) {
    if (!ip) {
        return { country: "", region: "", city: "" };
    }
    const key = String(ip).trim();
    if (!key) {
        return { country: "", region: "", city: "" };
    }
    if (IP_GEO_CACHE.has(key)) {
        return IP_GEO_CACHE.get(key);
    }
    try {
        const res = await axios.get(`https://ipinfo.io/${key}/json`, {
            ...AXIOS_OPTS_NO_PROXY,
            timeout: 5000
        });
        const geo = {
            country: (res.data?.country || "").trim(),
            region: (res.data?.region || "").trim(),
            city: (res.data?.city || "").trim()
        };
        IP_GEO_CACHE.set(key, geo);
        IPINFO_CACHE.set(key, geo.region);
        return geo;
    } catch {
        const empty = { country: "", region: "", city: "" };
        IP_GEO_CACHE.set(key, empty);
        IPINFO_CACHE.set(key, "");
        return empty;
    }
}

/**
 * 根据 IP 取美国州级代码（或 ipinfo 的 region），供代理列表「州/地区」展示。
 * @param {string} ip
 * @returns {Promise<string>}
 */
async function getStateByIp(ip) {
    if (!ip) return "";
    if (IPINFO_CACHE.has(ip)) {
        return IPINFO_CACHE.get(ip);
    }
    const geo = await getIpGeo(ip);
    return geo.region;
}

/**
 * 为代理列表每一项补充 `state` 字段（由 getStateByIp 推断）。
 * @param {object[]|null|undefined} list
 * @returns {Promise<object[]>}
 */
async function enrichProxyState(list) {
    if (!Array.isArray(list) || list.length === 0) return list;
    const tasks = list.map(async (item) => {
        if (item?.is_custom) {
            return {
                ...item,
                state: item.state != null ? String(item.state) : ""
            };
        }
        const state = await getStateByIp(item?.ip);
        return {
            ...item,
            state
        };
    });
    return Promise.all(tasks);
}

/**
 * 按代理账号构造 SOCKS5 Agent，供 testProxy 连通性检测。
 * @param {{ username: string, password: string, ip: string, port: number|string }} proxy
 * @returns {import("socks-proxy-agent").SocksProxyAgent}
 */
function buildSocksAgent(proxy) {
    const url = `socks5://${proxy.username}:${proxy.password}@${proxy.ip}:${proxy.port}`;
    return new SocksProxyAgent(url);
}

/**
 * 通过代理访问 api.ipify.org 判断是否可用（超时 5s）。
 * @param {object} proxy
 * @returns {Promise<boolean>}
 */
async function testProxy(proxy) {
    try {
        const agent = buildSocksAgent(proxy);

        await axios.get("https://api.ipify.org", {
            ...AXIOS_OPTS_NO_PROXY,
            httpAgent: agent,
            httpsAgent: agent,
            timeout: 5000
        });

        return true;
    } catch {
        return false;
    }
}

/**
 * 将 host 格式化为 socks URL 中的 server 段（IPv6 需方括号）。
 * @param {string} host
 * @returns {string}
 */
function formatSocksHostForUrl(host) {
    const h = String(host || "").trim();
    if (!h) {
        return h;
    }
    if (h.includes(":") && !/^\d{1,3}(\.\d{1,3}){3}$/.test(h)) {
        return `[${h}]`;
    }
    return h;
}

/**
 * 从自定义 SOCKS 账密构造 Agent（用户名密码做 URL 编码，避免特殊字符破坏 URL）。
 * @param {{ host: string, port: number, username?: string, password?: string }} entry
 */
function buildSocksAgentFromEntry(entry) {
    const host = formatSocksHostForUrl(entry.host);
    const port = Number(entry.port);
    const u = encodeURIComponent(String(entry.username ?? ""));
    const p = encodeURIComponent(String(entry.password ?? ""));
    const url = `socks5://${u}:${p}@${host}:${port}`;
    return new SocksProxyAgent(url);
}

/**
 * 经 SOCKS5 访问 ipify 获取出口公网 IP。
 * @param {{ host: string, port: number, username?: string, password?: string }} entry
 * @param {number} [timeoutMs]
 * @returns {Promise<{ ok: true, exitIp: string }|{ ok: false }>}
 */
async function fetchExitIpViaSocksEntry(entry, timeoutMs = 8000) {
    try {
        const agent = buildSocksAgentFromEntry(entry);
        const r = await axios.get("https://api.ipify.org?format=json", {
            ...AXIOS_OPTS_NO_PROXY,
            httpAgent: agent,
            httpsAgent: agent,
            timeout: timeoutMs,
            validateStatus: () => true
        });
        if (r.status !== 200) {
            return { ok: false };
        }
        const ip = typeof r.data?.ip === "string" ? r.data.ip.trim() : "";
        if (ip) {
            return { ok: true, exitIp: ip };
        }
        return { ok: false };
    } catch {
        return { ok: false };
    }
}

/**
 * 使用 Node 原生 HTTP(S) 拉取本机出口公网 IP（不经过 axios，避免受 HTTP(S)_PROXY 影响）。
 * @param {string} url
 * @param {number} timeoutMs
 * @returns {Promise<string>}
 */
function httpGetBodyNoProxy(url, timeoutMs) {
    return new Promise((resolve) => {
        const lib = String(url).startsWith("https:") ? https : http;
        const req = lib.get(
            url,
            {
                timeout: timeoutMs,
                headers: { "User-Agent": "sing-box-proxy-console/1.0" }
            },
            (res) => {
                let buf = "";
                res.setEncoding("utf8");
                res.on("data", (c) => {
                    buf += c;
                });
                res.on("end", () => {
                    if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
                        resolve(buf.trim());
                    } else {
                        resolve("");
                    }
                });
            }
        );
        req.on("error", () => resolve(""));
        req.on("timeout", () => {
            req.destroy();
            resolve("");
        });
    });
}

/**
 * 本机出口公网 IP（直连用户管理展示）；多 URL 回退。
 * @param {number} [timeoutMs]
 * @param {string[]|null|undefined} [debugLogs]
 * @returns {Promise<{ ok: true, exitIp: string }|{ ok: false }>}
 */
async function fetchMachinePublicIp(timeoutMs = 8000, debugLogs) {
    const urls = [
        "https://api.ipify.org?format=json",
        "https://api64.ipify.org?format=json",
        "https://ifconfig.me/ip",
        "http://checkip.amazonaws.com/"
    ];
    for (let u = 0; u < urls.length; u += 1) {
        try {
            const raw = await httpGetBodyNoProxy(urls[u], timeoutMs);
            const preview = String(raw || "")
                .slice(0, 120)
                .replace(/\s+/g, " ");
            pushSingboxDebug(
                debugLogs,
                `fetchMachinePublicIp try idx=${u} url=${urls[u]} rawLen=${String(raw || "").length} preview=${preview}`
            );
            if (!raw) {
                continue;
            }
            if (raw.startsWith("{")) {
                const j = JSON.parse(raw);
                const ip = typeof j.ip === "string" ? j.ip.trim() : "";
                if (ip) {
                    pushSingboxDebug(debugLogs, `fetchMachinePublicIp ok json ip=${ip}`);
                    return { ok: true, exitIp: ip };
                }
            } else {
                const ip = raw.split(/\n/)[0].trim();
                if (ip.length >= 3 && ip.length <= 128 && !/\s/.test(ip)) {
                    pushSingboxDebug(debugLogs, `fetchMachinePublicIp ok text ip=${ip}`);
                    return { ok: true, exitIp: ip };
                }
            }
        } catch (e) {
            pushSingboxDebug(
                debugLogs,
                `fetchMachinePublicIp catch idx=${u} url=${urls[u]} err=${e.message || String(e)}`
            );
        }
    }
    pushSingboxDebug(debugLogs, "fetchMachinePublicIp all urls failed -> ok=false");
    return { ok: false };
}

/**
 * 调试：`GET /api/singbox-users?debug=1` 时写入数组并 `console.log`。
 * @param {string[]|null|undefined} logs
 * @param {string} line
 */
function pushSingboxDebug(logs, line) {
    if (!Array.isArray(logs)) {
        return;
    }
    const s = `[singbox-users] ${new Date().toISOString()} ${line}`;
    logs.push(s);
    console.log(s);
}

/**
 * 将 `host:port` 类绑定串规范化成比对键（去空白、小写）。
 * @param {string|null|undefined} addr
 * @returns {string}
 */
function normalizeBindingKey(addr) {
    return String(addr || "").replace(/\s+/g, "").toLowerCase();
}

/**
 * 读取 sing-box 配置中所有 SOCKS 出站，按 `server:port` 分组得到绑定的出站 tag 列表
 *（多出站可共用同一端口，故值为 string[]）。
 * @returns {Record<string, string[]>}
 */
function getSocksBindingToUsersMap() {
    const map = Object.create(null);
    try {
        if (!fs.existsSync(CONFIG_PATH)) {
            return map;
        }
        const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
        const outbounds = config?.outbounds;
        if (!Array.isArray(outbounds)) {
            return map;
        }
        for (let i = 0; i < outbounds.length; i += 1) {
            const ob = outbounds[i];
            if (
                ob
                && ob.type === "socks"
                && typeof ob.tag === "string"
                && ob.server
                && ob.server_port != null
            ) {
                const key = normalizeBindingKey(`${ob.server}:${ob.server_port}`);
                if (!key) {
                    continue;
                }
                if (!map[key]) {
                    map[key] = [];
                }
                const tag = ob.tag;
                if (!map[key].includes(tag)) {
                    map[key].push(tag);
                }
            }
        }
    } catch {
        // ignore
    }
    return map;
}

/**
 * 读取 `proxy-user-meta.json` 中 `wifi_by_outbound`，得到出站 tag → WiFi 名称。
 * @returns {Record<string, string>}
 */
function getOutboundWifiNameMap() {
    const map = Object.create(null);
    try {
        if (!fs.existsSync(USER_META_PATH)) {
            return map;
        }
        const data = JSON.parse(fs.readFileSync(USER_META_PATH, "utf8"));
        const w = data?.wifi_by_outbound;
        if (!w || typeof w !== "object" || Array.isArray(w)) {
            return map;
        }
        const keys = Object.keys(w);
        for (let i = 0; i < keys.length; i += 1) {
            const k = keys[i];
            const v = w[k];
            if (typeof v === "string" && v.trim() !== "") {
                map[k] = v.trim();
            }
        }
    } catch {
        // ignore
    }
    return map;
}

/**
 * 写入或删除 `proxy-user-meta.json` 中 `wifi_by_outbound[tag]`（空名称则删除该键）。
 * @param {string} tag 出站 tag
 * @param {string} name WiFi 名称（可含空格，trim 后为空则删除）
 * @returns {{ ok: boolean, error?: string }}
 */
function setOutboundWifiInUserMeta(tag, name) {
    const t = String(tag || "").trim();
    if (!t) {
        return { ok: false, error: "缺少 tag" };
    }
    const n = String(name ?? "").trim();
    let root = { wifi_by_outbound: {} };
    try {
        if (fs.existsSync(USER_META_PATH)) {
            const raw = fs.readFileSync(USER_META_PATH, "utf8");
            const parsed = JSON.parse(raw);
            if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
                root = parsed;
            }
        }
    } catch (e) {
        return { ok: false, error: "读取 meta 失败: " + (e.message || String(e)) };
    }
    if (
        !root.wifi_by_outbound
        || typeof root.wifi_by_outbound !== "object"
        || Array.isArray(root.wifi_by_outbound)
    ) {
        root.wifi_by_outbound = {};
    }
    const w = root.wifi_by_outbound;
    if (n === "") {
        delete w[t];
    } else {
        w[t] = n;
    }
    try {
        fs.mkdirSync(path.dirname(USER_META_PATH), { recursive: true });
    } catch {
        // 目录已存在等
    }
    try {
        fs.writeFileSync(USER_META_PATH, `${JSON.stringify(root, null, 2)}\n`, "utf8");
    } catch (e) {
        return { ok: false, error: "写入 meta 失败: " + (e.message || String(e)) };
    }
    return { ok: true };
}

function readProxyUserMetaRoot() {
    try {
        if (!fs.existsSync(USER_META_PATH)) {
            return { wifi_by_outbound: {} };
        }
        const parsed = JSON.parse(fs.readFileSync(USER_META_PATH, "utf8"));
        return parsed && typeof parsed === "object" && !Array.isArray(parsed)
            ? parsed
            : { wifi_by_outbound: {} };
    } catch {
        return { wifi_by_outbound: {} };
    }
}

function writeProxyUserMetaRoot(root) {
    if (
        !root.wifi_by_outbound
        || typeof root.wifi_by_outbound !== "object"
        || Array.isArray(root.wifi_by_outbound)
    ) {
        root.wifi_by_outbound = {};
    }
    fs.mkdirSync(path.dirname(USER_META_PATH), { recursive: true });
    fs.writeFileSync(USER_META_PATH, `${JSON.stringify(root, null, 2)}\n`, "utf8");
}

function nineFilterDefaults() {
    return {
        country: "",
        states: [],
        cities: [],
        isps: [],
        zip: "",
        today: false,
        t: "2"
    };
}

function normNineFilterPayload(f) {
    const o = f && typeof f === "object" ? f : {};
    return {
        country: typeof o.country === "string" ? o.country.trim().toUpperCase() : "",
        states: Array.isArray(o.states) ? o.states.map((x) => String(x).trim()).filter(Boolean) : [],
        cities: Array.isArray(o.cities) ? o.cities.map((x) => String(x).trim()).filter(Boolean) : [],
        isps: Array.isArray(o.isps) ? o.isps.map((x) => String(x).trim()).filter(Boolean) : [],
        zip: typeof o.zip === "string" ? o.zip.trim() : "",
        today: o.today === true || o.today === "true" || o.today === 1 || o.today === "1",
        t: "2"
    };
}

function getNineFilterForOutbound(tag) {
    const t = String(tag || "").trim();
    if (!t) {
        return nineFilterDefaults();
    }
    const root = readProxyUserMetaRoot();
    const bucket = root.nine_filter_by_outbound;
    if (!bucket || typeof bucket !== "object" || Array.isArray(bucket)) {
        return nineFilterDefaults();
    }
    const raw = bucket[t];
    if (!raw || typeof raw !== "object") {
        return nineFilterDefaults();
    }
    return normNineFilterPayload(raw);
}

function setNineFilterForOutbound(tag, filter) {
    const t = String(tag || "").trim();
    if (!t) {
        return { ok: false, error: "缺少 tag" };
    }
    const norm = normNineFilterPayload(filter);
    const root = readProxyUserMetaRoot();
    if (
        !root.nine_filter_by_outbound
        || typeof root.nine_filter_by_outbound !== "object"
        || Array.isArray(root.nine_filter_by_outbound)
    ) {
        root.nine_filter_by_outbound = {};
    }
    root.nine_filter_by_outbound[t] = norm;
    try {
        writeProxyUserMetaRoot(root);
    } catch (e) {
        return { ok: false, error: e.message || String(e) };
    }
    return { ok: true, filter: norm };
}

/**
 * 将 9proxy 返回的 `binding` 与本地 SOCKS 出站对照，为每条代理补充
 * `bound_users`、`bound_user`（顿号拼接）、`bound_wifi_name`（与 tag 顺序对齐的 WiFi，无则「—」）。
 * @param {object[]|null|undefined} list
 * @param {Record<string, string|string[]>} bindingMap `getSocksBindingToUsersMap()` 的返回值
 * @returns {object[]|null|undefined}
 */
function attachBoundUserToProxyList(list, bindingMap) {
    if (!Array.isArray(list)) {
        return list;
    }
    const wifiByTag = getOutboundWifiNameMap();
    return list.map((item) => {
        const key = normalizeBindingKey(item?.binding);
        let tags = [];
        if (key && bindingMap[key]) {
            const v = bindingMap[key];
            tags = Array.isArray(v) ? v.slice() : [String(v)];
        }
        const sep = "、";
        const bound_user = tags.length ? tags.join(sep) : "";
        const bound_wifi_name = tags.length
            ? tags
                  .map((t) => {
                      const w = wifiByTag[t];
                      return w && String(w).trim() !== ""
                          ? String(w).trim()
                          : "—";
                  })
                  .join(sep)
            : "";
        return {
            ...item,
            bound_users: tags,
            bound_user,
            bound_wifi_name
        };
    });
}

/**
 * 在配置中查找指定 tag 的出站对象（任意 type）。
 * @param {object} config 已解析的 sing-box JSON
 * @param {string} tag 出站 tag
 * @returns {object|null}
 */
function getOutboundObForTag(config, tag) {
    const outbounds = config?.outbounds;
    if (!Array.isArray(outbounds)) {
        return null;
    }
    const t = String(tag ?? "").trim();
    if (!t) {
        return null;
    }
    for (let i = 0; i < outbounds.length; i += 1) {
        const ob = outbounds[i];
        if (ob && String(ob.tag ?? "").trim() === t) {
            return ob;
        }
    }
    return null;
}

/**
 * @param {object|null|undefined} ob
 * @returns {boolean}
 */
function isOutboundTypeDirect(ob) {
    return String(ob?.type ?? "").toLowerCase() === "direct";
}

/** 与 `socksAddressForOutboundTag` 展示串对齐（简繁/英文、不可见字符、NFKC） */
const DIRECT_SOCKS_ADDRESS_LABELS = new Set([
    "直连",
    "直連",
    "直接",
    "direct"
]);

function isDirectSocksAddressLabel(addr) {
    const s = String(addr ?? "")
        .replace(/^\uFEFF/, "")
        .replace(/[\u200B-\u200D\uFEFF]/g, "")
        .trim();
    if (DIRECT_SOCKS_ADDRESS_LABELS.has(s) || /^direct$/i.test(s)) {
        return true;
    }
    try {
        const n = s.normalize("NFKC").trim();
        if (DIRECT_SOCKS_ADDRESS_LABELS.has(n) || /^direct$/i.test(n)) {
            return true;
        }
    } catch {
        // ignore
    }
    return false;
}

/**
 * 本机出口 overlay（直连多用户共用一次探测结果）。
 * @param {string[]|null|undefined} debugLogs
 */
async function buildMachinePortStatusOverlayOnce(debugLogs) {
    try {
        const probe = await fetchMachinePublicIp(8000, debugLogs);
        if (!probe.ok || !probe.exitIp) {
            pushSingboxDebug(
                debugLogs,
                "buildMachinePortStatusOverlayOnce: probe empty -> empty overlay"
            );
            return {
                public_ip: "",
                ip_country: "",
                ip_region: "",
                ip_city: "",
                online: false
            };
        }
        const geo = await getIpGeo(probe.exitIp);
        pushSingboxDebug(
            debugLogs,
            `buildMachinePortStatusOverlayOnce: ok ip=${probe.exitIp} country=${geo.country}`
        );
        return {
            public_ip: probe.exitIp,
            ip_country: geo.country || "",
            ip_region: geo.region || "",
            ip_city: geo.city || "",
            online: true
        };
    } catch (e) {
        pushSingboxDebug(
            debugLogs,
            `buildMachinePortStatusOverlayOnce catch: ${e.message || String(e)}`
        );
        return {
            public_ip: "",
            ip_country: "",
            ip_region: "",
            ip_city: "",
            online: false
        };
    }
}

function rowHasPortStatusOverlay(row) {
    return (
        row
        && row.port_status_overlay != null
        && typeof row.port_status_overlay === "object"
    );
}

function needsMachineEgressBackfill(row, config) {
    if (rowHasPortStatusOverlay(row)) {
        return false;
    }
    const tag = String(row?.outbound ?? "").trim();
    if (!tag) {
        return false;
    }
    if (isDirectSocksAddressLabel(row?.socks_address)) {
        return true;
    }
    const ob = getOutboundObForTag(config, tag);
    return Boolean(ob && isOutboundTypeDirect(ob));
}

/**
 * 在配置中查找指定 tag 的 SOCKS 出站对象。
 * @param {object} config 已解析的 sing-box JSON
 * @param {string} tag 出站 tag
 * @returns {object|null}
 */
function getSocksOutboundObForTag(config, tag) {
    const ob = getOutboundObForTag(config, tag);
    return ob && ob.type === "socks" ? ob : null;
}

/**
 * 用户管理展示用：SOCKS 为 `server:port`；`type: direct` 且 tag 与路由一致时显示「直连」。
 * @param {object} config 已解析的 sing-box JSON
 * @param {string} tag 出站 tag
 * @returns {string}
 */
function socksAddressForOutboundTag(config, tag) {
    const ob = getOutboundObForTag(config, tag);
    if (!ob) {
        return "";
    }
    if (isOutboundTypeDirect(ob)) {
        return "直连";
    }
    if (ob.type === "socks" && ob.server != null && ob.server_port != null) {
        return `${ob.server}:${ob.server_port}`;
    }
    return "";
}

/**
 * 对「用户管理」行：`direct` 出站补本机出口 IP + ipinfo；远端 SOCKS 经 SOCKS 探测（与自定义代理同源）。
 * @param {object[]} users `getSingboxRouteUsers().users`
 * @param {object} config 已解析的 sing-box JSON
 * @param {string[]|null|undefined} [debugLogs] 传入数组时记录调试行（与 `?debug=1` 配合）
 */
async function enrichSingboxUsersWithSocksGeo(users, config, debugLogs) {
    if (!Array.isArray(users) || users.length === 0) {
        return users;
    }
    pushSingboxDebug(
        debugLogs,
        `enrichSingboxUsersWithSocksGeo start n=${users.length} config=${CONFIG_PATH}`
    );
    let machineEgressOverlayPromise;
    const getMachineEgressOverlay = () => {
        if (machineEgressOverlayPromise == null) {
            pushSingboxDebug(debugLogs, "machine_egress: buildMachinePortStatusOverlayOnce");
            machineEgressOverlayPromise = buildMachinePortStatusOverlayOnce(debugLogs);
        }
        return machineEgressOverlayPromise;
    };
    const results = await Promise.all(
        users.map(async (u) => {
            try {
                const tag = String(u.outbound || "").trim();
                if (!tag) {
                    return u;
                }
                const anyOb = getOutboundObForTag(config, tag);
                const labelDirect = isDirectSocksAddressLabel(u.socks_address);
                const cfgDirect = Boolean(anyOb && isOutboundTypeDirect(anyOb));
                pushSingboxDebug(
                    debugLogs,
                    `user tag=${tag} socks_addr_repr=${JSON.stringify(u.socks_address)} labelDirect=${labelDirect} obType=${anyOb?.type ?? "(none)"} cfgDirect=${cfgDirect}`
                );
                if (labelDirect || cfgDirect) {
                    let ovl;
                    try {
                        ovl = await getMachineEgressOverlay();
                        pushSingboxDebug(
                            debugLogs,
                            `user tag=${tag} direct overlay public_ip=${ovl.public_ip || ""} online=${ovl.online}`
                        );
                    } catch (e) {
                        pushSingboxDebug(
                            debugLogs,
                            `user tag=${tag} getMachineEgressOverlay catch: ${e.message || String(e)}`
                        );
                        ovl = {
                            public_ip: "",
                            ip_country: "",
                            ip_region: "",
                            ip_city: "",
                            online: false
                        };
                    }
                    return {
                        ...u,
                        port_status_overlay: ovl,
                        outbound_egress: "direct"
                    };
                }
                const ob = getSocksOutboundObForTag(config, tag);
                if (
                    !ob
                    || ob.type !== "socks"
                    || ob.server == null
                    || ob.server_port == null
                ) {
                    return u;
                }
                const server = String(ob.server).trim();
                const port = Number(ob.server_port);
                if (!server || !Number.isFinite(port) || port <= 0) {
                    return u;
                }
                const isLocal =
                    server === "127.0.0.1"
                    || server === "localhost"
                    || server === "::1";
                if (isLocal) {
                    return u;
                }
                const entry = {
                    host: server,
                    port,
                    username: ob.username != null ? String(ob.username) : "",
                    password: ob.password != null ? String(ob.password) : ""
                };
                const apiRow = {
                    id: "",
                    ip: "",
                    city: "—",
                    country_code: "",
                    state: "",
                    is_online: false,
                    binding: `${server}:${port}`,
                    is_custom: true
                };
                pushSingboxDebug(
                    debugLogs,
                    `user tag=${tag} remote_socks ${server}:${port} -> enrichCustomProxyFromEntry`
                );
                const enriched = await enrichCustomProxyFromEntry(apiRow, entry);
                return {
                    ...u,
                    port_status_overlay: {
                        public_ip:
                            enriched.ip && enriched.ip !== "-"
                                ? String(enriched.ip).trim()
                                : "",
                        ip_country: enriched.country_code || "",
                        ip_region: enriched.state || "",
                        ip_city:
                            enriched.city && enriched.city !== "—"
                                ? String(enriched.city).trim()
                                : "",
                        online: enriched.is_online === true
                    }
                };
            } catch (e) {
                pushSingboxDebug(
                    debugLogs,
                    `user tag=${String(u?.outbound || "").trim()} enrich catch: ${e.message || String(e)}`
                );
                return u;
            }
        })
    );

    for (let bi = 0; bi < results.length; bi += 1) {
        if (!needsMachineEgressBackfill(results[bi], config)) {
            continue;
        }
        pushSingboxDebug(
            debugLogs,
            `backfill_direct i=${bi} outbound=${String(results[bi].outbound || "").trim()} socks_repr=${JSON.stringify(results[bi].socks_address)}`
        );
        const ovl = await getMachineEgressOverlay();
        results[bi] = {
            ...results[bi],
            port_status_overlay: { ...ovl },
            outbound_egress: "direct"
        };
    }
    pushSingboxDebug(
        debugLogs,
        `enrichSingboxUsersWithSocksGeo done rows=${results.length}`
    );
    return results;
}

/**
 * 从 `route.rules` 收集带 `outbound` 的规则，与 SOCKS 出站地址、WiFi 展示名组合成「用户管理」行数据
 *（不要求 auth_user）。
 * @returns {{ ok: boolean, error?: string, users: Array<{ outbound: string, socks_address: string, wifi_name: string }> }} `socks_address` 为 `host:port`、`直连`（`type:direct`）或空。
 */
function getSingboxRouteUsers() {
    try {
        if (!fs.existsSync(CONFIG_PATH)) {
            return {
                ok: false,
                error: "配置文件不存在: " + CONFIG_PATH,
                users: []
            };
        }
        const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
        const rules = config?.route?.rules;
        if (!Array.isArray(rules)) {
            return { ok: true, users: [] };
        }
        const wifiMap = getOutboundWifiNameMap();
        const users = [];
        for (let i = 0; i < rules.length; i += 1) {
            const rule = rules[i];
            if (!rule) {
                continue;
            }
            const tag = String(rule.outbound ?? "").trim();
            if (!tag) {
                continue;
            }
            const wn = wifiMap[tag];
            users.push({
                outbound: tag,
                socks_address: socksAddressForOutboundTag(config, tag),
                wifi_name: typeof wn === "string" && wn.trim() !== "" ? wn.trim() : ""
            });
        }
        return { ok: true, users };
    } catch (e) {
        return {
            ok: false,
            error: e.message || String(e),
            users: []
        };
    }
}

/**
 * 从 `127.0.0.1:60001` 或 port_status 的 `address` 字段解析端口号。
 * @param {string|null|undefined} addr
 * @returns {number|null}
 */
function parsePortFromBindingAddress(addr) {
    const s = String(addr || "").trim();
    const idx = s.lastIndexOf(":");
    if (idx < 0) {
        return null;
    }
    const p = Number(s.slice(idx + 1));
    return Number.isFinite(p) && p > 0 ? p : null;
}

/**
 * 在内存中的 sing-box 配置里，将指定 tag 的 SOCKS 出站改为本机固定地址与端口。
 * @param {object} config
 * @param {string} tag
 * @param {number|string} port
 */
function applySocksPortToConfig(config, tag, port) {
    const outbounds = config?.outbounds;
    if (!Array.isArray(outbounds)) {
        throw new Error("配置缺少 outbounds");
    }
    const n = Number(port);
    if (!Number.isFinite(n) || n <= 0) {
        throw new Error("无效端口: " + port);
    }
    let found = false;
    for (let i = 0; i < outbounds.length; i += 1) {
        const ob = outbounds[i];
        if (ob && ob.type === "socks" && ob.tag === tag) {
            ob.server = "127.0.0.1";
            ob.server_port = n;
            delete ob.username;
            delete ob.password;
            found = true;
            break;
        }
    }
    if (!found) {
        throw new Error("未找到 SOCKS 出站: " + tag);
    }
}

/**
 * 解析一行 SOCKS5：`host:port:username:password`（从最后一个 `:` 起依次取密码、用户名、端口，剩余为 host，支持 host 中含 `:` 的写法）。
 * @param {string} line
 * @returns {{ host: string, port: number, username: string, password: string }|null}
 */
function parseSocksProxyLine(line) {
    const s = String(line || "").trim();
    if (!s) {
        return null;
    }
    let rest = s;
    const take = () => {
        const i = rest.lastIndexOf(":");
        if (i < 0) {
            return null;
        }
        const v = rest.slice(i + 1);
        rest = rest.slice(0, i);
        return v;
    };
    const password = take();
    const username = take();
    const portStr = take();
    if (password == null || username == null || portStr == null) {
        return null;
    }
    const host = rest.trim();
    const port = Number(portStr);
    if (!host || !Number.isFinite(port) || port <= 0 || port > 65535) {
        return null;
    }
    return {
        host,
        port,
        username: String(username),
        password: String(password)
    };
}

function readCustomProxiesFile() {
    try {
        if (!fs.existsSync(CUSTOM_PROXIES_PATH)) {
            return [];
        }
        const j = JSON.parse(fs.readFileSync(CUSTOM_PROXIES_PATH, "utf8"));
        return Array.isArray(j?.proxies) ? j.proxies : [];
    } catch {
        return [];
    }
}

/**
 * 查找与待保存项相同的自定义代理（host 不区分大小写、端口、用户名、密码均一致）。
 * @param {object[]} list `readCustomProxiesFile()` 结果
 * @param {{ host: string, port: number, username: string, password: string }} parsed
 * @returns {object|null}
 */
function findDuplicateCustomEntry(list, parsed) {
    if (!Array.isArray(list) || !parsed) {
        return null;
    }
    const h = String(parsed.host || "").trim().toLowerCase();
    const port = Number(parsed.port);
    const u = String(parsed.username ?? "");
    const p = String(parsed.password ?? "");
    for (let i = 0; i < list.length; i += 1) {
        const e = list[i];
        if (!e || typeof e !== "object") {
            continue;
        }
        const eh = String(e.host || "").trim().toLowerCase();
        if (eh !== h) {
            continue;
        }
        if (Number(e.port) !== port) {
            continue;
        }
        if (String(e.username ?? "") !== u) {
            continue;
        }
        if (String(e.password ?? "") !== p) {
            continue;
        }
        return e;
    }
    return null;
}

function writeCustomProxiesFile(proxies) {
    fs.mkdirSync(path.dirname(CUSTOM_PROXIES_PATH), { recursive: true });
    fs.writeFileSync(
        CUSTOM_PROXIES_PATH,
        `${JSON.stringify({ proxies }, null, 2)}\n`,
        "utf8"
    );
}

/**
 * 转为与 today_list 类似的列表项（不含密码）；`binding` 与 SOCKS 出站地址一致便于绑定列展示。
 * @param {{ id: string, host: string, port: number }} c
 */
function customProxyToApiRow(c) {
    const bind = `${c.host}:${c.port}`;
    return {
        id: c.id,
        ip: "",
        city: "—",
        country_code: "",
        state: "",
        is_online: false,
        binding: bind,
        is_custom: true
    };
}

/**
 * 用磁盘中的账密经 SOCKS 探测出口 IP、在线状态，并写回 ipinfo 地理字段（与 9proxy 列表列对齐）。
 * @param {object} apiRow `customProxyToApiRow` 结果
 * @param {{ host: string, port: number, username?: string, password?: string }} entry
 */
async function enrichCustomProxyFromEntry(apiRow, entry) {
    const probe = await fetchExitIpViaSocksEntry(entry);
    if (!probe.ok || !probe.exitIp) {
        return {
            ...apiRow,
            ip: "-",
            city: "—",
            country_code: "",
            state: "",
            is_online: false
        };
    }
    const exitIp = probe.exitIp;
    const geo = await getIpGeo(exitIp);
    return {
        ...apiRow,
        ip: exitIp,
        city: geo.city || "—",
        country_code: geo.country || "",
        state: geo.region || "",
        is_online: true
    };
}

/**
 * 对列表中的 `is_custom` 行并行做 SOCKS 探测与地理补全（仅自定义，不影响 9proxy 体量）。
 * @param {object[]|null|undefined} list
 */
async function enrichCustomRowsInList(list) {
    if (!Array.isArray(list) || list.length === 0) {
        return list;
    }
    const file = readCustomProxiesFile();
    const byId = new Map(file.map((e) => [String(e.id), e]));
    return Promise.all(
        list.map(async (item) => {
            if (!item || !item.is_custom) {
                return item;
            }
            const entry = byId.get(String(item.id));
            if (!entry) {
                return {
                    ...item,
                    ip: "-",
                    city: "—",
                    country_code: "",
                    state: "",
                    is_online: false
                };
            }
            return enrichCustomProxyFromEntry(item, entry);
        })
    );
}

function mergeCustomProxiesIntoList(arr) {
    const base = Array.isArray(arr) ? arr : [];
    const customs = readCustomProxiesFile().map(customProxyToApiRow);
    return customs.concat(base);
}

/**
 * 将 SOCKS 出站改为直连远端 SOCKS5（带账密）。
 */
function applyRemoteSocksToConfig(config, tag, entry) {
    const outbounds = config?.outbounds;
    if (!Array.isArray(outbounds)) {
        throw new Error("配置缺少 outbounds");
    }
    const host = String(entry.host || "").trim();
    const port = Number(entry.port);
    if (!host || !Number.isFinite(port) || port <= 0) {
        throw new Error("无效远端 SOCKS 地址");
    }
    let found = false;
    for (let i = 0; i < outbounds.length; i += 1) {
        const ob = outbounds[i];
        if (ob && ob.type === "socks" && ob.tag === tag) {
            ob.server = host;
            ob.server_port = port;
            const u = entry.username != null ? String(entry.username) : "";
            const p = entry.password != null ? String(entry.password) : "";
            if (u !== "") {
                ob.username = u;
            } else {
                delete ob.username;
            }
            if (p !== "") {
                ob.password = p;
            } else {
                delete ob.password;
            }
            found = true;
            break;
        }
    }
    if (!found) {
        throw new Error("未找到 SOCKS 出站: " + tag);
    }
}

/**
 * 将指定 tag 的出站改为 sing-box `direct`（与路由中 `outbound` 同名 tag 对应）。
 * @param {object} config
 * @param {string} tag
 */
function applyDirectOutboundToConfig(config, tag) {
    const outbounds = config?.outbounds;
    if (!Array.isArray(outbounds)) {
        throw new Error("配置缺少 outbounds");
    }
    const t = String(tag || "").trim();
    if (!t) {
        throw new Error("缺少 tag");
    }
    if (t === "direct") {
        throw new Error("不能使用保留 tag「direct」，请使用用户路由对应的出站 tag（如 cb357692）");
    }
    let found = false;
    for (let i = 0; i < outbounds.length; i += 1) {
        const ob = outbounds[i];
        if (ob && ob.tag === t) {
            outbounds[i] = {
                type: "direct",
                tag: t
            };
            found = true;
            break;
        }
    }
    if (!found) {
        throw new Error("未找到出站: " + t);
    }
}

/**
 * 在切换为 9proxy / 自定义 SOCKS 前，若当前出站为 `direct`，先写回最小 SOCKS 壳以便后续改写端口。
 * @param {object} config
 * @param {string} tag
 */
function ensureOutboundIsSocksShellForTag(config, tag) {
    const outbounds = config?.outbounds;
    if (!Array.isArray(outbounds)) {
        throw new Error("配置缺少 outbounds");
    }
    const t = String(tag || "").trim();
    for (let i = 0; i < outbounds.length; i += 1) {
        const ob = outbounds[i];
        if (!ob || String(ob.tag ?? "").trim() !== t) {
            continue;
        }
        if (ob.type === "socks") {
            return;
        }
        if (isOutboundTypeDirect(ob)) {
            outbounds[i] = {
                type: "socks",
                tag: t,
                server: "127.0.0.1",
                server_port: DEFAULT_LOCAL_SOCKS_PORT
            };
            return;
        }
        throw new Error("出站 " + t + " 当前类型为 " + ob.type + "，仅支持从 SOCKS 或 direct 切换");
    }
    throw new Error("未找到出站: " + t);
}

/**
 * 转发请求 9proxy `GET /api/port_status`，返回端口状态行数组（含 address、public_ip、online 等）。
 * @returns {Promise<object[]>}
 */
async function nineProxyPortStatusRows() {
    try {
        const r = await axios.get(`${NINE_PROXY_BASE}/api/port_status`, {
            ...AXIOS_OPTS_NO_PROXY,
            params: { t: 2 },
            timeout: 15000
        });
        return Array.isArray(r.data?.data) ? r.data.data : [];
    } catch (e) {
        console.warn("[9proxy] port_status:", e.message || e);
        return [];
    }
}

/**
 * 从 port_status 各行 `address` 解析出范围内已占用端口集合。
 * @param {object[]} statusRows
 * @param {{ start: number, end: number, count: number }} range
 * @returns {Set<number>}
 */
function collectOccupiedLocalPortsFromPortStatus(statusRows, range) {
    const used = new Set();
    if (!Array.isArray(statusRows)) {
        return used;
    }
    for (let i = 0; i < statusRows.length; i += 1) {
        const port = parsePortFromBindingAddress(statusRows[i]?.address);
        if (
            port != null
            && port >= range.start
            && port <= range.end
        ) {
            used.add(port);
        }
    }
    return used;
}

/**
 * 在范围内取第一个不在 `occupied` 中的端口。
 * @param {Set<number>} occupied
 * @param {{ start: number, end: number, count: number }} range
 * @returns {number|null}
 */
function pickFirstUnoccupiedPortInRange(occupied, range) {
    for (let p = range.start; p <= range.end; p += 1) {
        if (!occupied.has(p)) {
            return p;
        }
    }
    return null;
}

/**
 * 从 sing-box 配置中提取范围内“已设置的本地 SOCKS 端口”（server 为 127.0.0.1/localhost）。
 * @param {object} config
 * @param {{ start: number, end: number }} range
 * @returns {Set<number>}
 */
function collectConfiguredLocalSocksPortsFromConfig(config, range) {
    const used = new Set();
    const outbounds = Array.isArray(config?.outbounds) ? config.outbounds : [];
    for (let i = 0; i < outbounds.length; i += 1) {
        const ob = outbounds[i];
        if (!ob || ob.type !== "socks") {
            continue;
        }
        const host = String(ob.server || "").trim().toLowerCase();
        if (host !== "127.0.0.1" && host !== "localhost") {
            continue;
        }
        const p = Number(ob.server_port);
        if (Number.isInteger(p) && p >= range.start && p <= range.end) {
            used.add(p);
        }
    }
    return used;
}

/**
 * 生成 [start, end] 的连续端口数组。
 * @param {{ start: number, end: number }} range
 * @returns {number[]}
 */
function buildAllPortsFromRange(range) {
    const out = [];
    if (!range || !Number.isInteger(range.start) || !Number.isInteger(range.end)) {
        return out;
    }
    for (let p = range.start; p <= range.end; p += 1) {
        out.push(p);
    }
    return out;
}

/**
 * 选取本机转发用空闲端口：先读 `setting -d` 获取起始端口与数量，再基于 `port_status` 已占用地址求补集。
 * @param {object[]|null|undefined} [statusRows] 若已持有 `port_status` 的 `data` 可传入以避免重复请求
 * @returns {Promise<number|null>}
 */
async function pickLocalIdleSocksPort(statusRows) {
    const range = await getConfiguredLocalPortRange();
    const rowsP = Array.isArray(statusRows)
        ? Promise.resolve(statusRows)
        : nineProxyPortStatusRows();
    const rows = await rowsP;
    const occupied = collectOccupiedLocalPortsFromPortStatus(rows, range);
    return pickFirstUnoccupiedPortInRange(occupied, range);
}

/**
 * 选取本机空闲端口；若 `setting -d + port_status` 未命中，则回退到「all ports - config 已设置端口」。
 * @param {object} [config]
 * @param {object[]|null|undefined} [statusRows]
 * @returns {Promise<number|null>}
 */
async function pickLocalIdleSocksPortWithConfigFallback(config, statusRows) {
    let chosen = await pickLocalIdleSocksPort(statusRows);
    if (chosen != null) {
        return chosen;
    }
    if (!config || typeof config !== "object") {
        return null;
    }
    const range = await getConfiguredLocalPortRange();
    const configuredUsed = collectConfiguredLocalSocksPortsFromConfig(config, range);
    return pickFirstUnoccupiedPortInRange(configuredUsed, range);
}

/**
 * 在 `GET /api/port_status` 结果中找第一个 `public_ip` 与目标 IP（通常来自 query `ip`）一致的端口。
 * 不因 `online === false` 跳过，以便与 9proxy 展示行一致时仍绑定该本地端口。
 * @param {object[]} rows
 * @param {string} targetPublicIp
 * @returns {number|null}
 */
function pickPortFromPortStatus(rows, targetPublicIp) {
    const tip = String(targetPublicIp || "").trim();
    if (!tip || !Array.isArray(rows)) {
        return null;
    }
    for (let i = 0; i < rows.length; i += 1) {
        const row = rows[i];
        if (!row) {
            continue;
        }
        const pub = String(row.public_ip || "").trim();
        if (pub !== tip) {
            continue;
        }
        const port = parsePortFromBindingAddress(row.address);
        if (port == null) {
            continue;
        }
        return port;
    }
    return null;
}

/**
 * 解析代理公网 IP：优先使用调用方传入的 `explicitIp`，否则从 `today_list` 按 id 查找。
 * @param {string} id 代理 id
 * @param {string} [explicitIp]
 * @returns {Promise<string>} 无则返回空字符串
 */
async function resolveProxyIpForId(id, explicitIp) {
    const ip = String(explicitIp || "").trim();
    if (ip) {
        return ip;
    }
    try {
        const res = await axios.get(`${NINE_PROXY_BASE}/api/today_list`, {
            ...AXIOS_OPTS_NO_PROXY,
            params: { t: 2, limit: 500 },
            timeout: 15000
        });
        const body = res.data;
        const arr = Array.isArray(body?.data)
            ? body.data
            : Array.isArray(body?.proxy?.data)
              ? body.proxy.data
              : [];
        const hit = arr.find((p) => String(p?.id) === String(id));
        return hit?.ip ? String(hit.ip).trim() : "";
    } catch (e) {
        console.warn("[9proxy] today_list (resolve ip):", e.message || e);
        return "";
    }
}

/**
 * 将 sing-box 配置中**第一个**出站改为直连型 SOCKS（远端 ip:port + 账密），写回 CONFIG_PATH。
 * 与当前「按 tag 改本地 127.0.0.1 端口」的切换逻辑并存，供其它场景或历史脚本使用。
 * 写入后会异步触发 `systemctl restart sing-box`（失败仅打日志）。
 * @param {{ ip: string, port: number|string, username: string, password: string }} proxy
 */
function updateV2Ray(proxy) {
    const config = JSON.parse(fs.readFileSync(CONFIG_PATH));

    const currentOutbound = Array.isArray(config.outbounds) ? config.outbounds[0] : null;
    const outboundTag = currentOutbound?.tag || "socks-proxy";

    if (!Array.isArray(config.outbounds)) {
        config.outbounds = [];
    }

    // sing-box socks outbound format
    config.outbounds[0] = {
        type: "socks",
        tag: outboundTag,
        server: proxy.ip,
        server_port: Number(proxy.port),
        username: proxy.username,
        password: proxy.password
    };

    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
    restartSingBox().catch((err) => {
        console.error("systemctl restart sing-box failed (updateV2Ray):", err.message || err);
    });
}

/**
 * 执行 `systemctl restart v2ray`（与 sing-box 是否同名服务取决于机器配置）。
 * @returns {Promise<void>}
 */
function restartV2Ray() {
    return new Promise((resolve, reject) => {
        exec("systemctl restart v2ray", (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
}

/**
 * 修改 CONFIG_PATH 后重启 sing-box 使配置生效。
 * @returns {Promise<void>}
 */
function restartSingBox() {
    return new Promise((resolve, reject) => {
        exec("systemctl restart sing-box", (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
}

/**
 * GET /change-ip
 * 拉取 9proxy today_list 原始数据并返回（历史/调试接口，未做 sing-box 写入）。
 */
app.get("/change-ip", async (req, res) => {
    try {
        const proxy = await getProxy();
        if (proxy && proxy.nine_proxy_available === false) {
            return res.json({
                success: false,
                msg: NINE_PROXY_UNAVAILABLE_HINT,
                proxy
            });
        }
        res.json({
            success: true,
            msg: "IP 已切换（SOCKS5）",
            proxy
        });
    } catch (e) {
        res.json({ success: false, error: e.message });
    }
});

/**
 * GET /api/runtime-meta
 * 返回进程 cwd、脚本路径、代理相关环境变量等，便于对比 `pm2` 与直接 `node server.js` 的差异。
 */
app.get("/api/runtime-meta", (req, res) => {
    const pick = (k) => (typeof process.env[k] === "string" ? process.env[k] : "");
    let configExists = null;
    try {
        configExists = fs.existsSync(CONFIG_PATH);
    } catch {
        configExists = false;
    }
    res.json({
        cwd: process.cwd(),
        argv: process.argv,
        execPath: process.execPath,
        mainScript: __filename,
        configPath: CONFIG_PATH,
        configExists,
        userMetaPath: USER_META_PATH,
        nineProxyBase: NINE_PROXY_BASE,
        nineProxyCli: NINE_PROXY_CLI,
        nineProxyOptionalHint: NINE_PROXY_UNAVAILABLE_HINT,
        httpProxy: pick("HTTP_PROXY"),
        httpsProxy: pick("HTTPS_PROXY"),
        allProxy: pick("ALL_PROXY"),
        noProxy: pick("NO_PROXY"),
        pm2Home: pick("PM2_HOME"),
        nodeAppInstance: pick("NODE_APP_INSTANCE")
    });
});

/**
 * GET /api/proxy-list
 * 转发 today_list，为每条代理补充绑定出站 tag 与 WiFi 展示名后返回 JSON。
 * 查询参数：`lite=1` 时跳过对 9proxy 条目的州/省 ipinfo 补全（`enrichProxyState`）；自定义 SOCKS 仍会经 SOCKS 探测出口 IP 与在线状态（通常条数很少）。
 */
app.get("/api/proxy-list", async (req, res) => {
    try {
        const lite =
            req.query.lite === "1"
            || req.query.lite === "true"
            || String(req.query.lite || "").toLowerCase() === "yes";
        const bindingMap = getSocksBindingToUsersMap();
        const result = await getProxy();
        if (Array.isArray(result?.data)) {
            const merged = mergeCustomProxiesIntoList(result.data);
            const probed = await enrichCustomRowsInList(merged);
            const base = lite ? probed : await enrichProxyState(probed);
            const enrichedData = attachBoundUserToProxyList(base, bindingMap);
            return res.json({
                ...result,
                data: enrichedData
            });
        }
        if (Array.isArray(result?.proxy?.data)) {
            const merged = mergeCustomProxiesIntoList(result.proxy.data);
            const probed = await enrichCustomRowsInList(merged);
            const base = lite ? probed : await enrichProxyState(probed);
            const enrichedData = attachBoundUserToProxyList(base, bindingMap);
            return res.json({
                ...result,
                proxy: {
                    ...result.proxy,
                    data: enrichedData
                }
            });
        }
        res.json(result);
    } catch (e) {
        res.status(500).json({
            success: false,
            msg: "获取代理列表失败",
            error: e.message
        });
    }
});

/**
 * GET /api/switch-proxy-custom
 * 将指定出站 tag 切换为**自定义远端 SOCKS5**（与 9proxy 今日列表无关）。
 * 查询参数：`id`（必填，须为 `readCustomProxiesFile` 中的 id，通常为 `custom-` 前缀）、`tag`（sing-box SOCKS 出站 tag，必填）。
 */
async function handleSwitchProxyCustom(req, res) {
    const id = req.query.id;
    const tag = req.query.tag != null ? String(req.query.tag).trim() : "";

    if (!id) {
        return res.status(400).json({
            success: false,
            msg: "缺少代理 id"
        });
    }
    if (!tag) {
        return res.status(400).json({
            success: false,
            msg: "缺少出站 tag（本地 SOCKS 出站）"
        });
    }
    if (!String(id).startsWith("custom-")) {
        return res.status(400).json({
            success: false,
            msg: "本接口仅用于自定义 SOCKS：id 须以 custom- 开头（今日代理请用 GET /api/switch-proxy）"
        });
    }

    try {
        const list = readCustomProxiesFile();
        const entry = list.find((x) => String(x.id) === String(id));
        if (!entry) {
            return res.status(404).json({
                success: false,
                msg: "未找到自定义代理: " + id
            });
        }
        const raw = fs.readFileSync(CONFIG_PATH, "utf8");
        const config = JSON.parse(raw);
        try {
            ensureOutboundIsSocksShellForTag(config, tag);
        } catch (e) {
            return res.status(400).json({
                success: false,
                msg: e.message || String(e)
            });
        }
        const currentRow = Array.isArray(config.outbounds)
            ? config.outbounds.find((o) => o && o.type === "socks" && o.tag === tag)
            : null;
        if (!currentRow) {
            return res.status(400).json({
                success: false,
                msg: "未找到 SOCKS 出站: " + tag
            });
        }
        applyRemoteSocksToConfig(config, tag, entry);
        fs.writeFileSync(CONFIG_PATH, `${JSON.stringify(config, null, 2)}\n`);
        try {
            await restartSingBox();
        } catch (restartErr) {
            return res.status(500).json({
                success: false,
                msg: "配置已写入，但 systemctl restart sing-box 失败",
                error: restartErr.message || String(restartErr),
                tag,
                custom: true
            });
        }
        return res.json({
            success: true,
            msg: "切换成功（自定义 SOCKS，已重启 sing-box）",
            tag,
            custom: true,
            host: entry.host,
            port: entry.port,
            data: { error: false, message: "custom socks" }
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            msg: e.message || "自定义 SOCKS 切换失败",
            error: e.message
        });
    }
}

app.get("/api/switch-proxy-custom", handleSwitchProxyCustom);

/**
 * GET /api/switch-proxy
 * **仅** 9proxy 今日代理：查询参数 `id`（今日代理 id）、`tag`（sing-box SOCKS 出站 tag）、`ip`（公网 IP，可选）。
 * 自定义 SOCKS 请使用 `GET /api/switch-proxy-custom`。
 * 规则：解析公网 IP（query `ip` 优先，否则 today_list）→ 请求 9proxy `GET /api/port_status`，
 * 按该 IP 匹配行的 `public_ip`：若命中则**仅**把该 tag 的 SOCKS 写为 127.0.0.1:该端口、保存 CONFIG_PATH 并重启 sing-box（**不**调用 `/api/forward`）；
 * 若未命中则通过 `setting -d` + `port_status` 在配置端口范围内选取空闲端口，再 `GET /api/forward` 绑定今日代理 `id`，随后同样写入 CONFIG_PATH 并重启 sing-box。
 */
app.get("/api/switch-proxy", async (req, res) => {
    const id = req.query.id;
    const tag = req.query.tag != null ? String(req.query.tag).trim() : "";
    const explicitIp =
        req.query.ip != null && String(req.query.ip).trim() !== ""
            ? String(req.query.ip).trim()
            : "";

    if (!id) {
        return res.status(400).json({
            success: false,
            msg: "缺少代理 id"
        });
    }
    if (!tag) {
        return res.status(400).json({
            success: false,
            msg: "缺少出站 tag（本地 SOCKS 出站）"
        });
    }

    if (String(id).startsWith("custom-")) {
        return res.status(400).json({
            success: false,
            msg: "自定义 SOCKS 请使用 GET /api/switch-proxy-custom?id=" + encodeURIComponent(String(id)) + "&tag=" + encodeURIComponent(tag)
        });
    }

    try {
        const proxyIp = await resolveProxyIpForId(id, explicitIp);
        if (!proxyIp) {
            return res.status(400).json({
                success: false,
                msg:
                    "无法解析代理公网 IP。未安装或未运行代理服务时不能按「今日代理 id」切换；自定义 SOCKS 请使用 GET /api/switch-proxy-custom，或在请求中附带 ip= 公网 IP 参数。"
            });
        }

        const raw = fs.readFileSync(CONFIG_PATH, "utf8");
        const config = JSON.parse(raw);
        try {
            ensureOutboundIsSocksShellForTag(config, tag);
        } catch (e) {
            return res.status(400).json({
                success: false,
                msg: e.message || String(e)
            });
        }
        const currentRow = Array.isArray(config.outbounds)
            ? config.outbounds.find((o) => o && o.type === "socks" && o.tag === tag)
            : null;
        if (!currentRow) {
            return res.status(400).json({
                success: false,
                msg: "未找到 SOCKS 出站: " + tag
            });
        }

        const statusRows = await nineProxyPortStatusRows();
        let chosen = pickPortFromPortStatus(statusRows, proxyIp);
        const matchedByPortStatus = chosen != null;

        if (chosen == null) {
            chosen = await pickLocalIdleSocksPortWithConfigFallback(config, statusRows);
        }
        if (chosen == null) {
            return res.status(503).json({
                success: false,
                msg:
                    "无可用本地转发端口（已尝试 setting -d + port_status，并已对比 config 已设置端口）。未安装代理服务时请使用 GET /api/switch-proxy-custom 切换自定义 SOCKS。"
            });
        }

        let forwardData = null;
        if (!matchedByPortStatus) {
            let result;
            try {
                result = await axios.get(`${NINE_PROXY_BASE}/api/forward`, {
                    ...AXIOS_OPTS_NO_PROXY,
                    params: {
                        t: 2,
                        port: chosen,
                        id
                    },
                    timeout: 20000
                });
            } catch (e) {
                return res.status(503).json({
                    success: false,
                    msg: NINE_PROXY_UNAVAILABLE_HINT,
                    error: e.message || String(e)
                });
            }

            if (result.data?.error === true) {
                return res.status(502).json({
                    success: false,
                    msg: result.data?.message || "forward 失败",
                    data: result.data
                });
            }
            forwardData = result.data;
        }

        applySocksPortToConfig(config, tag, chosen);
        fs.writeFileSync(CONFIG_PATH, `${JSON.stringify(config, null, 2)}\n`);

        try {
            await restartSingBox();
        } catch (restartErr) {
            return res.status(500).json({
                success: false,
                msg: "配置已写入，但 systemctl restart sing-box 失败",
                error: restartErr.message || String(restartErr),
                port: chosen,
                tag,
                data: forwardData
            });
        }

        res.json({
            success: true,
            msg: matchedByPortStatus
                ? "切换成功（port_status 已匹配 public_ip，仅更新本地端口并已重启 sing-box）"
                : "切换成功（已 forward、写入 sing-box 并已重启 sing-box）",
            port: chosen,
            tag,
            forward_called: !matchedByPortStatus,
            data: forwardData
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            msg: "切换失败",
            error: e.message
        });
    }
});

/**
 * GET /api/switch-proxy-direct
 * 将指定 tag 的出站改为 sing-box `direct`（与 `route.rules[].outbound` 同名，不经 SOCKS）。
 * 查询参数：`tag`（必填，勿使用保留名 `direct`）。
 */
app.get("/api/switch-proxy-direct", async (req, res) => {
    const tag = req.query.tag != null ? String(req.query.tag).trim() : "";
    if (!tag) {
        return res.status(400).json({
            success: false,
            msg: "缺少出站 tag"
        });
    }
    if (tag === "direct") {
        return res.status(400).json({
            success: false,
            msg: "不能使用保留 tag「direct」，请使用用户路由对应的出站 tag（如 cb357692）"
        });
    }
    try {
        const raw = fs.readFileSync(CONFIG_PATH, "utf8");
        const config = JSON.parse(raw);
        const ob = getOutboundObForTag(config, tag);
        if (!ob) {
            return res.status(404).json({
                success: false,
                msg: "未找到出站: " + tag
            });
        }
        if (isOutboundTypeDirect(ob)) {
            return res.json({
                success: true,
                msg: "该出站已是直连，无需变更",
                tag,
                direct: true,
                data: { error: false, message: "direct" }
            });
        }
        applyDirectOutboundToConfig(config, tag);
        fs.writeFileSync(CONFIG_PATH, `${JSON.stringify(config, null, 2)}\n`);
        try {
            await restartSingBox();
        } catch (restartErr) {
            return res.status(500).json({
                success: false,
                msg: "配置已写入，但 systemctl restart sing-box 失败",
                error: restartErr.message || String(restartErr),
                tag,
                direct: true
            });
        }
        return res.json({
            success: true,
            msg: "已切换为直连出站（已重启 sing-box）",
            tag,
            direct: true,
            data: { error: false, message: "direct" }
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            msg: e.message || "切换直连失败",
            error: e.message
        });
    }
});

/**
 * GET /api/refresh-offline-nine
 * 仅用于「用户管理」中本地 9proxy 离线刷新：按 `public_ip` 从 today-list-cache 找 `id`，
 * 再请求 9proxy `GET /api/forward` 重新绑定当前 tag 对应本地端口。
 * 查询参数：`tag`、`public_ip`。
 */
app.get("/api/refresh-offline-nine", async (req, res) => {
    const tag = req.query.tag != null ? String(req.query.tag).trim() : "";
    const publicIp = req.query.public_ip != null ? String(req.query.public_ip).trim() : "";
    if (!tag) {
        return res.status(400).json({
            success: false,
            msg: "缺少 tag"
        });
    }
    if (!publicIp) {
        return res.status(400).json({
            success: false,
            msg: "缺少 public_ip"
        });
    }
    const todayId = findTodayProxyIdByPublicIpFromCache(publicIp);
    if (!todayId) {
        return res.status(404).json({
            success: false,
            msg: "未在 today-list-cache 中找到该 public_ip 对应的 today id",
            public_ip: publicIp
        });
    }
    try {
        const raw = fs.readFileSync(CONFIG_PATH, "utf8");
        const config = JSON.parse(raw);
        const ob = getOutboundObForTag(config, tag);
        if (!ob) {
            return res.status(404).json({
                success: false,
                msg: "未找到出站: " + tag
            });
        }
        if (String(ob.type || "").toLowerCase() !== "socks") {
            return res.status(400).json({
                success: false,
                msg: "目标出站不是 SOCKS: " + tag
            });
        }
        const host = String(ob.server || "").trim().toLowerCase();
        if (host !== "127.0.0.1" && host !== "localhost" && host !== "::1") {
            return res.status(400).json({
                success: false,
                msg: "仅支持本地 9proxy 出站刷新（server 需为 127.0.0.1/localhost/::1）"
            });
        }
        const localPort = Number(ob.server_port);
        if (!Number.isInteger(localPort) || localPort <= 0 || localPort > 65535) {
            return res.status(400).json({
                success: false,
                msg: "当前出站端口无效: " + String(ob.server_port || "")
            });
        }
        let r;
        try {
            r = await axios.get(`${NINE_PROXY_BASE}/api/forward`, {
                ...AXIOS_OPTS_NO_PROXY,
                params: {
                    t: 2,
                    port: localPort,
                    id: todayId
                },
                timeout: 20000
            });
        } catch (e) {
            return res.status(503).json({
                success: false,
                msg: NINE_PROXY_UNAVAILABLE_HINT,
                error: e.message || String(e)
            });
        }
        if (r.data?.error === true) {
            return res.status(502).json({
                success: false,
                msg: r.data?.message || "forward 失败",
                data: r.data
            });
        }
        return res.json({
            success: true,
            msg: "刷新成功（已请求 forward）",
            tag,
            public_ip: publicIp,
            id: todayId,
            port: localPort,
            data: r.data
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            msg: e.message || "刷新失败",
            error: e.message
        });
    }
});

/**
 * GET /api/location-codes
 * 返回内置州/市/ISP 表整理后的国家列表、各国州/城市/ISP 及完整州行数据，供前端筛选规则与新增代理。
 */
app.get("/api/location-codes", (req, res) => {
    const data = getLocationCodes();
    res.json({
        success: true,
        ...data
    });
});

/**
 * GET /api/singbox-users
 * 读取 CONFIG_PATH 中 route.rules 的 outbound 与对应 SOCKS 地址、WiFi 名，供「用户管理」页表格。
 * 若某用户 SOCKS 出站为远端（非 127.0.0.1），则经 SOCKS 探测出口 IP / 国家 / 州省 / 城市 / 在线，置于 `port_status_overlay`（与 port_status 字段对齐供前端复用）。
 * 调试：查询参数 `debug=1`（或 `true`/`yes`）时响应体增加 `debug: string[]`，且每条写入服务端控制台。
 */
app.get("/api/singbox-users", async (req, res) => {
    const wantDebug =
        req.query.debug === "1"
        || req.query.debug === "true"
        || String(req.query.debug || "").toLowerCase() === "yes";
    const debugLogs = wantDebug ? [] : null;

    const { ok, error, users } = getSingboxRouteUsers();
    if (!ok) {
        return res.json({
            success: ok,
            msg: error || "读取失败",
            users,
            ...(wantDebug ? { debug: debugLogs || [] } : {})
        });
    }
    try {
        if (!fs.existsSync(CONFIG_PATH)) {
            pushSingboxDebug(debugLogs, "CONFIG_PATH missing, skip enrich");
            return res.json({
                success: true,
                msg: "ok",
                users,
                ...(wantDebug ? { debug: debugLogs || [] } : {})
            });
        }
        const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
        const enriched = await enrichSingboxUsersWithSocksGeo(users, config, debugLogs);
        pushSingboxDebug(debugLogs, `enrichSingboxUsersWithSocksGeo done users_out=${enriched.length}`);
        return res.json({
            success: true,
            msg: "ok",
            users: enriched,
            ...(wantDebug ? { debug: debugLogs } : {})
        });
    } catch (e) {
        pushSingboxDebug(debugLogs, `route try/catch: ${e.message || String(e)}`);
        return res.json({
            success: true,
            msg: "ok",
            users,
            ...(wantDebug ? { debug: debugLogs || [] } : {})
        });
    }
});

/**
 * GET /api/user-wifi
 * 查询参数：`tag`（出站 tag，必填）、`wifi_name`（可选；留空或仅空格则删除该 tag 的 WiFi 备注）。
 * 读写 `USER_META_PATH` 中的 `wifi_by_outbound`，不触碰 sing-box 主配置。
 */
app.get("/api/user-wifi", (req, res) => {
    const tag = req.query.tag != null ? String(req.query.tag).trim() : "";
    const wifiName = req.query.wifi_name != null ? String(req.query.wifi_name) : "";
    if (!tag) {
        return res.status(400).json({
            success: false,
            msg: "缺少 tag"
        });
    }
    const { ok, error } = setOutboundWifiInUserMeta(tag, wifiName);
    if (!ok) {
        return res.status(500).json({
            success: false,
            msg: error || "保存失败"
        });
    }
    res.json({
        success: true,
        msg: "ok",
        tag,
        wifi_name: String(wifiName).trim()
    });
});

/**
 * GET /api/user-nine-filter?tag=出站tag
 * 读取 `proxy-user-meta.json` 内按 tag 保存的筛选规则（country/state/city/isp/zip/today；t 固定为 2，仅持久化）。
 */
app.get("/api/user-nine-filter", (req, res) => {
    const tag = req.query.tag != null ? String(req.query.tag).trim() : "";
    if (!tag) {
        return res.status(400).json({ success: false, msg: "缺少 tag" });
    }
    res.json({
        success: true,
        tag,
        filter: getNineFilterForOutbound(tag)
    });
});

/**
 * POST /api/user-nine-filter
 * JSON：`{ "tag": "…", "filter": { "country", "states", "cities", "isps", "zip", "today" } }`（t 固定为 2，可省略；zip 可选），写入 meta（仅保存，不请求 9proxy）。
 */
app.post("/api/user-nine-filter", (req, res) => {
    const tag = req.body?.tag != null ? String(req.body.tag).trim() : "";
    if (!tag) {
        return res.status(400).json({ success: false, msg: "缺少 tag" });
    }
    const f = req.body?.filter;
    const country = typeof f?.country === "string" ? f.country.trim().toUpperCase() : "";
    if (!country) {
        return res.status(400).json({ success: false, msg: "filter.country 必填（国家代码）" });
    }
    const r = setNineFilterForOutbound(tag, f);
    if (!r.ok) {
        return res.status(500).json({ success: false, msg: r.error || "保存失败" });
    }
    res.json({ success: true, msg: "ok", tag, filter: r.filter });
});

/**
 * 添加自定义 SOCKS5（格式 host:port:username:password），持久化到 custom-proxies.json。
 */
app.post("/api/custom-proxies", async (req, res) => {
    try {
        const line =
            typeof req.body?.line === "string"
                ? req.body.line
                : typeof req.body?.proxy === "string"
                  ? req.body.proxy
                  : "";
        const parsed = parseSocksProxyLine(line);
        if (!parsed) {
            return res.status(400).json({
                success: false,
                msg: "格式应为 host:port:username:password（端口 1-65535）"
            });
        }
        const list = readCustomProxiesFile();
        const dup = findDuplicateCustomEntry(list, parsed);
        if (dup) {
            return res.status(409).json({
                success: false,
                msg: "已存在相同的自定义代理（host、端口、用户名、密码一致），请勿重复保存",
                duplicate_id: dup.id
            });
        }
        const id = "custom-" + crypto.randomUUID();
        const entry = {
            id,
            host: parsed.host,
            port: parsed.port,
            username: parsed.username,
            password: parsed.password,
            created_at: new Date().toISOString()
        };
        list.push(entry);
        writeCustomProxiesFile(list);
        const apiRow = customProxyToApiRow(entry);
        const data = await enrichCustomProxyFromEntry(apiRow, entry);
        return res.json({
            success: true,
            msg: "已保存自定义代理",
            data
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            msg: e.message || "保存自定义代理失败",
            error: e.message
        });
    }
});

/**
 * GET /api/port_status
 * 转发 9proxy port_status，并为每条端口记录的 public_ip 补充 ip_country / ip_region / ip_city（ipinfo）。
 */
app.get("/api/port_status", async (req, res) => {
    try {
        const r = await axios.get(`${NINE_PROXY_BASE}/api/port_status?t=2`, {
            ...AXIOS_OPTS_NO_PROXY,
            timeout: 15000
        });
        const body = r.data;
        const list = Array.isArray(body?.data) ? body.data : [];
        const enriched = await Promise.all(
            list.map(async (row) => {
                if (!row || typeof row !== "object") {
                    return row;
                }
                const ip = String(row.public_ip || "").trim();
                const geo = ip ? await getIpGeo(ip) : { country: "", region: "", city: "" };
                const city = String(row.city || row.ip_city || "").trim() || geo.city;
                const country = String(
                    row.ip_country || row.country_code || row.country || ""
                ).trim() || geo.country;
                const region = String(
                    row.ip_region || row.state || row.region || ""
                ).trim() || geo.region;
                return {
                    ...row,
                    ip_country: country,
                    ip_region: region,
                    ip_city: city
                };
            })
        );
        res.json({
            ...body,
            data: enriched
        });
    } catch (e) {
        console.warn("[9proxy] /api/port_status route:", e.message || e);
        res.json({
            error: true,
            message: NINE_PROXY_UNAVAILABLE_HINT,
            data: [],
            nine_proxy_available: false
        });
    }
});

/**
 * GET /api/port-check（兼容 /api/port_check）
 * 将本服务收到的 query 原样透传至上游 GET /api/port_check，响应体与 HTTP 状态与上游一致。
 * 常用参数：`t=2`、`ports=all`（或单个端口）。
 */
async function handlePortCheckProxy(req, res) {
    try {
        const r = await axios.get(`${NINE_PROXY_BASE}/api/port_check`, {
            ...AXIOS_OPTS_NO_PROXY,
            params: req.query,
            timeout: 15000
        });
        const st = typeof r.status === "number" && r.status > 0 ? r.status : 200;
        return res.status(st).json(r.data);
    } catch (e) {
        console.warn("[9proxy] /api/port-check (→ /api/port_check):", e.message || e);
        if (e.response && e.response.data != null) {
            return res.status(e.response.status || 502).json(e.response.data);
        }
        return res.status(502).json({
            error: true,
            message: NINE_PROXY_UNAVAILABLE_HINT,
            nine_proxy_available: false,
            detail: e.message || String(e)
        });
    }
}
app.get("/api/port-check", handlePortCheckProxy);
app.get("/api/port_check", handlePortCheckProxy);

/**
 * GET /api/idle-port（兼容 /api/idle_port）
 * 返回一个空闲端口、配置范围内所有端口、以及 `/api/port_status` 原始数据。
 */
async function handleIdlePort(req, res) {
    try {
        const [range, statusRows] = await Promise.all([
            getConfiguredLocalPortRange(),
            nineProxyPortStatusRows()
        ]);
        const occupied = collectOccupiedLocalPortsFromPortStatus(statusRows, range);
        const idlePort = pickFirstUnoccupiedPortInRange(occupied, range);
        return res.json({
            success: true,
            idle_port: idlePort,
            all_ports: buildAllPortsFromRange(range),
            port_range: range,
            port_status: statusRows
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            msg: "获取空闲端口失败",
            error: e.message || String(e)
        });
    }
}
app.get("/api/idle-port", handleIdlePort);
app.get("/api/idle_port", handleIdlePort);

/**
 * GET /api/port-free
 * 将本服务收到的 query 原样透传至 9proxy 的 GET /api/port_free（释放/回收本地端口等资源，不是「查空闲」）。
 * 参数名与取值以 9proxy 文档为准（常见如 `t`、`ports`），响应体与 HTTP 状态与 9proxy 一致。
 */
app.get("/api/port-free", async (req, res) => {
    try {
        const r = await axios.get(`${NINE_PROXY_BASE}/api/port_free`, {
            ...AXIOS_OPTS_NO_PROXY,
            params: req.query,
            timeout: 15000
        });
        const st = typeof r.status === "number" && r.status > 0 ? r.status : 200;
        res.status(st).json(r.data);
    } catch (e) {
        console.warn("[9proxy] /api/port-free (→ 9proxy /api/port_free 释放端口):", e.message || e);
        if (e.response && e.response.data != null) {
            return res.status(e.response.status || 502).json(e.response.data);
        }
        res.status(502).json({
            error: true,
            message: NINE_PROXY_UNAVAILABLE_HINT,
            nine_proxy_available: false,
            detail: e.message || String(e)
        });
    }
});

/**
 * GET /api/add-proxy
 * 将允许的 query 参数透传至 9proxy `GET /api/proxy` 以创建新代理（默认 num=1、port=60000、t=2）。
 */
app.get("/api/add-proxy", async (req, res) => {
    try {
        const allowedKeys = [
            "num",
            "country",
            "state",
            "city",
            "zip",
            "isp",
            "port",
            "ports",
            "plan",
            "t"
        ];
        const params = {};
        allowedKeys.forEach((key) => {
            const value = req.query[key];
            if (typeof value === "string" && value.trim() !== "") {
                params[key] = value.trim();
            }
        });
        if (req.query.today !== undefined && req.query.today !== "") {
            const tv = String(req.query.today).trim().toLowerCase();
            if (tv === "true" || tv === "1") {
                params.today = "true";
            } else if (tv === "false" || tv === "0") {
                params.today = "false";
            }
        }
        if (!params.num) params.num = "1";
        if (!params.port) params.port = "60000";
        if (!params.t) params.t = "2";

        const result = await axios.get(`${NINE_PROXY_BASE}/api/proxy`, {
            ...AXIOS_OPTS_NO_PROXY,
            params
        });
        res.json({
            success: true,
            msg: "新增代理请求成功",
            data: result.data
        });
    } catch (e) {
        res.json({
            success: false,
            msg: NINE_PROXY_UNAVAILABLE_HINT,
            error: e.message || String(e)
        });
    }
});

/** @type {Map<string, Map<string, string>> | null} country → (isp_code 小写 → isp_name) */
let nineIspCodeToNameByCountry = null;
/** @type {Map<string, string> | null} `country\\0city_code小写` → city_name */
let nineCityKeyToName = null;
/** @type {Map<string, string> | null} `country\\0state_code小写` → state_name */
let nineStateKeyToName = null;

function ensureNineProxyIspLookup() {
    if (nineIspCodeToNameByCountry) {
        return nineIspCodeToNameByCountry;
    }
    const root = new Map();
    for (let i = 0; i < ISP_CODE_ROWS.length; i += 1) {
        const r = ISP_CODE_ROWS[i];
        const cc = String(r.country_code || "")
            .trim()
            .toUpperCase();
        const code = String(r.isp_code || "")
            .trim()
            .toLowerCase();
        if (!cc || !code) {
            continue;
        }
        if (!root.has(cc)) {
            root.set(cc, new Map());
        }
        const name = String(r.isp_name || r.isp_code || "").trim();
        const inner = root.get(cc);
        inner.set(code, name || code);
        if (name) {
            inner.set(name.toLowerCase(), name);
        }
    }
    nineIspCodeToNameByCountry = root;
    return root;
}

function ensureNineProxyCityLookup() {
    if (nineCityKeyToName) {
        return nineCityKeyToName;
    }
    const m = new Map();
    for (let i = 0; i < CITY_CODE_ROWS.length; i += 1) {
        const r = CITY_CODE_ROWS[i];
        const cc = String(r.country_code || "")
            .trim()
            .toUpperCase();
        const code = String(r.city_code || "")
            .trim()
            .toLowerCase();
        if (!cc || !code) {
            continue;
        }
        const name = String(r.city_name || r.city_code || "").trim();
        const canon = name || code;
        m.set(`${cc}\0${code}`, canon);
        if (name) {
            m.set(`${cc}\0${name.toLowerCase()}`, canon);
        }
    }
    nineCityKeyToName = m;
    return m;
}

function ensureNineProxyStateLookup() {
    if (nineStateKeyToName) {
        return nineStateKeyToName;
    }
    const m = new Map();
    for (let i = 0; i < STATE_CODE_ROWS.length; i += 1) {
        const r = STATE_CODE_ROWS[i];
        const cc = String(r.country_code || "")
            .trim()
            .toUpperCase();
        const sc = String(r.state_code || "")
            .trim()
            .toLowerCase();
        if (!cc || !sc) {
            continue;
        }
        const nm =
            r.state_name != null && String(r.state_name).trim() !== ""
                ? String(r.state_name).trim()
                : String(r.state_code || "")
                      .split("_")
                      .map((part) =>
                          part ? part.charAt(0).toUpperCase() + part.slice(1).toLowerCase() : ""
                      )
                      .filter(Boolean)
                      .join(" ");
        m.set(`${cc}\0${sc}`, nm);
        if (nm.toLowerCase() !== sc) {
            m.set(`${cc}\0${nm.toLowerCase()}`, nm);
        }
    }
    nineStateKeyToName = m;
    return m;
}

function buildNineProxyIspParam(country, ispTokens) {
    const cc = String(country || "")
        .trim()
        .toUpperCase();
    const byCountry = ensureNineProxyIspLookup().get(cc);
    const parts = [];
    const arr = Array.isArray(ispTokens) ? ispTokens : [];
    for (let i = 0; i < arr.length; i += 1) {
        let code = String(arr[i] || "").trim();
        if (!code) {
            continue;
        }
        const bar = code.indexOf("|");
        if (bar !== -1) {
            const c0 = code.slice(0, bar).trim().toUpperCase();
            code = code.slice(bar + 1).trim();
            if (c0 && c0 !== cc) {
                continue;
            }
        }
        const key = code.toLowerCase();
        const disp =
            byCountry && byCountry.has(key) ? byCountry.get(key) : code;
        if (disp) {
            parts.push(disp);
        }
    }
    return parts.join(",");
}

function buildNineProxyCityParam(country, cityTokens) {
    const cc = String(country || "")
        .trim()
        .toUpperCase();
    const map = ensureNineProxyCityLookup();
    const parts = [];
    const arr = Array.isArray(cityTokens) ? cityTokens : [];
    for (let i = 0; i < arr.length; i += 1) {
        let code = String(arr[i] || "").trim();
        if (!code) {
            continue;
        }
        const bar = code.indexOf("|");
        if (bar !== -1) {
            const c0 = code.slice(0, bar).trim().toUpperCase();
            code = code.slice(bar + 1).trim();
            if (c0 && c0 !== cc) {
                continue;
            }
        }
        const key = `${cc}\0${code.toLowerCase()}`;
        const disp = map.get(key) || code.replace(/_/g, " ");
        if (disp) {
            parts.push(disp);
        }
    }
    return parts.join(",");
}

function buildNineProxyStateParam(country, stateTokens) {
    const cc = String(country || "")
        .trim()
        .toUpperCase();
    const map = ensureNineProxyStateLookup();
    const parts = [];
    const arr = Array.isArray(stateTokens) ? stateTokens : [];
    for (let i = 0; i < arr.length; i += 1) {
        let code = String(arr[i] || "").trim();
        if (!code) {
            continue;
        }
        const bar = code.indexOf("|");
        if (bar !== -1) {
            const c0 = code.slice(0, bar).trim().toUpperCase();
            code = code.slice(bar + 1).trim();
            if (c0 && c0 !== cc) {
                continue;
            }
        }
        const key = `${cc}\0${code.toLowerCase()}`;
        const disp =
            map.get(key) ||
            code
                .split("_")
                .map((part) =>
                    part ? part.charAt(0).toUpperCase() + part.slice(1).toLowerCase() : ""
                )
                .filter(Boolean)
                .join(" ");
        if (disp) {
            parts.push(disp);
        }
    }
    return parts.join(",");
}

function serializeNineProxyApiProxyQuery(p) {
    const order = ["t", "num", "port", "country", "isp", "city", "zip", "state", "today"];
    const parts = [];
    for (let i = 0; i < order.length; i += 1) {
        const key = order[i];
        const v = p[key];
        if (v === undefined || v === null) {
            continue;
        }
        const s = String(v).trim();
        if (s === "") {
            continue;
        }
        parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(s)}`);
    }
    return parts.join("&");
}

/**
 * 9proxy `GET /api/proxy` 成功响应示例：`{ "error": false, "message": "Success", "data": ["127.0.0.1:60006"] }`。
 * 优先从 `data[0]`（`host:port`）解析端口；解析失败时用 fallbackPort。
 * @param {object|null|undefined} body
 * @param {number|string} fallbackPort
 * @returns {number|null}
 */
function parsePortFromNineProxyProxyResponse(body, fallbackPort) {
    const fb = Number(fallbackPort);
    if (!Number.isFinite(fb) || fb <= 0) {
        return null;
    }
    const arr =
        body && typeof body === "object" && Array.isArray(body.data) ? body.data : [];
    const first = arr.length > 0 && arr[0] != null ? String(arr[0]).trim() : "";
    if (first) {
        const colon = first.lastIndexOf(":");
        if (colon > 0) {
            const p = Number(first.slice(colon + 1).trim());
            if (Number.isFinite(p) && p > 0 && p <= 65535) {
                return p;
            }
        }
    }
    return fb;
}

/**
 * GET /api/proxy?tag=出站tag
 * 读取该 tag 已保存的筛选规则，通过 `setting -d` 与 `GET /api/port_status` 选取空闲端口，
 * 再以 num=1、t=2 及筛选字段调用 9proxy `GET /api/proxy`（isp/city/state 由内建表转为展示名，query 键顺序固定）。
 * 9proxy 返回 `error: false` 且（可选）从 `data` 解析端口后：将该 tag 的 SOCKS 出站写为 `127.0.0.1:port`，保存 CONFIG_PATH 并 `systemctl restart sing-box`。
 */
app.get("/api/proxy", async (req, res) => {
    const tag = req.query.tag != null ? String(req.query.tag).trim() : "";
    if (!tag) {
        return res.status(400).json({
            success: false,
            msg: "缺少 tag（用于读取已保存的筛选规则）"
        });
    }
    const f = getNineFilterForOutbound(tag);
    if (!f.country) {
        return res.status(400).json({
            success: false,
            msg: "该出站尚未保存筛选规则或缺少国家，请先打开「筛选规则」配置并保存"
        });
    }
    let nineProxyRequestUrl = null;
    let nineProxyRequestParams = null;
    try {
        const raw = fs.readFileSync(CONFIG_PATH, "utf8");
        const cfgForPortPick = JSON.parse(raw);
        const port = await pickLocalIdleSocksPortWithConfigFallback(cfgForPortPick);
        if (port == null) {
            return res.json({
                success: false,
                msg: "无可用本地 SOCKS 端口（已尝试 setting -d + port_status，并已对比 config 已设置端口）"
            });
        }
        const stateStr = buildNineProxyStateParam(f.country, f.states);
        const cityStr = buildNineProxyCityParam(f.country, f.cities);
        const ispStr = buildNineProxyIspParam(f.country, f.isps);
        const zipStr = f.zip != null ? String(f.zip).trim() : "";
        const params = {};
        params.t = "2";
        params.num = "1";
        params.port = String(port);
        params.country = f.country;
        if (ispStr) {
            params.isp = ispStr;
        }
        if (cityStr) {
            params.city = cityStr;
        }
        if (zipStr) {
            params.zip = zipStr;
        }
        if (stateStr) {
            params.state = stateStr;
        }
        if (f.today) {
            params.today = "true";
        }
        nineProxyRequestUrl = `${NINE_PROXY_BASE}/api/proxy`;
        nineProxyRequestParams = { ...params };
        const result = await axios.get(nineProxyRequestUrl, {
            ...AXIOS_OPTS_NO_PROXY,
            params,
            paramsSerializer: serializeNineProxyApiProxyQuery
        });
        const nineBody = result.data;
        if (nineBody && typeof nineBody === "object" && nineBody.error === true) {
            return res.json({
                success: false,
                msg:
                    (nineBody.message && String(nineBody.message)) ||
                    (nineBody.msg && String(nineBody.msg)) ||
                    "/api/proxy 返回失败",
                tag,
                port,
                filter: f,
                data: nineBody,
                nine_proxy_api: nineProxyRequestUrl,
                nine_proxy_params: nineProxyRequestParams
            });
        }

        const boundPort = parsePortFromNineProxyProxyResponse(nineBody, port);
        if (boundPort == null) {
            return res.status(502).json({
                success: false,
                msg: "无法确定绑定端口（请检查响应 data）",
                tag,
                port,
                filter: f,
                data: nineBody,
                nine_proxy_api: nineProxyRequestUrl,
                nine_proxy_params: nineProxyRequestParams
            });
        }

        try {
            if (!fs.existsSync(CONFIG_PATH)) {
                throw new Error("配置文件不存在: " + CONFIG_PATH);
            }
            const raw = fs.readFileSync(CONFIG_PATH, "utf8");
            const config = JSON.parse(raw);
            ensureOutboundIsSocksShellForTag(config, tag);
            applySocksPortToConfig(config, tag, boundPort);
            fs.writeFileSync(CONFIG_PATH, `${JSON.stringify(config, null, 2)}\n`);
            await restartSingBox();
        } catch (cfgErr) {
            return res.status(500).json({
                success: false,
                msg:
                    "代理请求已成功，但更新 sing-box 配置或重启失败: " +
                    (cfgErr.message || String(cfgErr)),
                tag,
                port: boundPort,
                filter: f,
                data: nineBody,
                nine_proxy_api: nineProxyRequestUrl,
                nine_proxy_params: nineProxyRequestParams
            });
        }

        res.json({
            success: true,
            msg: "已按筛选规则请求新代理，并已更新 sing-box 出站、重启 sing-box",
            port: boundPort,
            tag,
            filter: f,
            singbox_updated: true,
            data: nineBody
        });
    } catch (e) {
        const out = {
            success: false,
            msg: NINE_PROXY_UNAVAILABLE_HINT,
            error: e.message || String(e)
        };
        if (nineProxyRequestUrl) {
            out.nine_proxy_api = nineProxyRequestUrl;
            out.nine_proxy_params = nineProxyRequestParams;
        }
        res.json(out);
    }
});

/**
 * GET /api/9proxy-account
 * 本机执行 `9proxy setting -d` 判断是否登录；已登录时再执行 `9proxy proxy -b` 取剩余 IP。
 */
app.get("/api/9proxy-account", async (req, res) => {
    const setting = await nineProxyExecFile(["setting", "-d"], 18000);
    const settingText = setting.stdout + "\n" + setting.stderr;
    const logged = parseNineProxyUserLogged(settingText);
    const payload = {
        success: true,
        cli: NINE_PROXY_CLI,
        setting_ok: setting.ok,
        logged,
        remaining_ips: null,
        balance_ok: null,
        setting_snippet: settingText.trim().slice(0, 1200)
    };
    if (!setting.ok) {
        payload.cli_error = setting.error || "执行 setting -d 失败";
    }
    if (logged === true) {
        const bal = await nineProxyExecFile(["proxy", "-b"], 18000);
        payload.balance_ok = bal.ok;
        const btext = bal.stdout + "\n" + bal.stderr;
        payload.remaining_ips = parseNineProxyRemainingIps(btext);
        if (!bal.ok) {
            payload.balance_error = bal.error || bal.stderr.trim() || "执行 proxy -b 失败";
        } else if (payload.remaining_ips == null) {
            payload.balance_error = "未能从输出中解析剩余 IP 数量";
            payload.balance_snippet = btext.trim().slice(0, 1200);
        }
    }
    res.json(payload);
});

/**
 * GET /api/proxy-setting（兼容 /api/9proxy-setting）
 * 本机执行 `setting -d`，返回原始输出与结构化字段。
 */
async function handleProxySettingDump(req, res) {
    const setting = await nineProxyExecFile(["setting", "-d"], 18000);
    const text = `${String(setting.stdout || "")}\n${String(setting.stderr || "")}`.trim();
    const parsed = parseSettingDumpLines(text);
    const range = parsePortRangeFromSettingDump(text);
    const payload = {
        success: setting.ok,
        setting_ok: setting.ok,
        raw: text,
        parsed,
        user_logged: parseNineProxyUserLogged(text),
        port_range: range
    };
    if (!setting.ok) {
        payload.msg = setting.error || "执行 setting -d 失败";
        payload.error = setting.error || "setting -d failed";
        return res.status(503).json(payload);
    }
    return res.json(payload);
}
app.get("/api/proxy-setting", handleProxySettingDump);
app.get("/api/9proxy-setting", handleProxySettingDump);

/**
 * POST /api/9proxy-login
 * JSON：`{ "username": "…", "password": "…" }`，本机执行 `9proxy auth -u … -p …`。
 */
app.post("/api/9proxy-login", async (req, res) => {
    const username = String(req.body?.username ?? "").trim();
    const password = String(req.body?.password ?? "");
    if (!username) {
        return res.status(400).json({ success: false, msg: "请输入账号" });
    }
    if (!password) {
        return res.status(400).json({ success: false, msg: "请输入密码" });
    }
    if (username.length > 512 || password.length > 512) {
        return res.status(400).json({ success: false, msg: "账号或密码过长" });
    }
    const r = await nineProxyExecFile(["auth", "-u", username, "-p", password], 40000);
    const out = (r.stdout + "\n" + r.stderr).trim();
    const loggedInOk = /Logged in successfully/i.test(out);
    const authBad =
        /Incorrect|try again|invalid password|invalid email|authentication failed|登录失败/i.test(
            out
        );
    if (loggedInOk && !authBad) {
        return res.json({
            success: true,
            msg: "登录成功",
            detail: out.slice(0, 500)
        });
    }
    const firstLine =
        out.split(/\r?\n/).find((line) => String(line).trim() !== "") || "";
    const msg = firstLine || r.error || (r.ok ? "登录未成功" : "auth 执行失败");
    return res.status(401).json({
        success: false,
        msg,
        detail: out.slice(0, 800)
    });
});

/**
 * POST /api/9proxy-logout
 * 本机执行 `9proxy auth -l` 退出 9proxy 账号登录。
 */
app.post("/api/9proxy-logout", async (req, res) => {
    const r = await nineProxyExecFile(["auth", "-l"], 25000);
    const out = (r.stdout + "\n" + r.stderr).trim();
    if (!r.ok) {
        return res.status(503).json({
            success: false,
            msg: r.error || out || "auth -l 执行失败",
            detail: out.slice(0, 800)
        });
    }
    res.json({
        success: true,
        msg: "已退出代理服务登录",
        detail: out.slice(0, 500)
    });
});

/**
 * GET /
 * 返回内嵌 sing-box 控制台 HTML（用户管理、代理列表、切换/新增等前端脚本）。
 * 文档标题 `<title>` 使用请求主机名（`req.hostname` 或 `Host` 头去掉端口），无则回退为「代理控制台」。
 */
app.get("/", (req, res) => {
    let titleHost = String(req.hostname || "").trim();
    if (!titleHost) {
        titleHost = String(req.get("host") || "")
            .trim()
            .split(":")[0]
            .trim();
    }
    const pageTitle = (titleHost || "代理控制台")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    res.send(`<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${pageTitle}</title>
  <style>
    * {
      box-sizing: border-box;
    }
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      color: #1f2937;
      background: #e5e7eb;
      min-height: 100vh;
    }
    .app-shell {
      display: flex;
      min-height: 100vh;
    }
    .sidebar {
      width: 220px;
      flex-shrink: 0;
      background: #111827;
      color: #e5e7eb;
      padding: 20px 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .sidebar-brand {
      padding: 0 16px 16px;
      font-size: 15px;
      font-weight: 600;
      color: #fff;
      border-bottom: 1px solid #374151;
      margin-bottom: 8px;
    }
    .sidebar nav {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 0 10px;
    }
    .nav-item {
      display: block;
      width: 100%;
      text-align: left;
      padding: 10px 12px;
      border: none;
      border-radius: 8px;
      background: transparent;
      color: #d1d5db;
      font-size: 14px;
      cursor: pointer;
    }
    .nav-item:hover {
      background: #1f2937;
      color: #fff;
    }
    .nav-item.active {
      background: #2563eb;
      color: #fff;
    }
    .main-content {
      flex: 1;
      padding: 24px;
      overflow: auto;
      background: #f9fafb;
    }
    .panel {
      display: none;
    }
    .panel.active {
      display: block;
    }
    h1 {
      margin: 0 0 16px;
      font-size: 24px;
    }
    .auth-inline {
      display: block;
      font-size: 13px;
      color: #374151;
      line-height: 1.5;
      word-break: break-all;
    }
    .user-table {
      font-size: 13px;
    }
    .user-table th,
    .user-table td {
      vertical-align: top;
    }
    .muted-cell {
      color: #9ca3af;
      font-size: 12px;
    }
    /* 用户管理：9proxy 本机 SOCKS 与自定义远端 SOCKS5（与 Element Plus 主色/成功色一致） */
    .user-socks-nine {
      color: #409eff;
      font-size: 12px;
      font-weight: 500;
    }
    .user-socks-custom {
      color: #67c23a;
      font-size: 12px;
      font-weight: 500;
    }
    .multi-bind-cell {
      white-space: normal;
      word-break: break-all;
      line-height: 1.45;
      max-width: 220px;
    }
    .wifi-line {
      display: flex;
      align-items: center;
      gap: 4px;
      min-width: 0;
    }
    .wifi-text {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
    }
    .wifi-text-empty {
      color: #9ca3af;
    }
    .wifi-toggle {
      flex-shrink: 0;
      width: 28px;
      height: 28px;
      padding: 0;
      margin: 0;
      border-radius: 6px;
      background: #f3f4f6;
      color: #374151;
      border: 1px solid #e5e7eb;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .wifi-toggle:hover {
      background: #e5e7eb;
      color: #111827;
    }
    .wifi-toggle svg {
      display: block;
    }
    .wifi-cell-inner .wifi-ico-close {
      display: none;
    }
    .wifi-cell-inner.wifi-expanded .wifi-ico-edit {
      display: none;
    }
    .wifi-cell-inner.wifi-expanded .wifi-ico-close {
      display: block;
    }
    .wifi-cell-inner .wifi-editor {
      display: none;
      flex-direction: column;
      gap: 6px;
      margin-top: 8px;
      padding-top: 8px;
      border-top: 1px dashed #e5e7eb;
    }
    .wifi-cell-inner.wifi-expanded .wifi-editor {
      display: flex;
    }
    .wifi-name-input {
      width: 100%;
      box-sizing: border-box;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      padding: 6px 8px;
      font-size: 13px;
    }
    .wifi-save-btn {
      background: #4b5563;
      color: #fff;
      padding: 4px 12px;
      font-size: 12px;
      border-radius: 6px;
      cursor: pointer;
      align-self: flex-start;
    }
    .wifi-save-btn:hover {
      background: #374151;
    }
    .wifi-save-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .toolbar {
      display: flex;
      gap: 12px;
      align-items: center;
      margin-bottom: 16px;
    }
    button {
      border: none;
      border-radius: 6px;
      background: #2563eb;
      color: #fff;
      padding: 8px 14px;
      cursor: pointer;
    }
    button:hover {
      background: #1d4ed8;
    }
    .status {
      color: #4b5563;
      font-size: 14px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      background: #fff;
      border-radius: 8px;
      overflow: hidden;
    }
    th, td {
      padding: 10px 12px;
      border-bottom: 1px solid #e5e7eb;
      text-align: left;
      font-size: 14px;
    }
    th {
      background: #f3f4f6;
      font-weight: 600;
    }
    th select {
      margin-left: 8px;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      padding: 4px 6px;
      font-size: 12px;
      background: #fff;
      max-width: 140px;
    }
    tr:hover td {
      background: #f9fafb;
    }
    tr.row-using td {
      background: #ecfdf5;
    }
    tr.row-using:hover td {
      background: #d1fae5;
    }
    .online {
      color: #059669;
      font-weight: 600;
    }
    .offline {
      color: #dc2626;
      font-weight: 600;
    }
    .using {
      color: #2563eb;
      font-weight: 600;
    }
    .switch-btn {
      border: none;
      border-radius: 6px;
      background: #059669;
      color: #fff;
      padding: 6px 10px;
      cursor: pointer;
      font-size: 12px;
    }
    .switch-btn:hover {
      background: #047857;
    }
    .switch-btn:disabled {
      background: #9ca3af;
      cursor: not-allowed;
    }
    .add-btn {
      background: #7c3aed;
    }
    .add-btn:hover {
      background: #6d28d9;
    }
    dialog {
      border: none;
      border-radius: 10px;
      padding: 0;
      width: 360px;
      max-width: 90%;
    }
    dialog.dialog-proxy-pick {
      width: min(640px, 94vw);
      max-width: 94vw;
      max-height: 90vh;
    }
    dialog.dialog-proxy-pick .modal-inner {
      max-height: min(82vh, 720px);
      overflow-y: auto;
      box-sizing: border-box;
    }
    dialog.dialog-proxy-pick select.proxy-pick-list {
      min-height: min(380px, 48vh);
      max-height: min(520px, 56vh);
      font-size: 13px;
      line-height: 1.4;
    }
    dialog::backdrop {
      background: rgba(0, 0, 0, 0.35);
    }
    .modal-inner {
      padding: 16px;
      background: #fff;
    }
    .modal-row {
      margin-bottom: 10px;
    }
    .modal-row label {
      display: block;
      margin-bottom: 6px;
      font-size: 13px;
      color: #374151;
    }
    .modal-row select {
      width: 100%;
      box-sizing: border-box;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      padding: 8px;
    }
    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 12px;
    }
    .cancel-btn {
      background: #6b7280;
    }
    .cancel-btn:hover {
      background: #4b5563;
    }
    .users-top-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 16px;
      flex-wrap: wrap;
      margin-bottom: 8px;
    }
    .users-top-row h1 {
      margin: 0;
      flex: 1;
      min-width: 0;
      font-size: 24px;
    }
    .nineproxy-account-strip {
      flex-shrink: 0;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      justify-content: flex-end;
      max-width: 100%;
      font-size: 13px;
      color: #374151;
      background: #fff;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 8px 10px;
      line-height: 1.45;
    }
    .nineproxy-bar-text .np-ok {
      color: #059669;
      font-weight: 600;
    }
    .nineproxy-bar-text .np-warn {
      color: #b45309;
      font-weight: 600;
    }
    .nineproxy-bar-text .np-danger {
      color: #dc2626;
      font-weight: 600;
    }
    .nineproxy-bar-text .np-muted {
      color: #6b7280;
      font-size: 12px;
      font-weight: normal;
    }
    .nineproxy-login-btn {
      background: #2563eb;
      color: #fff;
      padding: 6px 10px;
      font-size: 12px;
      border-radius: 6px;
      border: none;
      cursor: pointer;
    }
    .nineproxy-login-btn:hover {
      background: #1d4ed8;
    }
    .nineproxy-logout-btn {
      background: #fff;
      color: #b91c1c;
      padding: 6px 10px;
      font-size: 12px;
      border-radius: 6px;
      border: 1px solid #fecaca;
      cursor: pointer;
    }
    .nineproxy-logout-btn:hover {
      background: #fef2f2;
      border-color: #f87171;
    }
    .nineproxy-logout-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .nineproxy-refresh-btn {
      background: #f3f4f6;
      color: #374151;
      padding: 6px 10px;
      font-size: 12px;
      border-radius: 6px;
      border: 1px solid #e5e7eb;
      cursor: pointer;
    }
    .nineproxy-refresh-btn:hover {
      background: #e5e7eb;
    }
    .user-actions-cell {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      white-space: nowrap;
      width: 100%;
      box-sizing: border-box;
    }
    .user-actions-cell .switch-btn,
    .user-actions-cell .nine-filter-rule-btn,
    .user-actions-cell .nine-rule-switch-btn,
    .user-actions-cell .nine-filter-actions {
      flex-shrink: 0;
    }
    .nine-filter-actions {
      display: inline-flex;
      align-items: center;
      gap: 20px;
    }
    .nine-filter-rule-btn,
    .nine-rule-switch-btn {
      font-size: 12px;
      padding: 5px 8px;
      vertical-align: middle;
    }
    .user-refresh-offline-btn {
      margin-left: 8px;
      font-size: 12px;
      line-height: 1.2;
      padding: 3px 7px;
    }
    .nf-dialog-inner {
      max-width: 520px;
      max-height: 90vh;
      overflow: auto;
    }
    .nf-row {
      margin-bottom: 10px;
    }
    .nf-row label {
      display: block;
      font-size: 12px;
      color: #374151;
      margin-bottom: 4px;
    }
    .nf-row-toolbar {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      align-items: center;
      margin-bottom: 4px;
    }
    .nf-row-toolbar .wifi-name-input {
      flex: 1;
      min-width: 100px;
    }
    .nf-row-toolbar select {
      flex: 1;
      min-width: 140px;
      max-width: 100%;
    }
    .nf-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      min-height: 26px;
      margin-top: 4px;
    }
    .nf-chip {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: #e0e7ff;
      border-radius: 6px;
      padding: 2px 6px;
      font-size: 12px;
      max-width: 100%;
    }
    .nf-chip span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 360px;
    }
    .nf-chip-x {
      border: none;
      background: transparent;
      cursor: pointer;
      color: #4338ca;
      font-size: 14px;
      line-height: 1;
      padding: 0 2px;
    }
  </style>
</head>
<body>
  <div class="app-shell">
    <aside class="sidebar">
      <div class="sidebar-brand">sing-box 控制台</div>
      <nav>
        <button type="button" class="nav-item active" data-panel="users" id="navUsers">用户管理</button>
        <button type="button" class="nav-item" data-panel="proxies" id="navProxies">代理列表</button>
      </nav>
    </aside>
    <main class="main-content">
      <section id="panelUsers" class="panel active">
        <div class="users-top-row">
          <h1>用户管理</h1>
          <div class="nineproxy-account-strip" id="nineProxyAccountStrip" aria-live="polite">
            <span class="nineproxy-bar-text" id="nineProxyBarText">代理服务状态加载中…</span>
            <button type="button" class="nineproxy-login-btn" id="nineProxyLoginBtn" style="display:none">登录代理服务</button>
            <button type="button" class="nineproxy-logout-btn" id="nineProxyLogoutBtn" style="display:none">退出代理服务</button>
            <button type="button" class="nineproxy-refresh-btn" id="nineProxyRefreshBtn">刷新</button>
          </div>
        </div>
        <div class="toolbar">
          <button type="button" id="refreshUsersBtn">刷新用户</button>
          <span class="status" id="userStatusText">加载中...</span>
        </div>
        <table class="user-table">
          <thead>
            <tr>
              <th style="width:120px;">用户 ID</th>
              <th style="width:120px;">WiFi 名称</th>
              <th style="width:130px;">出口 IP</th>
              <th style="width:100px;">IP 国家</th>
              <th style="width:120px;">IP 州/省</th>
              <th style="width:120px;">城市</th>
              <th style="width:72px;">在线</th>
              <th style="width:200px;">操作</th>
            </tr>
          </thead>
          <tbody id="userBody"></tbody>
        </table>
      </section>
      <section id="panelProxies" class="panel">
        <h1>代理列表</h1>
        <div class="toolbar">
          <button id="openAddModalBtn" class="add-btn" type="button" style="display:none" aria-hidden="true">新增代理</button>
          <button id="refreshBtn">刷新列表</button>
          <span class="status" id="statusText">加载中...</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>城市</th>
              <th>出口 IP</th>
              <th>
                国家
                <select id="filterCountrySelect">
                  <option value="">全部</option>
                </select>
              </th>
              <th>
                州/地区
                <select id="filterStateSelect">
                  <option value="">全部</option>
                </select>
              </th>
              <th>在线状态</th>
              <th>绑定地址</th>
              <th>绑定用户</th>
              <th>WiFi 名称</th>
              <th>使用状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody id="proxyBody"></tbody>
        </table>
      </section>
      <dialog id="addProxyDialog">
        <div class="modal-inner">
          <h3 style="margin-top:0;">新增代理</h3>
          <div class="modal-row">
            <label for="countryInput">country（默认 US）</label>
            <select id="countryInput">
              <option value="US">US</option>
            </select>
          </div>
          <div class="modal-row">
            <label for="stateInput">state</label>
            <select id="stateInput">
              <option value="">请选择 state</option>
            </select>
          </div>
          <div class="status" id="addStatusText"></div>
          <div class="modal-actions">
            <button id="cancelAddModalBtn" class="cancel-btn" type="button">取消</button>
            <button id="addProxyBtn" class="add-btn" type="button">确认新增</button>
          </div>
        </div>
      </dialog>
      <dialog id="switchProxyDialog" class="dialog-proxy-pick">
        <div class="modal-inner">
          <h3 style="margin-top:0;">使用代理</h3>
          <p class="status" id="switchProxyMeta" style="margin:0 0 10px;font-size:13px;color:#374151;"></p>
          <div class="modal-row" style="margin-bottom:10px;">
            <label for="switchCustomSocksLine">自定义 SOCKS5（host:port:user:pass）</label>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
              <input
                type="text"
                id="switchCustomSocksLine"
                class="wifi-name-input"
                style="min-width:220px;flex:1;"
                placeholder="例: 154.17.94.164:45001:user:pass"
                autocomplete="off"
              />
              <button type="button" id="switchAddCustomSocksBtn" class="cancel-btn">添加到列表</button>
            </div>
          </div>
          <div class="modal-row">
            <label for="switchUserSelect">绑定出站（sing-box SOCKS tag）</label>
            <select id="switchUserSelect" class="proxy-pick-list" size="14"></select>
          </div>
          <div class="status" id="switchStatusText"></div>
          <div class="modal-actions">
            <button type="button" id="cancelSwitchBtn" class="cancel-btn">取消</button>
            <button type="button" id="confirmSwitchBtn" class="switch-btn">确认使用</button>
          </div>
        </div>
      </dialog>
      <dialog id="useProxyFromUserDialog" class="dialog-proxy-pick">
        <div class="modal-inner">
          <h3 style="margin-top:0;">切换代理</h3>
          <p class="status" id="useProxyFromUserMeta" style="margin:0 0 10px;font-size:13px;color:#374151;"></p>
          <div class="modal-row" style="margin-bottom:10px;">
            <label for="userCustomSocksLine">粘贴自定义 SOCKS5 并保存</label>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
              <input
                type="text"
                id="userCustomSocksLine"
                class="wifi-name-input"
                style="min-width:220px;flex:1;"
                placeholder="host:port:username:password"
                autocomplete="off"
              />
              <button type="button" id="userAddCustomSocksBtn" class="cancel-btn">添加</button>
            </div>
          </div>
          <div class="modal-row">
            <label for="useProxySelectFromUser">选择今日代理</label>
            <select id="useProxySelectFromUser" class="proxy-pick-list" size="14"></select>
          </div>
          <div class="status" id="useProxyFromUserStatus"></div>
          <div class="modal-actions">
            <button type="button" id="cancelUseProxyFromUserBtn" class="cancel-btn">取消</button>
            <button type="button" id="confirmUseProxyFromUserBtn" class="switch-btn">确认切换</button>
          </div>
        </div>
      </dialog>
      <dialog id="nineFilterRuleDialog" class="dialog-proxy-pick">
        <div class="modal-inner nf-dialog-inner">
          <h3 style="margin-top:0;">筛选规则 · <code id="nfTagLabel"></code></h3>
          <div class="nf-row">
            <label for="nfCountrySelect">country（国家代码）</label>
            <div class="nf-row-toolbar">
              <input type="text" id="nfCountrySearch" class="wifi-name-input" placeholder="搜索国家码" maxlength="8" autocomplete="off" />
              <select id="nfCountrySelect"></select>
            </div>
          </div>
          <div class="nf-row">
            <label>state（州/省，可多枚）</label>
            <div class="nf-row-toolbar">
              <input type="text" id="nfStateSearch" class="wifi-name-input" placeholder="搜索" autocomplete="off" />
              <select id="nfStatePick"></select>
              <button type="button" class="cancel-btn" id="nfStateAddBtn">加入</button>
            </div>
            <div class="nf-chips" id="nfStateChips"></div>
          </div>
          <div class="nf-row">
            <label>city（城市，可多枚）</label>
            <div class="nf-row-toolbar">
              <input type="text" id="nfCitySearch" class="wifi-name-input" placeholder="搜索" autocomplete="off" />
              <select id="nfCityPick"></select>
              <button type="button" class="cancel-btn" id="nfCityAddBtn">加入</button>
            </div>
            <div class="nf-chips" id="nfCityChips"></div>
          </div>
          <div class="nf-row">
            <label>isp（运营商，可多枚）</label>
            <div class="nf-row-toolbar">
              <input type="text" id="nfIspSearch" class="wifi-name-input" placeholder="搜索" autocomplete="off" />
              <select id="nfIspPick"></select>
              <button type="button" class="cancel-btn" id="nfIspAddBtn">加入</button>
            </div>
            <div class="nf-chips" id="nfIspChips"></div>
          </div>
          <div class="nf-row">
            <label style="display:flex;align-items:center;gap:10px;cursor:pointer;">
              <input type="checkbox" id="nfToday" />
              today（仅今日更新代理）
            </label>
          </div>
          <div class="status" id="nfFilterStatus" style="min-height:1.2em;"></div>
          <div class="modal-actions">
            <button type="button" class="cancel-btn" id="nfCancelFilterBtn">取消</button>
            <button type="button" class="switch-btn" id="nfSaveFilterBtn">保存</button>
          </div>
        </div>
      </dialog>
      <dialog id="nineProxyLoginDialog">
        <div class="modal-inner">
          <h3 style="margin:0 0 12px;font-size:16px;">代理服务登录</h3>
          <p class="status" style="margin:0 0 10px;font-size:12px;color:#6b7280;">本机执行 <code>auth -u … -p …</code>；账密仅用于本次请求，服务端不保存。</p>
          <div class="modal-row">
            <label for="nineProxyUserInput">账号</label>
            <input type="text" id="nineProxyUserInput" class="wifi-name-input" autocomplete="username" />
          </div>
          <div class="modal-row">
            <label for="nineProxyPassInput">密码</label>
            <input type="password" id="nineProxyPassInput" class="wifi-name-input" autocomplete="current-password" />
          </div>
          <div class="status" id="nineProxyLoginStatus" style="min-height:1.2em;"></div>
          <div class="modal-actions">
            <button type="button" id="nineProxyLoginCancelBtn" class="cancel-btn">取消</button>
            <button type="button" id="nineProxyLoginSubmitBtn" class="switch-btn">登录</button>
          </div>
        </div>
      </dialog>
      <dialog id="proxyRuleSwitchErrorDialog" class="dialog-proxy-pick">
        <div class="modal-inner">
          <h3 style="margin-top:0;">\u89c4\u5219\u5207\u6362\u5931\u8d25</h3>
          <p
            class="status"
            id="proxyRuleSwitchErrorText"
            style="white-space:pre-wrap;word-break:break-word;margin:0 0 12px;font-size:13px;color:#b91c1c;"
          ></p>
          <div class="modal-actions">
            <button type="button" id="proxyRuleSwitchErrorOkBtn" class="switch-btn">\u786e\u5b9a</button>
          </div>
        </div>
      </dialog>
    </main>
  </div>

  <script>
    const statusText = document.getElementById("statusText");
    const proxyBody = document.getElementById("proxyBody");
    const refreshBtn = document.getElementById("refreshBtn");
    const openAddModalBtn = document.getElementById("openAddModalBtn");
    const addProxyDialog = document.getElementById("addProxyDialog");
    const cancelAddModalBtn = document.getElementById("cancelAddModalBtn");
    const addProxyBtn = document.getElementById("addProxyBtn");
    const addStatusText = document.getElementById("addStatusText");
    const countryInput = document.getElementById("countryInput");
    const stateInput = document.getElementById("stateInput");
    const filterCountrySelect = document.getElementById("filterCountrySelect");
    const filterStateSelect = document.getElementById("filterStateSelect");
    const panelUsers = document.getElementById("panelUsers");
    const panelProxies = document.getElementById("panelProxies");
    const navUsers = document.getElementById("navUsers");
    const navProxies = document.getElementById("navProxies");
    const userBody = document.getElementById("userBody");
    const userStatusText = document.getElementById("userStatusText");
    const refreshUsersBtn = document.getElementById("refreshUsersBtn");
    const switchProxyDialog = document.getElementById("switchProxyDialog");
    const switchUserSelect = document.getElementById("switchUserSelect");
    const switchProxyMeta = document.getElementById("switchProxyMeta");
    const switchStatusText = document.getElementById("switchStatusText");
    const cancelSwitchBtn = document.getElementById("cancelSwitchBtn");
    const confirmSwitchBtn = document.getElementById("confirmSwitchBtn");
    const useProxyFromUserDialog = document.getElementById("useProxyFromUserDialog");
    const useProxySelectFromUser = document.getElementById("useProxySelectFromUser");
    const useProxyFromUserMeta = document.getElementById("useProxyFromUserMeta");
    const useProxyFromUserStatus = document.getElementById("useProxyFromUserStatus");
    const cancelUseProxyFromUserBtn = document.getElementById("cancelUseProxyFromUserBtn");
    const confirmUseProxyFromUserBtn = document.getElementById("confirmUseProxyFromUserBtn");
    const switchCustomSocksLine = document.getElementById("switchCustomSocksLine");
    const switchAddCustomSocksBtn = document.getElementById("switchAddCustomSocksBtn");
    const userCustomSocksLine = document.getElementById("userCustomSocksLine");
    const userAddCustomSocksBtn = document.getElementById("userAddCustomSocksBtn");
    const nineProxyBarText = document.getElementById("nineProxyBarText");
    const nineProxyLoginBtn = document.getElementById("nineProxyLoginBtn");
    const nineProxyLogoutBtn = document.getElementById("nineProxyLogoutBtn");
    const nineProxyRefreshBtn = document.getElementById("nineProxyRefreshBtn");
    const nineProxyLoginDialog = document.getElementById("nineProxyLoginDialog");
    const nineProxyUserInput = document.getElementById("nineProxyUserInput");
    const nineProxyPassInput = document.getElementById("nineProxyPassInput");
    const nineProxyLoginStatus = document.getElementById("nineProxyLoginStatus");
    const nineProxyLoginCancelBtn = document.getElementById("nineProxyLoginCancelBtn");
    const nineProxyLoginSubmitBtn = document.getElementById("nineProxyLoginSubmitBtn");
    const nineFilterRuleDialog = document.getElementById("nineFilterRuleDialog");
    const nfTagLabel = document.getElementById("nfTagLabel");
    const nfCountrySearch = document.getElementById("nfCountrySearch");
    const nfCountrySelect = document.getElementById("nfCountrySelect");
    const nfStateSearch = document.getElementById("nfStateSearch");
    const nfStatePick = document.getElementById("nfStatePick");
    const nfStateAddBtn = document.getElementById("nfStateAddBtn");
    const nfCitySearch = document.getElementById("nfCitySearch");
    const nfCityPick = document.getElementById("nfCityPick");
    const nfCityAddBtn = document.getElementById("nfCityAddBtn");
    const nfIspSearch = document.getElementById("nfIspSearch");
    const nfIspPick = document.getElementById("nfIspPick");
    const nfIspAddBtn = document.getElementById("nfIspAddBtn");
    const nfToday = document.getElementById("nfToday");
    const nfFilterStatus = document.getElementById("nfFilterStatus");
    const nfCancelFilterBtn = document.getElementById("nfCancelFilterBtn");
    const nfSaveFilterBtn = document.getElementById("nfSaveFilterBtn");
    const proxyRuleSwitchErrorDialog = document.getElementById(
      "proxyRuleSwitchErrorDialog"
    );
    const proxyRuleSwitchErrorText = document.getElementById("proxyRuleSwitchErrorText");
    const proxyRuleSwitchErrorOkBtn = document.getElementById("proxyRuleSwitchErrorOkBtn");
    const endpoint = "/api/proxy-list";
    let statesByCountry = {};
    /** 9proxy CLI 已登录（用于用户表「筛选规则」按钮） */
    let nineProxyLoggedGlobal = false;
    const locData = {
      countries: [],
      statesByCountry: {},
      citiesByCountry: {},
      ispsByCountry: {}
    };
    let allProxyList = [];
    /** 最近一次拉取代理列表时 9proxy 不可用提示（仅用于状态栏） */
    let lastNineProxyListNote = "";
    let pendingSwitchProxyId = "";
    let pendingUserOutboundTag = "";
    let pendingUserSocksNorm = "";

    function setStatus(text) {
      statusText.textContent = text;
    }

    function setAddStatus(text) {
      addStatusText.textContent = text;
    }

    function escapeHtml(str) {
      return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }

    function setUserStatus(text) {
      userStatusText.textContent = text;
    }

    function showProxyRuleSwitchErrorDialog(message, data) {
      let text =
        message != null && String(message).trim() !== ""
          ? String(message)
          : "\u8bf7\u6c42\u5931\u8d25";
      if (data && data.nine_proxy_api) {
        text += "\\n\\nAPI:\\n" + String(data.nine_proxy_api);
      }
      if (data && data.nine_proxy_params != null && typeof data.nine_proxy_params === "object") {
        text += "\\n\\n\u53c2\u6570:\\n" + JSON.stringify(data.nine_proxy_params, null, 2);
      }
      if (proxyRuleSwitchErrorText) {
        proxyRuleSwitchErrorText.textContent = text;
      }
      if (
        proxyRuleSwitchErrorDialog &&
        typeof proxyRuleSwitchErrorDialog.showModal === "function"
      ) {
        proxyRuleSwitchErrorDialog.showModal();
      } else {
        window.alert(text);
      }
    }

    /** @param {"login"|"logout"|"none"} mode */
    function setNineProxyAuthButtons(mode) {
      if (nineProxyLoginBtn) {
        nineProxyLoginBtn.style.display = mode === "login" ? "inline-block" : "none";
      }
      if (nineProxyLogoutBtn) {
        nineProxyLogoutBtn.style.display = mode === "logout" ? "inline-block" : "none";
      }
    }

    function renderNineProxyAccountBar(data, httpOk) {
      nineProxyLoggedGlobal = false;
      if (!nineProxyBarText || !nineProxyLoginBtn) {
        return;
      }
      if (!httpOk || !data || data.success === false) {
        nineProxyBarText.innerHTML =
          '<span class="np-danger">代理服务</span>：' +
          escapeHtml(
            (data && (data.cli_error || data.msg)) || "状态接口不可用（HTTP 错误）"
          );
        setNineProxyAuthButtons("login");
        return;
      }
      if (data.setting_ok === false && data.cli_error) {
        nineProxyBarText.innerHTML =
          '<span class="np-danger">本地 CLI</span>：' +
          escapeHtml(String(data.cli_error));
        setNineProxyAuthButtons("login");
        return;
      }
      if (data.logged === true) {
        nineProxyLoggedGlobal = true;
        const n = data.remaining_ips;
        const rip =
          typeof n === "number" && Number.isFinite(n) ? String(n) : "—";
        let extra = "";
        if (data.balance_error) {
          extra =
            ' <span class="np-muted">（' +
            escapeHtml(String(data.balance_error)) +
            "）</span>";
        }
        nineProxyBarText.innerHTML =
          '<span class="np-ok">已登录代理服务</span> · 剩余 IP：<strong>' +
          escapeHtml(rip) +
          "</strong>" +
          extra;
        setNineProxyAuthButtons("logout");
        return;
      }
      if (data.logged === false) {
        nineProxyBarText.innerHTML = '<span class="np-warn">未登录代理服务</span>';
        setNineProxyAuthButtons("login");
        return;
      }
      nineProxyBarText.innerHTML =
        '<span class="np-danger">无法解析</span> <span class="np-muted">（<code>User Logged</code> 行缺失；请确认本机已安装代理 CLI）</span>';
      setNineProxyAuthButtons("login");
    }

    async function refreshNineProxyAccountBar() {
      if (nineProxyBarText) {
        nineProxyBarText.textContent = "正在刷新代理服务状态…";
      }
      try {
        const resp = await fetch("/api/9proxy-account");
        const data = await resp.json().catch(() => ({}));
        renderNineProxyAccountBar(data, resp.ok);
      } catch (e) {
        renderNineProxyAccountBar(null, false);
      }
    }

    function normAddr(s) {
      return String(s || "").replace(/\s+/g, "").toLowerCase();
    }

    function parsePortFromSocks(addr) {
      const s = String(addr || "").trim();
      const idx = s.lastIndexOf(":");
      if (idx < 0) {
        return null;
      }
      const p = Number(s.slice(idx + 1));
      return Number.isFinite(p) && p > 0 ? p : null;
    }

    function setSwitchStatus(text) {
      switchStatusText.textContent = text;
    }

    function isDirectSocksAddressClient(addr) {
      const labels = { 直连: 1, 直連: 1, 直接: 1, direct: 1 };
      const s = String(addr ?? "")
        .replace(/[\u200B-\u200D\uFEFF]/g, "")
        .trim();
      if (labels[s] || /^direct$/i.test(s)) {
        return true;
      }
      try {
        const n = s.normalize("NFKC").trim();
        return Boolean(labels[n] || /^direct$/i.test(n));
      } catch {
        return false;
      }
    }

    /** 从 host:port（或 IPv6 方括号形式）取出 host（小写），供本机 9proxy 与自定义 SOCKS 着色区分 */
    function socksDisplayHostLower(addr) {
      const s = String(addr || "").trim();
      if (!s) {
        return "";
      }
      const idx = s.lastIndexOf(":");
      if (idx < 0) {
        return s.toLowerCase();
      }
      let host = s.slice(0, idx);
      if (host.length >= 2 && host[0] === "[" && host[host.length - 1] === "]") {
        host = host.slice(1, -1);
      }
      return host.trim().toLowerCase();
    }

    function isLocalNineProxySocksAddress(addr) {
      if (!addr || isDirectSocksAddressClient(addr)) {
        return false;
      }
      const h = socksDisplayHostLower(addr);
      return h === "127.0.0.1" || h === "localhost" || h === "::1";
    }

    /** 用户管理绑定地址行 CSS class */
    function userBindSocksClass(row) {
      const addr = String(row.socks_address || "").trim();
      if (!addr) {
        return "";
      }
      if (isDirectSocksAddressClient(addr) || String(row.outbound_egress || "") === "direct") {
        return "muted-cell";
      }
      if (isLocalNineProxySocksAddress(addr)) {
        return "user-socks-nine";
      }
      return "user-socks-custom";
    }

    function matchPortRow(portRows, socksAddr) {
      const target = normAddr(socksAddr);
      if (!target) {
        return null;
      }
      for (let i = 0; i < portRows.length; i += 1) {
        const pr = portRows[i];
        if (pr && normAddr(pr.address) === target) {
          return pr;
        }
      }
      return null;
    }

    function renderUserRows(users, portRows, nineLogged) {
      portRows = Array.isArray(portRows) ? portRows : [];
      if (!Array.isArray(users) || users.length === 0) {
        userBody.innerHTML = '<tr><td colspan="8">暂无路由规则或未读取到用户条目</td></tr>';
        return;
      }
      const showFilter = nineLogged === true;
      userBody.innerHTML = users.map((row) => {
        const overlay =
          row.port_status_overlay && typeof row.port_status_overlay === "object"
            ? row.port_status_overlay
            : null;
        const isDirectUser =
          String(row.outbound_egress || "") === "direct" ||
          isDirectSocksAddressClient(row.socks_address);
        const ps =
          overlay ||
          (!isDirectUser ? matchPortRow(portRows, row.socks_address) : null);
        const outTag = String(row.outbound || "");
        const tagAttr = escapeHtml(outTag);
        const isLocalNine = !isDirectUser && isLocalNineProxySocksAddress(row.socks_address);
        const pubRaw =
          ps && ps.public_ip != null && String(ps.public_ip).trim() !== ""
            ? String(ps.public_ip).trim()
            : "";
        const pub =
          pubRaw !== ""
            ? escapeHtml(pubRaw)
            : "";
        const cc = ps && ps.ip_country ? String(ps.ip_country) : "";
        const reg = ps && ps.ip_region ? escapeHtml(String(ps.ip_region)) : "";
        const city = ps && ps.ip_city != null ? escapeHtml(String(ps.ip_city)) : "";
        let onlineCell = "-";
        if (ps && typeof ps.online === "boolean") {
          onlineCell = ps.online
            ? '<span class="online">' +
                (isDirectUser ? "在线（直连）" : "在线") +
                "</span>"
            : '<span class="offline">离线</span>' +
              (isLocalNine && pubRaw
                ? '<button type="button" class="switch-btn user-refresh-offline-btn" data-outbound="' +
                  tagAttr +
                  '" data-public-ip="' +
                  escapeHtml(pubRaw) +
                  '">刷新</button>'
                : "");
        } else if (isDirectUser) {
          onlineCell = '<span class="muted-cell">—</span>';
        }
        const addrRaw = row.socks_address ? String(row.socks_address).trim() : "";
        const bindHint = addrRaw
          ? '<div class="' + userBindSocksClass(row) + '">' + escapeHtml(addrRaw) + "</div>"
          : "";
        const wifiVal = escapeHtml(String(row.wifi_name || "").trim());
        const wnRaw = String(row.wifi_name || "").trim();
        let wifiDisplay;
        if (wnRaw !== "") {
          const esc = escapeHtml(wnRaw);
          wifiDisplay = '<span class="wifi-text" title="' + esc + '">' + esc + "</span>";
        } else {
          wifiDisplay =
            '<span class="wifi-text wifi-text-empty" title="\u672a\u8bbe\u7f6e">-</span>';
        }
        const wifiCell =
          '<div class="wifi-cell-inner">' +
          '<div class="wifi-line">' +
          wifiDisplay +
          '<button type="button" class="wifi-toggle" aria-label="\u7f16\u8f91\u6216\u5173\u95ed WiFi">' +
          '<span class="wifi-ico-edit" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></span>' +
          '<span class="wifi-ico-close" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M18 6L6 18M6 6l12 12"/></svg></span>' +
          "</button>" +
          "</div>" +
          '<div class="wifi-editor">' +
          '<input type="text" class="wifi-name-input" data-outbound="' +
          tagAttr +
          '" data-initial="' +
          wifiVal +
          '" value="' +
          wifiVal +
          '" placeholder="WiFi" maxlength="128" />' +
          '<button type="button" class="wifi-save-btn" data-outbound="' +
          tagAttr +
          '">\u4fdd\u5b58</button>' +
          "</div>" +
          "</div>";
        return (
          "<tr>" +
          "<td><strong>" + escapeHtml(row.outbound || "-") + "</strong>" + bindHint + "</td>" +
          "<td>" +
          wifiCell +
          "</td>" +
          "<td>" + (pub || '<span class="muted-cell">-</span>') + "</td>" +
          "<td>" + (cc ? countryFlag(cc) + " " + escapeHtml(cc) : '<span class="muted-cell">-</span>') + "</td>" +
          "<td>" + (reg || '<span class="muted-cell">-</span>') + "</td>" +
          "<td>" + (city || '<span class="muted-cell">-</span>') + "</td>" +
          "<td>" + onlineCell + "</td>" +
          '<td class="user-actions-cell">' +
          '<button type="button" class="switch-btn use-from-user-btn" data-outbound="' +
          tagAttr +
          '">切换</button>' +
          (showFilter
            ? '<span class="nine-filter-actions">' +
              '<button type="button" class="switch-btn nine-rule-switch-btn" data-outbound="' +
              tagAttr +
              '">\u89c4\u5219\u5207\u6362</button>' +
              '<button type="button" class="cancel-btn nine-filter-rule-btn" data-outbound="' +
              tagAttr +
              '">筛选规则</button>' +
              "</span>"
            : "") +
          "</td>" +
          "</tr>"
        );
      }).join("");
    }

    let nfCurrentTag = "";
    const nfChipStore = { states: [], cities: [], isps: [] };
    const nfChipElIds = { states: "nfStateChips", cities: "nfCityChips", isps: "nfIspChips" };

    function nfHasChip(kind, v) {
      return (nfChipStore[kind] || []).some(function (x) {
        return x.v === v;
      });
    }

    function nfRenderChips(kind) {
      const id = nfChipElIds[kind];
      const el = id ? document.getElementById(id) : null;
      if (!el) {
        return;
      }
      const arr = nfChipStore[kind] || [];
      el.innerHTML = arr
        .map(function (c) {
          return (
            '<span class="nf-chip"><span title="' +
            escapeHtml(c.lab) +
            '">' +
            escapeHtml(c.lab) +
            '</span><button type="button" class="nf-chip-x" data-nf-kind="' +
            kind +
            '" data-nf-v="' +
            escapeHtml(c.v) +
            '">&times;</button></span>'
          );
        })
        .join("");
    }

    function nfRenderAllChips() {
      nfRenderChips("states");
      nfRenderChips("cities");
      nfRenderChips("isps");
    }

    function nfResetChips() {
      nfChipStore.states = [];
      nfChipStore.cities = [];
      nfChipStore.isps = [];
      nfRenderAllChips();
    }

    function nfAddChip(kind, v, lab) {
      if (!v || nfHasChip(kind, v)) {
        return;
      }
      nfChipStore[kind].push({ v: v, lab: lab || v });
      nfRenderChips(kind);
    }

    function nfRemoveChip(kind, v) {
      nfChipStore[kind] = (nfChipStore[kind] || []).filter(function (x) {
        return x.v !== v;
      });
      nfRenderChips(kind);
    }

    function nfRebuildCountryOptions() {
      if (!nfCountrySelect) {
        return;
      }
      const q = nfCountrySearch
        ? String(nfCountrySearch.value || "")
            .trim()
            .toUpperCase()
        : "";
      const cur = nfCountrySelect.value;
      const list = (locData.countries || []).filter(function (c) {
        return !q || c.indexOf(q) !== -1;
      });
      nfCountrySelect.innerHTML =
        '<option value="">\uFF08\u8BF7\u9009\u62E9\u56FD\u5BB6\uFF09</option>' +
        list
          .map(function (c) {
            return '<option value="' + c + '">' + c + "</option>";
          })
          .join("");
      if (list.indexOf(cur) !== -1) {
        nfCountrySelect.value = cur;
      }
    }

    function nfStateRowName(row) {
      if (typeof row === "string") {
        return String(row || "").trim();
      }
      return String(row.state_name || row.state_code || "").trim();
    }

    function nfBuildStatePickOptions() {
      const cc = nfCountrySelect
        ? String(nfCountrySelect.value || "")
            .trim()
            .toUpperCase()
        : "";
      const q = nfStateSearch
        ? String(nfStateSearch.value || "")
            .trim()
            .toLowerCase()
        : "";
      const out = [];
      if (cc) {
        (locData.statesByCountry[cc] || []).forEach(function (row) {
          const sn = nfStateRowName(row);
          if (!sn) {
            return;
          }
          if (!q || sn.toLowerCase().indexOf(q) !== -1) {
            out.push({ v: sn, lab: sn });
          }
        });
      } else {
        (locData.countries || []).forEach(function (c) {
          (locData.statesByCountry[c] || []).forEach(function (row) {
            const sn = nfStateRowName(row);
            if (!sn) {
              return;
            }
            const v = c + "|" + sn;
            if (
              !q ||
              sn.toLowerCase().indexOf(q) !== -1 ||
              v.toLowerCase().indexOf(q) !== -1
            ) {
              out.push({ v: v, lab: sn });
            }
          });
        });
      }
      return out.slice(0, 300);
    }

    function nfRefreshStatePick() {
      if (!nfStatePick) {
        return;
      }
      const opts = nfBuildStatePickOptions();
      const cur = nfStatePick.value;
      nfStatePick.innerHTML =
        '<option value="">\uFF08\u9009\u4E00\u9879\u52A0\u5165\uFF09</option>' +
        opts
          .map(function (o) {
            return (
              '<option value="' +
              escapeHtml(o.v) +
              '">' +
              escapeHtml(o.lab) +
              "</option>"
            );
          })
          .join("");
      if (opts.some(function (o) { return o.v === cur; })) {
        nfStatePick.value = cur;
      }
    }

    function nfBuildCityPickOptions() {
      const cc = nfCountrySelect
        ? String(nfCountrySelect.value || "")
            .trim()
            .toUpperCase()
        : "";
      const q = nfCitySearch
        ? String(nfCitySearch.value || "")
            .trim()
            .toLowerCase()
        : "";
      const out = [];
      function consider(v, lab) {
        if (
          !q ||
          lab.toLowerCase().indexOf(q) !== -1 ||
          String(v).toLowerCase().indexOf(q) !== -1
        ) {
          out.push({ v: v, lab: lab });
        }
      }
      if (cc) {
        (locData.citiesByCountry[cc] || []).forEach(function (row) {
          const cn = String(row.city_name || row.city_code || "").trim();
          if (!cn) {
            return;
          }
          consider(cn, cn);
        });
      } else {
        (locData.countries || []).forEach(function (c) {
          (locData.citiesByCountry[c] || []).forEach(function (row) {
            const cn = String(row.city_name || row.city_code || "").trim();
            if (!cn) {
              return;
            }
            const v = c + "|" + cn;
            if (
              !q ||
              cn.toLowerCase().indexOf(q) !== -1 ||
              v.toLowerCase().indexOf(q) !== -1
            ) {
              out.push({ v: v, lab: cn });
            }
          });
        });
      }
      return out.slice(0, 300);
    }

    function nfRefreshCityPick() {
      if (!nfCityPick) {
        return;
      }
      const opts = nfBuildCityPickOptions();
      const cur = nfCityPick.value;
      nfCityPick.innerHTML =
        '<option value="">\uFF08\u9009\u4E00\u9879\u52A0\u5165\uFF09</option>' +
        opts
          .map(function (o) {
            return (
              '<option value="' +
              escapeHtml(o.v) +
              '">' +
              escapeHtml(o.lab) +
              "</option>"
            );
          })
          .join("");
      if (opts.some(function (o) { return o.v === cur; })) {
        nfCityPick.value = cur;
      }
    }

    function nfBuildIspPickOptions() {
      const cc = nfCountrySelect
        ? String(nfCountrySelect.value || "")
            .trim()
            .toUpperCase()
        : "";
      const q = nfIspSearch
        ? String(nfIspSearch.value || "")
            .trim()
            .toLowerCase()
        : "";
      const out = [];
      function consider(v, lab) {
        if (
          !q ||
          lab.toLowerCase().indexOf(q) !== -1 ||
          String(v).toLowerCase().indexOf(q) !== -1
        ) {
          out.push({ v: v, lab: lab });
        }
      }
      if (cc) {
        (locData.ispsByCountry[cc] || []).forEach(function (row) {
          const inm = String(row.isp_name || row.isp_code || "").trim();
          if (!inm) {
            return;
          }
          consider(inm, inm);
        });
      } else {
        (locData.countries || []).forEach(function (c) {
          (locData.ispsByCountry[c] || []).forEach(function (row) {
            const inm = String(row.isp_name || row.isp_code || "").trim();
            if (!inm) {
              return;
            }
            const v = c + "|" + inm;
            if (
              !q ||
              inm.toLowerCase().indexOf(q) !== -1 ||
              v.toLowerCase().indexOf(q) !== -1
            ) {
              out.push({ v: v, lab: inm });
            }
          });
        });
      }
      return out.slice(0, 300);
    }

    function nfRefreshIspPick() {
      if (!nfIspPick) {
        return;
      }
      const opts = nfBuildIspPickOptions();
      const cur = nfIspPick.value;
      nfIspPick.innerHTML =
        '<option value="">\uFF08\u9009\u4E00\u9879\u52A0\u5165\uFF09</option>' +
        opts
          .map(function (o) {
            return (
              '<option value="' +
              escapeHtml(o.v) +
              '">' +
              escapeHtml(o.lab) +
              "</option>"
            );
          })
          .join("");
      if (opts.some(function (o) { return o.v === cur; })) {
        nfIspPick.value = cur;
      }
    }

    function nfOnCountryChange() {
      nfResetChips();
      nfRefreshStatePick();
      nfRefreshCityPick();
      nfRefreshIspPick();
    }

    async function openNineFilterRuleDialog(tag) {
      nfCurrentTag = String(tag || "").trim();
      if (!nfCurrentTag || !nineFilterRuleDialog) {
        return;
      }
      if (!locData.countries.length) {
        await loadLocationCodes();
      }
      if (nfTagLabel) {
        nfTagLabel.textContent = nfCurrentTag;
      }
      if (nfFilterStatus) {
        nfFilterStatus.textContent = "";
      }
      try {
        const resp = await fetch(
          "/api/user-nine-filter?tag=" + encodeURIComponent(nfCurrentTag)
        );
        const data = await resp.json();
        if (!resp.ok || data.success === false) {
          throw new Error(data.msg || data.error || "读取失败");
        }
        const f = data.filter || {};
        nfChipStore.states = [];
        nfChipStore.cities = [];
        nfChipStore.isps = [];
        (f.states || []).forEach(function (s) {
          const t = String(s).trim();
          if (t) {
            nfChipStore.states.push({ v: t, lab: t });
          }
        });
        (f.cities || []).forEach(function (s) {
          const t = String(s).trim();
          if (t) {
            nfChipStore.cities.push({ v: t, lab: t });
          }
        });
        (f.isps || []).forEach(function (s) {
          const t = String(s).trim();
          if (t) {
            nfChipStore.isps.push({ v: t, lab: t });
          }
        });
        nfRenderAllChips();
        if (nfCountrySearch) {
          nfCountrySearch.value = "";
        }
        nfRebuildCountryOptions();
        if (nfCountrySelect) {
          nfCountrySelect.value = f.country ? String(f.country).trim().toUpperCase() : "";
        }
        if (nfToday) {
          nfToday.checked = f.today === true;
        }
        nfRefreshStatePick();
        nfRefreshCityPick();
        nfRefreshIspPick();
        nineFilterRuleDialog.showModal();
      } catch (e) {
        setUserStatus("\u7b5b\u9009\u89c4\u5219: " + (e.message || String(e)));
      }
    }

    async function nfSaveFilter() {
      if (!nfCurrentTag || !nfFilterStatus) {
        return;
      }
      const cc = nfCountrySelect
        ? String(nfCountrySelect.value || "")
            .trim()
            .toUpperCase()
        : "";
      if (!cc) {
        nfFilterStatus.textContent = "\u8bf7\u9009\u62e9\u56fd\u5bb6\u540e\u518d\u4fdd\u5b58";
        return;
      }
      function normList(kind) {
        return (nfChipStore[kind] || [])
          .map(function (row) {
            const v = row.v;
            const bar = v.indexOf("|");
            if (bar === -1) {
              return v;
            }
            const c = v.slice(0, bar);
            const code = v.slice(bar + 1);
            return c === cc ? code : null;
          })
          .filter(Boolean);
      }
      nfFilterStatus.textContent = "\u6b63\u5728\u4fdd\u5b58\u2026";
      if (nfSaveFilterBtn) {
        nfSaveFilterBtn.disabled = true;
      }
      try {
        const resp = await fetch("/api/user-nine-filter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tag: nfCurrentTag,
            filter: {
              country: cc,
              states: normList("states"),
              cities: normList("cities"),
              isps: normList("isps"),
              today: nfToday ? nfToday.checked : false,
              t: "2"
            }
          })
        });
        const data = await resp.json();
        if (!resp.ok || data.success === false) {
          throw new Error(data.msg || data.error || "\u4fdd\u5b58\u5931\u8d25");
        }
        nfFilterStatus.textContent = "\u5df2\u4fdd\u5b58\u5230\u51fa\u7ad9 tag";
        if (nineFilterRuleDialog) {
          nineFilterRuleDialog.close();
        }
        setUserStatus(
          "\u7b5b\u9009\u89c4\u5219\u5df2\u4fdd\u5b58\uFF08" + nfCurrentTag + "\uFF09"
        );
      } catch (e) {
        nfFilterStatus.textContent = e.message || String(e);
      } finally {
        if (nfSaveFilterBtn) {
          nfSaveFilterBtn.disabled = false;
        }
      }
    }

    function setUseProxyFromUserStatus(text) {
      useProxyFromUserStatus.textContent = text;
    }

    function buildTodayProxyOptionsHtml(list) {
      const parts = [];
      for (let i = 0; i < list.length; i += 1) {
        const p = list[i];
        const id = p.id != null ? String(p.id) : "";
        if (!id) {
          continue;
        }
        const isCustom = p.is_custom === true;
        const ip = p.ip != null ? String(p.ip).trim() : "";
        const city = p.city != null ? String(p.city) : "";
        const st = p.state != null ? String(p.state).trim() : "";
        const loc = city || (isCustom ? "自定义" : "");
        const label =
          (loc ? loc + " · " : "") +
          (st ? st + " · " : "") +
          (ip || "-") +
          " · ID " +
          id;
        const optColor = isCustom ? "#67C23A" : "#409EFF";
        parts.push(
          '<option value="' +
            escapeHtml(id) +
            '" data-ip="' +
            escapeHtml(ip) +
            '" style="color:' +
            optColor +
            '">' +
            escapeHtml(label) +
            "</option>"
        );
      }
      return parts;
    }

    function setTodayProxySelectFromList(selectEl, list) {
      if (!Array.isArray(list) || !list.length) {
        selectEl.innerHTML = '<option value="">暂无代理</option>';
        return;
      }
      const parts = buildTodayProxyOptionsHtml(list);
      selectEl.innerHTML = parts.length
        ? parts.join("")
        : '<option value="">暂无有效代理</option>';
      if (parts.length) {
        selectEl.selectedIndex = 0;
      }
    }

    /** 切换代理弹窗底部固定一项：直连（与 __direct__ 配套） */
    function appendDirectProxyOptionToUserSelect() {
      const sel = useProxySelectFromUser;
      for (let i = sel.options.length - 1; i >= 0; i -= 1) {
        if (sel.options[i].value === "__direct__") {
          sel.remove(i);
        }
      }
      const dirOpt = document.createElement("option");
      dirOpt.value = "__direct__";
      dirOpt.setAttribute("data-ip", "");
      dirOpt.textContent = "直连（本机出站，不经过 SOCKS）";
      sel.appendChild(dirOpt);
    }

    async function addCustomSocksLine(line) {
      const t = String(line || "").trim();
      if (!t) {
        throw new Error("请输入代理字符串");
      }
      const resp = await fetch("/api/custom-proxies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ line: t })
      });
      const data = await resp.json();
      if (!resp.ok || data.success === false) {
        throw new Error(data.msg || data.error || "保存失败");
      }
      return data.data;
    }

    async function fetchProxyListData(options) {
      const lite = options && options.lite === true;
      const url = lite ? endpoint + "?lite=1" : endpoint;
      const resp = await fetch(url);
      if (!resp.ok) {
        throw new Error("请求失败，HTTP " + resp.status);
      }
      const data = await resp.json();
      let list = [];
      if (Array.isArray(data?.data)) {
        list = data.data;
      } else if (Array.isArray(data?.proxy?.data)) {
        list = data.proxy.data;
      }
      const nineNote =
        data.nine_proxy_available === false && data.nine_proxy_message
          ? String(data.nine_proxy_message)
          : "";
      return { list, nineNote };
    }

    /** 自定义 SOCKS 与 9proxy 今日代理分属不同 API */
    function apiPathForSwitchProxy(proxyId) {
      return String(proxyId).startsWith("custom-")
        ? "/api/switch-proxy-custom"
        : "/api/switch-proxy";
    }

    async function openUseProxyForOutbound(tag) {
      pendingUserOutboundTag = String(tag || "").trim();
      pendingUserSocksNorm = "";
      if (!pendingUserOutboundTag) {
        return;
      }
      useProxyFromUserMeta.textContent =
        "出站 " +
        pendingUserOutboundTag +
        " · 请选择代理，或列表底部「直连」（本机出站，不经过 SOCKS）";
      useProxySelectFromUser.innerHTML =
        '<option value="">加载中…</option>';
      setUseProxyFromUserStatus("正在拉取列表…");
      if (useProxyFromUserDialog.open) {
        useProxyFromUserDialog.close();
      }
      useProxyFromUserDialog.showModal();
      try {
        const uresp = await fetch("/api/singbox-users");
        const udata = await uresp.json();
        if (!uresp.ok || udata.success === false) {
          throw new Error(udata.msg || udata.error || "读取用户失败");
        }
        const users = Array.isArray(udata.users) ? udata.users : [];
        const u = users.find((x) => String(x.outbound) === String(pendingUserOutboundTag));
        const addr = u && u.socks_address ? String(u.socks_address).trim() : "";
        pendingUserSocksNorm = addr ? normAddr(addr) : "";
        const { list } = await fetchProxyListData();
        if (!list.length) {
          useProxySelectFromUser.innerHTML =
            '<option value="">暂无今日代理</option>';
        } else {
          setTodayProxySelectFromList(useProxySelectFromUser, list);
        }
        appendDirectProxyOptionToUserSelect();
        setUseProxyFromUserStatus("");
      } catch (e) {
        useProxySelectFromUser.innerHTML = '<option value="">加载失败</option>';
        setUseProxyFromUserStatus(e.message || String(e));
        setUserStatus("打开切换代理窗口失败: " + e.message);
      }
    }

    async function confirmUseProxyFromUser() {
      const tag = pendingUserOutboundTag;
      if (!tag) {
        setUseProxyFromUserStatus("缺少出站");
        return;
      }
      const opt = useProxySelectFromUser.selectedOptions[0];
      if (!opt || !opt.value) {
        setUseProxyFromUserStatus("请选择代理");
        return;
      }
      const proxyId = opt.value;
      if (proxyId === "__direct__") {
        try {
          setUseProxyFromUserStatus("正在切换为直连…");
          const resp = await fetch(
            "/api/switch-proxy-direct?tag=" + encodeURIComponent(tag)
          );
          const data = await resp.json();
          const forwardOk =
            data?.data?.error === false || data?.data?.error == null;
          if (!resp.ok || data.success === false || !forwardOk) {
            throw new Error(data.msg || data.error || "切换失败");
          }
          setUserStatus((data.msg || "已切换为直连") + " · " + tag);
          useProxyFromUserDialog.close();
          await Promise.all([loadSingboxUsers(), loadProxyList()]);
        } catch (err) {
          setUseProxyFromUserStatus(err.message || String(err));
        }
        return;
      }
      let list;
      try {
        list = (await fetchProxyListData()).list;
      } catch (e) {
        setUseProxyFromUserStatus("刷新代理列表失败: " + e.message);
        return;
      }
      const selfRow = list.find((p) => String(p.id) === String(proxyId));
      const others = list.filter((item) => {
        if (String(item.id) === String(proxyId)) {
          return false;
        }
        if (!item.binding) {
          return false;
        }
        return pendingUserSocksNorm && normAddr(item.binding) === pendingUserSocksNorm;
      });
      const hints = [];
      if (others.length > 0) {
        const o = others[0];
        hints.push(
          "所选出站对应本地地址已被其他代理占用（ID: " +
            (o.id || "-") +
            " · " +
            (o.binding || "") +
            "）。"
        );
      }
      if (
        selfRow &&
        !selfRow.is_custom &&
        selfRow.binding &&
        String(selfRow.binding).trim() !== ""
      ) {
        hints.push(
          "当前代理已有绑定（" +
            selfRow.binding +
            "），将改绑到出站 " +
            tag +
            "。"
        );
      }
      if (hints.length > 0) {
        hints.push("确定要继续切换吗？");
        if (!window.confirm(hints.join("\\n\\n"))) {
          return;
        }
      }
      try {
        setUseProxyFromUserStatus("正在切换…");
        const ipParam =
          selfRow &&
          !selfRow.is_custom &&
          selfRow.ip &&
          String(selfRow.ip).trim() !== ""
            ? "&ip=" + encodeURIComponent(String(selfRow.ip).trim())
            : "";
        const resp = await fetch(
          apiPathForSwitchProxy(proxyId) +
            "?id=" +
            encodeURIComponent(proxyId) +
            "&tag=" +
            encodeURIComponent(tag) +
            ipParam
        );
        const data = await resp.json();
        const forwardOk =
          data?.data?.error === false || data?.data?.error == null;
        if (!resp.ok || data.success === false || !forwardOk) {
          throw new Error(data.msg || data.error || "切换失败");
        }
        const portHint =
          data.custom === true
            ? "，远端 " +
              String(data.host || "") +
              (data.port != null ? ":" + String(data.port) : "")
            : data.port != null
              ? "，本地端口 " + String(data.port)
              : "";
        const detailMsg = data?.data?.message ? "（" + data.data.message + "）" : "";
        setUserStatus("切换成功" + portHint + detailMsg);
        useProxyFromUserDialog.close();
        await Promise.all([loadSingboxUsers(), loadProxyList()]);
      } catch (err) {
        setUseProxyFromUserStatus(err.message || String(err));
      }
    }

    async function saveUserWifi(tag, inputEl, btnEl) {
      if (!tag) {
        return;
      }
      try {
        if (btnEl) {
          btnEl.disabled = true;
        }
        setUserStatus("正在保存 WiFi…");
        const params = new URLSearchParams();
        params.set("tag", tag);
        params.set("wifi_name", inputEl ? inputEl.value : "");
        const resp = await fetch("/api/user-wifi?" + params.toString());
        const data = await resp.json();
        if (!resp.ok || data.success === false) {
          throw new Error(data.msg || data.error || "保存失败");
        }
        await loadSingboxUsers();
        setUserStatus(userStatusText.textContent + " · WiFi 已保存");
      } catch (e) {
        setUserStatus("WiFi 保存失败: " + e.message);
      } finally {
        if (btnEl) {
          btnEl.disabled = false;
        }
      }
    }

    async function loadSingboxUsers() {
      try {
        setUserStatus("正在加载...");
        const [userResp, portResp, accResp] = await Promise.all([
          fetch("/api/singbox-users"),
          fetch("/api/port_status"),
          fetch("/api/9proxy-account")
        ]);
        const userData = await userResp.json();
        if (!userResp.ok || userData.success === false) {
          throw new Error(userData.msg || userData.error || "读取用户失败");
        }
        const portJson = await portResp.json().catch(() => ({}));
        let portRows = [];
        let portNote = "";
        if (portResp.ok && Array.isArray(portJson.data)) {
          portRows = portJson.data;
          if (portJson.error === true && portJson.message) {
            portNote = String(portJson.message);
          }
        } else {
          portNote = portJson.message
            ? String(portJson.message)
            : "port_status 不可用（HTTP " + portResp.status + "）";
        }
        const users = Array.isArray(userData.users) ? userData.users : [];
        const accData = await accResp.json().catch(() => ({}));
        renderNineProxyAccountBar(accData, accResp.ok);
        renderUserRows(users, portRows, nineProxyLoggedGlobal);
        let msg = "共 " + users.length + " 个用户；port_status " + portRows.length + " 条";
        if (portNote) {
          msg += " · " + portNote;
        }
        setUserStatus(msg);
      } catch (err) {
        nineProxyLoggedGlobal = false;
        renderUserRows([], [], false);
        renderNineProxyAccountBar(null, false);
        setUserStatus("加载失败: " + err.message);
      }
    }

    function showPanel(name) {
      const isUsers = name === "users";
      panelUsers.classList.toggle("active", isUsers);
      panelProxies.classList.toggle("active", !isUsers);
      navUsers.classList.toggle("active", isUsers);
      navProxies.classList.toggle("active", !isUsers);
      if (isUsers) {
        loadSingboxUsers();
      }
    }

    function countryFlag(code) {
      const cc = (code || "").toUpperCase();
      if (!/^[A-Z]{2}$/.test(cc)) {
        return "🏳️";
      }
      return String.fromCodePoint(
        cc.charCodeAt(0) + 127397,
        cc.charCodeAt(1) + 127397
      );
    }

    function fillStateOptions(countryCode) {
      const stateList = statesByCountry[countryCode] || [];
      stateInput.innerHTML =
        '<option value="">state (州/省)</option>' +
        stateList
          .map(function (row) {
            const label =
              typeof row === "string"
                ? row
                : String(row.state_name || row.state_code || "").trim();
            return (
              '<option value="' +
              escapeHtml(label) +
              '">' +
              escapeHtml(label) +
              "</option>"
            );
          })
          .join("");
    }

    function populateFilterOptions(list) {
      const countrySet = new Set();
      const stateSet = new Set();
      list.forEach((item) => {
        if (item?.country_code) countrySet.add(item.country_code);
        if (item?.state) stateSet.add(item.state);
      });

      const countries = Array.from(countrySet).sort();
      const states = Array.from(stateSet).sort();

      const selectedCountry = filterCountrySelect.value;
      const selectedState = filterStateSelect.value;

      filterCountrySelect.innerHTML = '<option value="">筛选国家（全部）</option>' +
        countries.map((country) => '<option value="' + country + '">' + countryFlag(country) + ' ' + country + '</option>').join("");
      filterStateSelect.innerHTML = '<option value="">筛选地区（全部）</option>' +
        states.map((state) => '<option value="' + state + '">' + state + '</option>').join("");

      if (countries.includes(selectedCountry)) filterCountrySelect.value = selectedCountry;
      if (states.includes(selectedState)) filterStateSelect.value = selectedState;
    }

    function applyFilters() {
      const country = filterCountrySelect.value;
      const state = filterStateSelect.value;
      const filtered = allProxyList.filter((item) => {
        const countryMatch = !country || item?.country_code === country;
        const stateMatch = !state || item?.state === state;
        return countryMatch && stateMatch;
      });
      renderRows(filtered);
      let statusMsg =
        "已加载 " + allProxyList.length + " 条，筛选后 " + filtered.length + " 条";
      if (lastNineProxyListNote) {
        statusMsg += " · " + lastNineProxyListNote;
      }
      setStatus(statusMsg);
    }

    async function loadLocationCodes() {
      try {
        const resp = await fetch("/api/location-codes");
        const data = await resp.json();
        const countries = Array.isArray(data?.countries) ? data.countries : [];
        statesByCountry = data?.statesByCountry || {};
        locData.countries = countries;
        locData.statesByCountry = data?.statesByCountry || {};
        locData.citiesByCountry = data?.citiesByCountry || {};
        locData.ispsByCountry = data?.ispsByCountry || {};
        countryInput.innerHTML = '<option value="">country (国家代码)</option>' +
          countries.map((country) => '<option value="' + country + '">' + country + '</option>').join("");
        countryInput.value = "US";
        if (!countryInput.value && countries.length > 0) {
          countryInput.value = countries[0];
        }
        fillStateOptions(countryInput.value);
      } catch {
        setAddStatus("国家/州代码加载失败");
      }
    }

    function renderRows(list) {
      if (!Array.isArray(list) || list.length === 0) {
        proxyBody.innerHTML = '<tr><td colspan="11">暂无数据</td></tr>';
        return;
      }

      proxyBody.innerHTML = list.map((item) => {
        const onlineText = item.is_online ? "在线" : "离线";
        const onlineClass = item.is_online ? "online" : "offline";
        const boundUserStr =
          item.bound_user != null ? String(item.bound_user).trim() : "";
        const hasUserUse = boundUserStr !== "";
        const useStatusText = hasUserUse ? "正在使用" : "-";
        const useStatusClass = hasUserUse ? "using" : "";
        const rowClass = hasUserUse ? "row-using" : "";
        const boundUserCell =
          item.bound_user && String(item.bound_user).trim() !== ""
            ? escapeHtml(String(item.bound_user).trim())
            : "-";
        const boundWifiCell =
          item.bound_wifi_name && String(item.bound_wifi_name).trim() !== ""
            ? escapeHtml(String(item.bound_wifi_name).trim())
            : "-";
        return \`
          <tr class="\${rowClass}">
            <td>\${item.id || "-"}</td>
            <td>\${item.city || "-"}</td>
            <td>\${item.ip || "-"}</td>
            <td>\${countryFlag(item.country_code)} \${item.country_code || "-"}</td>
            <td>\${item.state || "-"}</td>
            <td class="\${onlineClass}">\${onlineText}</td>
            <td>\${item.binding || "-"}</td>
            <td class="multi-bind-cell">\${boundUserCell}</td>
            <td class="multi-bind-cell">\${boundWifiCell}</td>
            <td class="\${useStatusClass}">\${useStatusText}</td>
            <td>
              <button
                type="button"
                class="switch-btn"
                onclick="openSwitchModal('\${item.id || ""}')"
              >
                使用
              </button>
            </td>
          </tr>
        \`;
      }).join("");
    }

    async function openSwitchModal(proxyId) {
      if (!proxyId) {
        setStatus("缺少代理 ID");
        return;
      }
      pendingSwitchProxyId = proxyId;
      setSwitchStatus("");
      const row = allProxyList.find((p) => String(p.id) === String(proxyId));
      switchProxyMeta.textContent = row
        ? "代理 ID: " + proxyId + (row.ip ? " · IP " + row.ip : "")
        : "代理 ID: " + proxyId;

      try {
        const resp = await fetch("/api/singbox-users");
        const data = await resp.json();
        if (!resp.ok || data.success === false) {
          throw new Error(data.msg || data.error || "读取用户失败");
        }
        const users = Array.isArray(data.users) ? data.users : [];
        const parts = [];
        for (let i = 0; i < users.length; i += 1) {
          const u = users[i];
          const tag = String(u.outbound || "").trim();
          if (!tag) {
            continue;
          }
          const addr = String(u.socks_address || "").trim();
          const port = parsePortFromSocks(addr);
          const wifiBit =
            u.wifi_name && String(u.wifi_name).trim() !== ""
              ? String(u.wifi_name).trim() + " · "
              : "";
          const tail =
            addr && port != null
              ? addr + "，端口 " + port
              : addr || "无 SOCKS 地址";
          const label = wifiBit + tag + "（" + tail + "）";
          parts.push(
            '<option value="' +
              escapeHtml(tag) +
              '" data-socks="' +
              escapeHtml(addr) +
              '">' +
              escapeHtml(label) +
              "</option>"
          );
        }
        switchUserSelect.innerHTML = parts.length
          ? parts.join("")
          : '<option value="">无可用出站（请检查 route.rules / SOCKS 出站）</option>';

        if (parts.length) {
          const bindNorm = row && row.binding ? normAddr(row.binding) : "";
          let matched = false;
          for (let j = 0; j < switchUserSelect.options.length; j += 1) {
            const opt = switchUserSelect.options[j];
            const sn = opt.getAttribute("data-socks");
            if (bindNorm && sn && normAddr(sn) === bindNorm) {
              switchUserSelect.selectedIndex = j;
              matched = true;
              break;
            }
          }
          if (!matched) {
            switchUserSelect.selectedIndex = 0;
          }
        }
        switchProxyDialog.showModal();
      } catch (err) {
        setStatus("打开使用代理窗口失败: " + err.message);
      }
    }

    async function confirmSwitchProxy() {
      const opt = switchUserSelect.selectedOptions[0];
      if (!opt || !opt.value) {
        setSwitchStatus("请选择要绑定的出站");
        return;
      }
      const tag = opt.value;
      const socksAttr = opt.getAttribute("data-socks");
      const targetNorm = socksAttr ? normAddr(socksAttr) : "";

      const others = allProxyList.filter((item) => {
        if (String(item.id) === String(pendingSwitchProxyId)) {
          return false;
        }
        if (!item.binding) {
          return false;
        }
        return targetNorm && normAddr(item.binding) === targetNorm;
      });

      const selfRow = allProxyList.find((p) => String(p.id) === String(pendingSwitchProxyId));
      const hints = [];
      if (others.length > 0) {
        const o = others[0];
        hints.push(
          "所选用户已被占用：其他代理（ID: " +
            (o.id || "-") +
            "）已绑定 " +
            (o.binding || "") +
            "。"
        );
      }
      if (
        selfRow &&
        !selfRow.is_custom &&
        selfRow.binding &&
        String(selfRow.binding).trim() !== ""
      ) {
        hints.push(
          "当前代理已有绑定（" +
            selfRow.binding +
            "），将改绑到出站 " +
            tag +
            "（sing-box 配置中的本地 SOCKS 端口将由服务端自动选择）。"
        );
      }
      if (hints.length > 0) {
        hints.push("确定要继续使用吗？");
        if (!window.confirm(hints.join("\\n\\n"))) {
          return;
        }
      }

      try {
        setSwitchStatus("正在使用…");
        const ipParam =
          selfRow &&
          !selfRow.is_custom &&
          selfRow.ip &&
          String(selfRow.ip).trim() !== ""
            ? "&ip=" + encodeURIComponent(String(selfRow.ip).trim())
            : "";
        const resp = await fetch(
          apiPathForSwitchProxy(pendingSwitchProxyId) +
            "?id=" +
            encodeURIComponent(pendingSwitchProxyId) +
            "&tag=" +
            encodeURIComponent(tag) +
            ipParam
        );
        const data = await resp.json();
        const forwardOk =
          data?.data?.error === false || data?.data?.error == null;
        if (!resp.ok || data.success === false || !forwardOk) {
          throw new Error(data.msg || data.error || "使用失败");
        }
        const portHint =
          data.custom === true
            ? "，远端 " +
              String(data.host || "") +
              (data.port != null ? ":" + String(data.port) : "")
            : data.port != null
              ? "，本地端口 " + String(data.port)
              : "";
        const detailMsg = data?.data?.message ? "（" + data.data.message + "）" : "";
        setStatus("使用成功" + portHint + detailMsg);
        switchProxyDialog.close();
        await Promise.all([loadProxyList(), loadSingboxUsers()]);
      } catch (err) {
        setSwitchStatus("使用失败: " + err.message);
      }
    }

    async function loadProxyList() {
      try {
        setStatus("正在加载...");
        const { list, nineNote } = await fetchProxyListData();
        allProxyList = list;
        lastNineProxyListNote = nineNote || "";
        populateFilterOptions(allProxyList);
        applyFilters();
      } catch (err) {
        renderRows([]);
        lastNineProxyListNote = "";
        setStatus("加载失败: " + err.message);
      }
    }

    async function addProxy() {
      const params = new URLSearchParams();
      params.set("num", "1");
      params.set("port", "60000");
      params.set("t", "2");
      params.set("country", (countryInput.value || "US").trim());
      if (stateInput.value) {
        params.set("state", stateInput.value.trim());
      }

      try {
        setAddStatus("正在新增代理...");
        const resp = await fetch("/api/add-proxy?" + params.toString());
        const data = await resp.json();
        if (!resp.ok || data.success === false) {
          throw new Error(data.msg || data.error || "新增代理失败");
        }
        const detail = data?.data?.message || "Success";
        setAddStatus("新增成功（" + detail + "）");
        await loadProxyList();
        addProxyDialog.close();
      } catch (err) {
        setAddStatus("新增失败: " + err.message);
      }
    }

    countryInput.addEventListener("change", (e) => {
      fillStateOptions(e.target.value);
    });
    openAddModalBtn.addEventListener("click", () => {
      setAddStatus("");
      addProxyDialog.showModal();
    });
    cancelAddModalBtn.addEventListener("click", () => {
      addProxyDialog.close();
    });
    cancelSwitchBtn.addEventListener("click", () => {
      switchProxyDialog.close();
    });
    confirmSwitchBtn.addEventListener("click", confirmSwitchProxy);
    refreshBtn.addEventListener("click", loadProxyList);
    filterCountrySelect.addEventListener("change", applyFilters);
    filterStateSelect.addEventListener("change", applyFilters);
    addProxyBtn.addEventListener("click", addProxy);
    navUsers.addEventListener("click", () => showPanel("users"));
    navProxies.addEventListener("click", () => showPanel("proxies"));
    refreshUsersBtn.addEventListener("click", loadSingboxUsers);
    if (nineProxyRefreshBtn) {
      nineProxyRefreshBtn.addEventListener("click", () => {
        void refreshNineProxyAccountBar();
      });
    }
    if (nineProxyLogoutBtn) {
      nineProxyLogoutBtn.addEventListener("click", async () => {
        nineProxyLogoutBtn.disabled = true;
        try {
          const resp = await fetch("/api/9proxy-logout", { method: "POST" });
          const data = await resp.json().catch(() => ({}));
          if (!resp.ok || data.success === false) {
            throw new Error(data.msg || data.error || "退出失败");
          }
          setUserStatus((data.msg || "已退出代理服务") + " · 可刷新用户或代理列表");
          await refreshNineProxyAccountBar();
          await loadProxyList();
        } catch (e) {
          setUserStatus("退出失败: " + (e.message || String(e)));
        } finally {
          nineProxyLogoutBtn.disabled = false;
        }
      });
    }
    if (
      nineProxyLoginBtn &&
      nineProxyLoginDialog &&
      nineProxyLoginCancelBtn &&
      nineProxyLoginSubmitBtn &&
      nineProxyLoginStatus
    ) {
      nineProxyLoginBtn.addEventListener("click", () => {
        nineProxyLoginStatus.textContent = "";
        if (nineProxyUserInput) {
          nineProxyUserInput.value = "";
        }
        if (nineProxyPassInput) {
          nineProxyPassInput.value = "";
        }
        nineProxyLoginDialog.showModal();
        if (nineProxyUserInput) {
          nineProxyUserInput.focus();
        }
      });
      nineProxyLoginCancelBtn.addEventListener("click", () => {
        nineProxyLoginDialog.close();
      });
      nineProxyLoginSubmitBtn.addEventListener("click", async () => {
        const u = nineProxyUserInput ? String(nineProxyUserInput.value || "").trim() : "";
        const p = nineProxyPassInput ? String(nineProxyPassInput.value || "") : "";
        if (!u || !p) {
          nineProxyLoginStatus.textContent = "请填写账号和密码";
          return;
        }
        nineProxyLoginSubmitBtn.disabled = true;
        nineProxyLoginStatus.textContent = "正在登录…";
        try {
          const resp = await fetch("/api/9proxy-login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: u, password: p })
          });
          const data = await resp.json().catch(() => ({}));
          if (!resp.ok || data.success === false) {
            throw new Error(data.msg || data.error || "登录失败");
          }
          nineProxyLoginStatus.textContent = data.msg || "登录成功";
          nineProxyLoginDialog.close();
          await refreshNineProxyAccountBar();
          await loadSingboxUsers();
          await loadProxyList();
        } catch (e) {
          nineProxyLoginStatus.textContent = e.message || String(e);
        } finally {
          nineProxyLoginSubmitBtn.disabled = false;
        }
      });
    }
    cancelUseProxyFromUserBtn.addEventListener("click", () => {
      useProxyFromUserDialog.close();
    });
    confirmUseProxyFromUserBtn.addEventListener("click", () => {
      void confirmUseProxyFromUser();
    });
    switchAddCustomSocksBtn.addEventListener("click", async () => {
      try {
        switchAddCustomSocksBtn.disabled = true;
        setSwitchStatus("正在保存自定义代理…");
        await addCustomSocksLine(switchCustomSocksLine.value);
        switchCustomSocksLine.value = "";
        await loadProxyList();
        setSwitchStatus(
          "已加入代理列表（顶部「自定义」）。当前仍为已选中的那条；新代理请到列表中点「使用」。"
        );
      } catch (e) {
        setSwitchStatus(e.message || String(e));
      } finally {
        switchAddCustomSocksBtn.disabled = false;
      }
    });
    userAddCustomSocksBtn.addEventListener("click", async () => {
      try {
        userAddCustomSocksBtn.disabled = true;
        setUseProxyFromUserStatus("正在保存…");
        const row = await addCustomSocksLine(userCustomSocksLine.value);
        userCustomSocksLine.value = "";
        const { list } = await fetchProxyListData();
        if (!list.length) {
          useProxySelectFromUser.innerHTML =
            '<option value="">暂无今日代理</option>';
        } else {
          setTodayProxySelectFromList(useProxySelectFromUser, list);
        }
        appendDirectProxyOptionToUserSelect();
        if (row && row.id) {
          const sid = String(row.id);
          for (let j = 0; j < useProxySelectFromUser.options.length; j += 1) {
            if (useProxySelectFromUser.options[j].value === sid) {
              useProxySelectFromUser.selectedIndex = j;
              break;
            }
          }
        }
        setUseProxyFromUserStatus("已保存并选中，可点「确认切换」。");
        await loadProxyList();
      } catch (e) {
        setUseProxyFromUserStatus(e.message || String(e));
      } finally {
        userAddCustomSocksBtn.disabled = false;
      }
    });
    userBody.addEventListener("click", async (ev) => {
      const refreshOfflineBtn = ev.target.closest(".user-refresh-offline-btn");
      if (refreshOfflineBtn) {
        const tagRf = refreshOfflineBtn.getAttribute("data-outbound");
        const publicIpRf = refreshOfflineBtn.getAttribute("data-public-ip");
        if (!tagRf || !publicIpRf) {
          return;
        }
        try {
          refreshOfflineBtn.disabled = true;
          setUserStatus("正在刷新离线代理…");
          const resp = await fetch(
            "/api/refresh-offline-nine?tag=" +
              encodeURIComponent(tagRf) +
              "&public_ip=" +
              encodeURIComponent(publicIpRf)
          );
          const data = await resp.json().catch(() => ({}));
          const forwardOk = data?.data?.error === false || data?.data?.error == null;
          if (!resp.ok || data.success === false || !forwardOk) {
            throw new Error(data.msg || data.error || "刷新失败");
          }
          setUserStatus(
            (data.msg || "刷新成功") +
              " · " +
              String(tagRf) +
              (data.port != null ? " · 本地端口 " + String(data.port) : "")
          );
          await Promise.all([loadSingboxUsers(), loadProxyList()]);
        } catch (e) {
          setUserStatus("刷新失败: " + (e.message || String(e)));
        } finally {
          refreshOfflineBtn.disabled = false;
        }
        return;
      }
      const useFromUser = ev.target.closest(".use-from-user-btn");
      if (useFromUser) {
        const tag = useFromUser.getAttribute("data-outbound");
        if (tag) {
          await openUseProxyForOutbound(tag);
        }
        return;
      }
      const ruleSwitchBtn = ev.target.closest(".nine-rule-switch-btn");
      if (ruleSwitchBtn) {
        const tagRs = ruleSwitchBtn.getAttribute("data-outbound");
        if (tagRs) {
          function setAllRuleSwitchFlowBusy(busy) {
            if (!userBody) {
              return;
            }
            userBody.querySelectorAll(".use-from-user-btn").forEach(function (b) {
              b.disabled = busy;
            });
            userBody.querySelectorAll(".nine-rule-switch-btn").forEach(function (b) {
              b.disabled = busy;
            });
          }
          setAllRuleSwitchFlowBusy(true);
          void (async function () {
            try {
              setUserStatus("\u6b63\u5728\u6309\u7b5b\u9009\u89c4\u5219\u8bf7\u6c42\u65b0\u4ee3\u7406\u2026");
              const resp = await fetch(
                "/api/proxy?tag=" + encodeURIComponent(tagRs)
              );
              const data = await resp.json().catch(() => ({}));
              let errMsg = "";
              if (!resp.ok || data.success === false) {
                errMsg =
                  (data.msg && String(data.msg)) ||
                  (data.error && String(data.error)) ||
                  "\u8bf7\u6c42\u5931\u8d25\uFF08HTTP " + String(resp.status) + "\uFF09";
              } else {
                const inner = data.data;
                if (
                  inner &&
                  typeof inner === "object" &&
                  (inner.error === true ||
                    inner.success === false ||
                    (typeof inner.error === "string" && inner.error.trim() !== ""))
                ) {
                  errMsg =
                    inner.message != null && String(inner.message).trim() !== ""
                      ? String(inner.message)
                      : inner.msg != null && String(inner.msg).trim() !== ""
                        ? String(inner.msg)
                        : typeof inner.error === "string"
                          ? inner.error.trim()
                          : "\u4ee3\u7406\u670d\u52a1\u8fd4\u56de\u9519\u8bef";
                }
              }
              if (errMsg) {
                setUserStatus("\u89c4\u5219\u5207\u6362\u5931\u8d25: " + errMsg);
                showProxyRuleSwitchErrorDialog(errMsg, data);
                return;
              }
              const detail =
                data.data && data.data.message != null
                  ? String(data.data.message)
                  : "";
              const portHint =
                data.port != null ? "\uFF08\u672c\u5730\u7aef\u53e3 " + String(data.port) + "\uFF09" : "";
              setUserStatus(
                "\u89c4\u5219\u5207\u6362\u6210\u529f" +
                  portHint +
                  (detail ? " " + detail : "")
              );
              await Promise.all([loadSingboxUsers(), loadProxyList()]);
            } catch (e) {
              const errMsg = e.message || String(e);
              setUserStatus("\u89c4\u5219\u5207\u6362\u5931\u8d25: " + errMsg);
              showProxyRuleSwitchErrorDialog(errMsg, null);
            } finally {
              setAllRuleSwitchFlowBusy(false);
            }
          })();
        }
        return;
      }
      const nfRuleBtn = ev.target.closest(".nine-filter-rule-btn");
      if (nfRuleBtn) {
        const tagNf = nfRuleBtn.getAttribute("data-outbound");
        if (tagNf) {
          void openNineFilterRuleDialog(tagNf);
        }
        return;
      }
      const toggle = ev.target.closest(".wifi-toggle");
      if (toggle) {
        const inner = toggle.closest(".wifi-cell-inner");
        if (!inner) {
          return;
        }
        const expanded = inner.classList.toggle("wifi-expanded");
        const inp = inner.querySelector(".wifi-name-input");
        if (expanded) {
          if (inp) {
            inp.focus();
            inp.select();
          }
        } else if (inp) {
          const back = inp.getAttribute("data-initial");
          inp.value = back != null ? back : "";
        }
        return;
      }
      const btn = ev.target.closest(".wifi-save-btn");
      if (!btn) {
        return;
      }
      const tag = btn.getAttribute("data-outbound");
      const inner = btn.closest(".wifi-cell-inner");
      const inp = inner && inner.querySelector(".wifi-name-input");
      if (!tag || !inp) {
        return;
      }
      await saveUserWifi(tag, inp, btn);
    });
    userBody.addEventListener("keydown", (ev) => {
      if (ev.key !== "Enter") {
        return;
      }
      if (!ev.target.classList || !ev.target.classList.contains("wifi-name-input")) {
        return;
      }
      ev.preventDefault();
      const tr = ev.target.closest("tr");
      const btn = tr && tr.querySelector(".wifi-save-btn");
      if (btn) {
        btn.click();
      }
    });
    if (nineFilterRuleDialog) {
      nineFilterRuleDialog.addEventListener("click", function (ev) {
        const x = ev.target.closest(".nf-chip-x");
        if (!x) {
          return;
        }
        const kind = x.getAttribute("data-nf-kind");
        const v = x.getAttribute("data-nf-v");
        if (kind && v != null) {
          nfRemoveChip(kind, v);
        }
      });
    }
    if (nfCountrySelect && nfCountrySearch) {
      nfCountrySearch.addEventListener("input", function () {
        nfRebuildCountryOptions();
      });
      nfCountrySelect.addEventListener("change", function () {
        nfOnCountryChange();
      });
    }
    if (nfStateSearch) {
      nfStateSearch.addEventListener("input", function () {
        nfRefreshStatePick();
      });
    }
    if (nfStateAddBtn && nfStatePick) {
      nfStateAddBtn.addEventListener("click", function () {
        const v = nfStatePick.value;
        if (!v) {
          return;
        }
        const lab =
          nfStatePick.options[nfStatePick.selectedIndex]
            ? nfStatePick.options[nfStatePick.selectedIndex].textContent
            : v;
        nfAddChip("states", v, lab);
      });
    }
    if (nfCitySearch) {
      nfCitySearch.addEventListener("input", function () {
        nfRefreshCityPick();
      });
    }
    if (nfCityAddBtn && nfCityPick) {
      nfCityAddBtn.addEventListener("click", function () {
        const v = nfCityPick.value;
        if (!v) {
          return;
        }
        const lab =
          nfCityPick.options[nfCityPick.selectedIndex]
            ? nfCityPick.options[nfCityPick.selectedIndex].textContent
            : v;
        nfAddChip("cities", v, lab);
      });
    }
    if (nfIspSearch) {
      nfIspSearch.addEventListener("input", function () {
        nfRefreshIspPick();
      });
    }
    if (nfIspAddBtn && nfIspPick) {
      nfIspAddBtn.addEventListener("click", function () {
        const v = nfIspPick.value;
        if (!v) {
          return;
        }
        const lab =
          nfIspPick.options[nfIspPick.selectedIndex]
            ? nfIspPick.options[nfIspPick.selectedIndex].textContent
            : v;
        nfAddChip("isps", v, lab);
      });
    }
    if (nfCancelFilterBtn && nineFilterRuleDialog) {
      nfCancelFilterBtn.addEventListener("click", function () {
        nineFilterRuleDialog.close();
      });
    }
    if (nfSaveFilterBtn) {
      nfSaveFilterBtn.addEventListener("click", function () {
        void nfSaveFilter();
      });
    }
    if (proxyRuleSwitchErrorOkBtn && proxyRuleSwitchErrorDialog) {
      proxyRuleSwitchErrorOkBtn.addEventListener("click", function () {
        proxyRuleSwitchErrorDialog.close();
      });
    }
    loadLocationCodes();
    loadSingboxUsers();
    loadProxyList();
  </script>
</body>
</html>`);
});

/** 启动 HTTP 服务，监听 0.0.0.0:PORT。 */
app.listen(PORT, "0.0.0.0", () => {
    const hp = process.env.HTTP_PROXY || "";
    const hsp = process.env.HTTPS_PROXY || "";
    const ap = process.env.ALL_PROXY || "";
    console.log(
        `API running: http://0.0.0.0:${PORT} | script=${__filename} cwd=${process.cwd()} HTTP_PROXY=${hp ? "[set]" : ""} HTTPS_PROXY=${hsp ? "[set]" : ""} ALL_PROXY=${ap ? "[set]" : ""}`
    );
});
