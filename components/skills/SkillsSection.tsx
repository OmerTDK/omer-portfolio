"use client";

import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { skills } from "@/lib/data";

const categories = ["core", "data", "infra", "viz"] as const;
const categoryMeta = {
  core: { label: "Core Stack" },
  data: { label: "Data Science" },
  infra: { label: "Infrastructure" },
  viz: { label: "Visualization" },
} as const;

export function SkillsSection() {
  return (
    <section id="skills" className="relative px-6 py-32 md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-600">Skills</p>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-neutral-900 md:text-5xl">
            My toolkit.
          </h2>
        </ScrollReveal>

        <div className="mt-16 space-y-8">
          {categories.map((cat, i) => {
            const catSkills = skills.filter((s) => s.category === cat);
            return (
              <ScrollReveal key={cat} delay={i * 0.1}>
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-8">
                  <h3 className="w-36 shrink-0 text-xs font-semibold uppercase tracking-widest text-neutral-500">
                    {categoryMeta[cat].label}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {catSkills.map((skill) => (
                      <span
                        key={skill.name}
                        className="rounded-full border border-white/60 bg-white/85 px-4 py-2 text-sm text-neutral-700 shadow-sm shadow-black/8 backdrop-blur-xl transition-all hover:bg-white/80 hover:shadow-md"
                      >
                        {skill.name}
                      </span>
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
