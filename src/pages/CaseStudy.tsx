import SiteShell from "@/components/site/SiteShell";
import { projects } from "@/data/projects";
import { Link, useParams, Navigate } from "react-router-dom";
import ClosingCTA from "@/components/sections/ClosingCTA";

export default function CaseStudy() {
  const { slug } = useParams();
  const p = projects.find(x => x.slug === slug);
  if (!p) return <Navigate to="/work" replace />;
  return (
    <SiteShell>
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-overlay" />
        <div className="container relative">
          <Link to="/work" className="text-sm text-ink-muted hover:text-ink">← All work</Link>
          <div className="font-mono text-[11px] uppercase tracking-wider text-ink-muted mt-8">{p.service} · {p.year}</div>
          <h1 className="font-display font-extrabold text-ink mt-3 leading-[0.95] max-w-4xl" style={{ fontSize: "clamp(48px, 8vw, 96px)", letterSpacing: "-0.04em" }}>{p.name}</h1>
          <p className="text-ink-muted text-lg mt-6 max-w-2xl">{p.outcome}</p>
          <div className="mt-12 rounded-3xl overflow-hidden border border-white/[0.06]">
            <img src={p.image} alt={p.name} className="w-full h-auto" />
          </div>
        </div>
      </section>
      <section className="surface-light py-[100px]">
        <div className="container grid md:grid-cols-3 gap-12">
          <div>
            <span className="label-eyebrow text-violet">Situation</span>
            <p className="text-ink-dark mt-4 leading-relaxed">{p.situation}</p>
          </div>
          <div>
            <span className="label-eyebrow text-cyan">Approach</span>
            <p className="text-ink-dark mt-4 leading-relaxed">{p.approach}</p>
          </div>
          <div>
            <span className="label-eyebrow text-emerald">Delivered</span>
            <ul className="mt-4 space-y-2">
              {p.delivered.map(d => (
                <li key={d} className="flex items-start gap-2 text-ink-dark text-sm"><span className="text-emerald mt-1">●</span>{d}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 mt-6">
              {p.tags.map(t => (
                <span key={t} className="text-[11px] text-ink-muted px-2.5 py-1 rounded-full bg-black/[0.04] border border-black/[0.06]">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <ClosingCTA />
    </SiteShell>
  );
}
