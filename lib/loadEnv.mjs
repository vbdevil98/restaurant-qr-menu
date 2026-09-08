// Loads KEY=VALUE lines from a .env.local file into process.env.
// The Next.js app reads .env.local automatically; standalone scripts don't,
// so the `npm run summaries` script uses this.

import { readFileSync } from "node:fs";

export function loadEnv(path = ".env.local") {
  let text;
  try {
    text = readFileSync(path, "utf8");
  } catch {
    return; // no file — that's fine, env may already be set
  }
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}
