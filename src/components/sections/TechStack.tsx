import { useState, useEffect, useRef, CSSProperties } from "react";
import { motion } from "framer-motion";
import { useScrollVelocity } from "@/hooks/useScrollVelocity";

type Category =
  | "Framework" | "Library"
  | "Language"  | "Runtime"
  | "DevOps"    | "Cloud"
  | "Design"    | "Marketing"
  | "Database"  | "Cache";

const CATEGORY_STYLES: Record<Category, { color: string; bg: string; border: string }> = {
  Framework: { color: "#00C4FF", bg: "rgba(0,196,255,0.08)",   border: "rgba(0,196,255,0.15)"   },
  Library:   { color: "#00C4FF", bg: "rgba(0,196,255,0.08)",   border: "rgba(0,196,255,0.15)"   },
  Language:  { color: "#39FF14", bg: "rgba(57,255,20,0.06)",   border: "rgba(57,255,20,0.12)"   },
  Runtime:   { color: "#39FF14", bg: "rgba(57,255,20,0.06)",   border: "rgba(57,255,20,0.12)"   },
  DevOps:    { color: "#F97316", bg: "rgba(249,115,22,0.08)",  border: "rgba(249,115,22,0.15)"  },
  Cloud:     { color: "#F97316", bg: "rgba(249,115,22,0.08)",  border: "rgba(249,115,22,0.15)"  },
  Design:    { color: "#EC4899", bg: "rgba(236,72,153,0.08)",  border: "rgba(236,72,153,0.15)"  },
  Marketing: { color: "#EC4899", bg: "rgba(236,72,153,0.08)",  border: "rgba(236,72,153,0.15)"  },
  Database:  { color: "#A78BFA", bg: "rgba(167,139,250,0.08)", border: "rgba(167,139,250,0.15)" },
  Cache:     { color: "#A78BFA", bg: "rgba(167,139,250,0.08)", border: "rgba(167,139,250,0.15)" },
};

const row1: { n: string; c: Category }[] = [
  { n: "React",      c: "Library"   },
  { n: "Next.js",    c: "Framework" },
  { n: "TypeScript", c: "Language"  },
  { n: "Node.js",    c: "Runtime"   },
  { n: "PostgreSQL", c: "Database"  },
  { n: "Figma",      c: "Design"    },
  { n: "Stripe",     c: "Marketing" },
  { n: "AWS",        c: "Cloud"     },
  { n: "Docker",     c: "DevOps"    },
  { n: "Redis",      c: "Cache"     },
];

const row2: { n: string; c: Category }[] = [
  { n: "Tailwind CSS", c: "Framework" },
  { n: "GitHub",       c: "DevOps"    },
  { n: "Vercel",       c: "Cloud"     },
  { n: "Cloudinary",   c: "Cloud"     },
  { n: "Firebase",     c: "Database"  },
  { n: "Prisma",       c: "Database"  },
  { n: "Shopify",      c: "Marketing" },
  { n: "Framer",       c: "Design"    },
  { n: "Three.js",     c: "Library"   },
  { n: "Webflow",      c: "Design"    },
];

const FADE_LEFT  = "linear-gradient(to right, #060608 0%, transparent 15%)";
const FADE_RIGHT = "linear-gradient(to left,  #060608 0%, transparent 15%)";

// Extracted outside component — prevents object recreation on render
const HEADER_INIT = { opacity: 0, y: 24 };
const HEADER_ANIM = { opacity: 1, y: 0 };
const HEADER_TRANSITION = { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const };
const HEADER_VIEWPORT = { once: true, margin: "-60px" as const };
const ROW_INIT = { opacity: 0 };
const ROW_ANIM = { opacity: 1 };
const ROW_VIEWPORT = { once: true };

function Item({ n, c }: { n: string; c: Category }) {
  const [hovered, setHovered] = useState(false);
  const cs = CATEGORY_STYLES[c];

  return (
    <div
      className="flex items-center gap-3 rounded-xl px-4 py-3 mx-1.5 cursor-default"
      style={{
        background:  hovered ? "rgba(255,255,255,0.04)"  : "rgba(255,255,255,0.025)",
        border:      `1px solid ${hovered ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.05)"}`,
        transform:   hovered ? "translateY(-3px)" : "translateY(0)",
        transition:  "transform 0.2s ease, border-color 0.2s ease, background 0.2s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0"
        style={{
          background: cs.bg,
          border:     `1px solid ${cs.border}`,
          color:      cs.color,
          fontFamily: '"Bricolage Grotesque", system-ui, sans-serif',
          fontWeight: 800,
          fontSize:   "14px",
        }}
      >
        {n[0].toUpperCase()}
      </div>
      <div>
        <div className="text-[13px] font-semibold text-white/70 leading-none whitespace-nowrap">{n}</div>
        <div className="font-mono text-[10px] text-white/25 mt-1 uppercase tracking-wider">{c}</div>
      </div>
    </div>
  );
}

export default function TechStack() {
  const velocity      = useScrollVelocity();
  const scrollDirRef  = useRef<1 | -1>(1);
  const [row1Hovered, setRow1Hovered] = useState(false);
  const [row2Hovered, setRow2Hovered] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      scrollDirRef.current = window.scrollY >= lastY ? 1 : -1;
      lastY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Positive signedVelocity (scroll down) → shorter duration → faster
  // Negative (scroll up) → longer duration → slower
  const signedVelocity = velocity * scrollDirRef.current;
  const dur1 = Math.max(18, 60 - signedVelocity * 1.5);
  const dur2 = Math.max(20, 70 - signedVelocity * 1.5);

  return (
    <section
      data-section="tech-section"
      className="py-[100px] bg-brand-base overflow-hidden dark-texture"
      style={{ position: "relative" }}
    >
      {/* Violet glow — left-center, animated float */}
      <motion.div
        aria-hidden
        animate={{ y: [-30, 30] }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
        style={{
          position:     "absolute",
          top:          "calc(50% - 200px)",
          left:         "-100px",
          width:        "400px",
          height:       "400px",
          borderRadius: "50%",
          background:   "radial-gradient(rgba(79,70,229,0.08), transparent 65%)",
          pointerEvents:"none",
          zIndex:       0,
          filter:       "blur(1px)",
          willChange:   "transform",
        }}
      />
      {/* Cyan glow — right-center, opposite phase */}
      <motion.div
        aria-hidden
        animate={{ y: [30, -30] }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
        style={{
          position:     "absolute",
          top:          "calc(50% - 200px)",
          right:        "-100px",
          width:        "400px",
          height:       "400px",
          borderRadius: "50%",
          background:   "radial-gradient(rgba(0,196,255,0.05), transparent 65%)",
          pointerEvents:"none",
          zIndex:       0,
          filter:       "blur(1px)",
          willChange:   "transform",
        }}
      />

      {/* Section header */}
      <motion.div
        className="container relative z-10"
        initial={HEADER_INIT}
        whileInView={HEADER_ANIM}
        viewport={HEADER_VIEWPORT}
        transition={HEADER_TRANSITION}
      >
        <span className="label-eyebrow text-violet">Tech</span>
        <div className="flex items-baseline gap-4 mt-3">
          <h2
            className="font-display font-extrabold text-ink"
            style={{ fontSize: "clamp(36px, 5vw, 64px)", letterSpacing: "-0.03em" }}
          >
            Our Tech Stack
          </h2>
          <span className="font-mono text-[11px] text-white/20">20+ technologies</span>
        </div>
        <p
          className="font-sans text-center mx-auto mt-4 mb-12"
          style={{ fontSize: "15px", color: "rgba(255,255,255,0.3)", maxWidth: "400px" }}
        >
          Built with the tools that matter
        </p>
      </motion.div>

      <div className="space-y-3.5">
        {/* Row 1 — left scroll */}
        <motion.div
          className="relative overflow-hidden"
          initial={ROW_INIT}
          whileInView={ROW_ANIM}
          viewport={ROW_VIEWPORT}
          transition={{ duration: 0.6 }}
          onMouseEnter={() => setRow1Hovered(true)}
          onMouseLeave={() => setRow1Hovered(false)}
        >
          <div aria-hidden className="pointer-events-none absolute left-0 top-0 bottom-0 z-10" style={{ width: "15%", background: FADE_LEFT  }} />
          <div aria-hidden className="pointer-events-none absolute right-0 top-0 bottom-0 z-10" style={{ width: "15%", background: FADE_RIGHT }} />
          <div
            className="flex w-max"
            style={{
              "--marquee-duration":     `${dur1}s`,
              animationName:            "marquee",
              animationDuration:        `${dur1}s`,
              animationTimingFunction:  "linear",
              animationIterationCount:  "infinite",
              animationPlayState:       row1Hovered ? "paused" : "running",
            } as CSSProperties}
          >
            {[...row1, ...row1].map((it, i) => <Item key={i} {...it} />)}
          </div>
        </motion.div>

        {/* Row 2 — right scroll */}
        <motion.div
          className="relative overflow-hidden"
          initial={ROW_INIT}
          whileInView={ROW_ANIM}
          viewport={ROW_VIEWPORT}
          transition={{ duration: 0.6, delay: 0.15 }}
          onMouseEnter={() => setRow2Hovered(true)}
          onMouseLeave={() => setRow2Hovered(false)}
        >
          <div aria-hidden className="pointer-events-none absolute left-0 top-0 bottom-0 z-10" style={{ width: "15%", background: FADE_LEFT  }} />
          <div aria-hidden className="pointer-events-none absolute right-0 top-0 bottom-0 z-10" style={{ width: "15%", background: FADE_RIGHT }} />
          <div
            className="flex w-max"
            style={{
              "--marquee-duration":     `${dur2}s`,
              animationName:            "marquee-reverse",
              animationDuration:        `${dur2}s`,
              animationTimingFunction:  "linear",
              animationIterationCount:  "infinite",
              animationPlayState:       row2Hovered ? "paused" : "running",
            } as CSSProperties}
          >
            {[...row2, ...row2].map((it, i) => <Item key={i} {...it} />)}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
