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
      className="glass glass-hover rounded-xl p-6 cursor-pointer transition-all"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-[#f5f5f5]">{project.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-[#a3a3a3]">{project.description}</p>
        </div>
        <div className="ml-4 text-right">
          <span className="font-mono text-2xl font-bold text-[#22d3ee]">{project.metric}</span>
          <p className="text-xs text-[#737373]">{project.metricLabel}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-white/5 bg-white/5 px-2.5 py-0.5 text-xs text-[#737373]">
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
          className="mt-3 inline-flex items-center gap-1 text-xs text-[#22d3ee] hover:underline"
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
            <p className="mt-4 border-t border-white/5 pt-4 text-sm leading-relaxed text-[#a3a3a3]">
              {project.longDescription}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
