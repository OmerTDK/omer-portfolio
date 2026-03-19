import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Timeline } from "./Timeline";

export function ExperienceSection() {
  return (
    <SectionWrapper id="experience">
      <ScrollReveal>
        <h2 className="text-center text-3xl font-semibold text-[#f1f5f9]">Experience</h2>
      </ScrollReveal>
      <div className="mt-12">
        <Timeline />
      </div>
    </SectionWrapper>
  );
}
