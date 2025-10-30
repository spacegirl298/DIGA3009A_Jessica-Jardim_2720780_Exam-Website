// script.js
// Team data with image paths
const teamData = [
    {
        name: "Connor van Heerden",
        role: "Game Designer",
        description: "Creative media specialist with expertise in visual storytelling and digital content creation.",
        image: "./Images/Connor_Profile_Black.png" // Replace with your image path
    },
    {
        name: "Jordan Chicksen",
        role: "Project Manager",
        description: "Innovative game designer passionate about creating immersive and engaging player experiences.",
        image: "./Images/Jordan_Profile_Black.png" // Replace with your image path
    },
    {
        name: "Reatile Davhana",
        role: "Lead Programmer",
        description: "Strategic project manager ensuring timely delivery and seamless team coordination.",
        image: "./Images/Rea_Profile_Black.png" // Replace with your image path
    },
    {
        name: "Sihawu Zulu",
        role: "Lead Artist",
        description: "Technical lead with expertise in game development and cutting-edge programming solutions.",
        image: "./Images/Sihawu_Profile_Black.png" // Replace with your image path
    },
    {
        name: "Jessica Jardim",
        role: "Social Media Manager",
        description: "Visual artist specializing in character design and environmental art for immersive worlds.",
        image: "./Images/Jessica_Profile_Black.png" // Replace with your image path
    },
    {
        name: "Rameez Cassim",
        role: "Level Designer",
        description: "Audio specialist creating captivating soundscapes and immersive audio experiences.",
        image: "./Images/Rameez_Profile_Black.png" // Replace with your image path
    }
];

// Initialize the team showcase
document.addEventListener('DOMContentLoaded', function() {
    const teamContainer = document.querySelector('.team-container');
    const indicator = document.querySelector('.indicator');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentIndex = 0;
    let autoRotateInterval;
    
    // Create team member elements
    teamData.forEach((member, index) => {
        // Create team member card
        const memberElement = document.createElement('div');
        memberElement.className = 'team-member';
        memberElement.innerHTML = `
            <div class="team-title">Jardin</div>
            <div class="member-photo">
                <img src="${member.image}" alt="${member.name}">
            </div>
            <div class="member-name">${member.name}</div>
            <div class="member-role">${member.role}</div>
            <div class="member-description">${member.description}</div>
        `;
        teamContainer.appendChild(memberElement);
        
        // Create indicator dot
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            navigateTo(index);
        });
        indicator.appendChild(dot);
    });
    
    // Position team members initially
    positionTeamMembers();
    
    // Navigation event listeners
    prevBtn.addEventListener('click', () => navigateTo(currentIndex - 1));
    nextBtn.addEventListener('click', () => navigateTo(currentIndex + 1));
    
    // Function to navigate to a specific team member
    function navigateTo(index) {
        if (index < 0) index = teamData.length - 1;
        if (index >= teamData.length) index = 0;
        
        // Update current index
        currentIndex = index;
        
        // Position team members with animation
        positionTeamMembers();
        
        // Update indicator dots
        document.querySelectorAll('.dot').forEach((dot, i) => {
            if (i === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        // Reset auto-rotation timer
        resetAutoRotate();
    }
    
    // Function to position team members with GSAP animation
    function positionTeamMembers() {
        const members = document.querySelectorAll('.team-member');
        
        members.forEach((member, index) => {
            // Calculate position relative to current index
            let positionClass = '';
            if (index === currentIndex) {
                positionClass = 'active';
            } else if (index === (currentIndex - 1 + teamData.length) % teamData.length) {
                positionClass = 'left';
            } else if (index === (currentIndex + 1) % teamData.length) {
                positionClass = 'right';
            } else if (index === (currentIndex - 2 + teamData.length) % teamData.length) {
                positionClass = 'hidden-left';
            } else if (index === (currentIndex + 2) % teamData.length) {
                positionClass = 'hidden-right';
            } else {
                positionClass = 'hidden';
            }
            
            // Apply GSAP animation
            gsap.to(member, {
                duration: 0.7,
                x: getXPosition(positionClass),
                y: 0,
                rotationY: getRotationY(positionClass),
                scale: getScale(positionClass),
                opacity: getOpacity(positionClass),
                zIndex: getZIndex(positionClass),
                ease: "power2.out"
            });
            
            // Update class for styling
            member.className = 'team-member';
            member.classList.add(positionClass);
        });
    }
    
    // Helper functions for positioning
    function getXPosition(position) {
        switch(position) {
            case 'active': return 0;
            case 'left': return -300;
            case 'right': return 300;
            case 'hidden-left': return -600;
            case 'hidden-right': return 600;
            default: return 0;
        }
    }
    
    function getRotationY(position) {
        switch(position) {
            case 'active': return 0;
            case 'left': return 30;
            case 'right': return -30;
            case 'hidden-left': return 30;
            case 'hidden-right': return -30;
            default: return 0;
        }
    }
    
    function getScale(position) {
        switch(position) {
            case 'active': return 1.1;
            case 'left': return 0.8;
            case 'right': return 0.8;
            case 'hidden-left': return 0.6;
            case 'hidden-right': return 0.6;
            default: return 0.5;
        }
    }
    
    function getOpacity(position) {
        switch(position) {
            case 'active': return 1;
            case 'left': return 0.7;
            case 'right': return 0.7;
            case 'hidden-left': return 0.3;
            case 'hidden-right': return 0.3;
            default: return 0;
        }
    }
    
    function getZIndex(position) {
        switch(position) {
            case 'active': return 10;
            case 'left': return 5;
            case 'right': return 5;
            case 'hidden-left': return 1;
            case 'hidden-right': return 1;
            default: return 0;
        }
    }
    
    // Auto-rotate every 5 seconds
    function startAutoRotate() {
        autoRotateInterval = setInterval(() => {
            navigateTo(currentIndex + 1);
        }, 5000);
    }
    
    // Reset auto-rotation timer
    function resetAutoRotate() {
        clearInterval(autoRotateInterval);
        startAutoRotate();
    }
    
    // Start auto-rotation
    startAutoRotate();
    
    // Pause auto-rotation on hover
    teamContainer.addEventListener('mouseenter', () => {
        clearInterval(autoRotateInterval);
    });
    
    // Resume auto-rotation when mouse leaves
    teamContainer.addEventListener('mouseleave', () => {
        startAutoRotate();
    });
});