import { useEffect, useRef, useState } from "react";

/* Tween a number toward its target whenever the target changes.
   Shared by the ROI calculator, the sample-report KPIs and the agency-loop
   stats — one rAF loop, cubic ease-out, reduced-motion safe. */
export function useTween(target, { duration = 480 } = {}) {
  const [val, setVal] = useState(target);
  const fromRef = useRef(target);

  useEffect(() => {
    const from = fromRef.current;
    if (from === target) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      fromRef.current = target;
      setVal(target);
      return undefined;
    }
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const next = from + (target - from) * eased;
      setVal(next);
      if (p < 1) raf = requestAnimationFrame(tick);
      else fromRef.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      fromRef.current = target;
    };
  }, [target, duration]);

  return val;
}

export default useTween;
