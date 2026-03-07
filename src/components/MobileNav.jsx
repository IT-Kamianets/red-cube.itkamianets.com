import { useState, useEffect } from "react";
import C from "../constants/colors.js";
import { scrollTo } from "../utils/scroll.js";

const PHONE = "tel:+380985378717";

const links = [
  { label: "Головна", top: true, icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  )},
  { label: "Номери", id: "rooms", icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="9" rx="1"/><rect x="3" y="14" width="4" height="7" rx="1"/><rect x="9" y="14" width="4" height="7" rx="1"/>
    </svg>
  )},
  { label: "Галерея", id: "gallery", icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
    </svg>
  )},
  { label: "Контакти", id: "contacts", icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  )},
  { label: "Дзвінок", href: PHONE, icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
    </svg>
  )},
];


export default function MobileNav() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const sections = links.filter(l => l.id).map(l => document.getElementById(l.id)).filter(Boolean);

    const fn = () => {
      const scrollMid = window.scrollY + window.innerHeight / 2;
      let current = null;
      for (const sec of sections) {
        if (sec.offsetTop <= scrollMid) current = sec.id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
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
              fontSize: "10px",
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

        if (link.top) {
          return (
            <button key={i} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={sharedStyle}>
              {content}
            </button>
          );
        }
        if (link.href) {
          const isExternal = link.href.startsWith("http");
          return (
            <a key={i} href={link.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noreferrer" : undefined}
              style={sharedStyle}>
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
