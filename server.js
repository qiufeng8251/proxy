const express = require("express");
const axios = require("axios");
const crypto = require("crypto");
const fs = require("fs");
const http = require("http");
const https = require("https");
const path = require("path");
const { exec } = require("child_process");
const { SocksProxyAgent } = require("socks-proxy-agent");
const { STATE_CODE_ROWS } = require("./stateCodes");

/**
 * sing-box / 9proxy 简易控制台：聚合本机 9proxy 端口 API、代理列表、按 tag 切换并写 CONFIG_PATH，
 * 并提供 `/` 静态 HTML 管理页。
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
/** ipinfo 州/省字段缓存（历史兼容） */
const IPINFO_CACHE = new Map();
/** ipinfo 国家/州/市缓存 */
const IP_GEO_CACHE = new Map();
/** 本机 9proxy 应用 HTTP 根地址（端口 API、today_list、forward 等） */
const NINE_PROXY_BASE = "http://127.0.0.1:8080";
/** 本地 SOCKS 端口扫描下界（与 port_free 扫描配合） */
const LOCAL_SOCKS_SCAN_MIN = 60000;
/** 本地 SOCKS 端口扫描上界 */
const LOCAL_SOCKS_SCAN_MAX = 60255;

/**
 * 请求 9proxy `today_list`，获取今日可用代理列表原始 JSON。
 * @returns {Promise<object>} 9proxy 返回体（含 data 或 proxy.data 等形态）
 */
async function getProxy() {
    const res = await axios.get(`${NINE_PROXY_BASE}/api/today_list?t=2&limit=200`);
    return res.data;
}

/**
 * 从内置州省表整理出国家列表、各国下的州代码，供前端下拉与新增代理选区。
 * @returns {{ rows: typeof STATE_CODE_ROWS, countries: string[], statesByCountry: Record<string, string[]> }}
 */
function getLocationCodes() {
        const countriesSet = new Set();
        const statesByCountry = {};

        for (let i = 0; i < STATE_CODE_ROWS.length; i += 1) {
            const countryCode = STATE_CODE_ROWS[i].country_code;
            const stateCode = STATE_CODE_ROWS[i].state_code;
            if (!countryCode) {
                continue;
            }
            countriesSet.add(countryCode);
            if (!statesByCountry[countryCode]) {
                statesByCountry[countryCode] = [];
            }
            if (stateCode && !statesByCountry[countryCode].includes(stateCode)) {
                statesByCountry[countryCode].push(stateCode);
            }
        }

        const countries = Array.from(countriesSet).sort();
        countries.forEach((country) => statesByCountry[country].sort());

        return {
            rows: STATE_CODE_ROWS,
            countries,
            statesByCountry
        };
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
                server_port: LOCAL_SOCKS_SCAN_MIN
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
    const r = await axios.get(`${NINE_PROXY_BASE}/api/port_status`, {
        params: { t: 2 },
        timeout: 15000
    });
    return Array.isArray(r.data?.data) ? r.data.data : [];
}

/**
 * 转发请求 9proxy `GET /api/port_check?ports=all`，返回各端口在线状态列表。
 * @returns {Promise<object[]>}
 */
async function nineProxyPortCheckAllRows() {
    const r = await axios.get(`${NINE_PROXY_BASE}/api/port_check`, {
        params:
            {
                t: 2,
                ports: "all"
            },
        timeout: 20000
    });
    return Array.isArray(r.data?.data) ? r.data.data : [];
}

/**
 * 查询 9proxy `GET /api/port_free` 判断单个端口是否可用（以 `error === false` 为可用）。
 * @param {number|string} port
 * @returns {Promise<boolean>}
 */
async function nineProxyPortFreeOk(port) {
    const r = await axios.get(`${NINE_PROXY_BASE}/api/port_free`, {
        params: { t: 2, ports: String(port) },
        timeout: 8000
    });
    return r.data && r.data.error === false;
}

/**
 * 在 port_status 结果中找第一个在线且 `public_ip` 与目标代理 IP 一致的端口。
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
        if (!row || row.online === false) {
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
 * 在 [LOCAL_SOCKS_SCAN_MIN, LOCAL_SOCKS_SCAN_MAX] 内顺序调用 `nineProxyPortFreeOk`，返回第一个可用端口。
 * @returns {Promise<number|null>}
 */
async function pickPortViaPortFreeScan() {
    for (let p = LOCAL_SOCKS_SCAN_MIN; p <= LOCAL_SOCKS_SCAN_MAX; p += 1) {
        try {
            if (await nineProxyPortFreeOk(p)) {
                return p;
            }
        } catch {
            // try next
        }
    }
    return null;
}

/**
 * 在 port_check 全量结果中取在线端口的最小端口号。
 * @param {object[]} rows
 * @returns {number|null}
 */
function pickPortFromPortCheckAll(rows) {
    if (!Array.isArray(rows)) {
        return null;
    }
    const candidates = [];
    for (let i = 0; i < rows.length; i += 1) {
        const row = rows[i];
        if (!row || row.online !== true || row.port == null) {
            continue;
        }
        const p = Number(row.port);
        if (!Number.isFinite(p) || p <= 0) {
            continue;
        }
        candidates.push(p);
    }
    candidates.sort((a, b) => a - b);
    return candidates.length ? candidates[0] : null;
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
    const res = await axios.get(`${NINE_PROXY_BASE}/api/today_list`, {
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
 * GET /api/switch-proxy
 * 查询参数：`id`（代理 id，必填）、`tag`（sing-box SOCKS 出站 tag，必填）、`ip`（公网 IP，可选）。
 * 流程：解析 IP → port_status 匹配端口 → 否则 port_free 扫描 → 否则 port_check all；
 * 再调用 9proxy forward，把该 tag 的 SOCKS 出站写为 127.0.0.1:所选端口 保存 CONFIG_PATH，
 * 最后执行 `systemctl restart sing-box` 使配置生效。
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

    try {
        const proxyIp = await resolveProxyIpForId(id, explicitIp);
        if (!proxyIp) {
            return res.status(400).json({
                success: false,
                msg: "无法解析代理 IP，请在列表中刷新后重试或显式传入 ip 参数"
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

        if (chosen == null) {
            chosen = await pickPortViaPortFreeScan();
        }
        if (chosen == null) {
            const checkRows = await nineProxyPortCheckAllRows();
            chosen = pickPortFromPortCheckAll(checkRows);
        }
        if (chosen == null) {
            return res.status(500).json({
                success: false,
                msg: "无可用本地端口（port_status / port_free / port_check 均未找到）"
            });
        }

        const result = await axios.get(`${NINE_PROXY_BASE}/api/forward`, {
            params: {
                t: 2,
                port: chosen,
                id
            },
            timeout: 20000
        });

        if (result.data?.error === true) {
            return res.status(502).json({
                success: false,
                msg: result.data?.message || "9proxy forward 失败",
                data: result.data
            });
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
                data: result.data
            });
        }

        res.json({
            success: true,
            msg: "切换成功（已写入 sing-box 配置并已重启 sing-box）",
            port: chosen,
            tag,
            data: result.data
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
 * GET /api/location-codes
 * 返回内置 `stateCodes` 整理后的国家列表、各国州代码及完整行数据，供前端筛选与新增代理。
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
        res.status(502).json({
            error: true,
            message: e.message || "port_status 请求失败",
            data: []
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
            "today",
            "t"
        ];
        const params = {};
        allowedKeys.forEach((key) => {
            const value = req.query[key];
            if (typeof value === "string" && value.trim() !== "") {
                params[key] = value.trim();
            }
        });
        if (!params.num) params.num = "1";
        if (!params.port) params.port = "60000";
        if (!params.t) params.t = "2";

        const result = await axios.get(`${NINE_PROXY_BASE}/api/proxy`, { params });
        res.json({
            success: true,
            msg: "新增代理请求成功",
            data: result.data
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            msg: "新增代理失败",
            error: e.message
        });
    }
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
    .user-hint {
      font-size: 13px;
      color: #6b7280;
      margin-bottom: 12px;
      line-height: 1.5;
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
        <h1>用户管理</h1>
        <p class="user-hint">用户行来自 <code>route.rules</code> 的 <code>outbound</code>，与 <code>outbounds</code> 中<strong>同名 tag</strong> 的出站一一对应；右侧<strong>操作 · 切换</strong>可弹出列表选择今日代理或列表底部的<strong>直连</strong>（将该 tag 出站改为 <code>type: direct</code>，不经 SOCKS）。WiFi 名称写入 <code>proxy-user-meta.json</code> 的 <code>wifi_by_outbound</code>；点击<strong>铅笔</strong>展开编辑，<strong>关闭</strong>图标收起不保存。本机 <code>127.0.0.1</code> 类 SOCKS 的出口 IP、国家、州/省、城市由 <code>/api/port_status</code> 与地址匹配补齐；<strong>远端 SOCKS</strong>由服务端经 SOCKS 探测；出站为 <strong>直连</strong> 时由服务端<strong>不经代理</strong>访问 ipify 取本机出口 IP，并用 ipinfo 补齐国家、州/省、城市（与 SOCKS 列一致）；在线列显示「在线（直连）」或「离线」（探测失败时）。</p>
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
              <th style="width:88px;">操作</th>
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
    const endpoint = "/api/proxy-list";
    let statesByCountry = {};
    let allProxyList = [];
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

    function renderUserRows(users, portRows) {
      portRows = Array.isArray(portRows) ? portRows : [];
      if (!Array.isArray(users) || users.length === 0) {
        userBody.innerHTML = '<tr><td colspan="8">暂无路由规则或未读取到用户条目</td></tr>';
        return;
      }
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
        const pub =
          ps && ps.public_ip != null && String(ps.public_ip).trim() !== ""
            ? escapeHtml(String(ps.public_ip).trim())
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
            : '<span class="offline">离线</span>';
        } else if (isDirectUser) {
          onlineCell = '<span class="muted-cell">—</span>';
        }
        const bindHint = row.socks_address
          ? '<div class="muted-cell">' + escapeHtml(row.socks_address) + "</div>"
          : "";
        const outTag = String(row.outbound || "");
        const tagAttr = escapeHtml(outTag);
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
          '<td><button type="button" class="switch-btn use-from-user-btn" data-outbound="' +
          tagAttr +
          '">切换</button></td>' +
          "</tr>"
        );
      }).join("");
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
        parts.push(
          '<option value="' +
            escapeHtml(id) +
            '" data-ip="' +
            escapeHtml(ip) +
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
      if (Array.isArray(data?.data)) {
        return data.data;
      }
      if (Array.isArray(data?.proxy?.data)) {
        return data.proxy.data;
      }
      return [];
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
        const list = await fetchProxyListData();
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
        list = await fetchProxyListData();
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
          "/api/switch-proxy?id=" +
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
        const [userResp, portResp] = await Promise.all([
          fetch("/api/singbox-users"),
          fetch("/api/port_status")
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
        renderUserRows(users, portRows);
        let msg = "共 " + users.length + " 个用户；port_status " + portRows.length + " 条";
        if (portNote) {
          msg += " · " + portNote;
        }
        setUserStatus(msg);
      } catch (err) {
        renderUserRows([], []);
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
      stateInput.innerHTML = '<option value="">state (州/省)</option>' +
        stateList.map((state) => '<option value="' + state + '">' + state + '</option>').join("");
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
      setStatus("已加载 " + allProxyList.length + " 条，筛选后 " + filtered.length + " 条");
    }

    async function loadLocationCodes() {
      try {
        const resp = await fetch("/api/location-codes");
        const data = await resp.json();
        const countries = Array.isArray(data?.countries) ? data.countries : [];
        statesByCountry = data?.statesByCountry || {};
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
          "/api/switch-proxy?id=" +
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
        const list = await fetchProxyListData();
        allProxyList = list;
        populateFilterOptions(allProxyList);
        applyFilters();
      } catch (err) {
        renderRows([]);
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
        const list = await fetchProxyListData();
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
      const useFromUser = ev.target.closest(".use-from-user-btn");
      if (useFromUser) {
        const tag = useFromUser.getAttribute("data-outbound");
        if (tag) {
          await openUseProxyForOutbound(tag);
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
    loadLocationCodes();
    loadSingboxUsers();
    loadProxyList();
  </script>
</body>
</html>`);
});

/** 启动 HTTP 服务，监听 0.0.0.0:PORT。 */
app.listen(PORT, "0.0.0.0", () => {
    console.log(`API running: http://0.0.0.0:${PORT}`);
});
