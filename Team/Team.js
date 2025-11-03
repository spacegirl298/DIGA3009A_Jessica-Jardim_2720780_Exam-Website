window.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".team-carousel");
  let rotating = false;

  carousel.addEventListener("mouseenter", () => {
    if (!rotating) {
      carousel.style.animationPlayState = "running";
      rotating = true;
    }
  });

  carousel.addEventListener("mouseleave", () => {
    carousel.style.animationPlayState = "paused";
    rotating = false;
  });
});
