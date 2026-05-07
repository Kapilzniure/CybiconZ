import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

export function TransitionOverlay() {
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { opacity: 0.15 },
      { opacity: 0, duration: 0.5, ease: 'power2.out' }
    );
  }, [location.pathname]);

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#6D28D9',
        opacity: 0,
        pointerEvents: 'none',
        zIndex: 9000,
      }}
    />
  );
}