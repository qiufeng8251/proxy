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

echo "========== Step 1: 9proxy（默认安装）=========="

INSTALL_NINEPROXY=1
read -r -p "是否安装并配置 9proxy（下载 deb、监听 8080 API；无需账号登录）？[Y/n] " _nine_ans
case "${_nine_ans//$'\r'/}" in
    [nN]|[nN][oO]) INSTALL_NINEPROXY=0 ;;
    *) INSTALL_NINEPROXY=1 ;;
esac

if [ "$INSTALL_NINEPROXY" -eq 1 ]; then
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

    echo "启用 9proxy 服务（systemctl enable 9proxyd.service）..."
    sudo systemctl enable 9proxyd.service || die "systemctl enable 9proxyd.service 失败（开机自启）"
    echo "启动 9proxy 服务（systemctl start 9proxyd.service）..."
    sudo systemctl start 9proxyd.service || die "systemctl start 9proxyd.service 失败（当前启动）"

    if ! systemctl is-active --quiet 9proxyd.service; then
        echo "systemctl status 9proxyd.service:" >&2
        systemctl status 9proxyd.service --no-pager -l >&2 || true
        die "9proxyd 未处于 active 状态；请查看: sudo journalctl -u 9proxyd.service -n 80 --no-pager"
    fi
    # 守护进程偶发稍晚就绪，避免紧接着 CLI 仍报 daemon not running
    sleep 1

    echo "跳过 9proxy 账号登录（按需可手动执行: 9proxy auth -u USER -p PASS）。"

    echo "设置 9proxy 端口数量为 50..."
    if SETTING_OUT="$(9proxy setting -l 50 2>&1)"; then
        :
    else
        echo "$SETTING_OUT" >&2
        if echo "$SETTING_OUT" | grep -qi 'daemon not running'; then
            die "9proxy 守护进程未就绪（setting 失败）。请执行: sudo systemctl status 9proxyd.service；sudo journalctl -u 9proxyd.service -n 80 --no-pager"
        fi
        die "9proxy 设置端口数量失败（命令: 9proxy setting -l 50）"
    fi

    echo "检查 API 状态..."
    API_STATUS_OUTPUT="$(9proxy api -d 2>&1 || true)"
    echo "$API_STATUS_OUTPUT"

    if echo "$API_STATUS_OUTPUT" | grep -qi 'daemon not running'; then
        die "9proxy 守护进程未运行，无法解析 API。请先确认: sudo systemctl start 9proxyd.service；查看日志: sudo journalctl -u 9proxyd.service -n 80 --no-pager。若 sudo 提示 unable to resolve host，请在 /etc/hosts 增加: 127.0.0.1 $(hostname -f 2>/dev/null || hostname)"
    fi

    API_STATUS="$(echo "$API_STATUS_OUTPUT" | awk -F: '/API Status/{print $2}' | xargs | tr '[:upper:]' '[:lower:]')"
    API_PORT="$(echo "$API_STATUS_OUTPUT" | awk -F: '/API Port/{print $2}' | xargs)"

    if [ -z "$API_STATUS" ] || [ -z "$API_PORT" ]; then
        die "无法从 9proxy api -d 输出中解析 API Status/API Port（请先确认 9proxyd 已运行且 CLI 输出含上述字段）"
    fi

    if [ "$API_PORT" != "8080" ]; then
        echo "API 端口为 $API_PORT，按要求改为 8080 并启动 API..."
        9proxy api -p 8080 || die "9proxy 设置 API 端口失败"
        9proxy api -s || die "9proxy 启动 API 失败"
    elif [[ "$API_STATUS" == "stopped" || "$API_STATUS" == "stop" ]]; then
        echo "API 端口为 8080 且状态为停止，启动 API..."
        9proxy api -s || die "9proxy 启动 API 失败"
    else
        echo "不满足启动条件（端口=$API_PORT, 状态=$API_STATUS），跳过 API 处理"
    fi

    echo "========== Step 1（9proxy）完成 =========="
else
    echo "已跳过 9proxy：仍可安装本脚本其余部分；sing-box 用户出站将默认为直连（见 Step 7）。"
    echo "========== Step 1 跳过 =========="
fi


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
    git clone https://github.com/qiufeng8251/proxy.git || die "git clone 项目失败"
fi

cd "$PROJECT_DIR" || die "无法进入目录: $PROJECT_DIR"

echo "========== Step 5: 安装依赖 =========="

npm install || die "npm install 失败"

echo "========== Step 6: 启动项目（PM2 ecosystem）=========="

ECOSYSTEM_FILE="ecosystem.config.cjs"
[ -f "$ECOSYSTEM_FILE" ] || die "未找到 $ECOSYSTEM_FILE（请与 server.js 同目录提交到仓库）"

if pm2 describe proxy-server >/dev/null 2>&1; then
    echo "proxy-server 已在 PM2 中，按 $ECOSYSTEM_FILE 重启..."
    pm2 restart "$ECOSYSTEM_FILE" || die "pm2 restart $ECOSYSTEM_FILE 失败"
else
    pm2 start "$ECOSYSTEM_FILE" || die "pm2 start $ECOSYSTEM_FILE 失败"
fi
pm2 save || die "pm2 save 失败"
pm2 startup systemd -u "$USER" --hp "$HOME" || die "pm2 startup 配置失败（若已配置过 systemd，请检查 pm2 文档后重试）"

echo "========== Step 7: 修改 sing-box 配置 =========="

CONFIG_FILE="/etc/v2ray-agent/sing-box/conf/config.json"

[ -f "$CONFIG_FILE" ] || die "未找到 sing-box 配置: $CONFIG_FILE"

echo "备份 sing-box 配置..."
sudo cp "$CONFIG_FILE" "${CONFIG_FILE}.bak" || die "备份 sing-box 配置失败"

echo "按入站 UUID 用户生成出站：tag=用户ID（UUID 首段 8 位），类型默认为 direct（直连）；并写入 auth_user 路由..."

read -r -p "WiFi 名称前缀（写入 conf/proxy-user-meta.json，供控制台显示，如 OB → OB-1、OB-2…；留空则清空映射）: " WIFI_NAME_PREFIX
WIFI_NAME_PREFIX="${WIFI_NAME_PREFIX//$'\r'/}"

CONFIG_DIR="$(dirname "$CONFIG_FILE")"
META_FILE="${CONFIG_DIR}/proxy-user-meta.json"

TMP_JSON="$(mktemp)"
TMP_META="$(mktemp)"
trap 'rm -f "$TMP_JSON" "$TMP_META"' EXIT

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

def should_remove_socks(o; r):
  (o | type == "object") and (o.type == "socks") and (
    (o.tag == "socks-proxy" and (o.server == "127.0.0.1")) or
    ((o.tag // "") | test("^socks-proxy-[0-9]+$")) or
    (
      (o.server == "127.0.0.1") and (
        ((o.tag // "") | ascii_downcase) as $needle
        | r
        | index($needle)
      ) != null
    )
  );

. as $root
| ([ $root.inbounds[]? | select(type == "object") | .users[]? | select(type == "object") ]
    | map(select(account_key(.) != null))) as $all
| ($all | map(account_key(.)) | unique | sort) as $keys
| ($keys | map(split("-")[0] | ascii_downcase) | unique) as $rid_tags
| (($root.outbounds // [])
    | [
        .[]
        | if (type == "object") and should_remove_socks(.; $rid_tags) then empty else . end
      ]) as $kept_after_socks_rm
| ($kept_after_socks_rm
    | [
        .[]
        | if (type != "object") then .
          elif (((.tag // "") | ascii_downcase) as $tg | ($rid_tags | index($tg)) != null) then empty
          else .
          end
      ]) as $kept
| (if any($kept[]; type == "object" and .tag == "direct")
   then $kept
   else ([{type:"direct",tag:"direct"}] + $kept)
   end) as $ob1
| ($keys | to_entries | map(. as $e | {
    type: "direct",
    tag: ($e.value | split("-")[0] | ascii_downcase)
  })) as $new_user_outbounds
| ($keys | to_entries | map(. as $e | {
    auth_user: (
      [ $all[] | select(account_key(.) == $e.value) | auth_strings(.) ] | add // [] | unique
    ),
    outbound: ($e.value | split("-")[0] | ascii_downcase)
  })) as $rules
| $root
| .outbounds = ($ob1 + $new_user_outbounds)
| .route |= (.rules = $rules | .final = "direct")
' "$CONFIG_FILE" >"$TMP_JSON" || die "jq 处理 sing-box 配置失败"

jq empty "$TMP_JSON" || die "生成的 sing-box JSON 无效"

sudo cp "$TMP_JSON" "$CONFIG_FILE" || die "写入 $CONFIG_FILE 失败"

sudo jq empty "$CONFIG_FILE" || die "写入后的 sing-box 配置 JSON 无效"

RULES_JSON="$(sudo jq -c '.route.rules // []' "$CONFIG_FILE")" || die "读取 route.rules 失败"

jq -n \
  --arg prefix "$WIFI_NAME_PREFIX" \
  --argjson rules "$RULES_JSON" \
  '
  if ($prefix | length) == 0 then {wifi_by_outbound: {}}
  else
    [ $rules[] | select(type == "object" and (.outbound | type) == "string" and .outbound != "") ]
    | to_entries
    | map({key: .value.outbound, value: "\($prefix)-\(.key + 1)"})
    | from_entries
    | {wifi_by_outbound: .}
  end
  ' >"$TMP_META" || die "生成 proxy-user-meta.json 失败"

jq empty "$TMP_META" || die "proxy-user-meta.json 内容无效"

sudo cp "$TMP_META" "$META_FILE" || die "写入 $META_FILE 失败"

USER_RULES="$(sudo jq -r '(.route.rules // []) | length' "$CONFIG_FILE")"
echo "sing-box 配置已更新（路由用户数: $USER_RULES）；WiFi 显示映射: $META_FILE"

echo "重启 sing-box..."
sudo systemctl restart sing-box || die "systemctl restart sing-box 失败"

echo "========== 全部完成 =========="
