import { useState, useEffect } from "react";
import C from "../constants/colors.js";

const INSTAGRAM = "https://www.instagram.com/red_cube_hotel/";

const links = [
  { label: "Номери", id: "rooms", icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  )},
  { label: "Простір", id: "dining", icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
    </svg>
  )},
  { label: "Галерея", id: "gallery", icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
    </svg>
  )},
  { label: "Відгуки", id: "reviews", icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
    </svg>
  )},
  { label: "Контакти", id: "contacts", icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  )},
  { label: "Instagram", href: INSTAGRAM, icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  )},
];

const scrollTo = (id) => {
  const container = document.getElementById("rc-scroll");
  const el = document.getElementById(id);
  if (!container || !el) return;
  const containerTop = container.getBoundingClientRect().top;
  const elTop = el.getBoundingClientRect().top;
  container.scrollBy({ top: elTop - containerTop - 8, behavior: "smooth" });
};

export default function MobileNav() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const container = document.getElementById("rc-scroll");
    if (!container) return;
    const sections = links.filter(l => l.id).map(l => document.getElementById(l.id)).filter(Boolean);

    const fn = () => {
      const scrollMid = container.scrollTop + container.clientHeight / 2;
      let current = null;
      for (const sec of sections) {
        if (sec.offsetTop <= scrollMid) current = sec.id;
      }
      setActive(current);
    };
    container.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => container.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 200,
      background: "rgba(12,12,12,0.96)",
      backdropFilter: "blur(16px)",
      borderTop: `1px solid ${C.redBorder}`,
      display: "flex",
      alignItems: "stretch",
      height: "58px",
    }} className="mobile-nav">
      {links.map((link, i) => {
        const isActive = active === link.id;
        const content = (
          <>
            <span style={{
              color: isActive ? C.red : C.muted,
              transition: "color 0.2s, transform 0.2s",
              transform: isActive ? "translateY(-1px)" : "translateY(0)",
              display: "block",
            }}>{link.icon}</span>
            <span style={{
              fontSize: "8px",
              letterSpacing: "0.08em",
              color: isActive ? C.red : C.muted,
              fontFamily: "'DM Mono',monospace",
              textTransform: "uppercase",
              transition: "color 0.2s",
              marginTop: "3px",
              lineHeight: 1,
            }}>{link.label}</span>
            {isActive && (
              <span style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "24px",
                height: "1px",
                background: C.red,
                boxShadow: `0 0 6px ${C.red}`,
              }} />
            )}
          </>
        );

        const sharedStyle = {
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "6px 0",
          textDecoration: "none",
          WebkitTapHighlightColor: "transparent",
        };

        if (link.href) {
          return (
            <a key={i} href={link.href} target="_blank" rel="noreferrer" style={sharedStyle}>
              {content}
            </a>
          );
        }
        return (
          <button key={i} onClick={() => scrollTo(link.id)} style={sharedStyle}>
            {content}
          </button>
        );
      })}
    </nav>
  );
}
