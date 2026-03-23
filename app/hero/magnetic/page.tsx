"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { bio } from "@/lib/data";

interface Dot {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

function MagneticCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const dotsRef = useRef<Dot[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;

    const REPEL_RADIUS = 120;
    const REPEL_FORCE = 8;
    const RETURN_SPEED = 0.04;
    const FRICTION = 0.92;

    function createDots() {
      dotsRef.current = [];
      const text1 = "OMER";
      const text2 = "ZAMAN";

      const fontSize = Math.min(w * 0.18, 200);
      ctx!.font = `900 ${fontSize}px system-ui, sans-serif`;
      ctx!.textAlign = "center";
      ctx!.textBaseline = "middle";

      const offscreen = document.createElement("canvas");
      offscreen.width = w;
      offscreen.height = h;
      const offCtx = offscreen.getContext("2d")!;
      offCtx.fillStyle = "#000";
      offCtx.font = ctx!.font;
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";
      offCtx.fillText(text1, w / 2, h / 2 - fontSize * 0.55);
      offCtx.fillText(text2, w / 2, h / 2 + fontSize * 0.55);

      const imageData = offCtx.getImageData(0, 0, w, h);
      const gap = Math.max(3, Math.floor(w / 400));

      const colors = ["#6366f1", "#3b82f6", "#8b5cf6", "#06b6d4", "#4f46e5"];

      for (let y = 0; y < h; y += gap) {
        for (let x = 0; x < w; x += gap) {
          const idx = (y * w + x) * 4;
          if (imageData.data[idx + 3] > 128) {
            dotsRef.current.push({
              x: x + (Math.random() - 0.5) * w,
              y: y + (Math.random() - 0.5) * h,
              originX: x,
              originY: y,
              vx: 0,
              vy: 0,
              size: 1.5 + Math.random() * 1,
              color: colors[Math.floor(Math.random() * colors.length)],
            });
          }
        }
      }
    }

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      const dpr = Math.min(devicePixelRatio, 2);
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      createDots();
    }
    resize();

    function handleMouse(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    }

    function handleMouseLeave() {
      mouseRef.current = { x: -1000, y: -1000 };
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const dot of dotsRef.current) {
        const dx = dot.x - mx;
        const dy = dot.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (1 - dist / REPEL_RADIUS) * REPEL_FORCE;
          dot.vx += (dx / dist) * force;
          dot.vy += (dy / dist) * force;
        }

        dot.vx += (dot.originX - dot.x) * RETURN_SPEED;
        dot.vy += (dot.originY - dot.y) * RETURN_SPEED;

        dot.vx *= FRICTION;
        dot.vy *= FRICTION;

        dot.x += dot.vx;
        dot.y += dot.vy;

        ctx!.beginPath();
        ctx!.fillStyle = dot.color;
        ctx!.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx!.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    const settleTimeout = setTimeout(() => {
      rafRef.current = requestAnimationFrame(draw);
    }, 100);

    window.addEventListener("mousemove", handleMouse, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", resize);

    return () => {
      clearTimeout(settleTimeout);
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}

export default function MagneticHero() {
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fafafa]">
      <MagneticCanvas />

      <div className="pointer-events-none relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
        <div className="relative mx-auto max-w-5xl text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={entered ? { opacity: 0.5 } : {}}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="mb-6 font-mono text-sm uppercase tracking-[0.4em] text-indigo-500/60"
          >
            Analytics Engineer
          </motion.p>

          {/* Name is rendered by the canvas — leave space */}
          <div className="h-[40vh]" />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={entered ? { opacity: 0.6, y: 0 } : {}}
            transition={{ duration: 1, delay: 1 }}
            className="mx-auto max-w-md text-lg text-neutral-500"
          >
            {bio.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={entered ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="pointer-events-auto mt-10 flex items-center justify-center gap-4"
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
          transition={{ delay: 2, duration: 1 }}
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
