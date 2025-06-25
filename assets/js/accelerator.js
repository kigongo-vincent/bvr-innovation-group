// Loading skeleton HTML templates
const skeletonTemplates = {
  hero: `
    <div class="hero-content">
      <div class="hero-image skeleton" data-aos="fade-right">
        <div class="skeleton-image"></div>
      </div>
      <div class="hero-text" data-aos="fade-left">
        <div class="skeleton-title"></div>
        <div class="skeleton-text"></div>
        <div class="skeleton-text"></div>
        <div class="skeleton-button"></div>
      </div>
    </div>
  `,
  timeline: `
    <div class="timeline-grid">
      ${Array(4)
        .fill(
          `
        <div class="timeline-item skeleton">
          <div class="skeleton-icon"></div>
          <div class="skeleton-content">
            <div class="skeleton-title"></div>
            <div class="skeleton-text"></div>
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `,
  team: `
    <div class="team-grid">
      ${Array(3)
        .fill(
          `
        <div class="team-member skeleton">
          <div class="skeleton-image"></div>
          <div class="skeleton-title"></div>
          <div class="skeleton-text"></div>
        </div>
      `
        )
        .join("")}
    </div>
  `,
  partners: `
    <div class="partners-grid">
      <div class="partner skeleton">
        <div class="skeleton-text"></div>
        <div class="skeleton-text"></div>
      </div>
      <div class="partner-logos">
        <div class="logo-scroll-container">
          ${Array(12)
            .fill(
              `
            <div class="logo-item skeleton">
              <div class="skeleton-image"></div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    </div>
  `,
};

// Function to show loading skeletons
function showSkeletons() {
  document.querySelector(".hero").innerHTML = skeletonTemplates.hero;
  document.querySelector(".timeline .timeline-grid").innerHTML =
    skeletonTemplates.timeline;
  document.querySelector(".team .team-grid").innerHTML = skeletonTemplates.team;
  document.querySelector(".partners .partners-grid").innerHTML =
    skeletonTemplates.partners;
}

// Function to get URL parameters
function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  const results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// Function to fetch accelerator data from dump.json using nested IDs
async function fetchAcceleratorData(unitId, acceleratorId) {
  try {
    const response = await fetch("./dump.json");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();

    // Find the unit by id
    const unit = data.find((u) => String(u.id) === String(unitId));
    if (!unit || !unit.accelerators)
      throw new Error(
        `Unit with ID ${unitId} not found or has no accelerators`
      );

    // Find the accelerator by id (e.g., "3-1")
    const accelerator = unit.accelerators.find(
      (acc) => String(acc.id) === String(acceleratorId)
    );
    if (!accelerator || !accelerator.details)
      throw new Error(
        `Accelerator with ID ${acceleratorId} not found in unit ${unitId}`
      );

    return accelerator.details;
  } catch (error) {
    console.warn("Error fetching accelerator data:", error);
    return null;
  }
}

// Function to update UI with data
function updateUI(data) {
  try {
    // HERO SECTION
    const hero = document.querySelector(".hero");
    if (hero && data.hero) {
      let heroImage = "";
      if (data.hero.images?.front || data.hero.images?.back) {
        heroImage = `
          <div class="hero-image" data-aos="fade-right">
            <div class="flip-card">
              <div class="flip-card-inner">
                ${
                  data.hero.images?.front
                    ? `
                <div class="flip-card-front">
                  <img src="${data.hero.images.front}" alt="Accelerator Front" onerror="this.style.display='none';"/>
                </div>`
                    : ""
                }
                ${
                  data.hero.images?.back
                    ? `
                <div class="flip-card-back">
                  <img src="${data.hero.images.back}" alt="Accelerator Back" onerror="this.style.display='none';"/>
                </div>`
                    : ""
                }
              </div>
            </div>
          </div>
        `;
      }
      let heroText = `
        <div class="hero-text" data-aos="fade-left">
          ${data.hero.title ? `<h1>${data.hero.title}</h1>` : ""}
          ${
            data.hero.description
              ? `<p >${data.hero.description}</p>`
              : ""
          }
          ${
            data.hero.location
              ? `<br/><p style="color: rgba(0,0,0,0.4);" class="location">${data.hero.location}</p>`
              : ""
          }
          <div class="hero-actions">
            <button class="primary" data-modal="start-project">Apply Now</button>
            <a href="#program" class="secondary">Not ready to apply?</a>
          </div>
        </div>
      `;
      hero.innerHTML = `<div class="hero-content">${heroImage}${heroText}</div>`;
    } else if (hero) {
      hero.innerHTML = `<div class="hero-content"><div class="hero-text"><h1>Accelerator</h1></div></div>`;
    }

    // TIMELINE SECTION
    const timeline = document.querySelector(".timeline .timeline-grid");
    if (
      timeline &&
      data.timeline?.events &&
      Array.isArray(data.timeline.events) &&
      data.timeline.events.length > 0
    ) {
      timeline.innerHTML = data.timeline.events
        .map(
          (event, index) => `
        <div class="timeline-item" data-aos="fade-up" data-aos-delay="${
          index * 100
        }">
          <div class="timeline-icon">
            ${event.icon ? `<i class="${event.icon}"></i>` : ""}
          </div>
          <div class="timeline-content">
            ${event.title ? `<h3>${event.title}</h3>` : ""}
            ${event.date ? `<p class="date">${event.date}</p>` : ""}
            <div class="timeline-dot"></div>
          </div>
        </div>
      `
        )
        .join("");
    } else if (timeline) {
      timeline.innerHTML = "";
    }

    // QUOTE SECTION
    const quoteBox = document.querySelector(".quote-box");
    if (
      quoteBox &&
      data.quote &&
      (data.quote.text ||
        (data.quote.author &&
          (data.quote.author.name ||
            data.quote.author.role ||
            data.quote.author.image)))
    ) {
      quoteBox.innerHTML = `
        <div class="quote-content">
          ${
            data.quote.text ? `<blockquote>${data.quote.text}</blockquote>` : ""
          }
          ${
            data.quote.author
              ? `<div class="quote-author">
                  ${
                    data.quote.author.image
                      ? `<img src="${data.quote.author.image}" alt="${
                          data.quote.author.name || ""
                        }" class="author-avatar" onerror="this.style.display='none';" />`
                      : ""
                  }
                  <div class="author-info">
                    ${
                      data.quote.author.name
                        ? `<cite class="text-light">${data.quote.author.name}</cite>`
                        : ""
                    }
                    ${
                      data.quote.author.role
                        ? `<span class="text-light">${data.quote.author.role}</span>`
                        : ""
                    }
                  </div>
                </div>`
              : ""
          }
        </div>
      `;
    } else if (quoteBox) {
      quoteBox.innerHTML = "";
    }

    // HOW WE WORK SECTION
    try {
      renderHowWeWork(data);
    } catch (e) {
      console.warn("HowWeWork section error:", e);
    }

    // TEAM SECTION
    const teamGrid = document.querySelector(".team .team-grid");
    if (
      teamGrid &&
      data.team?.members &&
      Array.isArray(data.team.members) &&
      data.team.members.length > 0
    ) {
      teamGrid.innerHTML = data.team.members
        .map(
          (member, index) => `
        <div class="team-member" data-aos="fade-up" data-aos-delay="${
          index * 100
        }">
          ${
            member.image
              ? `<img src="${member.image}" alt="${
                  member.name || ""
                }" onerror="this.style.display='none';" />`
              : ""
          }
          ${member.name ? `<h3>${member.name}</h3>` : ""}
          ${member.role ? `<p>${member.role}</p>` : ""}
        </div>
      `
        )
        .join("");
    } else if (teamGrid) {
      teamGrid.innerHTML = "";
    }

    // PARTNERS SECTION
    const partnersGrid = document.querySelector(".partners .partners-grid");
    if (
      partnersGrid &&
      data.partners &&
      (data.partners.quote?.text ||
        (Array.isArray(data.partners.logos) && data.partners.logos.length > 0))
    ) {
      // Determine if auto-scroll should be enabled
      const logos = Array.isArray(data.partners.logos)
        ? data.partners.logos
        : [];
      let enableAutoScroll = false;
      if (window.innerWidth >= 992) {
        // Large screens (lg)
        enableAutoScroll = logos.length >= 10;
      } else {
        // Small screens
        enableAutoScroll = logos.length >= 3;
      }
      partnersGrid.innerHTML = `
        ${
          data.partners.quote?.text
            ? `<div class="partner">
                <blockquote>${data.partners.quote.text}</blockquote>
                ${
                  data.partners.quote.author
                    ? `<small>${data.partners.quote.author}</small>`
                    : ""
                }
              </div>`
            : ""
        }
        ${
          logos.length > 0
            ? enableAutoScroll
              ? `<div class="partner-logos">
                  <div class="logo-scroll-container">
                    <div class="logo-scroll">
                      ${logos
                        .map(
                          (logo) => `
                        <div class="logo-item">
                          <img src="${logo}" alt="Partner Logo" onerror="this.style.display='none';" />
                        </div>
                      `
                        )
                        .join("")}
                    </div>
                  </div>
                </div>`
              : `<div class="partner-logos">
                  <div class="logo-static-container" style="display: flex; flex-direction: row; gap: 1.5rem; flex-wrap: nowrap; overflow-x: auto; scrollbar-width: none; -ms-overflow-style: none;">
                    ${logos
                      .map(
                        (logo) => `
                      <div class="logo-item">
                        <img src="${logo}" alt="Partner Logo" onerror="this.style.display='none';" />
                      </div>
                    `
                      )
                      .join("")}
                  </div>
                </div>`
            : ""
        }
      `;
    } else if (partnersGrid) {
      partnersGrid.innerHTML = "";
    }
  } catch (err) {
    console.error("Error updating UI:", err);
    showNotFound();
  }
}

// Function to render "How We Work" section
function renderHowWeWork(details) {
  const howWeWorkSection = document.querySelector(".how-we-work");
  if (!howWeWorkSection) return;
  if (
    !details ||
    !details.howWeWork ||
    (!details.howWeWork.tagline &&
      (!Array.isArray(details.howWeWork.list) ||
        details.howWeWork.list.length === 0))
  ) {
    howWeWorkSection.style.display = "none";
    return;
  }
  howWeWorkSection.style.display = "";
  const { tagline, list } = details.howWeWork;
  let html = tagline ? `<h3>${tagline}</h3>` : "";
  if (Array.isArray(list) && list.length > 0) {
    html += "<ul>";
    list.forEach((item) => {
      html += `<li>${item}</li>`;
    });
    html += "</ul>";
  }
  howWeWorkSection.innerHTML = html;
}

function renderBusinessesGet(details) {
  if (
    !details.businessesGet ||
    !details.businessesGet.items ||
    details.businessesGet.items.length === 0
  )
    return "";
  const { title, items } = details.businessesGet;
  return `
    <section class="businesses-get" data-aos="fade-up">
      <div class="container">
        <h2>${title || ""}</h2>
        <ul>
          ${(items || [])
            .map(
              (item) => `<li><i class="fas fa-check-circle"></i> ${item}</li>`
            )
            .join("")}
        </ul>
      </div>
    </section>
  `;
}

function renderSelectionCriteria(details) {
  if (
    !details.selectionCriteria ||
    !details.selectionCriteria.items ||
    details.selectionCriteria.items.length === 0
  )
    return "";
  const { title, items } = details.selectionCriteria;
  return `
    <section class="selection-criteria" data-aos="fade-up">
      <div class="container">
        <h2>${title || ""}</h2>
        <ul>
          ${(items || [])
            .map((item) => `<li><i class="fas fa-star"></i> ${item}</li>`)
            .join("")}
        </ul>
      </div>
    </section>
  `;
}

function renderBusinessesSelection(details) {
  const container = document.getElementById("businesses-selection-container");
  if (!container) return;
  const businessesGetHtml = renderBusinessesGet(details);
  const selectionCriteriaHtml = renderSelectionCriteria(details);
  if (!businessesGetHtml && !selectionCriteriaHtml) {
    container.style.display = "none";
    return;
  }
  container.style.display = "";
  container.innerHTML = businessesGetHtml + selectionCriteriaHtml;
}

// Function to show not found view
function showNotFound() {
  const hero = document.querySelector(".hero");
  hero.innerHTML = `
    <div class="hero-content">
      <div class="hero-image" data-aos="fade-right">
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Background Circle -->
          <circle cx="200" cy="200" r="150" fill="#F5F5F5"/>
          
          <!-- Document Icon -->
          <rect x="140" y="120" width="120" height="160" rx="8" fill="#E0E0E0"/>
          <path d="M160 160H240" stroke="white" stroke-width="8" stroke-linecap="round"/>
          <path d="M160 200H240" stroke="white" stroke-width="8" stroke-linecap="round"/>
          <path d="M160 240H200" stroke="white" stroke-width="8" stroke-linecap="round"/>
          
          <!-- Question Mark -->
          <circle cx="280" cy="120" r="40" fill="#E0E0E0"/>
          <path d="M280 100V110" stroke="white" stroke-width="8" stroke-linecap="round"/>
          <circle cx="280" cy="130" r="4" fill="white"/>
        </svg>
      </div>
      <div class="hero-text" data-aos="fade-left">
        <h3>Accelerator Not Found</h3>
        <p class="lead">
          We couldn't find the accelerator program you're looking for. Please check the URL or return to the homepage.
        </p>
        <div class="hero-actions">
          <a href="/" class="primary">Return Home</a>
          <a href="/units.html" class="secondary">View All Programs</a>
        </div>
      </div>
    </div>
  `;

  // Hide other sections
  document.querySelector(".timeline").style.display = "none";
  document.querySelector(".program-details").style.display = "none";
  document.querySelector(".team").style.display = "none";
  document.querySelector(".partners").style.display = "none";
}

// Function to initialize the page
async function initializePage() {
  showSkeletons();
  // Support URLs like ?id=3-1
  let unitId, acceleratorId;
  const idParam = getUrlParameter("id");
  const acceleratorParam = getUrlParameter("accelerator");
  if (idParam && idParam.includes("-")) {
    // If id is like "3-1", split it
    [unitId] = idParam.split("-");
    acceleratorId = idParam;
  } else if (idParam && acceleratorParam) {
    unitId = idParam;
    acceleratorId = acceleratorParam;
  } else {
    showNotFound();
    return;
  }
  const data = await fetchAcceleratorData(unitId, acceleratorId);
  if (data) {
    updateUI(data);
    renderHowWeWork(data);
    renderBusinessesSelection(data); // Use the new function here
  } else {
    showNotFound();
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initializePage);
