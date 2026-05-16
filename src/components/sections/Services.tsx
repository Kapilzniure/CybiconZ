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

const iconCardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.06,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

const serviceIcons = [
  {
    icon: (color: string) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-300 group-hover:[filter:drop-shadow(0_0_8px_var(--glow-color))]">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        <style>{` .group:hover { --glow-color: ${color}; } `}</style>
      </svg>
    ),
    label: 'Websites',
    sub: '3–6 weeks',
    color: '#4F46E5',
    bg: 'rgba(79,70,229,0.08)'
  },
  {
    icon: (color: string) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-300 group-hover:[filter:drop-shadow(0_0_8px_var(--glow-color))]">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        <style>{` .group:hover { --glow-color: ${color}; } `}</style>
      </svg>
    ),
    label: 'E-Commerce',
    sub: '6–10 weeks',
    color: '#F59E0B',
    bg: 'rgba(245,158,11,0.08)'
  },
  {
    icon: (color: string) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-300 group-hover:[filter:drop-shadow(0_0_8px_var(--glow-color))]">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
        <style>{` .group:hover { --glow-color: ${color}; } `}</style>
      </svg>
    ),
    label: 'UI/UX Design',
    sub: '4–8 weeks',
    color: '#EC4899',
    bg: 'rgba(236,72,153,0.08)'
  },
  {
    icon: (color: string) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-300 group-hover:[filter:drop-shadow(0_0_8px_var(--glow-color))]">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <style>{` .group:hover { --glow-color: ${color}; } `}</style>
      </svg>
    ),
    label: 'Web Apps',
    sub: '8–14 weeks',
    color: '#06B6D4',
    bg: 'rgba(6,182,212,0.08)'
  },
  {
    icon: (color: string) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-300 group-hover:[filter:drop-shadow(0_0_8px_var(--glow-color))]">
        <path d="M11 5L6 9H2v6h4l5 4V5z" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        <style>{` .group:hover { --glow-color: ${color}; } `}</style>
      </svg>
    ),
    label: 'Marketing',
    sub: 'Ongoing',
    color: '#10B981',
    bg: 'rgba(16,185,129,0.08)'
  }
];

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
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-4 h-0.5 bg-[#4F46E5]" />
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#4F46E5]">
                What we build
              </span>
            </div>
            <h2
              className="section-headline-reveal font-display font-extrabold text-white leading-[0.92] tracking-[-0.04em] mb-4"
              style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
            >
              Five services. Every one end-to-end.
            </h2>
            <p className="font-sans text-white/40 text-[16px] max-w-xl">
              We scope each project individually. No packages, no guessing.
            </p>
          </div>
        </div>

        {/* Icon Summary Row */}
        <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-16 sm:mb-20">
          {serviceIcons.map((item, i) => (
            <motion.div
              key={item.label}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={iconCardVariants}
              whileHover={{ 
                y: -3,
                backgroundColor: `${item.color}1F`, // 0.12 opacity
                borderColor: `${item.color}80`    // 0.5 opacity
              }}
              className="group flex-1 min-w-[160px] h-[100px] p-5 rounded-[16px] border transition-all duration-300 flex flex-col justify-between"
              style={{ 
                backgroundColor: item.bg,
                borderColor: `${item.color}26` // rgba(color, 0.15) approx
              }}
            >
              <div className="flex flex-col">
                <div className="mb-2">
                  {item.icon(item.color)}
                </div>
                <h4 className="font-display font-bold text-[15px] text-white">
                  {item.label}
                </h4>
              </div>
              <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
                {item.sub}
              </span>
            </motion.div>
          ))}
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
