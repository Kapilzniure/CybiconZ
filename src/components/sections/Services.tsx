import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { services } from "@/data/services";
import { MagneticButton } from "@/components/ui/MagneticButton";

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

        {/* Card grid — 2 cols on desktop, last card spans full width */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -5, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }}
              className={`group relative rounded-2xl cursor-pointer overflow-hidden${i === 4 ? " md:col-span-2" : ""}`}
              style={{
                background: "#0F0F1C",
                border: "1px solid rgba(255,255,255,0.07)",
                borderTop: `2px solid ${service.color}`,
              }}
            >
              <Link
                to="/services"
                className="absolute inset-0 z-10"
                aria-label={`Learn about ${service.name}`}
              />

              {/* Ghost number */}
              <div
                aria-hidden
                className="absolute bottom-0 right-5 font-display font-extrabold pointer-events-none select-none leading-none"
                style={{ fontSize: "clamp(90px, 12vw, 140px)", color: "rgba(255,255,255,0.025)" }}
              >
                {service.id}
              </div>

              <div
                className={`relative z-[1] p-7 sm:p-9${i === 4 ? " md:grid md:grid-cols-[1fr_auto] md:gap-8 md:items-end" : ""}`}
              >
                {/* Main content */}
                <div>
                  {/* Top meta row */}
                  <div className="flex items-center gap-3 mb-5">
                    <span className="font-mono text-[10px] text-white/25 uppercase tracking-wider">
                      {service.id}
                    </span>
                    <span className="w-px h-3 bg-white/10" />
                    <span
                      className="font-mono text-[10px] uppercase tracking-wider"
                      style={{ color: service.color }}
                    >
                      {service.category}
                    </span>
                    {service.popular && (
                      <span
                        className="ml-auto font-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                        style={{
                          background: `${service.color}20`,
                          color: service.color,
                          border: `1px solid ${service.color}40`,
                        }}
                      >
                        Popular
                      </span>
                    )}
                  </div>

                  {/* Service name */}
                  <h3
                    className="font-display font-extrabold text-white leading-tight mb-3 transition-transform duration-300 group-hover:translate-x-1"
                    style={{ fontSize: "clamp(20px, 2.6vw, 30px)", letterSpacing: "-0.02em" }}
                  >
                    {service.name}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-[13px] sm:text-[14px] leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    {service.description}
                  </p>
                </div>

                {/* Bottom: timeline + arrow */}
                <div
                  className={`flex items-center justify-between gap-4${i === 4 ? " mt-5 md:mt-0 md:flex-col md:items-end md:justify-end" : " mt-6"}`}
                >
                  <span
                    className="font-mono text-[11px]"
                    style={{ color: "rgba(255,255,255,0.2)" }}
                  >
                    {service.timeline}
                  </span>
                  <span
                    className="text-[12px] sm:text-[13px] font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 group-hover:gap-2.5 transition-all duration-300 whitespace-nowrap"
                    style={{ color: service.color }}
                  >
                    Explore <span>→</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer row */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-white/[0.06]">
          <p className="font-sans font-medium text-[14px] text-white/35">
            5 services. Every one delivered end-to-end.
          </p>
          <MagneticButton href="/services" variant="ghost">
            View full breakdown →
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
