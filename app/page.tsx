"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

import { DynamicMeshBackground } from "@/components/background/DynamicMeshBackground";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { FrostNav } from "@/components/layout/FrostNav";
import { Preloader } from "@/components/layout/Preloader";
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
  const [loaded, setLoaded] = useState(false);
  const handleLoaded = useCallback(() => setLoaded(true), []);

  return (
    <div className="relative min-h-screen">
      <AnimatePresence>{!loaded && <Preloader onComplete={handleLoaded} />}</AnimatePresence>

      <DynamicMeshBackground />

      <motion.div
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10"
      >
        <ScrollProgress />
        <FrostNav />

        <main id="main-content">
          <HeroContent visible={loaded} />
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
      </motion.div>
    </div>
  );
}
