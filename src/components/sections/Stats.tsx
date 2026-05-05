import { motion } from "framer-motion";

const stats = [
  { n: "2+", l: "Live Projects", s: "Real clients, real outcomes", g: "linear-gradient(135deg, #EC4899, #F472B6)", c: "#EC4899" },
  { n: "100%", l: "Delivery Rate", s: "No abandoned projects ever", g: "linear-gradient(135deg, #F59E0B, #FBBF24)", c: "#F59E0B" },
  { n: "1 day", l: "Response Time", s: "Guaranteed, always", g: "linear-gradient(135deg, #06B6D4, #22D3EE)", c: "#06B6D4" },
  { n: "2025", l: "Founded", s: "Building since", g: "linear-gradient(135deg, #10B981, #34D399)", c: "#10B981" },
];

export default function Stats() {
  return (
    <section className="py-[100px] relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0E0830 0%, #07080E 40%, #070E0A 100%)" }}>
      <div className="absolute inset-0 grid-overlay opacity-50" />
      <div className="absolute inset-0 dark-texture pointer-events-none" />
      <div className="container relative">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div key={s.l}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={`px-6 py-8 ${i > 0 ? "md:border-l border-white/[0.06]" : ""}`}>
              <div className="h-1 w-12 rounded-full mb-6 animate-pulse-dot" style={{ background: s.c }} />
              <div className="font-display font-extrabold text-[64px] md:text-[72px] leading-none" style={{ background: s.g, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{s.n}</div>
              <div className="text-white/60 text-[15px] font-semibold mt-3">{s.l}</div>
              <div className="font-mono text-[11px] text-white/20 mt-1 uppercase tracking-wider">{s.s}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
