import Link from "next/link";
import { getAllSlugs, getRestaurant } from "../lib/menu.js";

export default function Home() {
  const demoSlug = getAllSlugs()[0];
  const demo = getRestaurant(demoSlug);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero__mark">✦</div>
        <h1 className="hero__title">
          Menus your guests actually want to read.
        </h1>
        <p className="hero__sub">
          A guest scans the QR at the table and gets your menu with photos, an
          AI summary of every dish, dietary highlights, and a suggested pairing
          that lifts the bill. No app to download.
        </p>
        <div className="hero__cta">
          <Link href={`/r/${demoSlug}`} className="btn btn--primary">
            See the live demo
          </Link>
          <a href="#how" className="btn btn--ghost">
            How it works
          </a>
        </div>
        <p className="hero__hint">
          Demo: {demo?.name}. Open it on your phone for the real feel.
        </p>
      </section>

      <section id="how" className="how">
        <div className="how__step">
          <span className="how__num">1</span>
          <h3>Scan</h3>
          <p>Guest points their camera at the table QR. The menu opens instantly.</p>
        </div>
        <div className="how__step">
          <span className="how__num">2</span>
          <h3>Explore</h3>
          <p>Tap a dish for a photo, an AI description, tags like high protein, and a pairing.</p>
        </div>
        <div className="how__step">
          <span className="how__num">3</span>
          <h3>Order</h3>
          <p>Guests build a picks list and show the server — often adding that extra side or drink.</p>
        </div>
      </section>

      <section className="value">
        <h2 className="value__title">Why restaurants put this on the table</h2>
        <ul className="value__list">
          <li>Descriptions that sell — every dish sounds worth ordering, written for you automatically.</li>
          <li>Higher average order — built-in pairing suggestions nudge one more item per table.</li>
          <li>Update in minutes — change a price or dish without reprinting a thing.</li>
          <li>Zero friction for guests — works in any phone camera, no install, no sign-up.</li>
        </ul>
        <Link href={`/r/${demoSlug}`} className="btn btn--primary value__cta">
          Try the demo menu
        </Link>
      </section>

      <footer className="home__foot">Built for restaurants that want their menu to do more.</footer>
    </div>
  );
}
