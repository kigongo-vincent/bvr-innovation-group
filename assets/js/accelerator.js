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

// Function to fetch accelerator data
async function fetchAcceleratorData(id) {
  try {
    const response = await fetch("./assets/data/ac-data.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Since data is an array, we can directly find the accelerator
    const accelerator = data.find((acc) => acc.id === parseInt(id));

    if (!accelerator) {
      throw new Error(`Accelerator with ID ${id} not found`);
    }

    return accelerator;
  } catch (error) {
    console.warn("Error fetching accelerator data:", error);
    return null;
  }
}

// Function to update UI with data
function updateUI(data) {
  // Update Hero Section
  const hero = document.querySelector(".hero");
  hero.innerHTML = `
    <div class="hero-content">
      <div class="hero-image" data-aos="fade-right">
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <img src="${data.hero.images.front}" alt="Accelerator Front" />
            </div>
            <div class="flip-card-back">
              <img src="${data.hero.images.back}" alt="Accelerator Back" />
            </div>
          </div>
        </div>
      </div>
      <div class="hero-text" data-aos="fade-left">
        <h1>${data.hero.title}</h1>
        <p class="lead">${data.hero.description}</p>
        <p class="location">${data.hero.location}</p>
        <div class="hero-actions">
          <button class="primary" data-modal="start-project">Apply Now</button>
          <a href="#program" class="secondary">Not ready to apply?</a>
        </div>
      </div>
    </div>
  `;

  // Update Timeline Section
  const timeline = document.querySelector(".timeline .timeline-grid");
  timeline.innerHTML = data.timeline.events
    .map(
      (event, index) => `
    <div class="timeline-item" data-aos="fade-up" data-aos-delay="${
      index * 100
    }">
      <div class="timeline-icon">
        <i class="${event.icon}"></i>
      </div>
      <div class="timeline-content">
        <h3>${event.title}</h3>
        <p class="date">${event.date}</p>
        <div class="timeline-dot"></div>
      </div>
    </div>
  `
    )
    .join("");

  // Update Quote Section
  const quoteBox = document.querySelector(".quote-box");
  quoteBox.innerHTML = `
    <div class="quote-content">
      <blockquote>${data.quote.text}</blockquote>
      <div class="quote-author">
        <img src="${data.quote.author.image}" alt="${data.quote.author.name}" class="author-avatar" />
        <div class="author-info">
          <cite class="text-light">${data.quote.author.name}</cite>
          <span class="text-light">${data.quote.author.role}</span>
        </div>
      </div>
    </div>
  `;

  // Update Team Section
  const teamGrid = document.querySelector(".team .team-grid");
  teamGrid.innerHTML = data.team.members
    .map(
      (member, index) => `
    <div class="team-member" data-aos="fade-up" data-aos-delay="${index * 100}">
      <img src="${member.image}" alt="${member.name}" />
      <h3>${member.name}</h3>
      <p>${member.role}</p>
    </div>
  `
    )
    .join("");

  // Update Partners Section
  const partnersGrid = document.querySelector(".partners .partners-grid");
  partnersGrid.innerHTML = `
    <div class="partner">
      <blockquote>${data.partners.quote.text}</blockquote>
      <small>${data.partners.quote.author}</small>
    </div>
    <div class="partner-logos">
      <div class="logo-scroll-container">
        <div class="logo-scroll">
          ${data.partners.logos
            .map(
              (logo) => `
            <div class="logo-item">
              <img src="${logo}" alt="Partner Logo" />
            </div>
          `
            )
            .join("")}
          ${data.partners.logos
            .slice(0, 6)
            .map(
              (logo) => `
            <div class="logo-item">
              <img src="${logo}" alt="Partner Logo" />
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    </div>
  `;
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
  const id = getUrlParameter("id") || "1"; // Default to ID 1 if no ID provided
  const data = await fetchAcceleratorData(id);
  if (data) {
    updateUI(data);
  }else{
    showNotFound();
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initializePage);
