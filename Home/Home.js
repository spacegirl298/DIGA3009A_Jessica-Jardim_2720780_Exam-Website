// Home.js - Fixed version

document.addEventListener('DOMContentLoaded', function() {
  // Register ScrollTrigger plugin
  if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Initialize all functionality
  initLogoReveal();
  initHeroAnimations();
  initScrollAnimations();
  initCarousel();
  initBackToTop();
  initNavigation();
  
  function initLogoReveal() {
    // Create logo reveal elements
    const logoRevealContainer = document.createElement('div');
    logoRevealContainer.className = 'logo-reveal-container';
    
    // Add gradient background elements
    const gradientBg = document.createElement('div');
    gradientBg.style.position = 'absolute';
    gradientBg.style.top = '0';
    gradientBg.style.left = '0';
    gradientBg.style.width = '100%';
    gradientBg.style.height = '100%';
    gradientBg.style.background = 'linear-gradient(135deg, #0c0c0c 0%, #191919 50%, #2d1a0c 100%)';
    gradientBg.style.opacity = '0.8';
    logoRevealContainer.appendChild(gradientBg);
    
    const logoReveal = document.createElement('div');
    logoReveal.className = 'logo-reveal';
    
    const logoCircle = document.createElement('div');
    logoCircle.className = 'logo-circle';
    
    const logoInner = document.createElement('div');
    logoInner.className = 'logo-inner';
    logoInner.textContent = 'SDS';
    
    const loadingText = document.createElement('div');
    loadingText.className = 'loading-text';
    loadingText.textContent = 'LOADING...';
    
    logoReveal.appendChild(logoCircle);
    logoReveal.appendChild(logoInner);
    logoRevealContainer.appendChild(logoReveal);
    logoRevealContainer.appendChild(loadingText);
    document.body.prepend(logoRevealContainer);
    
    // Create particles
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.background = i % 2 === 0 ? 'var(--primary-color)' : 'var(--primary-color';
      logoRevealContainer.appendChild(particle);
    }
    
    const particles = document.querySelectorAll('.particle');
    
    // GSAP Animation Timeline
    const revealTimeline = gsap.timeline({
      onComplete: () => {
        // Remove the container after animation completes
        setTimeout(() => {
          logoRevealContainer.style.display = 'none';
        }, 500);
      }
    });
    
    revealTimeline
      // Initial state
      .set(logoCircle, {
        scale: 0,
        rotation: 0,
        borderColor: 'var(--primary-color)'
      })
      .set(logoInner, { scale: 0 })
      .set(loadingText, { opacity: 0 })
      .set(particles, {
        x: '50%',
        y: '50%',
        scale: 0,
        opacity: 0
      })
      
      // Circle grow and rotate
      .to(logoCircle, {
        duration: 1.5,
        scale: 1,
        rotation: 360,
        ease: 'back.out(1.7)',
        borderColor: 'var(--primary-color)'
      })
      
      // Loading text fade in
      .to(loadingText, {
        duration: 0.5,
        opacity: 1,
        ease: 'power2.out'
      }, '-=1')
      
      // Logo text reveal
      .to(logoInner, {
        duration: 0.8,
        scale: 1,
        opacity: 1,
        ease: 'elastic.out(1, 0.5)'
      }, '-=0.5')
      
      // Particle explosion
      .to(particles, {
        duration: 1.2,
        x: () => `+=${gsap.utils.random(-200, 200)}`,
        y: () => `+=${gsap.utils.random(-200, 200)}`,
        scale: () => gsap.utils.random(0.5, 1.5),
        opacity: 1,
        stagger: 0.05,
        ease: 'power2.out'
      }, '-=0.5')
      
      // Particle fade out
      .to(particles, {
        duration: 0.8,
        opacity: 0,
        scale: 0,
        ease: 'power2.in'
      })
      
      // Everything fade out
      .to([logoCircle, logoInner, loadingText], {
        duration: 0.8,
        opacity: 0,
        scale: 0,
        ease: 'power2.inOut'
      });
    
    // Add a subtle background color transition
    gsap.to(logoRevealContainer, {
      duration: 2,
      backgroundColor: 'rgba(25, 25, 25, 0)',
      ease: 'power2.inOut'
    });
  }

  // Initialize navigation functionality
  function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Update aria-expanded attribute
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
      });
      
      // Close menu when clicking on a link
      document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('active');
          navMenu.classList.remove('active');
          hamburger.setAttribute('aria-expanded', 'false');
        });
      });
    }
  }

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

    // Add floating circles to hero section
    addFloatingCircles();
  }

  // New function to add floating circles
  function addFloatingCircles() {
    const heroSection = document.querySelector('.hero');
    const floatingCirclesContainer = document.createElement('div');
    floatingCirclesContainer.className = 'floating-circles';
    
    // Create multiple floating circles
    const circleCount = 12;
    const sizes = ['small', 'medium', 'large'];
    const colors = ['primary', 'accent', 'light'];
    
    for (let i = 0; i < circleCount; i++) {
      const circle = document.createElement('div');
      circle.className = `floating-circle ${sizes[i % 3]} ${colors[i % 3]}`;
      
      // Random position
      const randomTop = Math.random() * 100;
      const randomLeft = Math.random() * 100;
      
      circle.style.top = `${randomTop}%`;
      circle.style.left = `${randomLeft}%`;
      
      floatingCirclesContainer.appendChild(circle);
    }
    
    heroSection.appendChild(floatingCirclesContainer);
    
    // Animate floating circles
    gsap.to('.floating-circle', {
      y: 'random(-40, 40)',
      x: 'random(-30, 30)',
      rotation: 'random(-15, 15)',
      duration: 'random(3, 6)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.3
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

    // Navigation cards animation
    gsap.from('.nav-card', {
      scrollTrigger: {
        trigger: '.nav-section',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out'
    });
  }

  // Carousel functionality
  // Carousel functionality
function initCarousel() {
  const track = document.querySelector('.carousel-track');
  if (!track) return;

  const slides = Array.from(track.children);
  if (slides.length === 0) return;

  const nextButton = document.querySelector('.next-btn');
  const prevButton = document.querySelector('.prev-btn');
  const indicators = Array.from(document.querySelectorAll('.indicator'));
  
  const slideWidth = slides[0].getBoundingClientRect().width;
  let currentIndex = 0;
  let autoSlideInterval = null;

  // Arrange slides next to each other
  slides.forEach((slide, index) => {
    slide.style.left = slideWidth * index + 'px';
  });

  const moveToSlide = (targetIndex) => {
    // Validate and clamp targetIndex
    const index = Math.max(0, Math.min(Math.floor(targetIndex) || 0, slides.length - 1));
    currentIndex = index;
    
    // Animate to target slide
    gsap.to(track, {
      duration: 0.5,
      x: -index * slideWidth,
      ease: 'power2.out'
    });
    
    // Update current slide class
    slides.forEach(slide => slide.classList.remove('current-slide'));
    slides[index].classList.add('current-slide');
    
    // Update indicators if present
    if (indicators.length > 0) {
      indicators.forEach(indicator => indicator.classList.remove('active'));
      if (indicators[index]) indicators[index].classList.add('active');
      
      // Update aria-labels for accessibility
      indicators.forEach((indicator, i) => {
        indicator.setAttribute('aria-label', `Go to slide ${i + 1}`);
        if (i === index) {
          indicator.setAttribute('aria-current', 'true');
        } else {
          indicator.removeAttribute('aria-current');
        }
      });
    }
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
  if (nextButton) {
    nextButton.addEventListener('click', nextSlide);
  }
  
  // When click prev button
  if (prevButton) {
    prevButton.addEventListener('click', prevSlide);
  }
  
  // When click indicator
  if (indicators.length > 0) {
    indicators.forEach(indicator => {
      indicator.addEventListener('click', () => {
        const raw = indicator.getAttribute('data-index');
        const targetIndex = parseInt(raw, 10);
        if (Number.isNaN(targetIndex) || targetIndex < 0 || targetIndex >= slides.length) return;
        moveToSlide(targetIndex);
      });
    });
  }

  // Auto slide every 5 seconds
  const startAutoSlide = () => {
    stopAutoSlide();
    autoSlideInterval = setInterval(nextSlide, 5000);
  };

  const stopAutoSlide = () => {
    if (autoSlideInterval !== null) {
      clearInterval(autoSlideInterval);
      autoSlideInterval = null;
    }
  };

  // Pause auto-slide on hover/focus
  const carouselContainer = document.querySelector('.carousel-container');
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', stopAutoSlide);
    carouselContainer.addEventListener('mouseleave', startAutoSlide);
    
    // Pause auto-slide when focused
    carouselContainer.addEventListener('focusin', stopAutoSlide);
    carouselContainer.addEventListener('focusout', startAutoSlide);
  }

  // Initialize to first slide to set classes/indicators correctly
  moveToSlide(0);

  // Start auto-slide
  startAutoSlide();

  // Handle window resize
  window.addEventListener('resize', () => {
    const newSlideWidth = slides[0].getBoundingClientRect().width;
    slides.forEach((slide, index) => {
      slide.style.left = newSlideWidth * index + 'px';
    });
    // Recompute transform to current slide
    gsap.set(track, { x: -currentIndex * newSlideWidth });
  });
}
