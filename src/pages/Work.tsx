import SiteShell from "@/components/site/SiteShell";
import { projects } from "@/data/projects";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ClosingCTA from "@/components/sections/ClosingCTA";
import SplitText from "@/components/ui/SplitText";

export default function WorkPage() {
  return (
    <SiteShell>
      <section className="relative pt-32 pb-16">
        <div className="container">
          <span className="label-eyebrow text-violet">Work</span>
          <h1 className="font-display font-extrabold text-ink mt-5 leading-[0.95] max-w-4xl" style={{ fontSize: "clamp(48px, 8vw, 96px)", letterSpacing: "-0.04em" }}>
            <SplitText as="span" className="block">Work we're building.</SplitText>
            <SplitText as="span" className="block" style={{ opacity: 0.65 }} delay={0.3}>Current and recent projects.</SplitText>
          </h1>
          <p className="text-ink-muted text-lg mt-6 max-w-xl">We document our work honestly — including projects in active development.</p>
        </div>
      </section>
      <section className="surface-light py-16 sm:py-20 lg:py-[100px]">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <Link key={p.slug} to={`/work/${p.slug}`} className="group block" data-cursor="view">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true, margin: "-40px" }} 
                transition={{ duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-2xl overflow-hidden shadow-card-light transition-all duration-250 ease-in-out hover:-translate-y-[6px] hover:shadow-xl">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-700" />
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
