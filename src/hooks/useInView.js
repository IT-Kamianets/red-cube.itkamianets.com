import { useState, useEffect, useRef } from "react";

/**
 * Fires once when the ref element is sufficiently visible inside #rc-scroll.
 * threshold — fraction of element that must be visible (default 0.3)
 */
export default function useInView(threshold = 0.3) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    // Use the scroll container as root so we measure against the real viewport
    const root = document.getElementById("rc-scroll");
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      {
        root,
        // trim 10% from bottom — element must scroll clearly into view
        rootMargin: "0px 0px -10% 0px",
        threshold,
      }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
}
