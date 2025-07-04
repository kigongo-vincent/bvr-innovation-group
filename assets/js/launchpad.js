// Launchpad Portfolio Data (replace with real data or fetch from JSON if needed)
const launchpadProjects = [
  {
    bgType: "image",
    bgValue:
      "https://images.pexels.com/photos/5077049/pexels-photo-5077049.jpeg",
    logo: "",
    title: "airbnb",
    desc: "Airbnb is an online community marketplace for people to list, discover, and book accommodations through mobile phones or the...",
    statusLabel: "IPO:",
    status: "ABNB",
    textColor: "white",
    milestones: {
      stage: "IPO",
      ipo: "ABNB",
    },
    builders: ["Nathan Blecharczyk", "Brian Chesky", "Joe Gebbia"],
    links: [
      { icon: "fab fa-facebook-f", url: "https://facebook.com/airbnb" },
      { icon: "fas fa-envelope", url: "mailto:info@airbnb.com" },
      {
        icon: "fab fa-linkedin-in",
        url: "https://linkedin.com/company/airbnb",
      },
      { icon: "fas fa-laptop", url: "https://airbnb.com" },
    ],
    profile:
      "Airbnb is an online community marketplace for people to list, discover, and book accommodations through mobile phones or the internet.",
    news: {
      image: "https://a16z.com/wp-content/uploads/2020/12/airbnb-orange.png",
      text: "Talk about a business with humble roots. Brian Chesky and Joe Gebbia met at the Rhode Island School of Design and became roommates in San Francisco in 2007. A prominent design conference was coming to town and the nearby...",
      link: "https://a16z.com/airbnb-story",
    },
  },
  {
    bgType: "image",
    bgValue:
      "https://images.pexels.com/photos/5077043/pexels-photo-5077043.jpeg",
    logo: "",
    title: "citizen",
    desc: "Giving patients control over their health records by collecting, summarizing and encoding full medical records for patients,...",
    statusLabel: "Acquired By:",
    status: "Invitae",
    textColor: "white",
    milestones: {
      stage: "Acquired",
      acquirer: "Invitae",
    },
    builders: ["Founder 1", "Founder 2"],
    links: [],
    profile:
      "Citizen helps patients collect, summarize, and encode their full medical records for better health outcomes.",
    news: {
      image: "https://a16z.com/wp-content/uploads/2020/12/citizen-orange.png",
      text: "Citizen was acquired by Invitae, expanding access to patient-driven health data...",
      link: "https://a16z.com/citizen-story",
    },
  },
  {
    bgType: "image",
    bgValue:
      "https://images.pexels.com/photos/29559671/pexels-photo-29559671.jpeg",
    logo: "",
    title: "coinbase",
    desc: "Coinbase is a digital currency wallet and platform where merchants and consumers can transact with digital currencies like bitcoin, ethereum, an...",
    statusLabel: "IPO:",
    status: "COIN",
    textColor: "white",
    milestones: {
      stage: "IPO",
      ipo: "COIN",
    },
    builders: ["Brian Armstrong", "Fred Ehrsam"],
    links: [
      { icon: "fab fa-facebook-f", url: "https://facebook.com/coinbase" },
      {
        icon: "fab fa-linkedin-in",
        url: "https://linkedin.com/company/coinbase",
      },
      { icon: "fas fa-laptop", url: "https://coinbase.com" },
    ],
    profile:
      "Coinbase is a digital currency wallet and platform for merchants and consumers.",
    news: {
      image: "https://a16z.com/wp-content/uploads/2020/12/coinbase-orange.png",
      text: "Coinbase went public as COIN, becoming one of the largest crypto exchanges in the world...",
      link: "https://a16z.com/coinbase-story",
    },
  },
];

const launchpadLogos = [
  {
    src: "https://res.cloudinary.com/dauv815j5/image/upload/v1750874343/1-1_xfftbe.png",
    status: "Partner",
  },
  {
    src: "https://res.cloudinary.com/dauv815j5/image/upload/v1750875291/Picture5_gbybeu.png",
    status: "Client",
  },
];

function showLaunchpadModal(project) {
  // Remove any existing modal
  const existing = document.getElementById("lp-modal-overlay");
  if (existing) existing.remove();

  // Decorative topo background image
  const topoImg = "assets/img/contours.svg";

  // Use project.logo if present, else fallback to a placeholder or empty string
  const logo = project.logo || "";

  // Milestones section
  let milestonesHtml = "";
  if (project.milestones) {
    milestonesHtml += `<div style='font-weight:700;margin-bottom:0.3rem;'>Milestones</div>`;
    if (project.milestones.stage) {
      milestonesHtml += `<div><span style='font-weight:700;'>Current Stage:</span> ${project.milestones.stage}</div>`;
    }
    if (project.milestones.ipo) {
      milestonesHtml += `<div><span style='font-weight:700;'>IPO:</span> ${project.milestones.ipo}</div>`;
    }
    if (project.milestones.acquirer) {
      milestonesHtml += `<div><span style='font-weight:700;'>Acquirer:</span> ${project.milestones.acquirer}</div>`;
    }
  }

  // Links section
  let linksHtml = "";
  if (project.links && project.links.length) {
    linksHtml = `<div style='display:flex;gap:0.5rem;'>${project.links
      .map(
        (link) =>
          `<a href='${link.url}' target='_blank' style='display:inline-block;background:#4fc3f7;color:#fff;border-radius:4px;width:32px;height:32px;text-align:center;line-height:32px;font-size:1.2rem;'><i class='${link.icon}'></i></a>`
      )
      .join("")}</div>`;
  }

  // News section
  let newsHtml = "";
  if (project.news) {
    newsHtml = `
      <div style='display:flex;gap:1.2rem;align-items:flex-start;'>
        ${
          project.bgValue
            ? `<img src='${project.bgValue}' alt='news' style='width:180px;height:auto;border-radius:4px;object-fit:cover;flex-shrink:0;'/>`
            : ""
        }
        <div style='flex:1 1 0;min-width:0;color:#222;font-size:1.08rem;'>
          <div>${project.news.text || ""}</div>
          ${
            project.news.link
              ? `<a href='${project.news.link}' target='_blank' style='display:inline-block;margin-top:0.7rem;color:#00bcd4;font-weight:700;text-decoration:none;font-size:1.1rem;'>Read More &rarr;</a>`
              : ""
          }
        </div>
      </div>
    `;
  }

  // Modal HTML
  const overlay = document.createElement("div");
  overlay.id = "lp-modal-overlay";
  overlay.className = "lp-modal-overlay";
  overlay.innerHTML = `
    <div class="lp-modal-content">
      <button class="lp-modal-close" aria-label="Close">&times;</button>
      <br/>
      <div class="lp-modal-body" style="padding:0;">
        <div style="background:#f8f8f8;position:relative;padding:2.5rem 2rem 2rem 2rem;overflow:hidden;">

        
          <div style='position:absolute;top:0;right:0;width:350px;height:350px;z-index:0;pointer-events:none;overflow:hidden;'>
            <img src='${topoImg}' alt='' style='width:100%;height:100%;object-fit:cover;opacity:0.18;'/>
          </div>
          ${
            logo
              ? `<img src='${logo}' alt='${project.title}' style='display:block;margin:0 auto 1.5rem auto;max-width:180px;max-height:60px;position:relative;z-index:1;'/>`
              : ""
          }
          <div style='position:relative;z-index:1;text-align:center;font-size:2.5rem;font-family:serif;font-weight:400;margin-bottom:1.5rem;'>${
            project.title
          }</div>
          <div class="lp-modal-info-row" style='position:relative;z-index:1;'>
            <div class="lp-modal-info-col">
              ${milestonesHtml}
            </div>
            <div class="lp-modal-info-col">
              ${linksHtml}
              ${
                project.builders && project.builders.length
                  ? `<div style='margin-top:0.7rem;font-size:0.98rem;color:#444;'><span style='font-weight:700;'>Builders:</span> ${project.builders.join(
                      ", "
                    )}</div>`
                  : ""
              }
            </div>
          </div>
        </div>
        <div style='padding:2rem 2rem 0 2rem;'>
          <div style='font-size:1.5rem;font-weight:700;margin-bottom:0.7rem;'>Company Profile</div>
          <div style='font-size:1.08rem;color:#222;margin-bottom:2.2rem;'>${
            project.profile || project.desc || ""
          }</div>
          <hr style='margin:1.5rem 0 1.5rem 0;border:none;border-top:1px solid #ddd;'/>
          <div style='font-size:1.5rem;font-weight:700;margin-bottom:1.2rem;'>Investment News</div>
          ${newsHtml}
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  // Animate in
  setTimeout(() => overlay.classList.add("open"), 10);

  // Close modal on overlay or button click, with animation
  function closeModal() {
    overlay.classList.remove("open");
    overlay.classList.add("close");
    overlay.addEventListener("transitionend", function handler(e) {
      if (e.target === overlay) {
        overlay.removeEventListener("transitionend", handler);
        overlay.remove();
      }
    });
  }

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay || e.target.classList.contains("lp-modal-close")) {
      closeModal();
    }
  });
}

function addLaunchpadCardListeners() {
  const cards = document.querySelectorAll(".lp-card");
  cards.forEach((card) => {
    card.addEventListener("click", function () {
      const idx = this.getAttribute("data-index");
      showLaunchpadModal(launchpadProjects[idx]);
    });
  });
}

function renderPortfolioGrid() {
  const grid = document.getElementById("lp-grid");
  if (!grid) return;
  grid.innerHTML = launchpadProjects
    .map((card, idx) => {
      return `
      <div class="lp-card" data-index="${idx}" style="background: url('${card.bgValue}') center/cover no-repeat; position: relative; color: ${card.textColor};">
        <div class='lp-card-overlay'></div>
        <div class="lp-card-content" style="position: relative; z-index: 2; height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="lp-card-title" style="color: ${card.textColor}; font-size: 2rem; font-weight: 700; text-transform: lowercase; margin-bottom: 1.2rem;">${card.title}</div>
            <div class="lp-card-desc" style="color: ${card.textColor}; font-size: 1.15rem; font-weight: 400; margin-bottom: 2.5rem;">${card.desc}</div>
          </div>
          <div class="lp-card-status" style="color: ${card.textColor}; font-size: 1.1rem; font-weight: 600; letter-spacing: 0.5px;">
            ${card.statusLabel} <span style="font-weight: 700;">${card.status}</span>
          </div>
        </div>
      </div>
    `;
    })
    .join("");
  addLaunchpadCardListeners();
}

function renderLogoWall() {
  const wall = document.getElementById("lp-logo-wall");
  if (!wall) return;
  wall.innerHTML = launchpadLogos
    .map(
      (logo) => `
    <div>
      <img src="${logo.src}" alt="Logo" />
      <div class="lp-logo-status">${logo.status}</div>
    </div>
  `
    )
    .join("");
}

// Fetch and render data from launchpad.json
let allVentures = [];
let allEcosystems = [];

async function fetchAndRenderLaunchpad() {
  const response = await fetch("launchpad.json");
  const data = await response.json();
  allVentures = data.ventures;
  allEcosystems = data.ecosystem_infrastructure;
  populateSectorFilter();
  populateStatusFilter();
  applyFiltersAndRender();
  setupFilterListeners();
}

function getUniqueSectors() {
  const sectors = [
    ...allVentures.map((v) => v.sector),
    ...allEcosystems.map((e) => e.sector),
  ];
  return Array.from(new Set(sectors)).sort();
}

function getUniqueStatuses() {
  const statuses = allVentures.map((v) => v.status).filter(Boolean);
  return Array.from(new Set(statuses)).sort();
}

function populateSectorFilter() {
  const sectorSelect = document.getElementById("filter-sector");
  if (!sectorSelect) return;
  const sectors = getUniqueSectors();
  sectorSelect.innerHTML =
    '<option value="">All Sectors</option>' +
    sectors.map((s) => `<option value="${s}">${s}</option>`).join("");
}

function populateStatusFilter() {
  const statusSelect = document.getElementById("filter-status");
  if (!statusSelect) return;
  const statuses = getUniqueStatuses();
  statusSelect.innerHTML =
    '<option value="">All Statuses</option>' +
    statuses.map((s) => `<option value="${s}">${s}</option>`).join("");
}

// --- Airbnb-inspired Type Chip Filter Logic ---

function setupTypeChipListeners() {
  const chips = document.querySelectorAll(".lp-chip");
  chips.forEach((chip) => {
    chip.addEventListener("click", function () {
      chips.forEach((c) => c.classList.remove("active"));
      this.classList.add("active");
      // Set the filter type value for filtering
      document.getElementById("filter-type").value =
        this.getAttribute("data-type");
      applyFiltersAndRender();
    });
  });
}

// Remove the select for filter-type from setupFilterListeners
function setupFilterListeners() {
  ["filter-sector", "filter-status", "search-input"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", applyFiltersAndRender);
      if (el.tagName === "SELECT") {
        el.addEventListener("change", applyFiltersAndRender);
      }
    }
  });
  // Type chips
  setupTypeChipListeners();
  // Clear Filters
  const clearFiltersBtn = document.getElementById("clear-filters-btn");
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener("click", () => {
      // Reset chips
      document.querySelectorAll(".lp-chip").forEach((chip, i) => {
        chip.classList.toggle("active", i === 0);
      });
      document.getElementById("filter-type").value = "all";
      document.getElementById("filter-sector").value = "";
      document.getElementById("filter-status").value = "";
      applyFiltersAndRender();
    });
  }
  // Clear Search
  const clearSearchBtn = document.getElementById("clear-search-btn");
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", () => {
      document.getElementById("search-input").value = "";
      applyFiltersAndRender();
    });
  }
}

// Remove filter-type select from applyFiltersAndRender
function applyFiltersAndRender() {
  // Get type from chip
  let type =
    document.querySelector(".lp-chip.active")?.getAttribute("data-type") ||
    "all";
  const sector = document.getElementById("filter-sector")?.value || "";
  const status = document.getElementById("filter-status")?.value || "";
  const search =
    document.getElementById("search-input")?.value.trim().toLowerCase() || "";

  // Filter ventures
  let ventures = allVentures.filter((v) => {
    let match = true;
    if (sector && v.sector !== sector) match = false;
    if (status && v.status !== status) match = false;
    if (
      search &&
      !(
        v.name.toLowerCase().includes(search) ||
        v.sector.toLowerCase().includes(search) ||
        v.description.toLowerCase().includes(search)
      )
    )
      match = false;
    return match;
  });

  // Filter ecosystems
  let ecosystems = allEcosystems.filter((e) => {
    let match = true;
    if (sector && e.sector !== sector) match = false;
    if (
      search &&
      !(
        e.name.toLowerCase().includes(search) ||
        e.sector.toLowerCase().includes(search) ||
        e.description.toLowerCase().includes(search)
      )
    )
      match = false;
    return match;
  });

  // Show/hide grids based on type
  const venturesSection =
    document.getElementById("ventures-grid").parentElement;
  const ecosystemSection =
    document.getElementById("ecosystem-grid").parentElement;
  if (type === "ventures") {
    venturesSection.style.display = "";
    ecosystemSection.style.display = "none";
  } else if (type === "ecosystem") {
    venturesSection.style.display = "none";
    ecosystemSection.style.display = "";
  } else {
    venturesSection.style.display = "";
    ecosystemSection.style.display = "";
  }

  renderVenturesGrid(ventures);
  renderEcosystemGrid(ecosystems);
}

function renderVenturesGrid(ventures) {
  const grid = document.getElementById("ventures-grid");
  if (!grid) return;
  let html = "";
  const perRow = 3;
  ventures.forEach((venture) => {
    html += `
      <div class="lp-card" style="background: #f9f9f9; border-radius: 10px; color: #222; cursor: default;">
        <div class="lp-card-content" style="align-items: flex-start;">
          <div style="font-size:2.5rem; margin-bottom: 0.7rem;">${
            venture.logo
          }</div>
          <div class="lp-card-title" style="margin-bottom:0.5rem;">${
            venture.name
          }</div>
          <div class="lp-card-desc" style="margin-bottom:0.7rem;">${
            venture.description
          }</div>
          <div style="font-size:0.98rem; color:#666; margin-bottom:0.5rem;">${
            venture.sector
          }</div>
          <div class="lp-card-status" style="font-size:1.1rem;">${
            venture.status || ""
          }</div>
        </div>
      </div>
    `;
  });
  // Fill remaining columns with empty cards if needed
  const remainder = ventures.length % perRow;
  if (remainder !== 0) {
    for (let j = remainder; j < perRow; j++) {
      html +=
        '<div class="lp-card lp-card-empty" style="background: #fff; border: none; box-shadow: none;"></div>';
    }
  }
  grid.innerHTML = html;
}

function renderEcosystemGrid(ecosystems) {
  const grid = document.getElementById("ecosystem-grid");
  if (!grid) return;
  let html = "";
  const perRow = 3;
  ecosystems.forEach((eco) => {
    html += `
      <div class="lp-card" style="background: #f9f9f9; border-radius: 10px; color: #222; cursor: default;">
        <div class="lp-card-content" style="align-items: flex-start;">
          <div style="font-size:2.5rem; margin-bottom: 0.7rem;">${eco.logo}</div>
          <div class="lp-card-title" style="margin-bottom:0.5rem;">${eco.name}</div>
          <div class="lp-card-desc" style="margin-bottom:0.7rem;">${eco.description}</div>
          <div style="font-size:0.98rem; color:#666; margin-bottom:0.5rem;">${eco.sector}</div>
        </div>
      </div>
    `;
  });
  // Fill remaining columns with empty cards if needed
  const remainder = ecosystems.length % perRow;
  if (remainder !== 0) {
    for (let j = remainder; j < perRow; j++) {
      html +=
        '<div class="lp-card lp-card-empty" style="background: #f7f7f7; border: none; box-shadow: none;"></div>';
    }
  }
  grid.innerHTML = html;
}

// Add a hidden select for compatibility (not visible, just for JS logic)
document.addEventListener("DOMContentLoaded", () => {
  // Add hidden select for filter-type if not present
  if (!document.getElementById("filter-type")) {
    const hiddenType = document.createElement("select");
    hiddenType.id = "filter-type";
    hiddenType.style.display = "none";
    hiddenType.innerHTML = `
      <option value="all">All</option>
      <option value="ventures">Ventures</option>
      <option value="ecosystem">Ecosystem</option>
    `;
    document.body.appendChild(hiddenType);
  }
  fetchAndRenderLaunchpad();
});

// Set hero stats with real data after fetch
async function setHeroStats() {
  const response = await fetch("launchpad.json");
  const data = await response.json();
  const ventures = data.ventures || [];
  const ecosystems = data.ecosystem_infrastructure || [];
  const companies = ventures.length + ecosystems.length;
  const allSectors = [
    ...ventures.map((v) => v.sector),
    ...ecosystems.map((e) => e.sector),
  ];
  const uniqueSectors = Array.from(new Set(allSectors));
  // Pick up to 2 sector names for the summary
  const sectorList = uniqueSectors.slice(0, 2).join(", ");
  const summary = `${companies} companies and programs across ${
    uniqueSectors.length
  } sectors (e.g. ${sectorList}${
    uniqueSectors.length > 2 ? ", and more" : ""
  })`;
  const summaryDiv = document.getElementById("lp-stats-summary");
  if (summaryDiv) summaryDiv.textContent = summary;
}
document.addEventListener("DOMContentLoaded", setHeroStats);
