import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { skills } from "@/lib/data";
import { cn } from "@/lib/utils";

const categoryConfig = {
  core: { label: "Core Stack", color: "#60a5fa", description: "Daily drivers" },
  data: { label: "Data Science", color: "#8b5cf6", description: "ML & analysis" },
  infra: { label: "Infrastructure", color: "#22d3ee", description: "Deploy & scale" },
  viz: { label: "Visualization", color: "#f59e0b", description: "Tell the story" },
} as const;

export function SkillsSection() {
  const categories = ["core", "data", "infra", "viz"] as const;

  return (
    <SectionWrapper id="skills">
      <ScrollReveal>
        <h2 className="text-4xl font-bold text-[#f1f5f9] md:text-5xl">
          Skills & Tools
        </h2>
        <p className="mt-3 text-[#64748b]">Technologies I work with daily</p>
      </ScrollReveal>

      {/* Bento grid */}
      <div className="mx-auto mt-12 grid max-w-4xl gap-4 md:grid-cols-2">
        {categories.map((cat, i) => {
          const config = categoryConfig[cat];
          const catSkills = skills.filter((s) => s.category === cat);

          return (
            <ScrollReveal key={cat} delay={i * 0.1}>
              <div
                className={cn(
                  "group rounded-xl border border-[#1a2040] bg-[#0a0e1a]/60 p-6 backdrop-blur-sm",
                  "transition-all hover:border-opacity-50",
                  i === 0 && "md:col-span-2"
                )}
                style={{
                  ["--accent" as string]: config.color,
                }}
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="text-sm font-semibold" style={{ color: config.color }}>
                    {config.label}
                  </h3>
                  <span className="text-xs text-[#64748b]">{config.description}</span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {catSkills.map((skill) => (
                    <span
                      key={skill.name}
                      className="rounded-md border px-3 py-1.5 text-sm font-medium transition-all hover:scale-105"
                      style={{
                        borderColor: `${config.color}25`,
                        backgroundColor: `${config.color}08`,
                        color: config.color,
                      }}
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
    </SectionWrapper>
  );
}
