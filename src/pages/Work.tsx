import SiteShell from "@/components/site/SiteShell";
import { projects } from "@/data/projects";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ClosingCTA from "@/components/sections/ClosingCTA";

export default function WorkPage() {
  return (
    <SiteShell>
      <section className="relative pt-32 pb-16">
        <div className="container">
          <span className="label-eyebrow text-cyan">Work</span>
          <h1 className="font-display font-extrabold text-ink mt-5 leading-[0.95] max-w-4xl" style={{ fontSize: "clamp(48px, 8vw, 96px)", letterSpacing: "-0.04em" }}>
            Built to <span className="text-gradient">deliver.</span>
          </h1>
          <p className="text-ink-muted text-lg mt-6 max-w-xl">A small portfolio because we keep our roster small. Every project ships, every project stays maintained.</p>
        </div>
      </section>
      <section className="surface-light py-[100px]">
        <div className="container grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <Link key={p.slug} to={`/work/${p.slug}`} className="group">
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.55, delay: i * 0.08 }}
                className="bg-white rounded-2xl overflow-hidden shadow-card-light">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                </div>
                <div className="p-6">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">{p.service} · {p.year}</div>
                  <h3 className="font-display font-bold text-[20px] text-ink-dark mt-1">{p.name}</h3>
                  <p className="text-sm text-ink-muted mt-2 leading-relaxed">{p.outcome}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>
      <ClosingCTA />
    </SiteShell>
  );
}
