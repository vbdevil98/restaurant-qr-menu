# Scan-to-Table AI Menu

A QR-code menu for restaurants. A guest scans the code at the table, the menu
opens instantly on their phone, and tapping any dish reveals a photo, an
**AI-written summary**, dietary tags (like *High protein*), and a **suggested
pairing** that nudges one more item onto the check. Guests can also build a
"picks" list to show the server.

Built with **Next.js + React**, styled for a young dine-in crowd, AI summaries
powered by **Groq**, deployable free on **Vercel**.

---

## What's inside

- **Beautiful mobile menu** — dark, photo-forward design so food looks great.
- **AI dish summaries** — punchy descriptions + dietary tags, generated for you.
- **Pairing upsell** — the AI suggests a drink/side to raise average order value.
- **Picks tray** — guests assemble an order and show it to the server.
- **Multi-restaurant ready** — one deployment can serve many venues via `/r/<name>`.
- **Graceful without photos or an API key** — shows emoji tiles and written
  blurbs so it never looks broken while you're still setting up.

---

## 1. Run it on your computer

You need **Node.js 18 or newer** ([nodejs.org](https://nodejs.org)).

```bash
npm install
npm run dev
```

Open **http://localhost:3000** — that's the pitch/landing page.
The demo menu is at **http://localhost:3000/r/bloom**.

> Tip: open it on your phone (same Wi-Fi, use your computer's local IP) to feel
> the real thing.

---

## 2. Make it your restaurant

Everything for a venue lives in **`data/restaurants.js`**. Edit:

- `name`, `tagline` — shown at the top.
- `accent` — the brand color (buttons, highlights, price).
- `currency` — e.g. `"$"`, `"€"`, `"₹"`.
- `categories` — the tab names.
- `dishes` — name, `category`, `price`, `emoji`, `image`, `blurb`,
  `ingredients`, and `tags`.

**Photos:** drop image files into `public/images/dishes/` and point each dish's
`image` at them, e.g. `image: "/images/dishes/butter-chicken.jpg"`. Missing a
photo? The menu shows a colored tile with the emoji instead — add the real
photo later and it appears automatically.

---

## 3. Turn on AI summaries (Groq)

1. Get a free key at **https://console.groq.com/keys**.
2. Copy `.env.example` to `.env.local` and paste your key.

```bash
cp .env.example .env.local
```

There are two ways the AI runs, and the app uses whichever is available:

**A) Pre-generate (recommended).** Bake a summary for every dish once:

```bash
npm run summaries
```

This writes `data/summaries.json`. The menu then loads summaries **instantly**
and costs **nothing** while guests browse — you pay Groq only once, here. Re-run
whenever you change the menu.

**B) Live.** If a dish has no pre-generated summary, the menu calls
`/api/summarize` on demand (your key stays server-side and never reaches the
browser). Results are cached in memory per dish.

> **Model note:** Groq model names change often. This project defaults to
> `openai/gpt-oss-20b` (fast + cheap, great for short blurbs). If you ever get a
> "model not found" error, check the current list at
> https://console.groq.com/docs/models and set `GROQ_MODEL` in `.env.local`.

No key yet? Everything still works — the menu falls back to the written `blurb`
for each dish.

---

## 4. Deploy to Vercel (free)

1. Push this folder to a new **GitHub** repo.
2. Go to **https://vercel.com** → sign in with GitHub → **Add New… → Project**.
3. Import your repo. Vercel auto-detects Next.js — just click **Deploy**.
4. Add your key: Vercel project → **Settings → Environment Variables** →
   add `GROQ_API_KEY` (and `GROQ_MODEL` if you changed it) → **Redeploy**.

You'll get a URL like `https://your-project.vercel.app`. Your menu is at
`https://your-project.vercel.app/r/bloom`.

Every time you `git push`, Vercel redeploys automatically.

---

## 5. Make the QR code

Point the QR at your live menu URL:

```bash
npm run qr -- https://your-project.vercel.app/r/bloom
```

This saves `menu-qr.png` — print it on table tents, stickers, or the check
holder. (No-code option: any free QR generator works too; just paste the URL.)

---

## 6. Add more restaurants

In `data/restaurants.js`, copy the whole `bloom: { ... }` block, paste it below,
and change the slug + details:

```js
export const restaurants = {
  bloom: { /* ... */ },
  crema: {
    slug: "crema",
    name: "Crema Café",
    accent: "#5B8DEF",
    // ...
  },
};
```

`crema` is now live at `/r/crema` with its own QR — same deployment, no extra
hosting. Re-run `npm run summaries` to generate its AI summaries.

---

## 7. Storage & scaling (when you outgrow the basics)

You start free, and it holds up well. As you grow:

**Dish photos**
- *Now:* files in `public/images/dishes/` (free, served by Vercel's CDN).
- *Better:* **Cloudinary** — free tier, auto-optimizes and resizes food photos
  (faster loads, smaller files). Or **Supabase Storage** / **Cloudflare R2** for
  cheap object storage at scale. Add the host to `images` in `next.config.mjs`
  and use the full URL in `image`.

**Menu data**
- *Now:* the `data/restaurants.js` file.
- *Better:* move menus into **Supabase** (Postgres, generous free tier) or a
  headless CMS like **Sanity** so menus can be edited without touching code —
  which becomes a real product feature (see below).

Free-tier limits change, so check each provider's current page before relying on
specific numbers.

---

## 8. The business

You're not selling "a QR menu" — those are everywhere and owners are tired of
them. You're selling **a menu that increases the check and takes them zero
effort.** Lead with that.

**The pitch (do it in person, at their table)**
1. Open the live demo on your phone and hand it to them.
2. Tap a dish — let them see the photo, the AI description, and the pairing.
3. Say: *"This is your menu, live, in a day. The pairing suggestion alone —
   one extra drink per table — pays for this many times over. And you change a
   price from your phone, no reprinting."*

**Who to start with:** independent cafés and restaurants that skew younger, the
kind of place that already cares about how its Instagram looks. Start with owners
you know or can walk in on. Get 2–3 reference customers fast.

**Pricing (pick one to start, keep it simple)**
- **Setup + subscription:** one-time setup (you build the menu, help with photos,
  print QRs) + a monthly fee per venue (e.g. a modest recurring price). The
  monthly is where the business is.
- **Tiers:** *Basic* (menu + QR) → *Pro* (AI summaries, pairings, analytics).

Your costs are tiny: Vercel is free to start, and Groq summaries cost cents per
menu because you pre-generate them once. Margins are high — the work is sales,
onboarding, and photos.

**Roadmap that makes it stickier (build after you have paying venues):**
- **Owner dashboard** — edit menu, prices, and photos without code (this is the
  feature that lets you scale past hand-editing files).
- **Analytics** — which dishes get viewed/added most; sell the insight back.
- **Allergen & diet filters**, and **AI translation** for multi-language menus.
- **Online ordering + payments**, then **POS integration** (bigger builds — only
  once demand is proven; many venues are happy with menu-only first).

**Honest cautions:** some venues will ask for ordering/payments on day one — that's
a much larger build, so decide whether to say "coming soon" or walk. And prove the
upsell: track a venue's average order before and after, so your pitch rests on a
real number, not a promise.

---

## Project map

```
data/restaurants.js      ← your menu(s). Edit this first.
public/images/dishes/    ← dish photos go here.
lib/groq.js              ← the Groq AI call.
app/api/summarize/       ← live AI endpoint (key stays server-side).
scripts/generate-summaries.mjs  ← pre-bake summaries (npm run summaries).
scripts/generate-qr.mjs         ← make the QR image (npm run qr).
app/page.js              ← landing / pitch page.
app/r/[slug]/page.js     ← the menu page.
components/               ← the UI (cards, dish sheet, picks tray).
app/globals.css          ← the whole visual design.
```
