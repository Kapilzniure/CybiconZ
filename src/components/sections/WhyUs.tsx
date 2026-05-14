import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import SplitText from "@/components/ui/SplitText";
import { MagneticButton } from "@/components/ui/MagneticButton";

const objections = [
  {
    fear: '"I\'ve been burned by agencies before."',
    answer:
      "We work with 2–3 clients at a time. You'll always reach us directly. No account managers, no handoffs to juniors. The person you talk to is building your product.",
    icon: "shield",
    color: "#00C4FF",
  },
  {
    fear: '"I don\'t know if I can afford this."',
    answer:
      "We scope every project individually and tell you the price before you commit. No packages. No surprises. If it's outside your budget, we'll say so upfront.",
    icon: "tag",
    color: "#39FF14",
  },
  {
    fear: '"I won\'t understand what was built."',
    answer:
      "Every project ends with a video walkthrough and written documentation. You'll know how to manage your own product. We build for handoff, not dependency.",
    icon: "book",
    color: "#F59E0B",
  },
  {
    fear: '"What if it takes forever?"',
    answer:
      "Timelines are agreed before we start. Milestones are fixed. You review at every stage. If something changes scope, you approve it first. That's in writing.",
    icon: "clock",
    color: "#4F46E5",
  },
] as const;

type IconType = (typeof objections)[number]["icon"];

function Icon({ name, color }: { name: IconType; color: string }) {
  const style = { stroke: color, fill: "none", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  if (name === "shield")
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" {...style}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    );
  if (name === "tag")
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" {...style}>
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
    );
  if (name === "book")
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" {...style}>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    );
  // clock
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" {...style}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

const cardVariants = {
  hidden: (i: number) => ({ opacity: 0, x: i % 2 === 0 ? -20 : 20 }),
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const reducedVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
};

const leftVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const footerVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.35 } },
};

export default function WhyUs() {
  const [prefersReduced, setPrefersReduced] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(media.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  return (
    <section
      data-section="services-section"
      className="py-[100px] relative overflow-hidden"
      style={{ background: "#0A0A12", borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      {/* Ambient glow — cyan left */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "10%",
          left: "-150px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(rgba(0,196,255,0.07), transparent 65%)",
          pointerEvents: "none",
          zIndex: 0,
          filter: "blur(1px)",
        }}
      />
      {/* Ambient glow — indigo right */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "10%",
          right: "-150px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(rgba(79,70,229,0.07), transparent 65%)",
          pointerEvents: "none",
          zIndex: 0,
          filter: "blur(1px)",
        }}
      />

      <div className="container relative z-10">
        {/* Two-column header + cards */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-16 items-start">
          {/* LEFT */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={prefersReduced ? reducedVariants : leftVariants}
            className="lg:sticky lg:top-32 animate-gpu"
          >
            <span className="label-eyebrow text-[#00C4FF]">Why clients choose us</span>
            <h2
              className="section-headline-reveal font-display font-extrabold text-ink mt-3 leading-[1.1]"
              style={{ fontSize: "clamp(32px, 4vw, 52px)", letterSpacing: "-0.03em" }}
            >
              <SplitText delay={0.04}>We know what you're worried about.</SplitText>
            </h2>
            <p
              className="font-sans mt-5 leading-[1.75]"
              style={{ fontSize: "15px", color: "rgba(255,255,255,0.5)", maxWidth: "340px" }}
            >
              We've heard every objection. Here's the honest answer to each one.
            </p>
          </motion.div>

          {/* RIGHT — objection cards */}
          <div className="flex flex-col gap-4">
            {objections.map((obj, i) => {
              const isHovered = hoveredIndex === i;
              return (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={prefersReduced ? reducedVariants : cardVariants}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="rounded-2xl p-6 sm:p-7 relative animate-gpu"
                  style={{
                    background: isHovered ? `rgba(${hexToRgbStr(obj.color)}, 0.03)` : "#0F0F1C",
                    border: `1px solid ${isHovered ? `rgba(${hexToRgbStr(obj.color)}, 0.3)` : "rgba(255,255,255,0.06)"}`,
                    transition: "background 0.25s ease, border-color 0.25s ease",
                    transform: "translateZ(0)",
                  }}
                >
                  {/* Icon — top right */}
                  <div
                    className="absolute top-5 right-5 opacity-70"
                    style={{ transition: "opacity 0.2s ease", opacity: isHovered ? 1 : 0.5 }}
                  >
                    <Icon name={obj.icon} color={obj.color} />
                  </div>

                  {/* Fear */}
                  <p
                    className="font-display font-bold"
                    style={{
                      fontSize: "17px",
                      color: "#fff",
                      paddingLeft: "14px",
                      borderLeft: `3px solid rgba(${hexToRgbStr(obj.color)}, 0.4)`,
                      lineHeight: "1.5",
                    }}
                  >
                    {obj.fear}
                  </p>

                  {/* Answer */}
                  <p
                    className="font-sans"
                    style={{
                      fontSize: "14px",
                      color: "rgba(255,255,255,0.55)",
                      lineHeight: "1.75",
                      marginTop: "12px",
                    }}
                  >
                    {obj.answer}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Footer CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={prefersReduced ? reducedVariants : footerVariants}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 text-center animate-gpu"
        >
          <p className="font-sans text-[15px]" style={{ color: "rgba(255,255,255,0.45)" }}>
            Still not sure? Talk to us for 15 minutes.{" "}
            <span style={{ color: "rgba(255,255,255,0.25)" }}>No pitch, no pressure.</span>
          </p>
          <MagneticButton href="/contact" variant="primary">
            Start a conversation →
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}

function hexToRgbStr(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}
