import { motion } from "framer-motion";
import { services } from "@/data/services";
import { Link } from "react-router-dom";

export default function Services() {
  const items = services.slice(0, 4);
  return (
    <section className="surface-light relative py-[100px] overflow-hidden">
      <div aria-hidden className="absolute right-0 top-20 font-display font-extrabold pointer-events-none select-none" style={{ fontSize: "clamp(120px, 18vw, 260px)", color: "rgba(0,0,0,0.025)", letterSpacing: "-0.05em" }}>SERVICES</div>
      <div className="container relative">
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-4 h-px bg-violet" />
              <span className="label-eyebrow text-violet">What we build</span>
            </div>
            <h2 className="font-display font-extrabold text-ink-dark leading-[0.95]" style={{ fontSize: "clamp(36px, 5vw, 64px)", letterSpacing: "-0.03em" }}>
              We Build Digital Products That Actually Work
            </h2>
          </div>
          <div className="md:pt-16">
            <p className="text-[15px] text-ink-muted max-w-sm leading-relaxed">
              Real engagements with real businesses. We pick projects we can deliver with care, and we stay accountable from kickoff to handoff.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((s, i) => (
            <motion.div key={s.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              className="group [perspective:900px]"
            >
              <Link to="/services" className="block bg-white rounded-2xl overflow-hidden shadow-poster transition-all duration-[450ms] [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] [transform:perspective(900px)_rotateY(-15deg)_rotateX(6deg)] group-hover:[transform:perspective(900px)_rotateY(0deg)_rotateX(0deg)_translateY(-8px)] group-hover:shadow-poster-hover">
                <div className="relative aspect-[3/2] overflow-hidden">
                  <img src={s.image} alt={s.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" loading="lazy" />
                  <span className="absolute top-3 left-3 bg-black/45 backdrop-blur text-white text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">{s.category}</span>
                  {s.popular && <span className="absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: "#F59E0B", color: "#0A0B14" }}>Popular</span>}
                </div>
                <div className="h-1" style={{ background: s.gradient }} />
                <div className="p-5">
                  <div className="font-mono text-[10px] uppercase tracking-wider mb-2" style={{ color: s.accent }}>{s.category}</div>
                  <h3 className="font-display font-bold text-[18px] text-ink-dark">{s.name}</h3>
                  <p className="text-[13px] text-ink-muted mt-2 leading-[1.65]">{s.description}</p>
                  <div className="mt-4 inline-flex items-center gap-1 text-[12px] font-bold transition-all" style={{ color: s.accent }}>
                    Get Started
                    <span className="transition-all group-hover:ml-1">→</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
