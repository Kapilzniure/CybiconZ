import { useEffect, useRef, Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ParticleField } from "@/components/ui/ParticleField";
import { MagneticButton } from "@/components/ui/MagneticButton";

const HeroCanvas = lazy(() => import("./HeroCanvas"));

function useScramble(text: string, delay: number = 0) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let interval: number | undefined;

    const timeout = window.setTimeout(() => {
      const letters = text.split("");
      let iteration = 0;

      interval = window.setInterval(() => {
        el.innerText = letters
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) return char;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");

        if (iteration >= letters.length) {
          window.clearInterval(interval);
          el.innerText = text;
        }

        iteration += 0.4;
      }, 40);
    }, delay);

    return () => {
      window.clearTimeout(timeout);
      if (interval) window.clearInterval(interval);
    };
  }, [text, delay]);

  return ref;
}

export default function Hero() {
  const line1Ref = useScramble("We build", 400);
  const line2Ref = useScramble("digital products", 700);
  const line3Ref = useScramble("that work.", 1000);

  useEffect(() => {
    gsap.set(".subheadline", { opacity: 0, y: 10 });
    gsap.to(".subheadline", { opacity: 1, y: 0, duration: 0.6, delay: 0.8, ease: "power2.out" });

    gsap.set(".ctas", { opacity: 0, y: 15 });
    gsap.to(".ctas", { opacity: 1, y: 0, duration: 0.6, delay: 1.0, ease: "power2.out" });

    gsap.set(".scroll-indicator", { opacity: 0 });
    gsap.to(".scroll-indicator", { opacity: 1, duration: 0.6, delay: 1.2, ease: "power2.out" });
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
      <div aria-hidden style={{ position: "absolute", top: "-100px", right: "-100px", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(rgba(79,70,229,0.18), transparent 65%)", pointerEvents: "none", zIndex: 0, filter: "blur(1px)" }} />
      <div aria-hidden style={{ position: "absolute", bottom: "10%", left: "-50px", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(rgba(236,72,153,0.08), transparent 65%)", pointerEvents: "none", zIndex: 0, filter: "blur(1px)" }} />

      {/* Three.js Canvas — lazy loaded */}
      <div className="absolute inset-x-0 top-0 pointer-events-none z-0" style={{ height: "100vh" }}>
        <Suspense fallback={<div style={{ position: "absolute", inset: 0 }} />}>
          <HeroCanvas />
        </Suspense>
      </div>

      {/* Vignette overlay — darkens edges to integrate canvas */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 pointer-events-none z-[1]"
        style={{
          height: "100vh",
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(6,6,8,0.85) 100%)",
        }}
      />

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

        <div id="hero-headline" className="mb-8">
          <div className="block font-display font-black text-white leading-none" style={{ fontSize: "clamp(64px, 10vw, 140px)", letterSpacing: "-0.04em", lineHeight: "0.9" }}>
            <span ref={line1Ref}>We build</span>
          </div>
          <div className="block font-display font-black leading-none" style={{ fontSize: "clamp(64px, 10vw, 140px)", letterSpacing: "-0.04em", lineHeight: "0.9", WebkitTextStroke: "1.5px rgba(240,238,255,0.4)", WebkitTextFillColor: "transparent", color: "transparent" }}>
            <span ref={line2Ref}>digital products</span>
          </div>
          <div className="block font-display font-black text-white leading-none" style={{ fontSize: "clamp(64px, 10vw, 140px)", letterSpacing: "-0.04em", lineHeight: "0.9" }}>
            <span ref={line3Ref}>that work.</span>
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
