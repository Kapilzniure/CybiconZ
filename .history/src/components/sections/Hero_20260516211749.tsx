import { useEffect, Suspense, lazy, useState } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import HeroMockup from "./HeroMockup";

const HeroCanvas = lazy(() => import("./HeroCanvas"));

const H1_LINES = [
  { text: "We build", brand: false },
  { text: "digital", brand: true },
  { text: "products.", brand: false },
] as const;

const STATS = [
  { label: "DELIVERY", value: "100%" },
  { label: "RESPONSE", value: "<1 DAY" },
  { label: "PROJECTS", value: "25+" },
  { label: "LOCATION", value: "TOKYO" },
] as const;

const AVATARS = [
  { initials: "NK", bg: "#7C3AED" },
  { initials: "LB", bg: "#00C4FF" },
  { initials: "JL", bg: "#39FF14" },
] as const;

const lineVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: 0.45 + i * 0.12, ease: "easeOut" as const },
  }),
};

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: "easeOut" },
  } as const;
}

export default function Hero() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  // Lighter spring for mockup parallax (stiffness 30, damping 15 per spec)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 30, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 30, damping: 15 });

  // Right side exits upward and fades on scroll
  const { scrollY } = useScroll();
  const rightOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const rightY = useTransform(scrollY, [0, 400], [0, -40]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(media.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    media.addEventListener("change", listener);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 20);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 20);
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Keep gsap context alive for scroll triggers registered elsewhere
    const ctx = gsap.context(() => {});
    return () => {
      ctx.revert();
      media.removeEventListener("change", listener);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <section
      id="hero-section"
      data-section="hero-section"
      className="relative flex items-center h-screen min-h-[700px] overflow-hidden bg-[#020408]"
    >
      {/* Three.js background — pulled back to 60% to breathe with the split layout */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ opacity: 0.6 }}>
        <Suspense fallback={null}>
          {!prefersReduced && <HeroCanvas />}
        </Suspense>
      </div>

      {/* Atmospheric radial depth overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 60% 50%, transparent 0%, rgba(2,4,8,0.3) 50%, rgba(2,4,8,0.92) 100%)",
        }}
      />

      {/* Scan line texture */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.025) 2px, rgba(0,0,0,0.025) 4px)",
        }}
      />

      {/* Ambient glows — violet top-right, pink bottom-left */}
      <div
        className="absolute top-0 right-0 pointer-events-none z-[1]"
        style={{
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 pointer-events-none z-[1]"
        style={{
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 70%)",
          transform: "translate(-30%, 30%)",
        }}
      />

      {/* ── Split layout container ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-10 md:gap-0 pt-20">

        {/* ── LEFT SIDE — 55% desktop, full width mobile ── */}
        <div className="w-full md:w-[55%] flex flex-col items-start gap-5">

          {/* Eyebrow pill */}
          <motion.div
            {...fadeUp(0.2)}
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] uppercase rounded-full"
            style={{
              padding: "6px 14px",
              border: "1px solid rgba(0,196,255,0.2)",
              background: "rgba(0,196,255,0.06)",
              color: "#00C4FF",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse"
              style={{ background: "#00C4FF" }}
            />
            Tokyo · Digital Agency
          </motion.div>

          {/* H1 — 3-line split, each line reveals sequentially */}
          <h1
            className="font-display leading-[1.05] tracking-tighter"
            style={{ fontSize: "clamp(44px, 6vw, 80px)" }}
          >
            {H1_LINES.map((line, i) => (
              <motion.span
                key={line.text}
                className="block"
                custom={i}
                initial="hidden"
                animate="visible"
                variants={lineVariants}
                style={
                  line.brand
                    ? {
                        color: "#00C4FF",
                        textShadow:
                          "0 0 60px rgba(0,196,255,0.45), 0 0 120px rgba(0,196,255,0.15)",
                      }
                    : { color: "#ffffff" }
                }
              >
                {line.text}
              </motion.span>
            ))}
          </h1>

          {/* Subheadline */}
          <motion.p
            {...fadeUp(0.85)}
            className="font-sans leading-relaxed"
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.55)",
              maxWidth: 400,
              marginTop: 2,
            }}
          >
            Not templates. Not outsourced. Built by the person you speak to.
          </motion.p>

          {/* CTA group — full-width on mobile, auto on sm+ */}
          <motion.div {...fadeUp(1.0)} className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a
              href="/contact"
              className="w-full sm:w-auto px-8 py-3.5 bg-white text-black font-bold rounded-xl text-center text-[15px] transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Start a Project →
            </a>
            <a
              href="/work"
              className="w-full sm:w-auto px-8 py-3.5 text-white font-semibold rounded-xl text-center text-[15px] transition-all hover:bg-white/5"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            >
              See Our Work ↗
            </a>
          </motion.div>

          {/* Inline hero proof stats */}
          <motion.div
            {...fadeUp(1.15)}
            className="mt-6 flex items-center justify-start gap-4 text-white text-sm"
          >
            {[
              { value: "25+", label: "Projects" },
              { value: "100%", label: "Delivery" },
              { value: "Tokyo", label: "Based" },
            ].map((item, index) => (
              <div key={item.label} className="flex items-center gap-4">
                <div className="flex flex-col items-start gap-1">
                  <span className="font-display font-bold text-[20px] tracking-tight text-[#00C4FF]">
                    {item.value}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.3em]" style={{ color: "rgba(255,255,255,0.3)" }}>
                    {item.label}
                  </span>
                </div>
                {index < 2 ? (
                  <div className="h-6 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                ) : null}
              </div>
            ))}
          </motion.div>

          {/* Social proof — avatar row + trust copy */}
          <motion.div {...fadeUp(1.1)} className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {AVATARS.map((a) => (
                <div
                  key={a.initials}
                  className="w-8 h-8 rounded-full flex items-center justify-center font-mono text-[10px] font-bold text-white shrink-0"
                  style={{ background: a.bg, border: "2px solid #020408" }}
                >
                  {a.initials}
                </div>
              ))}
            </div>
            <span className="font-sans text-[13px]" style={{ color: "rgba(255,255,255,0.4)" }}>
              3 clients trust CybiconZ
            </span>
          </motion.div>

          {/* Stats pill row — 2×2 on mobile, 4-col on desktop */}
          <motion.div
            {...fadeUp(1.2)}
            className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full"
          >
            {STATS.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center rounded-xl px-3 py-2.5"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <span className="font-display font-bold text-white text-[15px] tracking-tight">
                  {s.value}
                </span>
                <span
                  className="font-mono text-[8px] tracking-[0.2em] uppercase mt-0.5"
                  style={{ color: "rgba(255,255,255,0.25)" }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT SIDE — 45% desktop, hidden on mobile ── */}
        {/* Layer 1: scroll-based fade + upward exit */}
        <motion.div
          className="hidden md:block md:w-[45%] pl-8"
          style={{ opacity: rightOpacity, y: rightY }}
        >
          {/* Layer 2: entry slide-in (x: 60→0, opacity: 0→1) */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          >
            {/* Layer 3: mouse parallax ±10px, lighter spring */}
            <motion.div
              style={{ x: springX, y: springY }}
              className="flex items-center justify-center"
            >
              <HeroMockup />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Minimal scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none z-10 opacity-20">
        <div
          className="w-[1px] h-6"
          style={{ background: "linear-gradient(to bottom, #00C4FF, transparent)" }}
        />
      </div>
    </section>
  );
}
