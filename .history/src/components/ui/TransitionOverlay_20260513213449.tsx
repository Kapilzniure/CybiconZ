import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

let transitionCallback: ((direction: 'out' | 'in') => void) | null = null;

export function triggerTransition(onWipeComplete?: () => void) {
  const panel = document.querySelector('[data-transition-panel]') as HTMLElement;
  const line = document.querySelector('[data-transition-line]') as HTMLElement;

  if (!panel || !line) return;

  const tl = gsap.timeline();

  // TRANSITION OUT
  tl.to(
    line,
    { width: '100%', duration: 0.3, ease: 'power3.in' },
    0
  ).to(
    panel,
    { x: '0%', duration: 0.4, ease: 'power3.in' },
    0.15
  );

  // At t=400ms, call the callback (route change happens here)
  tl.call(() => {
    if (onWipeComplete) onWipeComplete();
    // Scroll to top while screen is covered
    window.scrollTo(0, 0);
  }, [], 0.4);
}

export function triggerTransitionIn() {
  const panel = document.querySelector('[data-transition-panel]') as HTMLElement;
  const line = document.querySelector('[data-transition-line]') as HTMLElement;

  if (!panel || !line) return;

  const tl = gsap.timeline();

  // TRANSITION IN
  tl.to(
    panel,
    { x: '100%', duration: 0.5, ease: 'power3.out' },
    0.1
  ).to(
    line,
    { opacity: 0, duration: 0.2, ease: 'power1.out' },
    0.2
  );
}

export function TransitionOverlay() {
  const panelRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize elements off-screen
    gsap.set(panelRef.current, { x: '-100%' });
    gsap.set(lineRef.current, { width: '0%', opacity: 1 });
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        pointerEvents: 'none',
      }}
    >
      {/* Wipe panel */}
      <div
        ref={panelRef}
        data-transition-panel
        style={{
          position: 'absolute',
          inset: 0,
          background: '#020408',
          x: '-100%',
        }}
      />

      {/* Brand line */}
      <div
        ref={lineRef}
        data-transition-line
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          height: 3,
          background: '#00C4FF',
          width: 0,
          opacity: 1,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
