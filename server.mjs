import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { buildApprovalRecord } from "./core.mjs";

const indexFile = fileURLToPath(new URL("./public/index.html", import.meta.url));
const sendJson = (res, status, body) => { res.writeHead(status, { "content-type": "application/json; charset=utf-8" }); res.end(JSON.stringify(body, null, 2)); };
const readJson = (req) => new Promise((resolve, reject) => { let body = ""; req.on("data", (chunk) => { body += chunk; }); req.on("end", () => { try { resolve(JSON.parse(body || "{}")); } catch { reject(new Error("Request body must be valid JSON.")); } }); req.on("error", reject); });

createServer(async (req, res) => {
  if (req.method === "OPTIONS") { res.writeHead(204, { "access-control-allow-methods": "GET,POST,OPTIONS", "access-control-allow-headers": "content-type" }); return res.end(); }
  if (req.method === "GET" && req.url === "/") { res.writeHead(200, { "content-type": "text/html; charset=utf-8" }); return res.end(await readFile(indexFile)); }
  if (req.method === "GET" && req.url === "/health") return sendJson(res, 200, { status: "ok", starter: "approval-boundary" });
  if (req.method === "POST" && req.url === "/api/proposal") { try { return sendJson(res, 200, buildApprovalRecord(await readJson(req))); } catch (error) { return sendJson(res, 400, { error: error.message }); } }
  return sendJson(res, 404, { error: "Not found" });
}).listen(process.env.PORT || 3000, () => console.log("Approval-boundary starter listening on http://localhost:3000"));
