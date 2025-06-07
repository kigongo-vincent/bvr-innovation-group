// Performance monitoring
const navLoadStart = performance.now();

// Optimize DOMContentLoaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initNavbar);
} else {
  initNavbar();
}

function initNavbar() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = {
    "index.html": ["nav-home", "drawer-nav-home"],
    "about.html": ["nav-about", "drawer-nav-about"],
    "units.html": ["nav-units", "drawer-nav-units"],
  };

  // Set active links immediately
  const activeLinkIds = navLinks[currentPage] || [];
  activeLinkIds.forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.classList.add("active");
    }
  });

  // Initialize mobile menu with requestAnimationFrame
  requestAnimationFrame(() => {
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const drawerMenu = document.querySelector(".drawer-menu");
    const drawerOverlay = document.querySelector(".drawer-overlay");

    if (mobileMenuBtn && drawerMenu && drawerOverlay) {
      mobileMenuBtn.addEventListener("click", toggleMenu, { passive: true });
      drawerOverlay.addEventListener("click", closeMenu, { passive: true });

      // Close menu on escape key
      document.addEventListener(
        "keydown",
        (e) => {
          if (e.key === "Escape" && drawerMenu.classList.contains("active")) {
            closeMenu();
          }
        },
        { passive: true }
      );

      // Close menu on window resize
      window.addEventListener(
        "resize",
        () => {
          if (
            window.innerWidth > 768 &&
            drawerMenu.classList.contains("active")
          ) {
            closeMenu();
          }
        },
        { passive: true }
      );
    }
  });

  // Log performance metrics
  const navLoadEnd = performance.now();
  console.log(`Navbar initialization took ${navLoadEnd - navLoadStart}ms`);
}

function toggleMenu(e) {
//   alert("toggleMenu");
//   e.preventDefault();
  const drawerMenu = document.querySelector(".drawer-menu");
  const drawerOverlay = document.querySelector(".drawer-overlay");
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");

  const isOpen = drawerMenu.classList.contains("active");
  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
}

function openMenu() {
  const drawerMenu = document.querySelector(".drawer-menu");
  const drawerOverlay = document.querySelector(".drawer-overlay");
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");

  mobileMenuBtn.classList.add("active");
  drawerMenu.classList.add("active");
  drawerOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  const drawerMenu = document.querySelector(".drawer-menu");
  const drawerOverlay = document.querySelector(".drawer-overlay");
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");

  mobileMenuBtn.classList.remove("active");
  drawerMenu.classList.remove("active");
  drawerOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

