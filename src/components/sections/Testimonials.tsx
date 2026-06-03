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
      className="py-16 sm:py-20 relative overflow-hidden"
      style={{ background: "#060608", borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div className="container relative z-10">
        {/* Compact Header */}
        <div className="flex items-center gap-4 mb-10 pb-4 border-b border-white/[0.08]">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/65">
            Client Feedback
          </span>
          <div className="flex-1 h-[1px] bg-white/[0.05]" />
        </div>

        {/* Quotes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {items.map((t, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-20px" }}
              variants={prefersReduced ? reducedVariants : itemVariants}
              custom={i}
              className="flex flex-col"
            >
              <blockquote
                className="font-display font-medium leading-[1.2] mb-8"
                style={{
                  fontSize: "clamp(20px, 2.2vw, 28px)",
                  letterSpacing: "-0.02em",
                  color: "#FFFFFF",
                }}
              >
                "{t.quote}"
              </blockquote>

              <div className="mt-auto flex items-center gap-4">
                <div className="w-8 h-[1px] bg-white/30" />
                <div>
                  <div
                    className="font-sans font-bold text-white text-[11px] uppercase tracking-wider"
                  >
                    {t.name}
                  </div>
                  <div
                    className="font-mono text-white/70 text-[9px] mt-1 uppercase tracking-widest"
                  >
                    {t.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 pt-6 flex items-center justify-between border-t border-white/[0.05]">
           <p
            className="font-mono text-white/60 uppercase"
            style={{ fontSize: "9px", letterSpacing: "0.2em" }}
          >
            Verified Outcomes
          </p>
          <p
            className="font-mono text-white/60"
            style={{ fontSize: "9px", letterSpacing: "0.1em" }}
          >
            CYBICONZ // 2026
          </p>
        </div>
      </div>
    </section>
  );
}
