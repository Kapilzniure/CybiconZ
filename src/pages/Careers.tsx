import SiteShell from "@/components/site/SiteShell";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SplitText from "@/components/ui/SplitText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { usePageMeta } from "@/hooks/usePageMeta";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const culture = [
  { t: "Direct Impact", d: "Small team, real ownership of every project you touch." },
  { t: "Real Projects", d: "No fake portfolio work. Real clients, real outcomes." },
  { t: "Remote Flexible", d: "Async by default. Meetings only when they earn it." },
  { t: "Grow Fast", d: "Generalists welcome. Pick what you want to learn next." },
];

const positions = [
  { role: "Frontend Developer", type: "Full-time", loc: "Remote", desc: "Build production React apps for our clients. Ship features end-to-end with the design and backend teams.", reqs: ["3+ years React + TypeScript", "Comfortable with Tailwind, design systems", "Experience shipping production work"] },
  { role: "UI Designer", type: "Contract", loc: "Remote", desc: "Design interfaces and systems for client websites and applications. Collaborate closely with developers.", reqs: ["Strong Figma proficiency", "Portfolio of shipped product work", "Comfortable in dev handoff"] },
  { role: "Digital Marketing Lead", type: "Full-time", loc: "Remote", desc: "Drive marketing engagements for selected clients. Strategy, execution, and reporting.", reqs: ["Hands-on social + content experience", "Analytics literacy", "Client communication skills"] },
];

export default function Careers() {
  usePageMeta({
    title: "Careers — Join a Focused Team",
    description: "Small team. Real projects. Direct impact. We're looking for developers, designers, and marketing leads who want to ship work that matters.",
  });
  return (
    <SiteShell>
      {/* HERO */}
      <section className="relative bg-[#060608] pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-overlay pointer-events-none" />
        <div className="absolute -top-32 right-1/3 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "rgba(79,70,229,0.12)", filter: "blur(120px)" }} />
        
        <div className="container relative">
          <motion.span className="inline-block label-eyebrow text-violet px-3 py-1 rounded-full bg-violet/10 border border-violet/20" {...fadeUp(0)}>Join us</motion.span>
          <h1 className="section-headline-reveal font-display font-extrabold text-ink mt-5 leading-[0.95] max-w-4xl" style={{ fontSize: "clamp(48px, 8vw, 96px)", letterSpacing: "-0.04em" }}>
            <SplitText as="span" className="block">Build the Future</SplitText>
            <SplitText as="span" className="block text-gradient" delay={0.2}>of Digital.</SplitText>
          </h1>
          <motion.p 
            className="text-ink-muted text-lg mt-6 max-w-xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            We hire carefully and treat people like adults. Small team, big ownership, real client work.
          </motion.p>
        </div>
      </section>

      {/* CULTURE */}
      <section className="relative py-16 sm:py-24 lg:py-[100px] overflow-hidden" style={{ background: "#0A0A12", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        {/* Cyan atmospheric glow */}
        <div 
          aria-hidden 
          className="absolute w-[600px] h-[600px] rounded-full pointer-events-none opacity-[0.06]"
          style={{ background: "radial-gradient(#06B6D4, transparent 70%)", top: "-100px", left: "-100px", filter: "blur(100px)" }}
        />

        <div className="container relative z-10">
          <motion.span className="label-eyebrow text-violet" {...fadeUp(0)}>Culture</motion.span>
          <h2 className="section-headline-reveal font-display font-extrabold text-ink mt-3 mb-10 md:mb-12" style={{ fontSize: "clamp(30px, 5vw, 56px)", letterSpacing: "-0.03em" }}>How we work.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {culture.map((c, i) => (
              <motion.div key={c.t}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl p-6 transition-all duration-250 ease-in-out hover:-translate-y-[6px]"
                style={{ background: "#0F0F1C", border: "1px solid rgba(255,255,255,0.07)", borderTop: "3px solid #4F46E5" }}>
                <h3 className="font-display font-bold text-lg" style={{ color: "#F0EEFF" }}>{c.t}</h3>
                <p className="text-[14px] sm:text-sm mt-2 leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>{c.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* OPEN POSITIONS */}
      <section className="relative py-16 sm:py-24 lg:py-[100px] overflow-hidden">
        <div className="container relative z-10 max-w-3xl">
          <motion.span className="label-eyebrow text-violet" {...fadeUp(0)}>Open positions</motion.span>
          <h2 className="section-headline-reveal font-display font-extrabold text-ink mt-3 mb-10" style={{ fontSize: "clamp(36px, 5vw, 56px)", letterSpacing: "-0.03em" }}>Roles we're hiring for.</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {positions.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                {/* Subtle alternating glows for positions */}
                <div 
                  aria-hidden 
                  className="absolute w-[300px] h-[300px] rounded-full pointer-events-none opacity-[0.03]"
                  style={{ 
                    background: `radial-gradient(${i % 2 === 0 ? '#4F46E5' : '#06B6D4'}, transparent 70%)`,
                    top: '50%',
                    left: i % 2 === 0 ? '-150px' : 'auto',
                    right: i % 2 !== 0 ? '-150px' : 'auto',
                    transform: 'translateY(-50%)',
                    filter: 'blur(60px)'
                  }}
                />
                
                <AccordionItem value={`p-${i}`} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl px-6 relative z-10">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex flex-wrap items-center gap-3 text-left">
                      <span className="font-display font-bold text-ink text-lg">{p.role}</span>
                      <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-violet/15 text-violet">{p.type}</span>
                      <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/[0.06] text-ink-muted">{p.loc}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pb-4">
                      <p className="text-ink-muted leading-relaxed">{p.desc}</p>
                      <h4 className="label-eyebrow text-ink mt-5 mb-2">Requirements</h4>
                      <ul className="space-y-1.5 mb-8">
                        {p.reqs.map(r => <li key={r} className="text-sm text-ink-muted flex gap-2"><span className="text-violet">●</span>{r}</li>)}
                      </ul>
                      <MagneticButton href="/contact" variant="primary">Apply →</MagneticButton>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>

          <motion.div 
            {...fadeUp(0.4)}
            className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div>
              <h3 className="font-display font-bold text-ink text-lg">Don't see your role?</h3>
              <p className="text-ink-muted text-sm mt-1">Tell us what you'd build here. We'll listen.</p>
            </div>
            <MagneticButton href="/contact" variant="primary">Say hello →</MagneticButton>
          </motion.div>
        </div>
      </section>
    </SiteShell>
  );
}
