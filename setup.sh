#!/bin/bash

set -euo pipefail

die() {
    echo "错误: $*" >&2
    exit 1
}

have_cmd() {
    command -v "$1" >/dev/null 2>&1
}

echo "========== Step 0: 安装基础依赖 =========="

NEED_BASE=0
for c in wget curl git jq; do
    have_cmd "$c" || NEED_BASE=1
done

if [ "$NEED_BASE" -eq 0 ]; then
    echo "基础依赖已存在 (wget curl git jq)，跳过 apt 安装"
else
    sudo apt update || die "apt update 失败"
    sudo apt install -y wget curl git jq || die "安装基础依赖失败"
fi

echo "========== Step 1: 安装 9proxy =========="

DEB_FILE="9proxy-linux-debian-amd64.deb"
DOWNLOAD_URL="https://static.9proxy-cdn.net/download/latest/linux/9proxy-linux-debian-amd64.deb"

if have_cmd 9proxy; then
    echo "9proxy 已安装，跳过 deb 下载与 apt 安装"
else
    if [ -f "$DEB_FILE" ]; then
        echo "文件已存在，跳过下载: $DEB_FILE"
    else
        echo "开始下载 9proxy..."
        wget "$DOWNLOAD_URL" -O "$DEB_FILE" || die "下载 9proxy deb 失败"
        [ -s "$DEB_FILE" ] || die "下载的 deb 文件为空: $DEB_FILE"
    fi

    echo "安装 9proxy..."
    sudo apt install -y ./"$DEB_FILE" || die "安装 9proxy deb 失败"
fi

echo "启动 9proxy 服务..."
sudo systemctl start 9proxyd.service || die "启动 9proxyd.service 失败"

echo "请手动输入 9proxy 账号密码进行登录："
read -p "Username: " USERNAME
read -s -p "Password: " PASSWORD
echo

9proxy auth -u "$USERNAME" -p "$PASSWORD" || die "9proxy 登录失败"

echo "配置 9proxy API 端口 8080..."
9proxy api -p 8080 || die "9proxy 设置 API 端口失败"

echo "检查 API 状态..."
9proxy api -d || die "9proxy API 状态检查失败"

echo "启动 9proxy API..."
9proxy api -s || die "9proxy 启动 API 失败"

echo "========== Step 1 完成 =========="


echo "========== Step 2: 安装 Node.js 20 =========="

if have_cmd node; then
    NODE_MAJOR="$(node -p "parseInt(process.versions.node, 10)" 2>/dev/null || echo 0)"
    if [ "${NODE_MAJOR:-0}" -ge 20 ]; then
        echo "Node.js 已安装 $(node -v)，主版本 >= 20，跳过 NodeSource 安装"
    else
        echo "当前 Node 主版本为 ${NODE_MAJOR}，安装 Node.js 20..."
        curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - || die "NodeSource 安装脚本执行失败"
        sudo apt install -y nodejs || die "安装 nodejs 失败"
    fi
else
    echo "未检测到 node，安装 Node.js 20..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - || die "NodeSource 安装脚本执行失败"
    sudo apt install -y nodejs || die "安装 nodejs 失败"
fi

echo "Node 版本："
node -v || die "node 不可用"

echo "========== Step 3: 安装 PM2 =========="

if have_cmd pm2; then
    echo "PM2 已安装 ($(pm2 -v 2>/dev/null || echo ok))，跳过 npm 全局安装"
else
    sudo npm install -g pm2 || die "安装 PM2 失败"
fi

echo "========== Step 4: 下载项目 =========="

PROJECT_DIR="proxy"

if [ -d "$PROJECT_DIR" ]; then
    echo "项目目录已存在，跳过 clone"
else
    git clone https://gitee.com/qiufeng1/proxy.git || die "git clone 项目失败"
fi

cd "$PROJECT_DIR" || die "无法进入目录: $PROJECT_DIR"

echo "========== Step 5: 安装依赖 =========="

npm install || die "npm install 失败"

echo "========== Step 6: 启动项目 =========="

if pm2 describe proxy-server >/dev/null 2>&1; then
    echo "proxy-server 已在 PM2 中，执行重启..."
    pm2 restart proxy-server || die "pm2 restart proxy-server 失败"
else
    pm2 start server.js --name proxy-server || die "pm2 start proxy-server 失败"
fi
pm2 save || die "pm2 save 失败"
pm2 startup systemd -u "$USER" --hp "$HOME" || die "pm2 startup 配置失败（若已配置过 systemd，请检查 pm2 文档后重试）"

echo "========== Step 7: 修改 sing-box 配置 =========="

CONFIG_FILE="/etc/v2ray-agent/sing-box/conf/config.json"

[ -f "$CONFIG_FILE" ] || die "未找到 sing-box 配置: $CONFIG_FILE"

echo "备份 sing-box 配置..."
sudo cp "$CONFIG_FILE" "${CONFIG_FILE}.bak" || die "备份 sing-box 配置失败"

echo "按入站 UUID 用户生成 socks-proxy-0..N（127.0.0.1:60000 起）与 auth_user 路由..."

TMP_JSON="$(mktemp)"
trap 'rm -f "$TMP_JSON"' EXIT

sudo jq '
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
' "$CONFIG_FILE" >"$TMP_JSON" || die "jq 处理 sing-box 配置失败"

jq empty "$TMP_JSON" || die "生成的 sing-box JSON 无效"

sudo cp "$TMP_JSON" "$CONFIG_FILE" || die "写入 $CONFIG_FILE 失败"

sudo jq empty "$CONFIG_FILE" || die "写入后的 sing-box 配置 JSON 无效"

USER_RULES="$(sudo jq -r '(.route.rules // []) | length' "$CONFIG_FILE")"
echo "sing-box 配置已更新（路由用户数: $USER_RULES）"

echo "重启 sing-box 相关服务..."
RESTART_OK=0
for svc in sing-box v2ray v2ray-agent; do
    if sudo systemctl cat "${svc}.service" >/dev/null 2>&1; then
        sudo systemctl restart "$svc" || die "systemctl restart ${svc} 失败"
        echo "已重启: ${svc}.service"
        RESTART_OK=1
        break
    fi
done
[ "$RESTART_OK" -eq 1 ] || die "未找到 sing-box / v2ray / v2ray-agent 的 systemd 单元，请手动重启"

echo "========== 全部完成 =========="
