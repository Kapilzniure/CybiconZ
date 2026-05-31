import { motion } from "framer-motion";
import { useState, useEffect, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";
import { ProjectImagePlaceholder } from "@/components/ui/ProjectImagePlaceholder";
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
  { name: "LwangBlack Coffee", logo: "/lb-logo.png" },
  { name: "Johnnies Liquor",   logo: "/johnnies-logo.jpg" },
];

export default function Portfolio() {
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
    <section data-section="portfolio-section" className="relative py-[120px] overflow-hidden" style={{ background: "#050507", borderTop: "1px solid rgba(255,255,255,0.06)" } as CSSProperties}>
      <div aria-hidden className="absolute right-0 top-20 font-display font-extrabold pointer-events-none select-none" style={{ fontSize: "clamp(120px, 18vw, 260px)", color: "rgba(255,255,255,0.012)", letterSpacing: "-0.05em" }}>WORK</div>
      
      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-[1px] bg-white/30" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">Curated Work</span>
            </div>
            <h2 className="font-display font-extrabold text-white leading-[0.9] tracking-[-0.05em]" style={{ fontSize: "clamp(42px, 6vw, 84px)" }}>
              Selected work.<br />
              <span style={{ color: "rgba(255,255,255,0.25)" }}>Ships on time.</span>
            </h2>

            {/* Current clients row */}
            <div className="flex items-center gap-6 mt-10">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">Trusted partners</span>
              <div className="flex items-center gap-4">
                {currentClients.map((client) => (
                  <div
                    key={client.name}
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-white/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 12,
                        padding: "8px 16px",
                        position: "relative",
                      }}
                    >
                      <img
                        src={client.logo}
                        alt={client.name}
                        style={{
                          height: 32,
                          width: "auto",
                          objectFit: "contain",
                          display: "block",
                          filter: "brightness(1.5)",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {projects.length >= 4 && (
            <div className="flex gap-3 flex-wrap">
              {tabs.map(t => (
                <button key={t} onClick={() => setActive(t)} className={`text-[11px] font-mono uppercase tracking-widest px-5 py-2.5 rounded-xl transition ${active === t ? "bg-white text-black" : "border border-white/[0.1] text-white/40 hover:border-white/20 hover:text-white"}`}>{t}</button>
              ))}
            </div>
          )}
        </div>

        {/* Featured */}
        <Link to={`/work/${featured.slug}`} className="block group" data-cursor="view">
          <motion.div
            initial="hidden" 
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={prefersReduced ? reducedVariants : cardVariants}
            custom={0}
            className="bg-brand-card rounded-[32px] overflow-hidden grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] border border-white/[0.06] transition-all duration-500 ease-out hover:border-white/20 animate-gpu"
          >
            <div className="p-4 sm:p-6 lg:p-10 relative">
              <BrowserFrame url="lwangblack.co">
                <div className="relative aspect-[4/3] lg:aspect-video overflow-hidden">
                  {assetError[featured.slug] ? (
                    <ProjectImagePlaceholder projectName={featured.name} serviceColor="#FFFFFF" />
                  ) : (
                    <img
                      src={featured.image}
                      alt={featured.name}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      onError={() => setAssetError((prev) => ({ ...prev, [featured.slug]: true }))}
                    />
                  )}
                </div>
              </BrowserFrame>
            </div>
            <div className="p-8 sm:p-12 lg:pl-0 flex flex-col justify-center">
              <div className="font-mono text-[10px] text-white/30 uppercase tracking-[0.2em] mb-4">Case Study · {featured.year}</div>
              <h3 className="font-display font-extrabold text-[32px] sm:text-[48px] text-white leading-tight">{featured.name}</h3>
              <p className="text-[16px] text-white/45 mt-6 leading-relaxed max-w-md">{featured.outcome}</p>
              
              <div className="flex flex-wrap gap-2 mt-8">
                {featured.tags.map(t => (
                  <span key={t} className="text-[10px] text-white/40 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08]">{t}</span>
                ))}
              </div>
              
              <div className="mt-12 inline-flex items-center gap-3 text-white text-[11px] font-bold uppercase tracking-[0.2em]">
                Explore Study <span className="transition-transform group-hover:translate-x-2">→</span>
              </div>
            </div>
          </motion.div>
        </Link>

        {/* Grid below */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
          {others.map((p, i) => {
            return (
              <Link key={p.slug} to={`/work/${p.slug}`} className="group" data-cursor="view">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={prefersReduced ? reducedVariants : cardVariants}
                  custom={i + 1}
                  className="transition-all duration-500 ease-out animate-gpu"
                >
                  <MiniFrame>
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#0A0A12]">
                      {assetError[p.slug] ? (
                        <ProjectImagePlaceholder projectName={p.name} serviceColor="#FFFFFF" />
                      ) : (
                        <img
                          src={p.image}
                          alt={p.name}
                          loading="lazy"
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                          onError={() => setAssetError((prev) => ({ ...prev, [p.slug]: true }))}
                        />
                      )}
                    </div>
                  </MiniFrame>
                  <div className="mt-6 flex items-start justify-between">
                    <div>
                      <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/25 mb-1.5">{p.service} · {p.year}</div>
                      <h3 className="font-display font-bold text-[20px] text-white group-hover:text-white/80 transition-colors">{p.name}</h3>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/30 group-hover:bg-white group-hover:text-black transition-all">
                      <span className="text-[14px]">→</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
