import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useHeroIntro } from "@/hooks/useHeroIntro";

const STATS = [
  { value: "25+",    label: "Projects delivered",  color: "#00C4FF" },
  { value: "100%",   label: "On-time delivery",     color: "#39FF14" },
  { value: "<1 DAY", label: "Guaranteed response",  color: "#00C4FF" },
  { value: "Tokyo",  label: "Japan · Global reach", color: "rgba(255,255,255,0.7)" },
] as const;

export default function Hero() {
  const [prefersReduced, setPrefersReduced] = useState(false);
  const spotlightRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: -1, y: -1 });

  // GSAP refs
  const topBarRef      = useRef<HTMLDivElement>(null);
  const eyebrowRef     = useRef<HTMLDivElement>(null);
  const line1Ref       = useRef<HTMLDivElement>(null);
  const line2Ref       = useRef<HTMLDivElement>(null);
  const line3Ref       = useRef<HTMLDivElement>(null);
  const subtitleRef    = useRef<HTMLParagraphElement>(null);
  const ctaRowRef      = useRef<HTMLDivElement>(null);
  const statsRef       = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // Scroll exit
  const { scrollY } = useScroll();
  const contentY      = useTransform(scrollY, [0, 400], [0, -80]);
  const contentOpacity = useTransform(scrollY, [0, 350], [1, 0]);
  const statsScrollOpacity = useTransform(scrollY, [0, 200], [1, 0]);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 30, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 30, damping: 15 });

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(media.matches);
    const onChange = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    media.addEventListener("change", onChange);

    const onMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (window.innerWidth < 768) return;
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 10);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 6);
    };a
    window.addEventListener("mousemove", onMove);

    return () => {
      media.removeEventListener("change", onChange);
      window.removeEventListener("mousemove", onMove);
    };
  }, [mouseX, mouseY]);

  // Cursor spotlight — single rAF canvas, lerped
  useEffect(() => {
    if (prefersReduced) return;
    const canvas = spotlightRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let cx = window.innerWidth / 2;
    let cy = window.innerHeight / 2;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const draw = () => {
      if (mousePos.current.x >= 0) {
        cx += (mousePos.current.x - cx) * 0.055;
        cy += (mousePos.current.y - cy) * 0.055;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 420);
      g.addColorStop(0, "rgba(0,196,255,0.045)");
      g.addColorStop(1, "rgba(0,196,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [prefersReduced]);

  useHeroIntro({
    topBarRef: topBarRef as React.RefObject<HTMLElement>,
    eyebrowRef: eyebrowRef as React.RefObject<HTMLElement>,
    line1Ref: line1Ref as React.RefObject<HTMLElement>,
    line2Ref: line2Ref as React.RefObject<HTMLElement>,
    line3Ref: line3Ref as React.RefObject<HTMLElement>,
    subtitleRef: subtitleRef as React.RefObject<HTMLElement>,
    ctaRowRef: ctaRowRef as React.RefObject<HTMLElement>,
    statsRef: statsRef as React.RefObject<HTMLElement>,
    scrollIndicatorRef: scrollIndicatorRef as React.RefObject<HTMLElement>,
    prefersReduced,
  });

  return (
    <section
      id="hero-section"
      data-section="hero-section"
      data-cursor="explore"
      className="relative h-screen min-h-[700px] overflow-hidden bg-[#020408]"
    >
      {/* Cursor spotlight */}
      <canvas
        ref={spotlightRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Violet ambient — top right */}
      <div
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          zIndex: 1,
          width: 1000,
          height: 1000,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(79,70,229,0.13) 0%, transparent 70%)",
          transform: "translate(42%, -42%)",
        }}
      />

      {/* Cyan anchor — bottom center */}
      <div
        className="absolute bottom-0 left-1/2 pointer-events-none"
        style={{
          zIndex: 1,
          width: 700,
          height: 280,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(0,196,255,0.06) 0%, transparent 70%)",
          transform: "translateX(-50%) translateY(35%)",
        }}
      />

      {/* Precision rings — desktop only, right edge */}
      <div
        className="absolute hidden md:block pointer-events-none select-none"
        style={{
          zIndex: 2,
          width: 520,
          height: 520,
          right: -120,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <svg
          viewBox="0 0 520 520"
          fill="none"
          style={{ width: "100%", height: "100%", animation: "ring-spin 90s linear infinite" }}
        >
          <circle cx="260" cy="260" r="258" stroke="rgba(0,196,255,0.07)" strokeWidth="1" />
          <circle cx="260" cy="260" r="218" stroke="rgba(79,70,229,0.05)" strokeWidth="1" strokeDasharray="5 14" />
          <circle cx="260" cy="2"   r="3.5" fill="rgba(0,196,255,0.35)" />
          <circle cx="518" cy="260" r="3.5" fill="rgba(79,70,229,0.28)" />
          <circle cx="260" cy="518" r="3.5" fill="rgba(0,196,255,0.22)" />
          <circle cx="2"   cy="260" r="3.5" fill="rgba(79,70,229,0.20)" />
        </svg>
      </div>
      <div
        className="absolute hidden md:block pointer-events-none select-none"
        style={{
          zIndex: 2,
          width: 180,
          height: 180,
          right: 80,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <svg
          viewBox="0 0 180 180"
          fill="none"
          style={{ width: "100%", height: "100%", animation: "ring-spin-rev 55s linear infinite" }}
        >
          <circle cx="90" cy="90" r="88" stroke="rgba(0,196,255,0.05)" strokeWidth="1" strokeDasharray="3 9" />
        </svg>
      </div>

      {/* Top info bar */}
      <div
        ref={topBarRef}
        className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 md:px-[max(32px,7vw)] py-[18px]"
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          opacity: 0,
        }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/25">
          Digital Studio · Tokyo, Japan
        </span>
        <div className="flex items-center gap-2">
          <span
            className="w-[5px] h-[5px] rounded-full bg-[#39FF14]"
            style={{ animation: "pulse 2s ease-in-out infinite" }}
          />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/25">
            Available
          </span>
        </div>
      </div>

      {/* ── Main content — vertically centered ── */}
      <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-[max(32px,7vw)]"
        style={{ paddingTop: 80, paddingBottom: 130 }}
      >
        <motion.div style={{ y: contentY, opacity: contentOpacity }}>
          <motion.div style={{ x: springX, y: springY }}>

            {/* Eyebrow */}
            <div
              ref={eyebrowRef}
              className="flex items-center gap-3 mb-10"
              style={{ clipPath: "inset(0 100% 0 0)" }}
            >
              <span
                className="font-mono uppercase tracking-[0.18em] text-white/25"
                style={{ fontSize: 10 }}
              >
                Est. 2024
              </span>
              <span
                style={{
                  display: "block",
                  width: 36,
                  height: 1,
                  background: "rgba(0,196,255,0.35)",
                  flexShrink: 0,
                }}
              />
              <span
                className="font-mono uppercase tracking-[0.18em]"
                style={{ fontSize: 10, color: "#00C4FF" }}
              >
                Custom Digital Products
              </span>
            </div>

            {/* Headline */}
            <h1 style={{ lineHeight: 1, marginBottom: "2.5rem" }}>
              <div style={{ overflow: "hidden" }}>
                <div
                  ref={line1Ref}
                  className="block font-mono"
                  style={{
                    color: "rgba(255,255,255,0.28)",
                    fontSize: "clamp(15px, 1.8vw, 26px)",
                    fontWeight: 400,
                    letterSpacing: "0.05em",
                    marginBottom: "0.25em",
                    transform: "translateY(110%)",
                  }}
                >
                  We build
                </div>
              </div>
              <div style={{ overflow: "hidden" }}>
                <div
                  ref={line2Ref}
                  className="block font-display"
                  style={{
                    fontSize: "clamp(76px, 12.5vw, 195px)",
                    fontWeight: 800,
                    letterSpacing: "-0.055em",
                    lineHeight: 0.88,
                    color: "#00C4FF",
                    textShadow:
                      "0 0 60px rgba(0,196,255,0.38), 0 0 130px rgba(0,196,255,0.10)",
                    transform: "translateY(110%)",
                  }}
                >
                  digital
                </div>
              </div>
              <div style={{ overflow: "hidden" }}>
                <div
                  ref={line3Ref}
                  className="block font-display"
                  style={{
                    fontSize: "clamp(76px, 12.5vw, 195px)",
                    fontWeight: 800,
                    letterSpacing: "-0.055em",
                    lineHeight: 0.88,
                    color: "rgba(255,255,255,0.92)",
                    transform: "translateY(110%)",
                  }}
                >
                  products.
                </div>
              </div>
            </h1>

            {/* Rule */}
            <div
              style={{
                width: "min(420px, 100%)",
                height: 1,
                background:
                  "linear-gradient(to right, rgba(0,196,255,0.22), rgba(0,196,255,0.06) 55%, transparent)",
                marginBottom: "2.5rem",
              }}
            />

            {/* Subtitle + CTAs */}
            <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-14">
              <p
                ref={subtitleRef}
                className="font-sans"
                style={{
                  fontSize: 16,
                  color: "rgba(255,255,255,0.42)",
                  lineHeight: 1.75,
                  maxWidth: 300,
                  opacity: 0,
                }}
              >
                Built by the person
                <br />
                you speak to.
              </p>

              <div
                ref={ctaRowRef}
                className="flex flex-wrap items-center gap-3"
                style={{ opacity: 0 }}
              >
                <MagneticButton href="/contact" variant="primary">
                  Start a Project →
                </MagneticButton>
                <MagneticButton href="/work" variant="secondary">
                  See Our Work ↗
                </MagneticButton>
              </div>
            </div>

          </motion.div>
        </motion.div>
      </div>

      {/* Stats strip */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-10"
        style={{ opacity: statsScrollOpacity }}
      >
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: "26px 0 18px",
          }}
        >
          <div ref={statsRef} className="flex flex-wrap justify-center">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className="flex items-center w-1/2 md:w-auto justify-center"
              >
                <div
                  data-stat-item
                  className="flex flex-col items-center px-4 md:px-7"
                  style={{ opacity: 0 }}
                >
                  <span
                    className="font-display font-bold"
                    style={{ fontSize: 20, color: s.color }}
                  >
                    {s.value}
                  </span>
                  <span
                    className="font-mono uppercase mt-1"
                    style={{
                      fontSize: 9,
                      color: "rgba(255,255,255,0.28)",
                      letterSpacing: "0.2em",
                    }}
                  >
                    {s.label}
                  </span>
                </div>
                {i < STATS.length - 1 && (
                  <div
                    className="hidden md:block w-px"
                    style={{
                      height: 26,
                      background:
                        "linear-gradient(to bottom, transparent, rgba(255,255,255,0.09), transparent)",
                    }}
                  />
                )}
              </div>
            ))}

            {/* Availability badge */}
            <div className="flex items-center w-full md:w-auto justify-center mt-3 md:mt-0">
              <div
                className="hidden md:block w-px"
                style={{
                  height: 26,
                  background:
                    "linear-gradient(to bottom, transparent, rgba(255,255,255,0.09), transparent)",
                }}
              />
              <div
                data-stat-item
                className="flex items-center gap-2 px-6 md:px-7"
                style={{ opacity: 0 }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-pulse" />
                <span className="font-mono text-[9px] text-white/28 uppercase tracking-[0.2em]">
                  Available for projects
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none z-10"
        style={{ opacity: 0 }}
      >
        <div
          className="w-px h-6 mx-auto"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,196,255,0.45), transparent)",
          }}
        />
      </div>

      <style>{`
        @keyframes ring-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes ring-spin-rev {
          to { transform: rotate(-360deg); }
        }
      `}</style>
    </section>
  );
}
