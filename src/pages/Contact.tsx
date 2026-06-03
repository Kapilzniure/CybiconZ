import SiteShell from "@/components/site/SiteShell";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SplitText from "@/components/ui/SplitText";
import { usePageMeta } from "@/hooks/usePageMeta";
import { MagneticButton } from "@/components/ui/MagneticButton";

type Step = 1 | 2 | "sent";

const SERVICES = [
  { label: "A website", color: "#00C4FF" },
  { label: "An online store", color: "#39FF14" },
  { label: "A web application", color: "#4F46E5" },
  { label: "Something else", color: "#F59E0B" },
];

const BUDGETS = ["$5–15k", "$15–50k", "$50k+", "Let's discuss"];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Contact() {
  usePageMeta({
    title: "Contact — Start a Conversation",
    description:
      "Tell us about your project. We'll tell you honestly if we're the right fit. Based in Tokyo, working with clients globally.",
  });

  const [step, setStep]       = useState<Step>(1);
  const [service, setService] = useState("");
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [brief, setBrief]     = useState("");
  const [budget, setBudget]   = useState("");

  const advance = (to: Step) => setStep(to);

  return (
    <SiteShell>
      <section className="relative bg-[#050507] pt-32 pb-24 overflow-hidden min-h-screen flex items-center">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-20 lg:gap-32 items-start">
            
            {/* LEFT — High-end Typography */}
            <div className="lg:sticky lg:top-32">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: EASE }}
                className="flex items-center gap-3 mb-8"
              >
                 <span className="w-12 h-[1px] bg-white/40" />
                 <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-white/60">Direct Access</span>
              </motion.div>

              <h1 className="font-display font-extrabold text-white leading-[0.9] mb-12" style={{ fontSize: "clamp(54px, 8vw, 110px)", letterSpacing: "-0.05em" }}>
                Let's<br />
                build the<br />
                <span style={{ color: "rgba(255,255,255,0.65)" }}>future.</span>
              </h1>

              <div className="space-y-12">
                <div>
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 mb-4">Availability</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse" />
                    <p className="text-white/80 font-medium">Currently accepting Q3 2026 projects</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 mb-4">Direct Contact</h3>
                  <a href="mailto:cybiconz@gmail.com" className="text-[20px] text-white hover:text-white/70 transition-colors underline decoration-white/20 underline-offset-8">
                    cybiconz@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT — Refined Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            >
              <div className="bg-white/[0.02] border border-white/[0.08] rounded-[24px] p-8 sm:p-12 shadow-2xl backdrop-blur-sm">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div key="s1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                      <h2 className="font-display font-bold text-white text-[28px] mb-10">What are we building?</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {SERVICES.map((svc) => (
                          <button
                            key={svc.label}
                            onClick={() => { setService(svc.label); advance(2); }}
                            className="text-left p-6 rounded-xl border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all group"
                          >
                            <span className="block font-display font-bold text-lg text-white/60 group-hover:text-white mb-2">{svc.label}</span>
                            <span className="text-[12px] text-white/60 group-hover:text-white/70 font-mono uppercase tracking-widest">Select →</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div key="s2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                      <button onClick={() => advance(1)} className="font-mono text-[10px] text-white/60 uppercase tracking-widest mb-8 hover:text-white transition-colors">← Back</button>
                      <h2 className="font-display font-bold text-white text-[28px] mb-10">Project Details</h2>
                      
                      <div className="space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                          <div className="space-y-3">
                            <label className="block font-mono text-[9px] uppercase tracking-widest text-white/65">Your Name</label>
                            <input
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-white transition-colors text-lg"
                              placeholder="e.g. John Doe"
                            />
                          </div>
                          <div className="space-y-3">
                            <label className="block font-mono text-[9px] uppercase tracking-widest text-white/65">Email Address</label>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-white transition-colors text-lg"
                              placeholder="john@example.com"
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <label className="block font-mono text-[9px] uppercase tracking-widest text-white/65">The Brief</label>
                          <textarea
                            rows={3}
                            value={brief}
                            onChange={(e) => setBrief(e.target.value)}
                            className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-white transition-colors text-lg resize-none placeholder:text-white/10"
                            placeholder="Objectives, goals, or just a quick hello..."
                          />
                        </div>

                        <div className="space-y-5">
                          <label className="block font-mono text-[9px] uppercase tracking-widest text-white/65">Budget Range</label>
                          <div className="flex flex-wrap gap-2">
                            {BUDGETS.map((b) => (
                              <button
                                key={b}
                                onClick={() => setBudget(b)}
                                className={`px-5 py-2.5 rounded-full text-[11px] font-mono uppercase tracking-widest transition-all ${budget === b ? "bg-white text-black" : "bg-white/5 text-white/65 border border-white/10 hover:border-white/20"}`}
                              >
                                {b}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4">
                          <MagneticButton
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              const subject = encodeURIComponent(`Inquiry — ${service}`);
                              const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nService: ${service}${budget ? `\nBudget: ${budget}` : ""}\n\nBrief:\n${brief}`);
                              window.location.href = `mailto:cybiconz@gmail.com?subject=${subject}&body=${body}`;
                              advance("sent");
                            }}
                            variant="primary"
                            className="w-full"
                          >
                            Send Transmission
                          </MagneticButton>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === "sent" && (
                    <motion.div key="sent" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
                      <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center mx-auto mb-10 text-3xl">✓</div>
                      <h2 className="font-display font-bold text-white text-3xl mb-4">Transmission Sent</h2>
                      <p className="text-white/60 leading-relaxed max-w-sm mx-auto">
                        Your message has been pre-filled. Once you hit send in your email client, we'll review it and get back to you within 24 hours.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
