/**
 * PM2 示例：固定 cwd 与本仓库中的 server.js，并清空可能干扰 axios 访问本机 9proxy 的系统代理变量。
 * 使用：在项目根目录执行 `pm2 start ecosystem.config.cjs` 或 `pm2 reload ecosystem.config.cjs --update-env`
 */
const path = require("path");

module.exports = {
    apps: [
        {
            name: "proxy-server",
            cwd: __dirname,
            script: path.join(__dirname, "server.js"),
            interpreter: "node",
            instances: 1,
            exec_mode: "fork",
            env: {
                HTTP_PROXY: "",
                HTTPS_PROXY: "",
                ALL_PROXY: ""
            }
        }
    ]
};
