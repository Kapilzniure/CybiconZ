import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { services } from "@/data/services";
import type { Service } from "@/data/services";
import { MagneticButton } from "@/components/ui/MagneticButton";

const serviceRowVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.07,
      ease: [0.22, 1, 0.36, 1]
    }
  }),
};

const accordionVariants = {
  hidden: { opacity: 0, scaleY: 0, originY: 0, y: -10 },
  visible: { 
    opacity: 1, 
    scaleY: 1, 
    y: 0,
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] }
  }
};

const reducedVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } }
};

function ServiceRow({ service, index, prefersReduced }: { service: Service; index: number; prefersReduced: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link to="/services">
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        variants={prefersReduced ? reducedVariants : serviceRowVariants}
        custom={index}
        className="relative py-7 grid grid-cols-[80px_1fr_auto] items-center gap-6 cursor-pointer transition-all duration-300 will-change-transform transform-gpu"
        style={{ transform: "translateZ(0)" }}
      >
        {/* Number */}
        <span 
          className="font-mono text-[12px] tracking-[0.1em] transition-colors duration-300"
          style={{ color: hovered ? service.color : 'rgba(255,255,255,0.2)' }}
        >
          {service.id}
        </span>

        {/* Main content */}
        <div className="flex flex-col">
          <div className="flex items-center gap-4 flex-wrap">
            <h3 
              className="font-display font-extrabold text-white/75 transition-colors duration-300 leading-none"
              style={{ 
                fontSize: 'clamp(20px, 3vw, 32px)',
                color: hovered ? '#ffffff' : 'rgba(255,255,255,0.75)'
              }}
            >
              {service.name}
            </h3>
            {service.popular && (
              <span 
                className="font-mono text-[10px] px-2.5 py-0.5 rounded-sm border uppercase tracking-wider"
                style={{ 
                  background: `${service.color}18`,
                  borderColor: `${service.color}40`,
                  color: service.color
                }}
              >
                Popular
              </span>
            )}
          </div>

          {/* Description — revealed with scaleY/opacity */}
          <AnimatePresence>
            {hovered && !prefersReduced && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={accordionVariants}
                className="mt-3 overflow-hidden will-change-transform"
              >
                <p className="text-white/45 text-[14px] leading-relaxed max-w-lg">
                  {service.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right side — timeline + arrow */}
        <div className="flex flex-col items-end gap-1.5 min-w-[120px]">
          <span className="font-mono text-[11px] text-white/20 transition-colors duration-300">
            {service.timeline}
          </span>
          <motion.span
            animate={{
              x: hovered ? 0 : 8,
              opacity: hovered ? 1 : 0,
            }}
            transition={{ duration: 0.2 }}
            className="font-sans text-[13px] font-bold"
            style={{ color: service.color }}
          >
            Explore →
          </motion.span>
        </div>

        {/* Accent line on hover */}
        <motion.div
          animate={{ scaleX: hovered ? 1 : 0 }}
          initial={{ scaleX: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 w-full h-[1px] origin-left"
          style={{ background: `linear-gradient(to right, ${service.color}, transparent)` }}
        />
      </motion.div>
    </Link>
  );
}

export default function Services() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(media.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  return (
    <section data-section="services-section" className="bg-[#060608] overflow-hidden relative py-20 sm:py-28">
      {/* Ambient glows */}
      <div
        aria-hidden
        className="absolute -top-[150px] -right-[150px] w-[600px] h-[600px] rounded-full pointer-events-none z-0 filter blur-[60px]"
        style={{ background: "radial-gradient(rgba(79,70,229,0.09), transparent 65%)" }}
      />
      
      <div className="container relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-4 h-0.5 bg-[#4F46E5]" />
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#4F46E5]">
                What we build
              </span>
            </div>
            <h2
              className="section-headline-reveal font-display font-extrabold text-white leading-[0.92] tracking-[-0.04em]"
              style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
            >
              Services
            </h2>
          </div>
          <p className="font-sans text-white/40 text-[15px] max-w-xs md:text-right hidden md:block">
            Every engagement scoped to your situation.
          </p>
        </div>

        {/* Service List */}
        <div className="divide-y border-y border-white/5">
          {services.map((service, i) => (
            <ServiceRow key={service.id} service={service} index={i} prefersReduced={prefersReduced} />
          ))}
        </div>

        {/* Footer row */}
        <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-white/5">
          <p className="text-white/30 text-[14px]">
            5 services. Every one delivered end-to-end.
          </p>
          <MagneticButton href="/services" variant="ghost">
            Full breakdown →
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
