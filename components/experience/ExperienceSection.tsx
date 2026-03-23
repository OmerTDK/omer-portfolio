"use client";

import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { experience } from "@/lib/data";
import { cn } from "@/lib/utils";

export function ExperienceSection() {
  return (
    <section id="experience" className="relative px-6 py-32 md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-600">Experience</p>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-neutral-900 md:text-5xl">
            4+ years across startups, enterprise, and freelance.
          </h2>
        </ScrollReveal>

        <div className="mt-16 max-w-2xl space-y-16">
          {experience.map((entry) => (
            <ScrollReveal key={entry.date}>
              <div className="flex gap-6">
                <div className="flex flex-col items-center pt-2">
                  <div
                    className={cn(
                      "h-3 w-3 shrink-0 rounded-full",
                      entry.isCurrent ? "bg-amber-500" : "bg-neutral-300",
                    )}
                  />
                  <div className="mt-2 w-px flex-1 bg-neutral-200/50" />
                </div>
                <div className="pb-4">
                  <p className="font-mono text-sm text-amber-600">{entry.date}</p>
                  <h3 className="mt-2 text-xl font-semibold text-neutral-900">{entry.role}</h3>
                  <p className="text-sm text-neutral-500">{entry.company}</p>
                  <p className="mt-3 text-base leading-relaxed text-neutral-500">
                    {entry.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
