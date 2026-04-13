const express = require("express");
const axios = require("axios");
const fs = require("fs");
const { exec } = require("child_process");
const { SocksProxyAgent } = require("socks-proxy-agent");
const { STATE_CODE_ROWS } = require("./stateCodes");

const app = express();
const PORT = 3000;
const CONFIG_PATH = "/etc/v2ray-agent/sing-box/conf/config.json";
const USER_META_PATH = "/etc/v2ray-agent/sing-box/conf/proxy-user-meta.json";
const NINE_PROXY_API = "http://127.0.0.1:8080";
const IPINFO_CACHE = new Map();
const IP_GEO_CACHE = new Map();

async function getProxy() {
    const res = await axios.get(`${NINE_PROXY_API}/api/today_list?t=2&limit=200`);
    return res.data;

}

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

async function getStateByIp(ip) {
    if (!ip) return "";
    if (IPINFO_CACHE.has(ip)) {
        return IPINFO_CACHE.get(ip);
    }
    const geo = await getIpGeo(ip);
    return geo.region;
}

async function enrichProxyState(list) {
    if (!Array.isArray(list) || list.length === 0) return list;
    const tasks = list.map(async (item) => {
        const state = await getStateByIp(item?.ip);
        return {
            ...item,
            state
        };
    });
    return Promise.all(tasks);
}

function buildSocksAgent(proxy) {
    const url = `socks5://${proxy.username}:${proxy.password}@${proxy.ip}:${proxy.port}`;
    return new SocksProxyAgent(url);
}

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

function normalizeBindingKey(addr) {
    return String(addr || "").replace(/\s+/g, "").toLowerCase();
}

function getSocksBindingToUserMap() {
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
                if (key) {
                    map[key] = ob.tag;
                }
            }
        }
    } catch {
        // ignore
    }
    return map;
}

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

function attachBoundUserToProxyList(list, bindingMap) {
    if (!Array.isArray(list)) {
        return list;
    }
    const wifiByTag = getOutboundWifiNameMap();
    return list.map((item) => {
        const key = normalizeBindingKey(item?.binding);
        const bound_user = key && bindingMap[key] ? bindingMap[key] : "";
        const bound_wifi_name =
            bound_user && wifiByTag[bound_user] ? wifiByTag[bound_user] : "";
        return {
            ...item,
            bound_user,
            bound_wifi_name
        };
    });
}

function socksAddressForOutboundTag(config, tag) {
    const outbounds = config?.outbounds;
    if (!Array.isArray(outbounds) || typeof tag !== "string") {
        return "";
    }
    for (let i = 0; i < outbounds.length; i += 1) {
        const ob = outbounds[i];
        if (
            ob
            && ob.type === "socks"
            && ob.tag === tag
            && ob.server
            && ob.server_port != null
        ) {
            return `${ob.server}:${ob.server_port}`;
        }
    }
    return "";
}

function collectAuthUsersByOutboundTag(config) {
    const byTag = Object.create(null);
    const rules = config?.route?.rules;
    if (!Array.isArray(rules)) {
        return byTag;
    }
    for (let i = 0; i < rules.length; i += 1) {
        const rule = rules[i];
        if (!rule || typeof rule.outbound !== "string") {
            continue;
        }
        const auth = rule.auth_user;
        if (!Array.isArray(auth) || auth.length === 0) {
            continue;
        }
        const tag = rule.outbound;
        if (!byTag[tag]) {
            byTag[tag] = [];
        }
        for (let j = 0; j < auth.length; j += 1) {
            const s = String(auth[j]);
            if (s && !byTag[tag].includes(s)) {
                byTag[tag].push(s);
            }
        }
    }
    return byTag;
}

function parsePortFromBindingAddress(addr) {
    const s = String(addr || "").trim();
    const idx = s.lastIndexOf(":");
    if (idx < 0) {
        return null;
    }
    const p = Number(s.slice(idx + 1));
    return Number.isFinite(p) && p > 0 ? p : null;
}

function getPortsUsedByOtherSocksOutbounds(config, exceptTag) {
    const set = new Set();
    const outbounds = config?.outbounds;
    if (!Array.isArray(outbounds)) {
        return set;
    }
    for (let i = 0; i < outbounds.length; i += 1) {
        const ob = outbounds[i];
        if (
            ob
            && ob.type === "socks"
            && typeof ob.tag === "string"
            && ob.tag !== exceptTag
            && ob.server_port != null
        ) {
            const p = Number(ob.server_port);
            if (Number.isFinite(p) && p > 0) {
                set.add(p);
            }
        }
    }
    return set;
}

function writeSocksOutboundLocalPort(tag, serverPort) {
    const raw = fs.readFileSync(CONFIG_PATH, "utf8");
    const config = JSON.parse(raw);
    if (!Array.isArray(config.outbounds)) {
        throw new Error("配置缺少 outbounds");
    }
    let found = false;
    for (let i = 0; i < config.outbounds.length; i += 1) {
        const ob = config.outbounds[i];
        if (ob && ob.type === "socks" && ob.tag === tag) {
            if (typeof ob.server === "string" && ob.server.trim() !== "") {
                ob.server = ob.server.trim();
            } else {
                ob.server = "127.0.0.1";
            }
            ob.server_port = Number(serverPort);
            found = true;
            break;
        }
    }
    if (!found) {
        throw new Error("未找到 SOCKS 出站 tag: " + tag);
    }
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
}

async function getTodayProxyById(id) {
    const result = await getProxy();
    const list = Array.isArray(result?.data)
        ? result.data
        : Array.isArray(result?.proxy?.data)
            ? result.proxy.data
            : [];
    const sid = String(id);
    for (let i = 0; i < list.length; i += 1) {
        if (String(list[i]?.id) === sid) {
            return list[i];
        }
    }
    return null;
}

async function fetchNinePortStatusRows() {
    const r = await axios.get(`${NINE_PROXY_API}/api/port_status`, {
        params: { t: 2 },
        timeout: 15000
    });
    return Array.isArray(r.data?.data) ? r.data.data : [];
}

function pickPortMatchingPublicIp(rows, targetIp, exclude) {
    const ip = String(targetIp || "").trim();
    if (!ip || !Array.isArray(rows)) {
        return null;
    }
    for (let i = 0; i < rows.length; i += 1) {
        const row = rows[i];
        const pip = String(row?.public_ip || "").trim();
        if (pip !== ip || row.online !== true) {
            continue;
        }
        const port = parsePortFromBindingAddress(row.address);
        if (port == null || exclude.has(port)) {
            continue;
        }
        return { port, via: "port_status_public_ip" };
    }
    return null;
}

/** 从 port_status 列表里选端口（避免 port_check?ports=all 在部分 9proxy 版本返回 406） */
function pickPortFromPortStatusRows(rows, exclude) {
    if (!Array.isArray(rows)) {
        return null;
    }
    for (let pass = 0; pass < 2; pass += 1) {
        const wantOnline = pass === 0;
        for (let i = 0; i < rows.length; i += 1) {
            const row = rows[i];
            const port = parsePortFromBindingAddress(row?.address);
            if (port == null || exclude.has(port)) {
                continue;
            }
            if (wantOnline && row.online !== true) {
                continue;
            }
            return {
                port,
                via: wantOnline ? "port_status_list_online" : "port_status_list_any"
            };
        }
    }
    return null;
}

async function portCheckPortsCsv(portsCsv) {
    const r = await axios.get(`${NINE_PROXY_API}/api/port_check`, {
        params: { ports: portsCsv, t: 2 },
        timeout: 15000,
        validateStatus: (s) => s >= 200 && s < 500
    });
    if (r.status === 406 || r.data?.error === true) {
        return [];
    }
    return Array.isArray(r.data?.data) ? r.data.data : [];
}

async function resolveForwardPortForProxy(publicIp, otherOccupiedPorts) {
    const exclude = otherOccupiedPorts instanceof Set ? otherOccupiedPorts : new Set(otherOccupiedPorts);
    const targetIp = String(publicIp || "").trim();

    let statusRows = [];
    try {
        statusRows = await fetchNinePortStatusRows();
    } catch {
        statusRows = [];
    }

    const byIp = pickPortMatchingPublicIp(statusRows, targetIp, exclude);
    if (byIp) {
        return byIp;
    }

    const fromList = pickPortFromPortStatusRows(statusRows, exclude);
    if (fromList) {
        return fromList;
    }

    const tryPortFreeCandidates = async () => {
        const candidates = [];
        for (let p = 60000; p <= 60255; p += 1) {
            if (!exclude.has(p)) {
                candidates.push(p);
            }
        }
        const chunkSize = 8;
        for (let i = 0; i < candidates.length; i += chunkSize) {
            const chunk = candidates.slice(i, i + chunkSize);
            if (chunk.length === 0) {
                break;
            }
            const csv = chunk.join(",");
            try {
                await axios.get(`${NINE_PROXY_API}/api/port_free`, {
                    params: { ports: csv, t: 2 },
                    timeout: 12000,
                    validateStatus: (s) => s >= 200 && s < 500
                });
            } catch {
                // ignore
            }
            try {
                const stats = await portCheckPortsCsv(csv);
                for (let j = 0; j < stats.length; j += 1) {
                    const st = stats[j];
                    const port = Number(st?.port);
                    if (!Number.isFinite(port) || exclude.has(port)) {
                        continue;
                    }
                    if (st.online === true) {
                        return { port, via: "port_check_small_batch" };
                    }
                }
            } catch {
                // ignore
            }
        }
        for (let k = 0; k < candidates.length; k += 1) {
            const p = candidates[k];
            try {
                const stats = await portCheckPortsCsv(String(p));
                for (let j = 0; j < stats.length; j += 1) {
                    const st = stats[j];
                    const port = Number(st?.port);
                    if (!Number.isFinite(port) || exclude.has(port)) {
                        continue;
                    }
                    if (st.online === true) {
                        return { port, via: "port_check_single" };
                    }
                }
            } catch {
                // ignore
            }
        }
        return null;
    };

    try {
        const b = await tryPortFreeCandidates();
        if (b) {
            return b;
        }
    } catch {
        // ignore
    }

    try {
        await axios.get(`${NINE_PROXY_API}/api/set_port_range`, {
            params: { start_port: "60000", port_num: "120", t: 2 },
            timeout: 15000,
            validateStatus: (s) => s >= 200 && s < 500
        });
    } catch {
        // ignore
    }

    try {
        statusRows = await fetchNinePortStatusRows();
    } catch {
        statusRows = [];
    }
    return pickPortFromPortStatusRows(statusRows, exclude);
}

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
        const wifiMap = getOutboundWifiNameMap();
        const authByTag = collectAuthUsersByOutboundTag(config);
        const outbounds = config?.outbounds;
        const users = [];
        if (!Array.isArray(outbounds)) {
            return { ok: true, users: [] };
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
                const tag = ob.tag;
                const wn = wifiMap[tag];
                const authList = authByTag[tag] || [];
                users.push({
                    outbound: tag,
                    auth_user: authList,
                    socks_address: `${ob.server}:${ob.server_port}`,
                    wifi_name: typeof wn === "string" && wn.trim() !== "" ? wn.trim() : ""
                });
            }
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
}

function restartV2Ray() {
    return new Promise((resolve, reject) => {
        exec("systemctl restart v2ray", (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
}

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

app.get("/api/proxy-list", async (req, res) => {
    try {
        const bindingMap = getSocksBindingToUserMap();
        const result = await getProxy();
        if (Array.isArray(result?.data)) {
            const enrichedData = attachBoundUserToProxyList(
                await enrichProxyState(result.data),
                bindingMap
            );
            return res.json({
                ...result,
                data: enrichedData
            });
        }
        if (Array.isArray(result?.proxy?.data)) {
            const enrichedData = attachBoundUserToProxyList(
                await enrichProxyState(result.proxy.data),
                bindingMap
            );
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

app.get("/api/switch-proxy", async (req, res) => {
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
            msg: "缺少出站 tag（请选择要写入 config 的 SOCKS 用户）"
        });
    }

    let targetIp = req.query.ip != null ? String(req.query.ip).trim() : "";

    try {
        if (!fs.existsSync(CONFIG_PATH)) {
            return res.status(500).json({
                success: false,
                msg: "配置文件不存在: " + CONFIG_PATH
            });
        }
        const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
        const socksTags = new Set();
        if (Array.isArray(config.outbounds)) {
            for (let i = 0; i < config.outbounds.length; i += 1) {
                const ob = config.outbounds[i];
                if (ob && ob.type === "socks" && typeof ob.tag === "string") {
                    socksTags.add(ob.tag);
                }
            }
        }
        if (!socksTags.has(tag)) {
            return res.status(400).json({
                success: false,
                msg: "无效的出站 tag，配置中无对应 SOCKS 出站"
            });
        }

        if (!targetIp) {
            const row = await getTodayProxyById(id);
            targetIp = String(row?.ip || "").trim();
        }
        if (!targetIp) {
            return res.status(400).json({
                success: false,
                msg: "无法解析代理公网 IP，请从列表切换或附带 ip 参数"
            });
        }

        const otherPorts = getPortsUsedByOtherSocksOutbounds(config, tag);
        const picked = await resolveForwardPortForProxy(targetIp, otherPorts);
        if (!picked) {
            return res.status(502).json({
                success: false,
                msg: "未找到可用本地端口（已尝试 port_status / 小批量 port_check / set_port_range 后重试）",
                error: "no_port"
            });
        }
        const port = picked.port;

        const result = await axios.get(`${NINE_PROXY_API}/api/forward`, {
            params: {
                t: 2,
                port,
                id
            },
            timeout: 30000
        });

        const forwardBody = result.data;
        const forwardOk = forwardBody && forwardBody.error === false;
        if (!forwardOk) {
            return res.status(502).json({
                success: false,
                msg: forwardBody?.message || "9proxy forward 失败",
                data: forwardBody,
                port,
                via: picked.via
            });
        }

        writeSocksOutboundLocalPort(tag, port);

        return res.json({
            success: true,
            msg: "切换成功（已更新 sing-box 配置中的 SOCKS 端口）",
            port,
            tag,
            via: picked.via,
            data: forwardBody
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            msg: "切换失败",
            error: e.message
        });
    }
});

app.get("/api/location-codes", (req, res) => {
    const data = getLocationCodes();
    res.json({
        success: true,
        ...data
    });
});

app.get("/api/singbox-users", (req, res) => {
    const { ok, error, users } = getSingboxRouteUsers();
    res.json({
        success: ok,
        msg: ok ? "ok" : error || "读取失败",
        users
    });
});

app.get("/api/port_status", async (req, res) => {
    try {
        const r = await axios.get(`${NINE_PROXY_API}/api/port_status`, {
            params: { t: 2 },
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

        const result = await axios.get(`${NINE_PROXY_API}/api/proxy`, { params });
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

app.get("/", (req, res) => {
    res.send(`<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>代理控制台</title>
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
        <p class="user-hint">用户列表来自 <code>config.json</code> 的 SOCKS 出站；WiFi 名称仅用于界面展示，来自 <code>proxy-user-meta.json</code>。出口 IP、国家、州/省、城市由 <code>/api/port_status</code>（转发 9proxy 8080）与公网 IP 地理信息共同补齐。</p>
        <div class="toolbar">
          <button type="button" id="refreshUsersBtn">刷新用户</button>
          <span class="status" id="userStatusText">加载中...</span>
        </div>
        <table class="user-table">
          <thead>
            <tr>
              <th style="width:120px;">用户 ID</th>
              <th style="width:130px;">出口 IP</th>
              <th style="width:100px;">IP 国家</th>
              <th style="width:120px;">IP 州/省</th>
              <th style="width:120px;">城市</th>
              <th style="width:72px;">在线</th>
              <th style="width:110px;">WiFi 名称</th>
            </tr>
          </thead>
          <tbody id="userBody"></tbody>
        </table>
      </section>
      <section id="panelProxies" class="panel">
        <h1>代理列表</h1>
        <div class="toolbar">
          <button id="openAddModalBtn" class="add-btn">新增代理</button>
          <button id="refreshBtn">刷新列表</button>
          <span class="status" id="statusText">加载中...</span>
        </div>
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
        <dialog id="switchProxyDialog">
          <div class="modal-inner">
            <h3 style="margin-top:0;">切换代理</h3>
            <p class="status" id="switchProxyMeta" style="margin:0 0 10px;font-size:13px;color:#374151;"></p>
            <div class="modal-row">
              <label for="switchUserSelect">绑定到 sing-box SOCKS 出站（将写入 config 端口）</label>
              <select id="switchUserSelect"></select>
            </div>
            <div class="status" id="switchStatusText"></div>
            <div class="modal-actions">
              <button type="button" id="cancelSwitchBtn" class="cancel-btn">取消</button>
              <button type="button" id="confirmSwitchBtn" class="switch-btn">确认切换</button>
            </div>
          </div>
        </dialog>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>城市</th>
              <th>IP</th>
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
    const endpoint = "/api/proxy-list";
    let statesByCountry = {};
    let allProxyList = [];
    let pendingSwitchProxyId = "";

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

    function setSwitchStatus(text) {
      switchStatusText.textContent = text;
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
        userBody.innerHTML = '<tr><td colspan="7">未读取到 SOCKS 出站用户</td></tr>';
        return;
      }
      userBody.innerHTML = users.map((row) => {
        const ps = matchPortRow(portRows, row.socks_address);
        const pub = ps && ps.public_ip != null ? escapeHtml(String(ps.public_ip)) : "";
        const cc = ps && ps.ip_country ? String(ps.ip_country) : "";
        const reg = ps && ps.ip_region ? escapeHtml(String(ps.ip_region)) : "";
        const city = ps && ps.ip_city != null ? escapeHtml(String(ps.ip_city)) : "";
        let onlineCell = "-";
        if (ps && typeof ps.online === "boolean") {
          onlineCell = ps.online
            ? '<span class="online">在线</span>'
            : '<span class="offline">离线</span>';
        }
        const bindHint = row.socks_address
          ? '<div class="muted-cell">' + escapeHtml(row.socks_address) + "</div>"
          : "";
        const wifiCell =
          row.wifi_name && String(row.wifi_name).trim() !== ""
            ? "<strong>" + escapeHtml(String(row.wifi_name).trim()) + "</strong>"
            : '<span class="muted-cell">-</span>';
        return (
          "<tr>" +
          "<td><strong>" + escapeHtml(row.outbound || "-") + "</strong>" + bindHint + "</td>" +
          "<td>" + (pub || '<span class="muted-cell">-</span>') + "</td>" +
          "<td>" + (cc ? countryFlag(cc) + " " + escapeHtml(cc) : '<span class="muted-cell">-</span>') + "</td>" +
          "<td>" + (reg || '<span class="muted-cell">-</span>') + "</td>" +
          "<td>" + (city || '<span class="muted-cell">-</span>') + "</td>" +
          "<td>" + onlineCell + "</td>" +
          "<td>" + wifiCell + "</td>" +
          "</tr>"
        );
      }).join("");
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
        let msg = "共 " + users.length + " 个 SOCKS 出站；port_status " + portRows.length + " 条";
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
        const bindingStr = item.binding != null ? String(item.binding).trim() : "";
        const hasBinding = bindingStr !== "";
        const useStatusText = hasBinding ? "正在使用" : "-";
        const useStatusClass = hasBinding ? "using" : "";
        const rowClass = hasBinding ? "row-using" : "";
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
            <td>\${item.bound_user || "-"}</td>
            <td>\${boundWifiCell}</td>
            <td class="\${useStatusClass}">\${useStatusText}</td>
            <td>
              <button
                type="button"
                class="switch-btn"
                onclick="openSwitchModal('\${item.id || ""}')"
              >
                切换
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
          const wifiPrefix =
            u.wifi_name && String(u.wifi_name).trim() !== ""
              ? escapeHtml(String(u.wifi_name).trim()) + " · "
              : "";
          const label =
            wifiPrefix +
            tag +
            "（" +
            addr +
            "）";
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
          : '<option value="">无可用用户（请检查 sing-box SOCKS 出站）</option>';

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
        setStatus("打开切换窗口失败: " + err.message);
      }
    }

    async function confirmSwitchProxy() {
      const opt = switchUserSelect.selectedOptions[0];
      if (!opt || !opt.value) {
        setSwitchStatus("请选择要绑定的用户");
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
      if (selfRow && selfRow.binding && String(selfRow.binding).trim() !== "") {
        hints.push(
          "当前代理已有绑定（" +
            selfRow.binding +
            "），将改绑到出站 " +
            tag +
            "（端口由系统自动选择并写入 config）。"
        );
      }
      if (hints.length > 0) {
        hints.push("确定要继续切换吗？");
        if (!window.confirm(hints.join("\\n\\n"))) {
          return;
        }
      }

      try {
        setSwitchStatus("正在切换...");
        const ipQ =
          selfRow && selfRow.ip != null && String(selfRow.ip).trim() !== ""
            ? "&ip=" + encodeURIComponent(String(selfRow.ip).trim())
            : "";
        const resp = await fetch(
          "/api/switch-proxy?id=" +
            encodeURIComponent(pendingSwitchProxyId) +
            "&tag=" +
            encodeURIComponent(tag) +
            ipQ
        );
        const data = await resp.json();
        const forwardOk = data?.data?.error === false;
        if (!resp.ok || data.success === false || !forwardOk) {
          throw new Error(data.msg || data.error || "切换失败");
        }
        const detailMsg =
          (data?.data?.message ? "（" + data.data.message + "）" : "") +
          (data.port != null ? " 本地端口 " + data.port : "") +
          (data.via ? " · " + data.via : "");
        setStatus("切换成功" + detailMsg);
        switchProxyDialog.close();
        await loadProxyList();
      } catch (err) {
        setSwitchStatus("切换失败: " + err.message);
      }
    }

    async function loadProxyList() {
      try {
        setStatus("正在加载...");
        const resp = await fetch(endpoint);
        if (!resp.ok) {
          throw new Error("请求失败，HTTP " + resp.status);
        }
        const data = await resp.json();
        const list = Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data?.proxy?.data)
            ? data.proxy.data
            : [];
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
    loadLocationCodes();
    loadSingboxUsers();
    loadProxyList();
  </script>
</body>
</html>`);
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`API running: http://0.0.0.0:${PORT}`);
});
