import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SplineClosingCTA from "./SplineClosingCTA";

export default function ClosingCTA() {
  return (
    <section
      data-section="cta-section"
      className="relative pt-8 pb-[140px] sm:pt-12 sm:pb-[200px] overflow-hidden"
      style={{ background: "#050507" }}
    >
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-10">
              <span className="w-8 h-[1px] bg-white/30 block" />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/70">
                Ready to begin?
              </span>
            </div>

            {/* Headline */}
            <h2
              className="font-display font-extrabold text-white leading-[0.88] mb-10"
              style={{
                fontSize: "clamp(48px, 7vw, 110px)",
                letterSpacing: "-0.05em",
              }}
            >
              Let's build<br />
              something<br />
              <span style={{ color: "rgba(255,255,255,0.25)" }}>extraordinary.</span>
            </h2>

            {/* Description */}
            <p
              className="max-w-md leading-relaxed mb-14"
              style={{
                fontSize: "clamp(16px, 1.8vw, 18px)",
                color: "rgba(255,255,255,0.75)",
              }}
            >
              We're currently accepting new projects for Q3 2026. 
              Drop us a line and we'll get back to you within 24 hours.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-10 py-5 bg-white text-black font-bold rounded-full transition-transform hover:scale-105 active:scale-95 shadow-xl"
                style={{ fontSize: "14px", letterSpacing: "0.02em", textTransform: "uppercase" }}
              >
                Start the brief →
              </Link>
              <a
                href="mailto:cybiconz@gmail.com"
                className="group flex flex-col"
              >
                <span className="font-mono text-[9px] text-white/40 tracking-widest uppercase mb-1">Direct Email</span>
                <span className="font-mono text-[14px] text-white/75 group-hover:text-white transition-colors underline decoration-white/20 underline-offset-4">
                  cybiconz@gmail.com
                </span>
              </a>
            </div>
          </motion.div>

          {/* Robot */}
          <div className="w-full h-[450px] lg:h-[600px] relative">
            <SplineClosingCTA />
          </div>

        </div>
      </div>
    </section>
  );
}
