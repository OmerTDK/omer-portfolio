"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { User, Wrench, BarChart3, MapPin, Mail, Github, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import { links } from "@/lib/data";

const navLinks = [
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "projects", label: "Projects", icon: BarChart3 },
  { id: "experience", label: "Experience", icon: MapPin },
  { id: "contact", label: "Contact", icon: Mail },
];

export function FrostNav() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    function handleScroll() {
      const ids = navLinks.map((l) => l.id);
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(ids[i]);
          return;
        }
      }
      setActiveSection("");
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="pointer-events-none fixed bottom-0 left-1/2 z-40 mb-6 -translate-x-1/2 sm:top-0 sm:pt-6">
      <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-white/60 bg-white/85 px-1 py-1 shadow-lg shadow-black/8 backdrop-blur-xl">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = activeSection === link.id;
          return (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={cn(
                "relative cursor-pointer rounded-full px-5 py-2 text-sm font-medium transition-colors",
                isActive ? "text-blue-600" : "text-neutral-500 hover:text-neutral-700",
              )}
            >
              <span className="hidden md:inline">{link.label}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="tubelight"
                  className="absolute inset-0 -z-10 w-full rounded-full bg-blue-50"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="absolute -top-2 left-1/2 h-1 w-8 -translate-x-1/2 rounded-t-full bg-blue-500">
                    <div className="absolute -left-2 -top-2 h-6 w-12 rounded-full bg-blue-400/20 blur-md" />
                    <div className="absolute -top-1 h-6 w-8 rounded-full bg-blue-400/20 blur-md" />
                    <div className="absolute left-2 top-0 h-4 w-4 rounded-full bg-blue-400/20 blur-sm" />
                  </div>
                </motion.div>
              )}
            </button>
          );
        })}

        <div className="flex items-center gap-1 border-l border-neutral-200/50 pl-1 lg:hidden">
          {[
            { href: links.github, icon: Github, label: "GitHub" },
            { href: links.linkedin, icon: Linkedin, label: "LinkedIn" },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition-colors hover:text-neutral-700"
            >
              <Icon size={16} strokeWidth={2} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
