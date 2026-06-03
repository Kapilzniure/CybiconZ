import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SiteShell from "@/components/site/SiteShell";
import Process from "@/components/sections/Process";
import FAQ from "@/components/sections/FAQ";
import ClosingCTA from "@/components/sections/ClosingCTA";
import { services } from "@/data/services";
import SplitText from "@/components/ui/SplitText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { usePageMeta } from "@/hooks/usePageMeta";
import { ServiceJsonLd } from "@/components/seo/JsonLd";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function ServicesPage() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  usePageMeta({
    title: "Services — Websites, E-Commerce & App Development",
    description: "Custom websites, e-commerce systems, and web applications built to work. No templates. No one-size-fits-all packages. Built to your specific business goals.",
  });
  return (
    <SiteShell>
      <ServiceJsonLd
        name="Website & Digital Product Development"
        description="Custom websites, e-commerce systems, and web applications built for businesses globally."
        url="https://cybiconz.com/services"
      />
      {/* SECTION 1 — HERO */}
      <section data-section="hero-section" className="relative bg-[#050507] pt-32 pb-16 overflow-hidden">
        <div className="container relative">
          <motion.div {...fadeUp(0)} className="flex items-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-white/30" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/70">Capabilities</span>
          </motion.div>
          <h1 className="font-display font-extrabold text-white leading-[0.9] mt-5" style={{ fontSize: "clamp(48px, 8vw, 100px)", letterSpacing: "-0.05em" }}>
            <SplitText as="span" className="block">What we build,</SplitText>
            <SplitText as="span" className="block" style={{ color: "rgba(255,255,255,0.65)" }} delay={0.24}>and how we build it.</SplitText>
          </h1>
          <motion.p
            className="mt-8 max-w-lg leading-relaxed text-[17px]"
            style={{ color: "rgba(255,255,255,0.75)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Every engagement is scoped individually to your business situation — 
            never a generic package from a list.
          </motion.p>
        </div>
      </section>

      {/* SECTION 2 — SERVICE DETAIL BLOCKS */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        {services.map((service, i) => {
          const isOdd = i % 2 === 0;
          return (
            <div
              key={service.id}
              className="py-20 relative overflow-hidden"
              style={{
                background: "#050507",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div className="container relative z-10">
                <div
                  className={`flex flex-col ${isOdd ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 lg:gap-24 items-start`}
                >
                  {/* TEXT SIDE */}
                  <motion.div
                    className="flex-1 w-full"
                    {...fadeUp(0)}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <span className="font-mono text-[11px] text-white/65 uppercase tracking-widest">{service.id}</span>
                      <div className="w-8 h-[1px] bg-white/20" />
                    </div>

                    <h2
                      className="font-display font-extrabold text-white leading-[0.95]"
                      style={{ fontSize: "clamp(32px, 4vw, 56px)", letterSpacing: "-0.04em" }}
                    >
                      <span className="text-gradient">{service.name}</span>
                    </h2>

                    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-10">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/65 mb-3">Goal</p>
                        <p className="text-[14px] leading-relaxed text-white/85">
                          {service.whoFor}
                        </p>
                      </div>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/65 mb-3">Deliverables</p>
                        <ul className="flex flex-col gap-2">
                          {service.delivers.map((item, j) => (
                            <li key={j} className="flex items-start gap-2 text-[14px] text-white/80">
                              <span className="w-1 h-1 rounded-full bg-white/20 mt-[8px]" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-12 flex items-center gap-8">
                      <div className="flex flex-col">
                        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/65 mb-1">Timeline</span>
                        <span className="font-display font-bold text-white text-[18px]">{service.timeline}</span>
                      </div>
                      <MagneticButton href="/contact" variant="primary">
                        Inquire →
                      </MagneticButton>
                    </div>
                  </motion.div>

                  {/* IMAGE SIDE */}
                  <motion.div
                    className="flex-1 w-full lg:sticky lg:top-32"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 1 }}
                  >
                    <div
                      className="relative rounded-2xl overflow-hidden transition-all duration-700"
                      style={{
                        border: "1px solid rgba(255,255,255,0.08)",
                        background: "rgba(255,255,255,0.02)",
                      }}
                    >
                      <img
                        src={service.image}
                        alt={service.name}
                        loading="lazy"
                        className="w-full object-cover aspect-[4/3] transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* SECTION 3 — PROCESS HEADER */}
      <section className="bg-[#050507] pt-20 pb-12" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container text-center">
          <motion.div {...fadeUp(0)} className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-white/10" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">Execution Sequence</span>
            <div className="w-8 h-[1px] bg-white/10" />
          </motion.div>
          <motion.h2
            className="font-display font-extrabold text-white mt-4 leading-[0.95]"
            style={{ fontSize: "clamp(36px, 5vw, 64px)", letterSpacing: "-0.04em" }}
            {...fadeUp(0.1)}
          >
            A consistent process.
          </motion.h2>
        </div>
      </section>
      <Process />

      {/* SECTION 4 — FAQ */}
      <FAQ heading="Technical & Process FAQs." />

      {/* SECTION 5 — CLOSING CTA */}
      <ClosingCTA />
    </SiteShell>
  );
}

