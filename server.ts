import express from "express";
import path from "path";
import nunjucks from "nunjucks";
import fs from "fs";

const app = express();
const PORT = 3000;

// Configure body parsing with generous limit for photo uploads
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Configure Nunjucks view engine for templates directory
nunjucks.configure("templates", {
  autoescape: true,
  express: app,
  watch: false
});

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
    { title: "Azure AI Engineer Associate (AI-102)", issuer: "Microsoft Azure", badge: "Enterprise AI", year: "Certified" },
    { title: "Google Cloud Associate Cloud Engineer", issuer: "Google Cloud", badge: "Cloud Architecture", year: "Certified" },
    { title: "Azure AI Fundamentals (AI-900)", issuer: "Microsoft Azure", badge: "Foundations", year: "Certified" },
    { title: "Claude Certified Developer – Foundations", issuer: "Anthropic", badge: "LLM & Agent Systems", year: "Certified" },
    { title: "Claude Certified Associate – Foundations", issuer: "Anthropic", badge: "Prompting & Reasoning", year: "Certified" },
    { title: "IBM Data Science Professional", issuer: "IBM", badge: "Data Science", year: "Certified" },
    { title: "Generative AI for Developers", issuer: "DeepLearning.AI", badge: "LLM Architectures", year: "Certified" }
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

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message || String(message).trim().length < 5) {
    return res.status(400).json({ error: "Name, email, and message (min 5 chars) are required." });
  }
  res.json({
    status: "success",
    message: `Thank you, ${name}. Your message has been received.`,
    received_at: new Date().toISOString()
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

  res.render("index.html", {
    profile: PROFILE_DATA,
    experience: EXPERIENCE_DATA,
    projects: PROJECTS_DATA,
    skills: SKILLS_DATA,
    categories: CATEGORIES,
    photo_url: photoUrl,
    has_custom_photo: hasCustomPhoto,
    year: new Date().getFullYear()
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Portfolio server running on http://0.0.0.0:${PORT}`);
});
