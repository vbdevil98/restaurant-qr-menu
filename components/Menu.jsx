"use client";

import { useEffect, useRef, useState } from "react";
import DishCard from "./DishCard.jsx";
import DishSheet from "./DishSheet.jsx";
import TraySheet from "./TraySheet.jsx";

const CAT_EMOJI = { All: "✳︎", Starters: "🥢", Mains: "🍽️", Sweets: "🍰", Sips: "🥤" };

export default function Menu({ restaurant, menu, categories, currency }) {
  const [activeCat, setActiveCat] = useState("All");
  const [query, setQuery] = useState("");
  const [openDishId, setOpenDishId] = useState(null);
  const [trayOpen, setTrayOpen] = useState(false);
  const [cart, setCart] = useState({}); // id -> qty
  const [bump, setBump] = useState(false);

  // Stagger the cards in on the very first render only.
  const firstRef = useRef(true);
  useEffect(() => {
    firstRef.current = false;
  }, []);

  const cats = ["All", ...categories];
  const q = query.trim().toLowerCase();
  const items = menu.filter(
    (d) =>
      (activeCat === "All" || d.category === activeCat) &&
      (!q ||
        d.name.toLowerCase().includes(q) ||
        d.ingredients.join(" ").toLowerCase().includes(q))
  );

  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const total = Object.entries(cart).reduce(
    (a, [id, qy]) => a + (menu.find((d) => d.id === id)?.price || 0) * qy,
    0
  );

  const addToCart = (id) => {
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
    setBump(true);
    setTimeout(() => setBump(false), 420);
  };
  const decFromCart = (id) =>
    setCart((c) => {
      const next = { ...c };
      const q2 = (next[id] || 0) - 1;
      if (q2 <= 0) delete next[id];
      else next[id] = q2;
      return next;
    });
  const clearCart = () => setCart({});

  const openDish = (id) => {
    setTrayOpen(false);
    setOpenDishId(id);
  };
  const closeAll = () => {
    setOpenDishId(null);
    setTrayOpen(false);
  };

  const anyOpen = openDishId !== null || trayOpen;
  useEffect(() => {
    document.body.style.overflow = anyOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [anyOpen]);

  const openDishObj = menu.find((d) => d.id === openDishId) || null;

  return (
    <>
      <div className="glow" />
      <div className="grain" />

      <div className="wrap">
        <header className="hero">
          <span className="live">
            <span className="live__dot" />
            Open now · dine-in
          </span>
          <h1>{restaurant.name}</h1>
          <p className="tag">{restaurant.tagline}</p>
          <div className="search">
            <span className="ic">⌕</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dishes or ingredients"
              aria-label="Search the menu"
              autoComplete="off"
            />
          </div>
        </header>

        <div className="pillbar">
          <div className="pills">
            {cats.map((c) => (
              <button
                key={c}
                className={"pill" + (c === activeCat ? " pill--on" : "")}
                onClick={() => setActiveCat(c)}
              >
                <span className="pill__e">{CAT_EMOJI[c] || "🍴"}</span>
                {c}
              </button>
            ))}
          </div>
        </div>

        <main className="list">
          {items.length ? (
            items.map((d, i) => (
              <DishCard
                key={d.id}
                dish={d}
                currency={currency}
                qty={cart[d.id] || 0}
                stagger={firstRef.current}
                index={i}
                onOpen={() => openDish(d.id)}
                onAdd={() => addToCart(d.id)}
              />
            ))
          ) : (
            <div className="empty">No dishes match “{query}”. Try another search.</div>
          )}
        </main>
      </div>

      {count > 0 && (
        <button
          className={"traypill" + (bump ? " bump" : "")}
          onClick={() => {
            setOpenDishId(null);
            setTrayOpen(true);
          }}
          aria-label="View your order"
        >
          <span className="tp__count">{count}</span>
          <span className="tp__mid">
            {currency}
            {total}
          </span>
          <span className="tp__go">View order</span>
        </button>
      )}

      <div className={"backdrop" + (anyOpen ? " show" : "")} onClick={closeAll} />

      <DishSheet
        dish={openDishObj}
        open={openDishId !== null}
        menu={menu}
        currency={currency}
        qty={openDishObj ? cart[openDishObj.id] || 0 : 0}
        onAdd={addToCart}
        onOpenDish={openDish}
        onClose={closeAll}
      />

      <TraySheet
        open={trayOpen}
        cart={cart}
        menu={menu}
        currency={currency}
        onInc={addToCart}
        onDec={decFromCart}
        onClear={clearCart}
        onClose={closeAll}
      />
    </>
  );
}
