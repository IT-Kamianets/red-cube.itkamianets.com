import { useState, useEffect } from "react";

/**
 * Measures positions for red neon connector tails:
 *   - vertical line: from bottom of `boxRef` down to top of `nextHeadingRef`
 *   - horizontal line: from right of `boxRef` to right edge of `sectionRef`
 *
 * @param {React.RefObject} sectionRef  - the <section> element
 * @param {React.RefObject} boxRef      - the main content block (NeonBorder or card container)
 * @param {React.RefObject} nextHeadingRef - the <h2> of the NEXT section
 */
export default function useConnectorTails(sectionRef, boxRef, nextHeadingRef) {
    const [tails, setTails] = useState(null);

    useEffect(() => {
        const measure = () => {
            if (!sectionRef.current || !boxRef.current) return;

            const sRect = sectionRef.current.getBoundingClientRect();
            const bRect = boxRef.current.getBoundingClientRect();

            // how far down from box bottom to next heading top (spans padding between sections)
            let downH;
            if (nextHeadingRef && nextHeadingRef.current) {
                const nRect = nextHeadingRef.current.getBoundingClientRect();
                // distance from bottom of boxRef to top of next h2, in section-local coords
                downH = (nRect.top - sRect.top) - (bRect.bottom - sRect.top);
            } else {
                // fallback: fill rest of section
                downH = sRect.height - (bRect.bottom - sRect.top);
            }

            setTails({
                left: bRect.left - sRect.left,
                right: bRect.right - sRect.left,
                top: bRect.bottom - sRect.top,
                downH: Math.max(0, downH),
                rightW: sRect.width - (bRect.right - sRect.left),
            });
        };

        const raf = requestAnimationFrame(measure);
        const ro = new ResizeObserver(measure);
        if (sectionRef.current) ro.observe(sectionRef.current);
        if (boxRef.current) ro.observe(boxRef.current);
        if (nextHeadingRef && nextHeadingRef.current) ro.observe(nextHeadingRef.current);

        return () => { cancelAnimationFrame(raf); ro.disconnect(); };
    }, [sectionRef, boxRef, nextHeadingRef]);

    return tails;
}
