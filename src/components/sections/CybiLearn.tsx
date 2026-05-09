import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SplitText from "@/components/ui/SplitText";

const features = [
  { t: "Working with agencies", d: "Understand what you're paying for." },
  { t: "Your website explained", d: "Know what's actually running it." },
  { t: "E-Commerce basics", d: "Before you hire someone to build it." },
  { t: "Digital marketing 101", d: "What actually moves metrics." },
];

export default function CybiLearn() {
  return (
    <section data-section="cybilearn-section" className="grid grid-cols-1 lg:grid-cols-2 relative overflow-hidden" style={{ background: "#060608", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      {/* Glow Story - CybiLearn */}
      {/* Emerald glow — bottom-left */}
      <div aria-hidden style={{ position: "absolute", bottom: "-150px", left: "-150px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(rgba(16,185,129,0.12), transparent 65%)", pointerEvents: "none", zIndex: 0, filter: "blur(1px)" }} />
      {/* Cyan glow — top-right */}
      <div aria-hidden style={{ position: "absolute", top: "-100px", right: "-100px", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(rgba(6,182,212,0.06), transparent 65%)", pointerEvents: "none", zIndex: 0, filter: "blur(1px)" }} />
      
      <div className="relative p-8 sm:p-16 md:p-20 flex flex-col justify-center z-10">
        <div className="relative">
          <span className="inline-block label-eyebrow text-violet px-3 py-1 rounded-full bg-violet/10 border border-violet/20 text-[10px] sm:text-xs">Also from CybiconZ</span>
          <h2 className="section-headline-reveal font-display font-extrabold text-ink mt-5 leading-[0.95]" style={{ fontSize: "clamp(32px, 5vw, 56px)", letterSpacing: "-0.03em" }}>
            Introducing CybiLearn
          </h2>
          <SplitText
            as="h3"
            className="font-display font-extrabold mt-1 leading-[0.95]"
            style={{ fontSize: "clamp(24px, 4vw, 44px)", letterSpacing: "-0.03em" }}
            innerClassName="text-gradient"
            delay={0.18}
          >
            Practical help for when you get stuck.
          </SplitText>
          <p className="text-ink-muted text-[14px] sm:text-[15px] mt-6 max-w-md leading-relaxed">
            Not theory. Not a course platform. Real guidance for business owners navigating the digital world — from the people who build the products.
          </p>
          <Link to="/cybilearn" className="inline-flex items-center gap-2 mt-8 px-6 py-4 rounded-xl text-violet font-bold text-sm border border-violet/40 bg-violet/[0.06] hover:bg-violet/[0.12] transition">
            Explore CybiLearn →
          </Link>
        </div>
      </div>
      <div className="p-8 sm:p-16 md:p-20" style={{ background: "#0A0A12" }}>
        <div className="space-y-3.5">
          {features.map((f, i) => (
            <motion.div key={f.t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-xl p-5 transition-all hover:translate-x-[6px] border-l-4"
              style={{
                background: "#0F0F1C",
                border: "1px solid rgba(255,255,255,0.07)",
                borderLeft: "4px solid #4F46E5",
              }}>
              <div className="font-display font-bold text-[15px] sm:text-[16px]" style={{ color: "#F0EEFF" }}>{f.t}</div>
              <div className="text-[12px] sm:text-[13px] mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>{f.d}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
