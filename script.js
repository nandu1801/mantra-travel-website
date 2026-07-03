document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // FEATURE 1: Mobile Hamburger Menu Toggle
    // ==========================================================================
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            // Toggle active classes to animate menu and handle responsive display
            navLinks.classList.toggle('nav-active');
            mobileMenu.classList.toggle('toggle-icon');
        });

        // Close menu automatically if a navigation link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('nav-active');
                mobileMenu.classList.remove('toggle-icon');
            });
        });
    }

    // ==========================================================================
    // FEATURE 2: Booking Form Client-Side Validation & Verification
    // ==========================================================================
    const bookingForm = document.getElementById('bookingForm');
    const feedback = document.getElementById('formFeedback');
    const dateInput = document.getElementById('travelDate');

    // Enforce HTML5 restriction preventing selection of past dates
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    if (bookingForm && feedback) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Stop default form submittal and page reloads

            // Collect and clean input strings
            const name = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const destination = document.getElementById('destination').value;
            const date = document.getElementById('travelDate').value;

            let errorMessage = '';

            // Validation Rule Checklist Evaluation
            if (!name || !email || !destination || !date) {
                errorMessage = 'Error: Please fill out all required fields before confirming your journey.';
            } else if (!validateEmail(email)) {
                errorMessage = 'Error: Please enter a valid email address configuration (e.g., name@domain.com).';
            } else if (new Date(date) < new Date(new Date().setHours(0, 0, 0, 0))) {
                errorMessage = 'Error: The selected travel date has already passed. Please choose a future date.';
            }

            // Display Feedback safely to user
            if (errorMessage) {
                feedback.textContent = errorMessage;
                feedback.style.backgroundColor = 'rgba(217, 4, 41, 0.15)'; // Muted red matching --error-color
                feedback.style.color = 'var(--error-color, #d90429)';
                feedback.style.border = '1px solid var(--error-color)';
                feedback.style.display = 'block';
            } else {
                // Success output matching consistent portal variables
                feedback.textContent = `Thank you, ${name}! Your custom tour request for ${destination.toUpperCase()} starting on ${date} has been registered successfully.`;
                feedback.style.backgroundColor = 'rgba(56, 176, 0, 0.15)'; // Muted green matching --success-color
                feedback.style.color = 'var(--success-color, #38b000)';
                feedback.style.border = '1px solid var(--success-color)';
                feedback.style.display = 'block';
                
                bookingForm.reset(); // Safely clear all fields upon success
            }
        });
    }

    /**
     * Helper Function: Email Structural Pattern Verification Regex
     * @param {string} email - String content to match against
     * @returns {boolean} True if formatting sequence is valid
     */
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
});