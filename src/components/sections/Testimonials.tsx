import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const items = [
  {
    badge: "E-Commerce",
    quote: "They built a system that just works. Orders come in, payments clear, and we ship. No firefighting, no surprise breakage.",
    name: "LwangBlack Founder",
    role: "Coffee Brand · LwangBlack",
  },
  {
    badge: "Website + Marketing",
    quote: "Our online presence finally matches the store. Direct communication every step — they actually pick up the phone.",
    name: "Johnnies Owner",
    role: "Liquor Retail · Johnnies",
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const reducedVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
};

export default function Testimonials() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(media.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  return (
    <section
      data-section="testimonials-section"
      className="py-[120px] relative overflow-hidden"
      style={{ background: "#060608", borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div className="container relative z-10">
        {/* Header row */}
        <div className="flex items-center justify-between pb-10 border-b border-white/[0.08]">
          <div className="flex items-center gap-4">
            <span className="w-4 h-px bg-[#4F46E5] block" />
            <span className="label-eyebrow text-[#4F46E5]">What clients say</span>
          </div>
          <span className="font-mono text-[11px] text-white/25 tracking-widest">
            01 — 02
          </span>
        </div>

        {/* Quotes */}
        {items.map((t, i) => (
          <motion.div
            key={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={prefersReduced ? reducedVariants : itemVariants}
            custom={i}
            className="py-14 sm:py-20 border-b border-white/[0.08]"
          >
            <blockquote
              className="font-display font-bold leading-[1.1] mb-10 sm:mb-14 max-w-4xl"
              style={{
                fontSize: "clamp(22px, 3.8vw, 46px)",
                letterSpacing: "-0.03em",
                color: "rgba(255,255,255,0.88)",
              }}
            >
              "{t.quote}"
            </blockquote>

            <div className="flex items-end justify-between flex-wrap gap-5">
              <div>
                <div
                  className="font-sans font-semibold text-white"
                  style={{ fontSize: "14px" }}
                >
                  {t.name}
                </div>
                <div
                  className="font-mono text-white/40 mt-0.5"
                  style={{ fontSize: "11px", letterSpacing: "0.08em" }}
                >
                  {t.role}
                </div>
              </div>
              <span
                className="font-mono text-white/30 uppercase"
                style={{ fontSize: "10px", letterSpacing: "0.16em" }}
              >
                {t.badge}
              </span>
            </div>
          </motion.div>
        ))}

        <p
          className="pt-8 font-mono text-white/25"
          style={{ fontSize: "11px", letterSpacing: "0.1em" }}
        >
          Names withheld by client preference
        </p>
      </div>
    </section>
  );
}
