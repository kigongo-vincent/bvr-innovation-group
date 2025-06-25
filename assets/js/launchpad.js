// Launchpad Portfolio Data (replace with real data or fetch from JSON if needed)
const launchpadProjects = [
  {
    bgType: "image",
    bgValue: "assets/images/beliefs/adapt.jpg",
    logo: "assets/icons/BVR launch pad.svg",
    title: "airbnb",
    desc: "Airbnb is an online community marketplace for people to list, discover, and book accommodations through mobile phones or the...",
    statusLabel: "IPO:",
    status: "ABNB",
    textColor: "white",
  },
  {
    bgType: "image",
    bgValue: "assets/images/beliefs/balance.jpg",
    logo: "",
    title: "citizen",
    desc: "Giving patients control over their health records by collecting, summarizing and encoding full medical records for patients,...",
    statusLabel: "Acquired By:",
    status: "Invitae",
    textColor: "white",
  },
  {
    bgType: "image",
    bgValue: "assets/images/beliefs/evolution.jpg",
    logo: "",
    title: "coinbase",
    desc: "Coinbase is a digital currency wallet and platform where merchants and consumers can transact with digital currencies like bitcoin, ethereum, an...",
    statusLabel: "IPO:",
    status: "COIN",
    textColor: "white",
  },
  {
    bgType: "image",
    bgValue: "assets/images/beliefs/opportunity.jpg",
    logo: "",
    title: "opportunity",
    desc: "Opportunity is about seizing the moment and making the most of every chance to grow and succeed.",
    statusLabel: "Featured:",
    status: "2024",
    textColor: "white",
  },
];

const launchpadLogos = [
  { src: "assets/images/logos/1-1.png", status: "Partner" },
  { src: "assets/images/logos/1-2.png", status: "Client" },
];

function renderPortfolioGrid() {
  const grid = document.getElementById("lp-grid");
  if (!grid) return;
  grid.innerHTML = launchpadProjects
    .map((card) => {
      return `
      <div class="lp-card" style="background: url('${
        card.bgValue
      }') center/cover no-repeat; position: relative; color: ${
        card.textColor
      };">
        <div class='lp-card-overlay'></div>
        <div class="lp-card-content" style="position: relative; z-index: 2; height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            ${
              card.logo
                ? `<img src="${card.logo}" alt="${card.title}" class="lp-card-logo" style="filter: brightness(0) invert(1); height: 32px; margin-bottom: 1rem;" />`
                : ""
            }
            <div class="lp-card-title" style="color: ${
              card.textColor
            }; font-size: 2rem; font-weight: 700; text-transform: lowercase; margin-bottom: 1.2rem;">${
        card.title
      }</div>
            <div class="lp-card-desc" style="color: ${
              card.textColor
            }; font-size: 1.15rem; font-weight: 400; margin-bottom: 2.5rem;">${
        card.desc
      }</div>
          </div>
          <div class="lp-card-status" style="color: ${
            card.textColor
          }; font-size: 1.1rem; font-weight: 600; letter-spacing: 0.5px;">
            ${card.statusLabel} <span style="font-weight: 700;">${
        card.status
      }</span>
          </div>
        </div>
      </div>
    `;
    })
    .join("");
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

document.addEventListener("DOMContentLoaded", () => {
  renderPortfolioGrid();
  renderLogoWall();
});
