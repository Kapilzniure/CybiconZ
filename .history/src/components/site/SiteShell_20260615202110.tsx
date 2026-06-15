import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
// import AnnouncementBar from "./AnnouncementBar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PageWrapper from "./PageWrapper";

export default function SiteShell({ children }: { children: ReactNode }) {
  const location = useLocation();
  return (
    
      {/* Fixed header stack: announcement bar + navbar stacked vertically */}
      <Navbar/>
      <PageWrapper>{children}</PageWrapper>
      <Footer />
    </div>
  );
}
