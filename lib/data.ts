export interface Project {
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  metric: string;
  metricLabel: string;
  category: "engineering" | "science" | "analytics";
  highlight?: boolean;
  github?: string;
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
  category: "core" | "data" | "infra" | "viz";
}

export const bio = {
  name: "Omer Zaman",
  title: "Analytics Engineer",
  tagline: "The bridge between raw data and real decisions.",
  profileImage: "/assets/omer-profile.jpg",
  location: "Berlin, Germany",
  education: "MSc Data Science — Arden University (Graduated)",
  about: [
    "I build the data infrastructure that teams depend on for real decisions. At a Berlin-based fintech startup, I designed the entire data platform from scratch — a medallion architecture processing production data through four transformation layers into business-ready analytics.",
    "My work spans the full data lifecycle: extraction pipelines, dimensional modeling with dbt, automated financial reporting for banking partners, and data quality frameworks that catch problems before they reach stakeholders.",
    "With a freshly completed MSc in Data Science and 4+ years of hands-on experience across freelance, enterprise, and startup environments, I bridge the gap between engineering rigor and statistical modeling.",
  ],
  stats: [
    { value: 32, label: "Projects Delivered", suffix: "+" },
    { value: 10, label: "Clients", suffix: "+" },
  ],
};

export const skills: Skill[] = [
  { name: "SQL", category: "core" },
  { name: "Python", category: "core" },
  { name: "dbt", category: "core" },
  { name: "BigQuery", category: "core" },
  { name: "Pandas", category: "data" },
  { name: "NumPy", category: "data" },
  { name: "Scikit-learn", category: "data" },
  { name: "TensorFlow", category: "data" },
  { name: "GCP", category: "infra" },
  { name: "Docker", category: "infra" },
  { name: "Cloud Run", category: "infra" },
  { name: "Git", category: "infra" },
  { name: "Metabase", category: "viz" },
  { name: "Streamlit", category: "viz" },
  { name: "Plotly", category: "viz" },
  { name: "Power BI", category: "viz" },
];

export const projects: Project[] = [
  {
    title: "Medallion Data Platform",
    description: "End-to-end 4-layer data architecture (Bronze → Staging → Silver → Gold) processing production data into analytics-ready tables.",
    longDescription: "Designed and built the complete data platform for a fintech startup. Staging tables bridge cross-region data (US→EU), silver views provide zero-storage transformations, and incremental gold tables power daily reporting. Full test coverage with schema change detection across all layers.",
    tags: ["BigQuery", "dbt", "SQL", "Python"],
    metric: "41",
    metricLabel: "Models",
    category: "engineering",
    highlight: true,
  },
  {
    title: "Automated Financial Reporting",
    description: "Scheduled reporting pipelines generating daily financial and compliance reports for a banking partner.",
    longDescription: "Built automated pipelines running as scheduled Cloud Run jobs — daily financial reports and compliance migration running 3x daily. Pulls from BigQuery, transforms with Python/Pandas, and delivers to secure file storage. Zero manual intervention.",
    tags: ["Python", "Cloud Run", "BigQuery", "Pandas"],
    metric: "3x",
    metricLabel: "Daily Runs",
    category: "engineering",
  },
  {
    title: "Data Quality Framework",
    description: "Multi-layer testing framework with freshness monitoring, completeness checks, and anomaly detection.",
    longDescription: "Comprehensive quality gates across every pipeline layer: freshness monitoring on raw sources, unique/not_null tests on all keys, referential integrity checks, and reconciliation tests. Schema change detection catches upstream changes before they break anything downstream.",
    tags: ["dbt", "SQL", "BigQuery"],
    metric: "100%",
    metricLabel: "Key Coverage",
    category: "engineering",
  },
  {
    title: "Deal Volume Forecasting",
    description: "Statistical forecasting pipeline predicting weekly and monthly deal volumes using cohort analysis and bootstrap resampling.",
    longDescription: "Built a production forecasting system running four modes: official Monday forecasts, daily tracking, revised Tue-Fri updates, and deploy smoke tests. Uses cohort conversion rates, pace-weighted intra-week revisions, and bootstrap resampling (1,000 iterations) for confidence intervals. Validated through 9 experimental rounds with 211 unit tests.",
    tags: ["Python", "NumPy", "BigQuery", "Statistics", "Cloud Run"],
    metric: "12.5%",
    metricLabel: "Monthly MAPE",
    category: "science",
    highlight: true,
  },
  {
    title: "AI Document Extraction",
    description: "Automated extraction of 28 structured fields from technical PDF documents using Gemini AI with intelligent fallbacks.",
    longDescription: "Built a pipeline that processes installer-uploaded PDF/image documents using Google Gemini AI to extract structured equipment specifications (solar panels, inverters, batteries, heat pumps). Uses text-first extraction with image fallback for scanned PDFs, Pydantic schema validation, and auto-retry logic. Processes 10 projects per run with results stored in BigQuery.",
    tags: ["Python", "Gemini AI", "BigQuery", "Pydantic", "Cloud Run"],
    metric: "28",
    metricLabel: "Fields Extracted",
    category: "engineering",
    highlight: true,
  },
  {
    title: "Executive KPI Dashboard",
    description: "Cross-platform KPI aggregator pulling from BigQuery, CRM, and HR systems into unified analytics.",
    longDescription: "Aggregates 20+ KPIs from three sources (BigQuery for finance, HubSpot CRM for sales, Personio for HR) into a single partitioned BigQuery table. Includes period-over-period comparisons across 6 departments: Finance, Sales, Operations, Energy, Product, and HR. Tracks metrics like DPD 90+ rate, expected credit loss, take rate, DAU/MAU, revenue, and runway.",
    tags: ["Python", "BigQuery", "HubSpot API", "Personio API"],
    metric: "20+",
    metricLabel: "KPIs Tracked",
    category: "analytics",
    highlight: true,
  },
  {
    title: "Tax Invoice Parser",
    description: "High-performance deterministic PDF parser extracting structured line items from tax invoices at 100ms per document.",
    longDescription: "Built a zero-AI invoice extraction pipeline using deterministic regex patterns on extracted PDF text. Outputs structured CSV with header fields, amounts, and VAT breakdowns per line item. Achieves ~99.9% accuracy at ~100ms per invoice ($0 cost per extraction vs $0.01+ for AI alternatives). Includes resume capability for incremental processing across runs.",
    tags: ["Python", "pdfplumber", "BigQuery", "Regex"],
    metric: "100ms",
    metricLabel: "Per Invoice",
    category: "engineering",
    highlight: true,
  },
  {
    title: "Banking Loan Sale Automation",
    description: "End-to-end regulatory-grade report generation for a banking partner's loan purchase process.",
    longDescription: "Automated the entire loan sale reporting workflow: queries BigQuery for eligible contracts, applies manual and automated exclusions, runs 6+ categories of validation rules across customer and offer data, computes age-at-maturity filtering, and produces a formatted 9-tab Google Sheets workbook with automated discrepancy detection and Slack notifications.",
    tags: ["Python", "BigQuery", "Google Sheets API", "Cloud Run"],
    metric: "9",
    metricLabel: "Report Tabs",
    category: "engineering",
  },
  {
    title: "Paris Housing Price Prediction",
    description: "ML-powered predictive modeling for housing prices using feature engineering and multiple regression models.",
    longDescription: "Built a predictive model examining the relationship between property features (bedrooms, living area, location) and sale prices. Compared multiple ML approaches, performed feature engineering, and achieved strong predictive accuracy on the test set.",
    tags: ["Python", "Scikit-learn", "Pandas", "ML"],
    metric: "R²",
    metricLabel: "Optimized",
    category: "science",
    github: "https://github.com/OmerTDK/Paris-Housing-Analysis",
  },
  {
    title: "Geospatial Restaurant Analysis",
    description: "EDA and sentiment analysis of Bangalore's restaurant scene using geospatial data and NLP techniques.",
    longDescription: "Combined exploratory data analysis with geospatial visualization and sentiment analysis to uncover insights about restaurant distribution, pricing patterns, and customer satisfaction across Bangalore neighborhoods.",
    tags: ["Python", "Pandas", "NLP", "Geospatial"],
    metric: "10K+",
    metricLabel: "Records",
    category: "science",
    github: "https://github.com/OmerTDK/Geospatial-Analysis",
  },
  {
    title: "Neural Network Comparison",
    description: "Head-to-head comparison of ReLU vs Tanh activation functions on MNIST digit classification.",
    longDescription: "Systematic comparison of neural network architectures on the MNIST dataset, evaluating how activation function choice (ReLU vs Tanh) affects convergence speed, accuracy, and training stability using TensorFlow/Keras.",
    tags: ["TensorFlow", "Keras", "Python", "Deep Learning"],
    metric: "98%",
    metricLabel: "Accuracy",
    category: "science",
    github: "https://github.com/OmerTDK/mnist-neural-networks",
  },
  {
    title: "Interactive Sales Dashboard",
    description: "Real-time sales analytics dashboard built with Streamlit for exploring KPIs and trends.",
    longDescription: "Built an interactive web dashboard using Streamlit that lets users explore sales data through dynamic filters, KPI cards, and trend visualizations. Deployed as a self-service tool for business stakeholders.",
    tags: ["Python", "Streamlit", "Plotly"],
    metric: "Live",
    metricLabel: "Interactive",
    category: "analytics",
    github: "https://github.com/OmerTDK/Streamlit-Sales-Dashboard",
  },
  {
    title: "E-Commerce Sales Strategy",
    description: "Data-driven sales strategy analysis for a major retailer using 2019-2020 transaction data.",
    longDescription: "Analyzed monthly sales patterns, product category performance, and regional trends from K-mart transaction data to derive actionable strategic recommendations for inventory and marketing optimization.",
    tags: ["Python", "Pandas", "Data Analysis"],
    metric: "2yr",
    metricLabel: "Data Span",
    category: "analytics",
    github: "https://github.com/OmerTDK/E-commerce-Data-Analysis-for-Sales-Strategy",
  },
  {
    title: "Personal Finance Tracker",
    description: "Expense tracking and financial analysis tool for personal budget management and decision-making.",
    longDescription: "Built a personal finance analysis system that categorizes expenses, identifies spending patterns, and provides insights for better financial decision-making. The most popular project on my GitHub with community contributions.",
    tags: ["Python", "Data Analysis", "Visualization"],
    metric: "4",
    metricLabel: "Stars",
    category: "analytics",
    github: "https://github.com/OmerTDK/Personal-Finance-Analysis-Project",
  },
];

export const experience: Experience[] = [
  {
    date: "Aug 2025 — Present",
    company: "Fintech Startup · Berlin, Germany",
    role: "Data Scientist",
    description: "Building the data platform from scratch — medallion architecture (Bronze→Gold), automated financial reporting for banking partners, compliance pipelines, and a comprehensive data quality framework. Sole data engineer owning the full stack from raw extraction to consumption-layer marts.",
    isCurrent: true,
  },
  {
    date: "Oct 2023 — Dec 2024",
    company: "Healthcare Provider · US (Remote)",
    role: "Data Analyst I",
    description: "Contract role supporting healthcare data operations. Built analytical workflows, developed reporting solutions, and contributed to data-driven decision making across the organization.",
    isCurrent: false,
  },
  {
    date: "Sep 2023 — Feb 2025",
    company: "Data Solutions Firm · US (Remote)",
    role: "Data Analyst",
    description: "Full-time data analyst role delivering dashboards, data pipelines, and analytical insights. Worked across multiple data tools and platforms to support business intelligence needs.",
    isCurrent: false,
  },
  {
    date: "Jun 2022 — Aug 2025",
    company: "Freelance · Remote",
    role: "Freelance Data Scientist",
    description: "Delivered 20+ data projects for clients spanning dashboards (Power BI, Tableau), predictive modeling (Python), geospatial analysis, and sales strategy analytics. Built interactive Streamlit apps and automated reporting workflows.",
    isCurrent: false,
  },
];

export const links = {
  github: "https://github.com/OmerTDK",
  linkedin: "https://linkedin.com/in/omerzaman",
  email: "mailto:omerzaman98@gmail.com",
};

export const projectCategories = [
  { id: "highlights", label: "Highlights" },
  { id: "all", label: "All" },
  { id: "engineering", label: "Data Engineering" },
  { id: "science", label: "Data Science" },
  { id: "analytics", label: "Analytics" },
] as const;
