"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"enter" | "exit">("enter");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("exit"), 1200);
    const t2 = setTimeout(onComplete, 1900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-neutral-950"
      animate={phase === "exit" ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="absolute h-[500px] w-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)",
        }}
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: [0.3, 1.3, 1], opacity: [0, 0.7, 0.3] }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      <div className="relative overflow-hidden">
        <motion.span
          className="block bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 bg-clip-text text-6xl font-bold tracking-tighter text-transparent md:text-8xl"
          initial={{ y: 80, opacity: 0 }}
          animate={phase === "enter" ? { y: 0, opacity: 1 } : { y: -60, opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          OZ
        </motion.span>
      </div>
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-indigo-500 via-blue-400 to-cyan-400"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
