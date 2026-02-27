import { useState, useEffect } from "react";
import C from "../constants/colors.js";
import useInView from "../hooks/useInView.js";
import NeonBorder from "./ui/NeonBorder.jsx";
import Slide from "./ui/Slide.jsx";
import Label from "./ui/Label.jsx";
import HotelMap from "./ui/HotelMap.jsx";

const MAPS_URL = "https://www.google.com/maps/search/Першотравнева+9Б+Кам'янець-Подільський";
const BOOKING_URL = "https://www.booking.com/hotel/ua/red-cube.uk.html";
const PHONE = "+380985378717";
const PHONE_DISPLAY = "+38 098 537 87 17";

export default function Contacts({ headingRef }) {
  const [ref, inView] = useInView(0.3);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 640);
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  return (
    <section id="contacts" ref={ref} style={{ background: C.bg, padding: "clamp(56px,9vw,112px) clamp(20px,5vw,64px)", borderTop: "1px solid " + C.redBorder }}>
      <div style={{ maxWidth: "920px", margin: "0 auto" }}>
        <div ref={headingRef}>
          <Slide inView={inView} style={{ marginBottom: "clamp(36px,5vw,56px)" }}>
            <Label n="07" text="Контакти" />
            <h2 style={{ fontSize: "clamp(28px,4.5vw,46px)", fontFamily: "'Playfair Display',serif", color: C.text, marginTop: "12px", fontWeight: "400" }}>Contacts</h2>
          </Slide>
        </div>

        <NeonBorder active={inView} delay="0.2s">
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "0" }}>

            <Slide inView={inView} delay={0.15} style={{ padding: "clamp(28px,4vw,48px)", display: "flex", flexDirection: "column", gap: "28px", borderRight: isMobile ? "none" : "1px solid " + C.redBorder, borderBottom: isMobile ? "1px solid " + C.redBorder : "none" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {[
                  { k: "Адреса", v: "вул. Першотравнева 9Б\nКам'янець-Подільський", href: MAPS_URL },
                  { k: "Телефон / WhatsApp / Viber", v: PHONE_DISPLAY, href: "tel:" + PHONE },
                  { k: "Заїзд / Виїзд", v: "з 14:00 / до 11:00" },
                  { k: "Стійка", v: "цілодобово" },
                  { k: "Оплата", v: "готівка" },
                ].map((item, i) => (
                  <div key={i}>
                    <span style={{ fontSize: "9px", letterSpacing: "0.25em", color: C.red, fontFamily: "'DM Mono',monospace", display: "block", marginBottom: "3px" }}>{item.k.toUpperCase()}</span>
                    {item.href ? (
                      <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                        style={{ fontSize: "13px", color: C.muted, lineHeight: 1.6, whiteSpace: "pre-line", textDecoration: "none", transition: "color 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.color = C.text}
                        onMouseLeave={e => e.currentTarget.style.color = C.muted}>{item.v}</a>
                    ) : (
                      <span style={{ fontSize: "13px", color: C.muted, lineHeight: 1.6, whiteSpace: "pre-line" }}>{item.v}</span>
                    )}
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "auto" }}>
                <a href={"https://wa.me/" + PHONE.replace("+", "")} target="_blank" rel="noreferrer"
                  style={{ display: "block", textAlign: "center", border: "1px solid " + C.red, color: C.red, padding: "12px 20px", fontSize: "10px", letterSpacing: "0.24em", textTransform: "uppercase", fontFamily: "'DM Mono',monospace", textDecoration: "none", transition: "all 0.3s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = C.red; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.red; }}>Написати в WhatsApp</a>
                <a href={BOOKING_URL} target="_blank" rel="noreferrer"
                  style={{ display: "block", textAlign: "center", background: C.red, color: "#fff", padding: "14px 20px", fontSize: "10px", letterSpacing: "0.24em", textTransform: "uppercase", fontFamily: "'DM Mono',monospace", textDecoration: "none", opacity: 1, transition: "opacity 0.3s" }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}>Забронювати на Booking</a>
                <div style={{ display: "flex", justifyContent: "center", gap: "16px", paddingTop: "4px" }}>
                  {[
                    { label: "Instagram", href: "#" },
                    { label: "Google Maps", href: MAPS_URL },
                    { label: "Booking.com", href: BOOKING_URL },
                  ].map((s, i) => (
                    <a key={i} href={s.href} target={s.href !== "#" ? "_blank" : undefined} rel="noreferrer"
                      style={{ fontSize: "9px", letterSpacing: "0.15em", color: C.muted, fontFamily: "'DM Mono',monospace", textDecoration: "none", borderBottom: "1px solid " + C.redBorder, paddingBottom: "2px", transition: "all 0.2s" }}
                      onMouseEnter={e => { e.target.style.color = C.red; e.target.style.borderColor = C.red; }}
                      onMouseLeave={e => { e.target.style.color = C.muted; e.target.style.borderColor = C.redBorder; }}>{s.label}</a>
                  ))}
                </div>
              </div>
            </Slide>

            <Slide inView={inView} delay={0.1} style={{ position: "relative", minHeight: isMobile ? "260px" : "360px" }}>
              <HotelMap />
            </Slide>

          </div>
        </NeonBorder>
      </div>
    </section>
  );
}
