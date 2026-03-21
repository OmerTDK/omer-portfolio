import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Timeline } from "./Timeline";

export function ExperienceSection() {
  return (
    <section id="experience" className="relative px-6 py-32 md:px-12 lg:px-24">
      <div className="section-divider mb-24" />
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-orange-400">Experience</p>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-white md:text-5xl">
            Where I&apos;ve been. What I&apos;ve built.
          </h2>
        </ScrollReveal>
        <div className="mt-16"><Timeline /></div>
      </div>
    </section>
  );
}
