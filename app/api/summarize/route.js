import { MENU, RESTAURANT } from "../../../data/menu.js";
import { summarizeDish } from "../../../lib/groq.js";
import summaries from "../../../data/summaries.json";

// Simple in-memory cache so we don't call Groq twice for the same dish while
// the server instance is warm. (For zero per-request cost, pre-generate with
// `npm run summaries` — those results are served from the JSON above.)
const memory = new Map();

export async function POST(request) {
  try {
    const { dishId } = await request.json();
    const dish = MENU.find((d) => d.id === dishId);
    if (!dish) {
      return Response.json({ error: "Dish not found" }, { status: 404 });
    }

    // 1) pre-generated (free, instant)
    if (summaries[dishId]) {
      return Response.json(summaries[dishId]);
    }
    // 2) already generated this run
    if (memory.has(dishId)) {
      return Response.json(memory.get(dishId));
    }
    // 3) live Groq call
    const others = MENU.filter((d) => d.id !== dishId).map((d) => d.name);
    const result = await summarizeDish(dish, others, RESTAURANT.name);
    memory.set(dishId, result);
    return Response.json(result);
  } catch (err) {
    // The client falls back to the dish's written blurb on any error,
    // so the menu never looks broken.
    return Response.json({ error: "Summary unavailable" }, { status: 500 });
  }
}
