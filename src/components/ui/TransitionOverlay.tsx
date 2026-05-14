import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * TRANSITION OUT sequence (when navigating away)
 * t=0ms: Brand line animates width 0%→100%, duration 300ms
 * t=150ms: Wipe panel slides in from left: x -100%→0%, duration 400ms
 * t=400ms: Fully covered
 */
export function triggerTransition(onWipeComplete?: () => void) {
  const panel = document.querySelector('[data-transition-panel]') as HTMLElement;
  const line = document.querySelector('[data-transition-line]') as HTMLElement;

  if (!panel || !line) return;

  const tl = gsap.timeline({
    onComplete: () => {
      if (onWipeComplete) onWipeComplete();
    }
  });

  // Reset states before starting
  tl.set(line, { width: '0%', opacity: 1 });
  tl.set(panel, { x: '-100%' });

  tl.to(
    line,
    { width: '100%', duration: 0.3, ease: 'power3.in' },
    0
  ).to(
    panel,
    { x: '0%', duration: 0.4, ease: 'power3.in' },
    0.15
  );
}

/**
 * TRANSITION IN sequence (new page loaded)
 * t=0ms: Page content is hidden (handled in PageWrapper or by set)
 * t=100ms: Wipe panel slides RIGHT off screen: x 0%→100%, duration 500ms
 * t=200ms: Brand line fades out (opacity 1→0, duration 200ms)
 * t=300ms: Page content fades in (handled in PageWrapper call)
 */
export function triggerTransitionIn(pageRef: HTMLElement | null) {
  const panel = document.querySelector('[data-transition-panel]') as HTMLElement;
  const line = document.querySelector('[data-transition-line]') as HTMLElement;

  if (!panel || !line) return;

  const tl = gsap.timeline();

  // Hide page content initially
  if (pageRef) {
    tl.set(pageRef, { opacity: 0, y: 16 });
  }

  tl.to(
    panel,
    { x: '100%', duration: 0.5, ease: 'power3.out' },
    0.1
  ).to(
    line,
    { opacity: 0, duration: 0.2, ease: 'power1.out' },
    0.2
  );

  if (pageRef) {
    tl.to(
      pageRef,
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      0.3
    );
  }

  // Final reset for next use
  tl.set(panel, { x: '-100%' });
}

export function TransitionOverlay() {
  const panelRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial static states
    if (panelRef.current) gsap.set(panelRef.current, { x: '-100%' });
    if (lineRef.current) gsap.set(lineRef.current, { width: '0%', opacity: 1 });
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
      {/* Wipe panel (Layer 1) */}
      <div
        ref={panelRef}
        data-transition-panel
        style={{
          position: 'absolute',
          inset: 0,
          background: '#020408',
          willChange: 'transform',
        }}
      />

      {/* Brand line (Layer 2) */}
      <div
        ref={lineRef}
        data-transition-line
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          transform: 'translateY(-50%)',
          height: '3px',
          background: '#00C4FF',
          width: '0%',
          opacity: 1,
          pointerEvents: 'none',
          willChange: 'width, opacity',
        }}
      />
    </div>
  );
}
