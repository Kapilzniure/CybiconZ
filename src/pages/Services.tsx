import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SiteShell from "@/components/site/SiteShell";
import Process from "@/components/sections/Process";
import FAQ from "@/components/sections/FAQ";
import ClosingCTA from "@/components/sections/ClosingCTA";
import { services } from "@/data/services";
import SplitText from "@/components/ui/SplitText";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function ServicesPage() {
  return (
    <SiteShell>
      {/* SECTION 1 — HERO */}
      <section className="relative bg-brand-base pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 grid-overlay pointer-events-none" />
        <div
          className="absolute -top-32 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "rgba(124,58,237,0.12)", filter: "blur(120px)" }}
        />
        <div className="container relative">
          <motion.span
            className="label-eyebrow text-violet"
            {...fadeUp(0)}
          >
            Services
          </motion.span>
          <h1 className="font-display font-extrabold text-ink leading-[0.95] mt-5" style={{ fontSize: "clamp(52px, 8vw, 96px)", letterSpacing: "-0.04em" }}>
            <SplitText as="span" className="block">What we build,</SplitText>
            <SplitText as="span" className="block" style={{ opacity: 0.7 }} delay={0.24}>and how we build it.</SplitText>
          </h1>
          <motion.p
            className="text-ink-muted mt-6 max-w-lg"
            style={{ fontSize: 17 }}
            {...fadeUp(0.2)}
          >
            Every engagement is scoped to your situation — not a package from a dropdown.
          </motion.p>
        </div>
      </section>

      {/* SECTION 2 — SERVICE DETAIL BLOCKS */}
      <section className="surface-light">
        {services.map((service, i) => {
          const isOdd = i % 2 === 0;
          return (
            <div
              key={service.id}
              className={`py-20 ${i < services.length - 1 ? "border-b border-black/[0.06]" : ""}`}
            >
              <div className="container">
                <div
                  className={`flex flex-col ${isOdd ? "lg:flex-row" : "lg:flex-row-reverse"} gap-10 lg:gap-16 items-center`}
                >
                  {/* TEXT SIDE */}
                  <motion.div
                    className="flex-1 w-full"
                    {...fadeUp(0)}
                  >
                    <span
                      className="inline-flex items-center px-3 py-1 rounded-full text-[10px] sm:text-[12px] font-semibold font-mono uppercase tracking-wider text-white"
                      style={{ background: service.accent }}
                    >
                      {service.category}
                    </span>

                    <h2
                      className="font-display font-extrabold text-ink-dark mt-4 leading-[0.95]"
                      style={{ fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-0.03em" }}
                    >
                      {service.name}
                    </h2>

                    <p className="font-sans font-semibold text-[11px] sm:text-[13px] uppercase tracking-wider text-ink-muted mt-8 mb-3">
                      Who it's for
                    </p>
                    <p className="text-[14px] sm:text-[15px] text-ink-muted leading-relaxed max-w-md">
                      {service.whoFor}
                    </p>

                    <p className="font-sans font-semibold text-[11px] sm:text-[13px] uppercase tracking-wider text-ink-muted mt-7 mb-3">
                      What we deliver
                    </p>
                    <ul className="flex flex-col gap-2.5">
                      {service.delivers.map((item, j) => (
                        <motion.li
                          key={j}
                          className="flex items-start gap-3 text-[14px] sm:text-[15px] text-ink-muted leading-snug"
                          initial={{ opacity: 0, x: -8 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: j * 0.06 }}
                        >
                          <span
                            className="mt-[7px] shrink-0 w-[6px] h-[6px] rounded-full"
                            style={{ background: service.accent }}
                          />
                          {item}
                        </motion.li>
                      ))}
                    </ul>

                    <p className="font-sans font-semibold text-[11px] sm:text-[13px] uppercase tracking-wider text-ink-muted mt-7 mb-2">
                      Typical timeline
                    </p>
                    <p
                      className="font-display font-bold text-ink-dark text-[17px] sm:text-[18px]"
                    >
                      {service.timeline}
                    </p>

                    {service.note && (
                      <p className="text-[12px] sm:text-[13px] text-ink-muted italic mt-3 max-w-md leading-relaxed">
                        {service.note}
                      </p>
                    )}

                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-1 mt-8 text-[14px] sm:text-[15px] font-bold transition-opacity hover:opacity-70"
                      style={{ color: service.accent }}
                    >
                      Start this project →
                    </Link>
                  </motion.div>

                  {/* IMAGE SIDE */}
                  <motion.div
                    className="flex-1 w-full mt-4 lg:mt-0"
                    {...fadeUp(0.1)}
                  >
                    <div
                      className="relative rounded-2xl overflow-hidden shadow-card-light transition-transform duration-500"
                      style={{
                        transform: `perspective(1200px) rotateY(${isOdd ? "-4deg" : "4deg"}) rotateX(2deg)`,
                      }}
                    >
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full object-cover"
                        style={{ aspectRatio: "4/3" }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* SECTION 3 — PROCESS HEADER */}
      <section className="bg-brand-base pt-20 pb-12" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container text-center">
          <motion.span
            className="label-eyebrow text-violet"
            {...fadeUp(0)}
          >
            How we work
          </motion.span>
          <motion.h2
            className="font-display font-extrabold text-ink mt-4 leading-[0.95]"
            style={{ fontSize: "clamp(36px, 5vw, 64px)", letterSpacing: "-0.03em" }}
            {...fadeUp(0.1)}
          >
            The same process, every project.
          </motion.h2>
        </div>
      </section>
      <Process />

      {/* SECTION 4 — FAQ */}
      <FAQ heading="Common questions about our services." />

      {/* SECTION 5 — CLOSING CTA */}
      <ClosingCTA />
    </SiteShell>
  );
}

