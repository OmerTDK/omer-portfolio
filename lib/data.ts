export interface Project {
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  metric: string;
  metricLabel: string;
  category: "engineering" | "science" | "analytics";
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
  tagline: "Building data pipelines that turn raw chaos into clean insights",
  profileImage: "/assets/omer-profile.jpg",
  location: "Berlin, Germany",
  education: "MSc Data Science — Arden University",
  about: [
    "I build the data infrastructure that teams depend on for real decisions. At a Berlin-based fintech startup, I designed the entire data platform from scratch — a medallion architecture processing production data through four transformation layers into business-ready analytics.",
    "My work spans the full data lifecycle: extraction pipelines, dimensional modeling with dbt, automated financial reporting for banking partners, and data quality frameworks that catch problems before they reach stakeholders.",
    "Currently deepening my expertise with an MSc in Data Science, bridging the gap between engineering rigor and statistical modeling.",
  ],
  stats: [
    { value: 41, label: "dbt Models", suffix: "" },
    { value: 4, label: "Pipeline Layers", suffix: "" },
    { value: 20, label: "Projects", suffix: "+" },
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
    date: "2024 — Present",
    company: "Fintech Startup · Berlin",
    role: "Analytics Engineer",
    description: "Building the data platform from scratch — medallion architecture, automated financial reporting, compliance pipelines, and a comprehensive data quality framework. Sole data engineer owning the full stack from raw extraction to consumption-layer marts.",
    isCurrent: true,
  },
  {
    date: "2023 — 2024",
    company: "Freelance · Remote",
    role: "Data Analyst & BI Specialist",
    description: "Delivered 20+ data projects for clients — dashboards, predictive models, geospatial analysis, and sales strategy analytics. Built interactive Streamlit apps and automated reporting workflows.",
    isCurrent: false,
  },
];

export const links = {
  github: "https://github.com/OmerTDK",
  linkedin: "https://linkedin.com/in/omerzaman",
  email: "mailto:omerzaman98@gmail.com",
};

export const projectCategories = [
  { id: "all", label: "All" },
  { id: "engineering", label: "Data Engineering" },
  { id: "science", label: "Data Science" },
  { id: "analytics", label: "Analytics" },
] as const;
