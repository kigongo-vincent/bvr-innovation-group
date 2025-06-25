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

function renderPortfolioGrid() {
  const grid = document.getElementById("lp-grid");
  if (!grid) return;
  grid.innerHTML = launchpadProjects
    .map((card, idx) => {
      return `
      <div class="lp-card" data-index="${idx}" style="background: url('${
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
