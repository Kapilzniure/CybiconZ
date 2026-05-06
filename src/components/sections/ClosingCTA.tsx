import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SplitText from "@/components/ui/SplitText";

export default function ClosingCTA() {
  return (
    <section className="relative overflow-hidden py-[120px]" style={{ background: "linear-gradient(135deg, #060608, #0A0520, #060608)" }}>
      <div className="absolute inset-0 dark-texture pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "rgba(124,58,237,0.18)", filter: "blur(140px)" }} />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "rgba(124,58,237,0.08)", filter: "blur(140px)" }} />
      {/* Centered glow */}
      <div aria-hidden style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "800px", height: "800px", borderRadius: "50%", background: "radial-gradient(rgba(124,58,237,0.12), transparent 65%)", pointerEvents: "none" }} />
      <motion.div 
        className="container relative max-w-2xl text-center"
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
        <Link to="/contact" className="inline-flex bg-accent-gradient text-white font-bold text-[15px] px-10 py-4 rounded-xl shadow-glow-purple mt-10 hover:opacity-95 transition">
          Start a conversation →
        </Link>
        <div className="mt-6">
          <a href="mailto:hello@cybiconz.com" className="text-ink-muted hover:text-ink text-sm transition">hello@cybiconz.com</a>
        </div>
      </motion.div>
    </section>
  );
}
