import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import SplitText from "@/components/ui/SplitText";
import { FloatingGeometry } from "@/components/ui/FloatingGeometry";
import { useScrollVelocity } from "@/hooks/useScrollVelocity";

const items = [
  {
    badge: "E-Commerce",
    // TODO: Replace with real quote
    quote: "They built a system that just works. Orders come in, payments clear, and we ship. No firefighting, no surprise breakage.",
    name: "LwangBlack Founder", role: "Coffee Brand · LwangBlack",
    avatar: "https://i.pravatar.cc/88?img=12",
  },
  {
    badge: "Website + Marketing",
    // TODO: Replace with real quote
    quote: "Our online presence finally matches the store. Direct communication every step — they actually pick up the phone.",
    name: "Johnnies Owner", role: "Liquor Retail · Johnnies",
    avatar: "https://i.pravatar.cc/88?img=8",
  },
  {
    badge: "Website",
    // TODO: Replace with real quote
    quote: "Working with CybiconZ felt like having a team, not a vendor. They asked the right questions and delivered exactly what we needed.",
    name: "Business Owner", role: "Independent · Local Brand",
    avatar: "https://i.pravatar.cc/88?img=3",
  },
];

const cardGlows = [
  "rgba(79,70,229,0.05)",    // indigo — card 1
  "rgba(6,182,212,0.05)",    // cyan   — card 2
  "rgba(249,115,22,0.05)",   // orange — card 3
];

export default function Testimonials() {
  const velocity = useScrollVelocity();
  const floatSpeed = Math.max(3, 8 - velocity * 0.3);

  return (
    <section data-section="testimonials-section" className="py-[100px] relative overflow-hidden" style={{ background: "#060608", borderTop: "1px solid rgba(255,255,255,0.05)", "--float-speed": floatSpeed } as CSSProperties}>
      {/* Pink glow — top-center */}
      <div aria-hidden style={{ position: "absolute", top: "-100px", left: "50%", transform: "translateX(-50%)", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(rgba(236,72,153,0.08), transparent 65%)", pointerEvents: "none", zIndex: 0 }} />
      <FloatingGeometry variant="ring" color="#EC4899" size={120} opacity={0.10} position={{ bottom: '5%', left: '2%' }} speed={8} />
      <div className="container relative">
        <span className="label-eyebrow text-[#4F46E5]">Testimonials</span>
        <h2 className="section-headline-reveal font-display font-extrabold text-ink mt-3 mb-12" style={{ fontSize: "clamp(36px, 5vw, 64px)", letterSpacing: "-0.03em" }}>What Our Clients Say.</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {items.map((t, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl overflow-hidden flex flex-col transition-all duration-250 ease-in-out hover:-translate-y-[6px] relative"
              style={{ background: "#0F0F1C", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              {/* Per-card ambient glow */}
              <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, height: "120px", background: `radial-gradient(${cardGlows[i]} 0%, transparent 70%)`, pointerEvents: "none", zIndex: 0 }} />
              <div className="p-6 sm:p-8 flex-1 flex flex-col relative z-10">
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-white" style={{ background: "#4F46E5" }}>{t.badge}</span>
                  <span aria-hidden className="font-display font-extrabold leading-none select-none pointer-events-none text-gradient" style={{ fontSize: "60px", opacity: 0.18 }}>"</span>
                </div>
                <p className="italic text-[14px] sm:text-[15px] leading-[1.7] sm:leading-[1.8] mt-2 flex-1" style={{ color: "rgba(255,255,255,0.65)" }}>{t.quote}</p>
                <div className="mt-6 pt-5 flex items-center gap-3" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                  <img src={t.avatar} alt={t.name} loading="lazy" className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover" style={{ border: "2px solid rgba(255,255,255,0.1)" }} />
                  <div>
                    <div className="font-display font-bold text-[13px] sm:text-[14px]" style={{ color: "#F0EEFF" }}>{t.name}</div>
                    <div className="text-[11px] sm:text-[12px]" style={{ color: "rgba(255,255,255,0.35)" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-[14px] text-ink-muted italic">
          Testimonials collected from real clients. Names withheld by client preference.
        </p>
      </div>
    </section>
  );
}
