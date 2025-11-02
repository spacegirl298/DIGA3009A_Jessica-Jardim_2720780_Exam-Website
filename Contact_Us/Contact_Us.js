document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

  //ScrollTrigger Animation
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
      toggleActions: "play none none reverse",
    },
  });

  //Timeline Animation
  const socialTimeline = gsap.timeline({
    delay: 0.5,
    scrollTrigger: {
      trigger: ".social-icons",
      start: "top 90%",
      toggleActions: "play none none reverse",
    },
  });

  socialTimeline
    .to(".social-icons a", {
      opacity: 1,
      x: 0,
      stagger: 0.2,
      duration: 0.6,
      ease: "elastic.out(1, 0.8)",
    })
    .to(
      ".social-icon",
      {
        rotation: 360,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
      },
      "-=0.3"
    );

  gsap.to(".floating-message", {
    scale: 1.2,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  // SVG Animation
  const wavePaths = document.querySelectorAll(".wave-divider path");

  wavePaths.forEach((path, index) => {
    const length = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 2,
      ease: "sine.inOut",
      scrollTrigger: {
        trigger: ".wave-divider",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
      delay: index * 0.3,
    });
  });

  gsap.to(".submit-btn", {
    opacity: 1,
    scale: 1,
    duration: 0.8,
    ease: "elastic.out(1, 0.8)",
    scrollTrigger: {
      trigger: ".submit-btn",
      start: "top 90%",
      toggleActions: "play none none reverse",
    },
  });

  //Form
  const form = document.getElementById("contactForm");
  const message = document.getElementById("form-message");
  const progressFill = document.querySelector(".progress-fill");
  const progressValue = document.getElementById("progress-value");
  const submitBtn = document.querySelector(".submit-btn");
  const btnText = document.querySelector(".btn-text");
  const contactRight = document.querySelector(".contact-right"); 

  const inputs = form.querySelectorAll("input[required], textarea[required]");
  const totalFields = inputs.length;

  let completedFields = 0;
  updateProgress();


  const phoneInput = document.getElementById("phone");
  phoneInput.addEventListener("input", function(e) {
    
    let value = e.target.value.replace(/\D/g, '');
    
   
    if (value.length > 10) {
      value = value.substring(0, 10);
    }
    
   
    if (value.length >= 6) {
      e.target.value = `(${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6)}`;
    } else if (value.length >= 3) {
      e.target.value = `(${value.substring(0, 3)}) ${value.substring(3)}`;
    } else {
      e.target.value = value;
    }
    
    validateField(phoneInput);
    updateProgress();
  });

  inputs.forEach((input) => {
    if (input.type !== "tel") { 
      input.addEventListener("input", () => {
        validateField(input);
        updateProgress();
      });

      input.addEventListener("blur", () => {
        validateField(input);
      });

      if (input.type === "date") {
        input.addEventListener("change", () => {
          validateField(input);
          updateProgress();
        });
      }
    }
  });

  function validateField(field) {
    const formGroup = field.closest(".form-group");
    const errorElement = formGroup.querySelector(".error");
    const label = formGroup.querySelector("label");

    formGroup.classList.remove("valid", "invalid");
    errorElement.textContent = "";

    if (field.validity.valueMissing) {
      formGroup.classList.add("invalid");
      errorElement.textContent = "This field is required.";
      if (!label.textContent.includes("*")) {
        label.textContent = label.textContent.trim() + " *";
      }
      return false;
    }

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
          errorMessage = "Please enter a valid 10-digit phone number.";
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

    if (!isValid) {
      formGroup.classList.add("invalid");
      errorElement.textContent = errorMessage;
      if (!label.textContent.includes("*")) {
        label.textContent = label.textContent.trim() + " *";
      }
      return false;
    } else {
      formGroup.classList.add("valid");
      label.textContent = label.textContent.replace(/\s*\*$/, "");
      return true;
    }
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidPhone(phone) {
   
    const digitsOnly = phone.replace(/\D/g, '');
    return digitsOnly.length === 10;
  }

  function isValidDate(dateString) {
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

    gsap.to(progressFill, {
      scaleX: progressPercentage / 100,
      duration: 0.5,
      ease: "power2.out",
    });

    if (progressPercentage < 30) {
      progressFill.style.background =
        "linear-gradient(90deg, #634321ff, #76430dff)";
    } else if (progressPercentage < 70) {
      progressFill.style.background =
        "linear-gradient(90deg, #783e02, #e67c3aff)";
    } else {
      progressFill.style.background =
        "linear-gradient(90deg, #ea752cff, #ed6a18)";
    }
  }

  // Shake animation function
  function shakeFormContainer() {
    const shakeTimeline = gsap.timeline();
    
    shakeTimeline
      .to(contactRight, {
        x: -10,
        duration: 0.05,
        ease: "power1.inOut"
      })
      .to(contactRight, {
        x: 10,
        duration: 0.05,
        ease: "power1.inOut"
      })
      .to(contactRight, {
        x: -8,
        duration: 0.05,
        ease: "power1.inOut"
      })
      .to(contactRight, {
        x: 8,
        duration: 0.05,
        ease: "power1.inOut"
      })
      .to(contactRight, {
        x: -5,
        duration: 0.05,
        ease: "power1.inOut"
      })
      .to(contactRight, {
        x: 5,
        duration: 0.05,
        ease: "power1.inOut"
      })
      .to(contactRight, {
        x: 0,
        duration: 0.05,
        ease: "power1.inOut"
      });
  }

  // Form submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let allValid = true;
    inputs.forEach((input) => {
      if (!validateField(input)) {
        allValid = false;
      }
    });

    if (!allValid) {
      showMessage("Please fix the errors above.", "error");
      
      shakeFormContainer();

      const firstError = form.querySelector(".invalid");
      if (firstError) {
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: firstError,
            offsetY: 100,
          },
          ease: "power2.inOut",
        });

        gsap.to(firstError, {
          x: 10,
          duration: 0.1,
          repeat: 5,
          yoyo: true,
          ease: "power1.inOut",
        });
      }
      return;
    }

    submitBtn.disabled = true;
    submitBtn.classList.add("loading");

    const formData = new FormData(form);

    try {
      const response = await submitForm(formData);

      if (response.ok) {
        showMessage(
          "Your message was sent successfully! We will get back to you soon.",
          "success"
        );

        gsap.to(".submit-btn", {
          scale: 1.1,
          duration: 0.3,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut",
        });

        form.reset();

        completedFields = 0;
        updateProgress();

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
      submitBtn.disabled = false;
      submitBtn.classList.remove("loading");
    }
  });

  async function submitForm(formData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ok: true });
      }, 1500);
    });
  }

  function showMessage(text, type) {
    message.textContent = text;
    message.className =
      type === "success" ? "message-success" : "message-error";

    gsap.fromTo(
      message,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
    );

    if (type === "success") {
      setTimeout(() => {
        gsap.to(message, {
          opacity: 0,
          y: -20,
          duration: 0.5,
          onComplete: () => {
            message.textContent = "";
            message.className = "";
          },
        });
      }, 5000);
    }
  }

  const dateInput = document.getElementById("date");
  const today = new Date().toISOString().split("T")[0];
  dateInput.setAttribute("max", today);
});