// Modal functionality
class ContactModal {
  constructor() {
    this.modal = document.getElementById("contact-modal");
    this.overlay = this.modal.querySelector(".modal-overlay");
    this.closeBtn = this.modal.querySelector(".modal-close");
    this.form = this.modal.querySelector("#contact-form");

    this.init();
  }

  init() {
    // Add click event listeners to all contact buttons
    document.querySelectorAll('[data-modal="contact"]').forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        this.open();
      });
    });

    // Close modal when clicking the close button or overlay
    this.closeBtn.addEventListener("click", () => this.close());
    this.overlay.addEventListener("click", () => this.close());

    // Close modal when pressing Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.modal.classList.contains("active")) {
        this.close();
      }
    });

    // Handle form submission
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  open() {
    document.body.style.overflow = "hidden"; // Prevent background scrolling
    this.modal.classList.add("active");

    // Focus the first input after animation
    setTimeout(() => {
      this.form.querySelector("input").focus();
    }, 300);
  }

  close() {
    this.modal.classList.remove("active");
    document.body.style.overflow = ""; // Restore scrolling

    // Reset form after animation
    setTimeout(() => {
      this.form.reset();
    }, 300);
  }

  async handleSubmit(e) {
    e.preventDefault();

    const submitButton = this.form.querySelector(".submit-button");
    const originalText = submitButton.innerHTML;

    try {
      // Add loading state
      submitButton.disabled = true;
      submitButton.classList.add("loading");
      submitButton.innerHTML = '<i class="fas fa-spinner"></i> Sending...';

      // Get form data
      const formData = new FormData(this.form);
      const data = Object.fromEntries(formData.entries());

      // Here you would typically send the data to your backend
      // For now, we'll simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Show success message
      this.showMessage(
        "Message sent successfully! We'll get back to you soon.",
        "success"
      );
      this.close();
    } catch (error) {
      // Show error message
      this.showMessage(
        "Sorry, something went wrong. Please try again.",
        "error"
      );
    } finally {
      // Reset button state
      submitButton.disabled = false;
      submitButton.classList.remove("loading");
      submitButton.innerHTML = originalText;
    }
  }

  showMessage(message, type = "success") {
    const messageDiv = document.createElement("div");
    messageDiv.className = `modal-message ${type}`;
    messageDiv.textContent = message;

    document.body.appendChild(messageDiv);

    // Trigger animation
    setTimeout(() => messageDiv.classList.add("active"), 10);

    // Remove message after animation
    setTimeout(() => {
      messageDiv.classList.remove("active");
      setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
  }
}

// Start Project Modal functionality
class StartProjectModal {
  constructor() {
    this.modal = document.getElementById("start-project-modal");
    this.overlay = this.modal.querySelector(".modal-overlay");
    this.closeBtn = this.modal.querySelector(".modal-close");
    this.form = this.modal.querySelector("#start-project-form");

    this.init();
  }

  init() {
    // Add click event listeners to all start project buttons
    document
      .querySelectorAll('[data-modal="start-project"]')
      .forEach((button) => {
        button.addEventListener("click", (e) => {
          e.preventDefault();
          this.open();
        });
      });

    // Close modal when clicking the close button or overlay
    this.closeBtn.addEventListener("click", () => this.close());
    this.overlay.addEventListener("click", () => this.close());

    // Close modal when pressing Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.modal.classList.contains("active")) {
        this.close();
      }
    });

    // Handle form submission
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  open() {
    this.modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  close() {
    this.modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  async handleSubmit(e) {
    e.preventDefault();
    const submitButton = this.form.querySelector(".submit-button");
    const originalText = submitButton.innerHTML;

    try {
      submitButton.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Submitting...';
      submitButton.disabled = true;

      // Get form data
      const formData = new FormData(this.form);
      const data = Object.fromEntries(formData.entries());

      // Here you would typically send the data to your backend
      // For now, we'll just simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Show success message
      this.showMessage(
        "Project submitted successfully! We'll be in touch soon.",
        "success"
      );
      this.form.reset();
      this.close();
    } catch (error) {
      console.error("Error submitting project:", error);
      this.showMessage(
        "There was an error submitting your project. Please try again.",
        "error"
      );
    } finally {
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
    }
  }

  showMessage(text, type) {
    const message = document.createElement("div");
    message.className = `modal-message ${type}`;
    message.textContent = text;
    document.body.appendChild(message);

    // Trigger animation
    setTimeout(() => message.classList.add("active"), 100);

    // Remove message after 5 seconds
    setTimeout(() => {
      message.classList.remove("active");
      setTimeout(() => message.remove(), 300);
    }, 5000);
  }
}

// Initialize modals when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Load modal components
  fetch("/components/contact-modal.html")
    .then((response) => response.text())
    .then((html) => {
      document.body.insertAdjacentHTML("beforeend", html);
      new ContactModal();
    })
    .catch((error) => console.error("Error loading contact modal:", error));

  fetch("/components/start-project-modal.html")
    .then((response) => response.text())
    .then((html) => {
      document.body.insertAdjacentHTML("beforeend", html);
      new StartProjectModal();
    })
    .catch((error) =>
      console.error("Error loading start project modal:", error)
    );
});
