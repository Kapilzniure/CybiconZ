import SiteShell from "@/components/site/SiteShell";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";

const culture = [
  { c: "#7C3AED", t: "Direct Impact", d: "Small team, real ownership of every project you touch." },
  { c: "#EC4899", t: "Real Projects", d: "No fake portfolio work. Real clients, real outcomes." },
  { c: "#06B6D4", t: "Remote Flexible", d: "Async by default. Meetings only when they earn it." },
  { c: "#10B981", t: "Grow Fast", d: "Generalists welcome. Pick what you want to learn next." },
];

const positions = [
  { role: "Frontend Developer", type: "Full-time", loc: "Remote", desc: "Build production React apps for our clients. Ship features end-to-end with the design and backend teams.", reqs: ["3+ years React + TypeScript", "Comfortable with Tailwind, design systems", "Experience shipping production work"] },
  { role: "UI Designer", type: "Contract", loc: "Remote", desc: "Design interfaces and systems for client websites and applications. Collaborate closely with developers.", reqs: ["Strong Figma proficiency", "Portfolio of shipped product work", "Comfortable in dev handoff"] },
  { role: "Digital Marketing Lead", type: "Full-time", loc: "Remote", desc: "Drive marketing engagements for selected clients. Strategy, execution, and reporting.", reqs: ["Hands-on social + content experience", "Analytics literacy", "Client communication skills"] },
];

export default function Careers() {
  return (
    <SiteShell>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute -top-32 left-1/3 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "rgba(124,58,237,0.12)", filter: "blur(120px)" }} />
        <div className="container relative">
          <span className="inline-block label-eyebrow text-violet px-3 py-1 rounded-full bg-violet/10 border border-violet/20">Join us</span>
          <h1 className="font-display font-extrabold text-ink mt-5 leading-[0.95] max-w-4xl" style={{ fontSize: "clamp(48px, 8vw, 96px)", letterSpacing: "-0.04em" }}>
            Build the Future of <span className="text-gradient">Digital.</span>
          </h1>
          <p className="text-ink-muted text-lg mt-6 max-w-xl">We hire carefully and treat people like adults. Small team, big ownership, real client work.</p>
        </div>
      </section>

      <section className="surface-light py-[100px]">
        <div className="container">
          <span className="label-eyebrow text-violet">Culture</span>
          <h2 className="font-display font-extrabold text-ink-dark mt-3 mb-12" style={{ fontSize: "clamp(36px, 5vw, 56px)", letterSpacing: "-0.03em" }}>How we work.</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {culture.map(c => (
              <div key={c.t} className="bg-white rounded-2xl p-6 shadow-card-light" style={{ borderTop: `3px solid ${c.c}` }}>
                <h3 className="font-display font-bold text-lg text-ink-dark">{c.t}</h3>
                <p className="text-sm text-ink-muted mt-2 leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-[100px]">
        <div className="container max-w-3xl">
          <span className="label-eyebrow text-cyan">Open positions</span>
          <h2 className="font-display font-extrabold text-ink mt-3 mb-10" style={{ fontSize: "clamp(36px, 5vw, 56px)", letterSpacing: "-0.03em" }}>Roles we're hiring for.</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {positions.map((p, i) => (
              <AccordionItem key={i} value={`p-${i}`} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl px-6">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex flex-wrap items-center gap-3 text-left">
                    <span className="font-display font-bold text-ink text-lg">{p.role}</span>
                    <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-violet/15 text-violet">{p.type}</span>
                    <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-cyan/15 text-cyan">{p.loc}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-ink-muted leading-relaxed">{p.desc}</p>
                  <h4 className="label-eyebrow text-ink mt-5 mb-2">Requirements</h4>
                  <ul className="space-y-1.5">
                    {p.reqs.map(r => <li key={r} className="text-sm text-ink-muted flex gap-2"><span className="text-violet">●</span>{r}</li>)}
                  </ul>
                  <Link to="/contact" className="inline-flex mt-5 bg-accent-gradient text-white font-bold text-sm px-5 py-2.5 rounded-xl">Apply →</Link>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="font-display font-bold text-ink text-lg">Don't see your role?</h3>
              <p className="text-ink-muted text-sm mt-1">Tell us what you'd build here. We'll listen.</p>
            </div>
            <Link to="/contact" className="bg-accent-gradient text-white font-bold text-sm px-5 py-3 rounded-xl whitespace-nowrap">Say hello →</Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
