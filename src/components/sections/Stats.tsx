import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import { useCountUp } from "@/hooks/useCountUp";
import { useScrollVelocity } from "@/hooks/useScrollVelocity";

export default function Stats() {
  const velocity = useScrollVelocity();
  const floatSpeed = Math.max(3, 11 - velocity * 0.3);

  const stat1 = useCountUp({ end: 2,   suffix: '+', duration: 1500 });
  const stat2 = useCountUp({ end: 100, suffix: '%', duration: 2000 });

  const items = [
    {
      number: (
        <span
          ref={stat1.ref as React.RefObject<HTMLSpanElement>}
          className="font-display font-extrabold text-[48px] sm:text-[64px] lg:text-[72px] leading-none tabular-nums"
          style={{ color: '#00C4FF' }}
        >
          {stat1.count}{stat1.suffix}
        </span>
      ),
      label: "Live Projects",
      sub: "Real clients, real outcomes",
      color: '#00C4FF',
    },
    {
      number: (
        <span
          ref={stat2.ref as React.RefObject<HTMLSpanElement>}
          className="font-display font-extrabold text-[48px] sm:text-[64px] lg:text-[72px] leading-none tabular-nums"
          style={{ color: '#39FF14' }}
        >
          {stat2.count}{stat2.suffix}
        </span>
      ),
      label: "Delivery Rate",
      sub: "No abandoned projects ever",
      color: '#39FF14',
    },
    {
      number: (
        <span className="font-display font-extrabold text-[48px] sm:text-[64px] lg:text-[72px] leading-none" style={{ color: '#00C4FF' }}>
          1 day
        </span>
      ),
      label: "Response Time",
      sub: "Guaranteed, always",
      color: '#00C4FF',
    },
    {
      number: (
        <span className="font-display font-extrabold text-[48px] sm:text-[64px] lg:text-[72px] leading-none" style={{ color: 'rgba(255,255,255,0.6)' }}>
          2025
        </span>
      ),
      label: "Founded",
      sub: "Building since",
      color: 'rgba(255,255,255,0.2)',
    },
  ];

  return (
    <section data-section="stats-section" className="py-[100px] relative overflow-hidden dark-texture" style={{ background: "#060608", position: "relative", "--float-speed": floatSpeed } as CSSProperties}>
      {/* Warm atmospheric glow — orange center */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(rgba(249,115,22,0.12), transparent 65%)",
          pointerEvents: "none",
          zIndex: 0,
          filter: "blur(1px)"
        }}
      />
      <div className="absolute inset-0 grid-overlay opacity-40" />
      <div className="absolute inset-0 dark-texture pointer-events-none" />

      <div className="container relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 border-l lg:border-l-0 border-white/[0.06]">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`px-6 py-10 border-r border-b lg:border-b-0 border-white/[0.06] ${i >= 2 ? "border-b-0" : "lg:border-b-0"}`}
            >
              <div className="h-1 w-10 rounded-full mb-6" style={{ background: item.color }} />
              {item.number}
              <div className="text-white/60 text-[14px] sm:text-[15px] font-semibold mt-3">{item.label}</div>
              <div className="font-mono text-[10px] sm:text-[11px] text-white/20 mt-1 uppercase tracking-wider">{item.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
