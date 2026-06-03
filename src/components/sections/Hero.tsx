import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import HeroParticles from "./HeroParticles";
import SplineHero from "./SplineHero";
import { useHeroIntro } from "@/hooks/useHeroIntro";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MusicToggle } from "@/components/ui/MusicToggle";

const ACCENT = "rgba(255, 255, 255, 0.65)";

// ─── Mobile Hero ───────────────────────────────────────────────────────────────
function MobileHero({
  canvasWrapperRef,
}: {
  canvasWrapperRef: React.RefObject<HTMLDivElement>;
}) {
  const { scrollY } = useScroll();

  const logoY = useTransform(scrollY, [100, 400], [120, -180]);
  const logoOpacity = useTransform(scrollY, [100, 280, 380, 500], [0, 1, 1, 0]);
  const logoScale = useTransform(scrollY, [300, 500], [1, 0.75]);
  const headlineY = useTransform(scrollY, [300, 500], [80, 0]);
  const headlineOpacity = useTransform(scrollY, [300, 500], [0, 1]);
  const ctaY = useTransform(scrollY, [500, 650], [30, 0]);
  const ctaOpacity = useTransform(scrollY, [500, 650], [0, 1]);
  const robotScale = useTransform(scrollY, [0, 800], [0.9, 1.0]);
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 150], [1, 0]);

  return (
    <div style={{ height: "300vh", position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "#020408",
        }}
      >
        {/* Robot */}
        <motion.div
          ref={canvasWrapperRef}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            scale: robotScale,
            y: "2%",
            pointerEvents: "none",
          }}
        >
          <SplineHero />
        </motion.div>

        {/* Particles */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}>
          <HeroParticles />
        </div>

        {/* Vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse 85% 70% at 50% 50%, rgba(2,4,8,0.15) 0%, rgba(2,4,8,0.5) 65%, rgba(2,4,8,0.92) 100%)",
          }}
        />

        {/* Music toggle */}
        <div style={{ position: "absolute", top: 20, right: 20, zIndex: 100 }}>
          <MusicToggle />
        </div>

        {/* CybiconZ wordmark */}
        <motion.div
          style={{
            position: "absolute",
            bottom: "38%",
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
              fontSize: "clamp(48px, 13vw, 76px)",
              color: "#FFFFFF",
              letterSpacing: "-0.04em",
              lineHeight: 1,
              display: "block",
              textShadow: "0 2px 40px rgba(2,4,8,0.8)",
            }}
          >
            CybiconZ
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          style={{
            position: "absolute",
            bottom: "clamp(90px, 16vh, 150px)",
            left: "50%",
            x: "-50%",
            zIndex: 10,
            y: headlineY,
            opacity: headlineOpacity,
            textAlign: "center",
            width: "100%",
            padding: "0 24px",
            pointerEvents: "none",
          }}
        >
          {(
            [
              { text: "The future", accent: false },
              { text: "runs on", accent: true },
              { text: "what we build.", accent: false },
            ] as const
          ).map(({ text, accent }) => (
            <div
              key={text}
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(36px, 9vw, 56px)",
                lineHeight: 0.95,
                letterSpacing: "-0.03em",
                color: accent ? ACCENT : "#FFFFFF",
                textShadow: accent
                  ? "0 0 40px rgba(255,255,255,0.08), 0 2px 20px rgba(2,4,8,0.9)"
                  : "0 2px 30px rgba(2,4,8,0.8)",
              }}
            >
              {text}
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          style={{
            position: "absolute",
            bottom: "clamp(24px, 5vh, 48px)",
            left: "50%",
            x: "-50%",
            zIndex: 30,
            y: ctaY,
            opacity: ctaOpacity,
            width: "calc(100% - 48px)",
            maxWidth: 360,
            display: "flex",
            gap: 12,
          }}
        >
          <Link
            to="/contact"
            style={{
              flex: 1,
              display: "block",
              textAlign: "center",
              padding: "14px 0",
              borderRadius: "12px",
              background: "#FFFFFF",
              color: "#060608",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: "0.01em",
              textDecoration: "none",
            }}
          >
            Start a Project →
          </Link>
          <Link
            to="/work"
            style={{
              flex: 1,
              display: "block",
              textAlign: "center",
              padding: "14px 0",
              borderRadius: "12px",
              background: "transparent",
              color: "rgba(255,255,255,0.9)",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: 14,
              letterSpacing: "0.01em",
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.35)",
            }}
          >
            See Our Work ↗
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          style={{
            position: "absolute",
            bottom: "18px",
            left: "50%",
            x: "-50%",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "5px",
            pointerEvents: "none",
            opacity: scrollIndicatorOpacity,
          }}
        >
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "9px",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            scroll
          </span>
          <div
            style={{
              width: "1px",
              height: "24px",
              background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)",
              animation: "hScrollLine 2s ease-in-out infinite",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}

// ─── Desktop Hero ──────────────────────────────────────────────────────────────
function DesktopHero({
  canvasWrapperRef,
}: {
  canvasWrapperRef: React.RefObject<HTMLDivElement>;
}) {
  const { scrollY } = useScroll();

  const logoY = useTransform(scrollY, [100, 400], [120, -180]);
  const logoOpacity = useTransform(scrollY, [100, 280, 380, 500], [0, 1, 1, 0]);
  const logoScale = useTransform(scrollY, [300, 500], [1, 0.7]);
  const headlineY = useTransform(scrollY, [300, 500], [80, 0]);
  const headlineOpacity = useTransform(scrollY, [300, 500], [0, 1]);
  const subtitleY = useTransform(scrollY, [500, 650], [30, 0]);
  const subtitleOpacity = useTransform(scrollY, [500, 650], [0, 1]);
  const robotScale = useTransform(scrollY, [0, 800], [1.05, 1.15]);

  return (
    <div style={{ height: "300vh", position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "#020408",
        }}
      >
        {/* Robot */}
        <motion.div
          ref={canvasWrapperRef}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
            scale: robotScale,
            y: "-2%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <SplineHero />
        </motion.div>

        <HeroParticles />

        {/* "CybiconZ" word mark */}
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
              fontSize: "clamp(48px, 9vw, 144px)",
              color: "#FFFFFF",
              letterSpacing: "-0.04em",
              lineHeight: 1,
              display: "block",
            }}
          >
            CybiconZ
          </span>
        </motion.div>

        {/* Full headline */}
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
            {(
              [
                { text: "The future", accent: false },
                { text: "runs on", accent: true },
                { text: "what we build.", accent: false },
              ] as const
            ).map(({ text, accent }) => (
              <div
                key={text}
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(32px, 5vw, 80px)",
                  lineHeight: 0.92,
                  letterSpacing: "-0.03em",
                  color: accent ? ACCENT : "#FFFFFF",
                  textShadow: accent ? "0 0 30px rgba(255,255,255,0.08)" : "none",
                }}
              >
                {text}
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          style={{
            position: "absolute",
            bottom: "clamp(28px, 5vh, 60px)",
            left: "50%",
            x: "-50%",
            zIndex: 30,
            opacity: subtitleOpacity,
            y: subtitleY,
            textAlign: "center",
            width: "100%",
            maxWidth: "520px",
            padding: "0 24px",
          }}
        >
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              to="/contact"
              style={{
                padding: "11px 28px",
                borderRadius: "12px",
                background: "#FFFFFF",
                color: "#060608",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: "13px",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
              className="hero-cta-primary"
            >
              Start a Project →
            </Link>
            <Link
              to="/work"
              style={{
                padding: "11px 28px",
                borderRadius: "12px",
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

        {/* Music toggle */}
        <div style={{ position: "absolute", top: 20, left: 24, zIndex: 100 }}>
          <MusicToggle />
        </div>

        {/* Scroll indicator */}
        <motion.div
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
              color: "rgba(255,255,255,0.6)",
            }}
          >
            scroll
          </span>
          <div
            style={{
              width: "1px",
              height: "28px",
              background: "linear-gradient(to bottom, rgba(167,139,250,0.6), transparent)",
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
        .hero-cta-primary:hover { opacity: 0.88; }
        .hero-cta-btn:hover {
          border-color: rgba(255,255,255,0.6) !important;
          color: #FFFFFF !important;
        }
      `}</style>
    </div>
  );
}

// ─── Root export ───────────────────────────────────────────────────────────────
export default function Hero() {
  const prefersReduced = useReducedMotion();
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  useHeroIntro({ canvasWrapperRef, prefersReduced });

  if (isMobile) {
    return <MobileHero canvasWrapperRef={canvasWrapperRef} />;
  }

  return <DesktopHero canvasWrapperRef={canvasWrapperRef} />;
}
