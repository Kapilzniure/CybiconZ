import { motion } from "framer-motion";

const stats = [
  { n: "2+",    l: "Live Projects",  s: "Real clients, real outcomes" },
  { n: "100%",  l: "Delivery Rate",  s: "No abandoned projects ever"  },
  { n: "1 day", l: "Response Time",  s: "Guaranteed, always"          },
  { n: "2025",  l: "Founded",        s: "Building since"              },
];

export default function Stats() {
  return (
    <section className="py-[100px] relative overflow-hidden" style={{ background: "#060608" }}>
      <div className="absolute inset-0 grid-overlay opacity-40" />
      <div className="absolute inset-0 dark-texture pointer-events-none" />
      <div className="container relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 border-l lg:border-l-0 border-white/[0.06]">
          {stats.map((s, i) => (
            <motion.div key={s.l}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`px-6 py-10 border-r border-b lg:border-b-0 border-white/[0.06] ${i >= 2 ? "border-b-0" : "lg:border-b-0"}`}>
              <div className="h-1 w-10 rounded-full mb-6" style={{ background: "#7C3AED" }} />
              <div className="font-display font-extrabold text-[48px] sm:text-[64px] lg:text-[72px] leading-none text-white">{s.n}</div>
              <div className="text-white/60 text-[14px] sm:text-[15px] font-semibold mt-3">{s.l}</div>
              <div className="font-mono text-[10px] sm:text-[11px] text-white/20 mt-1 uppercase tracking-wider">{s.s}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
