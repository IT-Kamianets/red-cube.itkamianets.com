import C from "./constants/colors.js";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Stats from "./components/Stats.jsx";
import About from "./components/About.jsx";
import Rooms from "./components/Rooms/index.jsx";
import Dining from "./components/Dining.jsx";
import Amenities from "./components/Amenities.jsx";
import Gallery from "./components/Gallery.jsx";
import Reviews from "./components/Reviews.jsx";
import Contacts from "./components/Contacts.jsx";
import ScrollTopBtn from "./components/ui/ScrollTopBtn.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <div id="rc-scroll" style={{ background: C.bg, color: C.text, fontFamily: "Inter,sans-serif", height: "100vh", overflowY: "auto", overflowX: "hidden" }}>
      <style>{`
        *{margin:0;padding:0;box-sizing:border-box;}
        @keyframes pulse{0%,100%{opacity:0.3}50%{opacity:1}}
        @keyframes floatUp{
          0%{transform:translateY(0) scale(1);opacity:0.15}
          80%{opacity:0}
          100%{transform:translateY(-55vh) scale(0.4);opacity:0}
        }
        @keyframes cornerPulse{
          0%,100%{opacity:0.2;box-shadow:0 0 3px rgba(200,16,46,0.2)}
          50%{opacity:0.6;box-shadow:0 0 8px rgba(200,16,46,0.5)}
        }
        ::selection{background:#C8102E;color:#fff;}
        #rc-scroll::-webkit-scrollbar{width:4px;}
        #rc-scroll::-webkit-scrollbar-track{background:rgba(14,14,14,0.8);}
        #rc-scroll::-webkit-scrollbar-thumb{background:#C8102E;border-radius:0;}
        #rc-scroll::-webkit-scrollbar-thumb:hover{background:#e01535;box-shadow:0 0 8px rgba(200,16,46,0.7);}
        #rc-scroll{scrollbar-width:thin;scrollbar-color:#C8102E rgba(14,14,14,0.8);}
        /* Мобільний nav */
        .nav-burger{display:none;}
        .nav-mobile-menu{display:none;}
        @media(max-width:640px){
          .nav-links{display:none!important;}
          .nav-burger{display:flex!important;}
          .nav-mobile-menu{display:flex!important;}
        }
        /* Галерея на мобільному — 2 колонки */
        @media(max-width:600px){
          .gallery-grid{grid-template-columns:repeat(2,1fr)!important;}
        }
        /* Кімнати — фото зверху на мобільному */
        @media(max-width:560px){
          .room-row{flex-direction:column!important;}
          .room-photo{flex:0 0 200px!important;min-height:200px!important;}
        }
      `}</style>
      <Nav />
      <Hero />
      <Stats />
      <About />
      <Rooms />
      <Dining />
      <Amenities />
      <Gallery />
      <Reviews />
      <Contacts />
      <ScrollTopBtn />
      <Footer />
    </div>
  );
}
