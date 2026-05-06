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
    <section className="grid grid-cols-1 lg:grid-cols-2 relative overflow-hidden" style={{ background: "#060608" }}>
      <div className="relative p-8 sm:p-16 md:p-20 flex flex-col justify-center">
        <div className="absolute -top-20 -left-20 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "rgba(124,58,237,0.08)", filter: "blur(120px)" }} />
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
      <div className="surface-light p-8 sm:p-16 md:p-20">
        <div className="space-y-3.5">
          {features.map((f, i) => (
            <motion.div key={f.t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-xl p-5 shadow-sm transition-all hover:-translate-y-[6px] hover:shadow-md border-l-4"
              style={{ borderLeftColor: "#7C3AED" }}>
              <div className="font-display font-bold text-[15px] sm:text-[16px] text-ink-dark">{f.t}</div>
              <div className="text-[12px] sm:text-[13px] text-ink-muted mt-1">{f.d}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
