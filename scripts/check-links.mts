// Verifies every URL in lib/references.ts responds. Run: npm run check-links
// Uses curl because some .gov.in servers fail Node's TLS handshake.
import { execFileSync } from "node:child_process";
import { REFERENCES } from "../lib/references.ts";

let bad = 0;
for (const r of Object.values(REFERENCES)) {
  let code = "000";
  try {
    code = execFileSync("curl", ["-sL", "-o", "/dev/null", "-m", "30", "-w", "%{http_code}", r.url]).toString();
  } catch {}
  const ok = code.startsWith("2");
  console.log(ok ? "OK  " : "FAIL", code, r.url);
  if (!ok) bad++;
}
process.exit(bad ? 1 : 0);
