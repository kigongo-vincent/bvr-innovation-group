document.addEventListener("DOMContentLoaded", function () {
  const parallaxContainers = document.querySelectorAll(".parallax-container");

  parallaxContainers.forEach((container) => {
    const layers = container.querySelectorAll(".parallax-layer");

    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;

      layers.forEach((layer) => {
        const speed = layer.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        layer.style.transform = `translateY(${yPos}px)`;
      });
    });
  });
});
