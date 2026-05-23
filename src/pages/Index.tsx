import SiteShell from "@/components/site/SiteShell";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import WhyUs from "@/components/sections/WhyUs";
import Testimonials from "@/components/sections/Testimonials";
import ClosingCTA from "@/components/sections/ClosingCTA";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function Index() {
  usePageMeta({
    title: "CybiconZ — We Build Digital Products That Actually Work",
    description: "CybiconZ is a Tokyo-based digital agency. We build websites, e-commerce systems, and applications for businesses that need their digital presence to actually work.",
  });
  return (
    <SiteShell>
      <Hero />
      <Services />
      <Portfolio />
      <WhyUs />
      <Testimonials />
      <ClosingCTA />
    </SiteShell>
  );
}
