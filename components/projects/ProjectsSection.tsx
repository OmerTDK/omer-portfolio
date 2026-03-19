"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
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
    <section id="projects" className="section-base relative">
      <div className="glow-line w-full" />

      <div className="min-h-screen px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <p className="font-mono text-sm uppercase tracking-widest text-[#22d3ee]">Projects</p>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-white md:text-6xl">
              Things I&apos;ve built<br />
              <span className="text-gradient-blue">and explored.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="mt-12">
              <PipelineFlow />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="mt-10 flex flex-wrap gap-3">
              {projectCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "rounded-full border px-5 py-2 text-sm font-medium transition-all",
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

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <ProjectCard project={project} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
