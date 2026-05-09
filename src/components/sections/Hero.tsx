import { useEffect, useRef, Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ParticleField } from "@/components/ui/ParticleField";
import { MagneticButton } from "@/components/ui/MagneticButton";

const HeroCanvas = lazy(() => import("./HeroCanvas"));

export default function Hero() {
  const headlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lines = headlineRef.current?.children;
    if (lines) {
      gsap.set(lines, { clipPath: "inset(100% 0 0 0)", y: 20 });
      gsap.to(lines, {
        clipPath: "inset(0% 0 0 0)",
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        delay: 0.2,
      });
    }

    gsap.set(".subheadline", { opacity: 0, y: 10 });
    gsap.to(".subheadline", { opacity: 1, y: 0, duration: 0.6, delay: 0.8, ease: "power2.out" });

    gsap.set(".ctas", { opacity: 0, y: 15 });
    gsap.to(".ctas", { opacity: 1, y: 0, duration: 0.6, delay: 1.0, ease: "power2.out" });

    gsap.set(".scroll-indicator", { opacity: 0 });
    gsap.to(".scroll-indicator", { opacity: 1, duration: 0.6, delay: 1.2, ease: "power2.out" });
  }, []);

  // Character scramble animation on the headline
  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const targets = document.querySelectorAll<HTMLSpanElement>("[data-scramble]");
    const timers: number[] = [];

    targets.forEach((el, i) => {
      const final = el.dataset.final ?? el.textContent ?? "";
      const delay = i * 40; // 0.04s per character
      const totalDuration = 400; // 0.4s per char
      const cycles = 6;
      const interval = totalDuration / cycles;

      const start = window.setTimeout(() => {
        if (final === " ") { el.textContent = " "; return; }
        let count = 0;
        const id = window.setInterval(() => {
          if (count >= cycles) {
            el.textContent = final;
            window.clearInterval(id);
            return;
          }
          el.textContent = chars[Math.floor(Math.random() * chars.length)];
          count++;
        }, interval);
        timers.push(id);
      }, delay);
      timers.push(start);
    });

    return () => { timers.forEach((t) => { window.clearTimeout(t); window.clearInterval(t); }); };
  }, []);

  useEffect(() => {
    const heroSection = document.getElementById("hero-section");
    const headlineEl = document.getElementById("hero-headline");
    const subEl = document.getElementById("hero-sub");
    const ctaEl = document.getElementById("hero-ctas");

    if (!heroSection || !headlineEl) return;

    const ctx = gsap.context(() => {
      gsap.to(headlineEl, {
        scale: 1.08, opacity: 0, y: -40, ease: "power2.in",
        scrollTrigger: { trigger: heroSection, start: "top top", end: "bottom top", scrub: 1.2 },
      });
      if (subEl) {
        gsap.to(subEl, {
          opacity: 0, y: -20, ease: "power2.in",
          scrollTrigger: { trigger: heroSection, start: "top top", end: "60% top", scrub: 0.8 },
        });
      }
      if (ctaEl) {
        gsap.to(ctaEl, {
          opacity: 0, y: -15, ease: "power1.in",
          scrollTrigger: { trigger: heroSection, start: "top top", end: "40% top", scrub: 0.6 },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero-section" data-section="hero-section" className="relative flex items-center justify-center overflow-hidden dark-texture" style={{ background: "#060608", minHeight: "140vh", position: "relative" }}>
      {/* Glow Story - Hero */}
      {/* Violet glow — top-right */}
      <div aria-hidden style={{ position: "absolute", top: "-100px", right: "-100px", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(rgba(79,70,229,0.18), transparent 65%)", pointerEvents: "none", zIndex: 0, filter: "blur(1px)" }} />
      {/* Pink glow — bottom-left */}
      <div aria-hidden style={{ position: "absolute", bottom: "10%", left: "-50px", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(rgba(236,72,153,0.08), transparent 65%)", pointerEvents: "none", zIndex: 0, filter: "blur(1px)" }} />

      {/* Three.js Canvas — lazy loaded so it doesn't block initial render */}
      <div className="absolute inset-x-0 top-0 pointer-events-none z-0" style={{ height: "100vh" }}>
        <Suspense fallback={<div style={{ position: "absolute", inset: 0 }} />}>
          <HeroCanvas />
        </Suspense>
      </div>

      {/* Particle field overlay */}
      <div className="absolute inset-x-0 top-0 pointer-events-none" style={{ height: "100vh", zIndex: 1 }}>
        <ParticleField />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1000px] mx-auto px-6 text-center" style={{ position: "absolute", top: "50vh", left: "50%", transform: "translate(-50%, -50%)", width: "100%" }}>
        <div className="mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-white/30">
            Digital Agency · Tokyo, Japan
          </span>
        </div>

        <div ref={headlineRef} id="hero-headline" className="mb-8">
          <div className="block font-display font-black text-white leading-none" style={{ fontSize: "clamp(64px, 10vw, 140px)", letterSpacing: "-0.04em", lineHeight: "0.9" }}>
            {Array.from("We build").map((c, i) => (
              <span key={`l1-${i}`} data-scramble data-final={c} style={{ display: "inline-block", whiteSpace: "pre" }}>{c}</span>
            ))}
          </div>
          <div className="block font-display font-black leading-none" style={{ fontSize: "clamp(64px, 10vw, 140px)", letterSpacing: "-0.04em", lineHeight: "0.9", WebkitTextStroke: "1.5px rgba(240,238,255,0.4)", WebkitTextFillColor: "transparent", color: "transparent" }}>
            {Array.from("digital products").map((c, i) => (
              <span key={`l2-${i}`} data-scramble data-final={c} style={{ display: "inline-block", whiteSpace: "pre" }}>{c}</span>
            ))}
          </div>
          <div className="block font-display font-black text-white leading-none" style={{ fontSize: "clamp(64px, 10vw, 140px)", letterSpacing: "-0.04em", lineHeight: "0.9" }}>
            {Array.from("that work.").map((c, i) => (
              <span key={`l3-${i}`} data-scramble data-final={c} style={{ display: "inline-block", whiteSpace: "pre" }}>{c}</span>
            ))}
          </div>
        </div>

        <p id="hero-sub" className="subheadline font-sans font-normal text-lg text-white/40 max-w-lg mx-auto mb-12">
          Not a template shop. Not a disappearing freelancer.
        </p>

        <div id="hero-ctas" className="ctas flex flex-col sm:flex-row gap-4 justify-center mb-16 items-center">
          <MagneticButton href="/contact" variant="primary">Start a Project →</MagneticButton>
          <MagneticButton href="/work" variant="secondary">See our work</MagneticButton>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10" style={{ top: "calc(100vh - 80px)" }}>
        <span className="font-mono text-xs text-white/20 uppercase tracking-wider">SCROLL</span>
        <motion.div
          className="w-px h-8 bg-white/10"
          animate={{ scaleY: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </section>
  );
}
