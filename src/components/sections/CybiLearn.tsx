import { motion } from "framer-motion";
import SplitText from "@/components/ui/SplitText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  { t: "Working with agencies", d: "Understand what you're paying for.", color: "#10B981" },
  { t: "Your website explained", d: "Know what's actually running it.", color: "#00C4FF" },
  { t: "E-Commerce basics", d: "Before you hire someone to build it.", color: "#A78BFA" },
  { t: "Digital marketing 101", d: "What actually moves metrics.", color: "#F59E0B" },
];

export default function CybiLearn() {
  const sectionRef = useRef<HTMLElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!scanLineRef.current || !sectionRef.current) return;

    gsap.fromTo(scanLineRef.current, 
      { scaleX: 0 },
      { 
        scaleX: 1, 
        duration: 0.8, 
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef}
      data-section="cybilearn-section" 
      className="scene-transition grid grid-cols-1 lg:grid-cols-2 relative overflow-hidden" 
      style={{ background: "#060608" }}
    >
      {/* Scan Line (GSAP) */}
      <div 
        ref={scanLineRef}
        className="absolute top-0 left-0 w-full h-[1px] bg-[#10B981] opacity-40 z-50 origin-left"
        style={{ transform: "scaleX(0)" }}
      />

      {/* Vertical Divider (Desktop Only) */}
      <div 
        className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[60%] z-20 pointer-events-none"
        style={{ 
          background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.06), transparent)" 
        }}
      />

      {/* LEFT PANEL */}
      <div className="dark-texture relative p-8 sm:p-16 md:p-20 flex flex-col justify-center z-10 border-r border-white/5 lg:border-r-0">
        {/* Cyan glow — top-right */}
        <div aria-hidden style={{ position: "absolute", top: "-100px", right: "-100px", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(rgba(6,182,212,0.06), transparent 65%)", pointerEvents: "none", zIndex: 0, filter: "blur(1px)" }} />
        
        <div className="relative">
          {/* Badge with clip-path reveal */}
          <motion.div
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block"
          >
            <span className="label-eyebrow text-violet px-3 py-1 rounded-full bg-violet/10 border border-violet/20 text-[10px] sm:text-xs">
              Also from CybiconZ
            </span>
          </motion.div>

          <h2 className="section-headline-reveal font-display font-extrabold text-white mt-5 leading-[0.95]" style={{ fontSize: "clamp(32px, 5vw, 56px)", letterSpacing: "-0.03em" }}>
            Introducing CybiLearn
          </h2>
          <SplitText
            as="h3"
            className="font-display font-extrabold mt-1 leading-[0.95]"
            style={{ fontSize: "clamp(24px, 4vw, 44px)", letterSpacing: "-0.03em" }}
            innerClassName="text-gradient"
            delay={0.08}
          >
            Practical help for when you get stuck.
          </SplitText>
          
          <p className="text-white/60 text-[14px] sm:text-[15px] mt-6 max-w-md leading-relaxed">
            Not theory. Not a course platform. Real guidance for business owners navigating the digital world — from the people who build the products.
          </p>

          {/* Proof Stats */}
          <div className="flex items-center gap-2 mt-8 mb-8 font-mono text-[10px] text-white/25 uppercase tracking-widest">
            <span>Free to access</span>
            <span className="text-white/10">·</span>
            <span>No account needed</span>
            <span className="text-white/10">·</span>
            <span>Plain language</span>
          </div>

          <div className="flex items-center">
            <MagneticButton 
              href="/cybilearn" 
              variant="secondary" 
              className="btn-animated-border !px-10"
            >
              Explore CybiLearn →
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="relative p-8 sm:p-16 md:p-20 flex flex-col justify-center" style={{ background: "#0A0A12" }}>
        {/* Emerald breathing glow — bottom-left */}
        <motion.div 
          aria-hidden 
          animate={{ opacity: [0.08, 0.16, 0.08] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ 
            position: "absolute", 
            bottom: "-150px", 
            left: "-150px", 
            width: "400px", 
            height: "400px", 
            borderRadius: "50%", 
            background: "radial-gradient(rgba(16,185,129,0.12), transparent 65%)", 
            pointerEvents: "none", 
            zIndex: 0, 
            filter: "blur(40px)" 
          }} 
        />
        
        <div className="space-y-4 relative z-10">
          {features.map((f, i) => (
            <motion.div key={f.t}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-xl p-5 transition-all duration-300 overflow-hidden"
              style={{
                background: "#0F0F1C",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Border Reveal Accent */}
              <motion.div 
                className="absolute left-0 top-0 w-[4px] h-full origin-top"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                style={{ backgroundColor: f.color }}
              />

              <div className="relative z-10">
                <div 
                  className="font-display font-bold text-[15px] sm:text-[16px] transition-colors group-hover:text-white" 
                  style={{ color: "#F0EEFF" }}
                >
                  {f.t}
                </div>
                <div className="text-[12px] sm:text-[13px] mt-1 text-white/40 transition-colors group-hover:text-white/60">
                  {f.d}
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ 
                  background: `linear-gradient(90deg, ${f.color}10 0%, transparent 100%)` 
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        [data-section="cybilearn-section"] .group:hover {
          background: rgba(255, 255, 255, 0.02) !important;
          border-color: rgba(255, 255, 255, 0.15) !important;
        }
      `}} />
    </section>
  );
}
