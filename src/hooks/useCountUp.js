import { useEffect, useRef, useState } from 'react';

// Animates 0 -> target once `start` becomes true. Snaps instantly for
// prefers-reduced-motion instead of skipping the final value.
export function useCountUp(target, { start = false, duration = 1200 } = {}) {
  const [value, setValue] = useState(0);
  const frameRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!start || startedRef.current) return;
    startedRef.current = true;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return;
    }

    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [start, target, duration]);

  return value;
}
