import { motion } from "framer-motion";
import SplitText from "@/components/ui/SplitText";

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

export default function Testimonials() {
  return (
    <section className="surface-light py-[100px]">
      <div className="container">
        <span className="label-eyebrow text-[#7C3AED]">Testimonials</span>
        <h2 className="section-headline-reveal font-display font-extrabold text-ink-dark mt-3 mb-12" style={{ fontSize: "clamp(36px, 5vw, 64px)", letterSpacing: "-0.03em" }}>What Our Clients Say.</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {items.map((t, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-2xl shadow-card-light overflow-hidden flex flex-col transition-all duration-250 ease-in-out hover:-translate-y-[6px] hover:shadow-xl"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }} // Subtle white line
            >
              <div className="h-[1px] w-full" style={{ background: "rgba(255,255,255,0.05)" }} /> {/* Thin white line */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col">
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-white" style={{ background: "#7C3AED" }}>{t.badge}</span>
                  <span aria-hidden className="font-display font-extrabold leading-none select-none pointer-events-none text-gradient" style={{ fontSize: "60px", opacity: 0.18 }}>"</span>
                </div>
                <p className="italic text-[14px] sm:text-[15px] text-[#444] leading-[1.7] sm:leading-[1.8] mt-2 flex-1">{t.quote}</p>
                <div className="border-t border-black/[0.07] mt-6 pt-5 flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-white object-cover" />
                  <div>
                    <div className="font-display font-bold text-[13px] sm:text-[14px] text-ink-dark">{t.name}</div>
                    <div className="text-[11px] sm:text-[12px] text-ink-muted">{t.role}</div>
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
