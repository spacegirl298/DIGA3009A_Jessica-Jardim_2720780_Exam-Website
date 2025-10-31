// GSAP hover carousel rotation effect
const cards = document.querySelectorAll('.team-card');

cards.forEach((card, i) => {
  card.addEventListener('mouseenter', () => {
    gsap.to('.team-card', {
      duration: 1,
      rotationY: (i - 2) * 15, // rotate all cards around center
      ease: 'power2.out',
      stagger: 0.1,
    });

    gsap.to(card, {
      scale: 1.05,
      duration: 0.5,
      ease: 'power1.out'
    });
  });

  card.addEventListener('mouseleave', () => {
    gsap.to('.team-card', {
      rotationY: 0,
      duration: 1,
      ease: 'power2.inOut'
    });

    gsap.to(card, {
      scale: 1,
      duration: 0.5,
      ease: 'power1.inOut'
    });
  });
});
