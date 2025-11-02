document.addEventListener("DOMContentLoaded", function () {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    // ANIMATION 1: ScrollTrigger - Form elements sequential reveal
    gsap.to(".form-group", {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
            trigger: ".contact-right",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    });

    // ANIMATION 2: Timeline - Social icons sequential entrance
    const socialTimeline = gsap.timeline({ 
        delay: 0.5,
        scrollTrigger: {
            trigger: ".social-icons",
            start: "top 90%",
            toggleActions: "play none none reverse"
        }
    });

    socialTimeline
        .to(".social-icons a", {
            opacity: 1,
            x: 0,
            stagger: 0.2,
            duration: 0.6,
            ease: "elastic.out(1, 0.8)"
        })
        .to(".social-icon", {
            rotation: 360,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.7)"
        }, "-=0.3");

    // ANIMATION 3: Motion Path - Floating message animation
    gsap.to(".floating-message", {
        motionPath: {
            path: "#messagePath",
            align: "#messagePath",
            alignOrigin: [0.5, 0.5]
        },
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    // Add scale animation to the message
    gsap.to(".floating-message", {
        scale: 1.2,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    // ANIMATION 4: SVG Wave animation on scroll
    const wavePaths = document.querySelectorAll(".wave-divider path");
    
    wavePaths.forEach((path, index) => {
        const length = path.getTotalLength();
        
        // Set initial state
        gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length
        });

        // Animate on scroll
        gsap.to(path, {
            strokeDashoffset: 0,
            duration: 2,
            ease: "sine.inOut",
            scrollTrigger: {
                trigger: ".wave-divider",
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            },
            delay: index * 0.3
        });
    });

    // Additional animation: Submit button entrance
    gsap.to(".submit-btn", {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "elastic.out(1, 0.8)",
        scrollTrigger: {
            trigger: ".submit-btn",
            start: "top 90%",
            toggleActions: "play none none reverse"
        }
    });

    // Original form functionality
    const form = document.getElementById("contactForm");
    const message = document.getElementById("form-message");
    const progressFill = document.querySelector(".progress-fill");
    const progressValue = document.getElementById("progress-value");
    const submitBtn = document.querySelector(".submit-btn");
    const btnText = document.querySelector(".btn-text");

    const inputs = form.querySelectorAll("input[required], textarea[required]");
    const totalFields = inputs.length;

    // Initialize progress tracking
    let completedFields = 0;
    updateProgress();

    // Add event listeners for real-time validation
    inputs.forEach((input) => {
        input.addEventListener("input", () => {
            validateField(input);
            updateProgress();
        });

        input.addEventListener("blur", () => {
            validateField(input);
        });

        // For date field, validate on change
        if (input.type === "date") {
            input.addEventListener("change", () => {
                validateField(input);
                updateProgress();
            });
        }
    });

    // Enhanced field validation
    function validateField(field) {
        const formGroup = field.closest(".form-group");
        const errorElement = formGroup.querySelector(".error");

        // Reset state
        formGroup.classList.remove("valid", "invalid");
        errorElement.textContent = "";

        // Check if field is empty
        if (field.validity.valueMissing) {
            formGroup.classList.add("invalid");
            errorElement.textContent = "This field is required.";
            return false;
        }

        // Check for specific validation based on field type
        let isValid = true;
        let errorMessage = "";

        switch (field.type) {
            case "email":
                if (field.validity.typeMismatch) {
                    isValid = false;
                    errorMessage = "Please enter a valid email address.";
                } else if (!isValidEmail(field.value)) {
                    isValid = false;
                    errorMessage = "Email format is incorrect.";
                }
                break;

            case "tel":
                if (!isValidPhone(field.value)) {
                    isValid = false;
                    errorMessage = "Please enter a valid phone number.";
                }
                break;

            case "date":
                if (!isValidDate(field.value)) {
                    isValid = false;
                    errorMessage = "Please select a valid date.";
                }
                break;

            case "text":
                if (field.id === "firstName" || field.id === "lastName") {
                    if (!isValidName(field.value)) {
                        isValid = false;
                        errorMessage = "Please enter a valid name (letters only).";
                    }
                }
                break;
        }

        // Update field state
        if (!isValid) {
            formGroup.classList.add("invalid");
            errorElement.textContent = errorMessage;
            return false;
        } else {
            formGroup.classList.add("valid");
            return true;
        }
    }

    // Validation helper functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPhone(phone) {
        // Basic phone validation - allows various formats
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        return phoneRegex.test(phone.replace(/\s/g, ""));
    }

    function isValidDate(dateString) {
        // Date validation - only check if it's a valid date
        if (!dateString) return false;

        const date = new Date(dateString);
        return date instanceof Date && !isNaN(date);
    }

    function isValidName(name) {
        const nameRegex = /^[a-zA-Z\s\-']+$/;
        return nameRegex.test(name);
    }

    // Progress tracking
    function updateProgress() {
        completedFields = 0;

        inputs.forEach((input) => {
            if (input.value.trim() !== "" && validateField(input)) {
                completedFields++;
            }
        });

        const progressPercentage = Math.round(
            (completedFields / totalFields) * 100
        );
        progressFill.style.width = `${progressPercentage}%`;
        progressValue.textContent = `${progressPercentage}%`;

        // Animate progress bar update
        gsap.to(progressFill, {
            scaleX: progressPercentage / 100,
            duration: 0.5,
            ease: "power2.out"
        });

        // Change progress bar color based on completion
        if (progressPercentage < 30) {
            progressFill.style.background =
                "linear-gradient(90deg, #f44336, #e53935)";
        } else if (progressPercentage < 70) {
            progressFill.style.background =
                "linear-gradient(90deg, #ff9800, #f57c00)";
        } else {
            progressFill.style.background =
                "linear-gradient(90deg, #7e57c2, #5e35b1)";
        }
    }

    // Form submission
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Validate all fields
        let allValid = true;
        inputs.forEach((input) => {
            if (!validateField(input)) {
                allValid = false;
            }
        });

        if (!allValid) {
            showMessage("Please fix the errors above.", "error");
            // Scroll to first error with animation
            const firstError = form.querySelector(".invalid");
            if (firstError) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: firstError,
                        offsetY: 100
                    },
                    ease: "power2.inOut"
                });
                
                // Shake animation for error
                gsap.to(firstError, {
                    x: 10,
                    duration: 0.1,
                    repeat: 5,
                    yoyo: true,
                    ease: "power1.inOut"
                });
            }
            return;
        }

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.classList.add("loading");

        // Prepare form data
        const formData = new FormData(form);

        try {
            // Simulate API call (replace with actual form submission)
            const response = await submitForm(formData);

            if (response.ok) {
                showMessage(
                    "Your message was sent successfully! We will get back to you soon.",
                    "success"
                );
                
                // Success animation
                gsap.to(".submit-btn", {
                    scale: 1.1,
                    duration: 0.3,
                    yoyo: true,
                    repeat: 1,
                    ease: "power2.inOut"
                });
                
                form.reset();
                // Reset progress
                completedFields = 0;
                updateProgress();
                // Reset validation states
                inputs.forEach((input) => {
                    const formGroup = input.closest(".form-group");
                    formGroup.classList.remove("valid", "invalid");
                    formGroup.querySelector(".error").textContent = "";
                });
            } else {
                throw new Error("Server response was not ok");
            }
        } catch (error) {
            console.error("Form submission error:", error);
            showMessage(
                "There was a problem sending your message. Please try again later.",
                "error"
            );
        } finally {
            // Reset loading state
            submitBtn.disabled = false;
            submitBtn.classList.remove("loading");
        }
    });

    // Form submission function (replace with your actual endpoint)
    async function submitForm(formData) {
        // This is a mock function - replace with your actual form submission
        // For Formspree, you would use:
        // return await fetch(form.action, {
        //   method: form.method,
        //   body: formData,
        //   headers: { 'Accept': 'application/json' }
        // });

        // Simulate API call with delay
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ ok: true });
            }, 1500);
        });
    }

    // Message display function
    function showMessage(text, type) {
        message.textContent = text;
        message.className =
            type === "success" ? "message-success" : "message-error";

        // Animate message appearance
        gsap.fromTo(message, 
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
        );

        // Auto-hide success messages after 5 seconds
        if (type === "success") {
            setTimeout(() => {
                gsap.to(message, {
                    opacity: 0,
                    y: -20,
                    duration: 0.5,
                    onComplete: () => {
                        message.textContent = "";
                        message.className = "";
                    }
                });
            }, 5000);
        }
    }

    // Set max date to today
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('max', today);
});