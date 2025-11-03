document.addEventListener("DOMContentLoaded", () => {
  // Card flip functionality
  const cards = document.querySelectorAll(".card-inner");

  cards.forEach((card) => {
    let flipped = false;
    let hoverAnimation = null;
    let glowAnimation = null;
    
    // Create glow element
    const glowElement = document.createElement('div');
    glowElement.className = 'card-glow';
    glowElement.style.position = 'absolute';
    glowElement.style.width = '110%';
    glowElement.style.height = '130%';
    glowElement.style.top = '-5%';
    glowElement.style.left = '-5%';
    glowElement.style.borderRadius = '12px';
    glowElement.style.background = 'radial-gradient(circle at center, rgba(237,106,24,0.6) 0%, rgba(237,106,24,0.2) 50%, rgba(237,106,24,0) 70%)';
    glowElement.style.opacity = '0';
    glowElement.style.zIndex = '-1';
    glowElement.style.pointerEvents = 'none';
    glowElement.style.filter = 'blur(25px)';
    
    // Add glow element to the flip card parent
    const flipCard = card.closest('.flip-card');
    flipCard.style.position = 'relative';
    flipCard.appendChild(glowElement);

    // Hover effect - tease the flip with glow
    card.addEventListener("mouseenter", () => {
      // REMOVED: if (!flipped) condition - now works in both states
      
      // Kill any existing animations first
      if (hoverAnimation) hoverAnimation.kill();
      if (glowAnimation) glowAnimation.kill();
      
      // Calculate rotation based on current flip state
      const targetRotation = flipped ? 160 : 20; // 180-20 when flipped, 20 when not
      
      // Start hover animation
      hoverAnimation = gsap.to(card, {
        duration: 0.4,
        rotateY: targetRotation,
        scale: 1.05,
        ease: "power2.out"
      });
      
      // Start glow animation
      glowAnimation = gsap.to(glowElement, {
        duration: 0.4,
        opacity: 1,
        scale: 1.1,
        ease: "power2.out"
      });
    });

    card.addEventListener("mouseleave", () => {
      // REMOVED: if (!flipped) condition - now works in both states
      
      // Kill any existing animations first
      if (hoverAnimation) hoverAnimation.kill();
      if (glowAnimation) glowAnimation.kill();
      
      // Calculate target rotation based on current flip state
      const targetRotation = flipped ? 180 : 0;
      
      // Return card to normal (either 0 or 180 degrees based on flip state)
      hoverAnimation = gsap.to(card, {
        duration: 0.4,
        rotateY: targetRotation,
        scale: 1,
        ease: "power2.out"
      });
      
      // Fade out glow
      glowAnimation = gsap.to(glowElement, {
        duration: 0.4,
        opacity: 0,
        scale: 1,
        ease: "power2.out"
      });
    });

    // Click to actually flip
    card.addEventListener("click", () => {
      flipped = !flipped;
      
      // Kill any hover animations that might be running
      if (hoverAnimation) hoverAnimation.kill();
      if (glowAnimation) glowAnimation.kill();
      
      // Remove glow on click
      gsap.to(glowElement, {
        duration: 0.3,
        opacity: 0,
        ease: "power2.out"
      });
      
      // Flip the card
      gsap.to(card, {
        duration: 0.8,
        rotateY: flipped ? 180 : 0,
        scale: 1,
        ease: "power2.inOut",
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