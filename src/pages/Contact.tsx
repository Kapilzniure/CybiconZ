import SiteShell from "@/components/site/SiteShell";
import { useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <SiteShell>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute -top-32 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "rgba(236,72,153,0.12)", filter: "blur(120px)" }} />
        <div className="container relative">
          <span className="label-eyebrow text-pink">Contact</span>
          <h1 className="font-display font-extrabold text-ink mt-5 leading-[0.95] max-w-4xl" style={{ fontSize: "clamp(48px, 8vw, 88px)", letterSpacing: "-0.04em" }}>
            Tell us about <span className="text-gradient">your project.</span>
          </h1>
          <p className="text-ink-muted text-lg mt-6 max-w-xl">We respond within one business day. If we're not the right fit, we'll say so and point you somewhere good.</p>
        </div>
      </section>

      <section className="py-[80px]">
        <div className="container grid lg:grid-cols-[1fr_1.2fr] gap-10">
          <div className="space-y-4">
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
              <div className="w-10 h-10 rounded-lg bg-violet/15 flex items-center justify-center text-violet">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 7l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="2"/></svg>
              </div>
              <h3 className="font-display font-bold text-ink mt-4">Send a brief</h3>
              <a href="mailto:hello@cybiconz.com" className="block text-ink-muted hover:text-ink text-sm mt-1">hello@cybiconz.com</a>
              <p className="text-xs text-ink-muted/70 mt-2">Reply within 1 business day</p>
            </div>
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald animate-pulse-dot" /><span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">Current status</span></div>
              <h3 className="font-display font-bold text-ink mt-3">Available for new projects</h3>
              <p className="text-xs text-ink-muted mt-2">Taking on new clients</p>
            </div>
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
              <div className="w-10 h-10 rounded-lg bg-emerald/15 flex items-center justify-center text-emerald">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="6" rx="1" stroke="currentColor" strokeWidth="2"/><rect x="3" y="14" width="18" height="6" rx="1" stroke="currentColor" strokeWidth="2"/><circle cx="7" cy="7" r="0.5" fill="currentColor"/><circle cx="7" cy="17" r="0.5" fill="currentColor"/></svg>
              </div>
              <h3 className="font-display font-bold text-ink mt-4">Infrastructure partner</h3>
              <p className="text-ink-muted text-sm mt-1">ZenHost</p>
              <p className="text-xs text-ink-muted/70 mt-2">Vetted hosting for all projects</p>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {["100% private", "No spam", "1 day reply", "Data stays private"].map(t => (
                <span key={t} className="text-xs text-ink-muted px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06]">{t}</span>
              ))}
            </div>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="bg-brand-card border border-white/[0.06] rounded-3xl p-8 md:p-10">
            <h2 className="font-display font-extrabold text-2xl text-ink">Start a Project</h2>
            <p className="text-ink-muted text-sm mt-1 mb-8">A few details so we can reply with something useful.</p>

            {sent ? (
              <div className="rounded-2xl border border-emerald/30 bg-emerald/5 p-6 text-center">
                <div className="text-emerald text-2xl">✓</div>
                <h3 className="font-display font-bold text-ink mt-2">Brief received</h3>
                <p className="text-ink-muted text-sm mt-1">We'll be in touch within one business day.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Name" name="name" required />
                <Field label="Company" name="company" />
                <div className="md:col-span-2"><Field label="Email" name="email" type="email" required /></div>
                <div className="md:col-span-2"><Select label="What do you need?" options={["Website Development", "E-Commerce", "UI/UX Design", "Web Application", "Digital Marketing", "Not sure yet"]} /></div>
                <div className="md:col-span-2">
                  <label className="block label-eyebrow text-ink-muted mb-2">Project description</label>
                  <textarea rows={5} required className="w-full bg-brand-base border border-white/10 rounded-xl px-4 py-3 text-sm text-ink placeholder:text-ink-muted/60 focus:outline-none focus:border-violet" placeholder="A few sentences about what you're building." />
                </div>
                <Select label="Budget" options={["< $5k", "$5k – $15k", "$15k – $50k", "$50k+", "Tell me what's reasonable"]} />
                <Select label="Timeline" options={["ASAP", "1–3 months", "3–6 months", "Flexible"]} />
                <button className="md:col-span-2 mt-4 bg-accent-gradient text-white font-bold text-[15px] px-6 py-4 rounded-xl shadow-glow-purple">Send Project Brief →</button>
              </div>
            )}
          </form>
        </div>
      </section>
    </SiteShell>
  );
}

function Field({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block label-eyebrow text-ink-muted mb-2">{label}</label>
      <input name={name} type={type} required={required} className="w-full bg-brand-base border border-white/10 rounded-xl px-4 py-3 text-sm text-ink placeholder:text-ink-muted/60 focus:outline-none focus:border-violet" />
    </div>
  );
}
function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <label className="block label-eyebrow text-ink-muted mb-2">{label}</label>
      <select className="w-full bg-brand-base border border-white/10 rounded-xl px-4 py-3 text-sm text-ink focus:outline-none focus:border-violet">
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}
