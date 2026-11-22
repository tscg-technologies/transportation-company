/**
 * Forms Module
 * Strictly client-side validation and accessible demo alert messaging.
 * NO backend requests, NO localStorage, NO sessionStorage.
 */
document.addEventListener('DOMContentLoaded', () => {
  // Email and Phone validation regular expressions
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9+\-\s()]{10,20}$/;

  // Helper: validate single field
  const validateField = (field) => {
    const errorEl = field.parentElement.querySelector('.error-feedback');
    let isValid = true;
    let errorMessage = '';

    const value = field.value.trim();

    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'This field is required.';
    } else if (value && field.type === 'email' && !emailRegex.test(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid email address.';
    } else if (value && (field.type === 'tel' || field.id.includes('phone')) && !phoneRegex.test(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid phone number (at least 10 digits).';
    }

    if (!isValid) {
      field.classList.add('is-invalid');
      if (errorEl) {
        errorEl.textContent = errorMessage;
        errorEl.classList.add('visible');
      }
    } else {
      field.classList.remove('is-invalid');
      if (errorEl) {
        errorEl.textContent = '';
        errorEl.classList.remove('visible');
      }
    }

    return isValid;
  };

  // 1. Contact Page: Trip Enquiry Form
  const tripForm = document.getElementById('tripEnquiryForm');
  const tripAlert = document.getElementById('tripEnquiryAlert');

  if (tripForm) {
    const inputs = tripForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid')) {
          validateField(input);
        }
      });
    });

    tripForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let formIsValid = true;

      inputs.forEach(input => {
        if (!validateField(input)) {
          formIsValid = false;
        }
      });

      if (formIsValid) {
        // Display required exact demo message
        if (tripAlert) {
          tripAlert.innerHTML = `
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <div>
              <strong>Enquiry Received (Portfolio Demo)</strong>
              <p style="margin-top: 4px;">Thank you for exploring our transportation demo. This enquiry has not been sent to a transportation provider.</p>
            </div>
          `;
          tripAlert.className = 'form-response-alert success';
          tripAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        tripForm.reset();
      }
    });
  }

  // 2. Corporate Page: Corporate Enquiry Form
  const corporateForm = document.getElementById('corporateEnquiryForm');
  const corporateAlert = document.getElementById('corporateEnquiryAlert');

  if (corporateForm) {
    const corpInputs = corporateForm.querySelectorAll('input, select, textarea');
    corpInputs.forEach(input => {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid')) {
          validateField(input);
        }
      });
    });

    corporateForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let formIsValid = true;

      corpInputs.forEach(input => {
        if (!validateField(input)) {
          formIsValid = false;
        }
      });

      if (formIsValid) {
        // Display required exact corporate demo message
        if (corporateAlert) {
          corporateAlert.innerHTML = `
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <div>
              <strong>Corporate Demo Submission</strong>
              <p style="margin-top: 4px;">This is a demo enquiry form. No information has been transmitted or stored.</p>
            </div>
          `;
          corporateAlert.className = 'form-response-alert success';
          corporateAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        corporateForm.reset();
      }
    });
  }
});
