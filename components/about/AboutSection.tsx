import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { StatCard } from "./StatCard";
import { ParticleBg } from "./ParticleBg";
import { bio } from "@/lib/data";

export function AboutSection() {
  return (
    <SectionWrapper id="about" className="relative overflow-hidden">
      <ParticleBg />
      <div className="relative z-10 mx-auto grid max-w-5xl gap-12 md:grid-cols-[2fr_1fr] md:items-center">
        <div>
          <ScrollReveal>
            <h2 className="text-3xl font-semibold text-[#f1f5f9]">About</h2>
          </ScrollReveal>
          {bio.about.map((paragraph, i) => (
            <ScrollReveal key={i} delay={0.1 * (i + 1)}>
              <p className="mt-4 leading-relaxed text-[#94a3b8]">{paragraph}</p>
            </ScrollReveal>
          ))}
        </div>
        <StatCard stats={bio.stats} />
      </div>
    </SectionWrapper>
  );
}
