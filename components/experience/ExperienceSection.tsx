import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Timeline } from "./Timeline";

export function ExperienceSection() {
  return (
    <section id="experience" className="section-elevated relative">
      <div className="glow-line w-full" />

      <div className="flex min-h-screen flex-col justify-center px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <p className="font-mono text-sm uppercase tracking-widest text-[#22d3ee]">Experience</p>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-white md:text-6xl">
              Where I&apos;ve been.<br />
              <span className="text-gradient-blue">What I&apos;ve built.</span>
            </h2>
          </ScrollReveal>

          <div className="mt-16">
            <Timeline />
          </div>
        </div>
      </div>
    </section>
  );
}
