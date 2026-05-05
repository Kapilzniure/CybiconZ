import SiteShell from "@/components/site/SiteShell";
import { services } from "@/data/services";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ClosingCTA from "@/components/sections/ClosingCTA";

export default function ServicesPage() {
  return (
    <SiteShell>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-overlay" />
        <div className="absolute -top-32 right-0 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "rgba(124,58,237,0.12)", filter: "blur(120px)" }} />
        <div className="container relative">
          <span className="label-eyebrow text-violet">Services</span>
          <h1 className="font-display font-extrabold text-ink mt-5 leading-[0.95] max-w-4xl" style={{ fontSize: "clamp(48px, 8vw, 96px)", letterSpacing: "-0.04em" }}>
            Everything you need to <span className="text-gradient">ship and grow.</span>
          </h1>
          <p className="text-ink-muted text-lg mt-6 max-w-xl">From a single landing page to a full e-commerce system — we scope it honestly, build it carefully, and stay around when it's done.</p>
        </div>
      </section>
      <section className="surface-light py-[100px]">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <motion.div key={s.id}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay: i * 0.07 }}
                className="bg-white rounded-2xl overflow-hidden shadow-card-light flex flex-col md:flex-row">
                <div className="md:w-2/5 relative aspect-[3/2] md:aspect-auto overflow-hidden">
                  <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 bg-black/45 backdrop-blur text-white text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">{s.category}</div>
                </div>
                <div className="p-6 md:p-8 flex-1">
                  <div className="font-mono text-[10px] uppercase tracking-wider mb-2" style={{ color: s.accent }}>{s.id} · {s.category}</div>
                  <h3 className="font-display font-bold text-[22px] text-ink-dark">{s.name}</h3>
                  <p className="text-[14px] text-ink-muted mt-3 leading-relaxed">{s.description}</p>
                  <Link to="/contact" className="inline-flex items-center gap-1 mt-5 text-sm font-bold" style={{ color: s.accent }}>
                    Talk to us about it →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <ClosingCTA />
    </SiteShell>
  );
}
