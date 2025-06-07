const acceleratorData = {
  hero: {
    title: "BVR Innovation Accelerator",
    description:
      "This program is for unstoppable founders focusing on redefining the future of innovation - from core technology to AI, enterprise solutions and beyond.",
    location: "Singapore, Singapore",
    images: {
      front: "assets/images/beliefs/5.jpg",
      back: "assets/images/beliefs/6.jpg",
    },
  },
  timeline: {
    title: "Program Timeline",
    subtitle: "Key dates for the 2025 March cohort",
    events: [
      {
        icon: "fas fa-calendar-check",
        title: "Applications Open",
        date: "Nov 23rd, 2024",
      },
      {
        icon: "fas fa-hourglass-end",
        title: "Final Deadline",
        date: "Mar 10th, 2025",
      },
      {
        icon: "fas fa-rocket",
        title: "Accelerator Starts",
        date: "Mar 10th, 2025",
      },
      {
        icon: "fas fa-trophy",
        title: "Demo Day",
        date: "May 29th, 2025",
      },
    ],
  },
  quote: {
    text: "We are looking for unstoppable founders building companies at the intersections of technology, sustainability, and GenAI, and who have a strong urge to leave a positive impact on this planet",
    author: {
      name: "Vincent Tan",
      role: "Managing Director",
      image: "assets/images/team/3.jpg",
    },
  },
  team: {
    title: "The Team",
    members: [
      {
        name: "kigongo vincent",
        role: "Managing Director",
        image: "assets/images/team/1.jpg",
      },
      {
        name: "Jane Smith",
        role: "Program Manager",
        image: "assets/images/team/2.jpg",
      },
      {
        name: "Mike Johnson",
        role: "Technical Lead",
        image: "assets/images/team/3.jpg",
      },
    ],
  },
  partners: {
    title: "Partners",
    quote: {
      text: "Developing the future of innovation is a collaborative effort. Our program aims to provide a platform for founders to grow, partner up and scale their business.",
      author: "Head of Innovation",
    },
    logos: [
      "http://apimg.techstars.com/sf/accounts/logo/Logo_7549fa7ce7b46844d8e3d69d8.jpeg",
      "https://apimg.techstars.com/profiles/1726167260883_506418.png",
      "http://apimg.techstars.com/sf/accounts/logo/Logo_6754e005adaffd3d48492fad7.jpeg",
      "https://images.crunchbase.com/image/upload/t_cb-default-original/blzvv4alpojsnnggnv0s",
      "http://apimg.techstars.com/sf/accounts/logo/Logo_9cae0595a62bed37faba00eab.png",
      "https://apimg.techstars.com/profiles/1727891845943_134203.png",
      "https://images.crunchbase.com/image/upload/t_cb-default-original/ws7ozddn58gtoehtgndh",
      "https://apimg.techstars.com/profiles/1727888063861_869014.png",
      "https://images.crunchbase.com/image/upload/t_cb-default-original/ckbd6mjaft11guincx2z",
      "https://images.crunchbase.com/image/upload/t_cb-default-original/eggpon6ifhvgt4grrr3u",
      "https://apimg.techstars.com/profiles/1727861621147_174214.png",
      "https://apimg.techstars.com/profiles/1727896039141_535124.png",
    ],
  },
};

async function loadAcceleratorData() {
  try {
    const response = await fetch("/assets/data/accelerators.json");
    const accelerators = await response.json();
    const accelerator = accelerators[0]; // Get the first accelerator

    // Update hero section
    document.querySelector(".hero-content h1").textContent = accelerator.title;
    document.querySelector(".hero-content .lead").textContent =
      accelerator.description;
    document.querySelector(
      ".hero-content p:not(.lead)"
    ).textContent = `Type: ${accelerator.type}`;

    // Create program details section
    const programSection = document.createElement("section");
    programSection.className = "program-details section";
    programSection.innerHTML = `
      <div class="container">
        <div class="accelerator-logo">
          <img src="${accelerator.logo}" alt="${accelerator.title} Logo" />
        </div>
        
        <div class="accelerator-info">
          <h2>${accelerator.title}</h2>
          <p class="type">${accelerator.type}</p>
          <p class="description">${accelerator.description}</p>
        </div>
      </div>
    `;

    // Insert the program section after the hero section
    document
      .querySelector(".hero")
      .insertAdjacentElement("afterend", programSection);
  } catch (error) {
    console.error("Error loading accelerator data:", error);
  }
}

// Load data when the DOM is ready
document.addEventListener("DOMContentLoaded", loadAcceleratorData);
