// Lab Rumble page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // GSAP Animations
    function initGSAPAnimations() {
        // Animation 1: Title entrance with bounce effect
        gsap.from('.entry-title', {
            duration: 1.2,
            y: -100,
            opacity: 0,
            ease: "bounce.out",
            delay: 0.3
        });

        // Animation 2: Content container slide-in with fade
        gsap.from('.content-container', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: "power2.out",
            delay: 0.8
        });

        // Animation 3: Staggered text reveal animation
        gsap.from('.content-container p', {
            duration: 1.2,
            y: 30,
            opacity: 0,
            stagger: 0.1,
            ease: "power2.out",
            delay: 1.2
        });

        // Animation 4: Download button pulsing animation on hover
        const downloadBtn = document.querySelector('.download-btn');
        if (downloadBtn) {
            const hoverAnimation = gsap.to(downloadBtn, {
                scale: 1.05,
                duration: 0.6,
                ease: "power1.inOut",
                paused: true,
                yoyo: true,
                repeat: -1
            });

            downloadBtn.addEventListener('mouseenter', () => {
                hoverAnimation.restart();
            });

            downloadBtn.addEventListener('mouseleave', () => {
                hoverAnimation.pause();
                gsap.to(downloadBtn, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power1.out"
                });
            });

            // Initial attention-grabbing pulse
            gsap.to(downloadBtn, {
                scale: 1.1,
                duration: 0.8,
                ease: "elastic.out(1, 0.5)",
                repeat: 1,
                yoyo: true,
                delay: 2.5
            });
        }
    }

    // Carousel functionality
    const mainImage = document.querySelector('.main-carousel-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const prevButton = document.querySelector('.carousel-arrow.prev');
    const nextButton = document.querySelector('.carousel-arrow.next');
    
    let currentIndex = 0;
    
    // Function to update carousel with GSAP animation
    function updateCarousel(index) {
        // GSAP fade animation for main image
        gsap.to(mainImage, {
            duration: 0.3,
            opacity: 0,
            onComplete: () => {
                const newSrc = thumbnails[index].getAttribute('data-fullsize');
                mainImage.src = newSrc;
                gsap.to(mainImage, {
                    duration: 0.3,
                    opacity: 1,
                    ease: "power2.inOut"
                });
            }
        });
        
        // Update active thumbnail with scale animation
        thumbnails.forEach((thumb, i) => {
            if (i === index) {
                gsap.to(thumb, {
                    duration: 0.3,
                    scale: 1.1,
                    ease: "power2.out"
                });
                thumb.classList.add('active');
            } else {
                gsap.to(thumb, {
                    duration: 0.3,
                    scale: 1,
                    ease: "power2.out"
                });
                thumb.classList.remove('active');
            }
        });
        
        currentIndex = index;
    }
    
    // Set up thumbnail click events
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function() {
            updateCarousel(index);
        });
    });
    
    // Previous button click event
    prevButton.addEventListener('click', function() {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) {
            newIndex = thumbnails.length - 1;
        }
        updateCarousel(newIndex);
    });
    
    // Next button click event
    nextButton.addEventListener('click', function() {
        let newIndex = currentIndex + 1;
        if (newIndex >= thumbnails.length) {
            newIndex = 0;
        }
        updateCarousel(newIndex);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevButton.click();
        } else if (e.key === 'ArrowRight') {
            nextButton.click();
        }
    });
    
    // Initialize all GSAP animations
    initGSAPAnimations();
    
    // Scroll-triggered animations for carousel and download section
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gsap.to(entry.target, {
                    duration: 0.8,
                    opacity: 1,
                    y: 0,
                    ease: "power2.out"
                });
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.carousel-container, .download-section');
    animatedElements.forEach(el => {
        gsap.set(el, { opacity: 0, y: 30 });
        observer.observe(el);
    });
});