import { useRef, Suspense, lazy } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";
import { Link } from "react-router-dom";
import HeroParticles from "./HeroParticles";
import HeroSpotlight from "./HeroSpotlight";
import { useHeroIntro } from "@/hooks/useHeroIntro";
import { useSignalFlicker } from "@/hooks/useSignalFlicker";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const HeroCanvas = lazy(() => import("./HeroCanvas"));

const STATS = [
  { value: "25+",    label: "Projects delivered" },
  { value: "100%",   label: "On-time delivery"   },
  { value: "<1 DAY", label: "Response time"      },
  { value: "Tokyo",  label: "Japan · Global"     },
] as const;

function PrecisionRings() {
  return (
    <div
      aria-hidden="true"
      className="absolute hidden lg:block pointer-events-none"
      style={{ right: "-20px", top: "50%", transform: "translateY(-50%)", zIndex: 1 }}
    >
      <svg width="280" height="280" viewBox="0 0 280 280" fill="none">
        <circle cx="140" cy="140" r="120" stroke="rgba(0,196,255,0.07)"
          strokeWidth="0.5"
          style={{ transformOrigin:"140px 140px", animation:"hRingCW 90s linear infinite" }} />
        <circle cx="140" cy="140" r="92" stroke="rgba(0,196,255,0.045)"
          strokeWidth="0.5" strokeDasharray="3 8"
          style={{ transformOrigin:"140px 140px", animation:"hRingCCW 55s linear infinite" }} />
        <circle cx="140" cy="140" r="62" stroke="rgba(255,255,255,0.025)"
          strokeWidth="0.5"
          style={{ transformOrigin:"140px 140px", animation:"hRingCW 70s linear infinite" }} />
        <circle cx="140" cy="20" r="2.5" fill="rgba(0,196,255,0.35)" />
        <circle cx="260" cy="140" r="2"   fill="rgba(0,196,255,0.2)"  />
        <circle cx="140" cy="260" r="1.5" fill="rgba(0,196,255,0.12)" />
        <circle cx="20"  cy="140" r="1.5" fill="rgba(0,196,255,0.12)" />
      </svg>
    </div>
  );
}

export default function Hero() {
  const prefersReduced = useReducedMotion();

  /* ─── GSAP target refs ─────────────────────────────────────────
     CRITICAL RULE: none of these elements may have opacity, transform,
     clipPath, or yPercent set as inline styles in JSX.
     gsap.set() inside useHeroIntro owns all initial hidden states.
  ──────────────────────────────────────────────────────────────── */
  const canvasWrapperRef   = useRef<HTMLDivElement>(null);
  const eyebrowRef         = useRef<HTMLDivElement>(null);
  const line1Ref           = useRef<HTMLDivElement>(null);
  const line2Ref           = useRef<HTMLDivElement>(null);
  const line3Ref           = useRef<HTMLDivElement>(null);
  const subtitleRef        = useRef<HTMLParagraphElement>(null);
  const ctaRowRef          = useRef<HTMLDivElement>(null);
  const statsRef           = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  /* ─── Framer scroll exit ──────────────────────────────────────── */
  const { scrollY } = useScroll();
  const contentY       = useTransform(scrollY, [0, 400], [0, -70]);
  const contentOpacity = useTransform(scrollY, [0, 320], [1, 0]);

  /* ─── Mouse parallax spring ───────────────────────────────────── */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 30, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 30, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.innerWidth < 768) return;
    mouseX.set((e.clientX / window.innerWidth  - 0.5) * 8);
    mouseY.set((e.clientY / window.innerHeight - 0.5) * 5);
  };

  /* ─── GSAP intro ──────────────────────────────────────────────── */
  useHeroIntro({
    canvasWrapperRef,
    eyebrowRef,
    line1Ref,
    line2Ref,
    line3Ref,
    subtitleRef,
    ctaRowRef,       // ← matches existing hook interface
    statsRef,
    scrollIndicatorRef,
    prefersReduced,
  });

  /* ─── Signal flicker on "digital" ────────────────────────────── */
  useSignalFlicker(line2Ref, prefersReduced);

  /* ─── Shared H1 font size ─────────────────────────────────────── */
  const H1 = "clamp(48px, 6.2vw, 96px)";

  return (
    <section
      aria-label="CybiconZ hero"
      onMouseMove={handleMouseMove}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: "680px",
        overflow: "hidden",
        backgroundColor: "#020408",
      }}
    >
      {/* ── z-0: Three.js city canvas ─────────────────────────────── */}
      <div
        ref={canvasWrapperRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          filter: "blur(0.8px)",
          /* GSAP sets opacity:0 on mount, animates to 0.4 */
        }}
      >
        <Suspense fallback={null}>
          <HeroCanvas />
        </Suspense>
      </div>

      {/* ── z-1: Canvas particles ─────────────────────────────────── */}
      <HeroParticles />

      {/* ── z-2: Cursor spotlight ─────────────────────────────────── */}
      <HeroSpotlight />

      {/* ── z-3: Atmospheric depth glows ─────────────────────────── */}
      <div aria-hidden="true" style={{
        position:"absolute", zIndex:3, pointerEvents:"none",
        top:"-20%", right:"-8%", width:"52vw", height:"52vw",
        background:"radial-gradient(circle,rgba(79,70,229,0.09) 0%,transparent 65%)",
      }} />
      <div aria-hidden="true" style={{
        position:"absolute", zIndex:3, pointerEvents:"none",
        bottom:"-12%", left:"50%", transform:"translateX(-50%)",
        width:"40vw", height:"40vw",
        background:"radial-gradient(circle,rgba(0,196,255,0.055) 0%,transparent 65%)",
      }} />

      {/* ── z-10: All page content ────────────────────────────────── */}
      <motion.div
        style={{
          position: "absolute", inset: 0, zIndex: 10,
          display: "flex", flexDirection: "column",
          y: contentY, opacity: contentOpacity,
        }}
      >
        {/* Top bar — eyebrow + availability */}
        <div
          ref={eyebrowRef}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "92px",
            paddingLeft:  "clamp(32px,7vw,120px)",
            paddingRight: "clamp(32px,7vw,120px)",
            marginBottom: "clamp(20px,2.5vh,40px)",
          }}
        >
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: "rgba(255,255,255,0.25)",
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
          }}>
            <span style={{ display:"block", width:"32px", height:"1px",
              background:"rgba(0,196,255,0.3)" }} />
            Digital Studio · Tokyo, Japan
            <span style={{ display:"block", width:"32px", height:"1px",
              background:"rgba(0,196,255,0.3)" }} />
          </span>

          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: "rgba(255,255,255,0.25)",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}>
            <span style={{
              width:"8px", height:"8px", borderRadius:"50%",
              background:"#39FF14",
              boxShadow:"0 0 8px rgba(57,255,20,0.55)",
              animation:"hPulseDot 2.5s ease-in-out infinite",
              flexShrink: 0,
            }} />
            Available
          </span>
        </div>

        {/* Main content — vertically centered */}
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          paddingLeft:  "clamp(32px,7vw,120px)",
          paddingRight: "clamp(32px,7vw,120px)",
          paddingBottom: "clamp(48px,6vh,80px)",
        }}>
          <PrecisionRings />

          {/* Mouse parallax wrapper — only wraps text, not rings */}
          <motion.div style={{ x: springX, y: springY }}>

            {/* ── H1 ────────────────────────────────────────────────── */}
            <div style={{ marginBottom: "clamp(14px,1.8vh,24px)" }}>

              {/* Line 1: "We build" */}
              <div style={{ overflow:"hidden" }}>
                <div
                  ref={line1Ref}
                  className="font-display"
                  style={{
                    display: "block",
                    fontWeight: 800,
                    fontSize: H1,
                    lineHeight: 0.9,
                    letterSpacing: "-0.035em",
                    color: "#FFFFFF",
                    /* NO transform/opacity here — GSAP owns initial state */
                  }}
                >
                  We build
                </div>
              </div>

              {/* Line 2: "digital" — cyan, breathing glow */}
              <div style={{ overflow:"hidden" }}>
                <div
                  ref={line2Ref}
                  className="font-display"
                  style={{
                    display: "block",
                    fontWeight: 800,
                    fontSize: H1,
                    lineHeight: 0.9,
                    letterSpacing: "-0.035em",
                    color: "#00C4FF",
                    /* Base glow — GSAP pulses this */
                    textShadow: "0 0 60px rgba(0,196,255,0.45), 0 0 120px rgba(0,196,255,0.12)",
                    /* Explicitly kill any inherited background */
                    background: "none",
                    backgroundColor: "transparent",
                    backgroundImage: "none",
                    WebkitTextFillColor: "#00C4FF",
                    /* NO transform/opacity here */
                  }}
                >
                  digital
                </div>
              </div>

              {/* Line 3: "products." */}
              <div style={{ overflow:"hidden" }}>
                <div
                  ref={line3Ref}
                  className="font-display"
                  style={{
                    display: "block",
                    fontWeight: 800,
                    fontSize: H1,
                    lineHeight: 0.9,
                    letterSpacing: "-0.035em",
                    color: "#FFFFFF",
                    /* NO transform/opacity here */
                  }}
                >
                  products.
                </div>
              </div>
            </div>

            {/* Gradient rule */}
            <div style={{
              width: "72px", height: "1px",
              marginBottom: "clamp(12px,1.8vh,22px)",
              background: "linear-gradient(to right, rgba(0,196,255,0.55), transparent)",
            }} />

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "clamp(13px,1.1vw,16px)",
                color: "rgba(255,255,255,0.48)",
                lineHeight: 1.65,
                maxWidth: "420px",
                marginBottom: "clamp(18px,2.5vh,32px)",
                /* NO opacity here — GSAP owns it */
              }}
            >
              Real systems for businesses that are done
              {" "}with agencies that disappear.
            </p>

            {/* CTAs */}
            <div
              ref={ctaRowRef}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                marginBottom: "clamp(24px,3.5vh,44px)",
                /* NO opacity here — GSAP owns it */
              }}
            >
              <Link
                to="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "11px 28px",
                  borderRadius: "4px",
                  background: "#00C4FF",
                  color: "#000",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: "13px",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  boxShadow: "0 4px 24px rgba(0,196,255,0.2)",
                  transition: "background 200ms, box-shadow 200ms, transform 200ms",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "#fff";
                  el.style.boxShadow = "0 8px 32px rgba(0,196,255,0.35)";
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "#00C4FF";
                  el.style.boxShadow = "0 4px 24px rgba(0,196,255,0.2)";
                  el.style.transform = "translateY(0)";
                }}
              >
                Start a Project →
              </Link>

              <Link
                to="/work"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "11px 28px",
                  borderRadius: "4px",
                  background: "transparent",
                  color: "rgba(255,255,255,0.55)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: "13px",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.12)",
                  transition: "color 200ms, border-color 200ms, transform 200ms",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = "#fff";
                  el.style.borderColor = "rgba(255,255,255,0.4)";
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = "rgba(255,255,255,0.55)";
                  el.style.borderColor = "rgba(255,255,255,0.12)";
                  el.style.transform = "translateY(0)";
                }}
              >
                See Our Work ↗
              </Link>
            </div>

            {/* Stats strip */}
            <div
              ref={statsRef}
              style={{
                display: "flex",
                gap: "0",
                /* NO opacity here — GSAP owns it via [data-stat-item] */
              }}
            >
              {STATS.map((s, i) => (
                <div
                  key={s.value}
                  data-stat-item
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "3px",
                    paddingRight: i < STATS.length - 1 ? "clamp(18px,2vw,32px)" : "0",
                    paddingLeft:  i > 0                ? "clamp(18px,2vw,32px)" : "0",
                    borderRight:  i < STATS.length - 1
                      ? "1px solid rgba(255,255,255,0.05)" : "none",
                  }}
                >
                  <span style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(18px,1.8vw,28px)",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    color: "#fff",
                  }}>
                    {s.value}
                  </span>
                  <span style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "9px",
                    textTransform: "uppercase",
                    letterSpacing: "0.18em",
                    color: "rgba(255,255,255,0.22)",
                  }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "28px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          pointerEvents: "none",
          /* NO opacity — GSAP owns it */
        }}
      >
        <span style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "9px",
          textTransform: "uppercase",
          letterSpacing: "0.2em",
          color: "rgba(255,255,255,0.18)",
        }}>
          scroll
        </span>
        <div style={{
          width: "1px", height: "24px",
          background: "linear-gradient(to bottom, rgba(0,196,255,0.55), transparent)",
          animation: "hScrollLine 2s ease-in-out infinite",
        }} />
      </div>

      <style>{`
        @keyframes hRingCW   { to { transform: rotate(360deg);  } }
        @keyframes hRingCCW  { to { transform: rotate(-360deg); } }
        @keyframes hPulseDot {
          0%,100% { opacity:1;   transform:scale(1);    }
          50%     { opacity:0.5; transform:scale(0.85); }
        }
        @keyframes hScrollLine {
          0%,100% { opacity:0.4; }
          50%     { opacity:0.85; }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="animation"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}