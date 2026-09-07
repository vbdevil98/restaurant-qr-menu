"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import DishCard from "./DishCard.jsx";
import DishSheet from "./DishSheet.jsx";
import PicksTray from "./PicksTray.jsx";

export default function Menu({ restaurant, summaries }) {
  const { slug, name, tagline, accent, currency, categories, dishes } = restaurant;
  const reduce = useReducedMotion();

  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [openDishId, setOpenDishId] = useState(null);
  const [picks, setPicks] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    setFirstLoad(false);
  }, []);

  const openDish = useMemo(
    () => dishes.find((d) => d.id === openDishId) || null,
    [openDishId, dishes]
  );

  const visibleDishes = useMemo(
    () => dishes.filter((d) => d.category === activeCategory),
    [activeCategory, dishes]
  );

  const isPicked = (id) => picks.some((p) => p.id === id);

  function togglePick(dish) {
    setPicks((prev) =>
      prev.some((p) => p.id === dish.id)
        ? prev.filter((p) => p.id !== dish.id)
        : [...prev, { id: dish.id, name: dish.name, price: dish.price, emoji: dish.emoji }]
    );
  }

  const removePick = (id) => setPicks((prev) => prev.filter((p) => p.id !== id));
  const clearPicks = () => setPicks([]);

  return (
    <div className="shell" style={{ "--accent": accent }}>
      <header className="head">
        <div className="head__mark">✦ menu</div>
        <h1 className="head__name">{name}</h1>
        <p className="head__tagline">{tagline}</p>
      </header>

      <nav className="tabs" aria-label="Menu categories">
        <div className="tabs__row">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              className={`tab ${c === activeCategory ? "tab--active" : ""}`}
              onClick={() => setActiveCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </nav>

      <main className="list">
        {reduce ? (
          <div>
            {visibleDishes.map((dish) => (
              <DishCard
                key={dish.id}
                dish={dish}
                currency={currency}
                isPicked={isPicked(dish.id)}
                onOpen={() => setOpenDishId(dish.id)}
              />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              {visibleDishes.map((dish, i) =>
                firstLoad ? (
                  <motion.div
                    key={dish.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.35, ease: "easeOut" }}
                  >
                    <DishCard
                      dish={dish}
                      currency={currency}
                      isPicked={isPicked(dish.id)}
                      onOpen={() => setOpenDishId(dish.id)}
                    />
                  </motion.div>
                ) : (
                  <div key={dish.id}>
                    <DishCard
                      dish={dish}
                      currency={currency}
                      isPicked={isPicked(dish.id)}
                      onOpen={() => setOpenDishId(dish.id)}
                    />
                  </div>
                )
              )}
            </motion.div>
          </AnimatePresence>
        )}

        <footer className="foot">
          <span>{name}</span>
          <span className="foot__dim">Tap any dish for the full story</span>
        </footer>
      </main>

      <AnimatePresence>
        {openDish && (
          <DishSheet
            key="sheet"
            dish={openDish}
            slug={slug}
            currency={currency}
            summaries={summaries}
            dishes={dishes}
            isPicked={isPicked(openDish.id)}
            onPickToggle={togglePick}
            onOpenDish={(id) => setOpenDishId(id)}
            onClose={() => setOpenDishId(null)}
          />
        )}
      </AnimatePresence>

      <PicksTray picks={picks} currency={currency} onRemove={removePick} onClear={clearPicks} />
    </div>
  );
}
