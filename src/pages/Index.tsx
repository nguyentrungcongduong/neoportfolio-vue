import { lazy, Suspense, useState } from "react";
import { Toaster } from "sonner";

// ── Eager: visible immediately ───────────────────────────────
import Navbar        from "@/components/Navbar";
import HeroSection   from "@/components/HeroSection";
import CustomCursor  from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import LoadingScreen from "@/components/LoadingScreen";
import CursorTrail   from "@/components/CursorTrail";
import EasterEgg     from "@/components/EasterEgg";

// ── Lazy: below-fold sections loaded on demand ────────────────
const AboutSection       = lazy(() => import("@/components/AboutSection"));
const SkillsSection      = lazy(() => import("@/components/SkillsSection"));
const TimelineSection    = lazy(() => import("@/components/TimelineSection"));
const CertificatesSection= lazy(() => import("@/components/CertificatesSection"));
const ProjectsSection    = lazy(() => import("@/components/ProjectsSection"));
const BlogSection        = lazy(() => import("@/components/BlogSection"));
const ContactSection     = lazy(() => import("@/components/ContactSection"));
const Footer             = lazy(() => import("@/components/Footer"));
const FloatingPet        = lazy(() => import("@/components/FloatingPet"));
const AIChatBot          = lazy(() => import("@/components/AIChatBot"));
const ScrollToTop        = lazy(() => import("@/components/ScrollToTop"));

// ── Minimal fallback — invisible skeleton ────────────────────
const SectionFallback = () => (
  <div className="min-h-[200px] w-full" aria-hidden="true" />
);

const Index = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="min-h-screen relative">
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}

      {/* Always-on utilities */}
      <ScrollProgress />
      <CustomCursor />
      <CursorTrail />
      <EasterEgg />

      {/* Lazy UI chrome */}
      <Suspense fallback={null}>
        <FloatingPet />
        <AIChatBot />
        <ScrollToTop />
      </Suspense>

      <Navbar />

      <main className="pt-16">
        {/* Hero is eager — first paint */}
        <HeroSection />

        {/* Remaining sections are lazy */}
        <Suspense fallback={<SectionFallback />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <SkillsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <TimelineSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <CertificatesSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ProjectsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <BlogSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ContactSection />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>

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
