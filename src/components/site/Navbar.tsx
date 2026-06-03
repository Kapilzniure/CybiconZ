import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { MusicToggle } from "@/components/ui/MusicToggle";

const links = [
  { to: "/services", label: "Services" },
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/cybilearn", label: "CybiLearn" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
  { to: "/blog", label: "Blog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => {
      const currentScroll = window.scrollY;
      setScrolled(currentScroll > 80);
      
      // Only delay on the landing page's hero section
      if (loc.pathname === "/") {
        // Show navbar only after the 300vh hero sequence is mostly complete
        setShowNavbar(currentScroll > window.innerHeight * 2.5);
      } else {
        setShowNavbar(true);
      }
    };

    onScroll(); // Initial check
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [loc.pathname]);

  useEffect(() => { setOpen(false); }, [loc.pathname]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) setOpen(false)
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [open])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const isHidden = loc.pathname === "/" && !showNavbar;

  return (
    <header 
      className={`w-full transition-all duration-500 ${
        scrolled
          ? "bg-brand-base/90 backdrop-filter backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
      style={{
        opacity: isHidden ? 0 : 1,
        pointerEvents: isHidden ? "none" : "auto",
        transition: "opacity 500ms ease, background 300ms ease",
      }}
    >
      <div className="container h-16 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) =>
              `relative text-sm font-medium transition-colors ${isActive ? "text-ink" : "text-white/70 hover:text-ink"}`
            }>
              {({ isActive }) => (<>
                {l.label}
                {isActive && <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full" style={{ background: "var(--theme-primary, #00C4FF)", transition: "background 600ms ease" }} />}
              </>)}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <MusicToggle />
          <Link
            to="/contact"
            className="hidden md:inline-flex items-center text-white font-semibold text-sm px-5 py-2.5 rounded-lg border border-white/20 hover:bg-white/[0.06] hover:border-white/40 transition-all"
            style={{ letterSpacing: "0.01em" }}
          >
            Let's talk →
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-ink p-2.5 -mr-2.5 touch-manipulation"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d={open ? "M6 6l12 12M6 18L18 6" : "M4 7h16M4 12h16M4 17h16"} stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>
      </div>
      {open && (
        <div id="mobile-nav" className="md:hidden bg-brand-base border-t border-white/5 animate-in slide-in-from-top duration-300">
          <div className="container py-8 flex flex-col gap-5">
            {links.map(l => (
              <NavLink key={l.to} to={l.to} className="text-ink text-xl font-medium py-1">{l.label}</NavLink>
            ))}
            <Link to="/contact" className="text-white text-center font-semibold px-5 py-4 rounded-lg mt-2 border border-white/20">Let's talk →</Link>
          </div>
        </div>
      )}
    </header>
  );
}
