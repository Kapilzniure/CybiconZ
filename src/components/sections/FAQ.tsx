import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SplitText from "@/components/ui/SplitText";

const faqs = [
  {
    q: "Do you work with clients who already have a website?",
    a: "Yes. Most of our clients come to us with an existing site that isn't working — whether it's outdated, slow, or just not converting. We audit what's there, tell you honestly what's worth keeping, and rebuild from there. No pressure to start from scratch if you don't need to.",
  },
  {
    q: "What do you need from me to get started?",
    a: "Just a clear idea of what you're trying to achieve — not a technical brief. Tell us what your business does, who your customers are, and what problem you're trying to solve. We handle the rest. We'll ask the right questions during discovery.",
  },
  {
    q: "How do you price your work?",
    a: "Every project is scoped individually because every project is different. After your initial brief, we'll tell you honestly whether it's a $2,000 job or a $15,000 job — and why. We don't have packages because packages exist for agencies, not for clients.",
  },
  {
    q: "Do you offer support after launch?",
    a: "Yes. Every project includes a handoff period where we make sure you understand what was built and how to manage it. For ongoing support, maintenance, or future work, we offer flexible arrangements — no lock-in contracts.",
  },
  {
    q: "How long does a project take?",
    a: "A focused website: 3–5 weeks. An e-commerce system: 6–10 weeks. A web application: 8–14 weeks. These are real timelines, not sales timelines. If something will take longer, we tell you before we start.",
  },
  {
    q: "What makes CybiconZ different from other agencies?",
    a: "You work directly with the person making decisions — not an account manager who relays messages. Every project gets documented and handed over properly. And if something isn't right for your goals, we'll tell you before you pay for it.",
  },
];

export default function FAQ({ heading = "Questions We Get Asked" }: { heading?: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      className="bg-brand-base"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "100px 0" }}
    >
      <motion.div 
        className="container"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          {/* Label */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 16, height: 1, background: "hsl(var(--accent-from))" }} />
            <span className="label-eyebrow text-violet">FAQ</span>
          </div>

          {/* Heading */}
          <SplitText
            as="h2"
            className="font-display font-extrabold text-ink"
            style={{ fontSize: "clamp(36px, 5vw, 64px)", letterSpacing: "-0.03em", marginTop: 20 }}
          >
            {heading}
          </SplitText>
<p className="text-white/55" style={{ fontSize: 16, marginTop: 12 }}>
            Straight answers. No runaround.
          </p>

          {/* Accordion */}
          <div style={{ marginTop: 48 }}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                style={{
                  borderBottom: i < faqs.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}
              >
                {/* Question row */}
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "24px 0",
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                    outline: "none",
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 600,
                      fontSize: 17,
                      color: open === i || hovered === i ? "#A78BFA" : "white",
                      transition: "color 0.2s ease",
                    }}
                  >
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: open === i ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    style={{ flexShrink: 0, marginLeft: 24 }}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M5 7.5L10 12.5L15 7.5"
                        stroke="rgba(255,255,255,0.4)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                </button>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <p
                        style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontSize: 15,
                          color: "rgba(255,255,255,0.55)",
                          lineHeight: 1.75,
                          padding: "0 0 24px 0",
                          maxWidth: 720,
                        }}
                      >
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
