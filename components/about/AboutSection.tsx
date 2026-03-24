"use client";

import { useRef, useCallback } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import NumberFlow from "@number-flow/react";
import { MapPin, GraduationCap } from "lucide-react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { bio } from "@/lib/data";

function AnimatedStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const displayValue = inView ? value : 0;

  return (
    <div ref={ref} className="text-center">
      <div className="font-mono text-3xl font-bold text-neutral-900 md:text-4xl">
        <NumberFlow value={displayValue} />{suffix}
      </div>
      <div className="mt-1 text-xs uppercase tracking-wider text-neutral-500">{label}</div>
    </div>
  );
}

function TiltPhoto({ src, alt }: { src: string; alt: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale3d(1.02, 1.02, 1.02)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (card) card.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)";
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="mx-auto w-48 md:w-full h-full transition-transform duration-200 ease-out"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="relative h-full">
        <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-indigo-400/20 via-violet-400/10 to-cyan-400/20 blur-xl" />
        <div className="relative overflow-hidden rounded-2xl shadow-xl shadow-indigo-500/10 h-full">
          <Image
            src={src}
            alt={alt}
            width={350}
            height={440}
            className="h-full w-full object-cover object-top"
            priority
          />
        </div>
      </div>
    </div>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="relative px-6 py-32 md:px-12 lg:px-24">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
          <div className="rounded-3xl bg-white/85 backdrop-blur-xl border border-white/60 shadow-lg shadow-black/8 p-8 md:p-12">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-blue-600 mb-8">About</p>

            <div className="grid gap-10 md:grid-cols-[240px_1fr] md:items-stretch">
              <TiltPhoto src={bio.profileImage} alt="Omer Zaman" />

              <div>
                <h2 className="text-3xl font-bold leading-tight text-neutral-900 md:text-4xl">
                  I build the data infrastructure teams depend on.
                </h2>
                <p className="mt-6 text-base leading-relaxed text-neutral-500">{bio.about[0]}</p>
                <p className="mt-4 text-sm leading-relaxed text-neutral-500">{bio.about[1]}</p>
                <p className="mt-4 text-sm leading-relaxed text-neutral-500">{bio.about[2]}</p>

                <div className="mt-6 flex flex-wrap gap-6">
                  <span className="inline-flex items-center gap-2 text-sm text-neutral-500">
                    <MapPin className="h-3.5 w-3.5 text-blue-600" />
                    {bio.location}
                  </span>
                  <span className="inline-flex items-center gap-2 text-sm text-neutral-500">
                    <GraduationCap className="h-3.5 w-3.5 text-blue-600" />
                    {bio.education}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-neutral-200/50 pt-8 flex justify-around">
              {bio.stats.map((stat) => (
                <AnimatedStat
                  key={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                />
              ))}
            </div>
          </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
