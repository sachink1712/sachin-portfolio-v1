import fs from "fs";
import path from "path";
import nunjucks from "nunjucks";

// Configure Nunjucks view engine
nunjucks.configure(path.join(process.cwd(), "templates"), {
  autoescape: true,
  watch: false
});

// Import or recreate profile and portfolio data
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
        id: "case-servicenow-mcp",
        title: "Autonomous ServiceNow Incident Remediation Swarm",
        headline: "Compressing Enterprise MTTR from 4 Hours to 20 Minutes via Multi-Agent Cognitive Automation",
        metrics: [
          { value: "4h → 20m", label: "MTTR Reduction" },
          { value: "98.4%", label: "Remediation Precision" },
          { value: "0", label: "Human Touches on P2/P3" }
        ],
        narrative: "Engineered a production-grade multi-agent autonomous system integrating LangGraph and enterprise Model Context Protocol (MCP) servers. The architecture intercepts inbound IT Service Management telemetry, evaluates root cause diagnostics using domain-specialized LLMs, executes deterministic remediation runbooks via secure sandboxed APIs, and validates service health prior to autonomous ticket resolution.",
        architecture_steps: [
          "Inbound ServiceNow Webhook Interceptor",
          "LangGraph Multi-Agent Orchestrator",
          "Cross-Encoder Semantic Diagnostic Classifier",
          "MCP Sandboxed API Execution Nodes",
          "Zero-Trust Policy Validation Layer",
          "Autonomous Health Verification & Close"
        ],
        stack: ["Python", "LangGraph", "Model Context Protocol (MCP)", "FastAPI", "Docker", "ServiceNow REST", "PostgreSQL"]
      },
      {
        id: "case-time-series-mstl",
        title: "Server Fleet Telemetry & Forecasting Engine",
        headline: "Sub-3-Second Multivariate Time-Series Anomaly Detection with MSTL Decomposition",
        metrics: [
          { value: "4m → <3s", label: "Processing Latency" },
          { value: "99%", label: "Latency Compression" },
          { value: "94.2%", label: "Proactive Forecast Accuracy" }
        ],
        narrative: "Designed and deployed a high-throughput time-series anomaly detection pipeline processing concurrent operational metrics across distributed server clusters. Implemented Multiple Seasonal-Trend decomposition using LOESS (MSTL) to isolate complex calendar periodicities, coupling statistical residual modeling with vectorized NumPy pipelines to identify impending threshold breaches hours ahead of outages.",
        architecture_steps: [
          "High-Frequency Telemetry Ingestion",
          "Vectorized Preprocessing & Normalization",
          "MSTL Multi-Frequency Decomposition",
          "Statistical Residual Anomaly Scoring",
          "Dynamic Threshold Breach Prediction",
          "Real-Time Prometheus & Grafana Dispatch"
        ],
        stack: ["Python", "NumPy", "Pandas", "MSTL Decomposition", "SciPy", "Statsmodels", "Time-Series Forecaster"]
      },
      {
        id: "case-alert-correlation",
        title: "Topology-Aware Alert Correlation & Root-Cause Synthesizer",
        headline: "Reducing Alert Storm Fatigue by 45% using Graph Topological Clustering",
        metrics: [
          { value: "-45%", label: "Alert Noise Reduction" },
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
    image_url: "./resources/images/debate_google_cloud.jpg",
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
      badge_image: "./static/images/badges/gcp-ace.png",
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
      badge_image: "./static/images/badges/claude-dev-foundations.png",
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
      badge_image: "./static/images/badges/claude-assoc-foundations.png",
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
      badge_image: "./static/images/badges/azure-ai-900.png",
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
      badge_image: "./static/images/badges/ibm-data-science.png",
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
      badge_image: "./static/images/badges/codebasics-badge.svg",
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
      badge_image: "./static/images/badges/azure-ai-102.png",
      verify_url: "https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-engineer/",
      description: "Currently preparing for production-grade Azure AI certification covering Azure OpenAI Service, Semantic Kernel, Vector Search, AI Foundry, and scalable multi-agent systems.",
      skills: ["Azure OpenAI", "Semantic Kernel", "Azure AI Search", "AI Foundry", "Multi-Agent Systems"]
    }
  ]
};

const CATEGORIES = ["All", "Agentic AI & LLMs", "Machine Learning & CV", "Data Analytics & Time-Series"];

function copyRecursive(src: string, dest: string) {
  if (!fs.existsSync(src)) return;
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    const items = fs.readdirSync(src);
    for (const item of items) {
      copyRecursive(path.join(src, item), path.join(dest, item));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

async function buildStaticPages() {
  console.log("🚀 Starting static site build for GitHub Pages...");
  const distDir = path.join(process.cwd(), "dist");

  // Clean / prepare dist directory
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  // 1. Copy static assets and resources to dist
  console.log("📁 Copying static assets and resources to dist/...");
  copyRecursive(path.join(process.cwd(), "static"), path.join(distDir, "static"));
  copyRecursive(path.join(process.cwd(), "resources"), path.join(distDir, "resources"));

  // Also copy resume directly to dist root for direct access
  const resumeSrc = path.join(process.cwd(), "resources", "Sachin_Kumar_Resume.pdf");
  if (fs.existsSync(resumeSrc)) {
    fs.copyFileSync(resumeSrc, path.join(distDir, "Sachin_Kumar_Resume.pdf"));
  }

  // 2. Prepare API JSON files for static client fallback
  const apiDir = path.join(distDir, "api");
  if (!fs.existsSync(apiDir)) fs.mkdirSync(apiDir, { recursive: true });
  fs.writeFileSync(path.join(apiDir, "projects.json"), JSON.stringify({ projects: PROJECTS_DATA }, null, 2));
  fs.writeFileSync(path.join(apiDir, "certifications.json"), JSON.stringify({ certifications: SKILLS_DATA.certifications }, null, 2));
  fs.writeFileSync(path.join(apiDir, "profile.json"), JSON.stringify(PROFILE_DATA, null, 2));

  // 3. Render templates/index.html using Nunjucks
  const photoUrl = "./resources/images/sachin_portrait.png";
  let html = nunjucks.render("index.html", {
    profile: PROFILE_DATA,
    experience: EXPERIENCE_DATA,
    projects: PROJECTS_DATA,
    skills: SKILLS_DATA,
    categories: CATEGORIES,
    photo_url: photoUrl,
    has_custom_photo: true,
    inquiries_count: 0,
    year: new Date().getFullYear()
  });

  // 4. Adapt absolute URLs to relative URLs so it works anywhere on GitHub Pages (e.g. /username/repo/ subpaths)
  html = html
    .replace(/href="\/static\//g, 'href="./static/')
    .replace(/src="\/static\//g, 'src="./static/')
    .replace(/href="\/resources\//g, 'href="./resources/')
    .replace(/src="\/resources\//g, 'src="./resources/')
    .replace(/href="\/download-resume"/g, 'href="./resources/Sachin_Kumar_Resume.pdf" download="Sachin_Kumar_Resume.pdf"')
    .replace(/href="\/view-resume"/g, 'href="./resources/Sachin_Kumar_Resume.pdf" target="_blank"')
    .replace(/href="\/Sachin_Kumar_Resume\.pdf"/g, 'href="./Sachin_Kumar_Resume.pdf"');

  // Inject embedded JSON data so project/certification modals work 100% offline & without backend
  const dataScript = `
  <script>
    window.PORTFOLIO_STATIC = true;
    window.PROJECTS_DATA = ${JSON.stringify(PROJECTS_DATA)};
    window.CERTIFICATIONS_DATA = ${JSON.stringify(SKILLS_DATA.certifications)};
    window.PROFILE_DATA = ${JSON.stringify(PROFILE_DATA)};
  </script>
</body>`;
  html = html.replace("</body>", dataScript);

  // Write index.html to dist/
  const outPath = path.join(distDir, "index.html");
  fs.writeFileSync(outPath, html, "utf-8");

  // Create .nojekyll in dist so GitHub Pages doesn't ignore files starting with underscores
  fs.writeFileSync(path.join(distDir, ".nojekyll"), "");

  console.log(`✅ Static build complete! Generated files written to: ${distDir}`);
  console.log(`📄 Main HTML: ${outPath} (${(fs.statSync(outPath).size / 1024).toFixed(1)} KB)`);
}

buildStaticPages().catch((err) => {
  console.error("Static build error:", err);
  process.exit(1);
});
