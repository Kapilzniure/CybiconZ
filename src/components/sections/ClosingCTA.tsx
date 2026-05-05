import { Link } from "react-router-dom";

export default function ClosingCTA() {
  return (
    <section className="relative overflow-hidden py-[120px]" style={{ background: "linear-gradient(135deg, #07080E, #0E0830, #07080E)" }}>
      <div className="absolute inset-0 dark-texture pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "rgba(109,40,217,0.18)", filter: "blur(140px)" }} />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "rgba(236,72,153,0.12)", filter: "blur(140px)" }} />
      <div className="container relative max-w-2xl text-center">
        <span className="label-eyebrow text-violet">Ready to start?</span>
        <h2 className="font-display font-extrabold text-ink mt-5 leading-[0.95]" style={{ fontSize: "clamp(48px, 7vw, 96px)", letterSpacing: "-0.04em" }}>
          Have a project<br />
          <span className="text-gradient">in mind?</span>
        </h2>
        <p className="text-ink-muted text-[16px] mt-6 max-w-lg mx-auto leading-relaxed">
          Tell us what you need. We respond within one business day. If we're not the right fit, we'll say so.
        </p>
        <Link to="/contact" className="inline-flex bg-accent-gradient text-white font-bold text-[15px] px-10 py-4 rounded-xl shadow-glow-purple mt-10 hover:opacity-95 transition">
          Start a conversation →
        </Link>
        <div className="mt-6">
          <a href="mailto:hello@cybiconz.com" className="text-ink-muted hover:text-ink text-sm transition">hello@cybiconz.com</a>
        </div>
      </div>
    </section>
  );
}
