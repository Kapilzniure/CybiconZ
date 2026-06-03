import SiteShell from "@/components/site/SiteShell";
import { projects } from "@/data/projects";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ClosingCTA from "@/components/sections/ClosingCTA";
import SplitText from "@/components/ui/SplitText";
import { usePageMeta } from "@/hooks/usePageMeta";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function WorkPage() {
  usePageMeta({
    title: "Work — Current and Recent Projects",
    description: "A look at what we're building — websites, e-commerce platforms, and web applications for businesses globally. Documented honestly, including active projects.",
  });
  return (
    <SiteShell>
      {/* HERO */}
      <section data-section="hero-section" className="relative bg-[#050507] pt-28 pb-12 overflow-hidden">
        <div className="container relative">
          <motion.div {...fadeUp(0)} className="flex items-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-white/30" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/70">Portfolio</span>
          </motion.div>

          <h1 className="font-display font-extrabold text-white leading-[0.9] mt-5 max-w-4xl" style={{ fontSize: "clamp(36px, 6vw, 76px)", letterSpacing: "-0.05em" }}>
            <SplitText as="span" className="block">Work we're building.</SplitText>
            <SplitText as="span" className="block" style={{ color: "rgba(255,255,255,0.6)" }} delay={0.3}>Selected Case Studies.</SplitText>
          </h1>
          <motion.p 
            className="mt-8 max-w-lg leading-relaxed text-[17px]"
            style={{ color: "rgba(255,255,255,0.85)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            We focus on technical execution and measurable results. 
            Every project here was delivered on objective.
          </motion.p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-[#050507]" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <Link key={p.slug} to={`/work/${p.slug}`} className="group block" data-cursor="view">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl overflow-hidden transition-all duration-250 ease-in-out hover:-translate-y-[6px] shadow-sm hover:shadow-xl"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-8">
                  <div className="font-mono text-[10px] uppercase tracking-widest mb-1.5" style={{ color: "rgba(255,255,255,0.65)" }}>{p.service} · {p.year}</div>
                  <h3 className="font-display font-bold text-[24px] text-white transition-colors group-hover:text-white/90">{p.name}</h3>
                  <p className="text-[15px] mt-4 leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>{p.outcome}</p>
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
