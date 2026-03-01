import C from "../constants/colors.js";
import styles from "./Footer.module.css";

const PHONE_DISPLAY = "+38 098 537 87 17";
const PHONE = "+380985378717";
const MAPS_URL = "https://www.google.com/maps/search/Першотравнева+9Б+Кам'янець-Подільський";
const BOOKING_URL = "https://www.booking.com/hotel/ua/red-cube-kamianets-39-podil-39-s-39-kyi1.uk.html";

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

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const BookingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M5.5 4h5.5c4.5 0 6.5 2 6.5 5 0 1.9-1.2 3.5-3 4.3 2.5 0.5 4.5 2.4 4.5 5.2 0 3-2.5 5.5-7 5.5H5.5V4Zm4.5 7h1c2 0 3-.8 3-2.5S13 6 11 6h-1v5Zm0 9h1.5c2.5 0 3.5-1 3.5-3.2 0-2.2-1.5-3.3-3.5-3.3H10v6.5Z" />
    <circle cx="21" cy="20.5" r="2.5" />
  </svg>
);

const MapsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

export default function Footer() {
  return (
    <footer
      className={styles.footer}
      id="contacts"
      style={{
        '--c-bg': C.surface,
        '--c-text': C.text,
        '--c-red': C.red,
        '--c-muted': C.muted,
        '--c-border': C.redBorder,
        '--c-red-glow': C.redGlow
      }}
    >
      <div className={styles.noiseOverlay}></div>
      <div className={styles.ambientGlow}></div>

      <div className={styles.container}>
        {/* Massive Branding Side */}
        <div className={styles.brandSection}>
          <div
            className={styles.logoGiant}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            R<span className={styles.logoSup}>CUBE</span>
          </div>
          <p className={styles.brandSubtitle}>
            Готель нового формату<br />у серці Кам'янець-Подільського
          </p>

          <div className={styles.socials}>
            {[
              [<InstagramIcon key="ig" />, "https://www.instagram.com/red_cube_hotel/"],
              [<BookingIcon key="bk" />, BOOKING_URL],
              [<MapsIcon key="gm" />, MAPS_URL]
            ].map(([icon, href], i) => (
              <a key={i} href={href} target="_blank" rel="noreferrer" aria-label={["Instagram", "Booking.com", "Google Maps"][i]} className={styles.socialLink}>
                <span className={styles.socialCorner1}></span>
                <span className={styles.socialCorner2}></span>
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Info Grid Side */}
        <div className={styles.infoSection}>
          <div className={styles.navBlock}>
            <div className={styles.blockTitle}>[НАВІГАЦІЯ]</div>
            <nav className={styles.navGrid}>
              {navLinks.map(([label, id], i) => (
                <a key={i} href={`#${id}`} onClick={e => { e.preventDefault(); scrollTo(id); }} className={styles.navLink}>
                  <span className={styles.linkMarker}></span>
                  <span className={styles.linkLabel}>{label}</span>
                </a>
              ))}
            </nav>
          </div>

          <div className={styles.contactBlock}>
            <div className={styles.blockTitle}>[КОНТАКТИ]</div>
            <div className={styles.contactList}>
              <a href={`tel:${PHONE}`} className={styles.contactItemMain}>{PHONE_DISPLAY}</a>
              <a href={MAPS_URL} target="_blank" rel="noreferrer" className={styles.contactItemMain}>
                вул. Першотравнева 9Б<br />Кам'янець-Подільський
              </a>
              <div className={styles.rulesList}>
                <div className={styles.ruleItem}>
                  <span className={styles.ruleIcon}>&#9642;</span> ЗАЇЗД З 14:00
                </div>
                <div className={styles.ruleItem}>
                  <span className={styles.ruleIcon}>&#9642;</span> ВИЇЗД ДО 11:00
                </div>
                <div className={styles.ruleItem}>
                  <span className={styles.ruleIcon}>&#9642;</span> СТІЙКА 24/7
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.copyright}>© {new Date().getFullYear()} RED CUBE HOTEL</div>
        <div className={styles.rating}>9.3 <span className={styles.dot}>·</span> BOOKING.COM <span className={styles.dot}>·</span> 715 ВІДГУКІВ</div>
      </div>
    </footer>
  );
}
