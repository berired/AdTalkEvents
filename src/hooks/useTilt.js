import { useEffect, useRef } from 'react';

// Subtle pointer-driven tilt via CSS custom properties. Only attaches
// listeners on devices with a precise pointer + real hover, so touch
// devices never pay the mousemove cost and never get a stuck tilt.
export function useTilt({ max = 8 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let frame = null;

    const handleMove = (e) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        node.style.setProperty('--tilt-x', `${(-y * max).toFixed(2)}deg`);
        node.style.setProperty('--tilt-y', `${(x * max).toFixed(2)}deg`);
        frame = null;
      });
    };

    const reset = () => {
      node.style.setProperty('--tilt-x', '0deg');
      node.style.setProperty('--tilt-y', '0deg');
    };

    node.addEventListener('mousemove', handleMove);
    node.addEventListener('mouseleave', reset);

    return () => {
      node.removeEventListener('mousemove', handleMove);
      node.removeEventListener('mouseleave', reset);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [max]);

  return ref;
}
