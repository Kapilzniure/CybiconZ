import { motion } from "framer-motion";
import { useState } from "react";
import SiteShell from "@/components/site/SiteShell";
import SplitText from "@/components/ui/SplitText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { usePageMeta } from "@/hooks/usePageMeta";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
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
  const [founderImageError, setFounderImageError] = useState(false);

  usePageMeta({
    title: "About — A Focused Team Building Real Products",
    description: "CybiconZ is a digital agency led directly by its founder, based in Tokyo. Every project gets personal attention from the person making decisions — not an account manager.",
  });
  return (
    <SiteShell>

      {/* ─── SECTION 1: HERO ─────────────────────────────────────────────── */}
      <section data-section="hero-section" className="relative bg-[#060608] overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="absolute inset-0 grid-overlay pointer-events-none" />
        <div
          className="absolute -top-32 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "rgba(79,70,229,0.12)", filter: "blur(120px)" }}
        />
        <div className="container relative">
          <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-12 items-center">

            {/* Left — text */}
            <div className="relative z-10">
              <motion.div {...fade(0)} className="flex items-center gap-3 mb-6">
                <span className="w-4 h-px" style={{ background: "hsl(var(--accent-from))" }} />
                <span className="label-eyebrow text-violet">About us</span>
              </motion.div>

              <h1 className="section-headline-reveal font-display font-extrabold text-ink leading-[0.93]" style={{ fontSize: "clamp(42px, 8vw, 88px)", letterSpacing: "-0.04em" }}>
                <SplitText as="div" delay={0.08}>A focused team.</SplitText>
                <SplitText as="div" delay={0.25}>Building real products.</SplitText>
              </h1>

              <motion.p 
                className="text-white/75 text-[15px] sm:text-[16px] mt-6 max-w-lg leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                CybiconZ is a digital agency based in Tokyo, Japan. We build websites, e-commerce systems, and applications for businesses that need their digital presence to actually work — not just exist.
              </motion.p>
              <motion.p 
                className="text-white/75 text-[15px] sm:text-[16px] mt-4 max-w-lg leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                The agency is led directly by the founder. Every project gets personal attention from the person making decisions — not an account manager, not outsourced development.
              </motion.p>
            </div>

            {/* Right — founder image */}
            <motion.div
              {...fade(0.18)}
              className="relative max-w-sm lg:max-w-none"
            >
              {/* TODO: Replace with real founder photo */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ aspectRatio: "4/5", background: "#080810", border: "1px solid rgba(255,255,255,0.08)" }}>
                {founderImageError ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-zinc-900 text-white text-center p-6">
                    <div>
                      <div className="mb-2 text-xs uppercase tracking-[0.22em] text-slate-400">Founder</div>
                      <div className="text-3xl font-display font-bold">Niure Kapil</div>
                      <div className="mt-2 text-sm text-slate-300">CybiconZ · Tokyo</div>
                    </div>
                  </div>
                ) : (
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=75"
                    alt="Niure Kapil — Founder, CybiconZ"
                    loading="eager"
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={() => setFounderImageError(true)}
                  />
                )}
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
      <section className="relative py-16 sm:py-24 overflow-hidden" style={{ background: "#0A0A12", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        {/* Warm atmospheric glow */}
        <div 
          aria-hidden 
          className="absolute w-[600px] h-[600px] rounded-full pointer-events-none opacity-[0.07]"
          style={{ background: "radial-gradient(#F97316, transparent 70%)", top: "-100px", left: "-100px", filter: "blur(100px)" }}
        />
        
        <div className="container relative z-10">
          <div style={{ maxWidth: 960, margin: "0 auto" }}>
            <motion.div {...fade(0)}>
              <span className="label-eyebrow text-violet">The story</span>
              <h2 className="section-headline-reveal font-display font-extrabold text-ink mt-4 leading-[0.95]" style={{ fontSize: "clamp(32px, 5vw, 56px)", letterSpacing: "-0.03em" }}>
                Why CybiconZ exists.
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-8 md:gap-12">
              <motion.div {...fade(0.1)}>
                <p className="service-desc-reveal text-[15px] sm:text-[16px] leading-[1.8]" style={{ color: "rgba(255,255,255,0.55)" }}>
                  Most businesses face the same problem: their website either looks good but doesn't convert, or it's functional but confusing for the people who need to use it. Either way, it's not doing what it should.
                </p>
                <p className="text-[15px] sm:text-[16px] leading-[1.8] mt-6" style={{ color: "rgba(255,255,255,0.55)" }}>
                  I started CybiconZ after noticing this gap repeatedly. Business owners were spending money on digital work and getting results that didn't match what they needed. The problem wasn't always the technology — it was the approach.
                </p>
              </motion.div>
              <motion.div {...fade(0.18)}>
                <p className="text-[15px] sm:text-[16px] leading-[1.8]" style={{ color: "rgba(255,255,255,0.55)" }}>
                  CybiconZ exists to build digital systems that are simple for the business owner to understand and effective for the customers who use them. No unnecessary complexity. No jargon. Just finished products that work.
                </p>
                <p className="text-[15px] sm:text-[16px] leading-[1.8] mt-6" style={{ color: "rgba(255,255,255,0.55)" }}>
                  We're based in Tokyo and work with clients globally. The team is small by design — focused work produces better results than large teams spread thin.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: VALUES ───────────────────────────────────────────── */}
      <section className="relative bg-brand-base py-16 sm:py-24 overflow-hidden">
        {/* Cyan atmospheric glow */}
        <div 
          aria-hidden 
          className="absolute w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.06]"
          style={{ background: "radial-gradient(#06B6D4, transparent 70%)", bottom: "-100px", right: "-100px", filter: "blur(100px)" }}
        />

        <div className="container relative z-10">
          <motion.div {...fade(0)}>
            <span className="label-eyebrow text-violet">What we stand for</span>
            <h2 className="section-headline-reveal font-display font-extrabold text-ink mt-4 leading-[0.95]" style={{ fontSize: "clamp(30px, 4vw, 48px)", letterSpacing: "-0.03em" }}>
              Three things we never compromise on.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 sm:mt-16">
            {values.map((v, i) => (
              <motion.div key={v.title} 
                initial={{ opacity: 0, y: 24, rotateX: 6 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl p-6 sm:p-8"
                style={{ 
                  background: "#080810", 
                  border: "1px solid rgba(255,255,255,0.08)",
                  transformPerspective: "1200px"
                }}
              >
                <div className="h-[3px] w-12 rounded-full mb-8" style={{ background: "#4F46E5" }} />
                <h3 className="font-display font-bold text-[20px] sm:text-[22px] text-ink mb-4 leading-tight">{v.title}</h3>
                <p className="text-[14px] sm:text-[15px] text-ink-muted leading-relaxed">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: PARTNER ──────────────────────────────────────────── */}
      <section className="relative py-16 sm:py-20 overflow-hidden" style={{ background: "#0A0A12", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        {/* Emerald atmospheric glow */}
        <div 
          aria-hidden 
          className="absolute w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.08]"
          style={{ background: "radial-gradient(#10B981, transparent 70%)", top: "50%", right: "10%", transform: "translateY(-50%)", filter: "blur(120px)" }}
        />

        <div className="container relative z-10">
          <div style={{ maxWidth: 960, margin: "0 auto" }}>
            <div className="grid grid-cols-1 md:grid-cols-[55%_45%] gap-10 sm:gap-12 items-center">

              {/* Left */}
              <motion.div {...fade(0)}>
                <span className="label-eyebrow text-violet">Infrastructure partner</span>
                <h2 className="section-headline-reveal font-display font-extrabold text-ink mt-4 leading-[0.95]" style={{ fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-0.03em" }}>
                  We trust ZenHost.
                </h2>
                <p className="text-[15px] sm:text-[16px] mt-6 leading-[1.8]" style={{ color: "rgba(255,255,255,0.55)" }}>
                  For hosting and managed infrastructure on client projects, we work with ZenHost. It's a deliberate choice — infrastructure we've evaluated, tested, and stand behind.
                </p>
                <p className="text-[15px] sm:text-[16px] mt-4 leading-[1.8]" style={{ color: "rgba(255,255,255,0.55)" }}>
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
                <div className="rounded-2xl p-6 sm:p-8" style={{ background: "#0F0F1C", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" style={{ color: "hsl(var(--accent-from))", marginBottom: 16 }}>
                    <rect x="2" y="3" width="20" height="7" rx="2" stroke="currentColor" strokeWidth="1.5" />
                    <rect x="2" y="14" width="20" height="7" rx="2" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="6" cy="6.5" r="1" fill="currentColor" />
                    <circle cx="6" cy="17.5" r="1" fill="currentColor" />
                    <line x1="10" y1="6.5" x2="18" y2="6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="10" y1="17.5" x2="18" y2="17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <div className="font-display font-extrabold text-[22px] sm:text-[24px]" style={{ color: "#F0EEFF" }}>ZenHost</div>
                  <div className="text-[13px] sm:text-[14px] text-ink-muted mb-6 mt-1">Managed hosting &amp; infrastructure</div>
                  {["Managed hosting", "Reliable uptime", "Infrastructure we've vetted"].map(f => (
                    <p key={f} className="text-[13px] sm:text-[14px] mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>✓ {f}</p>
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
            <h2 className="section-headline-reveal font-display font-extrabold text-ink leading-[0.95]" style={{ fontSize: "clamp(32px, 5vw, 56px)", letterSpacing: "-0.04em" }}>
              Work with us.
            </h2>
            <p className="text-white/75 text-[15px] sm:text-[16px] mt-5 leading-relaxed max-w-sm mx-auto">
              Tell us about your project. We'll tell you honestly if we're the right fit.
            </p>
            <div className="mt-8 flex justify-center">
              <MagneticButton href="/contact" variant="primary">Start a conversation →</MagneticButton>
            </div>
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
