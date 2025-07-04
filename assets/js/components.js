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

  // Contact Modal
  const contactForm = document.getElementById("contact-form");
  const contactWhatsapp = document.querySelector(
    "#contact-modal .whatsapp-btn"
  );
  const contactEmail = document.querySelector("#contact-modal .email-btn");

  if (contactForm && contactWhatsapp && contactEmail) {
    contactWhatsapp.addEventListener("click", function (e) {
      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const company = contactForm.company.value.trim();
      const interest = contactForm.interest.value;
      const message = contactForm.message.value.trim();
      let text = `Contact Request\n`;
      text += `Name: ${name}\n`;
      text += `Email: ${email}\n`;
      if (company) text += `Company: ${company}\n`;
      text += `Interest: ${interest}\n`;
      text += `Message: ${message}`;
      contactWhatsapp.href = `https://wa.me/256782065238?text=${encodeURIComponent(
        text
      )}`;
    });
    contactEmail.addEventListener("click", function (e) {
      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const company = contactForm.company.value.trim();
      const interest = contactForm.interest.value;
      const message = contactForm.message.value.trim();
      let body = `Contact Request\n`;
      body += `Name: ${name}\n`;
      body += `Email: ${email}\n`;
      if (company) body += `Company: ${company}\n`;
      body += `Interest: ${interest}\n`;
      body += `Message: ${message}`;
      contactEmail.href = `mailto:bvrdesignstudio@gmail.com?subject=Contact%20Request&body=${encodeURIComponent(
        body
      )}`;
    });
  }

  // Start Project Modal
  const projectForm = document.getElementById("start-project-form");
  const projectWhatsapp = document.querySelector(
    "#start-project-modal .whatsapp-btn"
  );
  const projectEmail = document.querySelector(
    "#start-project-modal .email-btn"
  );

  if (projectForm && projectWhatsapp && projectEmail) {
    projectWhatsapp.addEventListener("click", function (e) {
      const projectName = projectForm["project-name"].value.trim();
      const email = projectForm["project-email"].value.trim();
      const company = projectForm["project-company"].value.trim();
      const budgetMin = projectForm["project-budget-min"].value.trim();
      const budgetMax = projectForm["project-budget-max"].value.trim();
      const description = projectForm["project-description"].value.trim();
      let text = `Start Project Request%0A`;
      text += `Project Name: ${projectName}%0A`;
      text += `Email: ${email}%0A`;
      if (company) text += `Company: ${company}%0A`;
      if (budgetMin || budgetMax)
        text += `Budget Range: ${budgetMin} - ${budgetMax}%0A`;
      text += `Description: ${encodeURIComponent(description)}`;
      projectWhatsapp.href = `https://wa.me/256782065238?text=${text}`;
    });
    projectEmail.addEventListener("click", function (e) {
      const projectName = projectForm["project-name"].value.trim();
      const email = projectForm["project-email"].value.trim();
      const company = projectForm["project-company"].value.trim();
      const budgetMin = projectForm["project-budget-min"].value.trim();
      const budgetMax = projectForm["project-budget-max"].value.trim();
      const description = projectForm["project-description"].value.trim();
      let body = `Start Project Request\n`;
      body += `Project Name: ${projectName}\n`;
      body += `Email: ${email}\n`;
      if (company) body += `Company: ${company}\n`;
      if (budgetMin || budgetMax)
        body += `Budget Range: ${budgetMin} - ${budgetMax}\n`;
      body += `Description: ${description}`;
      projectEmail.href = `mailto:bvrdesignstudio@gmail.com?subject=Start%20Project%20Request&body=${encodeURIComponent(
        body
      )}`;
    });
  }
});
