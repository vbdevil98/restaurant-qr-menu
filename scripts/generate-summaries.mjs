// Pre-generates an AI summary for every dish and writes them to
// data/summaries.json. Run this once (and again whenever you change the menu):
//
//     npm run summaries
//
// Baking summaries ahead of time means the menu loads them instantly and costs
// nothing while guests browse — you only pay Groq once, here, not per scan.

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { loadEnv } from "../lib/loadEnv.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

loadEnv(join(root, ".env.local"));

const { restaurants } = await import("../data/restaurants.js");
const { summarizeDish } = await import("../lib/groq.js");

async function main() {
  if (!process.env.GROQ_API_KEY) {
    console.error(
      "No GROQ_API_KEY found. Add it to .env.local (see .env.example) and try again."
    );
    process.exit(1);
  }

  const out = {};
  let ok = 0;
  let failed = 0;

  for (const slug of Object.keys(restaurants)) {
    const restaurant = restaurants[slug];
    for (const dish of restaurant.dishes) {
      process.stdout.write(`• ${restaurant.name} → ${dish.name} … `);
      try {
        out[`${slug}:${dish.id}`] = await summarizeDish(dish, restaurant.dishes);
        ok++;
        console.log("done");
      } catch (error) {
        failed++;
        console.log("skipped (" + error.message + ")");
      }
    }
  }

  writeFileSync(join(root, "data", "summaries.json"), JSON.stringify(out, null, 2) + "\n");
  console.log(`\nWrote ${ok} summaries to data/summaries.json` + (failed ? ` (${failed} skipped)` : ""));
}

main();
