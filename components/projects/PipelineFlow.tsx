"use client";

import { motion } from "motion/react";

const stages = [
  { label: "RAW", color: "#60a5fa" },
  { label: "STG", color: "#8b5cf6" },
  { label: "DWH", color: "#22d3ee" },
  { label: "GOLD", color: "#60a5fa" },
];

export function PipelineFlow() {
  return (
    <div className="flex items-center justify-center gap-2 py-8 md:gap-4">
      {stages.map((stage, i) => (
        <div key={stage.label} className="flex items-center gap-2 md:gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.15 }}
            className="flex h-12 w-12 items-center justify-center rounded-lg border text-xs font-semibold md:h-14 md:w-14"
            style={{
              borderColor: `${stage.color}40`,
              backgroundColor: `${stage.color}10`,
              color: stage.color,
            }}
          >
            {stage.label}
          </motion.div>
          {i < stages.length - 1 && (
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.15 + 0.2 }}
              className="h-0.5 w-6 origin-left md:w-12"
              style={{ backgroundColor: `${stage.color}30` }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
