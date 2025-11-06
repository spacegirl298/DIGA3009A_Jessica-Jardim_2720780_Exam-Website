// Team Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
  initCarousel();
  initAnimations();
});

function initCarousel() {
  const carousel = document.querySelector('.team-carousel');
  const cards = Array.from(document.querySelectorAll('.team-card'));
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const toggleBtn = document.getElementById('toggle-slide');
  const indicatorsContainer = document.querySelector('.carousel-indicators');
  const autoPlayToggle = document.getElementById('auto-play');

  let currentIndex = 0;
  let autoPlayInterval;
  const autoPlayDelay = 3000;
  let isAnimating = false;
  let cardWidth = 0;

  // Calculate card width including gap
  function calculateCardWidth() {
    if (cards.length === 0) return 0;
    const card = cards[0];
    const gap = parseInt(window.getComputedStyle(carousel).gap) || 32;
    cardWidth = card.offsetWidth + gap;
    return cardWidth;
  }

  // Create indicators
  function createIndicators() {
    indicatorsContainer.innerHTML = '';
    cards.forEach((_, index) => {
      const indicator = document.createElement('div');
      indicator.classList.add('indicator');
      if (index === 0) indicator.classList.add('active');
      indicator.addEventListener('click', () => goToSlide(index));
      indicatorsContainer.appendChild(indicator);
    });
  }

  // Update center card styling
  function updateCenterCard() {
    cards.forEach((card, index) => {
      card.style.flex = '0 0 300px';
      card.style.height = '400px';
      card.style.zIndex = '1';
      card.classList.remove('center-card');
      
      const centerIndex = (currentIndex + 1) % cards.length;
      if (index === centerIndex) {
        card.style.flex = '0 0 350px';
        card.style.height = '450px';
        card.style.zIndex = '2';
        card.classList.add('center-card');
      }
    });
  }

  // Update carousel position
  function updateCarousel(animate = true) {
    if (isAnimating) return;
    isAnimating = true;

    const offset = -currentIndex * cardWidth;

    if (animate) {
      gsap.to(carousel, {
        x: offset,
        duration: 0.7,
        ease: "power2.out",
        onComplete: () => {
          isAnimating = false;
          updateCenterCard();
          updateToggleButton();
        }
      });
    } else {
      gsap.set(carousel, { x: offset });
      isAnimating = false;
      updateCenterCard();
      updateToggleButton();
    }

    updateIndicators();
  }

  // Update indicators
  function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    const realIndex = currentIndex % cards.length;
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === realIndex);
    });
  }

  // Update toggle button text
  function updateToggleButton() {
    const totalSlides = cards.length;
    const currentSlide = (currentIndex % totalSlides) + 1;
    toggleBtn.textContent = `Member ${currentSlide} of ${totalSlides}`;
  }

  // Navigation
  function goToSlide(index) {
    currentIndex = index;
    updateCarousel(true);
  }

  function nextSlide() {
    if (isAnimating) return;
    
    currentIndex++;
    
    if (currentIndex >= 4) {
      currentIndex = 0;
      gsap.set(carousel, { x: 0 });
    }
    
    updateCarousel(true);
  }

  function prevSlide() {
    if (isAnimating) return;
    
    currentIndex--;
    
    if (currentIndex < 0) {
      currentIndex = 3;
      const offset = -currentIndex * cardWidth;
      gsap.set(carousel, { x: offset });
    }
    
    updateCarousel(true);
  }

  // Auto play
  function startAutoPlay() {
    stopAutoPlay();
    autoPlayInterval = setInterval(() => {
      if (!isAnimating) {
        nextSlide();
      }
    }, autoPlayDelay);
  }

  function stopAutoPlay() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
    }
  }

  // Event listeners
  prevBtn.addEventListener('click', () => {
    prevSlide();
    if (autoPlayToggle.checked) startAutoPlay();
  });

  nextBtn.addEventListener('click', () => {
    nextSlide();
    if (autoPlayToggle.checked) startAutoPlay();
  });

  toggleBtn.addEventListener('click', () => {
    nextSlide();
    if (autoPlayToggle.checked) startAutoPlay();
  });

  autoPlayToggle.addEventListener('change', function() {
    if (this.checked) startAutoPlay();
    else stopAutoPlay();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      nextSlide();
      if (autoPlayToggle.checked) startAutoPlay();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
      if (autoPlayToggle.checked) startAutoPlay();
    }
  });

  // Touch/swipe handling
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    currentX = startX;
    isDragging = true;
    stopAutoPlay();
  });

  carousel.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    currentX = e.touches[0].clientX;
  });

  carousel.addEventListener('touchend', () => {
    if (!isDragging) return;
    
    const diffX = startX - currentX;
    
    if (diffX > 50) {
      nextSlide();
    } else if (diffX < -50) {
      prevSlide();
    }
    
    isDragging = false;
    if (autoPlayToggle.checked) startAutoPlay();
  });

  // Mouse drag support
  carousel.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    currentX = startX;
    isDragging = true;
    stopAutoPlay();
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    currentX = e.clientX;
  });

  document.addEventListener('mouseup', () => {
    if (!isDragging) return;
    
    const diffX = startX - currentX;
    
    if (diffX > 50) {
      nextSlide();
    } else if (diffX < -50) {
      prevSlide();
    }
    
    isDragging = false;
    if (autoPlayToggle.checked) startAutoPlay();
  });

  // Pause autoplay on hover
  carousel.addEventListener('mouseenter', stopAutoPlay);
  carousel.addEventListener('mouseleave', () => {
    if (autoPlayToggle.checked) startAutoPlay();
  });

  // Window resize handling
  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      calculateCardWidth();
      updateCarousel(false);
    }, 250);
  });

  // Initialize
  calculateCardWidth();
  createIndicators();
  updateCarousel(false);
  updateToggleButton();
  
  // Start auto-play immediately since it's checked by default
  startAutoPlay();
}

// Animations
function initAnimations() {
  gsap.from('.entry-title', {
    duration: 1,
    y: -50,
    opacity: 0,
    ease: "power3.out"
  });

  gsap.from('.team-card', {
    duration: 0.8,
    y: 50,
    opacity: 0,
    stagger: 0.1,
    delay: 0.5,
    ease: "power2.out"
  });

  const cards = document.querySelectorAll('.team-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { y: -10, duration: 0.3, ease: "power2.out" });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out" });
    });
  });
}