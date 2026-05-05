import SiteShell from "@/components/site/SiteShell";
import ClosingCTA from "@/components/sections/ClosingCTA";

const topics = [
  { c: "#10B981", t: "Working with agencies", d: "What contracts should look like, what to ask for, and red flags to walk away from." },
  { c: "#06B6D4", t: "Your website explained", d: "Hosting, DNS, certificates, CMS — the parts that quietly cost you money when ignored." },
  { c: "#7C3AED", t: "E-Commerce basics", d: "Payments, taxes, shipping, returns. The infrastructure decisions that lock you in for years." },
  { c: "#F59E0B", t: "Digital marketing 101", d: "Which channels actually convert for small businesses, and which are mostly noise." },
  { c: "#EC4899", t: "Brand and design systems", d: "Why consistency matters more than novelty, and how to build a system that lasts." },
  { c: "#A855F7", t: "Picking the right stack", d: "What 'modern' really means, and how to avoid technology that quietly disappears." },
];

export default function CybiLearnPage() {
  return (
    <SiteShell>
      <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: "linear-gradient(135deg, #07080E 0%, #060E07 100%)" }}>
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "rgba(16,185,129,0.15)", filter: "blur(140px)" }} />
        <div className="container relative">
          <span className="inline-block label-eyebrow text-emerald px-3 py-1 rounded-full bg-emerald/10 border border-emerald/20">CybiLearn</span>
          <h1 className="font-display font-extrabold text-ink mt-5 leading-[0.95] max-w-4xl" style={{ fontSize: "clamp(48px, 8vw, 96px)", letterSpacing: "-0.04em" }}>
            Practical digital skills for <span style={{ background: "linear-gradient(135deg, #10B981, #34D399)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>business owners.</span>
          </h1>
          <p className="text-ink-muted text-lg mt-6 max-w-2xl">Not a course platform. Not theory. Real guidance from the people who build the products — for the people who buy them.</p>
        </div>
      </section>
      <section className="surface-light py-[100px]">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {topics.map(t => (
              <div key={t.t} className="bg-white rounded-2xl p-6 shadow-card-light transition-all hover:translate-y-[-4px] hover:shadow-md" style={{ borderTop: `3px solid ${t.c}` }}>
                <h3 className="font-display font-bold text-lg text-ink-dark">{t.t}</h3>
                <p className="text-sm text-ink-muted mt-2 leading-relaxed">{t.d}</p>
                <div className="mt-4 font-mono text-[11px] uppercase tracking-wider" style={{ color: t.c }}>Coming soon →</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ClosingCTA />
    </SiteShell>
  );
}
