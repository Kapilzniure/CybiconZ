import SiteShell from "@/components/site/SiteShell";
import { usePageMeta } from "@/hooks/usePageMeta";

const sections = [
  {
    title: "Services",
    body: "CybiconZ provides custom digital services including website development, e-commerce systems, web applications, and digital marketing. Each engagement is scoped individually. The exact scope, deliverables, timeline, and price are confirmed in writing before work begins.",
  },
  {
    title: "Payment",
    body: "Projects are invoiced according to the terms agreed in the project proposal. Typically this involves an upfront deposit and milestone-based payments. No work begins until the initial deposit is received. All prices are in USD unless otherwise stated.",
  },
  {
    title: "Ownership",
    body: "Upon full payment, the client owns all custom work produced for their project — code, designs, and content. CybiconZ retains no ongoing claim to deliverables. We may reference completed projects in our portfolio unless the client requests otherwise in writing.",
  },
  {
    title: "Revisions and changes",
    body: "The number of revision rounds and the process for requesting changes are defined in each project scope. Changes outside the agreed scope are quoted separately before any additional work begins.",
  },
  {
    title: "Limitation of liability",
    body: "CybiconZ is not liable for indirect or consequential damages arising from the use of delivered work. Our total liability in any matter is limited to the amount paid for the relevant project.",
  },
  {
    title: "Governing law",
    body: "These terms are governed by the laws of Japan. Any disputes will be resolved first through good-faith discussion. If unresolved, disputes will be subject to the jurisdiction of the appropriate courts in Japan.",
  },
  {
    title: "Contact",
    body: "Questions about these terms? Email cybiconz@gmail.com.",
  },
];

export default function Terms() {
  usePageMeta({
    title: "Terms of Service — CybiconZ",
    description: "CybiconZ terms of service. Straightforward and honest.",
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
            Terms of Service
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
