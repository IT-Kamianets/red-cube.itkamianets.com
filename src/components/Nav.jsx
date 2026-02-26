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
  const [open, setOpen] = useState(false);
  const [logoHover, setLogoHover] = useState(false);

  useEffect(() => {
    const el = document.getElementById("rc-scroll");
    if (!el) return;
    const fn = () => setScrolled(el.scrollTop > 60);
    el.addEventListener("scroll", fn);
    return () => el.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (!open) return;
    const el = document.getElementById("rc-scroll");
    const fn = () => setOpen(false);
    el?.addEventListener("scroll", fn);
    return () => el?.removeEventListener("scroll", fn);
  }, [open]);

  const handleLink = (id) => {
    setOpen(false);
    setTimeout(() => scrollTo(id), 10);
  };

  return (
    <>
      <nav style={{ position: "sticky", top: 0, zIndex: 100, padding: "14px clamp(20px,5vw,64px)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", background: scrolled || open ? "rgba(14,14,14,0.96)" : "transparent", borderBottom: scrolled || open ? "1px solid " + C.redBorder : "1px solid transparent", backdropFilter: scrolled || open ? "blur(14px)" : "none", transition: "all 0.4s ease" }}>
        <div
          onClick={() => { setOpen(false); document.getElementById("rc-scroll")?.scrollTo({ top: 0, behavior: "smooth" }); }}
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

        <button className="nav-burger" onClick={() => setOpen(o => !o)}
          style={{ flexDirection: "column", gap: "5px", background: "none", border: "none", cursor: "pointer", padding: "4px", flexShrink: 0 }}>
          <span style={{ display: "block", width: "22px", height: "1px", background: C.text, transition: "all 0.3s", transform: open ? "translateY(6px) rotate(45deg)" : "none" }} />
          <span style={{ display: "block", width: "22px", height: "1px", background: C.text, transition: "all 0.3s", opacity: open ? 0 : 1 }} />
          <span style={{ display: "block", width: "22px", height: "1px", background: C.text, transition: "all 0.3s", transform: open ? "translateY(-6px) rotate(-45deg)" : "none" }} />
        </button>
      </nav>

      <div className="nav-mobile-menu" style={{ position: "fixed", top: "49px", left: 0, right: 0, zIndex: 99, background: "rgba(14,14,14,0.97)", backdropFilter: "blur(14px)", borderBottom: "1px solid " + C.redBorder, flexDirection: "column", padding: "20px clamp(20px,5vw,64px) 28px", gap: "0", opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none", transition: "opacity 0.25s ease" }}>
        {links.map(([label, id], i) => (
          <a key={i} href={"#" + id}
            onClick={e => { e.preventDefault(); handleLink(id); }}
            style={{ fontSize: "11px", letterSpacing: "0.2em", color: C.muted, textTransform: "uppercase", fontFamily: "'DM Mono',monospace", textDecoration: "none", padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = C.text}
            onMouseLeave={e => e.currentTarget.style.color = C.muted}>{label}</a>
        ))}
      </div>
    </>
  );
}
