// Function to load HTML components
async function loadComponent(elementId, componentPath) {
  try {
    const response = await fetch(componentPath);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const html = await response.text();
    document.getElementById(elementId).innerHTML = html;
  } catch (error) {
    console.error(`Error loading component ${componentPath}:`, error);
  }
}

// Load components when the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // Load navbar
  loadComponent("navbar-container", "components/navbar.html");

  // Load footer
  loadComponent("footer-container", "components/footer.html").then(() => {
    // Update the year after footer is loaded
    const yearElement = document.querySelector("#year");
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  });

  // Load contact modal
  fetch("components/contact-modal.html")
    .then((response) => response.text())
    .then((html) => {
      document.body.insertAdjacentHTML("beforeend", html);
      // Initialize modal after it's loaded
      if (typeof ContactModal !== "undefined") {
        new ContactModal();
      }
    })
    .catch((error) => console.error("Error loading contact modal:", error));

  // Load start project modal
  fetch("components/start-project-modal.html")
    .then((response) => response.text())
    .then((html) => {
      document.body.insertAdjacentHTML("beforeend", html);
      // Initialize modal after it's loaded
      if (typeof StartProjectModal !== "undefined") {
        new StartProjectModal();
      }
    })
    .catch((error) =>
      console.error("Error loading start project modal:", error)
    );
});
