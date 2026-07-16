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
import { useState } from "react";

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="min-h-screen relative">
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      <ScrollProgress />
      <CustomCursor />
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
    </div>
  );
};

export default Index;
