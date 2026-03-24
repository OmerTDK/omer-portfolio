"use client";

import { ScrollReveal } from "@/components/shared/ScrollReveal";

const stats = [
  { value: "4+", label: "Years Experience" },
  { value: "32+", label: "Projects Delivered" },
  { value: "41", label: "dbt Models in Prod" },
  { value: "100ms", label: "Per Invoice Parsed" },
];

export function ImpactBanner() {
  return (
    <section className="relative overflow-hidden px-6 py-24 md:px-12 lg:px-24">
      <div className="absolute inset-0 rounded-none bg-blue-600 opacity-[0.05]" />
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-mono text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-xs uppercase tracking-widest text-neutral-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
