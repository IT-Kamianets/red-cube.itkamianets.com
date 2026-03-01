import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import C from "../../constants/colors.js";

export default function Lightbox({ images, startIdx, name, onClose }) {
  const [idx, setIdx] = useState(startIdx);
  const prev = useCallback(() => setIdx(i => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setIdx(i => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    const fn = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose, prev, next]);

  return createPortal(
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.92)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(6px)" }}>
      <div onClick={e => e.stopPropagation()} style={{ position: "relative", width: "100%", maxWidth: "90vw", maxHeight: "90vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src={images[idx]} alt={`${name} — фото ${idx + 1}`}
          decoding="async" style={{ maxWidth: "100%", maxHeight: "85vh", objectFit: "contain", display: "block", userSelect: "none" }} />

        {images.length > 1 && (
          <button onClick={e => { e.stopPropagation(); prev(); }} aria-label="Попереднє"
            style={{ position: "absolute", left: "8px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", width: "44px", height: "44px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.7, transition: "opacity 0.2s", filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.8))" }}
            onMouseEnter={e => e.currentTarget.style.opacity = "1"}
            onMouseLeave={e => e.currentTarget.style.opacity = "0.7"}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M15 19l-7-7 7-7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        )}

        {images.length > 1 && (
          <button onClick={e => { e.stopPropagation(); next(); }} aria-label="Наступне"
            style={{ position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", width: "44px", height: "44px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.7, transition: "opacity 0.2s", filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.8))" }}
            onMouseEnter={e => e.currentTarget.style.opacity = "1"}
            onMouseLeave={e => e.currentTarget.style.opacity = "0.7"}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M9 5l7 7-7 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        )}

        {images.length > 1 && (
          <div style={{ position: "absolute", bottom: "-28px", left: 0, right: 0, display: "flex", justifyContent: "center", gap: "6px" }}>
            {images.map((_, i) => (
              <button key={i} onClick={e => { e.stopPropagation(); setIdx(i); }}
                style={{ width: i === idx ? "18px" : "6px", height: "6px", borderRadius: "3px", background: i === idx ? C.red : "rgba(255,255,255,0.3)", border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s" }} />
            ))}
          </div>
        )}
      </div>

      <button onClick={onClose} aria-label="Закрити"
        style={{ position: "fixed", top: "20px", right: "24px", background: "none", border: "none", width: "44px", height: "44px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.6, transition: "opacity 0.2s" }}
        onMouseEnter={e => e.currentTarget.style.opacity = "1"}
        onMouseLeave={e => e.currentTarget.style.opacity = "0.6"}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2 2l16 16M18 2L2 18" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
      </button>
    </div>,
    document.body
  );
}
