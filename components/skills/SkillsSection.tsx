import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { OrbitalSystem } from "./OrbitalSystem";
import { SkillBadge } from "./SkillBadge";
import { skills } from "@/lib/data";

export function SkillsSection() {
  return (
    <SectionWrapper id="skills">
      <ScrollReveal>
        <h2 className="text-center text-3xl font-semibold text-[#f1f5f9]">Skills & Tech Stack</h2>
      </ScrollReveal>
      <div className="mt-16 hidden md:block">
        <OrbitalSystem />
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-3 md:hidden">
        {skills.map((skill) => (
          <SkillBadge key={skill.name} name={skill.name} ring={skill.ring} />
        ))}
      </div>
    </SectionWrapper>
  );
}
