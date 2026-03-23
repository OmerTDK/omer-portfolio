import { describe, it, expect } from "vitest";
import { bio, skills, projects, experience, links, projectCategories } from "@/lib/data";

describe("bio", () => {
  it("has required fields", () => {
    expect(bio.name).toBeTruthy();
    expect(bio.title).toBeTruthy();
    expect(bio.tagline).toBeTruthy();
    expect(bio.profileImage).toBeTruthy();
    expect(bio.location).toBeTruthy();
    expect(bio.education).toBeTruthy();
  });

  it("has at least 2 about paragraphs", () => {
    expect(bio.about.length).toBeGreaterThanOrEqual(2);
    bio.about.forEach((p) => expect(p.length).toBeGreaterThan(20));
  });

  it("has stats with positive values", () => {
    expect(bio.stats.length).toBeGreaterThanOrEqual(1);
    bio.stats.forEach((stat) => {
      expect(stat.value).toBeGreaterThan(0);
      expect(stat.label).toBeTruthy();
    });
  });
});

describe("skills", () => {
  it("has at least one skill per category", () => {
    const categories = ["core", "data", "infra", "viz"] as const;
    categories.forEach((cat) => {
      const catSkills = skills.filter((s) => s.category === cat);
      expect(catSkills.length).toBeGreaterThanOrEqual(1);
    });
  });

  it("has unique skill names", () => {
    const names = skills.map((s) => s.name);
    expect(new Set(names).size).toBe(names.length);
  });
});

describe("projects", () => {
  it("has required fields on every project", () => {
    projects.forEach((project) => {
      expect(project.title).toBeTruthy();
      expect(project.description).toBeTruthy();
      expect(project.longDescription).toBeTruthy();
      expect(project.tags.length).toBeGreaterThanOrEqual(1);
      expect(project.metric).toBeTruthy();
      expect(project.metricLabel).toBeTruthy();
      expect(["engineering", "science", "analytics"]).toContain(project.category);
    });
  });

  it("has unique project titles", () => {
    const titles = projects.map((p) => p.title);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("has at least one highlighted project", () => {
    const highlighted = projects.filter((p) => p.highlight);
    expect(highlighted.length).toBeGreaterThanOrEqual(1);
  });

  it("github links are valid URLs when present", () => {
    projects.forEach((project) => {
      if (project.github) {
        expect(project.github).toMatch(/^https:\/\/github\.com\//);
      }
    });
  });
});

describe("experience", () => {
  it("has at least one entry", () => {
    expect(experience.length).toBeGreaterThanOrEqual(1);
  });

  it("has exactly one current position", () => {
    const current = experience.filter((e) => e.isCurrent);
    expect(current.length).toBe(1);
  });

  it("has required fields on every entry", () => {
    experience.forEach((entry) => {
      expect(entry.date).toBeTruthy();
      expect(entry.company).toBeTruthy();
      expect(entry.role).toBeTruthy();
      expect(entry.description).toBeTruthy();
    });
  });
});

describe("links", () => {
  it("has github, linkedin, and email", () => {
    expect(links.github).toMatch(/^https:\/\/github\.com\//);
    expect(links.linkedin).toMatch(/^https:\/\/linkedin\.com\//);
    expect(links.email).toMatch(/^mailto:/);
  });
});

describe("projectCategories", () => {
  it("includes highlights and all filters", () => {
    const ids = projectCategories.map((c) => c.id);
    expect(ids).toContain("highlights");
    expect(ids).toContain("all");
  });

  it("every project category has a filter tab", () => {
    const filterIds = projectCategories.map((c) => c.id);
    const projectCats = [...new Set(projects.map((p) => p.category))];
    projectCats.forEach((cat) => {
      expect(filterIds).toContain(cat);
    });
  });
});
