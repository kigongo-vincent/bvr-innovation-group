const navigate = (path) => {
  location.href = path + ".html";
};

// Update copyright year dynamically
document.addEventListener("DOMContentLoaded", function () {
  console.log("Footer year update script running");
  const copyrightElement = document.querySelector("#year");
  console.log("Found year element:", copyrightElement);
  if (copyrightElement) {
    const year = new Date().getFullYear();
    console.log("Setting year to:", year);
    copyrightElement.textContent = year;
  }
});
