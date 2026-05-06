import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "./Logo";

const links = [
  { to: "/services", label: "Services" },
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/cybilearn", label: "CybiLearn" },
  { to: "/careers", label: "Careers" },
  { to: "/blog", label: "Blog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { setOpen(false); }, [loc.pathname]);

  return (
    <header className={`sticky top-0 z-40 transition-colors duration-300 ${scrolled ? "bg-brand-base/90 backdrop-filter backdrop-blur-xl border-b border-white/[0.06]" : "bg-transparent"}`}>
      <div className="container h-16 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) =>
              `relative text-sm font-medium transition-colors ${isActive ? "text-ink" : "text-white/45 hover:text-ink"}`
            }>
              {({ isActive }) => (<>
                {l.label}
                {isActive && <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />}
              </>)}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/contact" className="hidden md:inline-flex bg-accent-gradient text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-glow-purple hover:opacity-90 transition">
            Let's talk →
          </Link>
          <button onClick={() => setOpen(!open)} className="md:hidden text-ink p-2.5 -mr-2.5 touch-manipulation" aria-label="Menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d={open ? "M6 6l12 12M6 18L18 6" : "M4 7h16M4 12h16M4 17h16"} stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-brand-base border-t border-white/5 animate-in slide-in-from-top duration-300">
          <div className="container py-8 flex flex-col gap-5">
            {links.map(l => (
              <NavLink key={l.to} to={l.to} className="text-ink text-xl font-medium py-1">{l.label}</NavLink>
            ))}
            <Link to="/contact" className="bg-accent-gradient text-white text-center font-bold px-5 py-4 rounded-xl mt-2">Let's talk →</Link>
          </div>
        </div>
      )}
    </header>
  );
}
