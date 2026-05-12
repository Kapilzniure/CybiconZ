import { useEffect, Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

const HeroCanvas = lazy(() => import("./HeroCanvas"));

export default function Hero() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Professional fade-ins for content
      gsap.from(".hero-content-reveal", { 
        opacity: 0, 
        y: 10, 
        duration: 0.8, 
        stagger: 0.1, 
        ease: "power2.out", 
        delay: 0.4 
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="hero-section" 
      data-section="hero-section"
      className="relative flex flex-col items-center justify-between h-screen min-h-[700px] overflow-hidden bg-[#020408]"
    >
      {/* 3D Background - Simplified wireframe cityscape */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Suspense fallback={null}>
          <HeroCanvas />
        </Suspense>
      </div>

      {/* Atmospheric Overlays for Depth */}
      <div 
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(2,4,8,0.2) 50%, rgba(2,4,8,0.9) 100%)'
        }}
      />

      {/* TOP: Headline Cluster (Just below Navigation) */}
      <div className="relative z-10 w-full pt-2 md:pt-2 px-6 flex flex-col items-center text-center">
        <div className="hero-content-reveal mb-2 flex items-center gap-3">
          <div className="h-px w-6 bg-brand-blue/30" />
         
          <div className="h-px w-6 bg-brand-blue/30" />
        </div>
        <h1 className="hero-content-reveal font-display font-extrabold leading-none tracking-tighter text-white"
            style={{ fontSize: 'clamp(30px, 6vw, 74px)' }}>
          We build <span className="text-brand-blue">digital</span> products.
        </h1>
      </div>

      {/* CENTER: Heroic Logo Showcase */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center flex-grow px-6">
        <div className="hero-content-reveal relative max-w-[85vw] md:max-w-[700px] w-full flex flex-col items-center">
          <img 
            src="/cybiconz-logo.png" 
            alt="CybiconZ Logo" 
            className="w-full h-auto object-contain"
            style={{ 
              filter: 'drop-shadow(0 0 80px rgba(0,196,255,0.2))',
              maxHeight: '40vh'
            }}
          />
          
          {/* Actions - Directly below the Logo */}
          <div className="hero-content-reveal flex flex-col sm:flex-row gap-4 mt-12 w-full justify-center items-center">
            <a href="/contact" className="w-full sm:w-auto px-10 py-4 bg-white text-black font-bold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] text-center">
              Start a Project
            </a>
            <a href="/work" className="w-full sm:w-auto px-10 py-4 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/5 transition-all text-center">
              Our Portfolio
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM: Metrics Bar & Scroll (Above the Fold) */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-10">
        <div className="hero-content-reveal flex flex-wrap justify-center md:justify-between items-center gap-y-6 gap-x-12 py-6 border-t border-white/5">
          {[
            { label: 'DELIVERY', value: '100%', color: 'brand-blue' },
            { label: 'RESPONSE', value: '< 1 DAY', color: 'brand-green' },
            { label: 'PROJECTS', value: '25+', color: 'white' },
            { label: 'LOCATION', value: 'TOKYO', color: 'white' }
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center md:items-start min-w-[100px]">
              <span className={`text-xl font-display font-bold text-${stat.color} tracking-tight`}>
                {stat.value}
              </span>
              <span className="font-mono text-[8px] tracking-[0.2em] text-white/20 uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Minimal Scroll Hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none opacity-20">
        <div className="w-[1px] h-6 bg-gradient-to-b from-brand-blue to-transparent" />
      </div>

    </section>
  );
}