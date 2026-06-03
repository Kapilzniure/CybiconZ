import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { services } from "@/data/services";
import type { Service } from "@/data/services";
import { MagneticButton } from "@/components/ui/MagneticButton";
import SplineServices from "./SplineServices";

const serviceRowVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.07,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const reducedVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
};

function ServiceRow({
  service,
  index,
  prefersReduced,
}: {
  service: Service;
  index: number;
  prefersReduced: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link to="/services">
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        variants={prefersReduced ? reducedVariants : serviceRowVariants}
        custom={index}
        className="relative py-8 grid grid-cols-[44px_1fr] sm:grid-cols-[64px_1fr_auto] items-center gap-x-4 gap-y-2 sm:gap-6 cursor-pointer transition-colors duration-200"
      >
        {/* Index */}
        <span
          className="font-mono text-[10px] tracking-[0.2em] transition-colors duration-300"
          style={{ color: hovered ? "#FFFFFF" : "rgba(255,255,255,0.6)" }}
        >
          {service.id}
        </span>

        {/* Name + description */}
        <div>
          <div className="flex items-center gap-4 flex-wrap mb-2">
            <h3
              className="font-display font-bold leading-none transition-colors duration-200"
              style={{
                fontSize: "clamp(22px, 3vw, 34px)",
                color: hovered ? "#ffffff" : "rgba(255,255,255,0.95)",
              }}
            >
              <span className={hovered ? "text-gradient" : ""}>{service.name}</span>
            </h3>
            {service.popular && (
              <span
                className="font-mono text-[9px] px-2 py-0.5 rounded-xl border uppercase tracking-widest"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  borderColor: "rgba(255,255,255,0.3)",
                  color: "rgba(255,255,255,0.9)",
                }}
              >
                Featured
              </span>
            )}
          </div>
          <p
            className="leading-relaxed max-w-xl"
            style={{ fontSize: "14px", color: "rgba(255,255,255,0.85)" }}
          >
            {service.description}
          </p>
        </div>

        {/* Timeline + arrow */}
        <div className="col-start-2 sm:col-start-auto flex flex-row sm:flex-col items-center sm:items-end gap-3 sm:gap-1.5">
          <span
            className="font-mono transition-colors duration-300"
            style={{
              fontSize: "10px",
              color: "rgba(255,255,255,0.75)",
            }}
          >
            {service.timeline}
          </span>
          <motion.span
            animate={{ x: hovered ? 0 : 4, opacity: hovered ? 1 : 0.3 }}
            transition={{ duration: 0.2 }}
            className="font-sans font-bold text-[12px] uppercase tracking-wider text-white"
          >
            Details →
          </motion.span>
        </div>

        {/* Accent rule on hover */}
        <motion.div
          animate={{ scaleX: hovered ? 1 : 0 }}
          initial={{ scaleX: 0 }}
          transition={{ duration: 0.3, ease: "circOut" }}
          className="absolute bottom-0 left-0 w-full h-[1px] origin-left bg-white/20"
        />
      </motion.div>
    </Link>
  );
}

export default function Services() {
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
      data-section="services-section"
      className="bg-[#050507] overflow-hidden relative py-24 sm:py-32"
    >
      <div className="container relative z-10">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-6 h-[1px] bg-white/30" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/70">
                Core Capabilities
              </span>
            </div>
            <h2
              className="font-display font-extrabold text-white leading-[0.9] tracking-[-0.05em] mb-6"
              style={{ fontSize: "clamp(40px, 6vw, 82px)" }}
            >
              Engineered for<br className="hidden sm:block" />
              <span style={{ color: "rgba(255,255,255,0.65)" }}>high performance.</span>
            </h2>
            <p
              className="max-w-md leading-relaxed"
              style={{ fontSize: "16px", color: "rgba(255,255,255,0.85)" }}
            >
              We deliver end-to-end digital solutions that scale. No compromises, just results.  
            </p>
          </div>
        </div>

        {/* Two-column: robot left, service list right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Robot — sticky on desktop, stacked below on mobile */}
          <div className="lg:sticky order-last lg:order-first" style={{ top: "120px" }}>
            <div className="w-full h-[400px] lg:h-[650px] relative">
              <SplineServices />
            </div>
          </div>

          {/* Service list */}
          <div className="lg:pt-12">
            <div className="divide-y border-t border-b" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
              {services.map((service, i) => (
                <ServiceRow
                  key={service.id}
                  service={service}
                  index={i}
                  prefersReduced={prefersReduced}
                />
              ))}
            </div>

            <div
              className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-6 pt-8"
              style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-white/40 animate-pulse" />
                <p
                  className="font-mono"
                  style={{ fontSize: "10px", color: "rgba(255,255,255,0.6)", letterSpacing: "0.1em" }}
                >
                  NOW BOOKING FOR Q3 2026
                </p>
              </div>
              <MagneticButton href="/services" variant="ghost">
                View Methodology →
              </MagneticButton>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
