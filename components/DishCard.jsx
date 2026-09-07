"use client";

import DishImage from "./DishImage.jsx";
import Tag from "./Tag.jsx";

export default function DishCard({ dish, currency, onOpen, isPicked }) {
  return (
    <button
      type="button"
      className={`card ${isPicked ? "card--picked" : ""}`}
      onClick={onOpen}
      aria-label={`Open ${dish.name}`}
    >
      <DishImage dish={dish} className="card__img" />

      <div className="card__body">
        <div className="card__top">
          <h3 className="card__name">{dish.name}</h3>
          {isPicked && <span className="card__added">Added</span>}
        </div>
        <p className="card__blurb">{dish.blurb}</p>
        <div className="card__meta">
          <div className="card__tags">
            {dish.tags.slice(0, 2).map((t) => (
              <Tag key={t} label={t} />
            ))}
          </div>
          <span className="card__price">
            {currency}
            {dish.price}
          </span>
        </div>
      </div>
    </button>
  );
}
