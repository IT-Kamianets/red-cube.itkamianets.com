export default function Slide({ inView, delay = 0, children, style = {} }) {
  return (
    <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.7s ease ${delay}s,transform 0.7s ease ${delay}s`, ...style }}>
      {children}
    </div>
  );
}
