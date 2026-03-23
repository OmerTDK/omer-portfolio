"use client";

import { useState, useEffect, useRef } from "react";
import { MeshGradient } from "@paper-design/shaders-react";

const sectionColorMap: Record<string, string[]> = {
  hero: ["#eef2ff", "#dbeafe", "#c7d2fe", "#e0e7ff", "#a5b4fc"],
  about: ["#ffffff", "#e0e7ff", "#c7d2fe", "#e9d5ff", "#bfdbfe"],
  skills: ["#ffffff", "#dbeafe", "#c4b5fd", "#d4d4f8", "#a5d8ff"],
  projects: ["#ffffff", "#d0d5ff", "#a5b4fc", "#c4b5fd", "#93c5fd"],
  experience: ["#ffffff", "#dbeafe", "#c7d2fe", "#d8d5f0", "#bfdbfe"],
  contact: ["#ffffff", "#eef2ff", "#dbeafe", "#ede9fe", "#dbeafe"],
};

const sectionIds = ["about", "skills", "projects", "experience", "contact"];

function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((v) => Math.round(v).toString(16).padStart(2, "0"))
      .join("")
  );
}

function lerpColors(from: string[], to: string[], t: number): string[] {
  return from.map((fromHex, i) => {
    const [r1, g1, b1] = hexToRgb(fromHex);
    const [r2, g2, b2] = hexToRgb(to[i]);
    return rgbToHex(r1 + (r2 - r1) * t, g1 + (g2 - g1) * t, b1 + (b2 - b1) * t);
  });
}

export function DynamicMeshBackground() {
  const [colors, setColors] = useState(sectionColorMap.hero);
  const currentSection = useRef("hero");
  const fromColors = useRef(sectionColorMap.hero);
  const toColors = useRef(sectionColorMap.hero);
  const animRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const displayedColors = useRef(sectionColorMap.hero);

  useEffect(() => {
    const duration = 1800;

    function tick(time: number) {
      if (!startTimeRef.current) startTimeRef.current = time;
      const elapsed = time - startTimeRef.current;
      const t = Math.min(elapsed / duration, 1);
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const interpolated = lerpColors(fromColors.current, toColors.current, eased);
      displayedColors.current = interpolated;
      setColors(interpolated);

      if (t < 1) {
        animRef.current = requestAnimationFrame(tick);
      } else {
        fromColors.current = [...toColors.current];
        animRef.current = null;
      }
    }

    function startTransition(targetSection: string) {
      fromColors.current = [...displayedColors.current];
      toColors.current = sectionColorMap[targetSection];
      startTimeRef.current = null;
      if (animRef.current) cancelAnimationFrame(animRef.current);
      animRef.current = requestAnimationFrame(tick);
    }

    function handleScroll() {
      const vh = window.innerHeight;
      let newSection = "hero";

      if (window.scrollY >= vh * 0.5) {
        for (let i = sectionIds.length - 1; i >= 0; i--) {
          const el = document.getElementById(sectionIds[i]);
          if (el && el.getBoundingClientRect().top <= vh * 0.5) {
            newSection = sectionIds[i];
            break;
          }
        }
      }

      if (newSection !== currentSection.current) {
        currentSection.current = newSection;
        startTransition(newSection);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 transition-opacity duration-[2000ms]">
        <MeshGradient style={{ height: "100%", width: "100%" }} colors={colors} speed={1.2} />
      </div>
      <div className="absolute inset-0 bg-white/25" />
    </div>
  );
}
