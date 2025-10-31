document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  const message = document.getElementById('form-message');
  const progressFill = document.querySelector('.progress-fill');
  const progressValue = document.getElementById('progress-value');
  const submitBtn = document.querySelector('.submit-btn');
  const btnText = document.querySelector('.btn-text');
  
  const inputs = form.querySelectorAll('input[required], textarea[required]');
  const totalFields = inputs.length;
  
  // Initialize progress tracking
  let completedFields = 0;
  updateProgress();
  
  // Add event listeners for real-time validation
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      validateField(input);
      updateProgress();
      updateAsteriskVisibility(input);
    });
    
    input.addEventListener('blur', () => {
      validateField(input);
      updateAsteriskVisibility(input);
    });
    
    // For date field, validate on change
    if (input.type === 'date') {
      input.addEventListener('change', () => {
        validateField(input);
        updateProgress();
        updateAsteriskVisibility(input);
      });
    }
  });
  
  // Enhanced field validation
  function validateField(field) {
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.error');
    
    // Reset state
    formGroup.classList.remove('valid', 'invalid');
    errorElement.textContent = '';
    
    // Check if field is empty
    if (field.validity.valueMissing) {
      formGroup.classList.add('invalid');
      errorElement.textContent = 'This field is required.';
      return false;
    }
    
    // Check for specific validation based on field type
    let isValid = true;
    let errorMessage = '';
    
    switch(field.type) {
      case 'email':
        if (field.validity.typeMismatch) {
          isValid = false;
          errorMessage = 'Please enter a valid email address.';
        } else if (!isValidEmail(field.value)) {
          isValid = false;
          errorMessage = 'Email format is incorrect.';
        }
        break;
        
      case 'tel':
        if (!isValidPhone(field.value)) {
          isValid = false;
          errorMessage = 'Please enter a valid phone number.';
        }
        break;
        
      case 'date':
        if (!isValidDate(field.value)) {
          isValid = false;
          errorMessage = 'Please select a valid date.';
        }
        break;
        
      case 'text':
        if (field.id === 'firstName' || field.id === 'lastName') {
          if (!isValidName(field.value)) {
            isValid = false;
            errorMessage = 'Please enter a valid name (letters only).';
          }
        }
        break;
    }
    
    // Update field state
    if (!isValid) {
      formGroup.classList.add('invalid');
      errorElement.textContent = errorMessage;
      return false;
    } else {
      formGroup.classList.add('valid');
      return true;
    }
  }
  
  // Remove asterisk when field is completed
  function updateAsteriskVisibility(field) {
    const formGroup = field.closest('.form-group');
    const asterisk = formGroup.querySelector('.required-asterisk');
    
    if (field.value.trim() !== '' && validateField(field)) {
      asterisk.style.display = 'none';
    } else {
      asterisk.style.display = 'inline';
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
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }
  
  function isValidDate(dateString) {
    // Date validation - check if it's a valid date and not in the future
    if (!dateString) return false;
    
    const date = new Date(dateString);
    const today = new Date();
    
    // Reset time part for accurate comparison
    today.setHours(0, 0, 0, 0);
    
    // Check if date is valid and not in the future
    return date instanceof Date && 
           !isNaN(date) && 
           date <= today;
  }
  
  function isValidName(name) {
    const nameRegex = /^[a-zA-Z\s\-']+$/;
    return nameRegex.test(name);
  }
  
  // Progress tracking
  function updateProgress() {
    completedFields = 0;
    
    inputs.forEach(input => {
      if (input.value.trim() !== '' && validateField(input)) {
        completedFields++;
      }
    });
    
    const progressPercentage = Math.round((completedFields / totalFields) * 100);
    progressFill.style.width = `${progressPercentage}%`;
    progressValue.textContent = `${progressPercentage}%`;
    
    // Change progress bar color based on completion
    if (progressPercentage < 30) {
      progressFill.style.background = 'linear-gradient(90deg, #f44336, #e53935)';
    } else if (progressPercentage < 70) {
      progressFill.style.background = 'linear-gradient(90deg, #ff9800, #f57c00)';
    } else {
      progressFill.style.background = 'linear-gradient(90deg, #7e57c2, #5e35b1)';
    }
  }
  
  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate all fields
    let allValid = true;
    inputs.forEach(input => {
      if (!validateField(input)) {
        allValid = false;
      }
    });
    
    if (!allValid) {
      showMessage('Please fix the errors above.', 'error');
      // Scroll to first error
      const firstError = form.querySelector('.invalid');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    
    // Prepare form data
    const formData = new FormData(form);
    
    try {
      // Simulate API call (replace with actual form submission)
      const response = await submitForm(formData);
      
      if (response.ok) {
        showMessage('Your message was sent successfully! We will get back to you soon.', 'success');
        form.reset();
        // Reset progress
        completedFields = 0;
        updateProgress();
        // Reset validation states and asterisks
        inputs.forEach(input => {
          const formGroup = input.closest('.form-group');
          formGroup.classList.remove('valid', 'invalid');
          formGroup.querySelector('.error').textContent = '';
          // Show asterisks again after reset
          const asterisk = formGroup.querySelector('.required-asterisk');
          asterisk.style.display = 'inline';
        });
      } else {
        throw new Error('Server response was not ok');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      showMessage('There was a problem sending your message. Please try again later.', 'error');
    } finally {
      // Reset loading state
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');
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
    message.className = type === 'success' ? 'message-success' : 'message-error';
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
      setTimeout(() => {
        message.textContent = '';
        message.className = '';
      }, 5000);
    }
  }
  
  // Add some visual effects on focus
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      this.parentElement.classList.remove('focused');
    });
  });
});