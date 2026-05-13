import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { services } from "@/data/services";
import type { Service } from "@/data/services";
import { MagneticButton } from "@/components/ui/MagneticButton";

function ServiceRow({ service, index }: { service: Service; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link to="/services">
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22,1,0.36,1] }}
        style={{
          padding: '28px 0',
          display: 'grid',
          gridTemplateColumns: '80px 1fr auto',
          alignItems: 'center',
          gap: '24px',
          cursor: 'pointer',
          transition: 'all 0.25s ease',
        }}
      >
        {/* Number */}
        <span style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: 12,
          color: hovered ? service.color : 'rgba(255,255,255,0.2)',
          letterSpacing: '0.1em',
          transition: 'color 0.25s ease',
        }}>
          {service.id}
        </span>

        {/* Main content */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <h3 style={{
              fontFamily: 'Bricolage Grotesque, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(20px, 3vw, 32px)',
              letterSpacing: '-0.02em',
              color: hovered ? '#ffffff' : 'rgba(255,255,255,0.75)',
              transition: 'color 0.25s ease',
              lineHeight: 1.1,
            }}>
              {service.name}
            </h3>
            {service.popular && (
              <span style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: 10,
                padding: '3px 10px',
                borderRadius: 4,
                background: `${service.color}18`,
                border: `1px solid ${service.color}40`,
                color: service.color,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>
                Popular
              </span>
            )}
          </div>

          {/* Description — slides down on hover */}
          <motion.div
            initial={false}
            animate={{
              height: hovered ? 'auto' : 0,
              opacity: hovered ? 1 : 0,
              marginTop: hovered ? 8 : 0
            }}
            transition={{ duration: 0.25, ease: [0.22,1,0.36,1] }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontSize: 14,
              color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.6,
              maxWidth: 560,
            }}>
              {service.description}
            </p>
          </motion.div>
        </div>

        {/* Right side — timeline + arrow */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 6,
          minWidth: 120
        }}>
          <span style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: 11,
            color: 'rgba(255,255,255,0.2)',
            transition: 'color 0.25s ease',
          }}>
            {service.timeline}
          </span>
          <motion.span
            animate={{
              x: hovered ? 0 : 8,
              opacity: hovered ? 1 : 0,
              color: service.color
            }}
            transition={{ duration: 0.2 }}
            style={{
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontSize: 13,
              fontWeight: 700,
              color: service.color,
            }}
          >
            Explore →
          </motion.span>
        </div>
      </motion.div>

      {/* Accent line on hover */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          height: 1,
          background: `linear-gradient(to right, ${service.color}, transparent)`,
          transformOrigin: 'left',
          marginTop: -1,
        }}
      />
    </Link>
  );
}

export default function Services() {
  return (
    <section data-section="services-section" className="bg-[#060608] overflow-hidden relative py-20 sm:py-28">
      {/* Ambient violet glow */}
      <div
        aria-hidden
        style={{
          position: "absolute", top: "-150px", right: "-150px",
          width: "600px", height: "600px", borderRadius: "50%",
          background: "radial-gradient(rgba(79,70,229,0.09), transparent 65%)",
          pointerEvents: "none", zIndex: 0, filter: "blur(60px)",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute", bottom: "-100px", left: "-100px",
          width: "400px", height: "400px", borderRadius: "50%",
          background: "radial-gradient(rgba(79,70,229,0.06), transparent 65%)",
          pointerEvents: "none", zIndex: 0, filter: "blur(60px)",
        }}
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
        <div className="divide-y" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          {services.map((service, i) => (
            <ServiceRow key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* Footer row */}
        <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-4 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: 14,
            color: 'rgba(255,255,255,0.3)'
          }}>
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
