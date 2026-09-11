import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import path from "path";

async function generateResume() {
  const pdfDoc = await PDFDocument.create();
  
  // Set document metadata for standard compliance
  pdfDoc.setTitle("Sachin Kumar - Resume");
  pdfDoc.setAuthor("Sachin Kumar");
  pdfDoc.setSubject("AI/ML Engineer & Data Scientist Resume");
  pdfDoc.setKeywords(["AI", "Machine Learning", "Data Science", "LLMs", "Multi-Agent Systems", "Resume", "Sachin Kumar"]);
  pdfDoc.setProducer("Sachin Kumar Portfolio");
  pdfDoc.setCreator("Sachin Kumar Portfolio");
  pdfDoc.setCreationDate(new Date());
  pdfDoc.setModificationDate(new Date());

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

  let y = height - 38;
  const leftMargin = 42;
  const contentWidth = width - leftMargin * 2;

  // 1. HEADER
  page.drawText("SACHIN KUMAR", {
    x: leftMargin,
    y: y,
    size: 21,
    font: fontBold,
    color: colorPrimary,
  });

  y -= 16;
  page.drawText("AI/ML Engineer & Data Scientist | Production LLMs, Multi-Agent Systems & Predictive Modeling", {
    x: leftMargin,
    y: y,
    size: 9.8,
    font: fontBold,
    color: colorAccent,
  });

  y -= 14;
  const contactText = "Email: sachinkumar171201@gmail.com   |   Phone: +91-9840978758   |   Location: Chennai, India";
  page.drawText(contactText, {
    x: leftMargin,
    y: y,
    size: 8.2,
    font: fontRegular,
    color: colorBody,
  });

  y -= 12;
  const linkText = "GitHub: github.com/sachink1712   |   LinkedIn: linkedin.com/in/sachin   |   Portfolio: Live Web Profile";
  page.drawText(linkText, {
    x: leftMargin,
    y: y,
    size: 8.2,
    font: fontRegular,
    color: colorMuted,
  });

  y -= 12;
  page.drawLine({
    start: { x: leftMargin, y },
    end: { x: width - leftMargin, y },
    thickness: 1.2,
    color: colorPrimary,
  });

  // Helper to draw section titles
  function drawSectionTitle(title: string) {
    y -= 15;
    page.drawText(title.toUpperCase(), {
      x: leftMargin,
      y,
      size: 9.8,
      font: fontBold,
      color: colorPrimary,
    });
    y -= 3;
    page.drawLine({
      start: { x: leftMargin, y },
      end: { x: width - leftMargin, y },
      thickness: 0.6,
      color: colorLine,
    });
    y -= 9;
  }

  // Helper for vector bullet points
  function drawBullet(bulletY: number) {
    page.drawCircle({
      x: leftMargin + 5,
      y: bulletY + 2.6,
      size: 2,
      color: colorAccent,
    });
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
      size: 8.2,
      font: fontRegular,
      color: colorDark,
    });
    y -= 10.5;
  }

  // 3. CORE PROFESSIONAL EXPERIENCE
  drawSectionTitle("Professional Experience");

  // Tata Consultancy Services
  page.drawText("Tata Consultancy Services (TCS)", {
    x: leftMargin,
    y,
    size: 9.5,
    font: fontBold,
    color: colorDark,
  });
  page.drawText("Dec 2023 - Present  |  Chennai, India", {
    x: width - leftMargin - 170,
    y,
    size: 8.2,
    font: fontBold,
    color: colorMuted,
  });

  y -= 11;
  page.drawText("Data Scientist & AI Automation Systems Engineer", {
    x: leftMargin,
    y,
    size: 8.6,
    font: fontOblique,
    color: colorAccent,
  });
  y -= 11;

  const expBullets = [
    "ISAcS Zero-Touch Incident Auto-Resolution Swarm: Architected an autonomous multi-agent system resolving enterprise ServiceNow ITSM incidents without human intervention, reducing Mean Time to Resolution (MTTR) from 4 hours to 20 minutes (91% reduction).",
    "High-Throughput Server Latency Optimizer: Engineered an asynchronous distributed event processing pipeline cutting peak server execution latency from 4 minutes to under 3 seconds (99% reduction).",
    "Anomaly Detection & Incident Correlation: Implemented density-based clustering algorithms across multi-system server telemetry logs, accelerating incident triage speed by 45%.",
    "Custom Model Context Protocol (MCP) Database Server: Built a natural-language-to-SQL MCP agentic tool for secure, read-replicating enterprise databases, increasing analytics query throughput by +36%.",
    "Production Enterprise RAG Pipeline: Deployed hybrid dense-sparse vector retrieval with cross-encoder re-ranking for technical knowledge bases, achieving 92% retrieval accuracy and zero hallucinated runbooks."
  ];

  for (const bullet of expBullets) {
    drawBullet(y);
    
    // Wrap bullet text
    const words = bullet.split(" ");
    let line = "";
    for (let i = 0; i < words.length; i++) {
      const testLine = line + (line ? " " : "") + words[i];
      const textWidth = fontRegular.widthOfTextAtSize(testLine, 8.0);
      if (textWidth > contentWidth - 16) {
        page.drawText(line, {
          x: leftMargin + 14,
          y,
          size: 8.0,
          font: fontRegular,
          color: colorDark,
        });
        y -= 9.8;
        line = words[i];
      } else {
        line = testLine;
      }
    }
    if (line) {
      page.drawText(line, {
        x: leftMargin + 14,
        y,
        size: 8.0,
        font: fontRegular,
        color: colorDark,
      });
      y -= 10.5;
    }
  }

  // 4. VERIFIED INDUSTRY CERTIFICATIONS
  drawSectionTitle("Verified Industry Certifications & Credentials");

  const certs = [
    { name: "Google Cloud Certified: Associate Cloud Engineer", issuer: "Google Cloud", code: "GCP-ACE" },
    { name: "Claude Certified Developer - Foundations", issuer: "Anthropic", code: "CCDV-F" },
    { name: "Claude Certified Associate - Foundations", issuer: "Anthropic", code: "CCAO-F" },
    { name: "Microsoft Certified: Azure AI Fundamentals (AI-900)", issuer: "Microsoft Learn", code: "AI-900" },
    { name: "IBM Data Science Professional Certificate", issuer: "IBM", code: "IBM-DSP" },
    { name: "Codebasics: Data Science & Machine Learning", issuer: "Codebasics.io", code: "CB-DSML" },
    { name: "Azure AI Engineer Associate (AI-102) [In Progress]", issuer: "Microsoft Learn", code: "AI-102" }
  ];

  // Render certs in 2 columns
  const colWidth = (contentWidth - 16) / 2;
  for (let i = 0; i < certs.length; i += 2) {
    const cert1 = certs[i];
    const cert2 = certs[i + 1];

    // Col 1
    drawBullet(y);
    page.drawText(`${cert1.name}`, {
      x: leftMargin + 14,
      y,
      size: 7.7,
      font: fontBold,
      color: colorDark,
    });
    page.drawText(`[${cert1.issuer}]`, {
      x: leftMargin + 14,
      y: y - 8.5,
      size: 7.0,
      font: fontRegular,
      color: colorMuted,
    });

    // Col 2
    if (cert2) {
      page.drawCircle({
        x: leftMargin + colWidth + 14,
        y: y + 2.6,
        size: 2,
        color: colorAccent,
      });
      page.drawText(`${cert2.name}`, {
        x: leftMargin + colWidth + 23,
        y,
        size: 7.7,
        font: fontBold,
        color: colorDark,
      });
      page.drawText(`[${cert2.issuer}]`, {
        x: leftMargin + colWidth + 23,
        y: y - 8.5,
        size: 7.0,
        font: fontRegular,
        color: colorMuted,
      });
    }

    y -= 18;
  }

  // 5. SELECTED AI PROJECTS & COMPETITIONS
  drawSectionTitle("Key Projects & Honors");

  // Google Cloud Debate
  page.drawText("Google Cloud Technical Debate - First Place Winner (2024)", {
    x: leftMargin,
    y,
    size: 9.0,
    font: fontBold,
    color: colorDark,
  });
  y -= 10;
  drawBullet(y);
  page.drawText("Awarded 1st place in regional technical debate evaluating multi-agent orchestration patterns, cloud scalability, and enterprise RAG reliability.", {
    x: leftMargin + 14,
    y,
    size: 7.8,
    font: fontRegular,
    color: colorDark,
  });
  y -= 12;

  // Agentic Workflow
  page.drawText("Autonomous Multi-Agent Workflow Engine", {
    x: leftMargin,
    y,
    size: 9.0,
    font: fontBold,
    color: colorDark,
  });
  y -= 10;
  drawBullet(y);
  page.drawText("Designed specialized supervisor and worker agents with dynamic state machines, automated fallback retry loops, and telemetry auditing.", {
    x: leftMargin + 14,
    y,
    size: 7.8,
    font: fontRegular,
    color: colorDark,
  });
  y -= 12;

  // 6. TECHNICAL SKILLS
  drawSectionTitle("Technical Skills");

  const skillCategories = [
    { title: "Generative AI & LLMs:", skills: "LangChain, LangGraph, Multi-Agent Systems, RAG, MCP (Model Context Protocol), Prompt Engineering, Vector DBs" },
    { title: "Machine Learning & Stats:", skills: "Predictive Modeling, Time-Series Forecasting (ARIMA, Prophet), Anomaly Detection, Clustering, Hypothesis Testing" },
    { title: "Languages & Frameworks:", skills: "Python (NumPy, Pandas, SciPy, Scikit-learn, PyTorch, FastAPI, Flask), SQL, TypeScript/Node.js, Bash" },
    { title: "Databases & Cloud:", skills: "PostgreSQL, MySQL, Redis, Google Cloud Platform (GCP), Microsoft Azure, Docker, Linux, CI/CD, Git" },
  ];

  for (const cat of skillCategories) {
    page.drawText(cat.title, {
      x: leftMargin,
      y,
      size: 8.0,
      font: fontBold,
      color: colorDark,
    });
    page.drawText(cat.skills, {
      x: leftMargin + 125,
      y,
      size: 7.8,
      font: fontRegular,
      color: colorBody,
    });
    y -= 10.5;
  }

  // 7. EDUCATION
  drawSectionTitle("Education");

  page.drawText("Master of Science (M.Sc.) in Business Statistics", {
    x: leftMargin,
    y,
    size: 8.6,
    font: fontBold,
    color: colorDark,
  });
  page.drawText("University of Madras  |  First Class with Distinction", {
    x: width - leftMargin - 200,
    y,
    size: 8.0,
    font: fontRegular,
    color: colorMuted,
  });
  y -= 10.5;

  page.drawText("Bachelor of Science (B.Sc.) in Statistics", {
    x: leftMargin,
    y,
    size: 8.6,
    font: fontBold,
    color: colorDark,
  });
  page.drawText("University of Madras  |  First Class", {
    x: width - leftMargin - 150,
    y,
    size: 8.0,
    font: fontRegular,
    color: colorMuted,
  });

  // CRITICAL: useObjectStreams: false ensures 100% universal compatibility across all PDF viewers, Acrobat Reader, Mac Preview, mobile browsers, etc.
  const pdfBytes = await pdfDoc.save({ useObjectStreams: false });

  // Save to resources/
  fs.mkdirSync(path.join(process.cwd(), "resources"), { recursive: true });
  fs.writeFileSync(path.join(process.cwd(), "resources", "Sachin_Kumar_Resume.pdf"), pdfBytes);
  fs.writeFileSync(path.join(process.cwd(), "resources", "resume.pdf"), pdfBytes);

  // Also write to static/ for backup
  fs.mkdirSync(path.join(process.cwd(), "static"), { recursive: true });
  fs.writeFileSync(path.join(process.cwd(), "static", "Sachin_Kumar_Resume.pdf"), pdfBytes);
  fs.writeFileSync(path.join(process.cwd(), "static", "resume.pdf"), pdfBytes);

  console.log("Universal Resume PDF generated successfully:", pdfBytes.length, "bytes, end y:", y);
}

generateResume().catch(console.error);
