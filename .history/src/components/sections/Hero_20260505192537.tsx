import { motion } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

const lineVariants = {
  hidden: { clipPath: "inset(100% 0 0 0)" },
  show: (i: number) => ({
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const deviceRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect || !deviceRef.current) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const xOffset = (x - 0.5) * 2 * 6;
    const yOffset = (y - 0.5) * 2 * 4;
    deviceRef.current.style.transition = "transform 0.1s ease";
    deviceRef.current.style.transform = `perspective(1200px) rotateY(${-8 + xOffset}deg) rotateX(${4 - yOffset}deg)`;
  };

  const handleMouseLeave = () => {
    if (!deviceRef.current) return;
    deviceRef.current.style.transition = "transform 0.6s ease";
    deviceRef.current.style.transform = "perspective(1200px) rotateY(-8deg) rotateX(4deg)";
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[700px] h-screen overflow-hidden bg-brand-base"
    >
      <div className="absolute inset-0 grid-overlay" />
      <div className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full pointer-events-none" style={{ background: "rgba(124,58,237,0.15)", filter: "blur(120px)" }} />
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "rgba(236,72,153,0.08)", filter: "blur(100px)" }} />

      <div className="container relative h-full grid lg:grid-cols-[55%_45%] gap-8 items-center pt-12 pb-20">
        {/* LEFT SIDE — unchanged */}
        <div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 border"
            style={{ background: "rgba(16,185,129,0.1)", borderColor: "rgba(16,185,129,0.2)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse-dot" />
            <span className="text-emerald text-xs font-mono">Available for new projects</span>
          </motion.div>

          <h1 className="font-display font-extrabold mt-6 leading-[0.92]" style={{ letterSpacing: "-0.04em" }}>
            <motion.div custom={0} initial="hidden" animate="show" variants={lineVariants} className="text-ink" style={{ fontSize: "clamp(56px, 8vw, 108px)" }}>CybiconZ</motion.div>
            <motion.div custom={1} initial="hidden" animate="show" variants={lineVariants} className="text-gradient" style={{ fontSize: "clamp(56px, 8vw, 108px)" }}>Builds.</motion.div>
            <motion.div custom={2} initial="hidden" animate="show" variants={lineVariants} className="text-ink/85" style={{ fontSize: "clamp(44px, 6vw, 80px)" }}>Digital Products.</motion.div>
          </h1>

          <p className="mt-6 text-[17px] italic text-white/50 border-l-[3px] border-violet pl-4 max-w-md">
            Not a template shop. Not a disappearing freelancer.
          </p>
          <p className="mt-4 text-base text-ink-muted max-w-md leading-relaxed">
            We design and build websites, e-commerce systems, and applications for businesses that need them to actually work — and stay working.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <Link to="/contact" className="bg-accent-gradient text-white font-bold text-[15px] px-8 py-4 rounded-xl shadow-glow-purple hover:opacity-95 transition">Start a Project →</Link>
            <Link to="/work" className="border border-white/10 bg-white/[0.03] text-ink font-semibold text-[15px] px-8 py-4 rounded-xl hover:bg-white/[0.06] transition">See Our Work</Link>
          </div>

          <div className="mt-12 pt-8 border-t border-white/[0.06] grid grid-cols-3 max-w-lg">
            {[
              { n: "2+", l: "Projects Completed" },
              { n: "100%", l: "Delivery Rate" },
              { n: "1 day", l: "Response Time" },
            ].map((s, i) => (
              <div key={s.l} className={`px-4 ${i > 0 ? "border-l border-white/[0.08]" : ""}`}>
                <div className="font-display font-extrabold text-[28px] text-ink leading-none">{s.n}</div>
                <div className="font-mono text-[11px] uppercase text-ink-muted mt-2 tracking-wider">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE — browser mockup */}
        <div className="relative h-[500px] lg:h-full hidden md:flex items-center justify-center">
          {/* Ambient glow */}
          <div
            className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(124,58,237,0.12), transparent)", filter: "blur(100px)" }}
          />

          {/* Float wrapper — everything floats together */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-[440px]"
          >
            {/* Tilt wrapper — receives mouse-driven perspective transform */}
            <div
              ref={deviceRef}
              style={{ transform: "perspective(1200px) rotateY(-8deg) rotateX(4deg)", transition: "transform 0.6s ease" }}
            >
              {/* Browser frame */}
              <div style={{
                background: "#0D0E18",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 16,
                boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)",
                overflow: "hidden",
              }}>
                {/* Top bar */}
                <div style={{
                  height: 36,
                  background: "#131524",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: 12,
                }}>
                  {/* Traffic lights */}
                  <div style={{ display: "flex", gap: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FF5F57" }} />
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FEBC2E" }} />
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#28C840" }} />
                  </div>
                  {/* URL bar — absolutely centered in bar */}
                  <div style={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: 6,
                    width: 200,
                    height: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
                      lwangblack.com
                    </span>
                  </div>
                </div>
                {/* Screenshot */}
                <div style={{ position: "relative" }}>
                  <img
                    src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80"
                    alt="LwangBlack Coffee storefront"
                    style={{ width: "100%", display: "block", objectFit: "cover" }}
                  />
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, #0D0E18 0%, transparent 40%)",
                    pointerEvents: "none",
                  }} />
                </div>
              </div>
            </div>

            {/* Card 1 — Project badge (bottom-left) */}
            <div className="absolute bottom-0 left-0" style={{ transform: "translate(-2rem, 1rem)" }}>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="rounded-2xl backdrop-blur-md"
                style={{ padding: 16, background: "rgba(13,14,24,0.9)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#F59E0B", flexShrink: 0, display: "inline-block" }} />
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)" }}>
                    E-Commerce
                  </span>
                </div>
                <div style={{ fontFamily: "'Bricolage Grotesque', system-ui, sans-serif", fontWeight: 700, fontSize: 14, color: "white" }}>
                  LwangBlack Coffee
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5L4 7L8 3" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>
                    Global · Multi-currency · Delivered
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Card 2 — Status pill (top-right) */}
            <div className="absolute top-0 right-0" style={{ transform: "translate(1rem, -0.5rem)" }}>
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  borderRadius: 9999,
                  padding: "8px 16px",
                  background: "rgba(13,14,24,0.9)",
                  border: "1px solid rgba(16,185,129,0.2)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse-dot" />
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 12, color: "white" }}>
                  Live & Running
                </span>
              </motion.div>
            </div>

            {/* Card 3 — Tech stack (right side, ~60% down) */}
            <div className="absolute" style={{ top: "60%", right: 0, transform: "translate(40px, -50%)" }}>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                style={{ padding: 12, borderRadius: 12, background: "rgba(13,14,24,0.9)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.3)", marginBottom: 8 }}>
                  Built with
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {[
                    { label: "React",   border: "rgba(124,58,237,0.4)", bg: "rgba(124,58,237,0.08)", color: "#A78BFA" },
                    { label: "Node.js", border: "rgba(16,185,129,0.3)",  bg: "rgba(16,185,129,0.06)",  color: "#6EE7B7" },
                    { label: "Stripe",  border: "rgba(245,158,11,0.3)",  bg: "rgba(245,158,11,0.06)",  color: "#FCD34D" },
                  ].map(pill => (
                    <span
                      key={pill.label}
                      style={{
                        fontSize: 11,
                        padding: "4px 12px",
                        borderRadius: 9999,
                        border: `1px solid ${pill.border}`,
                        background: pill.bg,
                        color: pill.color,
                        display: "block",
                      }}
                    >
                      {pill.label}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
