import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GlowingSphere = lazy(() => import("./GlowingSphere"));

const ITEMS = [
  {
    number: "01",
    fear: "I can't reach anyone after I sign.",
    answer: "We work with 2–3 clients at a time. The person who responds is the person building your product.",
    color: "#00C4FF",
    rgb: "0,196,255",
    accent: [0, 0.769, 1.0] as [number, number, number],
  },
  {
    number: "02",
    fear: "I don't know if I can afford this.",
    answer: "We give you the price before you commit. No packages, no hidden costs.",
    color: "#39FF14",
    rgb: "57,255,20",
    accent: [0.224, 1.0, 0.078] as [number, number, number],
  },
  {
    number: "03",
    fear: "I won't understand what was built.",
    answer: "Every project ends with a walkthrough and full docs. You own it completely.",
    color: "#F59E0B",
    rgb: "245,158,11",
    accent: [0.961, 0.620, 0.043] as [number, number, number],
  },
] as const;

type Idx = 0 | 1 | 2;

const ORB_SIZE = 200;

// Orb center as fraction of container (0–1)
const ORB_CENTERS: [number, number][] = [
  [0.32, 0.48],  // phase 0 — upper-left
  [0.70, 0.76],  // phase 1 — lower-right
  [0.32, 0.76],  // phase 2 — lower-left
];

// Item card anchors (fraction of container) — placed at the corners
// We'll render them as position:absolute using these fractions
const ITEM_ANCHORS = [
  { cx: 0.32, cy: 0.48, side: "left"  as const },
  { cx: 0.70, cy: 0.76, side: "right" as const },
  { cx: 0.32, cy: 0.76, side: "left"  as const },
];

// ─── Desktop ───────────────────────────────────────────────────────────────────

function Desktop() {
  const [phase, setPhase]   = useState<Idx>(0);
  const [paused, setPaused] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [dim, setDim] = useState({ w: 1200, h: 820 });

  // Measure container
  useEffect(() => {
    const update = () => {
      if (wrapRef.current) {
        setDim({ w: wrapRef.current.offsetWidth, h: wrapRef.current.offsetHeight });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Auto-cycle
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setPhase(p => ((p + 1) % 3) as Idx), 3800);
    return () => clearInterval(id);
  }, [paused]);

  const item = ITEMS[phase];
  const { w, h } = dim;

  // Orb top-left pixel positions
  const orbX = ORB_CENTERS[phase][0] * w - ORB_SIZE / 2;
  const orbY = ORB_CENTERS[phase][1] * h - ORB_SIZE / 2;

  // SVG waypoint centers for path lines
  const pts = ORB_CENTERS.map(([cx, cy]) => ({ x: cx * w, y: cy * h }));

  return (
    <div
      ref={wrapRef}
      style={{
        position:   "relative",
        width:      "100%",
        height:     "100vh",
        overflow:   "hidden",
        minHeight:  720,
      }}
    >
      {/* Headline */}
      <div style={{
        position:      "absolute",
        top:           0,
        left:          0,
        right:         0,
        textAlign:     "center",
        paddingTop:    72,
        zIndex:        10,
        pointerEvents: "none",
      }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <div style={{ width: 16, height: 1, background: "linear-gradient(to right, #00C4FF, transparent)" }} />
          <span style={{
            fontFamily:    "'DM Mono', monospace",
            fontSize:      10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color:         "rgba(255,255,255,0.28)",
          }}>
            Why clients choose us
          </span>
          <div style={{ width: 16, height: 1, background: "linear-gradient(to left, #00C4FF, transparent)" }} />
        </div>
        <h2 style={{
          fontFamily:    "'Bricolage Grotesque', sans-serif",
          fontWeight:    800,
          fontSize:      "clamp(36px, 4vw, 58px)",
          letterSpacing: "-0.04em",
          lineHeight:    0.95,
          color:         "#ffffff",
          margin:        0,
        }}>
          We know what you're
          <br />
          <span style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.18)", WebkitTextFillColor: "transparent" }}>
            worried about.
          </span>
        </h2>
      </div>

      {/* Faint triangular path */}
      <svg
        aria-hidden
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }}
      >
        <polygon
          points={pts.map(p => `${p.x},${p.y}`).join(" ")}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="1"
          strokeDasharray="5 16"
        />
        {/* Tiny corner markers */}
        {pts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3" fill="rgba(255,255,255,0.06)" />
        ))}
      </svg>

      {/* Moving orb */}
      <motion.div
        animate={{ x: orbX, y: orbY }}
        transition={{ duration: 1.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position:      "absolute",
          left:          0,
          top:           0,
          width:         ORB_SIZE,
          height:        ORB_SIZE,
          zIndex:        2,
          pointerEvents: "none",
        }}
      >
        {/* Ambient glow */}
        <motion.div
          animate={{
            background: `radial-gradient(circle at 50% 50%, rgba(${item.rgb}, 0.22) 0%, transparent 65%)`,
          }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
          style={{ position: "absolute", inset: "-70%", borderRadius: "50%", pointerEvents: "none" }}
        />
        <Suspense fallback={null}>
          <GlowingSphere accentColor={item.accent} />
        </Suspense>
      </motion.div>

      {/* Item cards */}
      {ITEMS.map((it, i) => {
        const idx      = i as Idx;
        const isActive = phase === idx;
        const anchor   = ITEM_ANCHORS[i];
        const cx       = anchor.cx * w;
        const cy       = anchor.cy * h;
        const CARD_W   = 240;
        const isRight  = anchor.side === "right";

        // Position card so it doesn't sit on top of orb:
        // - left side items: card right edge ends just before orb left
        // - right side items: card left edge starts just after orb right
        const OFFSET = ORB_SIZE / 2 + 28; // half orb + gap

        const cardStyle: React.CSSProperties = isRight
          ? { left: cx + OFFSET, top: cy - 64 }
          : { left: cx - OFFSET - CARD_W, top: cy - 64 };

        return (
          <motion.div
            key={i}
            onMouseEnter={() => { setPaused(true); setPhase(idx); }}
            onMouseLeave={() => setPaused(false)}
            animate={{ opacity: isActive ? 1 : 0.22 }}
            transition={{ duration: 0.45 }}
            style={{
              position:  "absolute",
              width:     CARD_W,
              zIndex:    5,
              cursor:    "default",
              textAlign: isRight ? "left" : "right",
              ...cardStyle,
            }}
          >
            <span style={{
              fontFamily:    "'DM Mono', monospace",
              fontSize:      10,
              letterSpacing: "0.15em",
              color:         isActive ? it.color : "rgba(255,255,255,0.18)",
              display:       "block",
              marginBottom:  10,
              transition:    "color 0.4s",
            }}>
              {it.number}
            </span>
            <p style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 700,
              fontSize:   "clamp(15px, 1.3vw, 19px)",
              color:      isActive ? "#ffffff" : "rgba(255,255,255,0.4)",
              lineHeight: 1.25,
              margin:     "0 0 12px",
              transition: "color 0.4s",
            }}>
              {it.fear}
            </p>
            <AnimatePresence>
              {isActive && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize:   13,
                    lineHeight: 1.72,
                    color:      "rgba(255,255,255,0.52)",
                    margin:     0,
                  }}
                >
                  {it.answer}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}

      {/* Phase dots + CTA — bottom center */}
      <div style={{
        position:       "absolute",
        bottom:         48,
        left:           "50%",
        transform:      "translateX(-50%)",
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        gap:            20,
        zIndex:         10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {ITEMS.map((it, i) => (
            <motion.button
              key={i}
              onClick={() => {
                setPhase(i as Idx);
                setPaused(true);
                setTimeout(() => setPaused(false), 6000);
              }}
              animate={{
                width:      phase === i ? 26 : 8,
                background: phase === i ? it.color : "rgba(255,255,255,0.18)",
              }}
              transition={{ duration: 0.35 }}
              style={{ height: 8, borderRadius: 4, border: "none", cursor: "pointer", padding: 0, flexShrink: 0 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Mobile ────────────────────────────────────────────────────────────────────

function Mobile() {
  const [active, setActive] = useState<Idx | null>(null);
  const accentColor = active !== null ? ITEMS[active].accent : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", padding: "88px 24px 80px" }}>

      {/* Headline */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <div style={{ width: 14, height: 1, background: "#00C4FF", opacity: 0.6 }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
            Why clients choose us
          </span>
        </div>
        <h2 style={{
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(32px, 9vw, 44px)",
          letterSpacing: "-0.04em",
          lineHeight: 0.95,
          color: "#ffffff",
          margin: 0,
        }}>
          We know what
          <br />you're worried
          <br />
          <span style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.2)", WebkitTextFillColor: "transparent" }}>
            about.
          </span>
        </h2>
      </div>

      {/* Orb */}
      <div style={{ width: "min(240px, 68vw)", height: "min(240px, 68vw)", alignSelf: "center", marginBottom: 36, position: "relative" }}>
        <motion.div
          animate={{
            background: active !== null
              ? `radial-gradient(circle at 50% 50%, rgba(${ITEMS[active].rgb}, 0.2) 0%, transparent 70%)`
              : "radial-gradient(circle at 50% 50%, rgba(100,60,200,0.1) 0%, transparent 70%)",
          }}
          transition={{ duration: 0.9 }}
          style={{ position: "absolute", inset: "-35%", borderRadius: "50%", pointerEvents: "none" }}
        />
        <Suspense fallback={null}>
          <GlowingSphere accentColor={accentColor} />
        </Suspense>
      </div>

      {/* Accordion */}
      <div>
        {ITEMS.map((item, i) => {
          const idx      = i as Idx;
          const isActive = active === idx;

          return (
            <div
              key={i}
              onClick={() => setActive(isActive ? null : idx)}
              style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "18px 0", cursor: "pointer" }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                <span style={{
                  fontFamily: "'DM Mono', monospace", fontSize: 10,
                  color: isActive ? item.color : "rgba(255,255,255,0.2)",
                  flexShrink: 0, marginTop: 2, transition: "color 0.3s",
                }}>
                  {item.number}
                </span>
                <div style={{ flex: 1 }}>
                  <p style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontWeight: 700, fontSize: 16,
                    color: isActive ? "#ffffff" : "rgba(255,255,255,0.55)",
                    lineHeight: 1.3, margin: 0, transition: "color 0.3s",
                  }}>
                    {item.fear}
                  </p>
                  <AnimatePresence>
                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 10 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.52)", lineHeight: 1.7, margin: 0, overflow: "hidden" }}
                      >
                        {item.answer}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
                <motion.span
                  animate={{ color: isActive ? item.color : "rgba(255,255,255,0.15)", rotate: isActive ? 90 : 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: 14, flexShrink: 0, marginTop: 2 }}
                >
                  →
                </motion.span>
              </div>
            </div>
          );
        })}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} />
      </div>

    </div>
  );
}

// ─── Root ──────────────────────────────────────────────────────────────────────

export default function WhyUs() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );

  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  return (
    <section
      data-section="why-us-section"
      style={{
        position:   "relative",
        overflow:   "hidden",
        background: "#020408",
        borderTop:  "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {isMobile ? <Mobile /> : <Desktop />}
    </section>
  );
}
