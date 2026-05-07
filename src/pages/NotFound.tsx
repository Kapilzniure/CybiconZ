import { Link } from "react-router-dom";
import SiteShell from "@/components/site/SiteShell";

export default function NotFound() {
  return (
    <SiteShell>
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 grid-overlay" />
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "rgba(79,70,229,0.15)", filter: "blur(120px)" }} />
        <div className="container relative text-center">
          <div className="font-display font-extrabold text-gradient leading-none" style={{ fontSize: "clamp(120px, 20vw, 240px)", letterSpacing: "-0.05em" }}>404</div>
          <h1 className="font-display font-extrabold text-ink mt-4" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>Page not found.</h1>
          <p className="text-ink-muted mt-3 max-w-md mx-auto">The link you followed is either broken or this page has been moved.</p>
          <Link to="/" className="inline-flex mt-8 bg-accent-gradient text-white font-bold text-sm px-6 py-3 rounded-xl shadow-glow-indigo">← Back home</Link>
        </div>
      </section>
    </SiteShell>
  );
}
