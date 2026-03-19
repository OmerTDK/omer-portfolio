"use client";

import { useState } from "react";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { links } from "@/lib/data";
import { cn } from "@/lib/utils";

const socialLinks = [
  { href: links.github, icon: Github, label: "GitHub" },
  { href: links.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: links.email, icon: Mail, label: "Email" },
];

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST", body: data, headers: { Accept: "application/json" },
      });
      if (res.ok) { setStatus("sent"); form.reset(); } else { setStatus("error"); }
    } catch { setStatus("error"); }
  }

  return (
    <section id="contact" className="relative px-6 py-32 md:px-12 lg:px-24">
      <div className="section-divider mb-24" />
      <div className="mx-auto max-w-2xl text-center">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-400">Contact</p>
          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">Let&apos;s Connect</h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="mt-4 text-white/40">
            Have a project in mind, a question about data, or just want to say hi?
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <form onSubmit={handleSubmit} className="mt-12 space-y-4 text-left">
            <input type="text" name="name" placeholder="Name" required
              className="w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-cyan-400/30 transition-colors" />
            <input type="email" name="email" placeholder="Email" required
              className="w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-cyan-400/30 transition-colors" />
            <textarea name="message" placeholder="Message" rows={4} required
              className="w-full resize-none rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-cyan-400/30 transition-colors" />
            <button type="submit" disabled={status === "sending" || status === "sent"}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-medium transition-all",
                status === "sent" ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-gradient-to-r from-cyan-500 to-orange-500 text-white hover:from-cyan-400 hover:to-orange-400"
              )}>
              {status === "sending" && "Sending..."}
              {status === "sent" && "Sent!"}
              {status === "error" && "Try again"}
              {status === "idle" && <><span>Send Message</span><Send className="h-4 w-4" /></>}
            </button>
          </form>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mt-12 flex justify-center gap-4">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                className="glass glass-hover flex h-12 w-12 items-center justify-center rounded-full">
                <Icon className="h-5 w-5 text-white/40 transition-colors group-hover:text-white" />
              </a>
            ))}
          </div>
        </ScrollReveal>

        <div className="mt-24 text-center text-xs text-white/20">
          <p>&copy; 2026 Omer Zaman</p>
        </div>
      </div>
    </section>
  );
}
