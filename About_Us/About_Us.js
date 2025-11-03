document.addEventListener("DOMContentLoaded", () => {
  // Card flip functionality
  const cards = document.querySelectorAll(".card-inner");

  cards.forEach((card) => {
    let flipped = false;
    card.addEventListener("click", () => {
      flipped = !flipped;
      gsap.to(card, {
        duration: 0.8,
        rotateY: flipped ? 180 : 0,
        ease: "power2.inOut",
        transformStyle: "preserve-3d",
        // Remove any scaling that might cause layout shifts
      });
    });
  });

  // Back to top button functionality
  const backToTopBtn = document.getElementById("backToTopBtn");
  
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.style.display = "block";
      } else {
        backToTopBtn.style.display = "none";
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
});