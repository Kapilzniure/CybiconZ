import { motion } from "framer-motion";
import SiteShell from "@/components/site/SiteShell";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { usePageMeta } from "@/hooks/usePageMeta";
import SplineAbout from "@/components/sections/SplineAbout";
import founderPhoto from "@/assets/founder.jpg";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const values = [
  {
    title: "We build things that work.",
    body: "A design that looks good in Figma but breaks on mobile isn't finished. We build to completion — tested, functional, ready for real users.",
  },
  {
    title: "We're direct.",
    body: "If something won't serve your goals, we say so before you pay for it. No runaround, no overselling. Honest at every stage.",
  },
  {
    title: "You own what we build.",
    body: "Every project ends with documentation. You should understand what was built and how to manage it — without depending on us for everything.",
  },
];

export default function About() {
  usePageMeta({
    title: "About — A Focused Team Building Real Products",
    description: "CybiconZ is a digital agency led directly by its founder, based in Tokyo. Every project gets personal attention from the person making decisions.",
  });

  return (
    <SiteShell>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        data-section="hero-section"
        className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20"
        style={{ background: "#050507" }}
      >
        <div className="container relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* LEFT — text */}
            <div>
              <motion.div {...fade(0)} className="flex items-center gap-3 mb-6">
                <span className="w-8 h-[1px] bg-white/30" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">Who We Are</span>
              </motion.div>

              <motion.h1
                {...fade(0.06)}
                className="font-display font-extrabold text-white leading-[0.9]"
                style={{ fontSize: "clamp(44px, 7vw, 92px)", letterSpacing: "-0.05em" }}
              >
                A focused team.<br />
                <span style={{ color: "rgba(255,255,255,0.25)" }}>Building real products.</span>
              </motion.h1>

              <motion.p
                {...fade(0.14)}
                className="mt-8 text-[16px] leading-[1.7] max-w-md"
                style={{ color: "rgba(255,255,255,0.75)" }}
              >
                CybiconZ is a digital agency based in Tokyo. We build websites,
                e-commerce systems, and applications for businesses that need
                their digital presence to actually work — not just exist.
              </motion.p>

              <motion.p
                {...fade(0.2)}
                className="mt-4 text-[16px] leading-[1.7] max-w-md"
                style={{ color: "rgba(255,255,255,0.75)" }}
              >
                Led directly by the founder, every project gets personal focus 
                from the decision-maker — ensuring technical excellence 
                at every stage.
              </motion.p>

              <motion.div {...fade(0.28)} className="mt-10 flex items-center gap-6">
                <MagneticButton href="/contact" variant="primary">
                  Start a project →
                </MagneticButton>
                <a
                  href="mailto:cybiconz@gmail.com"
                  className="font-mono text-[12px] text-white/60 hover:text-white transition-colors underline decoration-white/20 underline-offset-4"
                >
                  cybiconz@gmail.com
                </a>
              </motion.div>
            </div>

            {/* RIGHT — founder photo (square) */}
            <motion.div {...fade(0.12)} className="flex justify-center lg:justify-end">
              <div
                style={{
                  width: "min(400px, 100%)",
                  aspectRatio: "1 / 1",
                  borderRadius: 24,
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "#0d0e1c",
                  position: "relative",
                }}
              >
                <img
                  src="/founder.jpg"
                  alt="Niure Kapil — Founder, CybiconZ"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                />
                
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "40%",
                    background: "linear-gradient(to top, rgba(5,5,7,0.95) 0%, transparent 100%)",
                    pointerEvents: "none",
                  }}
                />
                <div style={{ position: "absolute", bottom: 20, left: 24 }}>
                  <div style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 700, fontSize: 16, color: "#fff" }}>
                    Niure Kapil
                  </div>
                  <div style={{ fontSize: 10, marginTop: 4, color: "rgba(255,255,255,0.7)", fontFamily: "monospace", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                    Founder · Tokyo
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── THE STORY + ROBOT ────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-20 sm:py-24"
        style={{ background: "#050507", borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left — story text */}
            <div>
              <motion.div {...fade(0)} className="mb-8">
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40">The Narrative</span>
                <h2
                  className="font-display font-extrabold text-white mt-4 leading-[0.95]"
                  style={{ fontSize: "clamp(32px, 5vw, 64px)", letterSpacing: "-0.04em" }}
                >
                  Why we exist.
                </h2>
              </motion.div>

              <motion.p {...fade(0.08)} className="text-[16px] leading-[1.8]" style={{ color: "rgba(255,255,255,0.7)" }}>
                Most businesses face the same problem: their website either looks good
                but doesn't convert, or it's functional but confusing. Either way,
                it's not doing what it should.
              </motion.p>
              <motion.p {...fade(0.14)} className="mt-6 text-[16px] leading-[1.8]" style={{ color: "rgba(255,255,255,0.7)" }}>
                I started CybiconZ after noticing this gap repeatedly. The problem
                wasn't always the technology — it was the approach. CybiconZ exists
                to build digital systems that are simple to understand and effective
                for the people who use them.
              </motion.p>
              <motion.p {...fade(0.2)} className="mt-6 text-[16px] leading-[1.8]" style={{ color: "rgba(255,255,255,0.7)" }}>
                We're based in Tokyo and work with clients globally. Small by design —
                focused work produces better results than large teams spread thin.
              </motion.p>
            </div>

            {/* Right — Spline robot */}
            <motion.div
              {...fade(0.1)}
              className="w-full relative"
              style={{ height: "clamp(380px, 70vw, 600px)" }}
            >
              <SplineAbout />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-20 sm:py-24"
        style={{ background: "#050507", borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="container relative z-10">
          <motion.div {...fade(0)} className="mb-14">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30">Foundations</span>
            <h2
              className="font-display font-extrabold text-white mt-4 leading-[0.95]"
              style={{ fontSize: "clamp(32px, 5vw, 64px)", letterSpacing: "-0.04em" }}
            >
              Non-negotiables.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 20,
                  padding: "40px 32px",
                }}
              >
                <div style={{ width: 32, height: 1, background: "rgba(255,255,255,0.2)", marginBottom: 32 }} />
                <h3
                  className="font-display font-bold text-white leading-tight mb-4"
                  style={{ fontSize: "20px" }}
                >
                  {v.title}
                </h3>
                <p className="text-[14px] leading-[1.7]" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {v.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section
        className="py-20 sm:py-24"
        style={{ background: "#050507", borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="container">
          <motion.div {...fade(0)} className="max-w-2xl mx-auto text-center">
            <h2
              className="font-display font-extrabold text-white leading-[0.9]"
              style={{ fontSize: "clamp(40px, 6vw, 72px)", letterSpacing: "-0.05em" }}
            >
              Work with us.
            </h2>
            <p className="mt-8 text-[17px] leading-relaxed max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.4)" }}>
              Tell us about your project. We'll tell you honestly if we're the right fit.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8">
              <MagneticButton href="/contact" variant="primary">
                Start a conversation →
              </MagneticButton>
              <a
                href="mailto:cybiconz@gmail.com"
                className="font-mono text-[13px] text-white/50 hover:text-white transition-colors"
                style={{ letterSpacing: "0.1em" }}
              >
                CYBICONZ@GMAIL.COM
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </SiteShell>
  );
}
