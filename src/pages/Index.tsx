import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingPet from "@/components/FloatingPet";
import CustomCursor from "@/components/CustomCursor";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <CustomCursor />
      <FloatingPet />
      <Navbar />
      <main className="pt-16">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <BlogSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
