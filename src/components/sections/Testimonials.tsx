import { motion } from "framer-motion";

const items = [
  {
    bar: "linear-gradient(90deg, #7C3AED, #EC4899)",
    badge: { text: "E-Commerce", color: "#7C3AED" },
    // TODO: Replace with real quote
    quote: "They built a system that just works. Orders come in, payments clear, and we ship. No firefighting, no surprise breakage.",
    name: "LwangBlack Founder", role: "Coffee Brand · LwangBlack",
    avatar: "https://i.pravatar.cc/88?img=12",
  },
  {
    bar: "linear-gradient(90deg, #06B6D4, #7C3AED)",
    badge: { text: "Website + Marketing", color: "#06B6D4" },
    // TODO: Replace with real quote
    quote: "Our online presence finally matches the store. Direct communication every step — they actually pick up the phone.",
    name: "Johnnies Owner", role: "Liquor Retail · Johnnies",
    avatar: "https://i.pravatar.cc/88?img=8",
  },
  {
    bar: "linear-gradient(90deg, #F59E0B, #10B981)",
    badge: { text: "Website", color: "#F59E0B" },
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
        <span className="label-eyebrow text-violet">Testimonials</span>
        <h2 className="font-display font-extrabold text-ink-dark mt-3 mb-12" style={{ fontSize: "clamp(36px, 5vw, 56px)", letterSpacing: "-0.03em" }}>What Our Clients Say.</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {items.map((t, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.09 }}
              className="bg-white rounded-2xl shadow-card-light overflow-hidden flex flex-col">
              <div className="h-[3px]" style={{ background: t.bar }} />
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-white" style={{ background: t.badge.color }}>{t.badge.text}</span>
                  <span aria-hidden className="font-display font-extrabold leading-none" style={{ fontSize: "80px", background: t.bar, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", opacity: 0.18 }}>"</span>
                </div>
                <p className="italic text-[15px] text-[#444] leading-[1.8] mt-2 flex-1">{t.quote}</p>
                <div className="border-t border-black/[0.07] mt-6 pt-5 flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full border-2 border-white object-cover" />
                  <div>
                    <div className="font-display font-bold text-[14px] text-ink-dark">{t.name}</div>
                    <div className="text-[12px] text-ink-muted">{t.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
