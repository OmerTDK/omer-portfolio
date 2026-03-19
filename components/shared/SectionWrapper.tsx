import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export function SectionWrapper({ id, children, className }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative min-h-screen px-6 py-24 md:px-12 lg:px-24",
        className
      )}
    >
      {children}
    </section>
  );
}
