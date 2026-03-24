import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("motion/react", () => ({
  motion: new Proxy(
    {},
    {
      get: (_target, prop) => {
        if (prop === "div" || prop === "span" || prop === "p" || prop === "a") {
          const MotionComponent = ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
            const { initial: _i, animate: _a, exit: _e, transition: _t, whileInView: _w, viewport: _v, whileHover: _wh, whileTap: _wt, layoutId: _l, layout: _la, ...rest } = props;
            const Tag = prop as keyof JSX.IntrinsicElements;
            return <Tag {...rest}>{children}</Tag>;
          };
          MotionComponent.displayName = `motion.${String(prop)}`;
          return MotionComponent;
        }
        return undefined;
      },
    },
  ),
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
  useInView: () => true,
}));

vi.mock("@number-flow/react", () => ({
  default: ({ value }: { value: number }) => <span data-testid="number-flow">{value}</span>,
}));

vi.mock("@/components/shared/ScrollReveal", () => ({
  ScrollReveal: ({ children }: React.PropsWithChildren) => <div>{children}</div>,
}));

describe("SkillsSection", () => {
  it("renders all skill categories", async () => {
    const { SkillsSection } = await import("@/components/skills/SkillsSection");
    render(<SkillsSection />);
    expect(screen.getByText("Core Stack")).toBeInTheDocument();
    expect(screen.getByText("Data Science")).toBeInTheDocument();
    expect(screen.getByText("Infrastructure")).toBeInTheDocument();
    expect(screen.getByText("Visualization")).toBeInTheDocument();
  });

  it("renders skill names", async () => {
    const { SkillsSection } = await import("@/components/skills/SkillsSection");
    render(<SkillsSection />);
    expect(screen.getByText("SQL")).toBeInTheDocument();
    expect(screen.getByText("Python")).toBeInTheDocument();
    expect(screen.getByText("BigQuery")).toBeInTheDocument();
  });
});

describe("ExperienceSection", () => {
  it("renders experience entries", async () => {
    const { ExperienceSection } = await import("@/components/experience/ExperienceSection");
    render(<ExperienceSection />);
    expect(screen.getByText("Experience")).toBeInTheDocument();
    expect(screen.getByText("Data Scientist")).toBeInTheDocument();
  });
});

describe("ImpactBanner", () => {
  it("renders impact stats", async () => {
    const { ImpactBanner } = await import("@/components/experience/ImpactBanner");
    render(<ImpactBanner />);
    expect(screen.getByText("4+")).toBeInTheDocument();
    expect(screen.getByText("Years Experience")).toBeInTheDocument();
    expect(screen.getByText("41")).toBeInTheDocument();
  });
});

describe("Footer", () => {
  it("renders footer with attribution", async () => {
    const { Footer } = await import("@/components/layout/Footer");
    render(<Footer />);
    expect(screen.getByText("Built by Omer Zaman")).toBeInTheDocument();
    expect(screen.getByLabelText("GitHub")).toBeInTheDocument();
    expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
    expect(screen.getByLabelText("Back to top")).toBeInTheDocument();
  });
});
