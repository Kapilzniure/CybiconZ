import { useEffect } from "react";
import { services } from "@/data/services";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Services() {
  useEffect(() => {
    const panels = document.querySelectorAll<HTMLElement>('.service-panel-3d');
    if (!panels.length) return;

    const ctx = gsap.context(() => {
      panels.forEach((panel, i) => {
        gsap.set(panel, {
          rotateX: 8,
          rotateY: -4,
          transformPerspective: 1200,
          transformOrigin: 'center top',
          opacity: 0,
          y: 60,
        });
        gsap.to(panel, {
          rotateX: 0,
          rotateY: 0,
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          delay: i * 0.08,
          scrollTrigger: {
            trigger: panel,
            start: 'top 85%',
            once: true,
          },
        });
      });
    });

    const enter = (e: Event) => {
      const panel = e.currentTarget as HTMLElement;
      const img = panel.querySelector('img');
      if (img) (img as HTMLImageElement).style.filter = 'brightness(0.55) saturate(1.1)';
      const category = panel.dataset.category || 'Explore';
      window.dispatchEvent(new CustomEvent('cursor:label', { detail: { label: category, size: 'large' } }));
    };
    const leave = (e: Event) => {
      const panel = e.currentTarget as HTMLElement;
      const img = panel.querySelector('img');
      if (img) (img as HTMLImageElement).style.filter = 'brightness(0.35) saturate(0.8)';
      window.dispatchEvent(new CustomEvent('cursor:label', { detail: { label: null, size: 'normal' } }));
    };
    panels.forEach(p => {
      p.addEventListener('mouseenter', enter);
      p.addEventListener('mouseleave', leave);
    });

    return () => {
      ctx.revert();
      panels.forEach(p => {
        p.removeEventListener('mouseenter', enter);
        p.removeEventListener('mouseleave', leave);
      });
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger instanceof Element && (t.vars.trigger as Element).classList.contains('service-panel-3d')) {
          t.kill();
        }
      });
    };
  }, []);

  return (
    <section className="bg-[#060608] overflow-hidden relative">
      {/* Violet atmospheric glow */}
      <div aria-hidden style={{ position: "absolute", top: "-200px", right: "-200px", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(rgba(124,58,237,0.10), transparent 65%)", pointerEvents: "none", zIndex: 0 }} />

      {/* SECTION HEADER */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20 pt-20 pb-12 md:pt-[80px] md:pb-[60px] relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-4 h-0.5 bg-[#7C3AED]" />
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#7C3AED]">
            What we build
          </span>
        </div>
        <h2 className="section-headline-reveal font-display font-extrabold text-white leading-[0.92] tracking-[-0.04em]" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
          Services
        </h2>
        <div className="hidden lg:block absolute right-20 bottom-[60px]">
          <p className="font-sans text-white/50 text-base">
            Every engagement scoped to your situation.
          </p>
        </div>
      </div>

      {/* SERVICE PANELS */}
      <div className="flex flex-col">
        {services && services.length > 0 ? services.map((service) => (
          <div
            key={service.id}
            data-category={service.category}
            className="service-panel-3d group relative w-full h-[260px] sm:h-[360px] lg:h-[420px] overflow-hidden border-b border-white/5 last:border-b-0 cursor-pointer"
          >
            <Link to="/services" className="absolute inset-0 block z-40 md:z-auto" />
            
            {/* 1. Background image layer */}
            <div className="absolute inset-0">
              <img
                src={service.image}
                alt={service.name}
                loading="lazy"
                className="w-full h-full object-cover transition-all duration-500"
                style={{ filter: 'brightness(0.35) saturate(0.8)' }}
              />
            </div>

            {/* 2. Gradient overlay layer */}
            <div 
              className="absolute inset-0" 
              style={{
                background: "linear-gradient(105deg, rgba(7,8,14,0.92) 0%, rgba(7,8,14,0.75) 40%, rgba(7,8,14,0.35) 70%, rgba(7,8,14,0.1) 100%)"
              }}
            />

            {/* 3. Colored accent line */}
            <div 
              className="absolute top-0 left-0 right-0 h-[2px] z-20 origin-left transition-transform duration-500 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] scale-x-0 group-hover:scale-x-100"
              style={{ background: service.gradient }}
            />

            {/* 4. Content layer */}
            <div className="absolute inset-0 z-10 flex items-center">
              <div className="container px-6 md:px-10 lg:px-20 max-w-[1280px] mx-auto w-full relative">
                
                {/* Left side content */}
                <div className="max-w-[600px]">
                  {/* SERVICE NUMBER + CATEGORY ROW */}
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-mono text-[13px] text-white/25">{service.id}</span>
                    <div className="w-px h-3.5 bg-white/15" />
                    <span className="font-mono text-[11px] uppercase tracking-wider" style={{ color: '#7C3AED' }}>
                      {service.category}
                    </span>
                  </div>

                  {/* SERVICE NAME */}
                  <h3 
                    className="font-display font-extrabold text-white leading-[1.05] tracking-[-0.03em] mb-4 transition-transform duration-300 group-hover:translate-x-2"
                    style={{ fontSize: "clamp(24px, 7vw, 52px)" }}
                  >
                    {service.name}
                  </h3>

                  {/* SERVICE DESCRIPTION - Hidden on mobile */}
                  <p className="hidden md:block font-sans text-[15px] text-white/55 leading-[1.7] max-w-[420px] mb-6 opacity-0 translate-y-0 transition-all duration-300 delay-[50ms] group-hover:opacity-100 group-hover:-translate-y-1">
                    {service.description}
                  </p>

                  {/* BOTTOM ROW */}
                  <div className="flex items-center gap-6">
                    {service.popular && (
                      <div 
                        className="font-mono text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border"
                        style={{ 
                          background: `${service.accent}26`, // 15% opacity
                          borderColor: `${service.accent}40`, // 25% opacity
                          color: service.accent 
                        }}
                      >
                        Popular
                      </div>
                    )}
                    
                    <Link 
                      to="/services" 
                      className="hidden md:flex items-center gap-2 font-sans font-semibold text-[14px] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:gap-3"
                    >
                      Learn more
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-all">
                        <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Right side - Ghost number */}
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                  <span className="font-mono font-black text-[180px] text-white/[0.03] leading-none select-none">
                    {service.id}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )) : (
          <div className="py-20 text-center text-white/30 font-mono text-sm">
            No services data found.
          </div>
        )}
      </div>

      {/* FOOTER ROW */}
      <div className="border-t border-white/10 bg-[#060608] py-6">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-sans font-medium text-[14px] text-white/40">
            5 services. Every one delivered end-to-end.
          </p>
          <Link 
            to="/services" 
            className="text-gradient font-bold text-[14px] hover:opacity-80 transition-opacity"
          >
            View full breakdown →
          </Link>
        </div>
      </div>
    </section>
  );
}
