import express from "express";
import path from "path";
import nunjucks from "nunjucks";
import fs from "fs";
import nodemailer from "nodemailer";

const app = express();
const PORT = 3000;

// Configure body parsing with generous limit for photo uploads
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Configure Nunjucks view engine for templates directory
nunjucks.configure(path.join(process.cwd(), "templates"), {
  autoescape: true,
  express: app,
  watch: false
});

// ---------------------------------------------------------------------------
// DEDICATED RESUME DOWNLOAD & VIEW ENDPOINTS
// ---------------------------------------------------------------------------
function sendResumePdf(req: express.Request, res: express.Response, inline: boolean = false) {
  const resumePath = path.join(process.cwd(), "resources", "Sachin_Kumar_Resume.pdf");
  if (!fs.existsSync(resumePath)) {
    return res.status(404).send("Resume PDF file not found.");
  }
  const fileBuffer = fs.readFileSync(resumePath);
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `${inline ? "inline" : "attachment"}; filename="Sachin_Kumar_Resume.pdf"`
  );
  res.setHeader("Content-Length", fileBuffer.length);
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.send(fileBuffer);
}

app.get("/download-resume", (req, res) => sendResumePdf(req, res, false));
app.get("/api/resume/download", (req, res) => sendResumePdf(req, res, false));
app.get("/Sachin_Kumar_Resume.pdf", (req, res) => sendResumePdf(req, res, false));
app.get("/view-resume", (req, res) => sendResumePdf(req, res, true));
app.get("/resources/Sachin_Kumar_Resume.pdf", (req, res) => sendResumePdf(req, res, false));
app.get("/static/Sachin_Kumar_Resume.pdf", (req, res) => sendResumePdf(req, res, false));

// Serve static assets and resources
app.use("/static", express.static(path.join(process.cwd(), "static")));
app.use("/resources", express.static(path.join(process.cwd(), "resources")));

// ---------------------------------------------------------------------------
// PORTFOLIO DATA (Matched to Sachin Kumar's profile and production systems)
// ---------------------------------------------------------------------------

const PROFILE_DATA = {
  name: "Sachin Kumar",
  role: "Data Scientist & AI/ML Engineer",
  specialization: "Production LLMs, Multi-Agent Systems & Predictive Modeling",
  summary: "AI/ML Engineer and Data Scientist with 1.8+ years of experience building and deploying production-grade LLM, multi-agent, RAG, anomaly detection, and time-series forecasting systems. Combining statistical modelling, machine learning/deep learning, and advanced Python and SQL expertise to develop scalable data products and predictive analytics solutions.",
  location: "Chennai, India",
  email: "sachinkumar171201@gmail.com",
  phone: "+91-9840978758",
  github: "https://github.com/sachink1712",
  linkedin: "https://linkedin.com/in/sachin",
  impact_metrics: [
    {
      value: "4h → 20m",
      metric: "MTTR Auto-Resolution",
      detail: "ServiceNow incident resolution without human involvement"
    },
    {
      value: "99%",
      metric: "Latency Reduction",
      detail: "Server processing time compressed from 4m to <3s"
    },
    {
      value: "45%",
      metric: "Incident Response",
      detail: "Accelerated triage using clustering-based event correlation"
    },
    {
      value: "+36%",
      metric: "DB Transactions",
      detail: "Throughput gain via custom NL-to-SQL MCP server"
    }
  ]
};

const EXPERIENCE_DATA = [
  {
    company: "Tata Consultancy Services (TCS)",
    role: "AI Automation Engineer",
    period: "Jan 2025 - Present",
    location: "Chennai, India",
    type: "Full-Time Engineering",
    badge: "Enterprise Production",
    case_studies: [
      {
        id: "isacs-itsm",
        tag: "Flagship Autonomous System",
        title: "ISAcS: Zero-Touch ITSM Auto-Resolution & Hybrid RAG",
        headline: "Autonomous incident resolution pipeline reducing MTTR by 92% across ServiceNow tickets.",
        accent: "cyan",
        metrics: [
          { value: "4h → 20m", label: "MTTR Compression" },
          { value: "+36%", label: "SQL Throughput via MCP" },
          { value: "Zero", label: "Human Touch Required" }
        ],
        narrative: "Engineered an intelligent IT service automation backbone that continuously monitors ServiceNow queues, diagnoses recurring system failures, and executes self-healing scripts without manual engineer dispatch. Built a state-of-the-art hybrid RAG system combining sparse BM25 lexical recall with dense FAISS vector embeddings, reranked through cross-encoders to achieve pinpoint factual retrieval from vast internal runbooks.",
        architecture_steps: [
          "ServiceNow Incident Webhook",
          "LangGraph Multi-Agent Orchestrator",
          "Hybrid FAISS + BM25 RAG Reranker",
          "Custom MCP SQL Execution Server",
          "Automated Verification & Resolution"
        ],
        stack: ["Python", "LangGraph", "MCP", "FAISS", "Cross-Encoder", "ServiceNow API", "PostgreSQL", "BM25"]
      },
      {
        id: "alert-forecasting",
        tag: "Time-Series Predictive Core",
        title: "Proactive Infrastructure Alert & Anomaly Prediction",
        headline: "Multi-seasonal time-series forecasting preempting critical outages 2 hours in advance.",
        accent: "indigo",
        metrics: [
          { value: "2 Hours", label: "Advance Outage Warning" },
          { value: "99%", label: "Latency Drop (4m → <3s)" },
          { value: "P1 & P2", label: "Mission-Critical Coverage" }
        ],
        narrative: "Developed an early-warning telemetry engine that continuously forecasts CPU, memory, and disk exhaustion before service disruptions happen. Applied Multiple Seasonal-Trend decomposition with LOESS (MSTL) alongside XGBoost and multivariate regression to capture intricate workload rhythms. Completely re-engineered calculation pipelines to compress end-to-end evaluation time from 4 minutes down to sub-3 seconds.",
        architecture_steps: [
          "Telemetry Stream Ingestion",
          "MSTL Seasonality Decomposition",
          "XGBoost Residual Forecaster",
          "Dynamic Threshold Evaluation",
          "2-Hour Preemptive Alert Dispatch"
        ],
        stack: ["Python", "MSTL", "XGBoost", "Scikit-Learn", "NumPy", "Pandas", "Statistical Analysis"]
      },
      {
        id: "event-correlation",
        tag: "Topology & Noise Suppression",
        title: "Real-Time Event Correlation & Automated Triage Swarm",
        headline: "Clustering-driven topology engine eliminating alert fatigue and reducing response latency by 45%.",
        accent: "emerald",
        metrics: [
          { value: "45%", label: "Faster Incident Triage" },
          { value: "6 Manual", label: "Processes Automated" },
          { value: "100%", label: "P1 Alert Correlation" }
        ],
        narrative: "Eliminated duplicate alert storms during major outages by deploying an unsupervised clustering engine that dynamically maps infrastructure topological dependencies. Synthesized disparate alert streams into coherent root-cause incident groups, replacing 6 manual triage routines and empowering on-call site reliability engineers with instant situational clarity.",
        architecture_steps: [
          "Distributed Alert Stream",
          "Topological Graph Mapping",
          "Unsupervised Event Clustering",
          "Root-Cause Synthesis",
          "Unified Incident Dispatch"
        ],
        stack: ["Python", "Clustering Algorithms", "Graph Topology", "FastAPI", "SQL", "SRE Automation"]
      }
    ]
  }
];

const PROJECTS_DATA = [
  {
    id: "multi-agent-debate",
    title: "Multi-Agent Debate & Consensus System",
    category: "Agentic AI & LLMs",
    repo_url: "https://github.com/sachink1712/Multi-Agent-Debate-System.git",
    live_url: null,
    image_url: "/resources/images/debate_google_cloud.jpg",
    tech_stack: ["Python", "Gemini 2.0 Flash", "GCP Cloud Run", "Pub/Sub", "BigQuery", "Docker", "FastAPI", "SQL"],
    description: "Distributed multi-agent consensus system running 4 autonomous Cloud Run microservices coordinating via asynchronous Pub/Sub streams with BigQuery state persistence.",
    highlights: [
      "Built and deployed a Gemini 2.0 Flash multi-agent system on GCP using Python; benchmarked response times and optimized asynchronous Pub/Sub event streams, reducing end-to-end latency by 38%.",
      "Designed four specialized AI agents as independent Cloud Run microservices, communicating and coordinating through Pub/Sub and persisting distributed state in BigQuery with SQL for downstream analysis."
    ]
  },
  {
    id: "hr-assistant-mcp",
    title: "HR Assistant MCP Agent",
    category: "Agentic AI & LLMs",
    repo_url: "https://github.com/sachink1712/HR-Assistant-MCP-Agent.git",
    live_url: null,
    image_url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    tech_stack: ["Python", "Model Context Protocol (MCP)", "Claude Desktop", "LangChain", "Git"],
    description: "Production Model Context Protocol (MCP) server digitizing HR workflows through LLM-callable functions and automated version control integration.",
    highlights: [
      "Digitized new-employee onboarding through a custom Python-based MCP server integrated with Git version control, eliminating manual portal interactions.",
      "Integrated HRMS workflows for leave management, ticketing, and meeting scheduling as LLM-callable Python functions, enabling natural-language process automation."
    ]
  },
  {
    id: "ai-marketing-crew",
    title: "AI Marketing Content Crew",
    category: "Agentic AI & LLMs",
    repo_url: "https://github.com/sachink1712/AI-Marketing-Content-Crew-Using-CrewAI.git",
    live_url: null,
    image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    tech_stack: ["Python", "CrewAI", "Google Gemini LLM", "Prompt Engineering", "YAML", "Git"],
    description: "Collaborative multi-agent marketing pipeline automating content lifecycle from autonomous web research to audience-targeted editorial drafting.",
    highlights: [
      "Built a multi-agent AI system using Python, CrewAI, and the Google Gemini LLM to automate the marketing content pipeline from initial web research to final drafting.",
      "Engineered collaborative agents with integrated web-scraping tools and persistent memory to autonomously generate structured, audience-tailored content with minimal manual intervention."
    ]
  },
  {
    id: "ecommerce-chatbot",
    title: "E-Commerce Intelligent ChatBot",
    category: "Agentic AI & LLMs",
    repo_url: "https://github.com/sachink1712/E-Commerce-ChatBot.git",
    live_url: null,
    image_url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    tech_stack: ["Python", "FastAPI", "NLP", "FAISS", "Vector Embeddings", "Conversational AI"],
    description: "Domain-specific conversational assistant offering semantic catalog search, order tracking, and intent-driven customer support.",
    highlights: [
      "Built conversational query resolution engine using FAISS semantic search across product catalogs.",
      "Integrated slot-filling dialogue state tracker handling order fulfillment lookups and catalog recommendations."
    ]
  },
  {
    id: "real-estate-agent",
    title: "Real-Estate Advisory Agent",
    category: "Agentic AI & LLMs",
    repo_url: "https://github.com/sachink1712/Real-Estate-Agent.git",
    live_url: null,
    image_url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
    tech_stack: ["Python", "Machine Learning", "LangChain", "Property Valuation", "Streamlit"],
    description: "Automated advisory agent analyzing real estate parameters, comparative valuations, and buyer preferences with automated client inquiry handling.",
    highlights: [
      "Implemented comparative market valuation algorithms matched to prospective buyer budget parameters.",
      "Integrated natural-language query handling for automated property recommendation reports."
    ]
  },
  {
    id: "bangalore-house-price",
    title: "Bangalore House Price Prediction",
    category: "Machine Learning & CV",
    repo_url: "https://github.com/sachink1712/Bangalore-house-price-pridiction.git",
    live_url: null,
    image_url: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80",
    tech_stack: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Regression", "Data Cleaning"],
    description: "End-to-end supervised machine learning regression pipeline predicting residential property values across Bangalore localities.",
    highlights: [
      "Performed extensive feature engineering, dimensionality reduction for high-cardinality locations, and robust outlier removal.",
      "Trained and cross-validated multi-model regression pipelines achieving high R² scores on unseen validation partitions."
    ]
  },
  {
    id: "potato-disease-cnn",
    title: "Potato Disease Classification using CNN",
    category: "Machine Learning & CV",
    repo_url: "https://github.com/sachink1712/Potato-decease-classification-using-CNN-.git",
    live_url: null,
    image_url: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80",
    tech_stack: ["Python", "TensorFlow", "Keras", "CNN", "Computer Vision", "Data Augmentation"],
    description: "Deep learning computer vision system diagnosing agricultural crop pathology (Early Blight, Late Blight, Healthy) from leaf imagery.",
    highlights: [
      "Constructed deep Convolutional Neural Network with data augmentation, convolution-pooling stacks, and dropout regularization.",
      "Achieved robust diagnostic classification accuracy across diverse environmental lighting conditions."
    ]
  },
  {
    id: "predictive-maintenance",
    title: "Predictive Maintenance for Renewable Energy",
    category: "Data Analytics & Time-Series",
    repo_url: "https://github.com/sachink1712/Predictive-Maintenance-For-Renewable-Energy.git",
    live_url: null,
    image_url: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80",
    tech_stack: ["Python", "Time-Series Analysis", "XGBoost", "Scikit-Learn", "Pandas", "Anomaly Detection"],
    description: "Industrial telemetry analysis predicting sensor anomalies and impending component failures in renewable energy assets.",
    highlights: [
      "Engineered temporal rolling statistics and vibration/temperature anomaly indicators.",
      "Anticipated critical maintenance thresholds to preempt hardware degradation and reduce downtime."
    ]
  },
  {
    id: "churn-prediction",
    title: "Customer Churn Prediction Engine",
    category: "Machine Learning & CV",
    repo_url: "https://github.com/sachink1712/Churn-Prediction.git",
    live_url: null,
    image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    tech_stack: ["Python", "XGBoost", "Random Forest", "Scikit-Learn", "Matplotlib", "Seaborn"],
    description: "Binary classification system identifying customer attrition risks and deriving key drivers of customer departures.",
    highlights: [
      "Built end-to-end data preprocessing and classification model benchmarked on ROC-AUC and precision-recall trade-offs.",
      "Extracted feature importance to give business teams actionable customer retention targets."
    ]
  },
  {
    id: "worldcup-2023-analysis",
    title: "ICC Cricket World Cup 2023 Analysis",
    category: "Data Analytics & Time-Series",
    repo_url: "https://github.com/sachink1712/WorldCup-2023-Analysis.git",
    live_url: null,
    image_url: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80",
    tech_stack: ["Python", "Pandas", "Matplotlib", "Seaborn", "Statistical Modeling", "EDA"],
    description: "Comprehensive statistical analysis and match dynamics exploration of tournament performance data.",
    highlights: [
      "Performed exploratory data analysis decomposing match phases, run-rate trends, and bowler economy distributions.",
      "Generated statistical visualizations identifying turning-point patterns across championship fixtures."
    ]
  },
  {
    id: "codebasics-challenge-9",
    title: "Codebasics Resume Challenge #9",
    category: "Data Analytics & Time-Series",
    repo_url: "https://github.com/sachink1712/Codebasics-Resume-Challenge-9.git",
    live_url: null,
    image_url: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80",
    tech_stack: ["Python", "SQL", "Power BI", "Data Modeling", "Business Intelligence"],
    description: "Business analytics challenge translating complex relational transaction datasets into actionable operational KPIs.",
    highlights: [
      "Architected data model connecting relational transaction and customer tables for granular metric decomposition.",
      "Delivered executive dashboards isolating revenue trends, customer segments, and growth opportunities."
    ]
  }
];

const SKILLS_DATA = {
  pillars: [
    {
      id: "agentic-cognitive",
      title: "Agentic & Cognitive Intelligence",
      tagline: "Autonomous swarms, MCP servers, and grounded reasoning systems",
      badge: "Specialty & Enterprise Deployed",
      accent: "cyan",
      competencies: [
        { name: "LangGraph & Multi-Agent Swarms", level: "Expert", desc: "Orchestrating stateful, multi-agent cyclical graphs with human-in-the-loop controls" },
        { name: "Model Context Protocol (MCP)", level: "Expert", desc: "Custom server development bridging LLMs with secure relational SQL CRUD tools" },
        { name: "Hybrid Dense-Sparse RAG", level: "Advanced", desc: "FAISS vector indexing combined with BM25 lexical recall & Cross-Encoder reranking" },
        { name: "CrewAI & Agno Autonomous Crews", level: "Advanced", desc: "Collaborative agent crews with persistent memory & tool-use automation" },
        { name: "Ground-Truth Evaluation Frameworks", level: "Advanced", desc: "Statistical benchmarking of retrieval accuracy and hallucination suppression" }
      ]
    },
    {
      id: "stats-timeseries",
      title: "Statistical Computing & Time-Series",
      tagline: "Mathematical rigor grounded in quantitative modelling",
      badge: "Statistical Acumen",
      accent: "amber",
      competencies: [
        { name: "MSTL Decomposition", level: "Mastery", desc: "Multiple Seasonal-Trend LOESS decomposition for complex operational telemetry" },
        { name: "Multivariate Time-Series & Anomaly Detection", level: "Mastery", desc: "Dynamic thresholding and early-warning forecast engines" },
        { name: "Hypothesis Testing & Statistical Inference", level: "Mastery", desc: "Rigorous parametric/non-parametric validation and A/B design" },
        { name: "Regression & Probability Modeling", level: "Mastery", desc: "Linear, logistic, and Bayesian inferential predictive systems" }
      ]
    },
    {
      id: "ml-deeplearning",
      title: "Machine Learning & Deep Neural Nets",
      tagline: "Production-grade predictive classifiers and computer vision architectures",
      badge: "Production Deployed",
      accent: "emerald",
      competencies: [
        { name: "Gradient Boosting (XGBoost)", level: "Expert", desc: "High-throughput classification & regression tuning with feature importance analysis" },
        { name: "Deep Learning & CNNs (TensorFlow / Keras)", level: "Advanced", desc: "Convolutional architectures with transfer learning for computer vision diagnosis" },
        { name: "Unsupervised Clustering & Topology", level: "Advanced", desc: "Event correlation and alert suppression mapping complex system dependencies" },
        { name: "Scikit-Learn Pipelines & Feature Engineering", level: "Expert", desc: "Robust data transformations, dimensionality reduction, and cross-validation" }
      ]
    },
    {
      id: "cloud-infrastructure",
      title: "Cloud Scale & Data Infrastructure",
      tagline: "Containerized microservices and distributed data pipelines",
      badge: "GCP & Azure Certified",
      accent: "indigo",
      competencies: [
        { name: "Google Cloud Platform (GCP)", level: "Associate Engineer", desc: "Cloud Run microservices, Pub/Sub event streams, Vertex AI & BigQuery" },
        { name: "Docker & Container Architecture", level: "Advanced", desc: "Multi-stage builds, minimal production images, and container orchestration" },
        { name: "Relational Databases & SQL Optimization", level: "Advanced", desc: "PostgreSQL, MSSQL, complex query optimization, index tuning, and schema design" },
        { name: "Azure Foundry & OpenAI Services", level: "Certified", desc: "Enterprise cognitive services, Azure Functions, and Databricks integration" }
      ]
    }
  ],
  languages: [
    { name: "Python 3.11+", role: "Primary Language", highlight: "AsyncIO, NumPy, Pandas, FastAPI" },
    { name: "SQL (Advanced)", role: "Relational Core", highlight: "PostgreSQL, MySQL, MSSQL" },
    { name: "PowerShell & Bash", role: "Scripting & DevOps", highlight: "System automation & SRE runbooks" },
    { name: "Git & CI/CD", role: "Version Control", highlight: "GitHub Actions, automated deployments" }
  ],
  certifications: [
    {
      id: "cert-gcp-ace",
      title: "Google Cloud Certified: Associate Cloud Engineer",
      short_title: "Associate Cloud Engineer",
      code: "GCP-ACE",
      issuer: "Google Cloud",
      issuer_group: "Google Cloud",
      category: "Cloud Architecture",
      year: "Certified",
      in_progress: false,
      badge_image: "/static/images/badges/gcp-ace.png",
      verify_url: "https://www.credly.com/badges/c6b5d3b0-c42e-42ac-bc4a-ad5ca44854b4/public_url",
      description: "Validated proficiency in deploying cloud-native applications, container orchestration with Cloud Run and GKE, IAM governance, and resilient cloud architectures.",
      skills: ["Compute Engine", "Cloud Run & GKE", "IAM & Security", "VPC Networking", "Cloud Monitoring"]
    },
    {
      id: "cert-claude-dev-foundations",
      title: "Claude Certified Developer – Foundations",
      short_title: "Claude Certified Developer",
      code: "CCDV-F",
      issuer: "Anthropic",
      issuer_group: "Anthropic",
      category: "LLM & Agent Systems",
      year: "Certified",
      in_progress: false,
      badge_image: "/static/images/badges/claude-dev-foundations.png",
      verify_url: "https://www.credly.com/badges/30e1ff64-fda5-4969-94a0-e8bd65d59eb3",
      description: "Official credential for building robust applications using Claude, advanced prompt engineering with XML tags, tool use, Model Context Protocol (MCP), and multi-agent loops.",
      skills: ["Claude 3.5 Sonnet", "Prompt Architecture", "Tool Use & Function Calling", "MCP Protocol", "Agent Workflows"]
    },
    {
      id: "cert-claude-assoc-foundations",
      title: "Claude Certified Associate – Foundations",
      short_title: "Claude Certified Associate",
      code: "CCAO-F",
      issuer: "Anthropic",
      issuer_group: "Anthropic",
      category: "Prompting & Reasoning",
      year: "Certified",
      in_progress: false,
      badge_image: "/static/images/badges/claude-assoc-foundations.png",
      verify_url: "https://www.credly.com/badges/7b831d9e-3e33-4536-b710-58efb325cf98",
      description: "Validation of architectural reasoning, structured chain-of-thought prompt engineering, token optimization, and safe, aligned AI system integration.",
      skills: ["Context Windows", "Chain-of-Thought", "Alignment & Safety", "Evaluations", "Complex Reasoning"]
    },
    {
      id: "cert-azure-ai-900",
      title: "Microsoft Certified: Azure AI Fundamentals (AI-900)",
      short_title: "Azure AI Fundamentals",
      code: "AI-900",
      issuer: "Microsoft Azure",
      issuer_group: "Microsoft",
      category: "AI Foundations",
      year: "Certified",
      in_progress: false,
      badge_image: "/static/images/badges/azure-ai-900.png",
      verify_url: "https://learn.microsoft.com/en-us/users/SachinKumar-2982/credentials/7EF82C5E7119A273",
      description: "Demonstrated foundational mastery of machine learning workflows, conversational AI, computer vision models, and responsible AI principles.",
      skills: ["Machine Learning Fundamentals", "Computer Vision", "NLP & Bot Services", "Responsible AI", "Azure ML"]
    },
    {
      id: "cert-ibm-data-science",
      title: "IBM Data Science Professional Certificate",
      short_title: "IBM Data Science Professional",
      code: "IBM-DSP",
      issuer: "IBM",
      issuer_group: "IBM",
      category: "Data Science & ML",
      year: "Certified",
      in_progress: false,
      badge_image: "/static/images/badges/ibm-data-science.png",
      verify_url: "https://www.coursera.org/account/accomplishments/specialization/H9LC6HS75UZJ",
      description: "Comprehensive 10-course credential spanning statistical modeling, exploratory data analysis, machine learning algorithms, Python, and relational database management.",
      skills: ["Statistical Modeling", "Python & SQL", "Scikit-Learn", "Data Visualizations", "Predictive Analytics"]
    },
    {
      id: "cert-codebasics-ds",
      title: "Codebasics Certified: Data Science & Machine Learning",
      short_title: "Codebasics Data Science",
      code: "CB-DSML",
      issuer: "Codebasics.io",
      issuer_group: "Codebasics",
      category: "Data Science & ML",
      year: "Certified",
      in_progress: false,
      badge_image: "/static/images/badges/codebasics-badge.svg",
      verify_url: "https://codebasics.io/",
      description: "Hands-on practical mastery in end-to-end data science pipelines, exploratory data analysis, predictive modeling, machine learning, feature engineering, and real-world project deployments.",
      skills: ["Data Analytics", "Pandas & NumPy", "Machine Learning", "Feature Engineering", "Model Deployment"]
    },
    {
      id: "cert-azure-ai-102",
      title: "Microsoft Certified: Azure AI Engineer Associate (AI-102)",
      short_title: "Azure AI Engineer Associate",
      code: "AI-102",
      issuer: "Microsoft Azure",
      issuer_group: "Microsoft",
      category: "Enterprise AI",
      year: "In Progress",
      in_progress: true,
      badge_image: "/static/images/badges/azure-ai-102.png",
      verify_url: "https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-engineer/",
      description: "Currently preparing for production-grade Azure AI certification covering Azure OpenAI Service, Semantic Kernel, Vector Search, AI Foundry, and scalable multi-agent systems.",
      skills: ["Azure OpenAI", "Semantic Kernel", "Azure AI Search", "AI Foundry", "Multi-Agent Systems"]
    }
  ]
};

const CATEGORIES = ["All", "Agentic AI & LLMs", "Machine Learning & CV", "Data Analytics & Time-Series"];

// ---------------------------------------------------------------------------
// API ENDPOINTS
// ---------------------------------------------------------------------------

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    service: "sachin-portfolio-express",
    timestamp: new Date().toISOString()
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    service: "sachin-portfolio-express",
    timestamp: new Date().toISOString()
  });
});

app.get("/api/profile", (req, res) => {
  res.json(PROFILE_DATA);
});

app.get("/api/projects", (req, res) => {
  const category = req.query.category as string | undefined;
  if (category && category.toLowerCase() !== "all") {
    const filtered = PROJECTS_DATA.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
    return res.json({ total: filtered.length, projects: filtered });
  }
  res.json({ total: PROJECTS_DATA.length, projects: PROJECTS_DATA });
});

app.get("/api/experience", (req, res) => {
  res.json({
    experience: EXPERIENCE_DATA,
    education: []
  });
});

app.get("/api/skills", (req, res) => {
  res.json(SKILLS_DATA);
});

app.get("/api/certifications", (req, res) => {
  res.json({ certifications: SKILLS_DATA.certifications });
});

// ---------------------------------------------------------------------------
// CONTACT MESSAGES PERSISTENCE & EMAIL FORWARDING
// ---------------------------------------------------------------------------
const MESSAGES_FILE = path.join(process.cwd(), "data", "contact_messages.json");

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  created_at: string;
  date_formatted: string;
}

function getStoredMessages(): ContactMessage[] {
  try {
    if (fs.existsSync(MESSAGES_FILE)) {
      const raw = fs.readFileSync(MESSAGES_FILE, "utf-8");
      return JSON.parse(raw) || [];
    }
  } catch (err) {
    console.error("Error reading contact_messages.json:", err);
  }
  return [];
}

function persistMessage(msg: ContactMessage): void {
  try {
    const list = getStoredMessages();
    list.unshift(msg); // Prepend new message
    const dataDir = path.dirname(MESSAGES_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(list, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving contact message:", err);
  }
}

async function forwardInquiryEmail(msg: ContactMessage): Promise<boolean> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const targetEmail = process.env.NOTIFICATION_EMAIL || PROFILE_DATA.email;

  if (!host || !user || !pass) {
    console.log(`[Contact] SMTP not configured. Inquiry saved to database for ${targetEmail}.`);
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass }
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${user}>`,
      to: targetEmail,
      replyTo: msg.email,
      subject: `[Portfolio Inquiry] from ${msg.name}`,
      text: `Hello Sachin,

You have received a new inquiry through your portfolio website:

Name: ${msg.name}
Email: ${msg.email}
Phone: ${msg.phone || "Not provided"}
Received: ${msg.date_formatted}

Message:
${msg.message}

---
Inquiry stored in data/contact_messages.json`
    });

    console.log(`[Contact] Forwarded email to ${targetEmail}`);
    return true;
  } catch (err) {
    console.error("[Contact] Error forwarding email via SMTP:", err);
    return false;
  }
}

app.get("/api/contact/messages", (req, res) => {
  const messages = getStoredMessages();
  res.json({
    status: "success",
    count: messages.length,
    messages
  });
});

app.delete("/api/contact/messages/:id", (req, res) => {
  const { id } = req.params;
  const list = getStoredMessages().filter((m) => m.id !== id);
  try {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(list, null, 2), "utf-8");
    res.json({ status: "success", remaining: list.length });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/contact", async (req, res) => {
  const { name, email, phone, message } = req.body || {};
  if (!name || !email || !message || String(message).trim().length < 3) {
    return res.status(400).json({ 
      error: "Full Name, email, and a message (minimum 3 characters) are required." 
    });
  }

  const now = new Date();
  const newMsg: ContactMessage = {
    id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name: String(name).trim(),
    email: String(email).trim(),
    phone: phone ? String(phone).trim() : "",
    message: String(message).trim(),
    created_at: now.toISOString(),
    date_formatted: now.toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short"
    })
  };

  persistMessage(newMsg);

  let emailDispatched = false;
  try {
    emailDispatched = await forwardInquiryEmail(newMsg);
  } catch (e) {
    console.error("Email forward error:", e);
  }

  // Pre-generate convenient mailto and WhatsApp links
  const mailtoSubject = encodeURIComponent(`Portfolio Inquiry from ${newMsg.name}`);
  const mailtoBody = encodeURIComponent(
    `Hi Sachin,\n\n${newMsg.message}\n\n---\nFrom: ${newMsg.name}\nEmail: ${newMsg.email}\nPhone: ${newMsg.phone || "N/A"}`
  );
  const mailtoUrl = `mailto:${PROFILE_DATA.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

  const cleanPhone = PROFILE_DATA.phone.replace(/[^0-9]/g, "");
  const waText = encodeURIComponent(
    `Hi Sachin, I'm ${newMsg.name} (${newMsg.email}).\n\n${newMsg.message}`
  );
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${waText}`;

  res.json({
    status: "success",
    message: `Thank you, ${newMsg.name}! Your message has been received and saved.`,
    email_dispatched: emailDispatched,
    contact: {
      name: newMsg.name,
      email: newMsg.email,
      phone: newMsg.phone,
      mailtoUrl,
      whatsappUrl,
      targetEmail: PROFILE_DATA.email
    }
  });
});

app.post("/api/upload-photo", (req, res) => {
  try {
    const { image } = req.body || {};
    if (!image || typeof image !== "string") {
      return res.status(400).json({ error: "Missing image data" });
    }

    // Extract base64 payload
    const matches = image.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ error: "Invalid base64 image data" });
    }

    const ext = matches[1] === "jpeg" || matches[1] === "jpg" ? "jpg" : "png";
    const buffer = Buffer.from(matches[2], "base64");
    const targetFile = path.join(process.cwd(), "static", "images", "sachin_profile.png");
    
    // Ensure directory exists and write file
    fs.writeFileSync(targetFile, buffer);

    res.json({
      status: "success",
      url: `/static/images/sachin_profile.png?t=${Date.now()}`
    });
  } catch (err: any) {
    console.error("Failed to save uploaded photo:", err);
    res.status(500).json({ error: "Internal server error saving photo" });
  }
});

// ---------------------------------------------------------------------------
// MAIN PORTFOLIO ROUTE (Hydrated Jinja2/Nunjucks template)
// ---------------------------------------------------------------------------

app.get("/", (req, res) => {
  const customPhotoPath = path.join(process.cwd(), "resources", "images", "sachin_portrait.png");
  const hasCustomPhoto = fs.existsSync(customPhotoPath);
  const photoUrl = hasCustomPhoto 
    ? `/resources/images/sachin_portrait.png` 
    : `/static/images/sachin_avatar.svg`;

  const inquiriesCount = getStoredMessages().length;

  res.render("index.html", {
    profile: PROFILE_DATA,
    experience: EXPERIENCE_DATA,
    projects: PROJECTS_DATA,
    skills: SKILLS_DATA,
    categories: CATEGORIES,
    photo_url: photoUrl,
    has_custom_photo: hasCustomPhoto,
    inquiries_count: inquiriesCount,
    year: new Date().getFullYear()
  });
});

if (!process.env.VERCEL) {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Portfolio server running on http://0.0.0.0:${PORT}`);
  });
}

export default app;
