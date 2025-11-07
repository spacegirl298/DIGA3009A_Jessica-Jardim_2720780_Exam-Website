// Home.js - GSAP animations and interactive functionality

document.addEventListener('DOMContentLoaded', function() {
  // Register ScrollTrigger plugin
  if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Initialize animations
  initHeroAnimations();
  initScrollAnimations();
  initCarousel();
  initBackToTop();

  // Hero section animations
  function initHeroAnimations() {
    const heroTimeline = gsap.timeline();
    heroTimeline
      .from('.hero-content h1', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
      })
      .from('.hero-content p', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        ease: 'power2.out'
      }, '-=0.5')
      .from('.cta-button', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        ease: 'power2.out'
      }, '-=0.3');

    // Floating elements animation
    gsap.to('.floating-element', {
      y: 'random(-30, 30)',
      x: 'random(-20, 20)',
      rotation: 'random(-10, 10)',
      duration: 'random(2, 4)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.2
    });
  }

  // Scroll-triggered animations
  function initScrollAnimations() {
    // Carousel animation on scroll
    gsap.from('.carousel-container', {
      scrollTrigger: {
        trigger: '.carousel-section',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
    });

    // Game cards animation
    gsap.from('.game-card', {
      scrollTrigger: {
        trigger: '.games-section',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out'
    });

    // About section animation
    gsap.from('.about-text', {
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      },
      x: -50,
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
    });

    gsap.from('.about-image', {
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      },
      x: 50,
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
    });
  }

  // Carousel functionality
  function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next-btn');
    const prevButton = document.querySelector('.prev-btn');
    const indicators = document.querySelectorAll('.indicator');
    
    if (!track || slides.length === 0) return;

    const slideWidth = slides[0].getBoundingClientRect().width;
    let currentIndex = 0;
    let autoSlideInterval;

    // Arrange slides next to each other
    slides.forEach((slide, index) => {
      slide.style.left = slideWidth * index + 'px';
    });

    const moveToSlide = (targetIndex) => {
      // Update current index
      currentIndex = targetIndex;
      
      // Animate to target slide
      gsap.to(track, {
        duration: 0.5,
        x: -targetIndex * slideWidth,
        ease: 'power2.out'
      });
      
      // Update current slide class
      slides.forEach(slide => slide.classList.remove('current-slide'));
      slides[targetIndex].classList.add('current-slide');
      
      // Update indicators
      indicators.forEach(indicator => indicator.classList.remove('active'));
      indicators[targetIndex].classList.add('active');
    };

    const nextSlide = () => {
      const nextIndex = (currentIndex + 1) % slides.length;
      moveToSlide(nextIndex);
    };

    const prevSlide = () => {
      const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
      moveToSlide(prevIndex);
    };

    // When click next button
    nextButton.addEventListener('click', nextSlide);
    
    // When click prev button
    prevButton.addEventListener('click', prevSlide);
    
    // When click indicator
    indicators.forEach(indicator => {
      indicator.addEventListener('click', () => {
        const targetIndex = parseInt(indicator.getAttribute('data-index'));
        moveToSlide(targetIndex);
      });
    });

    // Auto slide every 5 seconds
    const startAutoSlide = () => {
      autoSlideInterval = setInterval(nextSlide, 5000);
    };

    const stopAutoSlide = () => {
      clearInterval(autoSlideInterval);
    };

    // Pause auto-slide on hover
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
      carouselContainer.addEventListener('mouseenter', stopAutoSlide);
      carouselContainer.addEventListener('mouseleave', startAutoSlide);
    }

    // Start auto-slide
    startAutoSlide();

    // Handle window resize
    window.addEventListener('resize', () => {
      const newSlideWidth = slides[0].getBoundingClientRect().width;
      slides.forEach((slide, index) => {
        slide.style.left = newSlideWidth * index + 'px';
      });
      moveToSlide(currentIndex);
    });
  }

  // Back to top functionality
  function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (!backToTopBtn) return;

    // Show/hide button on scroll
    gsap.to(backToTopBtn, {
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom top',
        onEnter: () => backToTopBtn.classList.add('visible'),
        onLeaveBack: () => backToTopBtn.classList.remove('visible')
      }
    });

    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', () => {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: 0 },
        ease: 'power2.inOut'
      });
    });
  }

  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: target, offsetY: 50 },
          ease: 'power2.inOut'
        });
      }
    });
  });
});