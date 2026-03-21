import Image from "next/image";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { bio } from "@/lib/data";
import { MapPin, GraduationCap } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="relative px-6 py-32 md:px-12 lg:px-24">
      <div className="section-divider mb-24" />
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 md:grid-cols-[1fr_300px] md:items-center lg:grid-cols-[1fr_350px]">
          <div>
            <ScrollReveal>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-400">About</p>
              <h2 className="mt-4 text-4xl font-bold leading-tight text-white md:text-5xl">
                I build the data infrastructure teams depend on.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="mt-8 max-w-lg text-base leading-relaxed text-white/60">
                {bio.about[0]}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/40">
                {bio.about[2]}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="mt-8 flex flex-wrap gap-6">
                <span className="inline-flex items-center gap-2 text-sm text-white/50">
                  <MapPin className="h-3.5 w-3.5 text-cyan-400" />
                  {bio.location}
                </span>
                <span className="inline-flex items-center gap-2 text-sm text-white/50">
                  <GraduationCap className="h-3.5 w-3.5 text-orange-400" />
                  {bio.education}
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <div className="mt-12 flex gap-12">
                {bio.stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="font-mono text-4xl font-bold text-white">{stat.value}{stat.suffix}</div>
                    <div className="mt-1 text-xs uppercase tracking-wider text-white/30">{stat.label}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.3}>
            <div className="relative mx-auto w-64 md:w-full">
              <div className="glass overflow-hidden rounded-2xl">
                <Image
                  src={bio.profileImage}
                  alt="Omer Zaman"
                  width={350}
                  height={440}
                  className="h-auto w-full object-cover"
                  priority
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
