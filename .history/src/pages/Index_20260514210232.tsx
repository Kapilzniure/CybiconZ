import SiteShell from "@/components/site/SiteShell";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Stats from "@/components/sections/Stats";
import Portfolio from "@/components/sections/Portfolio";
// import TechStack from "@/components/sections/TechStack";
import Testimonials from "@/components/sections/Testimonials";
import CybiLearn from "@/components/sections/CybiLearn";
import FAQ from "@/components/sections/FAQ";  
import LatestThinking from "@/components/sections/LatestThinking";
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
      <Marquee />
      <Services />
      <Process />
      <Stats />
      <Portfolio />
      {/* <TechStack /> */}
      <Testimonials />
      <FAQ />
      <CybiLearn />
      <LatestThinking />
      <ClosingCTA />
    </SiteShell>
  );
}
