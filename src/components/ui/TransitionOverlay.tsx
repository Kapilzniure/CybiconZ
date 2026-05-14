import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Module-level ref store — TransitionOverlay registers its elements here on mount
// so triggerTransition/triggerTransitionIn can access them without document.querySelector
const transitionRefs = {
  panel: null as HTMLElement | null,
  line:  null as HTMLElement | null,
};

export function registerTransitionRefs(
  panel: HTMLElement | null,
  line:  HTMLElement | null,
) {
  transitionRefs.panel = panel;
  transitionRefs.line  = line;
}

/**
 * TRANSITION OUT
 *
 * t=0ms   Instant reset: panel to x:-100%, line clip-path fully hidden
 * t=0ms   Brand line reveals: clip-path inset(0 100% 0 0) → inset(0 0% 0 0), 400ms
 * t=280ms Panel wipes in: x -100% → 0%, 500ms ease power3.inOut
 * t=680ms onWipeComplete fires (screen visually covered at eased ~99%)
 */
export function triggerTransition(onWipeComplete?: () => void) {
  const { panel, line } = transitionRefs;
  if (!panel || !line) return;

  // Signal transition start
  window.dispatchEvent(new CustomEvent('transition:start'));

  const tl = gsap.timeline();

  // Instant resets — no animation, just position
  tl.set(panel, { x: '-100%', opacity: 1 }, 0);
  tl.set(line,  { clipPath: 'inset(0 100% 0 0)', opacity: 1 }, 0);

  // Brand line sweeps across
  tl.to(line, {
    clipPath: 'inset(0 0% 0 0)',
    duration: 0.4,
    ease: 'power2.inOut',
  }, 0);

  // Panel wipes in
  tl.to(panel, {
    x: '0%',
    duration: 0.5,
    ease: 'power3.inOut',
  }, 0.28);

  // Callback at 680ms — screen visually covered, safe to swap content
  tl.call(() => { if (onWipeComplete) onWipeComplete(); }, [], 0.68);
}

/**
 * TRANSITION IN
 *
 * t=0ms   Page content hidden (opacity 0, y 20)
 * t=0ms   Panel slides out: x 0% → 100%, 550ms ease power3.out
 * t=150ms Brand line fades: opacity 1 → 0, 300ms
 * t=300ms Page reveals: opacity 0→1, y 20→0, 600ms ease power2.out
 * t=550ms Panel snaps back to x:-100% (ready for next nav)
 */
export function triggerTransitionIn(
  pageRef:    HTMLElement | null,
  onComplete?: () => void,
) {
  const { panel, line } = transitionRefs;
  if (!panel || !line) return;

  const tl = gsap.timeline({
    onComplete: () => {
      window.dispatchEvent(new CustomEvent('transition:end'));
      if (onComplete) onComplete();
    }
  });

  // Hide page content instantly before reveal
  if (pageRef) tl.set(pageRef, { opacity: 0, y: 20 }, 0);

  // Panel exits right
  tl.to(panel, {
    x: '100%',
    duration: 0.55,
    ease: 'power3.out',
  }, 0);

  // Brand line fades
  tl.to(line, {
    opacity: 0,
    duration: 0.3,
    ease: 'power1.out',
  }, 0.15);

  // Page content reveals
  if (pageRef) {
    tl.to(pageRef, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
    }, 0.3);
  }

  // Snap panel back off-screen-left once it's fully off-screen-right
  tl.set(panel, { x: '-100%' }, 0.55);

  // Signal caller that the full reveal is done
  if (onComplete) tl.call(onComplete, [], 0.9);
}

export function TransitionOverlay() {
  const panelRef = useRef<HTMLDivElement>(null);
  const lineRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register refs so triggerTransition can reach them without querySelector
    registerTransitionRefs(panelRef.current, lineRef.current);

    // Set initial static states
    if (panelRef.current) gsap.set(panelRef.current, { x: '-100%' });
    if (lineRef.current)  gsap.set(lineRef.current,  { clipPath: 'inset(0 100% 0 0)', opacity: 1 });

    return () => registerTransitionRefs(null, null);
  }, []);

  return (
    <div
      style={{
        position:      'fixed',
        inset:         0,
        zIndex:        200,
        pointerEvents: 'none',
      }}
    >
      {/* Wipe panel */}
      <div
        ref={panelRef}
        data-transition-panel
        style={{
          position:   'absolute',
          inset:      0,
          // Cinematic: subtle off-black radial, not flat black
          background: 'radial-gradient(ellipse at 30% 50%, rgba(4,4,16,1) 0%, #020408 100%)',
          willChange: 'transform',
          overflow:   'hidden',
        }}
      >
        {/* Edge glow — travels with the panel, makes wipe feel like a light sweep */}
        <div
          style={{
            position:   'absolute',
            right:      0,
            top:        0,
            bottom:     0,
            width:      '40px',
            background: 'linear-gradient(to right, transparent, rgba(79,70,229,0.4))',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Brand line — gradient, revealed via clip-path */}
      <div
        ref={lineRef}
        data-transition-line
        style={{
          position:      'absolute',
          top:           '50%',
          left:          0,
          transform:     'translateY(-50%)',
          height:        '3px',
          width:         '100%',
          background:    'linear-gradient(to right, #4F46E5, #00C4FF, #39FF14)',
          clipPath:      'inset(0 100% 0 0)',
          opacity:       1,
          pointerEvents: 'none',
          willChange:    'clip-path, opacity',
        }}
      />
    </div>
  );
}
