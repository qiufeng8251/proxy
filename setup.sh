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
    echo "备份 sing-box 配置..."
    sudo cp "$CONFIG_FILE" "${CONFIG_FILE}.bak"

    echo "按入站 UUID 用户生成 socks-proxy-0..N（127.0.0.1:60000 起）与 auth_user 路由..."

    TMP_JSON="$(mktemp)"
    if ! sudo jq '
def uuid_re: "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$";

def account_key(u):
  if (u.uuid // "") != "" and (u.uuid | test(uuid_re)) then u.uuid
  elif (u.password // "") != "" and (u.password | type == "string") and (u.password | test(uuid_re)) then u.password
  elif (u.Password // "") != "" and (u.Password | type == "string") and (u.Password | test(uuid_re)) then u.Password
  else empty
  end;

def auth_strings(u):
  [.uuid, .password, .Password, .name, .Username]
  | map(select(type == "string" and . != ""));

def should_remove_socks(o):
  (o.type == "socks") and (
    (o.tag == "socks-proxy" and (o.server == "127.0.0.1")) or
    ((o.tag // "") | test("^socks-proxy-[0-9]+$"))
  );

. as $root
| ([ $root.inbounds[] | .users[]? | select(type == "object") ] | map(select(account_key(.) != null))) as $all
| ($all | map(account_key(.)) | unique | sort) as $keys
| (($root.outbounds // []) | map(select(should_remove_socks(.) | not))) as $kept
| (if ($kept | any(.tag == "direct")) then $kept else ([{type:"direct",tag:"direct"}] + $kept) end) as $ob1
| ($keys | to_entries | map({
    type: "socks",
    tag: ("socks-proxy-" + (.key | tostring)),
    server: "127.0.0.1",
    server_port: (60000 + .key)
  })) as $new_socks
| ($keys | to_entries | map(. as $e | {
    auth_user: (
      [ $all[] | select(account_key(.) == $e.value) | auth_strings(.) ] | add // [] | unique
    ),
    outbound: ("socks-proxy-" + ($e.key | tostring))
  })) as $rules
| $root
| .outbounds = ($ob1 + $new_socks)
| .route |= (.rules = $rules | .final = "direct")
' "$CONFIG_FILE" >"$TMP_JSON"; then
        rm -f "$TMP_JSON"
        echo "jq 处理失败，已跳过写入"
    else
        sudo cp "$TMP_JSON" "$CONFIG_FILE"
        rm -f "$TMP_JSON"
        echo "sing-box 配置已更新（用户数: $(sudo jq -r '(.route.rules // []) | length' "$CONFIG_FILE")）"
    fi
else
    echo "未找到 config.json，请确认路径: $CONFIG_FILE"
fi

echo "========== 全部完成 =========="
