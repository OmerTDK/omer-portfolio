"use client";

import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { links } from "@/lib/data";

export function Footer() {
  return (
    <footer className="relative px-6 pb-12 pt-8 md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 h-px bg-neutral-200/40" />
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-neutral-500">Built by Omer Zaman</p>
          <div className="flex items-center gap-4">
            {[
              { href: links.github, icon: Github, label: "GitHub" },
              { href: links.linkedin, icon: Linkedin, label: "LinkedIn" },
              { href: links.email, icon: Mail, label: "Email" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-neutral-500 transition-colors hover:text-neutral-800"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="ml-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/60 bg-white/85 shadow-sm shadow-black/8 backdrop-blur-xl transition-all hover:bg-white/80"
              aria-label="Back to top"
            >
              <ArrowUp className="h-3.5 w-3.5 text-neutral-500" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
