import SiteShell from "@/components/site/SiteShell";
import ClosingCTA from "@/components/sections/ClosingCTA";
import { motion } from "framer-motion";
import { usePageMeta } from "@/hooks/usePageMeta";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const topics = [
  { t: "Working with agencies", d: "What contracts should look like, what to ask for, and red flags to walk away from." },
  { t: "Your website explained", d: "Hosting, DNS, certificates, CMS — the parts that quietly cost you money when ignored." },
  { t: "E-Commerce basics", d: "Payments, taxes, shipping, returns. The infrastructure decisions that lock you in for years." },
  { t: "Digital marketing 101", d: "Which channels actually convert for small businesses, and which are mostly noise." },
  { t: "Brand and design systems", d: "Why consistency matters more than novelty, and how to build a system that lasts." },
  { t: "Picking the right stack", d: "What 'modern' really means, and how to avoid technology that quietly disappears." },
];

export default function CybiLearnPage() {
  usePageMeta({
    title: "CybiLearn — Digital Education for Business Owners",
    description: "Practical guides on working with agencies, understanding your website, e-commerce basics, and digital marketing. No jargon. Just what you need to know.",
  });
  return (
    <SiteShell>
      <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: "#060608" }}>
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "rgba(124,58,237,0.1)", filter: "blur(140px)" }} />
        <div className="container relative">
          <motion.span className="inline-block label-eyebrow text-violet px-3 py-1 rounded-full bg-violet/10 border border-violet/20" {...fadeUp(0)}>CybiLearn</motion.span>
          <motion.h1 className="font-display font-extrabold text-ink mt-5 leading-[0.95] max-w-4xl" style={{ fontSize: "clamp(48px, 8vw, 96px)", letterSpacing: "-0.04em" }} {...fadeUp(0.1)}>
            Practical digital skills for <span className="text-gradient">business owners.</span>
          </motion.h1>
          <motion.p className="text-ink-muted text-lg mt-6 max-w-2xl" {...fadeUp(0.2)}>Not a course platform. Not theory. Real guidance from the people who build the products — for the people who buy them.</motion.p>
        </div>
      </section>
      <section className="py-16 sm:py-20 lg:py-[100px]" style={{ background: "#0A0A12", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {topics.map((t, i) => (
              <motion.div key={t.t}
                {...fadeUp(i * 0.08)}
                className="rounded-2xl p-6 transition-all duration-250 ease-in-out hover:-translate-y-[6px]"
                style={{ background: "#0F0F1C", border: "1px solid rgba(255,255,255,0.07)", borderTop: "3px solid #7C3AED" }}>
                <h3 className="font-display font-bold text-lg" style={{ color: "#F0EEFF" }}>{t.t}</h3>
                <p className="text-sm mt-2 leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>{t.d}</p>
                <div className="mt-4 font-mono text-[11px] uppercase tracking-wider text-violet">Coming soon →</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <ClosingCTA />
    </SiteShell>
  );
}
