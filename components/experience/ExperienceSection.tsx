"use client";

import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { experience } from "@/lib/data";
import { cn } from "@/lib/utils";

export function ExperienceSection() {
  return (
    <section id="experience" className="relative px-6 py-32 md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-blue-600">Experience</p>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-neutral-900 md:text-5xl">
            4+ years across startups, enterprise, and freelance.
          </h2>
        </ScrollReveal>

        <div className="relative mt-16 max-w-2xl">
          {/* Continuous timeline line */}
          <div className="absolute left-[5px] top-2 bottom-0 w-px bg-gradient-to-b from-blue-300 via-neutral-200 to-transparent" />

          <div className="space-y-8">
            {experience.map((entry, i) => (
              <ScrollReveal key={entry.date} delay={i * 0.08}>
                <div className="relative flex gap-5 pl-0">
                  {/* Dot */}
                  <div className="relative z-10 mt-1.5 shrink-0">
                    <div
                      className={cn(
                        "h-[11px] w-[11px] rounded-full border-2",
                        entry.isCurrent
                          ? "border-blue-500 bg-blue-400 shadow-[0_0_8px_rgba(37,99,235,0.4)]"
                          : "border-neutral-300 bg-white",
                      )}
                    />
                  </div>

                  {/* Content */}
                  <div
                    className={cn(
                      "flex-1 rounded-xl pb-2 transition-colors",
                      entry.isCurrent &&
                        "rounded-xl border border-blue-200/60 bg-blue-50/30 p-5 shadow-sm shadow-blue-500/5 backdrop-blur-sm",
                    )}
                  >
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                      <h3
                        className={cn(
                          "text-lg font-semibold text-neutral-900",
                          entry.isCurrent && "text-xl",
                        )}
                      >
                        {entry.role}
                      </h3>
                      {entry.isCurrent && (
                        <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-blue-700">
                          Current
                        </span>
                      )}
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-neutral-500">
                      <span>{entry.company}</span>
                      <span className="text-neutral-300">·</span>
                      <span className="font-mono text-xs text-blue-600/80">{entry.date}</span>
                    </div>
                    <p className="mt-2.5 text-sm leading-relaxed text-neutral-500">
                      {entry.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
