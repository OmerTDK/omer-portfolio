"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { experience } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;

      const entries = gsap.utils.toArray<HTMLElement>(".timeline-entry");
      entries.forEach((entry) => {
        gsap.from(entry, {
          opacity: 0,
          y: 40,
          duration: 0.6,
          scrollTrigger: {
            trigger: entry,
            start: "top 80%",
            end: "top 60%",
            toggleActions: "play none none reverse",
          },
        });
      });

      gsap.from(".timeline-line", {
        scaleY: 0,
        transformOrigin: "top",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 50%",
          scrub: 1,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative mx-auto max-w-3xl py-8">
      <div className="timeline-line absolute left-4 top-0 h-full w-px bg-gradient-to-b from-cyan-400/20 via-white/5 to-transparent md:left-1/2" />

      {experience.map((entry, i) => (
        <div
          key={entry.date}
          className={cn(
            "timeline-entry relative mb-12 pl-12 md:w-1/2 md:pl-0",
            i % 2 === 0 ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"
          )}
        >
          <div
            className={cn(
              "absolute left-3 top-1.5 h-3 w-3 rounded-full md:top-1.5",
              entry.isCurrent ? "bg-cyan-400" : "bg-orange-400",
              i % 2 === 0 ? "md:left-auto md:-right-1.5" : "md:-left-1.5"
            )}
            style={{ boxShadow: entry.isCurrent ? "0 0 12px rgba(6,182,212,0.5)" : "0 0 12px rgba(249,115,22,0.3)" }}
          />

          <p className="font-mono text-sm text-cyan-400">{entry.date}</p>
          <h3 className="mt-1 text-lg font-semibold text-white">{entry.role}</h3>
          <p className="text-sm font-medium text-white/40">{entry.company}</p>
          <p className="mt-2 text-sm leading-relaxed text-white/50">{entry.description}</p>
        </div>
      ))}
    </div>
  );
}
