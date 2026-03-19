import Image from "next/image";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { bio } from "@/lib/data";
import { MapPin, GraduationCap } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="section-base relative">
      {/* Glowing divider at top */}
      <div className="glow-line w-full" />

      <div className="flex min-h-screen items-center px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-[1fr_300px] md:items-center lg:grid-cols-[1fr_350px]">
          <div>
            <ScrollReveal>
              <p className="font-mono text-sm uppercase tracking-widest text-[#60a5fa]">About</p>
              <h2 className="mt-4 text-4xl font-bold leading-tight text-white md:text-6xl">
                I build the data<br />
                <span className="text-gradient-blue">infrastructure</span><br />
                teams depend on.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="mt-8 max-w-lg text-lg leading-relaxed text-[#94a3b8]">
                {bio.about[0]}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-[#64748b]">
                {bio.about[2]}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="mt-8 flex flex-wrap gap-6">
                <span className="inline-flex items-center gap-2 text-sm text-[#94a3b8]">
                  <MapPin className="h-4 w-4 text-[#60a5fa]" />
                  {bio.location}
                </span>
                <span className="inline-flex items-center gap-2 text-sm text-[#94a3b8]">
                  <GraduationCap className="h-4 w-4 text-[#8b5cf6]" />
                  {bio.education}
                </span>
              </div>
            </ScrollReveal>

            {/* Stats — big numbers */}
            <ScrollReveal delay={0.5}>
              <div className="mt-12 flex gap-12">
                {bio.stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="font-mono text-4xl font-bold text-white md:text-5xl">
                      {stat.value}{stat.suffix}
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-wider text-[#64748b]">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Profile photo */}
          <ScrollReveal delay={0.3}>
            <div className="relative mx-auto w-64 md:w-full">
              <div className="overflow-hidden rounded-2xl border border-[#1a2040] shadow-2xl shadow-[#60a5fa]/5">
                <Image
                  src={bio.profileImage}
                  alt="Omer Zaman"
                  width={350}
                  height={440}
                  className="h-auto w-full object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -right-4 h-full w-full rounded-2xl border border-[#60a5fa]/10 -z-10" />
              <div className="absolute -top-4 -left-4 h-full w-full rounded-2xl border border-[#8b5cf6]/10 -z-10" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
