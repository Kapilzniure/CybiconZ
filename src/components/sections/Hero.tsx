import { useEffect, useRef, Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ParticleField } from "@/components/ui/ParticleField";
import { MagneticButton } from "@/components/ui/MagneticButton";

const HeroCanvas = lazy(() => import("./HeroCanvas"));

function useScramble(text: string, delay = 0) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#%&";
    let interval: number | undefined;
    const timeout = window.setTimeout(() => {
      const letters = text.split("");
      let iteration = 0;
      interval = window.setInterval(() => {
        el.innerText = letters
          .map((c, i) => (c === " " ? " " : i < iteration ? c : chars[Math.floor(Math.random() * chars.length)]))
          .join("");
        if (iteration >= letters.length) {
          window.clearInterval(interval);
          el.innerText = text;
        }
        iteration += 0.45;
      }, 38);
    }, delay);
    return () => {
      window.clearTimeout(timeout);
      if (interval) window.clearInterval(interval);
    };
  }, [text, delay]);
  return ref;
}

const TICKER = [
  "Strategy", "·", "Brand", "·", "Web Design", "·", "Engineering",
  "·", "Motion", "·", "AI Integration", "·", "Tokyo ⇄ Worldwide",
];

export default function Hero() {
  const line1Ref = useScramble("We build", 350);
  const line2Ref = useScramble("digital", 600);
  const line3Ref = useScramble("products", 850);
  const line4Ref = useScramble("that work.", 1100);

  useEffect(() => {
    gsap.set([".hero-eyebrow", ".hero-meta", ".subheadline", ".ctas", ".hero-stats", ".scroll-indicator"], { opacity: 0 });
    gsap.to(".hero-eyebrow", { opacity: 1, y: 0, duration: 0.6, delay: 0.15, ease: "power2.out" });
    gsap.to(".hero-meta", { opacity: 1, duration: 0.8, delay: 0.3, ease: "power2.out" });
    gsap.to(".subheadline", { opacity: 1, y: 0, duration: 0.7, delay: 0.95, ease: "power2.out" });
    gsap.to(".ctas", { opacity: 1, y: 0, duration: 0.7, delay: 1.15, ease: "power2.out" });
    gsap.to(".hero-stats", { opacity: 1, y: 0, duration: 0.7, delay: 1.3, ease: "power2.out" });
    gsap.to(".scroll-indicator", { opacity: 1, duration: 0.6, delay: 1.5, ease: "power2.out" });
  }, []);

  useEffect(() => {
    const heroSection = document.getElementById("hero-section");
    const headlineEl = document.getElementById("hero-headline");
    const subEl = document.getElementById("hero-sub");
    const ctaEl = document.getElementById("hero-ctas");
    if (!heroSection || !headlineEl) return;
    const ctx = gsap.context(() => {
      gsap.to(headlineEl, {
        scale: 1.06, opacity: 0, y: -50, ease: "power2.in",
        scrollTrigger: { trigger: heroSection, start: "top top", end: "bottom top", scrub: 1.2 },
      });
      if (subEl) gsap.to(subEl, {
        opacity: 0, y: -20, ease: "power2.in",
        scrollTrigger: { trigger: heroSection, start: "top top", end: "60% top", scrub: 0.8 },
      });
      if (ctaEl) gsap.to(ctaEl, {
        opacity: 0, y: -15, ease: "power1.in",
        scrollTrigger: { trigger: heroSection, start: "top top", end: "40% top", scrub: 0.6 },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero-section"
      data-section="hero-section"
      className="relative overflow-hidden dark-texture"
      style={{ background: "#060608", minHeight: "140vh" }}
    >
      {/* Ambient glows */}
      <div aria-hidden style={{ position: "absolute", top: "-180px", right: "-160px", width: "720px", height: "720px", borderRadius: "50%", background: "radial-gradient(rgba(79,70,229,0.22), transparent 65%)", pointerEvents: "none", zIndex: 0, filter: "blur(2px)" }} />
      <div aria-hidden style={{ position: "absolute", bottom: "8%", left: "-120px", width: "440px", height: "440px", borderRadius: "50%", background: "radial-gradient(rgba(236,72,153,0.10), transparent 65%)", pointerEvents: "none", zIndex: 0, filter: "blur(2px)" }} />
      <div aria-hidden style={{ position: "absolute", top: "30%", left: "30%", width: "320px", height: "320px", borderRadius: "50%", background: "radial-gradient(rgba(6,182,212,0.07), transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      {/* Three.js Canvas */}
      <div className="absolute inset-x-0 top-0 pointer-events-none z-0" style={{ height: "100vh" }}>
        <Suspense fallback={<div style={{ position: "absolute", inset: 0 }} />}>
          <HeroCanvas />
        </Suspense>
      </div>

      {/* Vignette */}
      <div aria-hidden className="absolute inset-x-0 top-0 pointer-events-none z-[1]" style={{ height: "100vh", background: "radial-gradient(ellipse at center, transparent 35%, rgba(6,6,8,0.92) 100%)" }} />

      {/* Particles */}
      <div className="absolute inset-x-0 top-0 pointer-events-none" style={{ height: "100vh", zIndex: 1 }}>
        <ParticleField />
      </div>

      {/* Subtle grid overlay */}
      <div aria-hidden className="absolute inset-0 pointer-events-none z-[1] opacity-[0.06]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
        maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
      }} />

      {/* Vertical meta — left */}
      <div className="hero-meta hidden lg:flex flex-col gap-3 absolute left-6 top-1/2 -translate-y-1/2 z-10" style={{ writingMode: "vertical-rl", transform: "translate(0, -50%) rotate(180deg)" }}>
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/30">N 35.6762° · E 139.6503°</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/30">Tokyo / Studio 2025</span>
      </div>

      {/* Vertical meta — right */}
      <div className="hero-meta hidden lg:flex flex-col items-end gap-2 absolute right-6 top-32 z-10">
        <div className="flex items-center gap-2">
          <motion.span className="block w-1.5 h-1.5 rounded-full bg-emerald-400"
            animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">Available · Q3</span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">Index — 001</span>
      </div>

      {/* Frame corners */}
      <CornerMark className="top-6 left-6" />
      <CornerMark className="top-6 right-6" rotate={90} />
      <CornerMark className="bottom-6 left-6" rotate={-90} />
      <CornerMark className="bottom-6 right-6" rotate={180} />

      {/* Center content */}
      <div className="relative z-10 flex items-center justify-center" style={{ minHeight: "100vh" }}>
        <div className="max-w-[1200px] w-full mx-auto px-6 text-center">
          {/* Eyebrow chip */}
          <div className="hero-eyebrow inline-flex items-center gap-3 mb-10 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm" style={{ transform: "translateY(10px)" }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "#818CF8" }} />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/70">
              Independent digital studio · Tokyo
            </span>
          </div>

          {/* Headline — editorial, mixed treatments */}
          <h1 id="hero-headline" className="font-display font-black text-white leading-[0.86] mb-10" style={{ letterSpacing: "-0.045em" }}>
            <span className="block" style={{ fontSize: "clamp(56px, 9.5vw, 132px)" }}>
              <span ref={line1Ref}>We build</span>
            </span>
            <span className="block" style={{ fontSize: "clamp(56px, 9.5vw, 132px)" }}>
              <span
                ref={line2Ref}
                style={{
                  backgroundImage: "linear-gradient(135deg, #818CF8 0%, #4F46E5 45%, #EC4899 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                digital
              </span>{" "}
              <span
                ref={line3Ref}
                className="italic font-light"
                style={{
                  fontFamily: "'Bricolage Grotesque', serif",
                  WebkitTextStroke: "1.5px rgba(240,238,255,0.55)",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                }}
              >
                products
              </span>
            </span>
            <span className="block" style={{ fontSize: "clamp(56px, 9.5vw, 132px)" }}>
              <span ref={line4Ref}>that work.</span>
              <span aria-hidden className="inline-block align-middle ml-2 w-3 h-[0.7em] bg-white/80 animate-pulse" />
            </span>
          </h1>

          {/* Sub */}
          <p
            id="hero-sub"
            className="subheadline font-sans text-base md:text-lg text-white/55 max-w-xl mx-auto mb-14 leading-relaxed"
            style={{ transform: "translateY(10px)" }}
          >
            Strategy, design and engineering for ambitious brands. Not a template
            shop. Not a disappearing freelancer. <span className="text-white/85">A studio that ships.</span>
          </p>

          {/* CTAs */}
          <div
            id="hero-ctas"
            className="ctas flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            style={{ transform: "translateY(15px)" }}
          >
            <MagneticButton href="/contact" variant="primary">Start a Project →</MagneticButton>
            <MagneticButton href="/work" variant="secondary">See our work</MagneticButton>
          </div>

          {/* Stats row */}
          <div className="hero-stats flex flex-wrap justify-center items-stretch gap-x-10 gap-y-4 max-w-3xl mx-auto" style={{ transform: "translateY(10px)" }}>
            <Stat value="48+" label="Products shipped" />
            <Divider />
            <Stat value="6yrs" label="Studio practice" />
            <Divider />
            <Stat value="<1d" label="Avg response" />
            <Divider />
            <Stat value="100%" label="Built in-house" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10" style={{ top: "calc(100vh - 90px)" }}>
        <span className="font-mono text-[10px] text-white/30 uppercase tracking-[0.4em]">Scroll</span>
        <motion.div
          className="w-px h-10"
          style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)" }}
          animate={{ scaleY: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Marquee strip at bottom of viewport */}
      <div className="absolute left-0 right-0 z-[2] overflow-hidden border-y border-white/[0.06] bg-black/30 backdrop-blur-sm" style={{ top: "calc(100vh - 44px)", height: "44px" }}>
        <motion.div
          className="flex items-center gap-8 whitespace-nowrap py-3"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        >
          {[...TICKER, ...TICKER, ...TICKER, ...TICKER].map((t, i) => (
            <span
              key={i}
              className={`font-mono text-[11px] uppercase tracking-[0.3em] ${t === "·" ? "text-violet-400/60" : "text-white/40"}`}
            >
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center min-w-[80px]">
      <span className="font-display text-2xl md:text-3xl font-bold text-white tabular-nums">{value}</span>
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40 mt-1">{label}</span>
    </div>
  );
}

function Divider() {
  return <div className="hidden sm:block w-px self-stretch bg-white/10" />;
}

function CornerMark({ className = "", rotate = 0 }: { className?: string; rotate?: number }) {
  return (
    <div className={`absolute z-10 ${className}`} aria-hidden style={{ transform: `rotate(${rotate}deg)` }}>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M1 6V1H6" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
      </svg>
    </div>
  );
}