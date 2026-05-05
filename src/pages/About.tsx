import SiteShell from "@/components/site/SiteShell";
import ClosingCTA from "@/components/sections/ClosingCTA";

const values = [
  { c: "#7C3AED", t: "We finish what we start", d: "Every engagement gets handed off complete. Not 'almost done'." },
  { c: "#EC4899", t: "Honest scope", d: "If we can't do it well, we'll say so before signing anything." },
  { c: "#06B6D4", t: "You stay informed", d: "Real updates, real demos. No black boxes between kickoff and launch." },
  { c: "#10B981", t: "Built to last", d: "We choose technology you'll still understand in two years." },
];

export default function About() {
  return (
    <SiteShell>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "rgba(124,58,237,0.12)", filter: "blur(120px)" }} />
        <div className="container relative">
          <span className="label-eyebrow text-violet">About</span>
          <h1 className="font-display font-extrabold text-ink mt-5 leading-[0.95] max-w-4xl" style={{ fontSize: "clamp(48px, 8vw, 96px)", letterSpacing: "-0.04em" }}>
            A small team. <span className="text-gradient">Real accountability.</span>
          </h1>
          <p className="text-ink-muted text-lg mt-6 max-w-2xl leading-relaxed">
            CybiconZ is a digital agency for businesses that need their software to work — and stay working. We pick our clients carefully so we can do the work properly.
          </p>
        </div>
      </section>

      <section className="surface-light py-[100px]">
        <div className="container">
          <span className="label-eyebrow text-violet">What we believe</span>
          <h2 className="font-display font-extrabold text-ink-dark mt-3 mb-12" style={{ fontSize: "clamp(36px, 5vw, 56px)", letterSpacing: "-0.03em" }}>The values that filter every project.</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {values.map(v => (
              <div key={v.t} className="bg-white rounded-2xl p-8 shadow-card-light" style={{ borderLeft: `4px solid ${v.c}` }}>
                <h3 className="font-display font-bold text-xl text-ink-dark">{v.t}</h3>
                <p className="text-ink-muted mt-2 leading-relaxed">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-[100px] bg-brand-base">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="label-eyebrow text-emerald">Infrastructure Partner</span>
            <h2 className="font-display font-extrabold text-ink mt-3 leading-[0.95]" style={{ fontSize: "clamp(32px, 4vw, 48px)", letterSpacing: "-0.03em" }}>
              Hosted by <span className="text-emerald">ZenHost.</span>
            </h2>
            <p className="text-ink-muted mt-6 leading-relaxed max-w-md">
              All CybiconZ projects run on ZenHost — vetted infrastructure tuned for the platforms we ship. Predictable performance, predictable invoicing.
            </p>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-10">
            <div className="font-display font-extrabold text-3xl text-ink">ZenHost</div>
            <p className="text-ink-muted mt-3 text-sm">Hosting infrastructure with monitoring, backups, and a real human on the other end of every ticket.</p>
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[{ n: "99.9%", l: "Uptime" }, { n: "24/7", l: "Monitoring" }, { n: "0", l: "Surprise fees" }].map(s => (
                <div key={s.l}>
                  <div className="font-display font-extrabold text-2xl text-ink">{s.n}</div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-ink-muted mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <ClosingCTA />
    </SiteShell>
  );
}
