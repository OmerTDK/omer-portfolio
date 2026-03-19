import Image from "next/image";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { StatCard } from "./StatCard";
import { ParticleBg } from "./ParticleBg";
import { bio } from "@/lib/data";
import { MapPin, GraduationCap } from "lucide-react";

export function AboutSection() {
  return (
    <SectionWrapper id="about" className="relative overflow-hidden">
      <ParticleBg />
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Asymmetric grid — photo breaks out of alignment */}
        <div className="grid gap-12 md:grid-cols-[1fr_280px] md:items-start lg:grid-cols-[1fr_320px]">
          {/* Left: text content */}
          <div>
            <ScrollReveal>
              <h2 className="text-4xl font-bold text-[#f1f5f9] md:text-5xl">
                About
              </h2>
            </ScrollReveal>

            {bio.about.map((paragraph, i) => (
              <ScrollReveal key={i} delay={0.1 * (i + 1)}>
                <p className="mt-5 text-base leading-relaxed text-[#94a3b8]">
                  {paragraph}
                </p>
              </ScrollReveal>
            ))}

            <ScrollReveal delay={0.4}>
              <div className="mt-6 flex flex-wrap gap-4">
                <span className="inline-flex items-center gap-1.5 text-sm text-[#64748b]">
                  <MapPin className="h-3.5 w-3.5 text-[#60a5fa]" />
                  {bio.location}
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm text-[#64748b]">
                  <GraduationCap className="h-3.5 w-3.5 text-[#8b5cf6]" />
                  {bio.education}
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <div className="mt-8">
                <StatCard stats={bio.stats} />
              </div>
            </ScrollReveal>
          </div>

          {/* Right: profile photo — offset upward for asymmetry */}
          <ScrollReveal delay={0.3} className="md:-mt-8">
            <div className="relative mx-auto w-64 md:w-full">
              <div className="overflow-hidden rounded-2xl border border-[#1a2040]">
                <Image
                  src={bio.profileImage}
                  alt="Omer Zaman"
                  width={320}
                  height={400}
                  className="h-auto w-full object-cover"
                  priority
                />
              </div>
              {/* Decorative accent */}
              <div className="absolute -bottom-3 -right-3 h-full w-full rounded-2xl border border-[#60a5fa]/10 -z-10" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </SectionWrapper>
  );
}
