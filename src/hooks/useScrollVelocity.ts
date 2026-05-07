import { useEffect, useRef, useState } from "react";

export function useScrollVelocity(): number {
  const [velocity, setVelocity] = useState(0);
  const lastY = useRef(window.scrollY);
  const lastTime = useRef(performance.now());
  const rafId = useRef<number>(0);
  const velRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const now = performance.now();
      const dy = window.scrollY - lastY.current;
      const dt = now - lastTime.current;
      if (dt > 0) {
        velRef.current = Math.abs(dy) / dt * 10;
      }
      lastY.current = window.scrollY;
      lastTime.current = now;
    };

    const tick = () => {
      velRef.current *= 0.92;
      setVelocity(velRef.current);
      rafId.current = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return velocity;
}
