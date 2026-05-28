import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SplineClosingCTA from "./SplineClosingCTA";

export default function ClosingCTA() {
  return (
    <section
      data-section="cta-section"
      className="relative py-[140px] sm:py-[200px] overflow-hidden"
      style={{ background: "#060608" }}
    >
      {/* Single, restrained ambient glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "40%",
          left: "20%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(rgba(79,70,229,0.07), transparent 65%)",
          pointerEvents: "none",
          filter: "blur(1px)",
        }}
      />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left — content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-10">
              <span className="w-4 h-px bg-[#4F46E5] block" />
              <span className="label-eyebrow text-white/40">Start a project</span>
            </div>

            {/* Headline */}
            <h2
              className="font-display font-extrabold text-white leading-[0.92] mb-8"
              style={{
                fontSize: "clamp(44px, 6vw, 96px)",
                letterSpacing: "-0.045em",
              }}
            >
              Let's build<br />
              something<br />
              <span style={{ color: "rgba(255,255,255,0.32)" }}>worth shipping.</span>
            </h2>

            {/* Description */}
            <p
              className="max-w-md leading-relaxed mb-12"
              style={{
                fontSize: "clamp(15px, 1.6vw, 17px)",
                color: "rgba(255,255,255,0.52)",
              }}
            >
              Tell us what you need. We respond within one business day.
              If we're not the right fit, we'll say so.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white font-bold rounded-lg transition-colors hover:bg-white/90"
                style={{ color: "#060608", fontSize: "14px", letterSpacing: "-0.01em" }}
              >
                Start a conversation →
              </Link>
              <a
                href="mailto:cybiconz@gmail.com"
                className="transition-colors hover:text-white/70"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "12px",
                  letterSpacing: "0.06em",
                  color: "rgba(255,255,255,0.38)",
                }}
              >
                cybiconz@gmail.com
              </a>
            </div>
          </motion.div>

          {/* Robot */}
          <div className="w-full h-[420px] sm:h-[400px] lg:h-[550px] relative">
            <SplineClosingCTA />
          </div>

        </div>
      </div>
    </section>
  );
}
