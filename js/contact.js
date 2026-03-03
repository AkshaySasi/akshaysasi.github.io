/* ==========================================
   CONTACT FORM - EmailJS + Supabase Dual Submit
   ========================================== */

var EMAILJS_CONFIG = {
    publicKey: 'zZDaIpZl3WuCShFIx',
    serviceID: 'service_6rxo3z1',
    templateID: 'template_gbmelhl',
    autoResponseID: 'template_is113m3'
};

// Wait for EmailJS library
function waitForEmailJS() {
    return new Promise(function(resolve) {
        if (typeof emailjs !== 'undefined') {
            resolve();
            return;
        }
        var attempts = 0;
        var check = setInterval(function() {
            attempts++;
            if (typeof emailjs !== 'undefined') {
                clearInterval(check);
                resolve();
            } else if (attempts >= 50) {
                clearInterval(check);
                resolve();
            }
        }, 100);
    });
}

// Initialize EmailJS
async function initEmailJS() {
    await waitForEmailJS();
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.publicKey);
    }
}

// Send email via EmailJS
async function sendEmail(formData) {
    try {
        if (typeof emailjs === 'undefined') {
            throw new Error('EmailJS is not loaded. Please refresh and try again.');
        }
        if (!formData.name || !formData.email || !formData.message) {
            throw new Error('Please fill in all required fields');
        }
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            throw new Error('Please enter a valid email address');
        }

        var templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message
        };

        await emailjs.send(
            EMAILJS_CONFIG.serviceID,
            EMAILJS_CONFIG.templateID,
            templateParams
        );

        return { success: true, message: "Message sent successfully! I'll get back to you soon." };
    } catch (error) {
        return { success: false, message: error.message || 'Failed to send message. Please try again.' };
    }
}

// Save to Supabase for admin panel
async function saveToSupabase(formData) {
    if (!supabaseClient) return;
    try {
        await supabaseClient.from('contact_submissions').insert([{
            name: formData.name,
            email: formData.email,
            message: formData.message,
            is_read: false,
            created_at: new Date().toISOString()
        }]);
    } catch (err) {
        console.warn('Supabase contact save error:', err);
    }
}

// Show form status
function showFormStatus(message, type, statusDiv) {
    if (!statusDiv) return;
    statusDiv.style.display = 'block';
    statusDiv.textContent = message;
    statusDiv.style.color = type === 'success' ? '#4CAF50' : '#f44336';
    statusDiv.style.backgroundColor = type === 'success' ? 'rgba(76,175,80,0.1)' : 'rgba(244,67,54,0.1)';
    statusDiv.style.padding = '15px';
    statusDiv.style.borderRadius = '8px';
    statusDiv.style.marginTop = '20px';
    statusDiv.style.border = '1px solid ' + (type === 'success' ? '#4CAF50' : '#f44336');

    setTimeout(function() {
        statusDiv.style.display = 'none';
    }, 5000);
}

// Handle form submission
async function handleContactFormSubmit(event, form) {
    event.preventDefault();

    var submitBtn = form.querySelector('button[type="submit"]');
    var statusDiv = document.getElementById('formStatus');
    var originalBtnContent = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    if (statusDiv) statusDiv.style.display = 'none';

    var formData = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        message: form.message.value.trim()
    };

    // Dual submit: EmailJS for email notification + Supabase for storage
    var result = await sendEmail(formData);
    saveToSupabase(formData);

    showFormStatus(result.message, result.success ? 'success' : 'error', statusDiv);

    if (result.success) form.reset();

    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnContent;
}

// Init on DOM ready
document.addEventListener('DOMContentLoaded', async function() {
    await initEmailJS();

    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            handleContactFormSubmit(event, this);
        });
    }
});
