import { cn } from "@/lib/utils";

interface SkillBadgeProps {
  name: string;
  ring: 1 | 2 | 3;
}

const ringColors = {
  1: "border-[#60a5fa]/30 text-[#60a5fa] bg-[#60a5fa]/5",
  2: "border-[#8b5cf6]/30 text-[#8b5cf6] bg-[#8b5cf6]/5",
  3: "border-[#22d3ee]/30 text-[#22d3ee] bg-[#22d3ee]/5",
};

export function SkillBadge({ name, ring }: SkillBadgeProps) {
  return (
    <span className={cn("rounded-full border px-3 py-1.5 text-xs font-medium", ringColors[ring])}>
      {name}
    </span>
  );
}
