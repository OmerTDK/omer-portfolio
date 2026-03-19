"use client";

import { motion } from "motion/react";
import { skills } from "@/lib/data";

const ringConfig = {
  1: { size: 200, color: "#60a5fa" },
  2: { size: 320, color: "#8b5cf6" },
  3: { size: 440, color: "#22d3ee" },
} as const;

function OrbitalRing({ ring, delay }: { ring: 1 | 2 | 3; delay: number }) {
  const config = ringConfig[ring];
  const ringSkills = skills.filter((s) => s.ring === ring);
  const angleStep = 360 / ringSkills.length;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className="absolute left-1/2 top-1/2"
      style={{
        width: config.size,
        height: config.size,
        marginLeft: -config.size / 2,
        marginTop: -config.size / 2,
      }}
    >
      <div className="absolute inset-0 rounded-full border" style={{ borderColor: `${config.color}15` }} />

      {ringSkills.map((skill, i) => {
        const angle = angleStep * i - 90;
        const rad = (angle * Math.PI) / 180;
        const x = (config.size / 2) * Math.cos(rad) + config.size / 2;
        const y = (config.size / 2) * Math.sin(rad) + config.size / 2;

        return (
          <motion.div
            key={skill.name}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: x, top: y }}
            whileHover={{ scale: 1.2 }}
          >
            <div
              className="flex h-10 items-center rounded-full border px-3 text-xs font-medium transition-all hover:shadow-lg"
              style={{
                borderColor: `${config.color}40`,
                backgroundColor: `${config.color}10`,
                color: config.color,
              }}
            >
              {skill.name}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export function OrbitalSystem() {
  return (
    <div className="relative mx-auto h-[500px] w-[500px]">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#60a5fa]/30 bg-[#60a5fa]/10">
          <span className="text-center text-[10px] font-semibold leading-tight text-[#60a5fa]">
            Analytics<br />Engineering
          </span>
        </div>
      </motion.div>

      <OrbitalRing ring={1} delay={0.2} />
      <OrbitalRing ring={2} delay={0.5} />
      <OrbitalRing ring={3} delay={0.8} />
    </div>
  );
}
