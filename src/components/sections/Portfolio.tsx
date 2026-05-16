import { motion } from "framer-motion";
import { useState, useEffect, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";
import { FloatingGeometry } from "@/components/ui/FloatingGeometry";
import { ProjectImagePlaceholder } from "@/components/ui/ProjectImagePlaceholder";
import { useScrollVelocity } from "@/hooks/useScrollVelocity";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { MiniFrame } from "@/components/ui/MiniFrame";

const tabs = ["All", "E-Commerce", "Website", "Marketing"];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

const reducedVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } }
};

function FloatingMetricCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="absolute bottom-4 right-4 z-20 bg-[#0A0A18]/90 backdrop-blur-[12px] border border-white/10 rounded-lg py-2 px-3.5 flex items-center gap-2 shadow-2xl"
    >
      <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-pulse" />
      <span className="font-mono text-[10px] text-white/50 tracking-wider whitespace-nowrap">
        Live · Multi-Country · Multi-Currency
      </span>
    </motion.div>
  );
}

const currentClients = [
  { initials: "LB", color: "#F59E0B" },
  { initials: "JL", color: "#EC4899" }
];

export default function Portfolio() {
  const velocity = useScrollVelocity();
  const floatSpeed = Math.max(3, 10 - velocity * 0.3);

  const [active, setActive] = useState("All");
  const [prefersReduced, setPrefersReduced] = useState(false);
  const [assetError, setAssetError] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(media.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  const featured = projects.find(p => p.featured)!;
  const others = projects.filter(p => !p.featured);

  return (
    <section data-section="portfolio-section" className="relative py-[100px] overflow-hidden" style={{ background: "#0A0A12", borderTop: "1px solid rgba(255,255,255,0.05)", "--float-speed": floatSpeed } as CSSProperties}>
      {/* Glow Story - Portfolio */}
      <div aria-hidden style={{ position: "absolute", top: "-100px", right: "-100px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(rgba(6,182,212,0.1), transparent 65%)", pointerEvents: "none", zIndex: 0, filter: "blur(1px)" }} />
      {!prefersReduced && <FloatingGeometry variant="torus" color="#06B6D4" size={140} opacity={0.10} position={{ top: '5%', right: '4%' }} speed={10} />}
      <div aria-hidden style={{ position: "absolute", bottom: "-50px", left: "-50px", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(rgba(6,182,212,0.05), transparent 65%)", pointerEvents: "none", zIndex: 0, filter: "blur(1px)" }} />
      
      <div aria-hidden className="absolute right-0 top-20 font-display font-extrabold pointer-events-none select-none" style={{ fontSize: "clamp(120px, 18vw, 260px)", color: "rgba(255,255,255,0.018)", letterSpacing: "-0.05em" }}>WORK</div>
      
      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-4 h-px bg-violet" />
              <span className="label-eyebrow text-violet">Selected Work</span>
            </div>
            <h2 className="section-headline-reveal font-display font-extrabold text-white leading-[0.95]" style={{ fontSize: "clamp(48px, 6vw, 72px)", letterSpacing: "-0.04em" }}>
              Work That <br />
              <span className="text-gradient">Delivers.</span>
            </h2>

            {/* Current clients row */}
            <div className="flex items-center gap-4 mt-8">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/25">Current clients</span>
              <div className="flex items-center -space-x-2">
                {currentClients.map((client, i) => (
                  <div 
                    key={i}
                    className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center font-mono text-[9px] font-bold"
                    style={{ backgroundColor: `${client.color}22`, color: client.color }}
                  >
                    {client.initials}
                  </div>
                ))}
              </div>
            </div>
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
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={prefersReduced ? reducedVariants : cardVariants}
            custom={0}
            className="bg-brand-card rounded-[32px] overflow-hidden grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] border border-white/[0.06] transition-all duration-300 ease-in-out hover:-translate-y-[6px] hover:border-violet/30 hover:shadow-2xl animate-gpu"
          >
            <div className="p-4 sm:p-6 lg:p-10 relative">
              <BrowserFrame url="lwangblack.com" accentColor="#F59E0B">
                <div className="relative aspect-[4/3] lg:aspect-video overflow-hidden">
                  {assetError[featured.slug] ? (
                    <ProjectImagePlaceholder projectName={featured.name} serviceColor={featured.serviceColor} />
                  ) : (
                    <img
                      src={featured.image}
                      alt={featured.name}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      onError={() => setAssetError((prev) => ({ ...prev, [featured.slug]: true }))}
                    />
                  )}
                  <FloatingMetricCard />
                </div>
              </BrowserFrame>
            </div>
            <div className="p-8 sm:p-12 lg:pl-0 flex flex-col justify-center">
              <div className="font-mono text-[11px] text-ink-muted uppercase tracking-wider">Client · {featured.year}</div>
              <h3 className="font-display font-extrabold text-[24px] sm:text-[36px] text-ink mt-2 leading-tight group-hover:text-white transition-colors">{featured.name}</h3>
              <p className="text-[15px] text-ink-muted mt-4 leading-relaxed max-w-md">{featured.outcome}</p>
              
              <div className="flex flex-wrap gap-2 mt-8">
                {featured.tags.map(t => (
                  <span key={t} className="text-[10px] sm:text-[11px] text-ink-muted px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08]">{t}</span>
                ))}
              </div>
              
              <div className="mt-10 inline-flex items-center gap-2 text-violet text-sm font-bold uppercase tracking-widest">
                Explore Case Study <span className="transition-all group-hover:translate-x-1">→</span>
              </div>
            </div>
          </motion.div>
        </Link>

        {/* Grid below */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {others.map((p, i) => {
            return (
              <Link key={p.slug} to={`/work/${p.slug}`} className="group" data-cursor="view">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={prefersReduced ? reducedVariants : cardVariants}
                  custom={i + 1}
                  className="transition-all duration-300 ease-in-out hover:-translate-y-[6px] animate-gpu"
                >
                  <MiniFrame>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {assetError[p.slug] ? (
                        <ProjectImagePlaceholder projectName={p.name} serviceColor={p.serviceColor} />
                      ) : (
                        <img
                          src={p.image}
                          alt={p.name}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          onError={() => setAssetError((prev) => ({ ...prev, [p.slug]: true }))}
                        />
                      )}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                    </div>
                  </MiniFrame>
                  <div className="mt-5">
                    <div className="font-mono text-[10px] uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>{p.service} · {p.year}</div>
                    <h3 className="font-display font-bold text-[19px] mt-1.5 text-white/90 group-hover:text-white transition-colors">{p.name}</h3>
                  </div>
                </motion.div>
              </Link>
            );
          })}
          
          {/* Coming soon placeholder */}
          {[1, 2].slice(0, Math.max(0, 3 - others.length)).map(i => (
            <div key={i} className="rounded-2xl flex flex-col items-center justify-center min-h-[220px] p-6 group transition-all duration-300" style={{ background: "rgba(255,255,255,0.01)", border: "1.5px dashed rgba(255,255,255,0.06)" }}>
              <div className="font-display font-extrabold text-[48px] text-white/5 transition-colors group-hover:text-white/10">0{others.length + i + 1}</div>
              <div className="text-[12px] uppercase tracking-widest mt-2 text-white/10 group-hover:text-white/20">Development in progress</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
