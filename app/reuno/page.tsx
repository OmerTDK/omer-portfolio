"use client";

import { Navbar } from "@/components/nav/Navbar";
import { AboutSection } from "@/components/about/AboutSection";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { ExperienceSection } from "@/components/experience/ExperienceSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { MeshGradient } from "@paper-design/shaders-react";
import { motion } from "motion/react";
import { bio } from "@/lib/data";

function HeroContent() {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-6">
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-1.5 mb-8"
        >
          <span className="text-white/70 text-xs font-medium tracking-wide">
            Analytics Engineer &middot; Berlin
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-[0.9]"
        >
          <span
            className="block"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #06b6d4 40%, #f97316 70%, #ffffff 100%)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Omer
          </span>
          <span className="block text-white drop-shadow-2xl">Zaman</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 mx-auto max-w-lg text-lg text-white/50"
        >
          {bio.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="px-8 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white text-sm font-medium hover:bg-white/10 hover:border-white/30 transition-all duration-300"
          >
            View my work
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-orange-500 text-white text-sm font-semibold hover:from-cyan-400 hover:to-orange-400 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Get in touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* ONE persistent mesh gradient background for the entire site */}
      <div className="fixed inset-0 z-0">
        <MeshGradient
          style={{ height: "100%", width: "100%" }}
          colors={["#000000", "#06b6d4", "#0891b2", "#164e63", "#f97316"]}
          speed={0.15}
        />
        {/* Dark overlay to keep text readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black/80" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <main>
          <HeroContent />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
          <ContactSection />
        </main>
      </div>
    </div>
  );
}
