"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

interface StatCardProps {
  stats: Array<{ value: number; label: string; suffix: string }>;
}

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const startTime = performance.now();

    function animate(time: number) {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }, [inView, value]);

  return (
    <span ref={ref} className="font-mono text-3xl font-bold text-[#60a5fa]">
      {count}{suffix}
    </span>
  );
}

export function StatCard({ stats }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="rounded-xl border border-[#1a2040] bg-[#0a0e1a]/80 p-6 backdrop-blur-sm"
    >
      <div className="grid grid-cols-1 gap-6">
        {stats.map((stat) => (
          <div key={stat.label}>
            <AnimatedNumber value={stat.value} suffix={stat.suffix} />
            <p className="mt-1 text-xs uppercase tracking-wider text-[#64748b]">{stat.label}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
