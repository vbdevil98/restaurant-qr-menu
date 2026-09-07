"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, useDragControls } from "framer-motion";
import DishImage from "./DishImage.jsx";
import Tag from "./Tag.jsx";

export default function DishSheet({
  dish,
  slug,
  currency,
  summaries,
  dishes,
  isPicked,
  onPickToggle,
  onOpenDish,
  onClose,
}) {
  const reduce = useReducedMotion();
  const dragControls = useDragControls();
  const [status, setStatus] = useState("loading"); // loading | done | fallback
  const [ai, setAi] = useState(null);

  // Lock background scroll while the sheet is open.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Fetch (or reuse) the AI summary whenever the dish changes.
  useEffect(() => {
    let active = true;
    setAi(null);

    const preGenerated = summaries?.[`${slug}:${dish.id}`];
    if (preGenerated) {
      setAi(preGenerated);
      setStatus("done");
      return;
    }

    setStatus("loading");
    fetch("/api/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, dishId: dish.id }),
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then((data) => {
        if (!active) return;
        setAi(data);
        setStatus("done");
      })
      .catch(() => {
        if (!active) return;
        setStatus("fallback"); // no key / network issue — show the written blurb
      });

    return () => {
      active = false;
    };
  }, [dish.id, slug, summaries]);

  const summary = ai?.summary || dish.blurb;
  const aiTags = ai?.aiTags || [];
  const pairing = ai?.pairing || null;
  const pairedDish = pairing
    ? dishes.find((d) => d.name.toLowerCase() === pairing.name.toLowerCase())
    : null;

  // Merge the dish's base tags with any AI tags, de-duplicated.
  const allTags = [...dish.tags];
  for (const t of aiTags) {
    if (!allTags.some((x) => x.toLowerCase() === t.toLowerCase())) allTags.push(t);
  }

  const sheetMotion = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { y: "100%" },
        animate: { y: 0 },
        exit: { y: "100%" },
        transition: { type: "spring", damping: 32, stiffness: 320 },
      };

  return (
    <>
      <motion.div
        className="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div
        className="sheet"
        role="dialog"
        aria-modal="true"
        aria-label={dish.name}
        {...sheetMotion}
        drag={reduce ? false : "y"}
        dragListener={false}
        dragControls={dragControls}
        dragConstraints={{ top: 0 }}
        dragElastic={0.15}
        dragSnapToOrigin
        onDragEnd={(_, info) => {
          if (info.offset.y > 140 || info.velocity.y > 600) onClose();
        }}
      >
        <div
          className="sheet__grip"
          onPointerDown={(e) => {
            if (!reduce) dragControls.start(e);
          }}
          style={{ touchAction: "none" }}
        >
          <div className="sheet__handle" />
        </div>
        <button type="button" className="sheet__close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <div className="sheet__scroll">
          <DishImage dish={dish} className="sheet__img" />

          <div className="sheet__head">
            <h2 className="sheet__name">{dish.name}</h2>
            <span className="sheet__price">
              {currency}
              {dish.price}
            </span>
          </div>

          <div className="sheet__tags">
            {allTags.map((t) => (
              <Tag key={t} label={t} />
            ))}
          </div>

          <section className="ai">
            <div className="ai__label">
              <span className="ai__spark">✦</span> Why you&rsquo;ll love it
            </div>

            {status === "loading" ? (
              <div className="ai__loading">
                <span className="shimmer" />
                <span className="shimmer shimmer--short" />
                <p className="ai__note">Cooking up your summary…</p>
              </div>
            ) : (
              <p className="ai__summary">{summary}</p>
            )}

            {pairing && (
              <button
                type="button"
                className="pair"
                onClick={() => pairedDish && onOpenDish(pairedDish.id)}
                disabled={!pairedDish}
              >
                <div className="pair__left">
                  <div className="pair__label">Perfect with</div>
                  <div className="pair__name">{pairing.name}</div>
                  {pairing.reason && <div className="pair__reason">{pairing.reason}</div>}
                </div>
                {pairedDish && <span className="pair__go">View</span>}
              </button>
            )}
          </section>
        </div>

        <div className="sheet__foot">
          <button
            type="button"
            className={`pick-btn ${isPicked ? "pick-btn--on" : ""}`}
            onClick={() => onPickToggle(dish)}
          >
            {isPicked ? "Remove from my picks" : "Add to my picks"}
          </button>
        </div>
      </motion.div>
    </>
  );
}
