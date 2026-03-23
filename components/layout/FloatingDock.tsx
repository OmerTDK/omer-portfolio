"use client";

import { motion } from "motion/react";
import { Github, Linkedin, Mail } from "lucide-react";
import { links } from "@/lib/data";

const dockItems = [
  { href: links.github, icon: Github, label: "GitHub" },
  { href: links.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: links.email, icon: Mail, label: "Email" },
];

export function FloatingDock() {
  return (
    <div className="pointer-events-none fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
      <div className="pointer-events-auto flex flex-col items-center gap-2 rounded-2xl border border-white/60 bg-white/85 px-2 py-3 shadow-lg shadow-black/10 backdrop-blur-xl">
        {dockItems.map(({ href, icon: Icon, label }) => (
          <motion.a
            key={label}
            href={href}
            target={href.startsWith("mailto") ? undefined : "_blank"}
            rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
            aria-label={label}
            whileHover={{ scale: 1.3, x: 8 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-white/60 text-neutral-500 shadow-sm shadow-black/5 transition-colors hover:text-neutral-900 hover:shadow-md"
          >
            <Icon className="h-4 w-4" />
          </motion.a>
        ))}
      </div>
    </div>
  );
}
