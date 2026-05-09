import { ReactNode } from "react";
import AnnouncementBar from "./AnnouncementBar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PageWrapper from "./PageWrapper";
export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-brand-base">
      <AnnouncementBar />
      <Navbar />
      <PageWrapper>{children}</PageWrapper>
      <Footer />
    </div>
  );
}
