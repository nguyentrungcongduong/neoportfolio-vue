import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CertificatesSection from "@/components/CertificatesSection";
import ProjectsSection from "@/components/ProjectsSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingPet from "@/components/FloatingPet";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import AIChatBot from "@/components/AIChatBot";
import ScrollToTop from "@/components/ScrollToTop";
import LoadingScreen from "@/components/LoadingScreen";
import CursorTrail from "@/components/CursorTrail";
import EasterEgg from "@/components/EasterEgg";
import { useState } from "react";
import { Toaster } from "sonner";

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="min-h-screen relative">
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      <ScrollProgress />
      <CustomCursor />
      <CursorTrail />
      <EasterEgg />
      <FloatingPet />
      <AIChatBot />
      <Navbar />
      <main className="pt-16">
        <HeroSection />
        <AboutSection />
        <CertificatesSection />
        <ProjectsSection />
        <BlogSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "var(--background)",
            color: "var(--foreground)",
            border: "3px solid var(--foreground)",
            borderRadius: "0",
            fontWeight: "700",
            boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)",
          },
        }}
      />
    </div>
  );
};

export default Index;
