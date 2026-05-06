import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const steps = [
  { n: "01", name: "Discovery", d: "We learn about your goals before designing anything." },
  { n: "02", name: "Design", d: "Direction locked and approved before development starts." },
  { n: "03", name: "Build", d: "You review at every milestone. Nothing ships without sign-off." },
  { n: "04", name: "Handoff", d: "Complete product with documentation. Nothing left unexplained." },
];

export default function Process() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      <div className="bg-brand-base p-8 sm:p-16 md:p-20 flex flex-col justify-center">
        <span className="label-eyebrow text-violet mb-4">Process</span>
        <h2 className="section-headline-reveal font-display font-extrabold text-ink leading-[0.95]" style={{ fontSize: "clamp(36px, 5vw, 64px)", letterSpacing: "-0.03em" }}>
          How an Engagement Works
        </h2>
        <p className="text-ink-muted text-base mt-6 max-w-md">You stay in control at every stage. No surprises.</p>
        <div className="mt-8 flex flex-row gap-1.5">
          <div className="h-1 w-10 rounded-full bg-violet" />
          <div className="h-1 w-10 rounded-full bg-violet opacity-40" />
          <div className="h-1 w-10 rounded-full bg-violet opacity-20" />
        </div>
      </div>
      <div className="surface-light p-8 sm:p-16 md:p-20">
        <div className="flex flex-col">
          {steps.map((s, i) => (
            <motion.div key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`group flex items-start sm:items-center gap-5 sm:gap-6 py-7 px-4 -mx-4 rounded-xl transition-colors duration-200 hover:bg-violet/[0.04] ${i < steps.length - 1 ? "border-b border-black/[0.07]" : ""}`}
            >
              <div className="font-display font-extrabold text-[44px] sm:text-[52px] leading-none transition-opacity duration-200 opacity-[0.15] group-hover:opacity-[0.9] shrink-0" style={{ color: "#FFFFFF" }}>{s.n}</div>
              <div>
                <h3 className="font-display font-bold text-[18px] text-ink-dark">{s.name}</h3>
                <p className="service-desc-reveal text-sm text-ink-muted mt-1.5 max-w-sm leading-relaxed">{s.d}</p>
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 rounded-xl px-5 py-4"
            style={{ background: "rgba(124,58,237,0.05)", border: "1px solid rgba(124,58,237,0.15)" }}
          >
            <Link to="/contact" className="flex items-center justify-between group/cta">
              <span className="text-[14px] font-semibold" style={{ color: "#0A0B14" }}>
                Ready to start?
              </span>
              <span className="text-[13px] font-bold transition-all group-hover/cta:gap-2" style={{ color: "hsl(var(--accent-from))" }}>
                Get in touch →
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
