const express = require("express");
const axios = require("axios");
const fs = require("fs");
const { exec } = require("child_process");
const { SocksProxyAgent } = require("socks-proxy-agent");
const { STATE_CODE_ROWS } = require("./stateCodes");

const app = express();
const PORT = 3000;
const CONFIG_PATH = "/etc/v2ray-agent/sing-box/conf/config.json";
const ACTIVE_BINDING = "127.0.0.1:60000";
const IPINFO_CACHE = new Map();

async function getProxy() {
    const res = await axios.get("http://127.0.0.1:8080/api/today_list?t=2&limit=200");
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

async function getStateByIp(ip) {
    if (!ip) return "";
    if (IPINFO_CACHE.has(ip)) {
        return IPINFO_CACHE.get(ip);
    }

    try {
        const res = await axios.get(`https://ipinfo.io/${ip}/json`, {
            timeout: 5000
        });
        const state = (res.data?.region || "").trim();
        IPINFO_CACHE.set(ip, state);
        return state;
    } catch {
        IPINFO_CACHE.set(ip, "");
        return "";
    }
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
        const result = await getProxy();
        if (Array.isArray(result?.data)) {
            const enrichedData = await enrichProxyState(result.data);
            return res.json({
                ...result,
                data: enrichedData
            });
        }
        if (Array.isArray(result?.proxy?.data)) {
            const enrichedData = await enrichProxyState(result.proxy.data);
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
    if (!id) {
        return res.status(400).json({
            success: false,
            msg: "缺少代理 id"
        });
    }

    try {
        const result = await axios.get("http://127.0.0.1:8080/api/forward", {
            params: {
                t: 2,
                port: 60000,
                id
            }
        });

        res.json({
            success: true,
            msg: "切换成功",
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

app.get("/api/location-codes", (req, res) => {
    const data = getLocationCodes();
    res.json({
        success: true,
        ...data
    });
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

        const result = await axios.get("http://127.0.0.1:8080/api/proxy", { params });
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
  <title>代理列表</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 24px;
      color: #1f2937;
      background: #f9fafb;
    }
    h1 {
      margin: 0 0 16px;
      font-size: 24px;
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
        <th>当前使用</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody id="proxyBody"></tbody>
  </table>

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
    const endpoint = "/api/proxy-list";
    const activeBinding = "${ACTIVE_BINDING}";
    let statesByCountry = {};
    let allProxyList = [];

    function setStatus(text) {
      statusText.textContent = text;
    }

    function setAddStatus(text) {
      addStatusText.textContent = text;
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
        proxyBody.innerHTML = '<tr><td colspan="9">暂无数据</td></tr>';
        return;
      }

      proxyBody.innerHTML = list.map((item) => {
        const onlineText = item.is_online ? "在线" : "离线";
        const onlineClass = item.is_online ? "online" : "offline";
        const isUsing = item.binding === activeBinding;
        const usingText = isUsing ? "正在使用" : "-";
        const usingClass = isUsing ? "using" : "";
        const rowClass = isUsing ? "row-using" : "";
        return \`
          <tr class="\${rowClass}">
            <td>\${item.id || "-"}</td>
            <td>\${item.city || "-"}</td>
            <td>\${item.ip || "-"}</td>
            <td>\${countryFlag(item.country_code)} \${item.country_code || "-"}</td>
            <td>\${item.state || "-"}</td>
            <td class="\${onlineClass}">\${onlineText}</td>
            <td>\${item.binding || "-"}</td>
            <td class="\${usingClass}">\${usingText}</td>
            <td>
              <button
                class="switch-btn"
                onclick="switchProxy('\${item.id || ""}')"
                \${isUsing ? "disabled" : ""}
              >
                \${isUsing ? "当前代理" : "切换到此代理"}
              </button>
            </td>
          </tr>
        \`;
      }).join("");
    }

    async function switchProxy(id) {
      if (!id) {
        setStatus("切换失败: 缺少代理 ID");
        return;
      }

      try {
        setStatus("正在切换...");
        const resp = await fetch("/api/switch-proxy?id=" + encodeURIComponent(id));
        const data = await resp.json();
        const forwardOk = data?.data?.error === false;
        if (!resp.ok || data.success === false || !forwardOk) {
          throw new Error(data.msg || data.error || "切换失败");
        }
        const detailMsg = data?.data?.message ? "（" + data.data.message + "）" : "";
        setStatus("切换成功" + detailMsg + "，正在刷新列表...");
        await loadProxyList();
      } catch (err) {
        setStatus("切换失败: " + err.message);
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
    refreshBtn.addEventListener("click", loadProxyList);
    filterCountrySelect.addEventListener("change", applyFilters);
    filterStateSelect.addEventListener("change", applyFilters);
    addProxyBtn.addEventListener("click", addProxy);
    loadLocationCodes();
    loadProxyList();
  </script>
</body>
</html>`);
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`API running: http://0.0.0.0:${PORT}`);
});
