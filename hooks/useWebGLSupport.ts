"use client";

import { useEffect, useState } from "react";

export function useWebGLSupport(): boolean {
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      setSupported(gl !== null);
    } catch {
      setSupported(false);
    }
  }, []);

  return supported;
}
