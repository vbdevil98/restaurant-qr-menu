// OPTIONAL cost/latency optimization.
//
//     npm run summaries
//
// Calls Groq once per dish and writes the results to data/summaries.json.
// After that, the backend serves those instantly and never calls Groq again
// (until you change the menu and re-run this). Commit summaries.json and
// redeploy for it to take effect in production.

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { loadEnv } from "../lib/loadEnv.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");

loadEnv(join(root, ".env.local"));

const { MENU, RESTAURANT } = await import("../data/menu.js");
const { summarizeDish } = await import("../lib/groq.js");

async function main() {
  if (!process.env.GROQ_API_KEY) {
    console.error("No GROQ_API_KEY found. Add it to .env.local (see .env.example).");
    process.exit(1);
  }

  const out = {};
  let ok = 0;
  let failed = 0;

  for (const dish of MENU) {
    process.stdout.write(`• ${dish.name} … `);
    try {
      const others = MENU.filter((d) => d.id !== dish.id).map((d) => d.name);
      out[dish.id] = await summarizeDish(dish, others, RESTAURANT.name);
      ok++;
      console.log("done");
    } catch (err) {
      failed++;
      console.log("skipped (" + err.message + ")");
    }
  }

  writeFileSync(join(root, "data", "summaries.json"), JSON.stringify(out, null, 2) + "\n");
  console.log(`\nWrote ${ok} summaries to data/summaries.json` + (failed ? ` (${failed} skipped)` : ""));
}

main();
