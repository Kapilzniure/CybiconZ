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
      <section data-section="hero-section" className="relative bg-[#060608] pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-overlay pointer-events-none" />
        <div className="absolute -top-32 right-0 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "rgba(79,70,229,0.12)", filter: "blur(120px)" }} />
        
        <div className="container relative">
          <motion.span className="label-eyebrow text-violet" {...fadeUp(0)}>Work</motion.span>
          <h1 className="section-headline-reveal font-display font-extrabold text-ink mt-5 leading-[0.95] max-w-4xl" style={{ fontSize: "clamp(48px, 8vw, 96px)", letterSpacing: "-0.04em" }}>
            <SplitText as="span" className="block">Work we're building.</SplitText>
            <SplitText as="span" className="block" style={{ opacity: 0.65 }} delay={0.3}>Current and recent projects.</SplitText>
          </h1>
          <motion.p 
            className="text-ink-muted text-lg mt-6 max-w-xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            We document our work honestly — including projects in active development.
          </motion.p>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-[100px]" style={{ background: "#0A0A12", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <Link key={p.slug} to={`/work/${p.slug}`} className="group block" data-cursor="view">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl overflow-hidden transition-all duration-250 ease-in-out hover:-translate-y-[6px] hover:shadow-xl"
                style={{ background: "#0F0F1C", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700" />
                </div>
                <div className="p-6">
                  <div className="font-mono text-[10px] uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>{p.service} · {p.year}</div>
                  <h3 className="font-display font-bold text-[20px] mt-1" style={{ color: "#F0EEFF" }}>{p.name}</h3>
                  <p className="text-sm mt-2 leading-relaxed text-ink-muted">{p.outcome}</p>
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
