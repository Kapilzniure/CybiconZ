import { motion } from "framer-motion";
import { useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";
import SplitText from "@/components/ui/SplitText";
import { FloatingGeometry } from "@/components/ui/FloatingGeometry";
import { useScrollVelocity } from "@/hooks/useScrollVelocity";

const tabs = ["All", "E-Commerce", "Website", "Marketing"];

export default function Portfolio() {
  const velocity = useScrollVelocity();
  const floatSpeed = Math.max(3, 10 - velocity * 0.3);

  const [active, setActive] = useState("All");
  const featured = projects.find(p => p.featured)!;
  const others = projects.filter(p => !p.featured);

  return (
    <section data-section="portfolio-section" className="relative py-[100px] overflow-hidden" style={{ background: "#0A0A12", borderTop: "1px solid rgba(255,255,255,0.05)", "--float-speed": floatSpeed } as CSSProperties}>
      {/* Cyan glow — top-right */}
      <div aria-hidden style={{ position: "absolute", top: "-100px", right: "-100px", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(rgba(6,182,212,0.09), transparent 65%)", pointerEvents: "none", zIndex: 0 }} />
      <FloatingGeometry variant="torus" color="#06B6D4" size={140} opacity={0.10} position={{ top: '5%', right: '4%' }} speed={10} />
      {/* Cyan glow — bottom-left, dimmer */}
      <div aria-hidden style={{ position: "absolute", bottom: "-80px", left: "-80px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(rgba(6,182,212,0.04), transparent 65%)", pointerEvents: "none", zIndex: 0 }} />
      <div aria-hidden className="absolute right-0 top-20 font-display font-extrabold pointer-events-none select-none" style={{ fontSize: "clamp(120px, 18vw, 260px)", color: "rgba(255,255,255,0.018)", letterSpacing: "-0.05em" }}>WORK</div>
      <div className="container relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-4 h-px bg-violet" />
              <span className="label-eyebrow text-violet">Selected Work</span>
            </div>
            <h2 className="section-headline-reveal font-display font-extrabold text-ink leading-[0.95]" style={{ fontSize: "clamp(36px, 5vw, 64px)", letterSpacing: "-0.03em" }}>Work That Delivers.</h2>
          </div>
          <div className="flex gap-2 flex-wrap">
            {tabs.map(t => (
              <button key={t} onClick={() => setActive(t)} className={`text-sm font-semibold px-4 py-2 rounded-full transition ${active === t ? "bg-white/10 text-white border border-white/20" : "border border-white/[0.08] text-white/30 hover:border-white/15"}`}>{t}</button>
            ))}
          </div>
        </div>

        {/* Featured */}
        <Link to={`/work/${featured.slug}`} className="block group" data-cursor="view">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="bg-brand-card rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] border border-white/[0.06] transition-all duration-250 ease-in-out hover:-translate-y-[6px] hover:border-violet/30 hover:shadow-2xl"
            style={{ borderTop: '3px solid #F59E0B' }} // Amber for LwangBlack
          >
            <div className="relative overflow-hidden aspect-[4/3] lg:aspect-auto">
              <img src={featured.image} alt={featured.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <span aria-hidden className="absolute -top-4 left-2 font-display font-extrabold text-white/[0.05] hidden sm:block" style={{ fontSize: "240px", letterSpacing: "-0.05em" }}>01</span>
              <span className="absolute top-5 right-5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full" style={{ color: "#818CF8", background: "rgba(79,70,229,0.15)", border: "1px solid rgba(79,70,229,0.3)" }}>{featured.service}</span>
            </div>
            <div className="p-8 sm:p-12">
              <div className="font-mono text-[11px] text-ink-muted uppercase tracking-wider">Client · {featured.year}</div>
              <h3 className="font-display font-extrabold text-[24px] sm:text-[30px] text-ink mt-2 leading-tight">{featured.name}</h3>
              <p className="text-[14px] text-ink-muted mt-4 leading-relaxed">{featured.outcome}</p>
              <div className="flex flex-wrap gap-2 mt-6">
                {["Multi-country", "Multi-currency", "Live since 2024"].map(label => (
                  <span key={label} className="font-mono text-[10px] sm:text-[11px] px-3 py-1 rounded-full" style={{ background: "rgba(79,70,229,0.12)", border: "1px solid rgba(79,70,229,0.3)", color: "#818CF8" }}>
                    {label}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {featured.tags.map(t => (
                  <span key={t} className="text-[10px] sm:text-[11px] text-ink-muted px-2.5 py-1 rounded-full bg-white/[0.07] border border-white/[0.08]">{t}</span>
                ))}
              </div>
              <div className="mt-8 inline-flex items-center gap-1.5 text-gradient text-sm font-bold">
                View Case Study <span className="transition-all group-hover:ml-1">→</span>
              </div>
            </div>
          </motion.div>
        </Link>

        {/* Grid below */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {others.map((p, i) => {
            // Johnnies Liquor card gets pink top border
            const isJohnnies = p.slug === 'johnnies-liquor';
            return (
              <Link key={p.slug} to={`/work/${p.slug}`} className="group" data-cursor="view">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl overflow-hidden transition-all duration-250 ease-in-out hover:-translate-y-[6px] hover:shadow-xl"
                  style={{ background: "#0F0F1C", border: "1px solid rgba(255,255,255,0.07)", borderTop: isJohnnies ? '3px solid #EC4899' : undefined }}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700" />
                    <span aria-hidden className="absolute -bottom-6 right-2 font-display font-extrabold text-white/15 hidden sm:block" style={{ fontSize: "120px", letterSpacing: "-0.05em" }}>0{i+2}</span>
                  </div>
                  <div className="p-5">
                    <div className="font-mono text-[10px] uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>{p.service} · {p.year}</div>
                    <h3 className="font-display font-bold text-[17px] sm:text-[18px] mt-1" style={{ color: "#F0EEFF" }}>{p.name}</h3>
                  </div>
                </motion.div>
              </Link>
            );
          })}
          {/* Coming soon */}
          {[1, 2].slice(0, Math.max(0, 3 - others.length)).map(i => (
            <div key={i} className="rounded-2xl flex flex-col items-center justify-center min-h-[180px] sm:min-h-[220px] p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1.5px dashed rgba(255,255,255,0.08)", borderTop: '3px dashed rgba(255,255,255,0.08)' }}>
              <div className="font-display font-extrabold text-[48px] sm:text-[60px]" style={{ color: "rgba(255,255,255,0.04)" }}>0{others.length + i + 1}</div>
              <div className="text-[13px] sm:text-sm mt-2" style={{ color: "rgba(255,255,255,0.2)" }}>Project in progress</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
