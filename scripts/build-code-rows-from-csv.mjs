#!/usr/bin/env node
/**
 * 从 Downloads 下的 CSV 生成 cityCodes.js / ispCodes.js / stateCodes.js
 * 用法: node scripts/build-code-rows-from-csv.mjs [csv 目录，默认 ~/Downloads]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const csvDir = process.argv[2] || path.join(process.env.HOME || "", "Downloads");

function readText(p) {
  return fs.readFileSync(p, "utf8");
}

function escStr(s) {
  return JSON.stringify(s);
}

/** city: country,city_code,city_name — city_name 可含逗号 */
function parseCityLine(line) {
  const i1 = line.indexOf(",");
  if (i1 === -1) return null;
  const i2 = line.indexOf(",", i1 + 1);
  if (i2 === -1) return null;
  return {
    country_code: line.slice(0, i1).trim().toUpperCase(),
    city_code: line.slice(i1 + 1, i2).trim(),
    city_name: line.slice(i2 + 1).trim(),
  };
}

/** state: country,state_code */
function parseStateLine(line) {
  const i1 = line.indexOf(",");
  if (i1 === -1) return null;
  return {
    country_code: line.slice(0, i1).trim().toUpperCase(),
    state_code: line.slice(i1 + 1).trim(),
  };
}

/** isp 文件第二列常把 isp_code 与 isp_name 粘在一起，isp_name 以 AS数字 开头 */
function parseIspLine(line) {
  const i1 = line.indexOf(",");
  if (i1 === -1) return null;
  const country_code = line.slice(0, i1).trim().toUpperCase();
  const rest = line.slice(i1 + 1);
  const m = rest.match(/^(.+?)(AS\d+.*)$/is);
  if (!m) {
    return { country_code, isp_code: rest.trim(), isp_name: "" };
  }
  return { country_code, isp_code: m[1].trim(), isp_name: m[2].trim() };
}

function emitModule({ constName, exportName, rows, outPath }) {
  const lines = [
    `const ${constName} = [`,
    ...rows.map(
      (o) =>
        `  {\n${Object.entries(o)
          .map(([k, v]) => `    ${k}: ${escStr(v)}`)
          .join(",\n")}\n  },`
    ),
    `];`,
    "",
    `module.exports = { ${exportName} };`,
    "",
  ];
  fs.writeFileSync(outPath, lines.join("\n"), "utf8");
}

function loadCsv(name, parseLine, skipHeader = true) {
  const fp = path.join(csvDir, name);
  if (!fs.existsSync(fp)) {
    throw new Error(`找不到文件: ${fp}`);
  }
  const rows = [];
  const raw = readText(fp).replace(/^\uFEFF/, "");
  const lines = raw.split(/\r?\n/).filter((l) => l.length > 0);
  const start = skipHeader ? 1 : 0;
  for (let i = start; i < lines.length; i++) {
    const row = parseLine(lines[i]);
    if (!row) continue;
    if (!row.country_code) continue;
    if ("state_code" in row && !row.state_code) continue;
    if ("city_code" in row && (!row.city_code || !row.city_name)) continue;
    if ("isp_code" in row && !row.isp_code) continue;
    rows.push(row);
  }
  return rows;
}

const cityRows = loadCsv("city_codes.csv", parseCityLine);
const ispRows = loadCsv("isp_code.csv", parseIspLine);
const stateRows = loadCsv("state_codes.csv", parseStateLine);

emitModule({
  constName: "CITY_CODE_ROWS",
  exportName: "CITY_CODE_ROWS",
  rows: cityRows,
  outPath: path.join(root, "cityCodes.js"),
});

emitModule({
  constName: "ISP_CODE_ROWS",
  exportName: "ISP_CODE_ROWS",
  rows: ispRows,
  outPath: path.join(root, "ispCodes.js"),
});

emitModule({
  constName: "STATE_CODE_ROWS",
  exportName: "STATE_CODE_ROWS",
  rows: stateRows,
  outPath: path.join(root, "stateCodes.js"),
});

console.error(
  `已写入 cityCodes.js (${cityRows.length}), ispCodes.js (${ispRows.length}), stateCodes.js (${stateRows.length})`
);
