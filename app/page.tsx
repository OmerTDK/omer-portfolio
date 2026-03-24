"use client";

import { DynamicMeshBackground } from "@/components/background/DynamicMeshBackground";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { FrostNav } from "@/components/layout/FrostNav";
import { Footer } from "@/components/layout/Footer";
import { FloatingDock } from "@/components/layout/FloatingDock";
import { HeroContent } from "@/components/hero/HeroContent";
import { AboutSection } from "@/components/about/AboutSection";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { ImpactBanner } from "@/components/experience/ImpactBanner";
import { ExperienceSection } from "@/components/experience/ExperienceSection";
import { TestimonialsSection } from "@/components/testimonials/TestimonialsSection";
import { ContactSection } from "@/components/contact/ContactSection";

export default function FrostPage() {
  return (
    <div className="relative min-h-screen">
      <DynamicMeshBackground />

      <div className="relative z-10">
        <ScrollProgress />
        <FrostNav />

        <main id="main-content">
          <HeroContent visible />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ImpactBanner />
          <ExperienceSection />
          <TestimonialsSection />
          <ContactSection />
        </main>
        <Footer />
        <FloatingDock />
      </div>
    </div>
  );
}
