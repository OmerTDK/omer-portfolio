"use client";

import { useMemo } from "react";

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

export function GlobeFallback() {
  const dots = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        top: seededRandom(i * 3 + 1) * 100,
        left: seededRandom(i * 3 + 2) * 100,
        color: i % 3 === 0 ? "#60a5fa" : i % 3 === 1 ? "#8b5cf6" : "#22d3ee",
        opacity: 0.3 + seededRandom(i * 3 + 3) * 0.4,
        duration: 3 + seededRandom(i * 5) * 4,
        delay: seededRandom(i * 7) * 5,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] to-[#0a0e1a]" />
      <div className="absolute inset-0">
        {dots.map((dot, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 rounded-full"
            style={{
              top: `${dot.top}%`,
              left: `${dot.left}%`,
              backgroundColor: dot.color,
              opacity: dot.opacity,
              animation: `fallback-pulse ${dot.duration}s ease-in-out infinite`,
              animationDelay: `${dot.delay}s`,
            }}
          />
        ))}
      </div>
      <style jsx>{`
        @keyframes fallback-pulse {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.5);
          }
        }
      `}</style>
    </div>
  );
}
