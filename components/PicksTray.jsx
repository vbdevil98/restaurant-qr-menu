"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function PicksTray({ picks, currency, onRemove, onClear }) {
  const [open, setOpen] = useState(false);
  if (picks.length === 0) return null;

  const total = picks.reduce((sum, d) => sum + d.price, 0);

  return (
    <div className="tray">
      <AnimatePresence>
        {open && (
          <motion.div
            className="tray__list"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2 }}
          >
            <div className="tray__list-head">
              <span>Your picks</span>
              <button type="button" className="tray__clear" onClick={onClear}>
                Clear
              </button>
            </div>

            {picks.map((d) => (
              <div key={d.id} className="tray__item">
                <span className="tray__item-emoji">{d.emoji || "🍽️"}</span>
                <span className="tray__item-name">{d.name}</span>
                <span className="tray__item-price">
                  {currency}
                  {d.price}
                </span>
                <button
                  type="button"
                  className="tray__remove"
                  onClick={() => onRemove(d.id)}
                  aria-label={`Remove ${d.name}`}
                >
                  ✕
                </button>
              </div>
            ))}

            <p className="tray__hint">Show this to your server to place your order.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <button type="button" className="tray__bar" onClick={() => setOpen((v) => !v)}>
        <span className="tray__count">
          {picks.length} {picks.length === 1 ? "pick" : "picks"}
        </span>
        <span className="tray__right">
          <span className="tray__total">
            {currency}
            {total}
          </span>
          <span className={`tray__chevron ${open ? "tray__chevron--up" : ""}`}>⌃</span>
        </span>
      </button>
    </div>
  );
}
