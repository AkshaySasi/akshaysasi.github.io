// EmailJS Configuration
const EMAILJS_CONFIG = {
    publicKey: 'zZDaIpZl3WuCShFIx',      // EmailJS Public Key
    serviceID: 'service_6rxo3z1',        // EmailJS Service ID
    templateID: 'template_gbmelhl',      // Main notification template
    autoResponseID: 'template_is113m3'   // Auto-response template
};

/**
 * Wait for EmailJS library to load
 */
function waitForEmailJS() {
    return new Promise((resolve) => {
        if (typeof emailjs !== 'undefined') {
            resolve();
        } else {
            // Check every 100ms for up to 5 seconds
            let attempts = 0;
            const maxAttempts = 50;
            const checkInterval = setInterval(() => {
                attempts++;
                if (typeof emailjs !== 'undefined') {
                    clearInterval(checkInterval);
                    resolve();
                } else if (attempts >= maxAttempts) {
                    clearInterval(checkInterval);
                    console.error('EmailJS library failed to load');
                    resolve(); // Resolve anyway to prevent hanging
                }
            }, 100);
        }
    });
}

/**
 * Initialize EmailJS when the page loads
 */
async function initEmailJS() {
    await waitForEmailJS();

    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.publicKey);
        console.log('EmailJS initialized successfully');
        return true;
    } else {
        console.error('EmailJS library not loaded');
        return false;
    }
}

/**
 * Send email using EmailJS
 * @param {Object} formData - Form data containing name, email, and message
 * @returns {Promise} - Promise that resolves when email is sent
 */
async function sendEmail(formData) {
    try {
        // Check if EmailJS is available
        if (typeof emailjs === 'undefined') {
            throw new Error('EmailJS is not loaded. Please refresh the page and try again.');
        }

        // Validate form data
        if (!formData.name || !formData.email || !formData.message) {
            throw new Error('Please fill in all required fields');
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            throw new Error('Please enter a valid email address');
        }

        // Template parameters - these should match your EmailJS template variables
        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message
        };

        console.log('Sending notification email...');

        // Send notification email to you
        const response = await emailjs.send(
            EMAILJS_CONFIG.serviceID,
            EMAILJS_CONFIG.templateID,
            templateParams
        );

        console.log('✅ Email sent successfully:', response);

        return {
            success: true,
            message: 'Message sent successfully! I\'ll get back to you soon.'
        };
    } catch (error) {
        console.error('❌ Email sending error:', error);
        return {
            success: false,
            message: error.message || 'Failed to send message. Please try again or email me directly.'
        };
    }
}

/**
 * Handle contact form submission
 * @param {Event} event - Form submit event
 * @param {HTMLFormElement} form - The form element
 */
async function handleContactFormSubmit(event, form) {
    event.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const statusDiv = document.getElementById('formStatus');

    // Disable button and show loading state
    const originalBtnContent = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    if (statusDiv) {
        statusDiv.style.display = 'none';
    }

    // Get form data
    const formData = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        message: form.message.value.trim()
    };

    // Send email
    const result = await sendEmail(formData);

    // Show result to user
    showFormStatus(result.message, result.success ? 'success' : 'error', statusDiv);

    // Reset form if successful
    if (result.success) {
        form.reset();
    }

    // Re-enable button
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnContent;
}

/**
 * Show status message to user
 * @param {string} message - Message to display
 * @param {string} type - 'success' or 'error'
 * @param {HTMLElement} statusDiv - Status div element
 */
function showFormStatus(message, type, statusDiv) {
    if (!statusDiv) return;

    statusDiv.style.display = 'block';
    statusDiv.textContent = message;
    statusDiv.style.color = type === 'success' ? '#4CAF50' : '#f44336';
    statusDiv.style.backgroundColor = type === 'success'
        ? 'rgba(76, 175, 80, 0.1)'
        : 'rgba(244, 67, 54, 0.1)';
    statusDiv.style.padding = '15px';
    statusDiv.style.borderRadius = '8px';
    statusDiv.style.marginTop = '20px';
    statusDiv.style.border = type === 'success'
        ? '1px solid #4CAF50'
        : '1px solid #f44336';
    statusDiv.style.animation = 'slideIn 0.3s ease';

    // Auto-hide after 5 seconds
    setTimeout(() => {
        statusDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            statusDiv.style.display = 'none';
        }, 300);
    }, 5000);
}

// Initialize EmailJS when DOM is ready
document.addEventListener('DOMContentLoaded', async function () {
    // Wait for and initialize EmailJS
    await initEmailJS();

    // Attach form handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            handleContactFormSubmit(event, this);
        });
    }
});
