import SiteShell from "@/components/site/SiteShell";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SplitText from "@/components/ui/SplitText";
import { usePageMeta } from "@/hooks/usePageMeta";

type Step = 1 | 2 | 3 | "sent";

const SERVICES = [
  { label: "A website",         emoji: "🌐", color: "#00C4FF" },
  { label: "An online store",   emoji: "🛒", color: "#39FF14" },
  { label: "A web application", emoji: "⚙️", color: "#4F46E5" },
  { label: "Something else",    emoji: "💬", color: "#F59E0B" },
];

const BUDGETS = ["Under $5k", "$5–15k", "$15–50k", "$50k+"];

const TIMELINE = [
  {
    title: "Within 24 hours",
    desc: "You'll get a real reply from the founder. Not a bot, not a template.",
    color: "#00C4FF",
  },
  {
    title: "Discovery call",
    desc: "30 minutes. We ask about your goals. You ask whatever you want.",
    color: "#4F46E5",
  },
  {
    title: "Scope + price",
    desc: "We send a clear proposal. Fixed price. No hidden fees.",
    color: "#39FF14",
  },
  {
    title: "Decision",
    desc: "You decide. No pressure, no follow-up spam.",
    color: "#F59E0B",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const STEP_VARIANTS = {
  enter:  { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0,   transition: { duration: 0.35, ease: EASE } },
  exit:   { opacity: 0, x: -40, transition: { duration: 0.25, ease: EASE } },
};

const BACK_VARIANTS = {
  enter:  { opacity: 0, x: -40 },
  center: { opacity: 1, x: 0,  transition: { duration: 0.35, ease: EASE } },
  exit:   { opacity: 0, x: 40, transition: { duration: 0.25, ease: EASE } },
};

const INPUT_CLS =
  "w-full min-h-[48px] bg-brand-base border border-white/10 rounded-xl px-4 py-3 text-sm text-ink placeholder:text-ink-muted/60 focus:outline-none focus:border-violet transition-colors";

function toRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

export default function Contact() {
  usePageMeta({
    title: "Contact — Start a Conversation",
    description:
      "Tell us about your project. We'll tell you honestly if we're the right fit. Based in Tokyo, working with clients globally.",
  });

  const [step, setStep]       = useState<Step>(1);
  const [direction, setDir]   = useState<1 | -1>(1);
  const [service, setService] = useState("");
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [brief, setBrief]     = useState("");
  const [budget, setBudget]   = useState("");

  function advance(to: Step) {
    setDir(1);
    setStep(to);
  }

  function back(to: Step) {
    setDir(-1);
    setStep(to);
  }

  function selectService(svc: string) {
    setService(svc);
    setTimeout(() => advance(2), 400);
  }

  const variants = direction === 1 ? STEP_VARIANTS : BACK_VARIANTS;
  const dotStep  = step === "sent" ? 3 : (step as number);

  return (
    <SiteShell>
      {/* HERO */}
      <section className="relative bg-[#060608] pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-overlay pointer-events-none" />
        <div
          className="absolute -top-32 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "rgba(79,70,229,0.12)", filter: "blur(120px)" }}
        />
        <div className="container relative">
          <motion.span
            className="label-eyebrow text-violet"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            Contact
          </motion.span>
          <h1
            className="section-headline-reveal font-display font-extrabold text-ink mt-5 leading-[0.95] max-w-4xl"
            style={{ fontSize: "clamp(48px, 8vw, 88px)", letterSpacing: "-0.04em" }}
          >
            <SplitText as="span" className="block">Tell us about</SplitText>
            <SplitText as="span" className="block text-gradient" delay={0.2}>your project.</SplitText>
          </h1>
          <motion.p
            className="text-white/75 text-lg mt-6 max-w-xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            We respond within one business day. If we're not the right fit, we'll say so and point you somewhere good.
          </motion.p>
        </div>
      </section>

      <section
        className="relative py-16 sm:py-20 lg:py-[80px] overflow-hidden"
        style={{ background: "#060608", borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div
          aria-hidden
          className="absolute rounded-full pointer-events-none"
          style={{
            width: "500px", height: "500px",
            background: "radial-gradient(rgba(79,70,229,0.08), transparent 70%)",
            top: "5%", left: "-10%", filter: "blur(80px)",
          }}
        />

        <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-start">

          {/* LEFT — multi-step form */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="animate-gpu"
          >
            <div
              className="relative overflow-hidden rounded-3xl shadow-2xl"
              style={{ background: "#0F0F1C", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              {/* Top accent line */}
              <div
                aria-hidden
                className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none"
                style={{ background: "linear-gradient(to right, transparent, rgba(79,70,229,0.5), transparent)" }}
              />

              <div className="p-6 sm:p-8 lg:p-10">
                {/* Header */}
                <div className="mb-6">
                  <h2 className="font-display font-extrabold text-xl text-ink">Start a Project</h2>
                  <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {step === 1    && "What do you need?"}
                    {step === 2    && "A few details. That's all."}
                    {step === 3    && "Here's what we'll send."}
                    {step === "sent" && "Message received."}
                  </p>
                </div>

                {/* Progress dots */}
                {step !== "sent" && (
                  <div className="flex items-center gap-2 mb-8">
                    {[1, 2, 3].map((n) => (
                      <div
                        key={n}
                        className="rounded-full transition-all duration-300"
                        style={{
                          width:      dotStep >= n ? "20px" : "8px",
                          height:     "8px",
                          background: dotStep >= n ? "#4F46E5" : "rgba(255,255,255,0.12)",
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Steps */}
                <AnimatePresence mode="wait" initial={false}>

                  {step === 1 && (
                    <motion.div
                      key="step1"
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                    >
                      <div className="grid grid-cols-2 gap-3">
                        {SERVICES.map((svc) => {
                          const selected = service === svc.label;
                          return (
                            <button
                              key={svc.label}
                              type="button"
                              onClick={() => selectService(svc.label)}
                              className="relative text-left rounded-xl p-4 transition-all duration-200 animate-gpu"
                              style={{
                                minHeight: "88px",
                                border:     selected ? `2px solid ${svc.color}` : "1px solid rgba(255,255,255,0.08)",
                                background: selected ? `rgba(${toRgb(svc.color)}, 0.05)` : "rgba(255,255,255,0.02)",
                              }}
                            >
                              <span className="text-2xl leading-none">{svc.emoji}</span>
                              <span
                                className="block font-display font-bold text-[14px] mt-2 leading-tight"
                                style={{ color: selected ? svc.color : "rgba(255,255,255,0.75)" }}
                              >
                                {svc.label}
                              </span>
                              {selected && (
                                <span
                                  className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                                  style={{ background: svc.color, color: "#000" }}
                                >
                                  ✓
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                      <p
                        className="text-center text-[12px] mt-5"
                        style={{ color: "rgba(255,255,255,0.2)" }}
                      >
                        Select one to continue
                      </p>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                    >
                      <form
                        className="flex flex-col gap-4"
                        onSubmit={(e) => { e.preventDefault(); advance(3); }}
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block label-eyebrow text-ink-muted mb-2">Name</label>
                            <input
                              type="text"
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className={INPUT_CLS}
                            />
                          </div>
                          <div>
                            <label className="block label-eyebrow text-ink-muted mb-2">Email</label>
                            <input
                              type="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className={INPUT_CLS}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block label-eyebrow text-ink-muted mb-2">
                            Describe what you need
                          </label>
                          <textarea
                            rows={3}
                            required
                            value={brief}
                            onChange={(e) => setBrief(e.target.value)}
                            placeholder="A few sentences is enough. What are you building, and why now?"
                            className={`${INPUT_CLS} resize-none`}
                            style={{ minHeight: "unset" }}
                          />
                        </div>

                        <div>
                          <label className="block label-eyebrow text-ink-muted mb-3">
                            Budget range
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {BUDGETS.map((b) => {
                              const sel = budget === b;
                              return (
                                <button
                                  key={b}
                                  type="button"
                                  onClick={() => setBudget(b)}
                                  className="px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-200"
                                  style={{
                                    border:     sel ? "1px solid #4F46E5" : "1px solid rgba(255,255,255,0.1)",
                                    background: sel ? "rgba(79,70,229,0.12)" : "rgba(255,255,255,0.02)",
                                    color:      sel ? "#818CF8" : "rgba(255,255,255,0.5)",
                                  }}
                                >
                                  {b}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="mt-2 bg-accent-gradient text-white font-bold text-[15px] px-6 py-4 rounded-xl hover:brightness-110 transition-all active:scale-[0.98]"
                        >
                          Next →
                        </button>
                      </form>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                    >
                      <div
                        className="rounded-2xl p-5 mb-6"
                        style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}
                      >
                        <p
                          className="font-mono text-[10px] uppercase tracking-wider mb-4"
                          style={{ color: "rgba(255,255,255,0.28)" }}
                        >
                          Here's what we'll send:
                        </p>
                        <div className="flex flex-col gap-3">
                          {[
                            { label: "Service", value: service },
                            { label: "Name",    value: name },
                            { label: "Email",   value: email },
                            { label: "Brief",   value: brief.length > 120 ? brief.slice(0, 120) + "…" : brief },
                            ...(budget ? [{ label: "Budget", value: budget }] : []),
                          ].map(({ label, value }) => (
                            <div key={label} className="flex gap-3 text-[13px]">
                              <span
                                className="font-mono shrink-0"
                                style={{ width: "52px", color: "rgba(255,255,255,0.28)" }}
                              >
                                {label}
                              </span>
                              <span className="font-sans" style={{ color: "rgba(255,255,255,0.75)" }}>
                                {value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => advance("sent")}
                          className="flex-1 bg-accent-gradient text-white font-bold text-[15px] px-6 py-4 rounded-xl hover:brightness-110 transition-all active:scale-[0.98]"
                        >
                          Confirm &amp; Send →
                        </button>
                        <button
                          type="button"
                          onClick={() => back(2)}
                          className="font-sans text-[13px] transition-colors hover:text-white/60"
                          style={{ color: "rgba(255,255,255,0.35)" }}
                        >
                          ← Edit
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === "sent" && (
                    <motion.div
                      key="sent"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="rounded-2xl border border-violet/30 bg-violet/5 p-8 text-center"
                    >
                      <div className="text-violet text-3xl">✓</div>
                      <h3 className="font-display font-bold text-ink mt-3">Brief received</h3>
                      <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>
                        We'll be in touch within one business day.
                      </p>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </div>

            {/* Quick contact */}
            <p className="mt-4 text-center text-[12px]" style={{ color: "rgba(255,255,255,0.22)" }}>
              Just want to ask something?{" "}
              <a
                href="mailto:hello@cybiconz.com"
                className="transition-colors hover:text-white/50 underline underline-offset-2"
                style={{ color: "rgba(255,255,255,0.32)" }}
              >
                hello@cybiconz.com
              </a>
            </p>
          </motion.div>

          {/* RIGHT — what happens next */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            className="lg:pt-2 animate-gpu"
          >
            <h3
              className="font-display font-bold text-ink mb-8"
              style={{ fontSize: "18px" }}
            >
              What happens after you hit send
            </h3>

            <div className="relative">
              {TIMELINE.map((item, i) => (
                <div key={i} className="flex gap-5 relative">
                  {/* Connector line */}
                  {i < TIMELINE.length - 1 && (
                    <div
                      aria-hidden
                      className="absolute"
                      style={{
                        left:       "11px",
                        top:        "32px",
                        width:      "1px",
                        height:     "calc(100% - 4px)",
                        background: "rgba(255,255,255,0.07)",
                      }}
                    />
                  )}
                  {/* Number circle */}
                  <div
                    className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] font-bold mt-0.5 relative z-10"
                    style={{
                      border:     `1px solid ${item.color}`,
                      color:      item.color,
                      background: "#060608",
                    }}
                  >
                    {i + 1}
                  </div>

                  <div className="pb-8">
                    <p className="font-display font-bold text-[15px] text-white leading-snug">
                      {item.title}
                    </p>
                    <p
                      className="font-sans text-[13px] mt-1.5 leading-[1.65]"
                      style={{ color: "rgba(255,255,255,0.45)" }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="font-mono text-[11px] mt-2" style={{ color: "rgba(255,255,255,0.22)" }}>
              Average response time: under 4 hours during business hours (JST)
            </p>

            {/* Trust signals */}
            <div className="flex flex-wrap gap-2 mt-8">
              {["100% private", "No spam", "1 day reply", "Data stays private"].map((t) => (
                <span
                  key={t}
                  className="text-[11px] px-3 py-1.5 rounded-full"
                  style={{
                    color: "rgba(255,255,255,0.35)",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </SiteShell>
  );
}
