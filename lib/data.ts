export interface Project {
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  metric: string;
  metricLabel: string;
}

export interface Experience {
  date: string;
  company: string;
  role: string;
  description: string;
  isCurrent: boolean;
}

export interface Skill {
  name: string;
  ring: 1 | 2 | 3;
}

export const bio = {
  name: "Omer Zaman",
  title: "Analytics Engineer",
  tagline: "Building data pipelines that turn raw chaos into clean insights",
  profileImage: "/assets/omer-profile.jpg",
  location: "Berlin, Germany",
  education: "MSc Data Science — Arden University (2025–2026)",
  about: [
    "I'm an analytics engineer at Cloover who bridges the gap between raw data and business decisions. I design and build data pipelines, dimensional models, and analytics workflows that teams actually trust and use.",
    "My daily toolkit includes BigQuery, dbt, Python, and SQL — turning messy source data into clean, tested, documented data products. From building a complete medallion architecture to automating financial reporting for banks, I care deeply about data quality, because wrong numbers are worse than no numbers.",
    "Currently pursuing my MSc in Data Science while building Cloover's data platform from scratch in Berlin. When I'm not building pipelines, I'm exploring how machine learning and statistical modeling can make data even more actionable.",
  ],
  stats: [
    { value: 41, label: "dbt Models", suffix: "" },
    { value: 4, label: "Pipeline Layers", suffix: "" },
    { value: 20, label: "Projects Built", suffix: "+" },
  ],
};

export const skills: Skill[] = [
  { name: "BigQuery", ring: 1 },
  { name: "dbt", ring: 1 },
  { name: "SQL", ring: 1 },
  { name: "Python", ring: 1 },
  { name: "Pandas", ring: 2 },
  { name: "Docker", ring: 2 },
  { name: "GCP", ring: 2 },
  { name: "Metabase", ring: 2 },
  { name: "Git", ring: 3 },
  { name: "Cloud Run", ring: 3 },
  { name: "Terraform", ring: 3 },
  { name: "Airflow", ring: 3 },
];

export const projects: Project[] = [
  {
    title: "Medallion Data Platform",
    description:
      "End-to-end data platform with Bronze→Staging→Silver→Gold architecture processing data from Bubble.io through BigQuery.",
    longDescription:
      "Designed and built a 4-layer medallion architecture processing data from Bubble.io into BigQuery. Staging tables avoid cross-region costs (US→EU), silver views provide zero-storage transformations, and incremental gold tables power daily business reporting. 41 models with full test coverage and schema change detection.",
    tags: ["BigQuery", "dbt", "SQL", "Python"],
    metric: "41",
    metricLabel: "Models",
  },
  {
    title: "BAWAG Financial Reporting",
    description:
      "Automated daily and sale reporting pipeline for BAWAG bank, deployed as scheduled Cloud Run jobs.",
    longDescription:
      "Built automated reporting pipelines that generate daily financial reports and sale reports for BAWAG bank. Runs as scheduled Cloud Run jobs (daily 8 AM weekdays), pulling from BigQuery, transforming with Python/Pandas, and uploading to Google Drive. Includes KYC migration running 3x daily.",
    tags: ["Python", "Cloud Run", "BigQuery", "Pandas"],
    metric: "3x",
    metricLabel: "Daily Runs",
  },
  {
    title: "Data Quality Framework",
    description:
      "Comprehensive testing framework with freshness monitoring, completeness checks, and anomaly detection across all pipeline layers.",
    longDescription:
      "Implemented a multi-layer data quality framework: freshness monitoring on raw sources, unique/not_null tests on all staging keys, referential integrity in DWH, and reconciliation tests in marts. Schema change detection catches source changes before they break downstream models.",
    tags: ["dbt", "SQL", "BigQuery"],
    metric: "100%",
    metricLabel: "Key Coverage",
  },
  {
    title: "Bubble.io Data Operations",
    description:
      "Interactive toolkit for Bubble.io database operations — schema exploration, organization auditing, and bulk data management.",
    longDescription:
      "Built a containerized toolkit with interactive CLI tools for managing Bubble.io data. Includes schema explorer for understanding database structure, organization auditor for data integrity checks, and bulk operations tools — all running in Docker for consistent environments.",
    tags: ["Python", "Docker", "API", "CLI"],
    metric: "3",
    metricLabel: "Tools",
  },
];

export const experience: Experience[] = [
  {
    date: "2024 — Present",
    company: "Cloover",
    role: "Analytics Engineer",
    description:
      "Building the data platform from scratch — medallion architecture (Bronze→Staging→Silver→Gold), automated BAWAG financial reporting, KYC migration pipelines, and a comprehensive data quality framework. Sole data engineer owning the full stack from raw extraction to consumption-layer marts.",
    isCurrent: true,
  },
  {
    date: "2023 — 2024",
    company: "Freelance / Upwork",
    role: "Data Analyst & BI Specialist",
    description:
      "Delivered 20+ data projects for clients spanning dashboards (Power BI, Tableau), predictive modeling (Python), geospatial analysis, and sales strategy analytics. Built interactive Streamlit apps and automated reporting workflows.",
    isCurrent: false,
  },
];

export const links = {
  github: "https://github.com/OmerTDK",
  linkedin: "https://linkedin.com/in/omerzaman",
  email: "mailto:omerzaman98@gmail.com",
};
