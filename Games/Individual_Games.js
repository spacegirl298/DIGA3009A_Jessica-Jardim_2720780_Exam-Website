document.addEventListener('DOMContentLoaded', function() {
    // Hamburger Menu Functionality - SIMPLE VERSION
    function initHamburgerMenu() {
        const hamburgerBtn = document.querySelector('.hamburger-btn');
        const gamesSidebar = document.querySelector('.games-sidebar');
        const closeSidebar = document.querySelector('.close-sidebar');
        const sidebarOverlay = document.querySelector('.sidebar-overlay');
        const gameLinks = document.querySelectorAll('.game-link');

        function openSidebar() {
            hamburgerBtn.classList.add('active');
            gamesSidebar.classList.add('active');
            sidebarOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeSidebarMenu() {
            hamburgerBtn.classList.remove('active');
            gamesSidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Event Listeners
        hamburgerBtn.addEventListener('click', openSidebar);
        closeSidebar.addEventListener('click', closeSidebarMenu);
        sidebarOverlay.addEventListener('click', closeSidebarMenu);

        // Close sidebar when a game link is clicked
        gameLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                if (!this.classList.contains('active')) {
                    closeSidebarMenu();
                } else {
                    e.preventDefault();
                }
            });
        });

        // Close sidebar with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && gamesSidebar.classList.contains('active')) {
                closeSidebarMenu();
            }
        });
    }

    // Initialize the hamburger menu
    initHamburgerMenu();

    // Your existing carousel and animation code below...
    function initGSAPAnimations() {
        gsap.from('.entry-title', {
            duration: 1.2,
            y: -100,
            opacity: 0,
            ease: "bounce.out",
            delay: 0.3
        });

        gsap.from('.content-container', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: "power2.out",
            delay: 0.8
        });

        gsap.from('.content-container p', {
            duration: 1.2,
            y: 30,
            opacity: 0,
            stagger: 0.1,
            ease: "power2.out",
            delay: 1.2
        });

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

    const mainImage = document.querySelector('.main-carousel-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const prevButton = document.querySelector('.carousel-arrow.prev');
    const nextButton = document.querySelector('.carousel-arrow.next');
    
    let currentIndex = 0;
    
    function updateCarousel(index) {
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

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function() {
            updateCarousel(index);
        });
    });
    
    prevButton.addEventListener('click', function() {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) {
            newIndex = thumbnails.length - 1;
        }
        updateCarousel(newIndex);
    });
  
    nextButton.addEventListener('click', function() {
        let newIndex = currentIndex + 1;
        if (newIndex >= thumbnails.length) {
            newIndex = 0;
        }
        updateCarousel(newIndex);
    });
 
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevButton.click();
        } else if (e.key === 'ArrowRight') {
            nextButton.click();
        }
    });

    initGSAPAnimations();
    
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
    
    const animatedElements = document.querySelectorAll('.carousel-container, .download-section');
    animatedElements.forEach(el => {
        gsap.set(el, { opacity: 0, y: 30 });
        observer.observe(el);
    });
});