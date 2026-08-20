import { readFile } from "node:fs/promises";
import { buildApprovalRecord } from "../core.mjs";

const input = JSON.parse(await readFile(new URL("../examples/proposal.json", import.meta.url)));
console.log(JSON.stringify(buildApprovalRecord(input), null, 2));
