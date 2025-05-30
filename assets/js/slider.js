document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".slider-image");
    let currentIndex = 0;

    function nextSlide() {
      // Remove active and prev classes from all images
      images.forEach((img) => {
        img.classList.remove("active", "prev");
      });

      // Add prev class to current image
      images[currentIndex].classList.add("prev");

      // Move to next image
      currentIndex = (currentIndex + 1) % images.length;

      // Add active class to new current image
      images[currentIndex].classList.add("active");
    }

    // Initialize first slide
    images[0].classList.add("active");

    // Change slide every 4 seconds
    setInterval(nextSlide, 4000);
  });