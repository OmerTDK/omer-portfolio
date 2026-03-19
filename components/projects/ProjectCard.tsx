"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink } from "lucide-react";
import type { Project } from "@/lib/data";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group cursor-pointer rounded-xl border border-[#1a2040] bg-[#0a0e1a]/60 p-6 backdrop-blur-sm transition-all hover:border-[#60a5fa]/30 hover:shadow-[0_0_30px_rgba(96,165,250,0.05)]"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-[#f1f5f9]">{project.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-[#94a3b8]">{project.description}</p>
        </div>
        <div className="ml-4 text-right">
          <span className="font-mono text-2xl font-bold text-[#60a5fa]">{project.metric}</span>
          <p className="text-xs text-[#64748b]">{project.metricLabel}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-[#1a2040] bg-[#050810] px-2.5 py-0.5 text-xs text-[#64748b]">
            {tag}
          </span>
        ))}
      </div>
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="mt-3 inline-flex items-center gap-1 text-xs text-[#60a5fa] hover:underline"
        >
          View on GitHub <ExternalLink className="h-3 w-3" />
        </a>
      )}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="mt-4 border-t border-[#1a2040] pt-4 text-sm leading-relaxed text-[#94a3b8]">
              {project.longDescription}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
