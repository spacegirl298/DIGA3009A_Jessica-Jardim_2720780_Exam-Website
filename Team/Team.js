// Team Carousel
document.addEventListener("DOMContentLoaded", function () {
  initCarousel();
  initAnimations();
});

function initCarousel() {
  const carousel = document.querySelector(".team-carousel");
  const cards = Array.from(document.querySelectorAll(".team-card"));
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const toggleBtn = document.getElementById("toggle-slide");
  const indicatorsContainer = document.querySelector(".carousel-indicators");
  const autoPlayToggle = document.getElementById("auto-play");

  let currentIndex = 0;
  let autoPlayInterval;
  const autoPlayDelay = 3000;
  let isAnimating = false;
  let cardWidth = 0;
  let cardsToShow = 3;

  function calculateCardsToShow() {
    const width = window.innerWidth;
    if (width <= 480) {
      cardsToShow = 1;
    } else if (width <= 768) {
      cardsToShow = 2;
    } else {
      cardsToShow = 3;
    }
    return cardsToShow;
  }

  function handleOrientationChange() {
    setTimeout(() => {
      calculateCardWidth();
      createIndicators();
      updateCarousel(false);
    }, 300);
  }

  window.addEventListener("orientationchange", handleOrientationChange);

  function calculateCardWidth() {
    if (cards.length === 0) return 0;
    calculateCardsToShow();

    const card = cards[0];
    const gap = parseInt(window.getComputedStyle(carousel).gap) || 32;
    const containerWidth = carousel.parentElement.offsetWidth;

    cardWidth = (containerWidth - gap * (cardsToShow - 1)) / cardsToShow;

    cards.forEach((card) => {
      card.style.flex = `0 0 ${cardWidth}px`;
    });

    return cardWidth + gap;
  }

  function createIndicators() {
    indicatorsContainer.innerHTML = "";
    const totalIndicators = Math.max(1, cards.length - cardsToShow + 1);

    for (let i = 0; i < totalIndicators; i++) {
      const indicator = document.createElement("div");
      indicator.classList.add("indicator");
      if (i === 0) indicator.classList.add("active");
      indicator.addEventListener("click", () => goToSlide(i));
      indicatorsContainer.appendChild(indicator);
    }
  }

  function updateCenterCard() {
    cards.forEach((card, index) => {
      card.style.zIndex = "1";
      card.classList.remove("center-card");

      const centerIndex = Math.floor(cardsToShow / 2);
      const viewStartIndex = currentIndex;
      const viewEndIndex = currentIndex + cardsToShow - 1;

      if (index >= viewStartIndex && index <= viewEndIndex) {
        const isCenter = index === viewStartIndex + centerIndex;
        if (isCenter && cardsToShow > 1) {
          card.style.transform = "scale(1.05)";
          card.style.zIndex = "2";
          card.classList.add("center-card");
        } else {
          card.style.transform = "scale(1)";
        }
      } else {
        card.style.transform = "scale(1)";
      }
    });
  }

  function updateCarousel(animate = true) {
    if (isAnimating) return;
    isAnimating = true;

    const gap = parseInt(window.getComputedStyle(carousel).gap) || 32;
    const offset = -currentIndex * (cardWidth + gap);

    if (animate) {
      gsap.to(carousel, {
        x: offset,
        duration: 0.7,
        ease: "power2.out",
        onComplete: () => {
          isAnimating = false;
          updateCenterCard();
          updateToggleButton();
        },
      });
    } else {
      gsap.set(carousel, { x: offset });
      isAnimating = false;
      updateCenterCard();
      updateToggleButton();
    }

    updateIndicators();
  }

  function updateIndicators() {
    const indicators = document.querySelectorAll(".indicator");
    const totalIndicators = Math.max(1, cards.length - cardsToShow + 1);
    const realIndex = Math.min(currentIndex, totalIndicators - 1);

    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === realIndex);
    });
  }

  function updateToggleButton() {
    const totalMembers = cards.length;
    const currentMember = (currentIndex % totalMembers) + 1;
    toggleBtn.textContent = `Member ${currentMember} of ${totalMembers}`;
  }

  function goToSlide(index) {
    const maxIndex = Math.max(0, cards.length - cardsToShow);
    currentIndex = Math.min(Math.max(0, index), maxIndex);
    updateCarousel(true);
  }

  function nextSlide() {
    if (isAnimating) return;

    const maxIndex = Math.max(0, cards.length - cardsToShow);

    if (currentIndex >= maxIndex) {
      currentIndex = 0;
    } else {
      currentIndex++;
    }

    updateCarousel(true);
  }

  function prevSlide() {
    if (isAnimating) return;

    const maxIndex = Math.max(0, cards.length - cardsToShow);

    if (currentIndex <= 0) {
      currentIndex = maxIndex;
    } else {
      currentIndex--;
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

  prevBtn.addEventListener("click", () => {
    prevSlide();
    if (autoPlayToggle.checked) startAutoPlay();
  });

  nextBtn.addEventListener("click", () => {
    nextSlide();
    if (autoPlayToggle.checked) startAutoPlay();
  });

  toggleBtn.addEventListener("click", () => {
    nextSlide();
    if (autoPlayToggle.checked) startAutoPlay();
  });

  autoPlayToggle.addEventListener("change", function () {
    if (this.checked) startAutoPlay();
    else stopAutoPlay();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      nextSlide();
      if (autoPlayToggle.checked) startAutoPlay();
    } else if (e.key === "ArrowLeft") {
      prevSlide();
      if (autoPlayToggle.checked) startAutoPlay();
    }
  });

  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  carousel.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].clientX;
      currentX = startX;
      isDragging = true;
      stopAutoPlay();
    },
    { passive: true }
  );

  carousel.addEventListener(
    "touchmove",
    (e) => {
      if (!isDragging) return;
      currentX = e.touches[0].clientX;
    },
    { passive: true }
  );

  carousel.addEventListener(
    "touchend",
    () => {
      if (!isDragging) return;

      const diffX = startX - currentX;
      const swipeThreshold = 50;

      if (diffX > swipeThreshold) {
        nextSlide();
      } else if (diffX < -swipeThreshold) {
        prevSlide();
      }

      isDragging = false;
      if (autoPlayToggle.checked) startAutoPlay();
    },
    { passive: true }
  );

  carousel.addEventListener("mousedown", (e) => {
    startX = e.clientX;
    currentX = startX;
    isDragging = true;
    stopAutoPlay();
    e.preventDefault();
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    currentX = e.clientX;
  });

  document.addEventListener("mouseup", () => {
    if (!isDragging) return;

    const diffX = startX - currentX;
    const swipeThreshold = 50;

    if (diffX > swipeThreshold) {
      nextSlide();
    } else if (diffX < -swipeThreshold) {
      prevSlide();
    }

    isDragging = false;
    if (autoPlayToggle.checked) startAutoPlay();
  });

  carousel.addEventListener("mouseenter", stopAutoPlay);
  carousel.addEventListener("mouseleave", () => {
    if (autoPlayToggle.checked) startAutoPlay();
  });

  let resizeTimeout;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      calculateCardWidth();
      createIndicators();
      updateCarousel(false);
    }, 250);
  });

  calculateCardWidth();
  createIndicators();
  updateCarousel(false);
  updateToggleButton();

  startAutoPlay();
}

function initAnimations() {
  gsap.from(".entry-title", {
    duration: 1,
    y: -50,
    opacity: 0,
    ease: "power3.out",
  });

  gsap.from(".team-card", {
    duration: 0.8,
    y: 50,
    opacity: 0,
    stagger: 0.1,
    delay: 0.5,
    ease: "power2.out",
  });

  const cards = document.querySelectorAll(".team-card");
  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      if (window.innerWidth > 768) {
        gsap.to(card, { y: -10, duration: 0.3, ease: "power2.out" });
      }
    });
    card.addEventListener("mouseleave", () => {
      if (window.innerWidth > 768) {
        gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out" });
      }
    });
  });
}
