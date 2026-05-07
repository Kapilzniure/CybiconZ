import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const text = textRef.current;
    if (!el || !text) return;

    const letters = 'CybiconZ'.split('');
    text.innerHTML = letters
      .map(l => `<span style="display:inline-block;opacity:0;transform:translateY(15px);">${l}</span>`)
      .join('');

    const spans = text.querySelectorAll('span');

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(el, {
          yPercent: -100,
          duration: 0.9,
          ease: 'power3.inOut',
          onComplete: () => {
            onComplete();
            if (el) el.style.display = 'none';
          },
        });
      },
    });

    tl.to(spans, {
      opacity: 1,
      y: 0,
      duration: 0.04,
      stagger: 0.07,
      ease: 'power2.out',
    });
    tl.to({}, { duration: 0.8 });
    tl.to(spans, {
      opacity: 0,
      y: -15,
      duration: 0.3,
      stagger: 0.03,
      ease: 'power2.in',
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#050507',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        ref={textRef}
        className="font-display font-extrabold text-white"
        style={{ fontSize: 'clamp(40px, 7vw, 80px)', letterSpacing: '-0.04em' }}
      />
      <div
        style={{
          marginTop: 32,
          width: 200,
          height: 1,
          background: 'rgba(255,255,255,0.08)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            background: '#4F46E5',
            animation: 'preloaderBar 2s cubic-bezier(0.65,0,0.35,1) forwards',
          }}
        />
      </div>
    </div>
  );
}