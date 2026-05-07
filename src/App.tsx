import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useLenis } from "@/hooks/useLenis";
import Cursor from "@/components/ui/Cursor";
import { Preloader } from "@/components/ui/Preloader";
import { TransitionOverlay } from "@/components/ui/TransitionOverlay";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { CursorOrb } from "@/components/ui/CursorOrb";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollVelocity } from "@/hooks/useScrollVelocity";
import Index from "./pages/Index";
import ServicesPage from "./pages/Services";
import WorkPage from "./pages/Work";
import CaseStudy from "./pages/CaseStudy";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CybiLearnPage from "./pages/CybiLearn";
import Careers from "./pages/Careers";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AnimatedRoutes() {
  useLenis();
  return (
    <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/work/:slug" element={<CaseStudy />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cybilearn" element={<CybiLearnPage />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => {
  const velocity = useScrollVelocity();

  useEffect(() => {
    ScrollTrigger.config({ limitCallbacks: velocity > 20 });
  }, [velocity]);

  const [showPreloader, setShowPreloader] = useState(() => {
    if (typeof window === "undefined") return false;
    if (sessionStorage.getItem("visited")) return false;
    sessionStorage.setItem("visited", "1");
    return true;
  });

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}
        <BrowserRouter>
          <ScrollProgress />
          <CursorOrb />
          <Cursor />
          <TransitionOverlay />
          <AnimatedRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
