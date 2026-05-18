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
      aria-hidden="true"
      style={{
        position: "absolute",
        right: "-20px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 1,
        pointerEvents: "none",
        display: "none",
      }}
      className="lg:!block"
    >
      <svg width="300" height="300" viewBox="0 0 300 300" fill="none">
        <circle cx="150" cy="150" r="130"
          stroke="rgba(0,196,255,0.07)" strokeWidth="0.5"
          style={{ transformOrigin: "150px 150px", animation: "ringCW 90s linear infinite" }} />
        <circle cx="150" cy="150" r="100"
          stroke="rgba(0,196,255,0.045)" strokeWidth="0.5" strokeDasharray="3 8"
          style={{ transformOrigin: "150px 150px", animation: "ringCCW 55s linear infinite" }} />
        <circle cx="150" cy="150" r="68"
          stroke="rgba(255,255,255,0.025)" strokeWidth="0.5"
          style={{ transformOrigin: "150px 150px", animation: "ringCW 70s linear infinite" }} />
        <circle cx="150" cy="20" r="2.5" fill="rgba(0,196,255,0.35)" />
        <circle cx="280" cy="150" r="2" fill="rgba(0,196,255,0.2)" />
        <circle cx="150" cy="280" r="1.5" fill="rgba(0,196,255,0.12)" />
        <circle cx="20" cy="150" r="1.5" fill="rgba(0,196,255,0.12)" />
      </svg>
    </div>
  );
}

const STATS = [
  { value: "25+",    label: "Projects" },
  { value: "100%",   label: "Delivery Rate" },
  { value: "<1 Day", label: "Response" },
  { value: "Tokyo",  label: "Based" },
];

export default function Hero() {
  const prefersReduced = useReducedMotion();

  // ALL GSAP TARGET REFS — zero inline styles on these elements
  const canvasWrapperRef   = useRef<HTMLDivElement>(null);
  const eyebrowRef         = useRef<HTMLDivElement>(null);
  const line1Ref           = useRef<HTMLSpanElement>(null);
  const line2Ref           = useRef<HTMLSpanElement>(null);
  const line3Ref           = useRef<HTMLSpanElement>(null);
  const subtitleRef        = useRef<HTMLParagraphElement>(null);
  const ctasRef            = useRef<HTMLDivElement>(null);
  const statsRef           = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const contentY       = useTransform(scrollY, [0, 400], [0, -70]);
  const contentOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  useHeroIntro({
    canvasWrapperRef, eyebrowRef,
    line1Ref, line2Ref, line3Ref,
    subtitleRef, ctasRef, statsRef,
    scrollIndicatorRef, prefersReduced,
  });

  useSignalFlicker(line2Ref, prefersReduced);

  // Shared font size — same for all three H1 lines
  const h1Size = "clamp(48px, 6.5vw, 100px)";

  return (
    <section
      aria-label="CybiconZ hero"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: "680px",
        overflow: "hidden",
        backgroundColor: "#020408",
      }}
    >
      {/* ─── z-0: Three.js city ───────────────────────────── */}
      <div
        ref={canvasWrapperRef}
        style={{
          position: "absolute", inset: 0, zIndex: 0,
          filter: "blur(1px)",
        }}
      >
        <Suspense fallback={null}>
          <HeroCanvas />
        </Suspense>
      </div>

      {/* ─── z-1: Particles ───────────────────────────────── */}
      <HeroParticles />

      {/* ─── z-2: Spotlight ───────────────────────────────── */}
      <HeroSpotlight />

      {/* ─── z-3: Atmospheric glows ───────────────────────── */}
      <div aria-hidden="true" style={{
        position: "absolute", zIndex: 3, pointerEvents: "none",
        top: "-20%", right: "-8%", width: "52vw", height: "52vw",
        background: "radial-gradient(circle, rgba(79,70,229,0.09) 0%, transparent 65%)",
      }} />
      <div aria-hidden="true" style={{
        position: "absolute", zIndex: 3, pointerEvents: "none",
        bottom: "-12%", left: "50%", transform: "translateX(-50%)",
        width: "40vw", height: "40vw",
        background: "radial-gradient(circle, rgba(0,196,255,0.055) 0%, transparent 65%)",
      }} />

      {/* ─── z-10: Content ────────────────────────────────── */}
      <motion.div
        style={{
          position: "absolute", inset: 0, zIndex: 10,
          display: "flex", flexDirection: "column",
          y: contentY, opacity: contentOpacity,
        }}
      >
        {/* Top bar */}
        <div
          ref={eyebrowRef}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "92px",
            paddingLeft: "clamp(32px, 7vw, 120px)",
            paddingRight: "clamp(32px, 7vw, 120px)",
            marginBottom: "clamp(24px, 3vh, 44px)",
          }}
        >
          {/* Left — studio label */}
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
            <span style={{ display: "block", width: "32px", height: "1px", background: "rgba(0,196,255,0.3)" }} />
            Digital Studio · Tokyo, Japan
            <span style={{ display: "block", width: "32px", height: "1px", background: "rgba(0,196,255,0.3)" }} />
          </span>

          {/* Right — availability */}
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
              width: "8px", height: "8px", borderRadius: "50%",
              background: "#39FF14",
              boxShadow: "0 0 8px rgba(57,255,20,0.55)",
              animation: "pulseDot 2.5s ease-in-out infinite",
              flexShrink: 0,
            }} />
            Available
          </span>
        </div>

        {/* Main content area */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
            paddingLeft: "clamp(32px, 7vw, 120px)",
            paddingRight: "clamp(32px, 7vw, 120px)",
            paddingBottom: "clamp(40px, 6vh, 80px)",
          }}
        >
          <PrecisionRings />

          {/* ── H1 ─────────────────────────────────────────── */}
          <div style={{ marginBottom: "clamp(16px, 2vh, 28px)" }}>

            {/* Line 1: "We build" */}
            <div style={{ overflow: "hidden" }}>
              <span
                ref={line1Ref}
                style={{
                  display: "block",
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 800,
                  fontSize: h1Size,
                  lineHeight: 0.9,
                  letterSpacing: "-0.03em",
                  color: "#FFFFFF",
                  background: "none",         // Explicit — kill any inherited bg
                  WebkitTextFillColor: "#FFFFFF",
                  isolation: "isolate",
                }}
              >
                We build
              </span>
            </div>

            {/* Line 2: "digital" — THE SPECIAL LINE */}
            <div style={{ overflow: "hidden" }}>
              <span
                ref={line2Ref}
                style={{
                  display: "block",
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 800,
                  fontSize: h1Size,
                  lineHeight: 0.9,
                  letterSpacing: "-0.03em",
                  color: "#00C4FF",
                  WebkitTextFillColor: "#00C4FF",
                  background: "none",          // CRITICAL — no background box
                  backgroundColor: "transparent",
                  backgroundImage: "none",
                  isolation: "isolate",
                  mixBlendMode: "normal",
                  // Base glow — GSAP animates this to pulse
                  textShadow: "0 0 60px rgba(0,196,255,0.45), 0 0 120px rgba(0,196,255,0.12)",
                }}
              >
                digital
              </span>
            </div>

            {/* Line 3: "products." */}
            <div style={{ overflow: "hidden" }}>
              <span
                ref={line3Ref}
                style={{
                  display: "block",
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 800,
                  fontSize: h1Size,
                  lineHeight: 0.9,
                  letterSpacing: "-0.03em",
                  color: "#FFFFFF",
                  background: "none",
                  WebkitTextFillColor: "#FFFFFF",
                  isolation: "isolate",
                }}
              >
                products.
              </span>
            </div>
          </div>

          {/* Gradient rule */}
          <div style={{
            width: "72px",
            height: "1px",
            marginBottom: "clamp(14px, 2vh, 24px)",
            background: "linear-gradient(to right, rgba(0,196,255,0.55), transparent)",
          }} />

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(13px, 1.1vw, 16px)",
              color: "rgba(255,255,255,0.48)",
              lineHeight: 1.65,
              maxWidth: "420px",
              marginBottom: "clamp(20px, 3vh, 36px)",
              margin: "0 0 clamp(20px, 3vh, 36px) 0",
            }}
          >
            Real systems for businesses that are done with agencies that disappear.
          </p>

          {/* CTAs */}
          <div
            ref={ctasRef}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              marginBottom: "clamp(24px, 4vh, 48px)",
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

          {/* Stats */}
          <div
            ref={statsRef}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, auto)",
              gap: "0",
              width: "fit-content",
            }}
          >
            {STATS.map((stat, i) => (
              <div
                key={stat.value}
                className="stat-item"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "3px",
                  paddingRight: i < STATS.length - 1 ? "clamp(20px, 2.5vw, 36px)" : "0",
                  paddingLeft: i > 0 ? "clamp(20px, 2.5vw, 36px)" : "0",
                  borderRight: i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                }}
              >
                <span style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(20px, 2vw, 30px)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  color: "#fff",
                }}>
                  {stat.value}
                </span>
                <span style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "9px",
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: "rgba(255,255,255,0.22)",
                }}>
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
        }}
      >
        <span style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "9px",
          textTransform: "uppercase",
          letterSpacing: "0.2em",
          color: "rgba(255,255,255,0.18)",
        }}>scroll</span>
        <div style={{
          width: "1px",
          height: "24px",
          background: "linear-gradient(to bottom, rgba(0,196,255,0.55), transparent)",
          animation: "scrollLine 2s ease-in-out infinite",
        }} />
      </div>

      <style>{`
        @keyframes ringCW  { to { transform: rotate(360deg);  } }
        @keyframes ringCCW { to { transform: rotate(-360deg); } }
        @keyframes pulseDot {
          0%,100% { opacity:1;   transform:scale(1);    }
          50%     { opacity:0.5; transform:scale(0.85); }
        }
        @keyframes scrollLine {
          0%,100% { opacity:0.4; transform:scaleY(1); }
          50%     { opacity:0.8; transform:scaleY(1.1); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="animation"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}