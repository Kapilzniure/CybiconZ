import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";

const tabs = ["All", "E-Commerce", "Website", "Marketing"];

export default function Portfolio() {
  const [active, setActive] = useState("All");
  const featured = projects.find(p => p.featured)!;
  const others = projects.filter(p => !p.featured);

  return (
    <section className="surface-light relative py-[100px] overflow-hidden">
      <div aria-hidden className="absolute right-0 top-20 font-display font-extrabold pointer-events-none select-none" style={{ fontSize: "clamp(120px, 18vw, 260px)", color: "rgba(0,0,0,0.025)", letterSpacing: "-0.05em" }}>WORK</div>
      <div className="container relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-4 h-px bg-cyan" />
              <span className="label-eyebrow text-cyan">Selected Work</span>
            </div>
            <h2 className="font-display font-extrabold text-ink-dark leading-[0.95]" style={{ fontSize: "clamp(36px, 5vw, 64px)", letterSpacing: "-0.03em" }}>Work That Delivers.</h2>
          </div>
          <div className="flex gap-2 flex-wrap">
            {tabs.map(t => (
              <button key={t} onClick={() => setActive(t)} className={`text-sm font-semibold px-4 py-2 rounded-full transition ${active === t ? "bg-ink-dark text-white" : "border border-black/10 text-ink-muted hover:border-ink-dark"}`}>{t}</button>
            ))}
          </div>
        </div>

        {/* Featured */}
        <Link to={`/work/${featured.slug}`} className="block group">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }}
            className="bg-brand-card rounded-3xl overflow-hidden grid md:grid-cols-[1.3fr_1fr] border border-white/[0.06] transition-all hover:border-violet/30">
            <div className="relative overflow-hidden aspect-[4/3] md:aspect-auto">
              <img src={featured.image} alt={featured.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <span aria-hidden className="absolute -top-4 left-2 font-display font-extrabold text-white/[0.05]" style={{ fontSize: "240px", letterSpacing: "-0.05em" }}>01</span>
              <span className="absolute top-5 right-5 text-amber text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full" style={{ background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)" }}>{featured.service}</span>
            </div>
            <div className="p-12">
              <div className="font-mono text-[11px] text-ink-muted uppercase tracking-wider">Client · {featured.year}</div>
              <h3 className="font-display font-extrabold text-[30px] text-ink mt-2">{featured.name}</h3>
              <p className="text-[14px] text-ink-muted mt-4 leading-relaxed">{featured.outcome}</p>
              <div className="flex flex-wrap gap-2 mt-6">
                {featured.tags.map(t => (
                  <span key={t} className="text-[11px] text-ink-muted px-2.5 py-1 rounded-full bg-white/[0.07] border border-white/[0.08]">{t}</span>
                ))}
              </div>
              <div className="mt-8 inline-flex items-center gap-1.5 text-gradient text-sm font-bold">
                View Case Study <span className="transition-all group-hover:ml-1">→</span>
              </div>
            </div>
          </motion.div>
        </Link>

        {/* Grid below */}
        <div className="grid md:grid-cols-3 gap-5 mt-5">
          {others.map((p, i) => (
            <Link key={p.slug} to={`/work/${p.slug}`} className="group">
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.55, delay: i * 0.08 }}
                className="bg-white rounded-2xl overflow-hidden shadow-card-light">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                  <span aria-hidden className="absolute -bottom-6 right-2 font-display font-extrabold text-white/15" style={{ fontSize: "120px", letterSpacing: "-0.05em" }}>0{i+2}</span>
                </div>
                <div className="p-5">
                  <div className="font-mono text-[10px] text-ink-muted uppercase tracking-wider">{p.service} · {p.year}</div>
                  <h3 className="font-display font-bold text-[18px] text-ink-dark mt-1">{p.name}</h3>
                </div>
              </motion.div>
            </Link>
          ))}
          {/* Coming soon */}
          {[1, 2].slice(0, Math.max(0, 3 - others.length)).map(i => (
            <div key={i} className="rounded-2xl border-2 border-dashed border-black/[0.08] flex flex-col items-center justify-center min-h-[220px] p-6">
              <div className="font-display font-extrabold text-[60px] text-black/[0.08]">0{others.length + i + 1}</div>
              <div className="text-ink-muted text-sm mt-2">Project in progress</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
