/**
 * Sachin Kumar — Portfolio Client Application Logic
 * Natural, Editorial, Easy-on-the-Eyes Theme Interactions
 */

document.addEventListener("DOMContentLoaded", () => {
  initUserPhoto();
  initScrollspy();
  initProjectFilters();
  initCertFilters();
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

    // Near bottom check: highlight the last active section
    if (window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight - 60 && sections.length > 0) {
      currentSectionId = sections[sections.length - 1].getAttribute("id");
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

  const populateProject = (project) => {
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
  };

  // Check static embedded data first
  if (window.PROJECTS_DATA && Array.isArray(window.PROJECTS_DATA)) {
    const project = window.PROJECTS_DATA.find((p) => p.id === projectId);
    if (project) {
      populateProject(project);
      return;
    }
  }

  fetch(`/api/projects`)
    .then((res) => {
      if (!res.ok) throw new Error("Status " + res.status);
      return res.json();
    })
    .then((data) => {
      const project = data.projects.find((p) => p.id === projectId);
      populateProject(project);
    })
    .catch(() => {
      // Fallback to relative static JSON for GitHub Pages deployment
      fetch("./api/projects.json")
        .then((res) => res.json())
        .then((data) => {
          const project = data.projects.find((p) => p.id === projectId);
          populateProject(project);
        })
        .catch((err) => console.error("Error loading project details:", err));
    });
};

window.closeProjectModal = function () {
  const modal = document.getElementById("project-modal");
  if (modal) {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }
};

// ---------------------------------------------------------------------------
// 6.2. Certification Badge Modal & Filter Operations
// ---------------------------------------------------------------------------
let cachedCertifications = null;

async function getCertificationsData() {
  if (cachedCertifications) return cachedCertifications;
  if (window.CERTIFICATIONS_DATA && Array.isArray(window.CERTIFICATIONS_DATA)) {
    cachedCertifications = window.CERTIFICATIONS_DATA;
    return cachedCertifications;
  }
  try {
    const res = await fetch("/api/certifications");
    if (!res.ok) throw new Error("Status " + res.status);
    const data = await res.json();
    cachedCertifications = data.certifications || [];
    return cachedCertifications;
  } catch (e) {
    try {
      const res = await fetch("./api/certifications.json");
      const data = await res.json();
      cachedCertifications = data.certifications || [];
      return cachedCertifications;
    } catch (err) {
      console.error("Failed to load certifications data:", err);
      return [];
    }
  }
}

function initCertFilters() {
  const filterBtns = document.querySelectorAll(".cert-filter-btn");
  const cards = document.querySelectorAll(".cert-card");

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const selectedIssuer = btn.getAttribute("data-issuer");

      cards.forEach((card) => {
        const cardIssuer = card.getAttribute("data-issuer");
        if (selectedIssuer === "all" || cardIssuer === selectedIssuer) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // Keyboard accessibility for flip cards
  cards.forEach((card) => {
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        if (!e.target.closest("a") && !e.target.closest("button")) {
          e.preventDefault();
          window.flipCertCard(card);
        }
      }
    });
  });
}

window.flipCertCard = function (cardEl) {
  if (!cardEl) return;
  cardEl.classList.toggle("is-flipped");
};

window.handleCertCardClick = function (cardEl, event) {
  // If user clicked directly on an anchor or button with distinct action, don't flip
  if (event && event.target && event.target.closest("a")) {
    return;
  }
  window.flipCertCard(cardEl);
};

window.openCertBadgeModal = async function (certId) {
  const modal = document.getElementById("cert-modal");
  if (!modal) return;

  const certs = await getCertificationsData();
  const cert = certs.find((c) => c.id === certId);
  if (!cert) return;

  const imgEl = document.getElementById("modal-cert-img");
  const issuerEl = document.getElementById("modal-cert-issuer-tag");
  const codeEl = document.getElementById("modal-cert-code");
  const catEl = document.getElementById("modal-cert-category");
  const titleEl = document.getElementById("modal-cert-title");
  const descEl = document.getElementById("modal-cert-desc");
  const skillsEl = document.getElementById("modal-cert-skills");
  const verifyLinkEl = document.getElementById("modal-cert-verify-link");

  if (imgEl) {
    imgEl.src = cert.badge_image;
    imgEl.alt = `${cert.title} Badge`;
  }
  if (issuerEl) issuerEl.textContent = `${cert.issuer} • ${cert.year}`;
  if (codeEl) codeEl.textContent = cert.code;
  if (catEl) catEl.textContent = cert.category;
  if (titleEl) titleEl.textContent = cert.title;
  if (descEl) descEl.textContent = cert.description;

  if (skillsEl) {
    skillsEl.innerHTML = "";
    if (cert.skills && cert.skills.length) {
      cert.skills.forEach((sk) => {
        const tag = document.createElement("span");
        tag.className = "cert-skill-tag";
        tag.textContent = sk;
        skillsEl.appendChild(tag);
      });
    }
  }

  if (verifyLinkEl) {
    verifyLinkEl.href = cert.verify_url;
  }

  modal.classList.add("open");
  document.body.style.overflow = "hidden";
};

window.closeCertBadgeModal = function () {
  const modal = document.getElementById("cert-modal");
  if (modal) {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }
};

// Close all modals on Escape key or backdrop click
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    window.closeProjectModal();
    window.closeCertBadgeModal();
  }
});

document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) {
      window.closeProjectModal();
      window.closeCertBadgeModal();
    }
  });
});

// ---------------------------------------------------------------------------
// 7. Contact Form Submission & Inquiries Inbox Manager
// ---------------------------------------------------------------------------
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function updateInboxCounters(count) {
  const footerBadge = document.getElementById("footer-inbox-badge");
  if (footerBadge) footerBadge.textContent = count;
  document.querySelectorAll(".inbox-count-display").forEach((el) => {
    el.textContent = count;
  });
}

async function refreshInboxCount() {
  try {
    const res = await fetch("/api/contact/messages");
    if (res.ok) {
      const data = await res.json();
      updateInboxCounters(data.count || 0);
    }
  } catch (e) {
    console.error("Failed to refresh inbox counter:", e);
  }
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  const statusEl = document.getElementById("form-status");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector("button[type='submit']");
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span style="display:inline-flex; align-items:center; gap:6px;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin-icon">
          <line x1="12" y1="2" x2="12" y2="6"></line>
          <line x1="12" y1="18" x2="12" y2="22"></line>
          <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
          <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
          <line x1="2" y1="12" x2="6" y2="12"></line>
          <line x1="18" y1="12" x2="22" y2="12"></line>
        </svg>
        Saving...
      </span>
    `;

    statusEl.className = "form-status";
    statusEl.style.display = "none";

    const nameVal = document.getElementById("contact-name").value.trim();
    const emailVal = document.getElementById("contact-email").value.trim();
    const phoneVal = document.getElementById("contact-phone") ? document.getElementById("contact-phone").value.trim() : "";
    const messageVal = document.getElementById("contact-message").value.trim();

    const payload = {
      name: nameVal,
      email: emailVal,
      phone: phoneVal,
      message: messageVal
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok) {
        const mailtoUrl = data.contact?.mailtoUrl || `mailto:sachinkumar171201@gmail.com?subject=Portfolio Inquiry from ${encodeURIComponent(nameVal)}`;
        const whatsappUrl = data.contact?.whatsappUrl || `https://wa.me/919840978758?text=Hi Sachin, I am ${encodeURIComponent(nameVal)}`;

        statusEl.className = "form-status success";
        statusEl.innerHTML = `
          <div class="contact-success-card">
            <div class="success-header">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2.5">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
              <span>Message Received &amp; Saved!</span>
            </div>
            <p class="success-desc">
              Thank you, <strong>${escapeHtml(nameVal)}</strong>. Your message has been saved in Sachin's portfolio inbox.
              ${data.email_dispatched ? "An automated notification has also been dispatched." : ""}
            </p>
            <div class="success-actions-row">
              <a href="${mailtoUrl}" class="btn-success-action" title="Send a direct copy via your email client">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <span>Open in Email App</span>
              </a>
              <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn-success-action btn-wa" title="Send message via WhatsApp to Sachin">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
                <span>Send on WhatsApp</span>
              </a>
            </div>
          </div>
        `;
        statusEl.style.display = "block";
        form.reset();
        showToast("Inquiry recorded successfully!");
        refreshInboxCount();
      } else {
        throw new Error(data.error || data.detail || "Failed to submit message.");
      }
    } catch (err) {
      statusEl.className = "form-status error";
      statusEl.innerHTML = `
        <div class="contact-error-card">
          <span>${escapeHtml(err.message || "An error occurred while submitting.")}</span>
          <div class="contact-fallback-links">
            <a href="mailto:sachinkumar171201@gmail.com">Direct Email: sachinkumar171201@gmail.com</a>
            <a href="tel:+91-9840978758">Phone: +91-9840978758</a>
          </div>
        </div>
      `;
      statusEl.style.display = "block";
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
}

// ---------------------------------------------------------------------------
// INQUIRIES INBOX MODAL CONTROLS
// ---------------------------------------------------------------------------
window.openInboxModal = async function () {
  const modal = document.getElementById("inbox-modal");
  if (!modal) return;
  modal.classList.add("open");
  await window.refreshInboxMessages();
};

window.closeInboxModal = function () {
  const modal = document.getElementById("inbox-modal");
  if (modal) modal.classList.remove("open");
};

window.refreshInboxMessages = async function () {
  const listEl = document.getElementById("inbox-messages-list");
  if (!listEl) return;

  listEl.innerHTML = `<div class="inbox-empty-state"><p>Loading messages...</p></div>`;

  try {
    const res = await fetch("/api/contact/messages");
    if (!res.ok) throw new Error("Failed to fetch messages");
    const data = await res.json();
    const messages = data.messages || [];

    updateInboxCounters(messages.length);

    if (messages.length === 0) {
      listEl.innerHTML = `
        <div class="inbox-empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          <h4 style="font-size:1.05rem; font-weight:700; color:var(--text-main); margin-bottom:4px;">No inquiries yet</h4>
          <p style="font-size:0.86rem; color:var(--text-muted); margin:0;">When visitors submit the Contact Me form, their messages will appear here.</p>
        </div>
      `;
      return;
    }

    listEl.innerHTML = messages
      .map((m) => {
        const mailtoReply = `mailto:${encodeURIComponent(m.email)}?subject=${encodeURIComponent("Re: Portfolio Inquiry")}`;
        const phoneLink = m.phone ? `tel:${encodeURIComponent(m.phone)}` : "";
        const cleanDigits = m.phone ? m.phone.replace(/[^0-9]/g, "") : "";
        const waLink = cleanDigits ? `https://wa.me/${cleanDigits}` : "";

        return `
          <div class="inbox-card" id="inbox-item-${escapeHtml(m.id)}">
            <div class="inbox-card-top">
              <span class="inbox-sender-name">${escapeHtml(m.name)}</span>
              <span class="inbox-time-tag">${escapeHtml(m.date_formatted || m.created_at)}</span>
            </div>

            <div class="inbox-contacts-row">
              <a href="${mailtoReply}" class="inbox-contact-pill" title="Reply to ${escapeHtml(m.email)}">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <span>${escapeHtml(m.email)}</span>
              </a>

              ${
                m.phone
                  ? `<a href="${phoneLink}" class="inbox-contact-pill" title="Call ${escapeHtml(m.phone)}">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                      <span>${escapeHtml(m.phone)}</span>
                    </a>`
                  : ""
              }
            </div>

            <div class="inbox-message-box">
              ${escapeHtml(m.message)}
            </div>

            <div class="inbox-card-footer">
              <div style="display:flex; align-items:center; gap:8px;">
                <a href="${mailtoReply}" class="inbox-btn-reply">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/></svg>
                  <span>Reply via Email</span>
                </a>
                ${
                  waLink
                    ? `<a href="${waLink}" target="_blank" rel="noopener noreferrer" class="inbox-btn-reply" style="background:#16a34a;">
                        <span>WhatsApp</span>
                      </a>`
                    : ""
                }
              </div>
              <button onclick="deleteInquiry('${escapeHtml(m.id)}')" class="inbox-btn-del" title="Delete this message">
                Delete
              </button>
            </div>
          </div>
        `;
      })
      .join("");
  } catch (err) {
    listEl.innerHTML = `
      <div class="inbox-empty-state" style="color:#b91c1c;">
        <p>Failed to load inquiries: ${escapeHtml(err.message)}</p>
      </div>
    `;
  }
};

window.deleteInquiry = async function (id) {
  if (!confirm("Are you sure you want to delete this inquiry?")) return;
  try {
    const res = await fetch(`/api/contact/messages/${encodeURIComponent(id)}`, {
      method: "DELETE"
    });
    if (res.ok) {
      showToast("Inquiry removed.");
      await window.refreshInboxMessages();
    } else {
      showToast("Failed to delete inquiry.");
    }
  } catch (e) {
    console.error("Delete failed:", e);
    showToast("Error deleting message.");
  }
};

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
