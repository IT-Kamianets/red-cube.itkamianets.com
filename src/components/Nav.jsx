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
  const [logoHover, setLogoHover] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 100, padding: "14px clamp(20px,5vw,64px)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", background: scrolled ? "rgba(14,14,14,0.96)" : "transparent", borderBottom: scrolled ? "1px solid " + C.redBorder : "1px solid transparent", backdropFilter: scrolled ? "blur(14px)" : "none", transition: "all 0.4s ease" }}>
      <div
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        onMouseEnter={() => setLogoHover(true)}
        onMouseLeave={() => setLogoHover(false)}
        style={{ display: "flex", alignItems: "baseline", gap: "8px", cursor: "pointer", flexShrink: 0 }}>
        <span style={{ fontSize: "22px", fontFamily: "'Playfair Display',serif", color: logoHover ? C.red : C.text, fontWeight: "700", transform: logoHover ? "scale(1.18)" : "scale(1)", transformOrigin: "left center", transition: "color 0.25s ease, transform 0.25s ease", display: "inline-block", textShadow: logoHover ? `0 0 20px rgba(200,16,46,0.6)` : "none" }}>R</span>
        <span style={{ fontSize: "10px", color: logoHover ? C.text : C.muted, letterSpacing: logoHover ? "0.28em" : "0.22em", fontFamily: "'DM Mono',monospace", fontWeight: "400", transition: "color 0.25s ease, letter-spacing 0.25s ease" }}>CUBE</span>
      </div>

      <div className="nav-links" style={{ display: "flex", gap: "clamp(10px,1.6vw,22px)", flexWrap: "wrap", justifyContent: "flex-end" }}>
        {links.map(([label, id], i) => (
          <a key={i} href={"#" + id}
            onClick={e => { e.preventDefault(); scrollTo(id); }}
            style={{ fontSize: "9px", letterSpacing: "0.14em", color: C.muted, textTransform: "uppercase", fontFamily: "'DM Mono',monospace", textDecoration: "none", transition: "color 0.2s, border-color 0.2s", cursor: "pointer", whiteSpace: "nowrap", borderBottom: "1px solid transparent", paddingBottom: "2px" }}
            onMouseEnter={e => { e.currentTarget.style.color = C.text; e.currentTarget.style.borderBottomColor = C.red; }}
            onMouseLeave={e => { e.currentTarget.style.color = C.muted; e.currentTarget.style.borderBottomColor = "transparent"; }}>{label}</a>
        ))}
      </div>
    </nav>
  );
}
