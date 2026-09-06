/**
 * Sachin Kumar — Portfolio Client Application Logic
 * Natural, Editorial, Easy-on-the-Eyes Theme Interactions
 */

document.addEventListener("DOMContentLoaded", () => {
  initUserPhoto();
  initScrollspy();
  initProjectFilters();
  initContactForm();
  initMobileNav();
});

// ---------------------------------------------------------------------------
// 0. User Photo & Asset Integrity
// ---------------------------------------------------------------------------

function initUserPhoto() {
  try {
    // Clear any temporary experimental local canvas captures to ensure official edited portrait is active
    localStorage.removeItem("sachin_portfolio_user_photo");
  } catch (e) {
    console.warn("Storage access note:", e);
  }

  // Ensure avatars gracefully fallback if network or image format issues occur
  const avatars = document.querySelectorAll(".global-user-avatar");
  avatars.forEach((img) => {
    img.addEventListener("error", function () {
      if (!this.getAttribute("data-fallback-attempted")) {
        this.setAttribute("data-fallback-attempted", "true");
        this.src = "/resources/images/sachin_portrait.png";
      }
    });
  });
}

// ---------------------------------------------------------------------------
// 1. Scrollspy Active Navigation Synchronizer
// ---------------------------------------------------------------------------
function initScrollspy() {
  const sections = Array.from(document.querySelectorAll("section[id]"));
  if (!sections.length) return;

  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  let ticking = false;

  function updateActiveLink() {
    const scrollPos = window.pageYOffset;
    const viewHeight = window.innerHeight;
    const focalPoint = scrollPos + viewHeight * 0.35;

    let currentSectionId = sections[0].getAttribute("id");

    for (let i = 0; i < sections.length; i++) {
      const sec = sections[i];
      const top = sec.offsetTop;
      const height = sec.offsetHeight;

      if (focalPoint >= top && focalPoint < top + height) {
        currentSectionId = sec.getAttribute("id");
        break;
      }
    }

    // Near bottom check
    if (window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight - 60) {
      currentSectionId = "contact";
    }

    navLinks.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href");
      if (href === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });

    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateActiveLink);
      ticking = true;
    }
  }, { passive: true });

  // Smooth click scroll
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  updateActiveLink();
}

// ---------------------------------------------------------------------------
// 2. Work Experience Expandable Drawer
// ---------------------------------------------------------------------------
window.toggleExpDrawer = function (drawerId) {
  const drawer = document.getElementById(drawerId);
  const btn = event && event.currentTarget;
  if (!drawer) return;

  drawer.classList.toggle("open");
  if (btn) {
    if (drawer.classList.contains("open")) {
      btn.textContent = "Hide Case Studies";
    } else {
      btn.textContent = "Review Case Studies";
    }
  }
};

// ---------------------------------------------------------------------------
// 3. Project Filter System
// ---------------------------------------------------------------------------
function initProjectFilters() {
  const filterButtons = document.querySelectorAll(".filter-pill-btn");
  const workCards = document.querySelectorAll(".work-card");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const selectedCategory = btn.getAttribute("data-category");

      workCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");
        const match = selectedCategory === "All" || cardCategory === selectedCategory;

        if (match) {
          card.style.display = "flex";
          requestAnimationFrame(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0) scale(1)";
          });
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(8px) scale(0.98)";
          setTimeout(() => {
            if (card.style.opacity === "0") {
              card.style.display = "none";
            }
          }, 200);
        }
      });
    });
  });
}

// ---------------------------------------------------------------------------
// 4. Natural Soft Fallback Generator for Project Images
// ---------------------------------------------------------------------------
window.handleProjectImageError = function (img, category) {
  if (img.dataset.fallbackApplied) return;
  img.dataset.fallbackApplied = "true";

  let bg = "#f1f5f9", accent = "#2563eb", tagText = category || "AI Engineering";
  if (category === "AI / GenAI" || category === "Agentic AI & LLMs") {
    bg = "#eff6ff"; accent = "#2563eb";
  } else if (category === "Machine Learning" || category === "Machine Learning & CV") {
    bg = "#f3e8ff"; accent = "#9333ea";
  } else if (category === "Data Engineering" || category === "Data Analytics & Time-Series") {
    bg = "#fef3c7"; accent = "#d97706";
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="400" viewBox="0 0 640 400">
    <rect width="100%" height="100%" fill="${bg}"/>
    <circle cx="320" cy="160" r="54" fill="none" stroke="${accent}" stroke-width="2.5" opacity="0.4"/>
    <circle cx="320" cy="160" r="28" fill="${accent}" opacity="0.15"/>
    <line x1="200" y1="160" x2="440" y2="160" stroke="${accent}" stroke-dasharray="6,5" opacity="0.35"/>
    <line x1="320" y1="60" x2="320" y2="260" stroke="${accent}" stroke-dasharray="6,5" opacity="0.35"/>
    <text x="320" y="300" fill="#0f172a" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="16" font-weight="700" text-anchor="middle" letter-spacing="0.5">${tagText.toUpperCase()}</text>
    <text x="320" y="325" fill="#64748b" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" font-weight="500" text-anchor="middle">PRODUCTION ARCHITECTURE</text>
  </svg>`;

  img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
};

// ---------------------------------------------------------------------------
// 5. Project Modal Detail Viewer
// ---------------------------------------------------------------------------
window.openProjectModal = function (projectId) {
  const modal = document.getElementById("project-modal");
  const titleEl = document.getElementById("modal-project-title");
  const categoryEl = document.getElementById("modal-project-category");
  const descEl = document.getElementById("modal-project-desc");
  const highlightsEl = document.getElementById("modal-project-highlights");
  const tagsEl = document.getElementById("modal-project-tags");
  const repoLinkEl = document.getElementById("modal-project-repo");

  fetch(`/api/projects`)
    .then((res) => res.json())
    .then((data) => {
      const project = data.projects.find((p) => p.id === projectId);
      if (!project) return;

      titleEl.textContent = project.title;
      categoryEl.textContent = project.category;
      descEl.textContent = project.description;
      repoLinkEl.href = project.repo_url;

      // Highlights
      highlightsEl.innerHTML = "";
      if (project.highlights && project.highlights.length > 0) {
        project.highlights.forEach((h) => {
          const li = document.createElement("li");
          li.textContent = h;
          highlightsEl.appendChild(li);
        });
      }

      // Tech Stack Tags
      tagsEl.innerHTML = "";
      if (project.tech_stack) {
        project.tech_stack.forEach((t) => {
          const span = document.createElement("span");
          span.className = "tech-chip";
          span.textContent = t;
          tagsEl.appendChild(span);
        });
      }

      modal.classList.add("open");
      document.body.style.overflow = "hidden";
    })
    .catch((err) => console.error("Error loading project details:", err));
};

window.closeProjectModal = function () {
  const modal = document.getElementById("project-modal");
  if (modal) {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }
};

// Close modals on Escape key or backdrop click
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    window.closeProjectModal();
  }
});

document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) {
      window.closeProjectModal();
    }
  });
});

// ---------------------------------------------------------------------------
// 7. Contact Form Submission
// ---------------------------------------------------------------------------
function initContactForm() {
  const form = document.getElementById("contact-form");
  const statusEl = document.getElementById("form-status");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector("button[type='submit']");
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = "Sending...";

    statusEl.className = "form-status";
    statusEl.style.display = "none";

    const phoneVal = document.getElementById("contact-phone") ? document.getElementById("contact-phone").value : "";
    const payload = {
      name: document.getElementById("contact-name").value,
      email: document.getElementById("contact-email").value,
      subject: phoneVal ? `Contact from ${phoneVal}` : "Portfolio Inquiry",
      message: document.getElementById("contact-message").value
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok) {
        statusEl.textContent = data.message || "Message sent successfully!";
        statusEl.className = "form-status success";
        statusEl.style.display = "block";
        form.reset();
        showToast("Inquiry sent successfully.");
      } else {
        throw new Error(data.detail || "Failed to send message.");
      }
    } catch (err) {
      statusEl.textContent = err.message || "An error occurred. Please try again or email directly.";
      statusEl.className = "form-status error";
      statusEl.style.display = "block";
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
}

// ---------------------------------------------------------------------------
// 8. Clipboard Copy Utility with Toast
// ---------------------------------------------------------------------------
window.copyToClipboard = function (text, label) {
  navigator.clipboard.writeText(text).then(
    () => {
      showToast(`Copied ${label} to clipboard!`);
    },
    () => {
      const input = document.createElement("input");
      input.value = text;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      showToast(`Copied ${label} to clipboard!`);
    }
  );
};

function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

// ---------------------------------------------------------------------------
// 9. Mobile Navigation Drawer
// ---------------------------------------------------------------------------
function initMobileNav() {
  const toggleBtn = document.getElementById("mobile-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
    });
  });
}
