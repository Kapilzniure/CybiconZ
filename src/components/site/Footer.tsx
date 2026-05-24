import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-[#050608] dark-texture border-t border-white/5 pt-20 pb-8 overflow-hidden" style={{ position: "relative" }}>
      {/* Glow Story - Footer */}
      {/* Dim violet glow — top-center, fading story */}
      <div aria-hidden style={{ position: "absolute", top: "-100px", left: "50%", transform: "translateX(-50%)", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(rgba(79,70,229,0.05), transparent 65%)", pointerEvents: "none", zIndex: 0, filter: "blur(1px)" }} />
      <div className="container relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 mb-16">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo />
            <p className="text-ink-muted text-sm mt-4 leading-relaxed max-w-sm">A digital agency building real products for real businesses. Not a template shop.</p>
            <a href="mailto:cybiconz@gmail.com" className="text-ink-muted hover:text-ink text-sm mt-4 inline-block font-medium underline underline-offset-4 decoration-white/10 hover:decoration-white/30 transition-all">cybiconz@gmail.com</a>

            {/* Social links */}
            <div className="flex items-center gap-4 mt-5">
              <a href="https://www.facebook.com/profile.php?id=61587433456616" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://www.instagram.com/cybiconz_/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://www.tiktok.com/@cybiconz_" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors" aria-label="TikTok">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/></svg>
              </a>
            </div>
          </div>
          <FooterCol title="Services" links={[
            { label: "Services", to: "/services" },
          ]} />
          <FooterCol title="Company" links={[
            { label: "About", to: "/about" },
            { label: "Work", to: "/work" },
            { label: "Blog", to: "/blog" },
            { label: "CybiLearn", to: "/cybilearn" },
            { label: "Careers", to: "/careers" },
            { label: "Contact", to: "/contact" },
          ]} />
          <FooterCol title="Work & Partners" links={[
            { label: "LwangBlack Coffee", to: "/work/lwangblack" },
            { label: "Johnnies Liquor", to: "/work/johnnies-liquor" },
            { label: "ZenHost (Partner)", to: "#" },
          ]} />
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col lg:flex-row items-center justify-between text-[11px] sm:text-xs text-white/55 gap-6 text-center lg:text-left">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <span>© 2026 CybiconZ</span>
            <span className="hidden sm:inline">·</span>
            <Link to="/privacy" className="hover:text-white/80 transition-colors">Privacy</Link>
            <span className="hidden sm:inline">·</span>
            <Link to="/terms" className="hover:text-white/80 transition-colors">Terms</Link>
          </div>
          <div style={{ color: "rgba(255,255,255,0.48)", fontSize: 11 }} className="order-first lg:order-none font-medium tracking-wide">DESIGNED AND BUILT BY CYBICONZ</div>
          
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div>
      <h4 className="label-eyebrow text-white/60 mb-4">{title}</h4>
      <ul className="space-y-2.5">
        {links.map(l => (
          <li key={l.label}><Link to={l.to} className="text-[13px] text-white/70 hover:text-ink transition-colors">{l.label}</Link></li>
        ))}
      </ul>
    </div>
  );
}
