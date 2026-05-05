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
import ClosingCTA from "@/components/sections/ClosingCTA";

export default function Index() {
  return (
    <SiteShell>
      <Hero />
      <Marquee />
      <Services />
      <Process />
      <Stats />
      <Portfolio />
      <TechStack />
      <Testimonials />
      <CybiLearn />
      <ClosingCTA />
    </SiteShell>
  );
}
