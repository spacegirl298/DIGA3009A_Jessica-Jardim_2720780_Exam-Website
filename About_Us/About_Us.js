document.addEventListener("DOMContentLoaded", () => {
    // Card flip 
    const flipCards = document.querySelectorAll(".flip-card");

    flipCards.forEach((flipCard) => {
        const card = flipCard.querySelector(".card-inner");
        let flipped = false;
        
        // glow 
        const glowElement = document.createElement('div');
        glowElement.className = 'card-glow';
        Object.assign(glowElement.style, {
            position: 'absolute',
            width: '110%',
            height: '130%',
            top: '-5%',
            left: '-5%',
            borderRadius: '12px',
            background: 'radial-gradient(circle at center, rgba(237,106,24,0.6) 0%, rgba(237,106,24,0.2) 50%, rgba(237,106,24,0) 70%)',
            opacity: '0',
            zIndex: '-1',
            pointerEvents: 'none',
            filter: 'blur(25px)'
        });
        
        flipCard.style.position = 'relative';
        flipCard.appendChild(glowElement);

        flipCard.addEventListener("mouseenter", () => {
            const targetRotation = flipped ? 160 : 20;
            
            gsap.to(card, {
                duration: 0.4,
                rotateY: targetRotation,
                scale: 1.05,
                ease: "power2.out"
            });
            
            gsap.to(glowElement, {
                duration: 0.4,
                opacity: 1,
                scale: 1.1,
                ease: "power2.out"
            });
        });

        flipCard.addEventListener("mouseleave", () => {
            const targetRotation = flipped ? 180 : 0;
            
            gsap.to(card, {
                duration: 0.4,
                rotateY: targetRotation,
                scale: 1,
                ease: "power2.out"
            });
            
            gsap.to(glowElement, {
                duration: 0.4,
                opacity: 0,
                scale: 1,
                ease: "power2.out"
            });
        });

        flipCard.addEventListener("click", () => {
            flipped = !flipped;
            
            gsap.to(glowElement, {
                duration: 0.3,
                opacity: 0,
                ease: "power2.out"
            });
            
            gsap.to(card, {
                duration: 0.8,
                rotateY: flipped ? 180 : 0,
                scale: 1,
                ease: "power2.inOut",
            });
        });
    });

    // Back to top button
    const backToTopBtn = document.getElementById("backToTopBtn");
    
    if (backToTopBtn) {
        window.addEventListener("scroll", () => {
            backToTopBtn.style.display = window.pageYOffset > 300 ? "block" : "none";
        });

        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
    
    gsap.registerPlugin(ScrollTrigger);
    
    const textBlocks = document.querySelectorAll('.text-block');
    textBlocks.forEach((block, index) => {
        gsap.fromTo(block, 
            {
                opacity: 0,
                y: 50
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: block,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                    markers: false
                }
            }
        );
    });

   

  
});
function initAnimations() {
  gsap.from('.entry-title', {
    duration: 1,
    y: -50,
    opacity: 0,
    ease: "power3.out"
  });
}