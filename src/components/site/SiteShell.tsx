import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import AnnouncementBar from "./AnnouncementBar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PageWrapper from "./PageWrapper";

export default function SiteShell({ children }: { children: ReactNode }) {
  const location = useLocation();
  return (
    <div className="min-h-screen flex flex-col bg-brand-base">
      {/* Fixed header stack: announcement bar + navbar stacked vertically */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}>
        {location.pathname !== "/" && <AnnouncementBar />}
        <Navbar />
      </div>
      <PageWrapper>{children}</PageWrapper>
      <Footer />
    </div>
  );
}
