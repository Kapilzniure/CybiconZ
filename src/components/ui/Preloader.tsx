import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useLoadingManager } from '@/contexts/LoadingContext';

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { totalAssets, loadedAssets, isReady, forceReady } = useLoadingManager();

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes phraseAnim {
        0%, 25% { opacity: 1; transform: translateY(0); }
        30%, 100% { opacity: 0; transform: translateY(-10px); }
      }
      .phrase {
        position: absolute;
        width: 100%;
        text-align: center;
        opacity: 0;
        animation: phraseAnim 7.5s infinite;
      }
      .phrase-1 { animation-delay: 0s; }
      .phrase-2 { animation-delay: 2.5s; }
      .phrase-3 { animation-delay: 5s; }
    `;
    document.head.appendChild(style);

    const timer = setTimeout(() => {
      forceReady();
    }, 15000); // 15s max wait

    return () => {
      clearTimeout(timer);
      document.head.removeChild(style);
    };
  }, [forceReady]);

  useEffect(() => {
    if (!isReady) return;

    const el = ref.current;
    if (!el) return;

    gsap.to(el, {
      yPercent: -100,
      duration: 0.8,
      ease: 'power4.inOut',
      delay: 0.4, // Small pause at 100%
      onComplete: () => {
        onComplete();
        el.style.display = 'none';
      }
    });
  }, [isReady, onComplete]);

  const [scale, setScale] = useState(0);
  const [displayNum, setDisplayNum] = useState(0);

  useEffect(() => {
    // Start the CSS transition to 95%. This runs on the GPU and won't freeze during WebGL compile!
    const frame = requestAnimationFrame(() => setScale(0.95));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (isReady) setScale(1);
  }, [isReady]);

  // Fake the number counter in JS so it loosely matches the CSS bar
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      if (isReady) {
        setDisplayNum(100);
        clearInterval(interval);
      } else {
        // Asymptotically approach 95%
        current += (95 - current) * 0.1;
        setDisplayNum(Math.min(95, Math.round(current)));
      }
    }, 100);
    return () => clearInterval(interval);
  }, [isReady]);

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#060608',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="flex flex-col items-center w-full max-w-sm px-8">
        
        {/* Pure CSS rotating text */}
        <div className="h-8 relative w-full mb-8 flex justify-center overflow-hidden">
          <div className="phrase phrase-1 text-sm md:text-base text-[#E0E0E6] uppercase font-['Bricolage_Grotesque'] font-semibold tracking-wide">
            Curating the experience...
          </div>
          <div className="phrase phrase-2 text-sm md:text-base text-[#E0E0E6] uppercase font-['Bricolage_Grotesque'] font-semibold tracking-wide">
            Loading visual assets...
          </div>
          <div className="phrase phrase-3 text-sm md:text-base text-[#E0E0E6] uppercase font-['Bricolage_Grotesque'] font-semibold tracking-wide">
            Preparing your journey...
          </div>
        </div>

        {/* GPU Accelerated Progress Bar */}
        <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.08)', position: 'relative', overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              width: '100%',
              background: '#FFFFFF',
              boxShadow: '0 0 10px rgba(255,255,255,0.5)',
              transformOrigin: 'left',
              transform: `scaleX(${scale})`,
              transition: `transform ${isReady ? '0.4s ease-out' : '6s cubic-bezier(0.1, 0.7, 0.1, 1)'}`,
            }}
          />
        </div>

        {/* Footer Numbers */}
        <div className="w-full flex justify-between items-center mt-6">
          <span className="font-['DM_Mono'] text-[10px] text-white/40 tracking-widest uppercase">
            CybiconZ Loading
          </span>
          <span className="font-['DM_Mono'] text-[10px] text-white/70 tracking-widest tabular-nums">
            {displayNum}%
          </span>
        </div>

      </div>
    </div>
  );
}