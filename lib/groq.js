// Talks to Groq's OpenAI-compatible chat endpoint and returns a structured
// summary for one dish. Used both by the live API route (app/api/summarize)
// and by the pre-generation script (scripts/generate-summaries.mjs).

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

function getModel() {
  return process.env.GROQ_MODEL || "openai/gpt-oss-20b";
}

// Models sometimes wrap JSON in ```fences``` or add stray text. Pull the object.
function parseJson(text) {
  if (!text) throw new Error("Empty response");
  const cleaned = text.replace(/```json/gi, "").replace(/```/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("No JSON found in response");
  return JSON.parse(cleaned.slice(start, end + 1));
}

/**
 * @param {object} dish  The dish to describe.
 * @param {object[]} menu  The full list of dishes (used for pairing ideas).
 * @returns {Promise<{summary: string, aiTags: string[], pairing: {name: string, reason: string}}>}
 */
export async function summarizeDish(dish, menu) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY is not set");

  // Give the model the other menu items so it can suggest a real pairing.
  const menuList = menu
    .filter((d) => d.id !== dish.id)
    .map((d) => `${d.name} (${d.category})`)
    .join(", ");

  const system = [
    "You write short, mouth-watering menu descriptions for a dine-in restaurant.",
    "The audience is young diners scanning a QR menu at their table.",
    "Rules:",
    "- summary: one or two vivid sentences, under 30 words, that make the dish sound irresistible. Warm and appetizing, never cheesy or salesy.",
    "- aiTags: 1 to 3 short labels a diner cares about, drawn ONLY from what the ingredients support, e.g. 'High protein', 'Vegan', 'Spicy', 'Gluten-free', 'Light', 'Comfort food'. Do not invent nutrition facts.",
    "- pairing: pick ONE item from the provided menu list that goes well with this dish (a drink or complementary plate is ideal, to lift the order). 'name' MUST be copied exactly from the menu list. 'reason' is a short phrase (under 12 words).",
    "Return ONLY a JSON object with keys: summary (string), aiTags (array of strings), pairing (object with name and reason). No other text.",
  ].join("\n");

  const user = [
    `Dish: ${dish.name}`,
    `Category: ${dish.category}`,
    `Ingredients: ${(dish.ingredients || []).join(", ") || "n/a"}`,
    `Menu items you may suggest as the pairing: ${menuList}`,
  ].join("\n");

  const res = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: getModel(),
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
    throw new Error(`Groq request failed (${res.status}): ${detail.slice(0, 200)}`);
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content ?? "";
  const parsed = parseJson(content);

  // Normalize the shape so the UI can trust it.
  return {
    summary: typeof parsed.summary === "string" ? parsed.summary : dish.blurb || "",
    aiTags: Array.isArray(parsed.aiTags) ? parsed.aiTags.slice(0, 3) : [],
    pairing:
      parsed.pairing && typeof parsed.pairing.name === "string"
        ? { name: parsed.pairing.name, reason: parsed.pairing.reason || "" }
        : null,
  };
}
