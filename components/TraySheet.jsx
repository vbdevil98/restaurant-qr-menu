"use client";

import { useEffect, useRef, useState } from "react";

export default function TraySheet({ open, cart, menu, currency, onInc, onDec, onClear, onClose }) {
  const sheetRef = useRef(null);
  const gripRef = useRef(null);
  const [sent, setSent] = useState(false);

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

  useEffect(() => {
    if (open && sheetRef.current) {
      sheetRef.current.style.transform = "";
      sheetRef.current.style.transition = "";
      setSent(false);
    }
  }, [open]);

  const entries = Object.entries(cart).filter(([, q]) => q > 0);
  const total = entries.reduce(
    (a, [id, q]) => a + (menu.find((d) => d.id === id)?.price || 0) * q,
    0
  );

  return (
    <section
      className={"sheet" + (open ? " open" : "")}
      ref={sheetRef}
      role="dialog"
      aria-modal="true"
      aria-label="Your order"
    >
      <div className="grip" ref={gripRef}>
        <span />
      </div>
      <button className="sheet__close" onClick={onClose} aria-label="Close">
        ✕
      </button>
      <div className="sheet__scroll">
        <h2 className="tray__title">Your order</h2>
        <p className="tray__sub">Add or remove, then show it to your server.</p>

        <div>
          {entries.length ? (
            entries.map(([id, q]) => {
              const d = menu.find((x) => x.id === id);
              if (!d) return null;
              return (
                <div className="trow" key={id}>
                  <div className="trow__info">
                    <div className="trow__name">{d.name}</div>
                    <div className="trow__price">
                      {currency}
                      {d.price} each
                    </div>
                  </div>
                  <div className="stepper">
                    <button className="step" onClick={() => onDec(id)} aria-label="One less">
                      −
                    </button>
                    <span className="step__q">{q}</span>
                    <button className="step" onClick={() => onInc(id)} aria-label="One more">
                      ＋
                    </button>
                  </div>
                  <div className="trow__line">
                    {currency}
                    {d.price * q}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="empty">Your tray&rsquo;s empty — tap ＋ on anything you like.</div>
          )}
        </div>

        <div className="tray__totrow">
          <span className="tray__totk">Subtotal</span>
          <span className="tray__totv">
            {currency}
            {total}
          </span>
        </div>
        {entries.length > 0 && (
          <button className="tray__clear" onClick={onClear}>
            Clear order
          </button>
        )}
      </div>
      <div className="sheet__foot">
        <button
          className={"btn-primary" + (sent ? " done" : "")}
          onClick={() => {
            if (!entries.length) return;
            setSent(true);
            setTimeout(() => setSent(false), 1600);
          }}
        >
          {sent ? "Sent to the kitchen ✓" : "Show this to your server"}
        </button>
        <p className="tray__note">
          This sends your picks to the kitchen through your server — no payment here.
        </p>
      </div>
    </section>
  );
}
