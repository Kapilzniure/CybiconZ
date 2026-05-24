import { useState, useEffect, lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useLenis, lenisInstance } from "@/hooks/useLenis";
import { Cursor } from "@/components/ui/Cursor";
import { Preloader } from "@/components/ui/Preloader";
import { TransitionOverlay } from "@/components/ui/TransitionOverlay";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { ThemeOverlay } from "@/components/ui/ThemeOverlay";
import { ScrollThemeProvider } from "@/hooks/useScrollTheme";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollVelocity } from "@/hooks/useScrollVelocity";

const Index         = lazy(() => import("./pages/Index"));
const ServicesPage  = lazy(() => import("./pages/Services"));
const WorkPage      = lazy(() => import("./pages/Work"));
const CaseStudy     = lazy(() => import("./pages/CaseStudy"));
const About         = lazy(() => import("./pages/About"));
const Contact       = lazy(() => import("./pages/Contact"));
const CybiLearnPage = lazy(() => import("./pages/CybiLearn"));
const Careers       = lazy(() => import("./pages/Careers"));
const Blog          = lazy(() => import("./pages/Blog"));
const BlogPost      = lazy(() => import("./pages/BlogPost"));
const Privacy       = lazy(() => import("./pages/Privacy"));
const Terms         = lazy(() => import("./pages/Terms"));
const NotFound      = lazy(() => import("./pages/NotFound"));

function PageFallback() {
  return <div style={{ background: "#020408", minHeight: "100vh" }} />;
}

const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    lenisInstance?.scrollTo(0, { immediate: true });
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  useLenis();
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageFallback />}>
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
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
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
          <ScrollThemeProvider>
            <ThemeOverlay />
            <ScrollProgress />
            <Cursor />
            <TransitionOverlay />
            <AnimatedRoutes />
          </ScrollThemeProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
