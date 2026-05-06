import SiteShell from "@/components/site/SiteShell";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Stats from "@/components/sections/Stats";
import Portfolio from "@/components/sections/Portfolio";
import TechStack from "@/components/sections/TechStack";
import Testimonials from "@/components/sections/Testimonials";
import CybiLearn from "@/components/sections/CybiLearn";
import FAQ from "@/components/sections/FAQ";
import LatestThinking from "@/components/sections/LatestThinking";
import ClosingCTA from "@/components/sections/ClosingCTA";
import { SectionBridge } from "@/components/ui/SectionBridge";

export default function Index() {
  return (
    <SiteShell>
      <Hero />
      <Marquee />
      <SectionBridge direction="to-light" />
      <Services />
      <SectionBridge direction="to-dark" />
      <Process />
      <Stats />
      <SectionBridge direction="to-light" />
      <Portfolio />
      <SectionBridge direction="to-dark" />
      <TechStack />
      <SectionBridge direction="to-light" />
      <Testimonials />
      <SectionBridge direction="to-dark" />
      <FAQ />
      <CybiLearn />
      <LatestThinking />
      <ClosingCTA />
    </SiteShell>
  );
}
