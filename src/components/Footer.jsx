import C from "../constants/colors.js";

const PHONE_DISPLAY = "+38 098 537 87 17";
const PHONE = "+380985378717";
const MAPS_URL = "https://www.google.com/maps/search/Першотравнева+9Б+Кам'янець-Подільський";
const BOOKING_URL = "https://www.booking.com/hotel/ua/red-cube.uk.html";

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const navLinks = [
  ["Про нас", "about"],
  ["Номери", "rooms"],
  ["Простір", "dining"],
  ["Зручності", "amenities"],
  ["Галерея", "gallery"],
  ["Відгуки", "reviews"],
  ["Контакти", "contacts"],
];

export default function Footer() {
  return (
    <footer style={{ background: C.surface, borderTop: `1px solid ${C.redBorder}` }}>
      <div style={{ maxWidth: "920px", margin: "0 auto", padding: "clamp(40px,7vw,72px) clamp(20px,5vw,64px) clamp(32px,5vw,56px)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "clamp(32px,5vw,56px)" }}>

        {/* Brand */}
        <div>
          <div
            onClick={() => document.getElementById("rc-scroll")?.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ fontSize: "18px", fontFamily: "'Playfair Display',serif", color: C.text, fontWeight: "700", letterSpacing: "0.04em", cursor: "pointer", display: "inline-block", marginBottom: "14px" }}>
            R<span style={{ fontSize: "10px", color: C.muted, letterSpacing: "0.22em", marginLeft: "6px", fontFamily: "'DM Mono',monospace", fontWeight: "400" }}>CUBE</span>
          </div>
          <p style={{ fontSize: "12px", color: C.muted, lineHeight: 1.75, marginBottom: "18px" }}>
            Готель нового формату<br />у серці Кам'янець-Подільського
          </p>
          <div style={{ display: "flex", gap: "12px" }}>
            {[["IG", "#"], ["BK", BOOKING_URL], ["GM", MAPS_URL]].map(([label, href], i) => (
              <a key={i} href={href} target={href !== "#" ? "_blank" : undefined} rel="noreferrer"
                style={{ width: "28px", height: "28px", border: `1px solid ${C.redBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "8px", letterSpacing: "0.1em", color: C.muted, fontFamily: "'DM Mono',monospace", textDecoration: "none", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.red; e.currentTarget.style.color = C.red; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.redBorder; e.currentTarget.style.color = C.muted; }}>{label}</a>
            ))}
          </div>
        </div>

        {/* Навігація */}
        <div>
          <div style={{ fontSize: "9px", letterSpacing: "0.28em", color: C.red, fontFamily: "'DM Mono',monospace", marginBottom: "18px" }}>НАВІГАЦІЯ</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {navLinks.map(([label, id], i) => (
              <a key={i} href={`#${id}`}
                onClick={e => { e.preventDefault(); scrollTo(id); }}
                style={{ fontSize: "11px", color: C.muted, textDecoration: "none", fontFamily: "'DM Mono',monospace", letterSpacing: "0.08em", transition: "color 0.2s", cursor: "pointer" }}
                onMouseEnter={e => e.target.style.color = C.text}
                onMouseLeave={e => e.target.style.color = C.muted}>{label}</a>
            ))}
          </div>
        </div>

        {/* Контакти */}
        <div>
          <div style={{ fontSize: "9px", letterSpacing: "0.28em", color: C.red, fontFamily: "'DM Mono',monospace", marginBottom: "18px" }}>КОНТАКТИ</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <a href={`tel:${PHONE}`}
              style={{ fontSize: "13px", color: C.muted, textDecoration: "none", fontFamily: "'DM Mono',monospace", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = C.text}
              onMouseLeave={e => e.target.style.color = C.muted}>{PHONE_DISPLAY}</a>
            <a href={MAPS_URL} target="_blank" rel="noreferrer"
              style={{ fontSize: "12px", color: C.muted, lineHeight: 1.65, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = C.text}
              onMouseLeave={e => e.currentTarget.style.color = C.muted}>
              вул. Першотравнева 9Б<br />Кам'янець-Подільський
            </a>
            <div style={{ fontSize: "11px", color: C.muted, fontFamily: "'DM Mono',monospace" }}>
              <span style={{ color: "rgba(200,16,46,0.6)" }}>▸</span> Заїзд з 14:00
            </div>
            <div style={{ fontSize: "11px", color: C.muted, fontFamily: "'DM Mono',monospace" }}>
              <span style={{ color: "rgba(200,16,46,0.6)" }}>▸</span> Виїзд до 11:00
            </div>
            <div style={{ fontSize: "11px", color: C.muted, fontFamily: "'DM Mono',monospace" }}>
              <span style={{ color: "rgba(200,16,46,0.6)" }}>▸</span> Стійка 24/7
            </div>
          </div>
        </div>

      </div>

      {/* Copyright bar */}
      <div style={{ borderTop: `1px solid rgba(200,16,46,0.1)`, padding: "16px clamp(20px,5vw,64px)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
        <span style={{ fontSize: "10px", color: "rgba(106,101,96,0.5)", fontFamily: "'DM Mono',monospace" }}>© 2025 Red Cube Hotel</span>
        <span style={{ fontSize: "10px", color: "rgba(106,101,96,0.35)", fontFamily: "'DM Mono',monospace", letterSpacing: "0.08em" }}>9.3 · BOOKING.COM · 715 ВІДГУКІВ</span>
      </div>
    </footer>
  );
}
