// Lab Rumble page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Carousel functionality
    const mainImage = document.querySelector('.main-carousel-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const prevButton = document.querySelector('.carousel-arrow.prev');
    const nextButton = document.querySelector('.carousel-arrow.next');
    
    let currentIndex = 0;
    
    // Function to update carousel
    function updateCarousel(index) {
        // Update main image
        const newSrc = thumbnails[index].getAttribute('data-fullsize');
        mainImage.style.opacity = '0';
        
        setTimeout(() => {
            mainImage.src = newSrc;
            mainImage.style.opacity = '1';
        }, 200);
        
        // Update active thumbnail
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        thumbnails[index].classList.add('active');
        
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
            newIndex = thumbnails.length - 1; // Loop to last image
        }
        updateCarousel(newIndex);
    });
    
    // Next button click event
    nextButton.addEventListener('click', function() {
        let newIndex = currentIndex + 1;
        if (newIndex >= thumbnails.length) {
            newIndex = 0; // Loop to first image
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
    
    // Add animation to download button on page load
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        setTimeout(() => {
            downloadBtn.style.transform = 'scale(1.05)';
            setTimeout(() => {
                downloadBtn.style.transform = 'scale(1)';
            }, 300);
        }, 1000);
    }
    
    // Add scroll animation for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.carousel-container, .download-section');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
});