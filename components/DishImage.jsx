"use client";

import { useState } from "react";

// Shows the dish photo. If the file isn't there yet (or fails to load), it
// falls back to a colored tile with the dish emoji so the menu still looks
// finished while you gather real photography.
export default function DishImage({ dish, className = "" }) {
  const [failed, setFailed] = useState(!dish.image);

  if (failed) {
    return (
      <div className={`dish-img dish-img--fallback ${className}`} aria-hidden="true">
        <span className="dish-img__emoji">{dish.emoji || "🍽️"}</span>
      </div>
    );
  }

  return (
    <img
      src={dish.image}
      alt={dish.name}
      loading="lazy"
      className={`dish-img ${className}`}
      onError={() => setFailed(true)}
    />
  );
}
