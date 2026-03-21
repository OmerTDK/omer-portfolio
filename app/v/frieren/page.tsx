"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";
import { bio, links } from "@/lib/data";

/* ---------------------------------------------------------------------------
   PARTICLE SYSTEM — Frieren-inspired magical particles
   Each particle: soft glow, drifts upward, fades, mouse-reactive
   --------------------------------------------------------------------------- */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  maxOpacity: number;
  life: number;
  maxLife: number;
  hue: number;
  glow: number;
  phase: number;
}

const PARTICLE_COUNT = 120;
const COLORS = [
  { h: 220, s: 80, l: 72 }, // soft blue
  { h: 260, s: 65, l: 75 }, // lavender
  { h: 180, s: 60, l: 70 }, // cyan
  { h: 45, s: 70, l: 75 },  // warm gold
  { h: 300, s: 40, l: 78 }, // soft pink
];

function createParticle(canvas: HTMLCanvasElement, fromText?: boolean): Particle {
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  const maxLife = 200 + Math.random() * 300;

  return {
    x: fromText
      ? canvas.width * 0.3 + Math.random() * canvas.width * 0.4
      : Math.random() * canvas.width,
    y: fromText
      ? canvas.height * 0.4 + Math.random() * canvas.height * 0.2
      : canvas.height + Math.random() * 50,
    vx: (Math.random() - 0.5) * 0.3,
    vy: -(0.3 + Math.random() * 0.8),
    size: 1.5 + Math.random() * 3,
    opacity: 0,
    maxOpacity: 0.3 + Math.random() * 0.5,
    life: 0,
    maxLife,
    hue: color.h,
    glow: 8 + Math.random() * 16,
    phase: Math.random() * Math.PI * 2,
  };
}

function FreirenCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const dprRef = useRef(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    dprRef.current = dpr;

    function resize() {
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      canvas!.style.width = `${window.innerWidth}px`;
      canvas!.style.height = `${window.innerHeight}px`;
      ctx!.scale(dpr, dpr);
    }
    resize();

    // Initialize particles
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () =>
      createParticle(canvas)
    );
    // Stagger initial positions
    particlesRef.current.forEach((p, i) => {
      p.y = Math.random() * window.innerHeight;
      p.life = Math.random() * p.maxLife;
    });

    function handleMouse(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    }

    function draw() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx!.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i];

        // Age particle
        p.life++;

        // Fade in then out
        const lifeRatio = p.life / p.maxLife;
        if (lifeRatio < 0.15) {
          p.opacity = (lifeRatio / 0.15) * p.maxOpacity;
        } else if (lifeRatio > 0.7) {
          p.opacity = ((1 - lifeRatio) / 0.3) * p.maxOpacity;
        } else {
          p.opacity = p.maxOpacity;
        }

        // Gentle wave motion
        const wave = Math.sin(p.life * 0.02 + p.phase) * 0.3;
        p.x += p.vx + wave;
        p.y += p.vy;

        // Mouse repulsion — gentle push
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150 && dist > 0) {
          const force = (1 - dist / 150) * 0.8;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
          // Glow brighter near cursor
          p.opacity = Math.min(p.opacity * 1.5, 0.9);
        }

        // Reset when dead or off screen
        if (p.life >= p.maxLife || p.y < -20 || p.x < -20 || p.x > w + 20) {
          particlesRef.current[i] = createParticle(canvas!);
        }

        // Draw particle with glow
        const color = COLORS.find(c => c.h === p.hue) || COLORS[0];
        ctx!.save();
        ctx!.globalAlpha = p.opacity * 0.3;
        ctx!.shadowBlur = p.glow;
        ctx!.shadowColor = `hsla(${color.h}, ${color.s}%, ${color.l}%, 0.8)`;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size + p.glow * 0.2, 0, Math.PI * 2);
        ctx!.fillStyle = `hsla(${color.h}, ${color.s}%, ${color.l}%, 0.15)`;
        ctx!.fill();
        ctx!.restore();

        // Core dot
        ctx!.save();
        ctx!.globalAlpha = p.opacity;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = `hsla(${color.h}, ${color.s}%, ${color.l}%, 1)`;
        ctx!.fill();
        ctx!.restore();
      }

      // Ambient glow spots — large, faint, atmospheric
      const time = Date.now() * 0.0003;
      const glows = [
        { x: w * 0.2, y: h * 0.3, r: 250, h: 260, o: 0.03 + Math.sin(time) * 0.01 },
        { x: w * 0.7, y: h * 0.6, r: 300, h: 220, o: 0.025 + Math.sin(time + 2) * 0.01 },
        { x: w * 0.5, y: h * 0.5, r: 200, h: 45, o: 0.02 + Math.sin(time + 4) * 0.008 },
      ];
      for (const g of glows) {
        const grad = ctx!.createRadialGradient(g.x, g.y, 0, g.x, g.y, g.r);
        grad.addColorStop(0, `hsla(${g.h}, 60%, 70%, ${g.o})`);
        grad.addColorStop(1, "transparent");
        ctx!.fillStyle = grad;
        ctx!.fillRect(0, 0, w, h);
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    draw();
    window.addEventListener("mousemove", handleMouse, { passive: true });
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: "linear-gradient(180deg, #0a0a12 0%, #0d0d1a 40%, #0f0f1f 100%)" }}
    />
  );
}

/* ---------------------------------------------------------------------------
   TEXT REVEAL — letters materialize with particle burst
   --------------------------------------------------------------------------- */

function LetterReveal({
  text,
  className,
  delay = 0,
  stagger = 0.08,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            delay: delay + i * stagger,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

/* ---------------------------------------------------------------------------
   FRIEREN HERO PAGE
   --------------------------------------------------------------------------- */

export default function FreirenHero() {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <FreirenCanvas />

      {/* Content overlay */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
        {/* Subtle top vignette */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />

        <div className="relative text-center max-w-5xl mx-auto">
          {/* Role */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={entered ? { opacity: 0.5 } : { opacity: 0 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="font-mono text-sm uppercase tracking-[0.4em] text-blue-300/80 mb-10"
          >
            Analytics Engineer
          </motion.p>

          {/* Name — letter by letter with blur dissolve */}
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-[0.85]">
            {entered && (
              <>
                <LetterReveal
                  text="Omer"
                  delay={0.6}
                  stagger={0.07}
                  className="block text-white/90"
                />
                <LetterReveal
                  text="Zaman"
                  delay={1.0}
                  stagger={0.07}
                  className="block bg-gradient-to-r from-blue-300 via-purple-300 to-amber-200 bg-clip-text text-transparent"
                />
              </>
            )}
          </h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={entered ? { opacity: 0.6, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1, delay: 1.8 }}
            className="mt-10 mx-auto max-w-md text-lg text-neutral-400 font-light"
          >
            {bio.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.8, delay: 2.2 }}
            className="mt-12 flex items-center justify-center gap-5"
          >
            <a
              href="#"
              className="group relative px-8 py-3 rounded-full text-sm font-medium text-white overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-amber-500/20 border border-white/10 rounded-full backdrop-blur-sm" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/40 via-purple-500/40 to-amber-500/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative">View my work</span>
            </a>
            <a
              href="#"
              className="px-8 py-3 rounded-full text-sm font-medium text-white/50 border border-white/10 hover:text-white/80 hover:border-white/20 transition-all duration-300"
            >
              Get in touch
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={entered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 2.6 }}
            className="mt-16 flex items-center justify-center gap-6"
          >
            {[
              { href: links.github, icon: Github, label: "GitHub" },
              { href: links.linkedin, icon: Linkedin, label: "LinkedIn" },
              { href: links.email, icon: Mail, label: "Email" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                aria-label={label}
                className="text-white/20 hover:text-white/60 transition-colors duration-300"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={entered ? { opacity: 0.4 } : { opacity: 0 }}
          transition={{ delay: 3, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-3"
          >
            <span className="text-[10px] text-white/30 tracking-[0.3em] uppercase">Scroll</span>
            <ChevronDown className="h-4 w-4 text-white/30" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
