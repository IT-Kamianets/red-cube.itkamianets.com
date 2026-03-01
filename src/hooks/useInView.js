import { useState, useEffect, useRef } from "react";

/**
 * Fires once when the ref element is sufficiently visible inside #rc-scroll.
 * Disconnects the observer immediately after firing — no ongoing overhead.
 */
export default function useInView(threshold = 0.3) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (inView) return; // already triggered — skip creating observer
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect(); // one-shot — no need to keep observing
        }
      },
      { root: null, rootMargin: "0px 0px -10% 0px", threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold, inView]);

  return [ref, inView];
}
