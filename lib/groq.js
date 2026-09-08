// Server-only. This module is imported only by the API route (which runs on
// the server), so GROQ_API_KEY is never exposed to the browser.
//
// Groq is OpenAI-compatible, so we hit the chat/completions endpoint and ask
// for a strict JSON object describing the dish.

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function summarizeDish(dish, otherNames, restaurantName) {
  const key = process.env.GROQ_API_KEY;
  if (!key) throw new Error("Missing GROQ_API_KEY");
  const model = process.env.GROQ_MODEL || "openai/gpt-oss-20b";

  const system = [
    `You are the menu copywriter for ${restaurantName || "a trendy restaurant"}, writing for a young dine-in crowd.`,
    "Respond with ONLY a JSON object (no markdown, no backticks) with exactly these keys:",
    '- "summary": one or two short, punchy, appetizing sentences about the dish, specific to its ingredients, a little playful but never cringe, and no emojis.',
    '- "tags": an array of 2-3 short attribute tags that are plausibly true for this dish, each chosen from: "High protein", "Vegetarian", "Vegan", "Spicy", "Shareable", "Gluten-free", "Fresh", "Sweet".',
    '- "pairing": an object {"name","reason"} where "name" is EXACTLY one of the provided other menu items, and "reason" is at most 8 words on why they go together. Use null if nothing fits well.',
  ].join("\n");

  const user =
    `Dish: ${dish.name}\n` +
    `Ingredients: ${dish.ingredients.join(", ")}\n` +
    `Other menu items (pairing.name must be exactly one of these): ${JSON.stringify(otherNames)}`;

  const res = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.7,
      max_tokens: 400,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Groq ${res.status}: ${detail.slice(0, 160)}`);
  }

  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content || "";
  const json = parseJson(text);

  const pairOK =
    json.pairing &&
    json.pairing.name &&
    otherNames.some((n) => n.toLowerCase() === String(json.pairing.name).toLowerCase());

  return {
    summary:
      typeof json.summary === "string" && json.summary.trim()
        ? json.summary.trim()
        : dish.blurb,
    tags:
      Array.isArray(json.tags) && json.tags.length
        ? json.tags.slice(0, 3)
        : dish.tags,
    pairing: pairOK
      ? { name: json.pairing.name, reason: String(json.pairing.reason || "").slice(0, 80) }
      : null,
  };
}

function parseJson(text) {
  let s = String(text).replace(/```json/gi, "").replace(/```/g, "").trim();
  const a = s.indexOf("{");
  const b = s.lastIndexOf("}");
  if (a >= 0 && b >= 0) s = s.slice(a, b + 1);
  try {
    return JSON.parse(s);
  } catch {
    return {};
  }
}
