import { summarizeDish } from "../../../lib/groq.js";
import { getRestaurant } from "../../../lib/menu.js";

// Cache generated summaries in memory so we don't re-hit Groq for the same dish
// on every tap. This resets when the server restarts (fine for a menu). For
// something permanent, write results to a database or Vercel KV instead.
const cache = new Map();

export async function POST(request) {
  try {
    const { slug, dishId } = await request.json();

    const restaurant = getRestaurant(slug);
    if (!restaurant) {
      return Response.json({ error: "Restaurant not found" }, { status: 404 });
    }

    const dish = restaurant.dishes.find((d) => d.id === dishId);
    if (!dish) {
      return Response.json({ error: "Dish not found" }, { status: 404 });
    }

    const key = `${slug}:${dishId}`;
    if (cache.has(key)) {
      return Response.json(cache.get(key));
    }

    const result = await summarizeDish(dish, restaurant.dishes);
    cache.set(key, result);
    return Response.json(result);
  } catch (error) {
    // The UI falls back to the dish's own blurb when this fails, so a 500 here
    // never breaks the menu — it just means "no live AI summary this time".
    return Response.json({ error: error.message }, { status: 500 });
  }
}
