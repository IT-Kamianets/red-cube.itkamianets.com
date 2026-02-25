import { useEffect, useRef } from "react";

const LAT = 48.6784;
const LNG = 26.5744;
const MAPS_URL = "https://www.google.com/maps/search/Першотравнева+9Б+Кам'янець-Подільський";

export default function HotelMap() {
  const containerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) return;

    import("leaflet").then((L) => {
      const Lf = L.default || L;

      const map = Lf.map(containerRef.current, {
        center: [LAT, LNG],
        zoom: 16,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
        dragging: false,
      });

      // темна тема з підписами вулиць
      Lf.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        maxZoom: 19,
      }).addTo(map);

      const icon = Lf.divIcon({
        html: `<div style="width:10px;height:10px;background:#C8102E;border-radius:50%;box-shadow:0 0 0 3px rgba(200,16,46,0.2),0 0 14px rgba(200,16,46,0.7);"></div>`,
        iconSize: [10, 10],
        iconAnchor: [5, 5],
        className: "",
      });

      Lf.marker([LAT, LNG], { icon })
        .addTo(map)
        .bindTooltip("Red Cube Hotel", {
          permanent: true,
          direction: "top",
          offset: [0, -10],
          className: "rc-map-tooltip",
        });

      mapRef.current = map;
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <a href={MAPS_URL} target="_blank" rel="noreferrer"
      style={{ display: "block", position: "relative", width: "100%", height: "100%", minHeight: "360px", cursor: "pointer" }}>
      <style>{`
        .leaflet-control-attribution { display: none !important; }
        .rc-map-tooltip {
          background: rgba(14,14,14,0.9) !important;
          border: 1px solid rgba(200,16,46,0.3) !important;
          border-radius: 0 !important;
          color: #C8102E !important;
          font-family: monospace !important;
          font-size: 9px !important;
          letter-spacing: 0.16em !important;
          padding: 4px 8px !important;
          box-shadow: none !important;
          white-space: nowrap !important;
        }
        .rc-map-tooltip::before { display: none !important; }
      `}</style>
      <div ref={containerRef} style={{ width: "100%", height: "100%", minHeight: "360px", background: "#0e0e0e", pointerEvents: "none" }} />
    </a>
  );
}
