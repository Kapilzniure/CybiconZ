import { useRef, useEffect } from "react";
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
import SplineHero from "./SplineHero";
import { useHeroIntro } from "@/hooks/useHeroIntro";
import { useSignalFlicker } from "@/hooks/useSignalFlicker";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { value: "2+",     label: "Projects delivered" },
  { value: "100%",   label: "On-time delivery"   },
  { value: "<1 DAY", label: "Response time"      },
  { value: "Tokyo",  label: "Japan · Global"     },
] as const;

const SERVICES = [
  "Website Dev",
  "E-Commerce",
  "UI/UX Design",
  "Web Apps",
  "Digital Marketing",
];

const PROJECTS = [
  {
    name: "LwangBlack Coffee",
    type: "E-COMMERCE SYSTEM",
    progress: 72,
    status: "BUILD",
    statusColor: "#39FF14",
    statusBg: "rgba(57,255,20,0.08)",
    statusBorder: "rgba(57,255,20,0.2)",
    barStart: "#00C4FF",
    barEnd: "#39FF14",
    barDelay: 2.0,
  },
  {
    name: "Johnnies Liquor",
    type: "WEBSITE + MARKETING",
    progress: 85,
    status: "REVIEW",
    statusColor: "#00C4FF",
    statusBg: "rgba(0,196,255,0.08)",
    statusBorder: "rgba(0,196,255,0.2)",
    barStart: "#00C4FF",
    barEnd: "#0066FF",
    barDelay: 2.3,
  },
] as const;

const METRICS = [
  { label: "RESPONSE",  value: "< 1 day", color: "#39FF14"             },
  { label: "DELIVERED", value: "100%",    color: "#00C4FF"             },
  { label: "SINCE",     value: "2025",    color: "rgba(255,255,255,0.4)" },
] as const;

// ─── Terminal card ─────────────────────────────────────────────────────────────

function StudioCard() {
  return (
    <motion.div
      className="hero-card"
      initial={{ opacity: 0, x: 48, y: 12 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 1.0, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        width: "clamp(320px, 28vw, 390px)",
        flexShrink: 0,
        background: "rgba(2, 10, 22, 0.80)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        border: "1px solid rgba(0,196,255,0.14)",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: [
          "0 0 0 1px rgba(0,196,255,0.04)",
          "0 32px 80px rgba(0,0,0,0.65)",
          "0 0 100px rgba(0,196,255,0.06)",
          "inset 0 1px 0 rgba(0,196,255,0.10)",
        ].join(", "),
      }}
    >
      {/* Header bar */}
      <div style={{
        padding: "11px 16px",
        borderBottom: "1px solid rgba(0,196,255,0.08)",
        display: "flex",
        alignItems: "center",
        gap: "7px",
        background: "rgba(0,196,255,0.025)",
      }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.10)" }} />
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.10)" }} />
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#39FF14", boxShadow: "0 0 6px rgba(57,255,20,0.65)" }} />
        <span style={{ marginLeft: 8, fontFamily: "'DM Mono', monospace", fontSize: 10, color: "rgba(0,196,255,0.55)", letterSpacing: "0.10em" }}>
          STUDIO.CYBICONZ — LIVE
        </span>
        <div style={{
          marginLeft: "auto",
          width: 6, height: 6, borderRadius: "50%",
          background: "#39FF14",
          boxShadow: "0 0 8px #39FF14",
          animation: "hPulseDot 2s ease-in-out infinite",
        }} />
      </div>

      {/* Body */}
      <div style={{ padding: "20px 20px 22px" }}>

        {/* Location */}
        <div style={{ marginBottom: 18 }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "rgba(0,196,255,0.42)", letterSpacing: "0.10em" }}>
            📍 TOKYO, JAPAN · EST. 2025
          </span>
        </div>

        {/* Service tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 20 }}>
          {SERVICES.map((tag, i) => (
            <span
              key={tag}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                padding: "3px 9px",
                borderRadius: 4,
                border: `1px solid ${i < 2 ? "rgba(0,196,255,0.28)" : "rgba(255,255,255,0.07)"}`,
                color: i < 2 ? "#00C4FF" : "rgba(255,255,255,0.28)",
                background: i < 2 ? "rgba(0,196,255,0.05)" : "transparent",
                letterSpacing: "0.06em",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "linear-gradient(to right, rgba(0,196,255,0.18), transparent)", marginBottom: 18 }} />

        {/* Active projects label */}
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "rgba(0,196,255,0.42)", letterSpacing: "0.12em", marginBottom: 14 }}>
          ACTIVE PROJECTS
        </div>

        {/* Project rows */}
        {PROJECTS.map((proj) => (
          <div key={proj.name} style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>
                {proj.name}
              </span>
              <span style={{
                fontFamily: "'DM Mono', monospace", fontSize: 9,
                color: proj.statusColor,
                background: proj.statusBg,
                border: `1px solid ${proj.statusBorder}`,
                padding: "2px 7px", borderRadius: 3, letterSpacing: "0.08em",
              }}>
                {proj.status}
              </span>
            </div>
            <div style={{ height: 3, background: "rgba(255,255,255,0.05)", borderRadius: 2, overflow: "hidden" }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${proj.progress}%` }}
                transition={{ duration: 1.2, delay: proj.barDelay, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  height: "100%",
                  background: `linear-gradient(to right, ${proj.barStart}, ${proj.barEnd})`,
                  borderRadius: 2,
                  boxShadow: `0 0 8px ${proj.barStart}55`,
                }}
              />
            </div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.18)", marginTop: 4, letterSpacing: "0.06em" }}>
              {proj.type} · {proj.progress}%
            </div>
          </div>
        ))}

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.05)", marginBottom: 16 }} />

        {/* Bottom metrics */}
        <div style={{ display: "flex" }}>
          {METRICS.map((m, i) => (
            <div
              key={m.label}
              style={{
                flex: 1,
                paddingRight: i < 2 ? 14 : 0,
                paddingLeft:  i > 0 ? 14 : 0,
                borderRight: i < 2 ? "1px solid rgba(255,255,255,0.05)" : "none",
              }}
            >
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.20)", letterSpacing: "0.10em", marginBottom: 3 }}>
                {m.label}
              </div>
              <div style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 700,
                fontSize: 13,
                color: m.color,
                textShadow: m.color !== "rgba(255,255,255,0.4)"
                  ? `0 0 14px ${m.color}55`
                  : "none",
              }}>
                {m.value}
              </div>
            </div>
          ))}
        </div>

      </div>
    </motion.div>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────

export default function Hero() {
  const prefersReduced = useReducedMotion();

  /* ── GSAP refs ──────────────────────────────────────────────────
     No opacity / transform / yPercent in JSX on these elements.
     GSAP owns every initial hidden state. */
  const canvasWrapperRef   = useRef<HTMLDivElement>(null);
  const eyebrowRef         = useRef<HTMLDivElement>(null);
  const line1Ref           = useRef<HTMLDivElement>(null);
  const line2Ref           = useRef<HTMLDivElement>(null);
  const line3Ref           = useRef<HTMLDivElement>(null);
  const subtitleRef        = useRef<HTMLParagraphElement>(null);
  const ctaRowRef          = useRef<HTMLDivElement>(null);
  const statsRef           = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  /* ── Framer scroll exit ──────────────────────────────────────── */
  const { scrollY } = useScroll();
  const contentY       = useTransform(scrollY, [0, 400], [0, -60]);
  const contentOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  /* ── Mouse parallax ──────────────────────────────────────────── */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 28, damping: 14 });
  const springY = useSpring(mouseY, { stiffness: 28, damping: 14 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.innerWidth < 768) return;
    mouseX.set((e.clientX / window.innerWidth  - 0.5) * 7);
    mouseY.set((e.clientY / window.innerHeight - 0.5) * 4);
  };

  /* ── GSAP intro ──────────────────────────────────────────────── */
  useHeroIntro({
    canvasWrapperRef,
    eyebrowRef,
    line1Ref,
    line2Ref,
    line3Ref,
    subtitleRef,
    ctaRowRef,
    statsRef,
    scrollIndicatorRef,
    prefersReduced,
  });

  /* ── Signal flicker on "digital" ────────────────────────────── */
  useSignalFlicker(line2Ref, prefersReduced);

  const H1 = "clamp(54px, 7.2vw, 108px)";

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
      {/* ── z-0: Spline 3D scene ─────────────────────────────────── */}
      <div
        ref={canvasWrapperRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          background: "transparent",
        }}
      >
        <SplineHero />
      </div>

      {/* ── z-1: Particles ───────────────────────────────────────── */}
      <HeroParticles />

      {/* ── z-2: Cursor spotlight ────────────────────────────────── */}
      <HeroSpotlight />

      {/* ── z-3: Vignette — radial dark frame ────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none",
          background: [
            "radial-gradient(ellipse 55% 90% at 28% 50%,",
            "  transparent 10%,",
            "  rgba(2,4,8,0.45) 55%,",
            "  rgba(2,4,8,0.96) 100%)",
          ].join(" "),
        }}
      />

      {/* ── z-3: Scanlines ───────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none",
          background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,196,255,0.008) 3px, rgba(0,196,255,0.008) 4px)",
        }}
      />

      {/* ── z-3: Ambient glows ───────────────────────────────────── */}
      <div aria-hidden="true" style={{
        position: "absolute", zIndex: 3, pointerEvents: "none",
        top: "-18%", right: "-6%", width: "54vw", height: "54vw",
        background: "radial-gradient(circle, rgba(79,70,229,0.11) 0%, transparent 65%)",
      }} />
      <div aria-hidden="true" style={{
        position: "absolute", zIndex: 3, pointerEvents: "none",
        bottom: "-10%", left: "48%", transform: "translateX(-50%)",
        width: "38vw", height: "38vw",
        background: "radial-gradient(circle, rgba(0,196,255,0.055) 0%, transparent 65%)",
      }} />

      {/* ── z-10: All page content ───────────────────────────────── */}
      <motion.div
        style={{
          position: "absolute", inset: 0, zIndex: 10,
          display: "flex", flexDirection: "column",
          y: contentY, opacity: contentOpacity,
        }}
      >
        {/* Eyebrow row */}
        <div
          ref={eyebrowRef}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "clamp(72px, 9vh, 96px)",
            paddingLeft: "clamp(32px, 7vw, 120px)",
            paddingRight: "clamp(32px, 7vw, 120px)",
            flexShrink: 0,
          }}
        >
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: "rgba(255,255,255,0.24)",
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
          }}>
            <span style={{ display: "block", width: "28px", height: "1px", background: "rgba(0,196,255,0.35)" }} />
            Digital Studio · Tokyo, Japan
          </span>

          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: "rgba(255,255,255,0.24)",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}>
            <span style={{
              width: "8px", height: "8px", borderRadius: "50%",
              background: "#39FF14",
              boxShadow: "0 0 8px rgba(57,255,20,0.55)",
              animation: "hPulseDot 2.5s ease-in-out infinite",
              flexShrink: 0,
            }} />
            Available
          </span>
        </div>

        {/* Two-column content — fills remaining height, vertically centered */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            paddingLeft: "clamp(32px, 7vw, 120px)",
            paddingRight: "clamp(24px, 5vw, 80px)",
            paddingBottom: "clamp(40px, 5vh, 72px)",
            gap: "clamp(32px, 4vw, 72px)",
          }}
        >
          {/* Left: text content */}
          <motion.div
            style={{ x: springX, y: springY, flex: "1 1 auto", minWidth: 0, maxWidth: "580px" }}
          >
            {/* H1 — three lines, no overflow:hidden needed (fade+y animation) */}
            <div style={{ marginBottom: "clamp(16px, 2vh, 28px)" }}>

              {/* Line 1: "We build" — white */}
              <div ref={line1Ref} className="font-display" style={{
                display: "block",
                fontWeight: 800,
                fontSize: H1,
                lineHeight: 0.88,
                letterSpacing: "-0.035em",
                color: "#FFFFFF",
              }}>
                We build
              </div>

              {/* Line 2: "digital" — cyan accent */}
              <div
                ref={line2Ref}
                className="font-display"
                style={{
                  display: "block",
                  fontWeight: 800,
                  fontSize: H1,
                  lineHeight: 0.88,
                  letterSpacing: "-0.035em",
                  color: "#00C4FF",
                }}
              >
                digital
              </div>

              {/* Line 3: "products." — white */}
              <div ref={line3Ref} className="font-display" style={{
                display: "block",
                fontWeight: 800,
                fontSize: H1,
                lineHeight: 0.88,
                letterSpacing: "-0.035em",
                color: "#FFFFFF",
              }}>
                products.
              </div>
            </div>

            {/* Gradient rule */}
            <div style={{
              width: "64px", height: "1px",
              marginBottom: "clamp(14px, 1.8vh, 22px)",
              background: "linear-gradient(to right, rgba(0,196,255,0.5), transparent)",
            }} />

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "clamp(13px, 1.05vw, 16px)",
                color: "rgba(255,255,255,0.46)",
                lineHeight: 1.7,
                maxWidth: "400px",
                marginBottom: "clamp(20px, 2.8vh, 36px)",
              }}
            >
              Real systems for businesses that are done{" "}
              with agencies that disappear.
            </p>

            {/* CTAs */}
            <div
              ref={ctaRowRef}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                marginBottom: "clamp(28px, 4vh, 48px)",
              }}
            >
              <Link
                to="/contact"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  padding: "11px 28px", borderRadius: "4px",
                  background: "#00C4FF",
                  color: "#000814",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700, fontSize: "13px",
                  letterSpacing: "0.05em", textTransform: "uppercase",
                  textDecoration: "none",
                  boxShadow: "0 4px 28px rgba(0,196,255,0.28)",
                  transition: "background 200ms, box-shadow 200ms, transform 150ms",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "#e0f8ff";
                  el.style.boxShadow = "0 8px 40px rgba(0,196,255,0.45)";
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "#00C4FF";
                  el.style.boxShadow = "0 4px 28px rgba(0,196,255,0.28)";
                  el.style.transform = "translateY(0)";
                }}
              >
                Start a Project →
              </Link>

              <Link
                to="/work"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  padding: "11px 28px", borderRadius: "4px",
                  background: "transparent",
                  color: "rgba(255,255,255,0.52)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600, fontSize: "13px",
                  letterSpacing: "0.05em", textTransform: "uppercase",
                  textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.11)",
                  transition: "color 200ms, border-color 200ms, transform 150ms",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = "#fff";
                  el.style.borderColor = "rgba(255,255,255,0.38)";
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = "rgba(255,255,255,0.52)";
                  el.style.borderColor = "rgba(255,255,255,0.11)";
                  el.style.transform = "translateY(0)";
                }}
              >
                See Our Work ↗
              </Link>
            </div>

            {/* Stats strip */}
            <div
              ref={statsRef}
              style={{ display: "flex", gap: 0 }}
            >
              {STATS.map((s, i) => (
                <div
                  key={s.value}
                  data-stat-item
                  style={{
                    display: "flex", flexDirection: "column", gap: "3px",
                    paddingRight: i < STATS.length - 1 ? "clamp(16px, 2vw, 28px)" : 0,
                    paddingLeft:  i > 0                ? "clamp(16px, 2vw, 28px)" : 0,
                    borderRight:  i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  }}
                >
                  <span style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(16px, 1.6vw, 24px)",
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
                    color: "rgba(255,255,255,0.20)",
                  }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Studio terminal card — hidden below 1024px via CSS */}
          <StudioCard />
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
          color: "rgba(255,255,255,0.16)",
        }}>
          scroll
        </span>
        <div style={{
          width: "1px", height: "24px",
          background: "linear-gradient(to bottom, rgba(0,196,255,0.55), transparent)",
          animation: "hScrollLine 2s ease-in-out infinite",
        }} />
      </div>

      {/* Keyframes + responsive */}
      <style>{`
        @keyframes hPulseDot {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.5; transform:scale(0.82); }
        }
        @keyframes hScrollLine {
          0%,100% { opacity:0.35; }
          50%      { opacity:0.9; }
        }
        @media (max-width: 1023px) {
          .hero-card { display: none !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="animation"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
