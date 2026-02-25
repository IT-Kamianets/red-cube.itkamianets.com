import { useState, useEffect } from "react";
import C from "../constants/colors.js";

const links = [
  ["Про нас", "about"],
  ["Номери", "rooms"],
  ["Простір", "dining"],
  ["Зручності", "amenities"],
  ["Галерея", "gallery"],
  ["Відгуки", "reviews"],
  ["Контакти", "contacts"],
];

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const el = document.getElementById("rc-scroll");
    if (!el) return;
    const fn = () => setScrolled(el.scrollTop > 60);
    el.addEventListener("scroll", fn);
    return () => el.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 100, padding: "14px clamp(20px,5vw,64px)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", background: scrolled ? "rgba(14,14,14,0.96)" : "transparent", borderBottom: scrolled ? `1px solid ${C.redBorder}` : "1px solid transparent", backdropFilter: scrolled ? "blur(14px)" : "none", transition: "all 0.4s ease" }}>
      <div
        onClick={() => document.getElementById("rc-scroll")?.scrollTo({ top: 0, behavior: "smooth" })}
        style={{ fontSize: "18px", fontFamily: "'Playfair Display',serif", color: C.text, fontWeight: "700", letterSpacing: "0.04em", cursor: "pointer", flexShrink: 0 }}>
        R<span style={{ fontSize: "10px", color: C.muted, letterSpacing: "0.22em", marginLeft: "6px", fontFamily: "'DM Mono',monospace", fontWeight: "400" }}>CUBE</span>
      </div>
      <div style={{ display: "flex", gap: "clamp(10px,1.6vw,22px)", flexWrap: "wrap", justifyContent: "flex-end" }}>
        {links.map(([label, id], i) => (
          <a key={i} href={`#${id}`}
            onClick={e => { e.preventDefault(); scrollTo(id); }}
            style={{ fontSize: "9px", letterSpacing: "0.14em", color: C.muted, textTransform: "uppercase", fontFamily: "'DM Mono',monospace", textDecoration: "none", transition: "color 0.2s, border-color 0.2s", cursor: "pointer", whiteSpace: "nowrap", borderBottom: "1px solid transparent", paddingBottom: "2px" }}
            onMouseEnter={e => { e.currentTarget.style.color = C.text; e.currentTarget.style.borderBottomColor = C.red; }}
            onMouseLeave={e => { e.currentTarget.style.color = C.muted; e.currentTarget.style.borderBottomColor = "transparent"; }}>{label}</a>
        ))}
      </div>
    </nav>
  );
}
