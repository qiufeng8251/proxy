#!/bin/bash

set -e

echo "========== Step 0: 安装基础依赖 =========="

sudo apt update
sudo apt install -y wget curl git jq

echo "jq 已安装完成"

echo "========== Step 1: 安装 9proxy =========="

DEB_FILE="9proxy-linux-debian-amd64.deb"
DOWNLOAD_URL="https://static.9proxy-cdn.net/download/latest/linux/9proxy-linux-debian-amd64.deb"

# 判断是否已存在
if [ -f "$DEB_FILE" ]; then
    echo "文件已存在，跳过下载: $DEB_FILE"
else
    echo "开始下载 9proxy..."
    wget "$DOWNLOAD_URL" -O "$DEB_FILE"
fi

echo "安装 9proxy..."
sudo apt install -y ./"$DEB_FILE"

echo "启动 9proxy 服务..."
sudo systemctl start 9proxyd.service

echo "请手动输入 9proxy 账号密码进行登录："
read -p "Username: " USERNAME
read -s -p "Password: " PASSWORD
echo

9proxy auth -u "$USERNAME" -p "$PASSWORD"

echo "配置 9proxy API 端口 8080..."
9proxy api -p 8080

echo "检查 API 状态..."
9proxy api -d

echo "启动 9proxy API..."
9proxy api -s

echo "========== Step 1 完成 =========="


echo "========== Step 2: 安装 Node.js 20 =========="

curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

echo "Node 版本："
node -v

echo "========== Step 3: 安装 PM2 =========="

sudo npm install -g pm2

echo "========== Step 4: 下载项目 =========="

PROJECT_DIR="proxy"

if [ -d "$PROJECT_DIR" ]; then
    echo "项目目录已存在，跳过 clone"
else
    git clone https://gitee.com/qiufeng1/proxy.git
fi

cd "$PROJECT_DIR"

echo "========== Step 5: 安装依赖 =========="

npm install

echo "========== Step 6: 启动项目 =========="

if pm2 describe proxy-server >/dev/null 2>&1; then
    echo "proxy-server 已在 PM2 中，执行重启..."
    pm2 restart proxy-server
else
    pm2 start server.js --name proxy-server
fi
pm2 save
pm2 startup systemd -u $USER --hp $HOME || true

echo "========== Step 7: 修改 sing-box 配置 =========="

CONFIG_FILE="/etc/v2ray-agent/sing-box/conf/config.json"

if [ -f "$CONFIG_FILE" ]; then
    if sudo jq -e '(.outbounds // []) | any(.tag == "socks-proxy")' "$CONFIG_FILE" >/dev/null 2>&1; then
        echo "已存在 tag 为 socks-proxy 的 outbound，跳过 sing-box 修改"
    else
        echo "备份原配置..."
        sudo cp "$CONFIG_FILE" "${CONFIG_FILE}.bak"

        echo "更新 outbound 配置..."

        sudo bash -c "jq '.outbounds += [
        {
            \"type\": \"socks\",
            \"tag\": \"socks-proxy\",
            \"server\": \"127.0.0.1\",
            \"server_port\": 60000
        }
    ]' $CONFIG_FILE > ${CONFIG_FILE}.tmp && mv ${CONFIG_FILE}.tmp $CONFIG_FILE"

        echo "配置更新完成"
    fi
else
    echo "未找到 config.json，请确认路径: $CONFIG_FILE"
fi

echo "========== 全部完成 =========="
