import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-[#050608] dark-texture border-t border-white/5 pt-20 pb-8 overflow-hidden" style={{ position: "relative" }}>
      {/* Glow Story - Footer */}
      {/* Dim violet glow — top-center, fading story */}
      <div aria-hidden style={{ position: "absolute", top: "-100px", left: "50%", transform: "translateX(-50%)", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(rgba(79,70,229,0.05), transparent 65%)", pointerEvents: "none", zIndex: 0, filter: "blur(1px)" }} />
      <div className="container relative z-10">
        {/* Newsletter */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-6 md:p-8 mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="font-display font-bold text-lg text-ink">Stay updated with CybiconZ</h3>
            <p className="text-ink-muted text-sm mt-1">Quarterly notes on what we're shipping. No spam, ever.</p>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3">
            <input type="email" required placeholder="you@business.com" className="flex-1 min-h-[48px] bg-brand-base border border-white/10 rounded-xl px-4 py-3 text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-violet" />
            <button className="text-white font-bold text-sm px-5 py-4 sm:py-3 rounded-xl min-h-[48px]" style={{ background: 'linear-gradient(135deg, #00C4FF, #0066FF)' }}>Subscribe</button>
          </form>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 mb-16">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo />
            <p className="text-ink-muted text-sm mt-4 leading-relaxed max-w-sm">A digital agency building real products for real businesses. Not a template shop.</p>
            <a href="mailto:hello@cybiconz.com" className="text-ink-muted hover:text-ink text-sm mt-4 inline-block font-medium underline underline-offset-4 decoration-white/10 hover:decoration-white/30 transition-all">hello@cybiconz.com</a>
          </div>
          <FooterCol title="Services" links={[
            { label: "Website Development", to: "/services" },
            { label: "E-Commerce", to: "/services" },
            { label: "Applications", to: "/services" },
            { label: "Design Systems", to: "/services" },
            { label: "Marketing", to: "/services" },
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

        <div className="border-t border-white/5 pt-8 flex flex-col lg:flex-row items-center justify-between text-[11px] sm:text-xs text-white/20 gap-6 text-center lg:text-left">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <span>© 2024 CybiconZ</span>
            <span className="hidden sm:inline">·</span>
            <Link to="#" className="hover:text-white/50 transition-colors">Privacy</Link>
            <span className="hidden sm:inline">·</span>
            <Link to="#" className="hover:text-white/50 transition-colors">Terms</Link>
          </div>
          <div style={{ color: "rgba(255,255,255,0.15)", fontSize: 11 }} className="order-first lg:order-none font-medium tracking-wide">DESIGNED AND BUILT BY CYBICONZ</div>
          <div className="flex items-center gap-2">
            Infrastructure by <a href="#" className="text-white/30 hover:text-violet transition-colors font-medium">ZenHost</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div>
      <h4 className="label-eyebrow text-white/25 mb-4">{title}</h4>
      <ul className="space-y-2.5">
        {links.map(l => (
          <li key={l.label}><Link to={l.to} className="text-[13px] text-white/35 hover:text-ink transition-colors">{l.label}</Link></li>
        ))}
      </ul>
    </div>
  );
}
