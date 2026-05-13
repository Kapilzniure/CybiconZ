import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowLineRef = useRef<HTMLDivElement>(null);
  const eyebrowLabelRef = useRef<HTMLSpanElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const closingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Eyebrow: line draws then label fades in
      gsap.set(eyebrowLineRef.current, { width: 0 });
      gsap.set(eyebrowLabelRef.current, { opacity: 0 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          gsap
            .timeline()
            .to(eyebrowLineRef.current, { width: 16, duration: 0.4, ease: "power2.out" })
            .to(eyebrowLabelRef.current, { opacity: 1, duration: 0.3, ease: "power1.out" }, "-=0.1");
        },
      });

      // FAQ items: staggered slide-in from x: -16
      const items = itemRefs.current.filter((el): el is HTMLDivElement => el !== null);
      gsap.set(items, { opacity: 0, x: -16 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          gsap.to(items, {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.06,
            ease: "power2.out",
          });
        },
      });

      // Closing row: fade in with delay after last item
      gsap.set(closingRef.current, { opacity: 0 });

      ScrollTrigger.create({
        trigger: closingRef.current,
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.to(closingRef.current, {
            opacity: 1,
            duration: 0.3,
            delay: 0.3,
            ease: "power1.out",
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-brand-base"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "100px 0" }}
    >
      <div className="container">
        <div style={{ maxWidth: 960, margin: "0 auto" }}>

          {/* Eyebrow label */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              ref={eyebrowLineRef}
              style={{ height: 1, background: "#A78BFA", flexShrink: 0 }}
            />
            <span
              ref={eyebrowLabelRef}
              className="label-eyebrow text-violet"
            >
              FAQ
            </span>
          </div>

          {/* Heading */}
          <h2
            className="section-headline-reveal font-display font-extrabold text-ink"
            style={{ fontSize: "clamp(36px, 5vw, 64px)", letterSpacing: "-0.03em", marginTop: 20 }}
          >
            {heading}
          </h2>

          <p className="text-white/55" style={{ fontSize: 16, marginTop: 12 }}>
            Straight answers. No runaround.
          </p>

          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              color: "rgba(255,255,255,0.2)",
              marginTop: 6,
              letterSpacing: "0.04em",
            }}
          >
            6 questions — most asked by clients before they sign
          </p>

          {/* Accordion */}
          <div style={{ marginTop: 48 }}>
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              const isHovered = hovered === i;

              return (
                <div
                  key={i}
                  ref={(el) => { itemRefs.current[i] = el; }}
                  style={{
                    position: "relative",
                    borderBottom: i < faqs.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                    background: isOpen
                      ? "rgba(167,139,250,0.04)"
                      : isHovered
                      ? "rgba(167,139,250,0.03)"
                      : "transparent",
                    boxShadow: isOpen ? "inset 2px 0 8px rgba(167,139,250,0.15)" : "none",
                    transition: "background 0.25s ease, box-shadow 0.25s ease",
                  }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Open-state left border */}
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: 2,
                      background: "#A78BFA",
                      opacity: isOpen ? 0.8 : 0,
                      transition: "opacity 0.25s ease",
                      pointerEvents: "none",
                    }}
                  />

                  {/* Hover-state left border (scaleY) */}
                  <motion.div
                    animate={{ scaleY: isHovered && !isOpen ? 1 : 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    style={{
                      position: "absolute",
                      left: -1,
                      top: 0,
                      bottom: 0,
                      width: 1,
                      background: "rgba(167,139,250,0.5)",
                      transformOrigin: "top",
                      pointerEvents: "none",
                    }}
                  />

                  {/* Question row */}
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
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
                    <div style={{ display: "flex", alignItems: "center", gap: 16, flex: 1 }}>
                      {/* Index number */}
                      <span
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: 11,
                          color: isOpen || isHovered ? "#A78BFA" : "rgba(255,255,255,0.2)",
                          fontWeight: isOpen ? 700 : 400,
                          width: 32,
                          flexShrink: 0,
                          transition: "color 0.25s ease, font-weight 0.15s ease",
                          display: "block",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      {/* Question text */}
                      <span
                        style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontWeight: 600,
                          fontSize: 17,
                          color: isOpen || isHovered ? "#A78BFA" : "white",
                          transition: "color 0.25s ease",
                        }}
                      >
                        {faq.q}
                      </span>
                    </div>

                    {/* Chevron ↔ minus morph */}
                    <div
                      style={{
                        flexShrink: 0,
                        marginLeft: 24,
                        width: 20,
                        height: 20,
                        position: "relative",
                      }}
                    >
                      <AnimatePresence mode="wait">
                        {isOpen ? (
                          <motion.div
                            key="minus"
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.6 }}
                            transition={{ duration: 0.18, ease: "easeInOut" }}
                            style={{
                              position: "absolute",
                              inset: 0,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <path
                                d="M4 10H16"
                                stroke="#A78BFA"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              />
                            </svg>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="chevron"
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.6 }}
                            transition={{ duration: 0.18, ease: "easeInOut" }}
                            style={{
                              position: "absolute",
                              inset: 0,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
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
                        )}
                      </AnimatePresence>
                    </div>
                  </button>

                  {/* Answer panel: height + clip-path reveal */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <motion.div
                          initial={{ clipPath: "inset(0 0 100% 0)" }}
                          animate={{ clipPath: "inset(0 0 0% 0)" }}
                          exit={{ clipPath: "inset(0 0 100% 0)" }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <p
                            style={{
                              fontFamily: "'Plus Jakarta Sans', sans-serif",
                              fontSize: 15,
                              color: "rgba(255,255,255,0.55)",
                              lineHeight: 1.8,
                              padding: "0 0 24px 48px",
                              maxWidth: 720,
                            }}
                          >
                            {faq.a}
                          </p>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Closing line */}
          <div
            ref={closingRef}
            style={{
              marginTop: 40,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 14,
                color: "rgba(255,255,255,0.4)",
              }}
            >
              Still have a question?
            </span>
            <Link
              to="/contact"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 14,
                fontWeight: 700,
                color: "#A78BFA",
                textDecoration: "none",
              }}
            >
              Ask us directly →
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
