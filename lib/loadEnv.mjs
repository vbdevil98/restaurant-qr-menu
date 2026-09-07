// The Node scripts (generate-summaries, generate-qr) run outside Next.js, so
// they don't automatically read .env.local. This loads it if present.
import { readFileSync, existsSync } from "node:fs";

export function loadEnv(path = ".env.local") {
  if (!existsSync(path)) return;
  const text = readFileSync(path, "utf8");
  for (const line of text.split("\n")) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
    if (!match) continue;
    const key = match[1];
    const value = match[2].replace(/^["']|["']$/g, "");
    if (!(key in process.env)) process.env[key] = value;
  }
}
