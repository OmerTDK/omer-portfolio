"use client";

import { useScroll, useMotionValueEvent, MotionValue } from "motion/react";
import { useState } from "react";

export function useScrollProgress(): number {
  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setProgress(latest);
  });

  return progress;
}

export function useElementScroll(
  ref: React.RefObject<HTMLElement | null>
): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  return scrollYProgress;
}
