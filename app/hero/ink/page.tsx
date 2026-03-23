"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { bio } from "@/lib/data";

interface InkDrop {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  hue: number;
  speed: number;
  born: number;
}

function InkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dropsRef = useRef<InkDrop[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      const dpr = Math.min(devicePixelRatio, 2);
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    function spawnDrop() {
      const hues = [220, 250, 200, 260, 180];
      dropsRef.current.push({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: 0,
        maxRadius: 60 + Math.random() * 180,
        opacity: 0.15 + Math.random() * 0.15,
        hue: hues[Math.floor(Math.random() * hues.length)],
        speed: 0.3 + Math.random() * 0.8,
        born: performance.now(),
      });
    }

    for (let i = 0; i < 8; i++) {
      const drop: InkDrop = {
        x: Math.random() * w,
        y: Math.random() * h,
        radius: 60 + Math.random() * 120,
        maxRadius: 60 + Math.random() * 180,
        opacity: 0.08 + Math.random() * 0.08,
        hue: [220, 250, 200, 260, 180][i % 5],
        speed: 0,
        born: 0,
      };
      dropsRef.current.push(drop);
    }

    const spawnInterval = setInterval(spawnDrop, 2000);

    function draw() {
      ctx!.fillStyle = "rgba(250, 250, 250, 0.03)";
      ctx!.fillRect(0, 0, w, h);

      for (let i = dropsRef.current.length - 1; i >= 0; i--) {
        const drop = dropsRef.current[i];

        if (drop.speed > 0) {
          drop.radius += drop.speed;
          if (drop.radius > drop.maxRadius) {
            drop.opacity *= 0.995;
          }
        }

        if (drop.opacity < 0.005) {
          dropsRef.current.splice(i, 1);
          continue;
        }

        const grad = ctx!.createRadialGradient(
          drop.x, drop.y, 0,
          drop.x, drop.y, drop.radius,
        );
        grad.addColorStop(0, `hsla(${drop.hue}, 70%, 60%, ${drop.opacity})`);
        grad.addColorStop(0.4, `hsla(${drop.hue}, 60%, 55%, ${drop.opacity * 0.6})`);
        grad.addColorStop(0.7, `hsla(${drop.hue}, 50%, 50%, ${drop.opacity * 0.2})`);
        grad.addColorStop(1, `hsla(${drop.hue}, 40%, 50%, 0)`);

        ctx!.beginPath();
        ctx!.fillStyle = grad;
        ctx!.arc(drop.x, drop.y, drop.radius, 0, Math.PI * 2);
        ctx!.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearInterval(spawnInterval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}

export default function InkHero() {
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fafafa]">
      <InkCanvas />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
        <div className="relative mx-auto max-w-5xl text-center">
          <motion.p
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={entered ? { opacity: 0.5, filter: "blur(0px)" } : {}}
            transition={{ duration: 2, delay: 0.3 }}
            className="mb-8 font-mono text-sm uppercase tracking-[0.4em] text-indigo-500/60"
          >
            Analytics Engineer
          </motion.p>

          <h1 className="text-7xl font-bold tracking-tighter md:text-9xl lg:text-[11rem]">
            {["Omer", "Zaman"].map((word, wi) => (
              <span key={word} className="block overflow-hidden">
                <motion.span
                  className={wi === 1 ? "block bg-gradient-to-r from-blue-600 via-violet-500 to-cyan-500 bg-clip-text text-transparent" : "block text-neutral-900"}
                  initial={{ y: "100%", filter: "blur(20px)" }}
                  animate={entered ? { y: "0%", filter: "blur(0px)" } : {}}
                  transition={{ duration: 1.2, delay: 0.6 + wi * 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={entered ? { opacity: 0.6 } : {}}
            transition={{ duration: 1.5, delay: 1.4 }}
            className="mx-auto mt-8 max-w-md text-lg text-neutral-500"
          >
            {bio.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={entered ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="mt-10 flex items-center justify-center gap-4"
          >
            <a href="#" className="rounded-full bg-neutral-900 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800">
              View my work
            </a>
            <a href="#" className="rounded-full border border-neutral-300 px-8 py-3 text-sm font-medium text-neutral-600 transition-colors hover:border-neutral-400">
              Get in touch
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={entered ? { opacity: 0.4 } : {}}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronDown className="h-5 w-5 text-neutral-400" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
