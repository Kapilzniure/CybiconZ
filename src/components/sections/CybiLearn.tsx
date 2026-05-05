import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const features = [
  { c: "#10B981", t: "Working with agencies", d: "Understand what you're paying for." },
  { c: "#06B6D4", t: "Your website explained", d: "Know what's actually running it." },
  { c: "#7C3AED", t: "E-Commerce basics", d: "Before you hire someone to build it." },
  { c: "#F59E0B", t: "Digital marketing 101", d: "What actually moves metrics." },
];

export default function CybiLearn() {
  return (
    <section className="grid md:grid-cols-2 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #07080E 0%, #060E07 100%)" }}>
      <div className="relative p-16 md:p-20 flex flex-col justify-center">
        <div className="absolute -top-20 -left-20 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "rgba(16,185,129,0.1)", filter: "blur(120px)" }} />
        <div className="relative">
          <span className="inline-block label-eyebrow text-emerald px-3 py-1 rounded-full bg-emerald/10 border border-emerald/20">Also from CybiconZ</span>
          <h2 className="font-display font-extrabold text-ink mt-5 leading-[0.95]" style={{ fontSize: "clamp(36px, 5vw, 56px)", letterSpacing: "-0.03em" }}>
            Introducing CybiLearn
          </h2>
          <h3 className="font-display font-extrabold mt-1 leading-[0.95]" style={{ fontSize: "clamp(28px, 4vw, 44px)", letterSpacing: "-0.03em", background: "linear-gradient(135deg, #10B981, #34D399)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
            Practical help for when you get stuck.
          </h3>
          <p className="text-ink-muted text-[15px] mt-6 max-w-md leading-relaxed">
            Not theory. Not a course platform. Real guidance for business owners navigating the digital world — from the people who build the products.
          </p>
          <Link to="/cybilearn" className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl text-emerald font-semibold text-sm border border-emerald/40 bg-emerald/[0.06] hover:bg-emerald/[0.12] transition">
            Explore CybiLearn →
          </Link>
        </div>
      </div>
      <div className="surface-light p-16 md:p-20">
        <div className="space-y-3.5">
          {features.map((f, i) => (
            <motion.div key={f.t}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-white rounded-xl p-5 shadow-sm transition-all hover:translate-x-1.5 hover:shadow-md"
              style={{ borderLeft: `4px solid ${f.c}` }}>
              <div className="font-display font-bold text-[16px] text-ink-dark">{f.t}</div>
              <div className="text-[13px] text-ink-muted mt-1">{f.d}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
