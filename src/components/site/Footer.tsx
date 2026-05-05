import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-[#050608] border-t border-white/5 pt-20 pb-8">
      <div className="container">
        {/* Newsletter */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-8 mb-16 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="font-display font-bold text-lg text-ink">Stay updated with CybiconZ</h3>
            <p className="text-ink-muted text-sm mt-1">Quarterly notes on what we're shipping. No spam, ever.</p>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-3">
            <input type="email" required placeholder="you@business.com" className="flex-1 bg-brand-base border border-white/10 rounded-xl px-4 py-3 text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-violet" />
            <button className="bg-accent-gradient text-white font-bold text-sm px-5 py-3 rounded-xl">Subscribe</button>
          </form>
        </div>

        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <Logo />
            <p className="text-ink-muted text-sm mt-4 leading-relaxed">A digital agency building real products for real businesses. Not a template shop.</p>
            <a href="mailto:hello@cybiconz.com" className="text-ink-muted hover:text-ink text-sm mt-3 inline-block">hello@cybiconz.com</a>
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

        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-white/20 gap-2">
          <div className="flex items-center gap-3">
            <span>© 2024 CybiconZ</span><span>·</span>
            <Link to="#" className="hover:text-white/50">Privacy</Link><span>·</span>
            <Link to="#" className="hover:text-white/50">Terms</Link>
          </div>
          <div>Infrastructure by <a href="#" className="hover:text-[#A855F7]">ZenHost</a></div>
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
