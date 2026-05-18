import { useRef, Suspense, lazy } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import HeroParticles from "./HeroParticles";
import HeroSpotlight from "./HeroSpotlight";
import { useHeroIntro } from "@/hooks/useHeroIntro";
import { useSignalFlicker } from "@/hooks/useSignalFlicker";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const HeroCanvas = lazy(() => import("./HeroCanvas"));

function PrecisionRings() {
  return (
    <div
      className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block"
      style={{ zIndex: 1, right: "-40px" }}
      aria-hidden="true"
    >
      <svg width="340" height="340" viewBox="0 0 340 340" fill="none">
        <circle cx="170" cy="170" r="150"
          stroke="rgba(0,196,255,0.07)" strokeWidth="0.5"
          style={{ transformOrigin:"170px 170px", animation:"ringSpinCW 90s linear infinite" }} />
        <circle cx="170" cy="170" r="115"
          stroke="rgba(0,196,255,0.05)" strokeWidth="0.5" strokeDasharray="3 9"
          style={{ transformOrigin:"170px 170px", animation:"ringSpinCCW 55s linear infinite" }} />
        <circle cx="170" cy="170" r="78"
          stroke="rgba(255,255,255,0.03)" strokeWidth="0.5"
          style={{ transformOrigin:"170px 170px", animation:"ringSpinCW 70s linear infinite" }} />
        <circle cx="170" cy="20" r="2.5" fill="rgba(0,196,255,0.3)" />
        <circle cx="320" cy="170" r="2" fill="rgba(0,196,255,0.2)" />
        <circle cx="170" cy="320" r="1.5" fill="rgba(0,196,255,0.12)" />
        <circle cx="20" cy="170" r="1.5" fill="rgba(0,196,255,0.12)" />
      </svg>
    </div>
  );
}

const STATS = [
  { value: "25+", label: "Projects Delivered" },
  { value: "100%", label: "Delivery Rate" },
  { value: "<1 Day", label: "Response Time" },
  { value: "Tokyo", label: "Based" },
];

export default function Hero() {
  const prefersReduced = useReducedMotion();

  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 400], [0, -80]);
  const contentOpacity = useTransform(scrollY, [0, 350], [1, 0]);

  useHeroIntro({
    canvasWrapperRef,
    eyebrowRef,
    line1Ref,
    line2Ref,
    line3Ref,
    subtitleRef,
    ctasRef,
    statsRef,
    scrollIndicatorRef,
    prefersReduced,
  });

  useSignalFlicker(line2Ref, prefersReduced);

  return (
    <section
      className="relative overflow-hidden bg-[#020408]"
      style={{ height: "100vh", minHeight: "700px" }}
      aria-label="CybiconZ hero"
    >
      {/* z-0: Three.js city */}
      <div
        ref={canvasWrapperRef}
        className="absolute inset-0"
        style={{ zIndex: 0, filter: "blur(1px)" }}
      >
        <Suspense fallback={null}>
          <HeroCanvas />
        </Suspense>
      </div>

      {/* z-1: Particles */}
      <HeroParticles />

      {/* z-2: Spotlight */}
      <HeroSpotlight />

      {/* Atmospheric glows */}
      <div className="absolute pointer-events-none" style={{
        zIndex: 3, top: "-15%", right: "-5%",
        width: "50vw", height: "50vw",
        background: "radial-gradient(circle, rgba(79,70,229,0.09) 0%, transparent 65%)",
      }} aria-hidden="true" />
      <div className="absolute pointer-events-none" style={{
        zIndex: 3, bottom: "-10%", left: "50%",
        transform: "translateX(-50%)", width: "40vw", height: "40vw",
        background: "radial-gradient(circle, rgba(0,196,255,0.05) 0%, transparent 65%)",
      }} aria-hidden="true" />

      {/* z-10: All content */}
      <motion.div
        className="absolute inset-0 flex flex-col"
        style={{ zIndex: 10, y: contentY, opacity: contentOpacity }}
      >
        {/* Top bar — sits below navbar */}
        <div
          className="flex items-center justify-between"
          style={{
            paddingTop: "96px",
            paddingLeft: "clamp(24px, 7vw, 120px)",
            paddingRight: "clamp(24px, 7vw, 120px)",
            marginBottom: "clamp(32px, 4vh, 56px)",
          }}
        >
          <div ref={eyebrowRef}>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/25 inline-flex items-center gap-3">
              <span style={{ display:"block", width:"36px", height:"1px", background:"rgba(0,196,255,0.3)" }} />
              Digital Studio · Tokyo, Japan
              <span style={{ display:"block", width:"36px", height:"1px", background:"rgba(0,196,255,0.3)" }} />
            </span>
          </div>
          <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white/25">
            <span className="w-2 h-2 rounded-full bg-[#39FF14]"
              style={{ boxShadow:"0 0 8px rgba(57,255,20,0.5)", animation:"pulseDot 2.5s ease-in-out infinite" }} />
            Available
          </div>
        </div>

        {/* Main content — centered vertically in remaining space */}
        <div
          className="flex-1 flex flex-col justify-center relative"
          style={{
            paddingLeft: "clamp(24px, 7vw, 120px)",
            paddingRight: "clamp(24px, 7vw, 120px)",
            paddingBottom: "80px",
          }}
        >
          <PrecisionRings />

          {/* H1 — CRITICAL: No inline opacity/transform. GSAP owns initial state. */}
          <div style={{ marginBottom: "clamp(20px, 3vh, 32px)" }}>
            {/* overflow:hidden clips the GSAP yPercent reveal */}
            <div style={{ overflow: "hidden" }}>
              <span
                ref={line1Ref}
                className="block font-display font-black text-white"
                style={{
                  fontSize: "clamp(52px, 7.5vw, 120px)",
                  lineHeight: 0.92,
                  letterSpacing: "-0.03em",
                }}
              >
                We build
              </span>
            </div>

            <div style={{ overflow: "hidden" }}>
              <span
                ref={line2Ref}
                className="block font-display font-black"
                style={{
                  fontSize: "clamp(52px, 7.5vw, 120px)",
                  lineHeight: 0.92,
                  letterSpacing: "-0.03em",
                  color: "#00C4FF",
                  // NOTE: text-shadow set here as base — GSAP animates it
                  textShadow: "0 0 60px rgba(0,196,255,0.4), 0 0 120px rgba(0,196,255,0.12)",
                  // NO background, NO display:block background
                  background: "none",
                }}
              >
                digital
              </span>
            </div>

            <div style={{ overflow: "hidden" }}>
              <span
                ref={line3Ref}
                className="block font-display font-black text-white"
                style={{
                  fontSize: "clamp(52px, 7.5vw, 120px)",
                  lineHeight: 0.92,
                  letterSpacing: "-0.03em",
                }}
              >
                products.
              </span>
            </div>
          </div>

          {/* Gradient rule */}
          <div style={{
            width: "80px", height: "1px", marginBottom: "clamp(16px, 2.5vh, 28px)",
            background: "linear-gradient(to right, rgba(0,196,255,0.5), transparent)",
          }} />

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            style={{
              fontSize: "clamp(14px, 1.3vw, 17px)",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.65,
              maxWidth: "460px",
              marginBottom: "clamp(24px, 3.5vh, 40px)",
            }}
          >
            Real systems for businesses that are done
            <br className="hidden md:block" />
            with agencies that disappear.
          </p>

          {/* CTAs */}
          <div
            ref={ctasRef}
            className="flex flex-col sm:flex-row gap-3"
            style={{ marginBottom: "clamp(32px, 5vh, 56px)" }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 font-body font-semibold uppercase text-black transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97]"
              style={{
                fontSize: "13px",
                letterSpacing: "0.04em",
                padding: "12px 32px",
                borderRadius: "4px",
                background: "#00C4FF",
                boxShadow: "0 4px 24px rgba(0,196,255,0.2)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#fff";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(0,196,255,0.35)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#00C4FF";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(0,196,255,0.2)";
              }}
            >
              Start a Project →
            </Link>
            <Link
              to="/work"
              className="inline-flex items-center justify-center gap-2 font-body font-semibold uppercase transition-all duration-200 hover:text-white hover:border-white/40 hover:-translate-y-0.5"
              style={{
                fontSize: "13px",
                letterSpacing: "0.04em",
                padding: "12px 32px",
                borderRadius: "4px",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.55)",
              }}
            >
              See Our Work ↗
            </Link>
          </div>

          {/* Stats */}
          <div
            ref={statsRef}
            className="grid grid-cols-2 md:grid-cols-4"
            style={{ gap: "clamp(16px, 2vw, 0px)", maxWidth: "600px" }}
          >
            {STATS.map((stat) => (
              <div
                key={stat.value}
                className="stat-item flex flex-col"
                style={{
                  gap: "4px",
                  paddingRight: "clamp(0px, 2vw, 32px)",
                  borderRight: "1px solid rgba(255,255,255,0.05)",
                  marginRight: "clamp(0px, 2vw, 32px)",
                }}
              >
                <span
                  className="font-display font-black text-white"
                  style={{
                    fontSize: "clamp(22px, 2.2vw, 34px)",
                    lineHeight: 1,
                    letterSpacing: "-0.025em",
                  }}
                >
                  {stat.value}
                </span>
                <span className="font-mono uppercase text-white/25"
                  style={{ fontSize: "10px", letterSpacing: "0.18em" }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute pointer-events-none flex flex-col items-center gap-2"
        style={{ zIndex: 10, bottom: "32px", left: "50%", transform: "translateX(-50%)" }}
        aria-hidden="true"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/20">Scroll</span>
        <div style={{
          width: "1px", height: "28px",
          background: "linear-gradient(to bottom, rgba(0,196,255,0.5), transparent)",
          animation: "scrollPulse 2s ease-in-out infinite",
        }} />
      </div>

      <style>{`
        @keyframes ringSpinCW  { to { transform: rotate(360deg);  } }
        @keyframes ringSpinCCW { to { transform: rotate(-360deg); } }
        @keyframes pulseDot {
          0%,100% { opacity:1; transform:scale(1);    }
          50%      { opacity:.5; transform:scale(.85); }
        }
        @keyframes scrollPulse {
          0%,100% { opacity:.4; }
          50%      { opacity:.9; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.001ms !important; }
        }
      `}</style>
    </section>
  );
}aa