import SiteShell from "@/components/site/SiteShell";
import { usePageMeta } from "@/hooks/usePageMeta";

const sections = [
  {
    title: "What we collect",
    body: "When you use our contact form, we receive your name, email address, and the details you provide about your project. We do not use tracking pixels, analytics cookies, or third-party data collection tools beyond what is standard to web hosting.",
  },
  {
    title: "How we use it",
    body: "Your information is used only to respond to your inquiry and manage our working relationship. We do not sell, rent, or share your data with any third parties. We do not add you to mailing lists without explicit consent.",
  },
  {
    title: "Data retention",
    body: "We retain project-related communications for the duration of the engagement and a reasonable period afterward for reference. You may request deletion of your data at any time by emailing us directly.",
  },
  {
    title: "Your rights",
    body: "You have the right to access, correct, or request deletion of any personal data we hold about you. To exercise these rights, contact us at cybiconz@gmail.com.",
  },
  {
    title: "Contact",
    body: "Questions about this policy? Email cybiconz@gmail.com. We'll respond within one business day.",
  },
];

export default function Privacy() {
  usePageMeta({
    title: "Privacy Policy — CybiconZ",
    description: "How CybiconZ handles your personal data. Simple, honest, and to the point.",
  });

  return (
    <SiteShell>
      <section className="relative pt-32 pb-24 overflow-hidden" style={{ background: "#060608" }}>
        <div
          className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "rgba(79,70,229,0.08)", filter: "blur(120px)" }}
        />
        <div className="container relative max-w-2xl">
          <span className="label-eyebrow text-violet">Legal</span>
          <h1
            className="font-display font-extrabold text-white mt-4 leading-[0.95]"
            style={{ fontSize: "clamp(40px, 6vw, 64px)", letterSpacing: "-0.04em" }}
          >
            Privacy Policy
          </h1>
          <p className="mt-4 text-[14px] font-mono" style={{ color: "rgba(255,255,255,0.35)" }}>
            Last updated: May 2026
          </p>

          <div className="mt-14 flex flex-col gap-10">
            {sections.map((s) => (
              <div key={s.title}>
                <h2
                  className="font-display font-bold text-white mb-3"
                  style={{ fontSize: 20 }}
                >
                  {s.title}
                </h2>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.58)", lineHeight: 1.8 }}>
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
