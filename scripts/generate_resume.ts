import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import path from "path";

async function generateResume() {
  const pdfDoc = await PDFDocument.create();
  
  // Standard A4 page: 595.28 x 841.89 points
  const page = pdfDoc.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();

  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Palette
  const colorPrimary = rgb(0.07, 0.20, 0.45); // Deep Executive Navy #123373
  const colorDark = rgb(0.10, 0.12, 0.16);    // #191f29
  const colorBody = rgb(0.25, 0.28, 0.35);    // #404759
  const colorMuted = rgb(0.45, 0.50, 0.58);   // #738094
  const colorAccent = rgb(0.01, 0.52, 0.78);  // Cyan/Blue Accent #0284c7
  const colorLine = rgb(0.85, 0.88, 0.92);    // Border line #d9e0eb

  let y = height - 44;
  const leftMargin = 48;
  const contentWidth = width - leftMargin * 2;

  // 1. HEADER
  page.drawText("SACHIN KUMAR", {
    x: leftMargin,
    y: y,
    size: 22,
    font: fontBold,
    color: colorPrimary,
  });

  y -= 18;
  page.drawText("AI/ML Engineer & Data Scientist | Production LLMs, Multi-Agent Systems & Predictive Modeling", {
    x: leftMargin,
    y: y,
    size: 10.5,
    font: fontBold,
    color: colorAccent,
  });

  y -= 16;
  const contactText = "Email: sachinkumar171201@gmail.com   |   Phone: +91-9840978758   |   Location: Chennai, India";
  page.drawText(contactText, {
    x: leftMargin,
    y: y,
    size: 8.5,
    font: fontRegular,
    color: colorBody,
  });

  y -= 13;
  const linkText = "GitHub: github.com/sachink1712   |   LinkedIn: linkedin.com/in/sachin   |   Portfolio: Available Online";
  page.drawText(linkText, {
    x: leftMargin,
    y: y,
    size: 8.5,
    font: fontRegular,
    color: colorMuted,
  });

  y -= 14;
  page.drawLine({
    start: { x: leftMargin, y },
    end: { x: width - leftMargin, y },
    thickness: 1.2,
    color: colorPrimary,
  });

  // Helper to draw section titles
  function drawSectionTitle(title: string) {
    y -= 18;
    page.drawText(title.toUpperCase(), {
      x: leftMargin,
      y,
      size: 10.5,
      font: fontBold,
      color: colorPrimary,
    });
    y -= 4;
    page.drawLine({
      start: { x: leftMargin, y },
      end: { x: width - leftMargin, y },
      thickness: 0.7,
      color: colorLine,
    });
    y -= 10;
  }

  // 2. PROFESSIONAL SUMMARY
  drawSectionTitle("Professional Summary");
  const summaryLines = [
    "AI/ML Engineer and Data Scientist with 1.8+ years of experience building and deploying production-grade LLM applications,",
    "multi-agent systems, RAG pipelines, predictive analytics, and autonomous infrastructure remediation swarms. Holds an",
    "M.Sc. in Business Statistics with expertise combining mathematical statistics, deep learning, and advanced Python/SQL to drive",
    "measurable enterprise outcomes, including 91% incident MTTR reduction and 99% latency optimization at Tata Consultancy Services."
  ];
  for (const line of summaryLines) {
    page.drawText(line, {
      x: leftMargin,
      y,
      size: 8.5,
      font: fontRegular,
      color: colorDark,
    });
    y -= 11.5;
  }

  // 3. CORE PROFESSIONAL EXPERIENCE
  drawSectionTitle("Professional Experience");

  // Tata Consultancy Services
  page.drawText("Tata Consultancy Services (TCS)", {
    x: leftMargin,
    y,
    size: 10,
    font: fontBold,
    color: colorDark,
  });
  page.drawText("Dec 2023 – Present  |  Chennai, India", {
    x: width - leftMargin - 180,
    y,
    size: 8.5,
    font: fontBold,
    color: colorMuted,
  });

  y -= 13;
  page.drawText("Data Scientist & AI Automation Systems Engineer", {
    x: leftMargin,
    y,
    size: 9,
    font: fontOblique,
    color: colorAccent,
  });
  y -= 13;

  const expBullets = [
    "ISAcS Zero-Touch Incident Auto-Resolution Swarm: Architected an autonomous multi-agent system resolving enterprise ServiceNow ITSM incidents without human intervention, reducing Mean Time to Resolution (MTTR) from 4 hours to 20 minutes (91% reduction).",
    "High-Throughput Server Latency Optimizer: Engineered an asynchronous distributed event processing pipeline cutting peak server execution latency from 4 minutes to under 3 seconds (99% reduction).",
    "Anomaly Detection & Incident Correlation: Implemented density-based clustering algorithms across multi-system server telemetry logs, accelerating incident triage speed by 45%.",
    "Custom Model Context Protocol (MCP) Database Server: Built a natural-language-to-SQL MCP agentic tool for secure, read-replicating enterprise databases, increasing analytics query throughput by +36%.",
    "Production Enterprise RAG Pipeline: Deployed hybrid dense-sparse vector retrieval with cross-encoder re-ranking for technical knowledge bases, achieving 92% retrieval accuracy and zero hallucinated runbooks."
  ];

  for (const bullet of expBullets) {
    page.drawText("•", {
      x: leftMargin + 4,
      y,
      size: 9,
      font: fontBold,
      color: colorAccent,
    });
    
    // Wrap bullet text
    const words = bullet.split(" ");
    let line = "";
    for (let i = 0; i < words.length; i++) {
      const testLine = line + (line ? " " : "") + words[i];
      const textWidth = fontRegular.widthOfTextAtSize(testLine, 8.2);
      if (textWidth > contentWidth - 18) {
        page.drawText(line, {
          x: leftMargin + 16,
          y,
          size: 8.2,
          font: fontRegular,
          color: colorDark,
        });
        y -= 10.5;
        line = words[i];
      } else {
        line = testLine;
      }
    }
    if (line) {
      page.drawText(line, {
        x: leftMargin + 16,
        y,
        size: 8.2,
        font: fontRegular,
        color: colorDark,
      });
      y -= 11.5;
    }
  }

  // 4. SELECTED AI PROJECTS & COMPETITIONS
  drawSectionTitle("Key Projects & Honors");

  // Google Cloud Technical Debate
  page.drawText("Google Cloud Technical Debate — First Place Winner", {
    x: leftMargin,
    y,
    size: 9.5,
    font: fontBold,
    color: colorDark,
  });
  page.drawText("2024", {
    x: width - leftMargin - 30,
    y,
    size: 8.5,
    font: fontBold,
    color: colorMuted,
  });
  y -= 12;
  page.drawText("• Awarded 1st place in regional technical debate evaluating multi-agent orchestration patterns, cloud scalability, and enterprise RAG reliability.", {
    x: leftMargin + 16,
    y,
    size: 8.2,
    font: fontRegular,
    color: colorDark,
  });
  page.drawText("•", { x: leftMargin + 4, y, size: 9, font: fontBold, color: colorAccent });
  y -= 14;

  // Agentic Workflow Project
  page.drawText("Autonomous Multi-Agent Workflow Engine", {
    x: leftMargin,
    y,
    size: 9.5,
    font: fontBold,
    color: colorDark,
  });
  y -= 12;
  page.drawText("• Designed specialized supervisor and worker agents with dynamic state machines and automated retry backoffs for IT operations.", {
    x: leftMargin + 16,
    y,
    size: 8.2,
    font: fontRegular,
    color: colorDark,
  });
  page.drawText("•", { x: leftMargin + 4, y, size: 9, font: fontBold, color: colorAccent });
  y -= 14;

  // 5. TECHNICAL SKILLS
  drawSectionTitle("Technical Skills");

  const skillCategories = [
    { title: "Generative AI & LLMs:", skills: "LangChain, LangGraph, Multi-Agent Systems, RAG, MCP (Model Context Protocol), Prompt Engineering, Vector DBs (Chroma, FAISS)" },
    { title: "Machine Learning & Stats:", skills: "Predictive Modeling, Time-Series Forecasting (ARIMA, Prophet), Anomaly Detection, Clustering, Hypothesis Testing, Scikit-learn, PyTorch" },
    { title: "Languages & Frameworks:", skills: "Python (NumPy, Pandas, SciPy, FastAPI, Flask), SQL, TypeScript/Node.js, Bash scripting" },
    { title: "Databases & Cloud:", skills: "PostgreSQL, MySQL, Redis, Google Cloud Platform (GCP), Docker, Linux, CI/CD, Git, ServiceNow API" },
  ];

  for (const cat of skillCategories) {
    page.drawText(cat.title, {
      x: leftMargin,
      y,
      size: 8.5,
      font: fontBold,
      color: colorDark,
    });
    page.drawText(cat.skills, {
      x: leftMargin + 130,
      y,
      size: 8.2,
      font: fontRegular,
      color: colorBody,
    });
    y -= 11.5;
  }

  // 6. EDUCATION
  drawSectionTitle("Education");

  page.drawText("Master of Science (M.Sc.) in Business Statistics", {
    x: leftMargin,
    y,
    size: 9,
    font: fontBold,
    color: colorDark,
  });
  page.drawText("University of Madras  |  First Class with Distinction", {
    x: width - leftMargin - 220,
    y,
    size: 8.5,
    font: fontRegular,
    color: colorMuted,
  });
  y -= 12;

  page.drawText("Bachelor of Science (B.Sc.) in Statistics", {
    x: leftMargin,
    y,
    size: 9,
    font: fontBold,
    color: colorDark,
  });
  page.drawText("University of Madras  |  First Class", {
    x: width - leftMargin - 165,
    y,
    size: 8.5,
    font: fontRegular,
    color: colorMuted,
  });

  const pdfBytes = await pdfDoc.save();

  // Save to resources/
  fs.mkdirSync(path.join(process.cwd(), "resources"), { recursive: true });
  fs.writeFileSync(path.join(process.cwd(), "resources", "Sachin_Kumar_Resume.pdf"), pdfBytes);
  fs.writeFileSync(path.join(process.cwd(), "resources", "resume.pdf"), pdfBytes);

  // Also write to static/ for backup
  fs.mkdirSync(path.join(process.cwd(), "static"), { recursive: true });
  fs.writeFileSync(path.join(process.cwd(), "static", "Sachin_Kumar_Resume.pdf"), pdfBytes);
  fs.writeFileSync(path.join(process.cwd(), "static", "resume.pdf"), pdfBytes);

  console.log("Resume PDF generated successfully:", pdfBytes.length, "bytes");
}

generateResume().catch(console.error);
