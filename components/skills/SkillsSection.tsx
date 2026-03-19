"use client";

import { motion } from "motion/react";
import { skills } from "@/lib/data";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

const categoryConfig = {
  core: { label: "Core Stack", color: "#60a5fa" },
  data: { label: "Data Science", color: "#8b5cf6" },
  infra: { label: "Infrastructure", color: "#22d3ee" },
  viz: { label: "Visualization", color: "#f59e0b" },
} as const;

export function SkillsSection() {
  const categories = ["core", "data", "infra", "viz"] as const;

  return (
    <section id="skills" className="relative bg-[#1e1e1e]">
      <div className="section-divider w-full" />

      <div className="flex min-h-screen flex-col justify-center px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <p className="font-mono text-sm uppercase tracking-widest text-[#a78bfa]">Skills</p>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-[#f5f5f5] md:text-6xl">
              The tools I use to<br />
              <span className="text-gradient-violet">turn data into decisions.</span>
            </h2>
          </ScrollReveal>

          <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat, i) => {
              const config = categoryConfig[cat];
              const catSkills = skills.filter((s) => s.category === cat);

              return (
                <ScrollReveal key={cat} delay={i * 0.1}>
                  <div className="group h-full glass glass-hover rounded-2xl p-6 transition-all">
                    <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: config.color }}>
                      {config.label}
                    </h3>

                    <div className="mt-6 flex flex-col gap-3">
                      {catSkills.map((skill) => (
                        <motion.div
                          key={skill.name}
                          whileHover={{ x: 4 }}
                          className="flex items-center gap-3"
                        >
                          <div
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: config.color }}
                          />
                          <span className="text-sm text-[#d4d4d4]">{skill.name}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
