import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SiteShell from "@/components/site/SiteShell";
import SplitText from "@/components/ui/SplitText";
import { useTextReveal } from "@/hooks/useTextReveal";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const values = [
  {
    title: "We build things that work.",
    body: "A design that looks good in Figma but breaks on mobile isn't finished. We build to completion — tested, functional, and ready for real users. Not demos. Not prototypes. Finished products.",
  },
  {
    title: "We're direct.",
    body: "If something won't serve your business goals, we say so before you pay for it. If a project is outside our current scope, we say that too. No runaround, no overselling. Honest communication at every stage.",
  },
  {
    title: "We take handoffs seriously.",
    body: "Every project ends with documentation. You should be able to understand what was built, how it runs, and how to manage it — without depending on us for everything. You own what we build.",
  },
];

export default function About() {
  useTextReveal('.section-headline-reveal', { stagger: 0.05 });
  useTextReveal('.service-desc-reveal', { stagger: 0.03, start: 'top 90%' });

  return (
    <SiteShell>

      {/* ─── SECTION 1: HERO ─────────────────────────────────────────────── */}
      <section className="bg-brand-base overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="absolute inset-0 grid-overlay pointer-events-none" />
        <div className="container relative">
          <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-12 items-center">

            {/* Left — text */}
            <div className="relative z-10">
              <motion.div {...fade(0)} className="flex items-center gap-3 mb-6">
                <span className="w-4 h-px" style={{ background: "hsl(var(--accent-from))" }} />
                <span className="label-eyebrow text-violet">About us</span>
              </motion.div>

              <h1 className="font-display font-extrabold text-ink leading-[0.93]" style={{ fontSize: "clamp(42px, 8vw, 88px)", letterSpacing: "-0.04em" }}>
                <SplitText as="div" delay={0.08}>A focused team.</SplitText>
                <SplitText as="div" delay={0.25}>Building real products.</SplitText>
              </h1>

              <motion.p {...fade(0.24)} className="text-white/75 text-[15px] sm:text-[16px] mt-6 max-w-lg leading-relaxed">
                CybiconZ is a digital agency based in Tokyo, Japan. We build websites, e-commerce systems, and applications for businesses that need their digital presence to actually work — not just exist.
              </motion.p>
              <motion.p {...fade(0.32)} className="text-white/75 text-[15px] sm:text-[16px] mt-4 max-w-lg leading-relaxed">
                The agency is led directly by the founder. Every project gets personal attention from the person making decisions — not an account manager, not outsourced development.
              </motion.p>
            </div>

            {/* Right — founder image */}
            <motion.div {...fade(0.18)} className="relative max-w-sm lg:max-w-none">
              {/* TODO: Replace with real founder photo */}
              <div className="relative rounded-3xl overflow-hidden" style={{ aspectRatio: "4/5", background: "#080810", border: "1px solid rgba(255,255,255,0.08)" }}>
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"
                  alt="Niure Kapil — Founder, CybiconZ"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, #060608 0%, transparent 70%)" }} />
                <div className="absolute bottom-5 left-5 rounded-xl p-3 backdrop-blur-md" style={{ background: "rgba(13,14,28,0.9)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="font-display font-bold text-[13px] sm:text-[14px] text-white">Niure Kapil</div>
                  <div className="text-[11px] sm:text-[12px] text-ink-muted mt-0.5">Founder, CybiconZ · Tokyo</div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── SECTION 2: THE STORY ────────────────────────────────────────── */}
      <section className="surface-light py-16 sm:py-24">
        <div className="container">
          <div style={{ maxWidth: 960, margin: "0 auto" }}>
            <motion.div {...fade(0)}>
              <span className="label-eyebrow text-violet">The story</span>
              <h2 className="section-headline-reveal font-display font-extrabold text-ink-dark mt-4 leading-[0.95]" style={{ fontSize: "clamp(32px, 5vw, 56px)", letterSpacing: "-0.03em" }}>
                Why CybiconZ exists.
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-8 md:gap-12">
              <motion.div {...fade(0.1)}>
                <p className="service-desc-reveal text-[15px] sm:text-[16px] leading-[1.8] text-ink-dark">
                  Most businesses face the same problem: their website either looks good but doesn't convert, or it's functional but confusing for the people who need to use it. Either way, it's not doing what it should.
                </p>
                <p className="text-[15px] sm:text-[16px] leading-[1.8] mt-6 text-ink-dark">
                  I started CybiconZ after noticing this gap repeatedly. Business owners were spending money on digital work and getting results that didn't match what they needed. The problem wasn't always the technology — it was the approach.
                </p>
              </motion.div>
              <motion.div {...fade(0.18)}>
                <p className="text-[15px] sm:text-[16px] leading-[1.8] text-ink-dark">
                  CybiconZ exists to build digital systems that are simple for the business owner to understand and effective for the customers who use them. No unnecessary complexity. No jargon. Just finished products that work.
                </p>
                <p className="text-[15px] sm:text-[16px] leading-[1.8] mt-6 text-ink-dark">
                  We're based in Tokyo and work with clients globally. The team is small by design — focused work produces better results than large teams spread thin.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: VALUES ───────────────────────────────────────────── */}
      <section className="bg-brand-base py-16 sm:py-24">
        <div className="container">
          <motion.div {...fade(0)}>
            <span className="label-eyebrow text-violet">What we stand for</span>
            <SplitText as="h2" className="font-display font-extrabold text-ink mt-4 leading-[0.95]" style={{ fontSize: "clamp(30px, 4vw, 48px)", letterSpacing: "-0.03em" }}>
              Three things we never compromise on.
            </SplitText>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 sm:mt-16">
            {values.map((v, i) => (
              <motion.div key={v.title} {...fade(i * 0.09)}
                className="rounded-2xl p-6 sm:p-8"
                style={{ background: "#080810", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="h-[3px] w-12 rounded-full mb-8" style={{ background: "#7C3AED" }} />
                <h3 className="font-display font-bold text-[20px] sm:text-[22px] text-ink mb-4 leading-tight">{v.title}</h3>
                <p className="text-[14px] sm:text-[15px] text-ink-muted leading-relaxed">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: PARTNER ──────────────────────────────────────────── */}
      <section className="surface-light py-16 sm:py-20">
        <div className="container">
          <div style={{ maxWidth: 960, margin: "0 auto" }}>
            <div className="grid grid-cols-1 md:grid-cols-[55%_45%] gap-10 sm:gap-12 items-center">

              {/* Left */}
              <motion.div {...fade(0)}>
                <span className="label-eyebrow text-violet">Infrastructure partner</span>
                <SplitText as="h2" className="font-display font-extrabold text-ink-dark mt-4 leading-[0.95]" style={{ fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-0.03em" }}>
                  We trust ZenHost.
                </SplitText>
                <p className="text-[15px] sm:text-[16px] mt-6 leading-[1.8] text-ink-dark">
                  For hosting and managed infrastructure on client projects, we work with ZenHost. It's a deliberate choice — infrastructure we've evaluated, tested, and stand behind.
                </p>
                <p className="text-[15px] sm:text-[16px] mt-4 leading-[1.8] text-ink-dark">
                  When your project goes live, it lives on infrastructure we'd use ourselves. Not the cheapest option. Not a random hosting service. A vetted partner.
                </p>
                <a
                  href="https://zenhost.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gradient font-bold text-[14px] mt-6 inline-flex items-center gap-1 hover:gap-2 transition-all"
                >
                  Visit ZenHost →
                </a>
              </motion.div>

              {/* Right — ZenHost card */}
              <motion.div {...fade(0.12)} className="max-w-sm">
                <div className="bg-white rounded-2xl p-6 sm:p-8" style={{ border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" style={{ color: "hsl(var(--accent-from))", marginBottom: 16 }}>
                    <rect x="2" y="3" width="20" height="7" rx="2" stroke="currentColor" strokeWidth="1.5" />
                    <rect x="2" y="14" width="20" height="7" rx="2" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="6" cy="6.5" r="1" fill="currentColor" />
                    <circle cx="6" cy="17.5" r="1" fill="currentColor" />
                    <line x1="10" y1="6.5" x2="18" y2="6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="10" y1="17.5" x2="18" y2="17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <div className="font-display font-extrabold text-[22px] sm:text-[24px]" style={{ color: "#0A0B14" }}>ZenHost</div>
                  <div className="text-[13px] sm:text-[14px] text-ink-muted mb-6 mt-1">Managed hosting &amp; infrastructure</div>
                  {["Managed hosting", "Reliable uptime", "Infrastructure we've vetted"].map(f => (
                    <p key={f} className="text-[13px] sm:text-[14px] mb-2" style={{ color: "#0A0B14" }}>✓ {f}</p>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: CTA ──────────────────────────────────────────────── */}
      <section className="bg-brand-base py-16 sm:py-20">
        <div className="container">
          <motion.div {...fade(0)} className="max-w-2xl mx-auto text-center">
            <SplitText as="h2" className="font-display font-extrabold text-ink leading-[0.95]" style={{ fontSize: "clamp(32px, 5vw, 56px)", letterSpacing: "-0.04em" }}>
              Work with us.
            </SplitText>
            <p className="text-white/75 text-[15px] sm:text-[16px] mt-5 leading-relaxed max-w-sm mx-auto">
              Tell us about your project. We'll tell you honestly if we're the right fit.
            </p>
            <Link
              to="/contact"
              className="inline-flex bg-accent-gradient text-white font-bold text-[14px] sm:text-[15px] px-8 sm:px-10 py-4 rounded-xl shadow-glow-purple mt-8 hover:opacity-95 transition"
            >
              Start a conversation →
            </Link>
            <div className="mt-5">
              <a href="mailto:hello@cybiconz.com" className="text-ink-muted hover:text-ink text-sm transition-colors">
                hello@cybiconz.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </SiteShell>
  );
}
