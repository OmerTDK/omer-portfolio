"use client";

import { motion } from "motion/react";
import { skills } from "@/lib/data";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

const categoryConfig = {
  core: { label: "Core Stack", color: "#06b6d4" },
  data: { label: "Data Science", color: "#f97316" },
  infra: { label: "Infrastructure", color: "#22d3ee" },
  viz: { label: "Visualization", color: "#fb923c" },
} as const;

export function SkillsSection() {
  const categories = ["core", "data", "infra", "viz"] as const;

  return (
    <section id="skills" className="relative px-6 py-32 md:px-12 lg:px-24">
      <div className="section-divider mb-24" />
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-orange-400">Skills</p>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-white md:text-5xl">
            The tools I use to turn data into decisions.
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, i) => {
            const config = categoryConfig[cat];
            const catSkills = skills.filter((s) => s.category === cat);

            return (
              <ScrollReveal key={cat} delay={i * 0.1}>
                <div className="glass glass-hover group h-full rounded-2xl p-6">
                  <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: config.color }}>
                    {config.label}
                  </h3>
                  <div className="mt-6 flex flex-col gap-3">
                    {catSkills.map((skill) => (
                      <motion.div key={skill.name} whileHover={{ x: 4 }} className="flex items-center gap-3">
                        <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: config.color }} />
                        <span className="text-sm text-white/70">{skill.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
