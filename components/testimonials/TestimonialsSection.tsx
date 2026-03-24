"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

const testimonials = [
  {
    quote:
      "Omer has an exceptional ability to turn complex data challenges into clean, reliable solutions. His attention to detail and deep understanding of data architecture make him an invaluable asset to any team.",
    name: "Adnan Zafar",
    role: "Freelance Client — Dashboard & Analytics",
    photo: "/assets/testimonials/adnan.jpg",
    linkedin:
      "https://www.linkedin.com/in/adnan-zafar-%F0%9F%87%AC%F0%9F%87%A7-%F0%9F%87%A6%F0%9F%87%BA-%F0%9F%87%AA%F0%9F%87%BA-1875a0218/",
  },
  {
    quote:
      "Working with Omer is always a great experience. He brings a unique combination of analytical thinking and engineering rigor that consistently delivers results above expectations.",
    name: "M. Zain R.",
    role: "Freelance Client — Data Pipeline Project",
    photo: "/assets/testimonials/zain.jpg",
    linkedin: "https://www.linkedin.com/in/mzainr99/",
  },
  {
    quote:
      "Omer's dedication to his craft is truly inspiring. He doesn't just build pipelines — he thinks deeply about data quality and how it impacts every downstream decision. A brilliant mind with a collaborative spirit.",
    name: "Esra Ilbay",
    role: "Freelance Client — Predictive Modeling",
    photo: "/assets/testimonials/esra.jpg",
    linkedin: "https://www.linkedin.com/in/esrailbay/",
  },
  {
    quote:
      "Omer brings a rare combination of technical depth and clear communication. He can architect a complex data platform and explain it to stakeholders in the same breath. A pleasure to work with.",
    name: "Robin Aguilera",
    role: "Freelance Client — Sales Strategy Analysis",
    photo: "/assets/testimonials/robin.jpg",
    linkedin: "https://www.linkedin.com/in/robin-aguilera-503a092a/",
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden px-6 py-32 md:px-12 lg:px-24">
      <div className="mx-auto mb-12 max-w-6xl">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-blue-600">
            Testimonials
          </p>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-neutral-900 md:text-5xl">
            Don&apos;t take my word for it.
          </h2>
        </ScrollReveal>
      </div>

      <div className="relative overflow-hidden">
        <div className="flex animate-marquee-slow gap-6">
          {[...testimonials, ...testimonials, ...testimonials].map((t, i) => {
            const initials = t.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2);
            return (
              <div
                key={i}
                className="w-[350px] shrink-0 rounded-2xl border border-white/60 bg-white/85 p-6 shadow-lg shadow-black/8 backdrop-blur-xl"
              >
                <p className="text-sm italic leading-relaxed text-neutral-500">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3 border-t border-neutral-200/50 pt-4">
                  {t.photo ? (
                    <Image
                      src={t.photo}
                      alt={t.name}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full border border-white/60 object-cover shadow-sm"
                    />
                  ) : (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-600">
                      {initials}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">
                      {t.linkedin ? (
                        <a
                          href={t.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-colors hover:text-blue-600"
                        >
                          {t.name}
                        </a>
                      ) : (
                        t.name
                      )}
                    </p>
                    <p className="text-xs text-neutral-500">{t.role}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
