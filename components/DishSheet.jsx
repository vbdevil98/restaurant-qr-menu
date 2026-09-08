"use client";

import { useEffect, useRef, useState } from "react";
import DishImage from "./DishImage.jsx";
import Tag from "./Tag.jsx";

// Per-session cache so re-opening a dish is instant and doesn't re-hit the API.
const cache = {};

export default function DishSheet({ dish, open, menu, currency, qty, onAdd, onOpenDish, onClose }) {
  const [shown, setShown] = useState(dish); // persists during the close animation
  const [status, setStatus] = useState("loading"); // loading | done
  const [ai, setAi] = useState(null);
  const [added, setAdded] = useState(false);
  const sheetRef = useRef(null);
  const gripRef = useRef(null);

  // Keep the last dish visible while the sheet slides away.
  useEffect(() => {
    if (dish) setShown(dish);
  }, [dish]);

  // Fetch the AI summary from our own backend whenever the dish changes.
  useEffect(() => {
    if (!dish) return;
    setAdded(false);
    if (cache[dish.id]) {
      setAi(cache[dish.id]);
      setStatus("done");
      return;
    }
    let active = true;
    setStatus("loading");
    setAi(null);
    fetch("/api/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dishId: dish.id }),
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then((data) => {
        if (!active) return;
        cache[dish.id] = data;
        setAi(data);
        setStatus("done");
      })
      .catch(() => {
        if (!active) return;
        setAi(null); // fall back to the written blurb
        setStatus("done");
      });
    return () => {
      active = false;
    };
  }, [dish]);

  // Drag the grip down to dismiss.
  useEffect(() => {
    const grip = gripRef.current;
    const sheet = sheetRef.current;
    if (!grip || !sheet) return;
    let dragging = false;
    let startY = 0;
    let dy = 0;
    const down = (e) => {
      dragging = true;
      startY = e.clientY;
      dy = 0;
      sheet.style.transition = "none";
      grip.setPointerCapture(e.pointerId);
    };
    const move = (e) => {
      if (!dragging) return;
      dy = Math.max(0, e.clientY - startY);
      sheet.style.transform = `translateY(${dy}px)`;
    };
    const up = () => {
      if (!dragging) return;
      dragging = false;
      sheet.style.transition = "";
      if (dy > 120) onClose();
      else sheet.style.transform = "";
    };
    grip.addEventListener("pointerdown", down);
    grip.addEventListener("pointermove", move);
    grip.addEventListener("pointerup", up);
    grip.addEventListener("pointercancel", up);
    return () => {
      grip.removeEventListener("pointerdown", down);
      grip.removeEventListener("pointermove", move);
      grip.removeEventListener("pointerup", up);
      grip.removeEventListener("pointercancel", up);
    };
  }, [onClose]);

  // Reset any leftover drag transform when the sheet (re)opens.
  useEffect(() => {
    if (open && sheetRef.current) {
      sheetRef.current.style.transform = "";
      sheetRef.current.style.transition = "";
      const scroll = sheetRef.current.querySelector(".sheet__scroll");
      if (scroll) scroll.scrollTop = 0;
    }
  }, [open, dish]);

  const d = shown;
  const summary = (ai && ai.summary) || (d ? d.blurb : "");
  const baseTags = d ? d.tags : [];
  const tags = ai && ai.tags ? mergeTags(baseTags, ai.tags) : baseTags;
  const pairing = ai && ai.pairing ? ai.pairing : null;
  const paired = pairing
    ? menu.find((x) => x.name.toLowerCase() === String(pairing.name).toLowerCase())
    : null;

  const handleAdd = () => {
    if (!d) return;
    onAdd(d.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <section
      className={"sheet" + (open ? " open" : "")}
      ref={sheetRef}
      role="dialog"
      aria-modal="true"
      aria-label={d ? d.name : "Dish"}
    >
      <div className="grip" ref={gripRef}>
        <span />
      </div>
      <button className="sheet__close" onClick={onClose} aria-label="Close">
        ✕
      </button>
      <div className="sheet__scroll">
        {d && (
          <>
            <div className={"sheet__media media--" + d.category.toLowerCase()}>
              <DishImage dish={d} />
            </div>
            <div className="sheet__head">
              <h2 className="sheet__name">{d.name}</h2>
              <span className="sheet__price">
                {currency}
                {d.price}
              </span>
            </div>
            <div className="sheet__tags">
              {tags.map((t) => (
                <Tag key={t} label={t} />
              ))}
            </div>

            <section className="ai">
              <div className="ai__label">
                <span className="ai__spark">✦</span>Why you&rsquo;ll love it
              </div>
              {status === "loading" ? (
                <div className="ai__load">
                  <div className="shim" />
                  <div className="shim s2" />
                  <div className="shim s3" />
                  <p className="ai__hint">Writing something good…</p>
                </div>
              ) : (
                <p className="ai__summary">{summary}</p>
              )}

              {pairing && (
                <button
                  className="pair"
                  onClick={() => paired && onOpenDish(paired.id)}
                  disabled={!paired}
                >
                  <div className="pair__ic">{paired ? paired.emoji : "✦"}</div>
                  <div className="pair__txt">
                    <div className="pair__k">Goes great with</div>
                    <div className="pair__n">{pairing.name}</div>
                    {pairing.reason && <div className="pair__r">{pairing.reason}</div>}
                  </div>
                  {paired && <div className="pair__go">Open</div>}
                </button>
              )}
            </section>

            <div className="sec-label">What&rsquo;s in it</div>
            <div className="chips">
              {d.ingredients.map((x) => (
                <span className="chip" key={x}>
                  {x}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="sheet__foot">
        <button className={"btn-primary" + (added ? " done" : "")} onClick={handleAdd}>
          {added ? "Added to tray ✓" : qty > 0 ? `Add another · ${qty} in tray` : "Add to order"}
        </button>
      </div>
    </section>
  );
}

function mergeTags(base, extra) {
  const out = base.slice();
  (extra || []).forEach((t) => {
    if (!out.some((x) => x.toLowerCase() === t.toLowerCase())) out.push(t);
  });
  return out;
}
