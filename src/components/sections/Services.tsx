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
        className="relative py-7 sm:py-8 grid grid-cols-[44px_1fr] sm:grid-cols-[64px_1fr_auto] items-center gap-x-4 gap-y-2 sm:gap-6 cursor-pointer transition-colors duration-200"
      >
        {/* Index */}
        <span
          className="font-mono text-[11px] tracking-[0.1em] transition-colors duration-300"
          style={{ color: hovered ? service.color : "rgba(255,255,255,0.28)" }}
        >
          {service.id}
        </span>

        {/* Name + description */}
        <div>
          <div className="flex items-center gap-4 flex-wrap mb-2">
            <h3
              className="font-display font-extrabold leading-none transition-colors duration-200"
              style={{
                fontSize: "clamp(20px, 2.8vw, 30px)",
                color: hovered ? "#ffffff" : "rgba(255,255,255,0.88)",
              }}
            >
              {service.name}
            </h3>
            {service.popular && (
              <span
                className="font-mono text-[10px] px-2 py-0.5 rounded border uppercase tracking-wider"
                style={{
                  background: `${service.color}14`,
                  borderColor: `${service.color}35`,
                  color: service.color,
                }}
              >
                Popular
              </span>
            )}
          </div>
          <p
            className="leading-relaxed max-w-xl"
            style={{ fontSize: "14px", color: "rgba(255,255,255,0.52)" }}
          >
            {service.description}
          </p>
        </div>

        {/* Timeline + arrow */}
        <div className="col-start-2 sm:col-start-auto flex flex-row sm:flex-col items-center sm:items-end gap-3 sm:gap-1.5">
          <span
            className="font-mono transition-colors duration-300"
            style={{
              fontSize: "11px",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            {service.timeline}
          </span>
          <motion.span
            animate={{ x: hovered ? 0 : 6, opacity: hovered ? 1 : 0.45 }}
            transition={{ duration: 0.18 }}
            className="font-sans font-bold text-[13px]"
            style={{ color: service.color }}
          >
            Explore →
          </motion.span>
        </div>

        {/* Accent rule on hover */}
        <motion.div
          animate={{ scaleX: hovered ? 1 : 0 }}
          initial={{ scaleX: 0 }}
          transition={{ duration: 0.28 }}
          className="absolute bottom-0 left-0 w-full h-px origin-left"
          style={{
            background: `linear-gradient(to right, ${service.color}, transparent)`,
          }}
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
      className="bg-[#060608] overflow-hidden relative py-20 sm:py-28"
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute -top-[150px] -right-[150px] w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(rgba(79,70,229,0.08), transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      <div className="container relative z-10">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-4 h-0.5 bg-[#4F46E5]" />
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#4F46E5]">
                What we build
              </span>
            </div>
            <h2
              className="font-display font-extrabold text-white leading-[0.92] tracking-[-0.04em] mb-4"
              style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
            >
              Five services.<br className="hidden sm:block" />
              Every one end-to-end.
            </h2>
            <p
              className="max-w-md"
              style={{ fontSize: "15px", color: "rgba(255,255,255,0.52)" }}
            >
              We scope each project individually. No packages, no guessing.
            </p>
          </div>
        </div>

        {/* Two-column: robot left, service list right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mt-16">

          {/* Robot — sticky on desktop, stacked below on mobile */}
          <div className="lg:sticky order-last lg:order-first" style={{ top: "120px" }}>
            <div className="w-full h-[420px] sm:h-[400px] lg:h-[600px] relative">
              <SplineServices />
            </div>
          </div>

          {/* Service list */}
          <div>
            <div className="divide-y border-y" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
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
              className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-4 pt-6"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
            >
              <p
                className="font-mono"
                style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em" }}
              >
                5 services · delivered end-to-end
              </p>
              <MagneticButton href="/services" variant="ghost">
                Full breakdown →
              </MagneticButton>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
