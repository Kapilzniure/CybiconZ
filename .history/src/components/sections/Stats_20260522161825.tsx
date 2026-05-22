import { motion } from "framer-motion";
import { useState, useEffect, type CSSProperties } from "react";
import { useCountUp } from "@/hooks/useCountUp";
import { useScrollVelocity } from "@/hooks/useScrollVelocity";

const statVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

const reducedVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } }
};

export default function Stats() {
  const velocity = useScrollVelocity();
  const floatSpeed = Math.max(3, 11 - velocity * 0.3);

  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(media.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  const stat1 = useCountUp({ end: 25, suffix: '+', duration: prefersReduced ? 10 : 1500 });
  const stat2 = useCountUp({ end: 100, suffix: '%', duration: prefersReduced ? 10 : 2000 });

  const items = [
    {
      number: (
        <span
          ref={stat1.ref as React.RefObject<HTMLSpanElement>}
          className="font-display font-extrabold leading-none tabular-nums"
          style={{ color: '#00C4FF', fontSize: 'clamp(56px, 8vw, 96px)' }}
        >
          {stat1.count}{stat1.suffix}
        </span>
      ),
      label: 'Projects',
      sub: 'Trusted product experience',
      ghost: '25',
      color: '#00C4FF',
      glow: 'rgba(0,196,255,0.6)',
    },
    {
      number: (
        <span
          ref={stat2.ref as React.RefObject<HTMLSpanElement>}
          className="font-display font-extrabold leading-none tabular-nums"
          style={{ color: '#39FF14', fontSize: 'clamp(56px, 8vw, 96px)' }}
        >
          {stat2.count}{stat2.suffix}
        </span>
      ),
      label: 'Delivery Rate',
      sub: 'On-time launches every time',
      ghost: '100',
      color: '#39FF14',
      glow: 'rgba(57,255,20,0.6)',
    },
    {
      number: (
        <span className="font-display font-extrabold leading-none" style={{ color: '#EC4899', fontSize: 'clamp(56px, 8vw, 96px)' }}>
          1d
        </span>
      ),
      label: 'Response Time',
      sub: 'Fast, personal support',
      ghost: '1',
      color: '#EC4899',
      glow: 'rgba(236,72,153,0.6)',
    },
    {
      number: (
        <span className="font-display font-extrabold leading-none" style={{ color: 'rgba(255,255,255,0.9)', fontSize: 'clamp(56px, 8vw, 96px)' }}>
          🇯🇵 Tokyo · Japan
        </span>
      ),
      label: 'Our base',
      sub: 'Local creative HQ',
      ghost: '04',
      color: 'rgba(255,255,255,0.7)',
      glow: 'rgba(255,255,255,0.3)',
    },
  ];

  return (
    <section
      data-section="stats-section"
      className="py-[100px] relative overflow-hidden dark-texture light-sweep"
      style={{
        background: '#060608',
        position: 'relative',
        '--float-speed': floatSpeed,
        '--light-sweep-duration': '12s',
      } as CSSProperties}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(rgba(249,115,22,0.12), transparent 65%)',
          pointerEvents: 'none',
          zIndex: 0,
          filter: 'blur(1px)',
        }}
      />
      <div className="absolute inset-0 grid-overlay opacity-40" />
      <div className="absolute inset-0 dark-texture pointer-events-none" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={prefersReduced ? reducedVariants : statVariants}
              custom={i}
              className="group relative overflow-hidden bg-[#08090E] px-6 py-10 sm:px-7 sm:py-12"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.03),transparent_52%)] opacity-80 pointer-events-none" />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-6 left-6 z-0 font-display font-extrabold tracking-[0.02em] text-white/5 transition-transform duration-500 group-hover:-translate-y-3 group-hover:translate-x-4"
                style={{ fontSize: '200px', opacity: 0.03, lineHeight: 0.8 }}
              >
                {item.ghost}
              </span>

              <div className="relative z-10">
                <div className="h-1.5 w-14 rounded-full mb-6" style={{ background: item.color }} />
                <div className="inline-block">
                  <span
                    className="font-display font-extrabold leading-none tracking-tight transition duration-300 group-hover:[text-shadow:0_0_32px_var(--stat-glow)]"
                    style={{ color: item.color, fontSize: 'clamp(56px, 8vw, 96px)', '--stat-glow': item.glow } as CSSProperties}
                  >
                    {item.number}
                  </span>
                </div>
                <div className="text-white/60 text-[15px] font-semibold mt-4">
                  {item.label}
                </div>
                <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-white/20 mt-2">
                  {item.sub}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
