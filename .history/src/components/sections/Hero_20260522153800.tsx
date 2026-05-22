import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Link } from "react-router-dom";
import HeroParticles from "./HeroParticles";
import SplineHero from "./SplineHero";
import { useHeroIntro } from "@/hooks/useHeroIntro";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function Hero() {
  const prefersReduced = useReducedMotion();
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  // "CybiconZ" logo word transforms
  const logoY = useTransform(scrollY, [100, 400], [120, -180]);
  const logoOpacity = useTransform(
    scrollY,
    [100, 280, 380, 500],
    [0, 1, 1, 0]
  );
  const logoScale = useTransform(scrollY, [300, 500], [1, 0.7]);

  // Headline transforms (arrives after CybiconZ)
  const headlineY = useTransform(scrollY, [300, 500], [80, 0]);
  const headlineOpacity = useTransform(scrollY, [300, 500], [0, 1]);

  // Subtitle + CTAs transforms
  const subtitleY = useTransform(scrollY, [500, 650], [30, 0]);
  const subtitleOpacity = useTransform(scrollY, [500, 650], [0, 1]);

  // Robot — stays full screen, very subtle scale
  const robotScale = useTransform(scrollY, [0, 800], [1, 1.08]);

  // GSAP intro for initial robot fade
  useHeroIntro({
    canvasWrapperRef,
    prefersReduced,
  });

  return (
    <div style={{ height: "300vh", position: "relative" }}>
      {/* Sticky container — stays in viewport while scrolling */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "#020408",
        }}
      >
        {/* ── z-0: Spline 3D scene (Centered Robot) ────────────────── */}
        <motion.div
          ref={canvasWrapperRef}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
            scale: robotScale,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SplineHero />
        </motion.div>

        {/* ── z-1: Particles ───────────────────────────────────────── */}
        <HeroParticles />

        {/* ── z-10: "CybiconZ" — rises first ───────────────────────── */}
        <motion.div
          style={{
            position: "absolute",
            bottom: "35%",
            left: "50%",
            x: "-50%",
            zIndex: 10,
            y: logoY,
            opacity: logoOpacity,
            scale: logoScale,
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          <span
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(56px, 9vw, 144px)",
              color: "#FFFFFF",
              letterSpacing: "-0.04em",
              lineHeight: 1,
              display: "block",
            }}
          >
            CybiconZ
          </span>
        </motion.div>

        {/* ── z-10: Full headline — arrives after CybiconZ ─────────── */}
        <motion.div
          style={{
            position: "absolute",
            bottom: "clamp(80px, 12vh, 140px)",
            left: "50%",
            x: "-50%",
            zIndex: 10,
            y: headlineY,
            opacity: headlineOpacity,
            textAlign: "center",
            width: "100%",
            maxWidth: "860px",
            padding: "0 clamp(24px, 5vw, 60px)",
            pointerEvents: "none",
          }}
        >
          <div style={{ marginBottom: "16px" }}>
            <div
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(40px, 5vw, 80px)",
                lineHeight: 0.92,
                letterSpacing: "-0.03em",
                color: "#FFFFFF",
              }}
            >
              The future
            </div>
            <div
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(40px, 5vw, 80px)",
                lineHeight: 0.92,
                letterSpacing: "-0.03em",
                color: "#00C4FF",
                textShadow: "0 0 60px rgba(0,196,255,0.5)",
              }}
            >
              runs on
            </div>
            <div
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(40px, 5vw, 80px)",
                lineHeight: 0.92,
                letterSpacing: "-0.03em",
                color: "#FFFFFF",
              }}
            >
              what we build.
            </div>
          </div>
        </motion.div>

        {/* ── z-10: Subtitle + CTAs ────────────────────────────────── */}
        <motion.div
          style={{
            position: "absolute",
            bottom: "clamp(28px, 5vh, 60px)",
            left: "50%",
            x: "-50%",
            zIndex: 10,
            opacity: subtitleOpacity,
            y: subtitleY,
            textAlign: "center",
            width: "100%",
            maxWidth: "520px",
            padding: "0 24px",
          }}
        >
          
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              to="/contact"
              style={{
                padding: "11px 28px",
                borderRadius: "4px",
                background: "transparent",
                color: "rgba(255,255,255,0.85)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                fontSize: "13px",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.25)",
                transition: "all 0.2s ease",
              }}
              className="hero-cta-btn"
            >
              Start a Project →
            </Link>
            <Link
              to="/work"
              style={{
                padding: "11px 28px",
                borderRadius: "4px",
                background: "transparent",
                color: "rgba(255,255,255,0.85)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                fontSize: "13px",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.25)",
                transition: "all 0.2s ease",
              }}
              className="hero-cta-btn"
            >
              See Our Work ↗
            </Link>
          </div>
        </motion.div>

        {/* ── z-10: Scroll indicator ─────────────────────────────── */}
        <motion.div
          ref={scrollIndicatorRef}
          style={{
            position: "absolute",
            bottom: "28px",
            left: "50%",
            x: "-50%",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
            pointerEvents: "none",
            opacity: useTransform(scrollY, [0, 200], [1, 0]),
          }}
        >
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "9px",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.25)",
            }}
          >
            scroll
          </span>
          <div
            style={{
              width: "1px",
              height: "28px",
              background:
                "linear-gradient(to bottom, rgba(0,196,255,0.6), transparent)",
              animation: "hScrollLine 2s ease-in-out infinite",
            }}
          />
        </motion.div>
      </div>

      <style>{`
        @keyframes hScrollLine {
          0%, 100% { opacity: 0.35; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.2); }
        }
        .hero-cta-btn:hover {
          border-color: rgba(255,255,255,0.6) !important;
          color: #FFFFFF !important;
        }
      `}</style>
    </div>
  );
}
