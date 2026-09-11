# Sachin Kumar — AI/ML Engineer & Data Scientist Portfolio

A high-performance, responsive executive portfolio showcasing production-grade LLM architectures, multi-agent swarms, RAG pipelines, predictive analytics, and enterprise data science systems.

---

## Table of Contents

1. [How to Run Locally](#how-to-run-locally)
   - [Prerequisites](#prerequisites)
   - [Development Mode (Express Server)](#1-development-mode-recommended)
   - [Production Mode](#2-production-mode)
   - [Static Site Preview Mode](#3-static-preview-mode)
2. [How to Deploy to GitHub Pages](#how-to-deploy-to-github-pages)
   - [Method 1: Automated GitHub Actions (Recommended)](#method-1-automated-github-actions-recommended)
   - [Method 2: Manual Deploy with `gh-pages` Branch](#method-2-manual-deploy-with-gh-pages-branch)
   - [Method 3: Deploy via `/docs` Folder](#method-3-deploy-via-docs-folder)
3. [Key Static & GitHub Pages Features](#key-static--github-pages-features)
4. [Customization Guide](#customization-guide)
5. [Project Structure](#project-structure)
6. [Available NPM Scripts](#available-npm-scripts)

---

## How to Run Locally

### Prerequisites

Ensure you have **Node.js** (v18 or higher) and **npm** installed on your system:

```bash
node -v   # Should be >= 18.0.0
npm -v    # Should be >= 9.0.0
```

---

### 1. Development Mode (Recommended)

This starts the full local Express server with Nunjucks template rendering, live reload, and dedicated API endpoints.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sachink1712/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

> In development mode, the local server handles resume PDF downloads (`/download-resume`), PDF browser preview (`/view-resume`), project inspection endpoints (`/api/projects`), and certification verification routes (`/api/certifications`).

---

### 2. Production Mode

To test the bundled, compiled CommonJS production build locally:

```bash
# Build the bundled server
npm run build

# Launch the production server
npm start
```
Access the running service at [http://localhost:3000](http://localhost:3000).

---

### 3. Static Preview Mode

If you want to test exactly what will be served on GitHub Pages (static HTML without any Node.js backend):

```bash
# Generate the static export into the dist/ directory
npm run build:pages

# Serve the static directory locally
npx serve dist
```
Navigate to the URL printed by `serve` (usually `http://localhost:3000` or `http://localhost:5000`).

---

## How to Deploy to GitHub Pages

GitHub Pages hosts static websites (HTML, CSS, JS, images, PDFs). This repository includes a built-in static generator (`npm run build:pages`) that pre-renders the templates into static HTML with relative paths and offline JSON fallbacks.

Choose either **Method 1** (automated via GitHub Actions) or **Method 2** (manual branch push).

---

### Method 1: Automated GitHub Actions (Recommended)

This repository includes a pre-configured GitHub Actions workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). Every time you push changes to your `main` branch, GitHub automatically builds and publishes your site.

#### Step 1: Push your code to GitHub
```bash
git add .
git commit -m "Configure portfolio for GitHub Pages"
git branch -M main
git push -u origin main
```

#### Step 2: Enable GitHub Actions deployment in your repository settings
1. Open your repository on GitHub.
2. Click on **Settings** (gear icon in the top navigation bar).
3. In the left sidebar, click on **Pages** (under the "Code and automation" section).
4. Under **Build and deployment** > **Source**, select **GitHub Actions** from the dropdown menu.

#### Step 3: View your live site
- GitHub will trigger the deployment workflow automatically. You can monitor progress under the **Actions** tab.
- Once finished (typically 1–2 minutes), your portfolio will be live at:
  ```
  https://<your-username>.github.io/<your-repository-name>/
  ```
  *(e.g., `https://sachink1712.github.io/portfolio/`)*

---

### Method 2: Manual Deploy with `gh-pages` Branch

If you prefer deploying from a dedicated `gh-pages` branch:

1. **Build the static site:**
   ```bash
   npm run build:pages
   ```
   This generates the complete static website inside the `dist/` directory.

2. **Publish `dist/` to the `gh-pages` branch using `gh-pages` CLI:**
   ```bash
   npx gh-pages -d dist
   ```

3. **Configure GitHub Pages settings:**
   - Go to your repository on GitHub → **Settings** → **Pages**.
   - Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   - Select the branch: **`gh-pages`**, folder: **`/(root)`**, and click **Save**.
   - Your site will deploy in seconds!

---

### Method 3: Deploy via `/docs` Folder

If you prefer keeping static files directly on your `main` branch:

1. Build the static site:
   ```bash
   npm run build:pages
   ```

2. Copy the contents of `dist/` into a `docs/` folder:
   ```bash
   mkdir -p docs
   cp -r dist/* docs/
   git add docs/
   git commit -m "Update docs folder for GitHub Pages"
   git push origin main
   ```

3. Go to **Settings** → **Pages** → Source: **Deploy from a branch** → Branch: `main` → Folder: `/docs` → **Save**.

---

## Key Static & GitHub Pages Features

The static build generated by `npm run build:pages` is engineered for GitHub Pages:

- **Relative Asset Paths**: All CSS, JS, image, and PDF links use relative paths (`./static/...`, `./resources/...`), ensuring images and styles load seamlessly whether hosted on a custom domain (`https://sachinkumar.dev`) or a repository subpath (`https://sachink1712.github.io/portfolio/`).
- **`.nojekyll` Support**: An empty `.nojekyll` file is automatically created in `dist/` to prevent GitHub's Jekyll engine from ignoring files.
- **Embedded Modal & Filter Data**: Project detail modal inspectors and certification flip cards load directly from embedded static JSON, guaranteeing zero errors and instant response times without requiring an active backend server.
- **Direct Resume PDF Access**: The professional resume (`Sachin_Kumar_Resume.pdf`) is bundled directly in the static export, allowing visitors to download and view the PDF in-browser with standard download attributes.

---

## Customization Guide

### 1. Update Profile & Projects Data
- **Local Server Data**: Edit `server.ts` to update your bio, impact metrics, TCS experience, project links, and skills.
- **Static Pages Generator**: Update `scripts/build_pages.ts` with matching data for static deployment.

### 2. Update Portrait Photo
- Replace the image file at:
  ```
  resources/images/sachin_portrait.png
  ```
  Both the hero section and the about section will automatically reflect your new portrait upon running `npm run build:pages`.

### 3. Update Resume PDF
- Replace the PDF at:
  ```
  resources/Sachin_Kumar_Resume.pdf
  ```
  All "Download CV", "Download Resume", and "View PDF" buttons will automatically link to your updated PDF.

### 4. Update Certification Badges
- Add or update badge icons inside `static/images/badges/`.
- Update certification metadata (title, issuer, credential links) in `scripts/build_pages.ts` and `server.ts`.

---

## Project Structure

```
├── .github/
│   └── workflows/
│       └── deploy.yml            # Automated GitHub Actions deployment workflow
├── data/
│   └── contact_messages.json     # Local storage for contact inquiries
├── dist/                         # Static export output (ready for GitHub Pages)
├── resources/
│   ├── Sachin_Kumar_Resume.pdf   # Official downloadable resume PDF
│   └── images/                   # Profile portrait, logos, and project media
├── scripts/
│   ├── build_pages.ts            # Static site generator for GitHub Pages
│   └── generate_resume.ts        # PDF resume generator script
├── static/
│   ├── css/
│   │   └── styles.css            # Executive styling, theme tokens & responsive design
│   ├── images/
│   │   └── badges/               # Certification badges (GCP, Anthropic, Azure, IBM)
│   └── js/
│       └── app.js                # Interactive logic (filters, modals, flip cards)
├── templates/
│   └── index.html                # Semantic, modular Nunjucks HTML template
├── package.json                  # NPM scripts and project dependencies
├── README.md                     # Documentation (Local run & GitHub Pages guide)
├── server.ts                     # Local Express development server
├── tsconfig.json                 # TypeScript compiler configuration
└── vite.config.ts                # Vite build configuration
```

---

## Available NPM Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the local Express development server at `http://localhost:3000` with hot-reload |
| `npm run build:pages` | Compiles templates into static HTML in `dist/` with relative assets for GitHub Pages |
| `npm run build` | Builds the standalone server bundle for production Node environments |
| `npm start` | Runs the compiled CommonJS production server (`dist/server.cjs`) |
| `npm run lint` | Runs TypeScript type checking (`tsc --noEmit`) to verify code integrity |
| `npm run clean` | Cleans build artifacts and temp files |

---

## License & Attribution

Designed and developed by **Sachin Kumar** — Data Scientist & AI/ML Automation Engineer.  
Open-source under the MIT License.
