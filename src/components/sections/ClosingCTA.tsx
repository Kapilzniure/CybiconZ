import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import SplitText from "@/components/ui/SplitText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { FloatingGeometry } from "@/components/ui/FloatingGeometry";
import { useScrollVelocity } from "@/hooks/useScrollVelocity";

export default function ClosingCTA() {
  const velocity = useScrollVelocity();
  const floatSpeed = Math.max(3, 6 - velocity * 0.3);

  return (
    <section data-section="cta-section" className="relative overflow-hidden py-[120px] dark-texture" style={{ background: "linear-gradient(135deg, #060608, #0A0520, #060608)", position: "relative", "--float-speed": floatSpeed } as CSSProperties}>
      <div className="absolute inset-0 dark-texture pointer-events-none" />
      {/* Glow Story - Closing CTA */}
      {/* Centered indigo glow — climax */}
      <div aria-hidden style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "800px", height: "800px", borderRadius: "50%", background: "radial-gradient(rgba(79,70,229,0.15), transparent 65%)", pointerEvents: "none", zIndex: 0, filter: "blur(1px)" }} />
      {/* Pink warmth — top-right */}
      <div aria-hidden style={{ position: "absolute", top: "-100px", right: "-100px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(rgba(236,72,153,0.07), transparent 65%)", pointerEvents: "none", zIndex: 0, filter: "blur(1px)" }} />
      
      <FloatingGeometry variant="cube" color="#4F46E5" size={100} opacity={0.12} position={{ top: '20%', right: '8%' }} speed={6} />
      <motion.div 
        className="container relative max-w-2xl text-center z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="label-eyebrow text-violet">Ready to start?</span>
        <h2 className="font-display font-extrabold text-ink mt-5 leading-[0.95]" style={{ fontSize: "clamp(48px, 7vw, 96px)", letterSpacing: "-0.04em" }}>
          <SplitText as="span" className="block">Have a project</SplitText>
          <SplitText as="span" className="block" innerClassName="text-gradient" delay={0.24}>in mind?</SplitText>
        </h2>
        <p className="text-white/75 text-[16px] mt-6 max-w-lg mx-auto leading-relaxed">
          Tell us what you need. We respond within one business day. If we're not the right fit, we'll say so.
        </p>
        <div className="mt-10 flex justify-center">
          <MagneticButton href="/contact" variant="primary">Start a conversation →</MagneticButton>
        </div>
        <div aria-hidden style={{
          position: 'absolute',
          bottom: '25%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 300,
          height: 60,
          background: 'rgba(0,196,255,0.08)',
          filter: 'blur(40px)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }} />
        <div className="mt-6">
          <a href="mailto:hello@cybiconz.com" className="text-ink-muted hover:text-ink text-sm transition">hello@cybiconz.com</a>
        </div>
      </motion.div>
    </section>
  );
}
