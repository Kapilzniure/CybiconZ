import SiteShell from "@/components/site/SiteShell";
import { useState } from "react";
import { motion } from "framer-motion";
import SplitText from "@/components/ui/SplitText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { usePageMeta } from "@/hooks/usePageMeta";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function Contact() {
  usePageMeta({
    title: "Contact — Start a Conversation",
    description: "Tell us about your project. We'll tell you honestly if we're the right fit. Based in Tokyo, working with clients globally.",
  });
  const [sent, setSent] = useState(false);
  
  const contactCards = [
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 7l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="2"/></svg>,
      title: "Send a brief",
      link: "hello@cybiconz.com",
      href: "mailto:hello@cybiconz.com",
      sub: "Reply within 1 business day"
    },
    {
      status: true,
      title: "Available for new projects",
      sub: "Taking on new clients"
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="6" rx="1" stroke="currentColor" strokeWidth="2"/><rect x="3" y="14" width="18" height="6" rx="1" stroke="currentColor" strokeWidth="2"/><circle cx="7" cy="7" r="0.5" fill="currentColor"/><circle cx="7" cy="17" r="0.5" fill="currentColor"/></svg>,
      title: "Infrastructure partner",
      link: "ZenHost",
      sub: "Vetted hosting for all projects"
    }
  ];

  return (
    <SiteShell>
      {/* HERO */}
      <section className="relative bg-[#060608] pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-overlay pointer-events-none" />
        <div className="absolute -top-32 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "rgba(124,58,237,0.12)", filter: "blur(120px)" }} />
        
        <div className="container relative">
          <motion.span className="label-eyebrow text-violet" {...fadeUp(0)}>Contact</motion.span>
          <h1 className="section-headline-reveal font-display font-extrabold text-ink mt-5 leading-[0.95] max-w-4xl" style={{ fontSize: "clamp(48px, 8vw, 88px)", letterSpacing: "-0.04em" }}>
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

      <section className="relative py-16 sm:py-20 lg:py-[80px] overflow-hidden">
        {/* Pink atmospheric glow for cards section */}
        <div 
          aria-hidden 
          className="absolute w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.05]"
          style={{ background: "radial-gradient(#EC4899, transparent 70%)", top: "10%", left: "-10%", filter: "blur(100px)" }}
        />

        <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-10">
          {/* Left Column - Contact Cards */}
          <div className="space-y-4">
            {contactCards.map((card, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6"
              >
                {card.icon && (
                  <div className="w-10 h-10 rounded-lg bg-violet/15 flex items-center justify-center text-violet">
                    {card.icon}
                  </div>
                )}
                {card.status && (
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-violet animate-pulse-dot" />
                    <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">Current status</span>
                  </div>
                )}
                <h3 className="font-display font-bold text-ink mt-4">{card.title}</h3>
                {card.href ? (
                  <a href={card.href} className="block text-ink-muted hover:text-ink text-sm mt-1 transition-colors">{card.link}</a>
                ) : card.link ? (
                  <p className="text-ink-muted text-sm mt-1">{card.link}</p>
                ) : null}
                <p className="text-xs text-ink-muted/70 mt-2">{card.sub}</p>
              </motion.div>
            ))}
            
            <motion.div 
              {...fadeUp(0.4)}
              className="flex flex-wrap gap-2 pt-2"
            >
              {["100% private", "No spam", "1 day reply", "Data stays private"].map(t => (
                <span key={t} className="text-[11px] text-ink-muted px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06]">{t}</span>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Form */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Violet glow centered behind form */}
            <div 
              aria-hidden 
              className="absolute w-[600px] h-[600px] rounded-full pointer-events-none opacity-[0.08]"
              style={{ background: "radial-gradient(#7C3AED, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%, -50%)", filter: "blur(120px)", zIndex: -1 }}
            />

            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="bg-brand-card border border-white/[0.06] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl relative z-10">
              <h2 className="section-headline-reveal font-display font-extrabold text-2xl text-ink">Start a Project</h2>
              <p className="text-ink-muted text-sm mt-1 mb-8">A few details so we can reply with something useful.</p>

              {sent ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl border border-violet/30 bg-violet/5 p-8 text-center"
                >
                  <div className="text-violet text-3xl">✓</div>
                  <h3 className="font-display font-bold text-ink mt-3">Brief received</h3>
                  <p className="text-ink-muted text-sm mt-1">We'll be in touch within one business day.</p>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field label="Name" name="name" required />
                  <Field label="Company" name="company" />
                  <div className="md:col-span-2"><Field label="Email" name="email" type="email" required /></div>
                  <div className="md:col-span-2"><Select label="What do you need?" options={["Website Development", "E-Commerce", "UI/UX Design", "Web Application", "Digital Marketing", "Not sure yet"]} /></div>
                  <div className="md:col-span-2">
                    <label className="block label-eyebrow text-ink-muted mb-2">Project description</label>
                    <textarea rows={5} required className="w-full bg-brand-base border border-white/10 rounded-xl px-4 py-3 text-sm text-ink placeholder:text-ink-muted/60 focus:outline-none focus:border-violet transition-colors" placeholder="A few sentences about what you're building." />
                  </div>
                  <Select label="Budget" options={["< $5k", "$5k – $15k", "$15k – $50k", "$50k+", "Tell me what's reasonable"]} />
                  <Select label="Timeline" options={["ASAP", "1–3 months", "3–6 months", "Flexible"]} />
                  
                  {/* Since MagneticButton is for Links, I'll use a styled button here that mimics it but is a submit button */}
                  <button type="submit" className="md:col-span-2 mt-4 bg-accent-gradient text-white font-bold text-[15px] px-6 py-4.5 rounded-xl shadow-glow-purple min-h-[52px] hover:brightness-110 transition-all active:scale-[0.98]">
                    Send Project Brief →
                  </button>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </section>
    </SiteShell>
  );
}

function Field({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block label-eyebrow text-ink-muted mb-2">{label}</label>
      <input name={name} type={type} required={required} className="w-full min-h-[48px] bg-brand-base border border-white/10 rounded-xl px-4 py-3 text-sm text-ink placeholder:text-ink-muted/60 focus:outline-none focus:border-violet transition-colors" />
    </div>
  );
}
function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <label className="block label-eyebrow text-ink-muted mb-2">{label}</label>
      <select className="w-full min-h-[48px] bg-brand-base border border-white/10 rounded-xl px-4 py-3 text-sm text-ink focus:outline-none focus:border-violet appearance-none transition-colors">
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}
