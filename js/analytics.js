/* ==========================================
   ANALYTICS - Page Views & Click Tracking
   Loaded on all public pages
   ========================================== */

(function() {
    'use strict';

    function trackPageView() {
        if (!supabaseClient) return;

        supabaseClient.from('page_views').insert([{
            page_path: window.location.pathname,
            page_title: document.title,
            referrer: document.referrer || null,
            session_id: getSessionId(),
            created_at: new Date().toISOString()
        }]).then(function(result) {
            if (result.error) console.warn('Analytics page view error:', result.error.message);
        });
    }

    function trackClick(element) {
        if (!supabaseClient) return;

        var elementId = element.id || '';
        var elementText = (element.textContent || '').trim().substring(0, 100);
        var elementType = element.tagName.toLowerCase();
        if (element.classList.contains('contact-btn')) elementType = 'cta-button';
        else if (element.closest('nav')) elementType = 'nav-link';
        else if (element.closest('.project-card')) elementType = 'project-card';
        else if (element.closest('.pro-card')) elementType = 'product-card';
        else if (element.href && element.target === '_blank') elementType = 'external-link';

        supabaseClient.from('click_events').insert([{
            page_path: window.location.pathname,
            element_id: elementId,
            element_text: elementText,
            element_type: elementType,
            session_id: getSessionId(),
            created_at: new Date().toISOString()
        }]).then(function(result) {
            if (result.error) console.warn('Analytics click error:', result.error.message);
        });
    }

    // Track page view on load
    document.addEventListener('DOMContentLoaded', function() {
        trackPageView();
    });

    // Track clicks on interactive elements
    document.addEventListener('click', function(e) {
        var target = e.target.closest('a, button, .project-card, .pro-card, .research-card, .blog-card');
        if (target) trackClick(target);
    });
})();
