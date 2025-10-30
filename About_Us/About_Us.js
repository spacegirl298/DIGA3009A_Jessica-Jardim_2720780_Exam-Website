document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card-inner");

  cards.forEach(card => {
    let flipped = false;

    card.addEventListener("click", () => {
      flipped = !flipped;
      gsap.to(card, {
        duration: 0.8,
        rotateY: flipped ? 180 : 0,
        ease: "power2.inOut"
      });
    });
  });
});
gsap.to(card, {
  duration: 0.8,
  rotateY: flipped ? 180 : 0,
  scale: 1.05,
  ease: "power2.inOut",
  onComplete: () => gsap.to(card, { scale: 1, duration: 0.2 })
});
