# Bloom Kitchen — AI Menu

A scan-to-table restaurant menu. A guest scans the QR at the table, the menu
opens on their phone, and tapping a dish reveals a photo, an **AI-written
summary** (with dietary tags and a pairing suggestion that nudges one more item
onto the check), and a running "tray" they show the server.

Built with **Next.js (App Router) + React**. The AI runs on **Groq**, called
from a **server-side API route** — so your Groq API key stays on the server and
is never exposed in the browser. Optimized for deployment on **Vercel**.

---

## 🚀 Quick Deploy to Vercel

### Option 1: One-Click Deploy (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/bloom-menu-app&env=GROQ_API_KEY,GROQ_MODEL&envDescription=Groq%20API%20Key%20for%20AI%20summaries&envLink=https://console.groq.com/keys)

### Option 2: Manual Deploy

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/your-username/bloom-menu-app.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in with GitHub
   - Click **Add New…** → **Project**
   - Import your repository
   - Vercel auto-detects Next.js — click **Deploy**

3. **Add Environment Variables** (Vercel Dashboard → Settings → Environment Variables)
   - `GROQ_API_KEY` — Your Groq API key from [console.groq.com/keys](https://console.groq.com/keys)
   - `GROQ_MODEL` (optional) — e.g., `openai/gpt-oss-20b`
   - **Redeploy** after adding variables

4. **Done!** Your live URL will be `https://your-project.vercel.app`

---

## 1. Run it locally

You need **Node.js 18+** ([nodejs.org](https://nodejs.org)).

```bash
npm install
npm run dev
```

Open **http://localhost:3000**. That's the menu.

Right away it works with written blurbs and emoji tiles. To switch on the AI and
real photos, do steps 2 and 3.

---

## 2. Connect Groq (the AI backend)

1. Get a free key at **https://console.groq.com/keys**.
2. Copy the example env file and paste your key:

```bash
cp .env.example .env.local
```

```
GROQ_API_KEY=gsk_your_real_key
GROQ_MODEL=openai/gpt-oss-20b
```

3. Restart `npm run dev`. Now tapping a dish calls **`/api/summarize`** on the
   server, which calls Groq and returns the summary. **The key is only ever read
   on the server** (`lib/groq.js`), so it never reaches the browser.

If Groq is unreachable or the key is missing, the menu quietly falls back to the
dish's written blurb — it never looks broken.

> **Model names change on Groq.** That's why the model is an env var. If you ever
> see a "model not found" error, check
> https://console.groq.com/docs/models and put the current id in `GROQ_MODEL`.

---

## 3. Add your photos

You handle the photos — here's exactly where they go:

- Drop image files into **`public/images/dishes/`**.
- Use the **exact filename** each dish expects. The full list of
  dish → filename (and what to shoot) is in
  **`public/images/dishes/IMAGES.md`**.

Any dish without a photo shows a colored tile with its emoji, so you can launch
before every photo is ready and add them over time.

---

## 4. Edit the menu

Everything about the menu lives in **`data/menu.js`** — the only file you need to
touch. Change the restaurant `name` and `tagline`, then edit the `MENU` array:
each dish has a `name`, `category`, `price`, `emoji`, `image` path, `blurb`
(the fallback text), `ingredients`, and `tags`. The category tabs come from the
`CATEGORIES` list.

---

## 5. Vercel Deployment Details

### Automatic Deployments
Every `git push` to your connected branch triggers an automatic deployment.

### Environment Variables in Vercel
Set these in your Vercel project dashboard:
- **Production**: For the live site
- **Preview**: For pull request previews
- **Development**: For local testing (optional)

### Build Settings (Auto-detected)
- **Framework**: Next.js
- **Build Command**: `next build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### Performance Optimizations
This project includes Vercel-specific optimizations:
- **Standalone output** for smaller deployment size
- **React Strict Mode** for better development
- **Image optimization** (AVIF + WebP formats)
- **Powered-by header removed** for cleaner responses

---

## 6. Make the QR code

Point it at your live URL:

```bash
npm run qr -- https://your-project.vercel.app
```

That saves `menu-qr.png` — print it for the tables. (Any free QR generator works
too; just paste the URL.)

---

## 7. Optional: pre-generate summaries (cheaper + instant)

Calling Groq on every tap works, but you can bake the summaries once so the menu
is instant and costs nothing while guests browse:

```bash
npm run summaries
```

This writes `data/summaries.json`. The backend serves those first and only calls
Groq for anything not already there. Commit the file and redeploy for it to take
effect in production. Re-run whenever you change the menu.

---

## How the AI works (in one paragraph)

The browser never talks to Groq. It POSTs a dish id to your own `/api/summarize`
route. That route (server-side) checks pre-generated summaries, then an
in-memory cache, then calls Groq with your key and returns a small JSON object:
a summary, dietary tags, and a pairing. The pairing is validated to be a real
item on your menu, and any failure falls back to the dish's written blurb.

## Adding more restaurants later

This build serves one restaurant. To run several from one deployment, turn
`data/menu.js` into a set of restaurants keyed by a slug and add a
`app/r/[slug]/page.js` route that renders the matching one — each gets its own
URL and QR from the same codebase. Ping me and I'll wire it up.

## Project map

```
data/menu.js                    ← the menu. Edit this first.
public/images/dishes/           ← your photos (see IMAGES.md).
lib/groq.js                     ← the server-side Groq call (holds the key).
app/api/summarize/route.js      ← the backend endpoint the app calls.
app/page.js                     ← the menu page.
app/globals.css                 ← the whole visual design.
components/                     ← the UI (cards, dish sheet, tray).
scripts/generate-summaries.mjs  ← pre-bake summaries (npm run summaries).
scripts/generate-qr.mjs         ← make the QR (npm run qr).
vercel.json                     ← Vercel deployment configuration.
.env.example                    ← environment variable template.
```

## Troubleshooting

### Build fails on Vercel
- Check that all dependencies are in `package.json`
- Ensure Node.js version is 18+ (Vercel defaults to 18)
- Review build logs in Vercel dashboard

### AI summaries not working
- Verify `GROQ_API_KEY` is set in Vercel Environment Variables
- Check that the key is valid at [console.groq.com/keys](https://console.groq.com/keys)
- Review function logs in Vercel dashboard for errors

### Images not showing
- Confirm images are in `public/images/dishes/`
- Check filenames match exactly what's in `data/menu.js`
- Images must be in JPG, PNG, or WebP format
