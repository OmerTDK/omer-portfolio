"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { PipelineFlow } from "./PipelineFlow";
import { ProjectCard } from "./ProjectCard";
import { projects, projectCategories } from "@/lib/data";
import { cn } from "@/lib/utils";

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = activeCategory === "all"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <SectionWrapper id="projects">
      <ScrollReveal>
        <h2 className="text-4xl font-bold text-[#f1f5f9] md:text-5xl">Projects</h2>
        <p className="mt-3 text-[#64748b]">Things I've built and explored</p>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <PipelineFlow />
      </ScrollReveal>

      {/* Category filter */}
      <ScrollReveal delay={0.2}>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {projectCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-all",
                activeCategory === cat.id
                  ? "border-[#60a5fa]/50 bg-[#60a5fa]/10 text-[#60a5fa]"
                  : "border-[#1a2040] text-[#64748b] hover:border-[#60a5fa]/30 hover:text-[#94a3b8]"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </ScrollReveal>

      {/* Project grid */}
      <div className="mx-auto mt-8 grid max-w-5xl gap-4 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <ProjectCard project={project} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
