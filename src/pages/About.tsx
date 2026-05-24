import { motion } from "framer-motion";
import SiteShell from "@/components/site/SiteShell";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { usePageMeta } from "@/hooks/usePageMeta";
import SplineAbout from "@/components/sections/SplineAbout";

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
        className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28"
        style={{ background: "#060608" }}
      >
        <div
          aria-hidden
          className="absolute -top-40 right-0 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: "rgba(79,70,229,0.10)", filter: "blur(140px)" }}
        />

        <div className="container relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* LEFT — text */}
            <div>
              <motion.div {...fade(0)} className="flex items-center gap-3 mb-7">
                <span className="w-4 h-px bg-violet-500" />
                <span className="label-eyebrow text-violet">About</span>
              </motion.div>

              <motion.h1
                {...fade(0.06)}
                className="font-display font-extrabold text-white leading-[0.92]"
                style={{ fontSize: "clamp(44px, 7vw, 84px)", letterSpacing: "-0.04em" }}
              >
                A focused team.<br />
                <span style={{ color: "rgba(255,255,255,0.65)" }}>Building real products.</span>
              </motion.h1>

              <motion.p
                {...fade(0.14)}
                className="mt-7 text-[15px] sm:text-[16px] leading-[1.8] max-w-md"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                CybiconZ is a digital agency based in Tokyo. We build websites,
                e-commerce systems, and applications for businesses that need
                their digital presence to actually work — not just exist.
              </motion.p>

              <motion.p
                {...fade(0.2)}
                className="mt-4 text-[15px] sm:text-[16px] leading-[1.8] max-w-md"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                The agency is led directly by the founder. Every project gets
                personal attention from the person making decisions — not an
                account manager, not outsourced development.
              </motion.p>

              <motion.div {...fade(0.28)} className="mt-9 flex items-center gap-5">
                <MagneticButton href="/contact" variant="primary">
                  Start a project →
                </MagneticButton>
                <a
                  href="mailto:cybiconz@gmail.com"
                  className="text-[13px] font-mono transition-colors"
                  style={{ color: "rgba(255,255,255,0.62)", letterSpacing: "0.02em" }}
                >
                  cybiconz@gmail.com
                </a>
              </motion.div>
            </div>

            {/* RIGHT — founder photo (square) */}
            <motion.div {...fade(0.12)} className="flex justify-center lg:justify-end">
              <div
                style={{
                  width: "min(420px, 100%)",
                  aspectRatio: "1 / 1",
                  borderRadius: 16,
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "#0d0e1c",
                  position: "relative",
                }}
              >
                {/* Real photo — replace /founder.jpg with your image */}
                <img
                  src="/founder.jpg"
                  alt="Niure Kapil — Founder, CybiconZ"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                />

                {/* Placeholder (shown when photo is missing) */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 12,
                    background: "linear-gradient(145deg, #0e0f22 0%, #0a0b18 100%)",
                  }}
                >
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: "50%",
                      background: "rgba(79,70,229,0.12)",
                      border: "1px solid rgba(79,70,229,0.22)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="rgba(79,70,229,0.55)" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <span
                    style={{
                      fontSize: 9,
                      fontFamily: "monospace",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.5)",
                      textAlign: "center",
                    }}
                  >
                    Add photo to<br />/public/founder.jpg
                  </span>
                </div>

                {/* Bottom gradient + name */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 100,
                    background: "linear-gradient(to top, rgba(6,6,8,0.88) 0%, transparent 100%)",
                    pointerEvents: "none",
                  }}
                />
                <div style={{ position: "absolute", bottom: 18, left: 20 }}>
                  <div style={{ fontFamily: "Bricolage Grotesque, sans-serif", fontWeight: 700, fontSize: 14, color: "#fff" }}>
                    Niure Kapil
                  </div>
                  <div style={{ fontSize: 11, marginTop: 2, color: "rgba(255,255,255,0.65)", fontFamily: "monospace", letterSpacing: "0.04em" }}>
                    Founder · CybiconZ · Tokyo
                  </div>
                </div>

                {/* Accent dot */}
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#4F46E5",
                    boxShadow: "0 0 10px rgba(79,70,229,0.9)",
                  }}
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── THE STORY + ROBOT ────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-20 sm:py-28"
        style={{ background: "#0A0A12", borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div
          aria-hidden
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "rgba(249,115,22,0.06)", filter: "blur(120px)" }}
        />

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left — story text */}
            <div>
              <motion.div {...fade(0)} className="mb-8">
                <span className="label-eyebrow text-violet">The story</span>
                <h2
                  className="font-display font-extrabold text-white mt-3 leading-[0.95]"
                  style={{ fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-0.03em" }}
                >
                  Why CybiconZ exists.
                </h2>
              </motion.div>

              <motion.p {...fade(0.08)} className="text-[15px] sm:text-[16px] leading-[1.85]" style={{ color: "rgba(255,255,255,0.5)" }}>
                Most businesses face the same problem: their website either looks good
                but doesn't convert, or it's functional but confusing. Either way,
                it's not doing what it should.
              </motion.p>
              <motion.p {...fade(0.14)} className="mt-5 text-[15px] sm:text-[16px] leading-[1.85]" style={{ color: "rgba(255,255,255,0.5)" }}>
                I started CybiconZ after noticing this gap repeatedly. The problem
                wasn't always the technology — it was the approach. CybiconZ exists
                to build digital systems that are simple to understand and effective
                for the people who use them.
              </motion.p>
              <motion.p {...fade(0.2)} className="mt-5 text-[15px] sm:text-[16px] leading-[1.85]" style={{ color: "rgba(255,255,255,0.5)" }}>
                We're based in Tokyo and work with clients globally. Small by design —
                focused work produces better results than large teams spread thin.
              </motion.p>
            </div>

            {/* Right — Spline robot */}
            <motion.div
              {...fade(0.1)}
              className="w-full relative"
              style={{ height: "clamp(380px, 90vw, 600px)" }}
            >
              <SplineAbout />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-20 sm:py-28"
        style={{ background: "#060608", borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div
          aria-hidden
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "rgba(6,182,212,0.05)", filter: "blur(120px)" }}
        />
        <div className="container relative z-10">
          <motion.div {...fade(0)} className="mb-12 sm:mb-14">
            <span className="label-eyebrow text-violet">Principles</span>
            <h2
              className="font-display font-extrabold text-white mt-3 leading-[0.95]"
              style={{ fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-0.03em" }}
            >
              Three things we never compromise on.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  background: "#0A0A12",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 14,
                  padding: "28px 28px 32px",
                }}
              >
                <div style={{ width: 28, height: 2, borderRadius: 2, background: "#4F46E5", marginBottom: 24 }} />
                <h3
                  className="font-display font-bold text-white leading-tight mb-3"
                  style={{ fontSize: "clamp(17px, 1.5vw, 20px)" }}
                >
                  {v.title}
                </h3>
                <p className="text-[14px] leading-[1.75]" style={{ color: "rgba(255,255,255,0.72)" }}>
                  {v.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section
        className="py-20 sm:py-28"
        style={{ background: "#0A0A12", borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="container">
          <motion.div {...fade(0)} className="max-w-xl mx-auto text-center">
            <h2
              className="font-display font-extrabold text-white leading-[0.95]"
              style={{ fontSize: "clamp(32px, 5vw, 56px)", letterSpacing: "-0.04em" }}
            >
              Work with us.
            </h2>
            <p className="mt-5 text-[15px] sm:text-[16px] leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
              Tell us about your project. We'll tell you honestly if we're the right fit.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton href="/contact" variant="primary">
                Start a conversation →
              </MagneticButton>
              <a
                href="mailto:cybiconz@gmail.com"
                className="text-[13px] font-mono"
                style={{ color: "rgba(255,255,255,0.62)", letterSpacing: "0.02em" }}
              >
                cybiconz@gmail.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </SiteShell>
  );
}
