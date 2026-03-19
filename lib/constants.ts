export const colors = {
  bgDeep: "#020617",
  bgBase: "#050810",
  bgSurface: "#0a0e1a",
  border: "#1a2040",
  textPrimary: "#f1f5f9",
  textSecondary: "#94a3b8",
  textMuted: "#64748b",
  accentBlue: "#60a5fa",
  accentViolet: "#8b5cf6",
  accentCyan: "#22d3ee",
} as const;

export const motion = {
  hover: { duration: 0.2, ease: "easeOut" },
  entrance: { duration: 0.6, ease: "easeOut" },
  scroll: { duration: 0.8, ease: "easeInOut" },
} as const;

export const breakpoints = {
  mobile: 768,
  tablet: 1024,
} as const;

export const sections = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;
