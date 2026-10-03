/* ==========================================
   SHARED JS - Common across all pages
   ========================================== */

// --- Mobile Menu ---
var sidemenu = document.getElementById("sidemenu");
var menuTrigger = document.querySelector('nav .fa-bars');
var menuPreviousOverflow = '';
var menuPreviousRootOverflow = '';
var menuPreviousFocus = null;
var mobileMenuQuery = window.matchMedia('(max-width: 768px)');

function openmenu() {
    if (!sidemenu || !mobileMenuQuery.matches || sidemenu.classList.contains('open')) return;
    menuPreviousOverflow = document.body.style.overflow;
    menuPreviousRootOverflow = document.documentElement.style.overflow;
    menuPreviousFocus = document.activeElement;
    sidemenu.classList.add("open");
    sidemenu.setAttribute('aria-hidden', 'false');
    if (menuTrigger) menuTrigger.setAttribute('aria-expanded', 'true');
    // Freeze the page behind the overlay so scrolling can't bleed through
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    var firstLink = sidemenu.querySelector('a');
    requestAnimationFrame(function() {
        if (firstLink && sidemenu.classList.contains('open')) firstLink.focus({ preventScroll: true });
    });
}

function closemenu() {
    if (!sidemenu || !sidemenu.classList.contains('open')) return;
    sidemenu.classList.remove("open");
    document.body.style.overflow = menuPreviousOverflow;
    document.documentElement.style.overflow = menuPreviousRootOverflow;
    if (mobileMenuQuery.matches) sidemenu.setAttribute('aria-hidden', 'true');
    if (menuTrigger) menuTrigger.setAttribute('aria-expanded', 'false');
    if (menuPreviousFocus) menuPreviousFocus.focus({ preventScroll: true });
}

if (sidemenu) {
    function syncMenuViewport() {
        closemenu();
        sidemenu.setAttribute('aria-hidden', String(mobileMenuQuery.matches));
    }
    mobileMenuQuery.addEventListener('change', syncMenuViewport);
    syncMenuViewport();
    var dismiss = sidemenu.querySelector('.fa-circle-xmark');
    [menuTrigger, dismiss].forEach(function(control) {
        if (!control) return;
        control.setAttribute('role', 'button');
        control.tabIndex = 0;
        control.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                control.click();
            }
        });
    });
    if (menuTrigger) {
        menuTrigger.setAttribute('aria-controls', 'sidemenu');
        menuTrigger.setAttribute('aria-expanded', 'false');
    }
    sidemenu.addEventListener('keydown', function(e) {
        if (e.key !== 'Tab' || !sidemenu.classList.contains('open')) return;
        var controls = sidemenu.querySelectorAll('a, button, [tabindex="0"]');
        var first = controls[0], last = controls[controls.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault(); first.focus();
        }
    });
}

// Escape closes the menu, same as the × button
document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && sidemenu && sidemenu.classList.contains("open")) {
        closemenu();
    }
});

// Close menu on link click (mobile)
document.addEventListener('DOMContentLoaded', function() {
    var menuLinks = document.querySelectorAll('#sidemenu a, #sidemenu .contact-btn');
    menuLinks.forEach(function(link) {
        link.addEventListener('click', closemenu);
    });
});

// --- Scroll Arrow (hide on scroll) ---
(function() {
    var scrollArrow = document.getElementById('scrollArrow');
    if (!scrollArrow) return;
    window.addEventListener('scroll', function() {
        if (window.scrollY > 30) {
            scrollArrow.classList.add('hidden');
        } else {
            scrollArrow.classList.remove('hidden');
        }
    }, { passive: true });
})();

// --- Splash Screen ---
window.addEventListener("load", function() {
    var splash = document.getElementById("splash");
    if (splash) {
        splash.style.opacity = 1;
        setTimeout(function() {
            splash.style.opacity = 0;
            setTimeout(function() {
                splash.style.display = "none";
            }, 300);
        }, 500);
    }
});

// --- Active Nav Link ---
(function setActiveNav() {
    var path = window.location.pathname;
    var page = path.split('/').pop() || 'index.html';
    if (page === '' || page === '/') page = 'index.html';

    var navLinks = document.querySelectorAll('#sidemenu a');
    navLinks.forEach(function(link) {
        link.classList.remove('active');
        var href = link.getAttribute('href');
        if (!href) return;

        var linkPage = href.split('/').pop().split('#')[0] || 'index.html';
        if (linkPage === page || (page === 'index.html' && (linkPage === '' || linkPage === '/'))) {
            link.classList.add('active');
        }
    });
})();

// --- Footer Year ---
(function setYear() {
    var el = document.getElementById('currentYear');
    if (el) el.textContent = new Date().getFullYear();
})();

// --- Smooth Scroll for Anchor Links ---
document.addEventListener('click', function(e) {
    var target = e.target.closest('a[href^="#"]');
    if (!target) return;

    var id = target.getAttribute('href');
    if (id === '#') return;

    var el = document.querySelector(id);
    if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
        closemenu();
    }
});

// --- Command Palette (Ctrl+K / Cmd+K) ---
var cmdPaletteItems = [
    { label: 'Home', icon: 'fas fa-home', url: '/' },
    { label: 'About', icon: 'fas fa-user', url: '/#about' },
    { label: 'Experience', icon: 'fas fa-briefcase', url: '/#experience' },
    { label: 'Skills', icon: 'fas fa-code', url: '/#skills' },
    { label: 'Projects', icon: 'fas fa-project-diagram', url: '/projects.html' },
    { label: 'Products', icon: 'fas fa-rocket', url: '/product-studio.html' },
    { label: 'Publications', icon: 'fas fa-file-alt', url: '/publications.html' },
    { label: 'Blogs', icon: 'fas fa-pen-fancy', url: '/blogs.html' },
    { label: 'Contact', icon: 'fas fa-envelope', url: '/#contact' },
    { label: 'Download Resume', icon: 'fas fa-download', url: '/images/AKSHAY%20SASI%20RESUME.pdf' }
];

var cmdPaletteSelectedIndex = 0;

function openCmdPalette() {
    var overlay = document.getElementById('cmdPalette');
    if (!overlay) return;
    overlay.classList.add('active');
    var input = document.getElementById('cmdPaletteInput');
    if (input) { input.value = ''; input.focus(); }
    cmdPaletteSelectedIndex = 0;
    renderCmdResults('');
}

function closeCmdPalette() {
    var overlay = document.getElementById('cmdPalette');
    if (overlay) overlay.classList.remove('active');
}

function renderCmdResults(query) {
    var container = document.getElementById('cmdPaletteResults');
    if (!container) return;

    var filtered = cmdPaletteItems.filter(function(item) {
        return item.label.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });

    container.innerHTML = filtered.map(function(item, i) {
        var cls = 'cmd-palette-item' + (i === cmdPaletteSelectedIndex ? ' selected' : '');
        return '<div class="' + cls + '" data-index="' + i + '"><i class="' + item.icon + '"></i><span>' + item.label + '</span></div>';
    }).join('');

    // Click handler
    container.querySelectorAll('.cmd-palette-item').forEach(function(el) {
        el.addEventListener('click', function() {
            var idx = parseInt(this.getAttribute('data-index'));
            executeCmdItem(filtered[idx]);
        });
    });
}

function executeCmdItem(item) {
    closeCmdPalette();
    if (item.url) {
        window.location.href = item.url;
    }
}

// Keyboard shortcut
document.addEventListener('keydown', function(e) {
    // Ctrl+K or Cmd+K
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        var overlay = document.getElementById('cmdPalette');
        if (overlay && overlay.classList.contains('active')) {
            closeCmdPalette();
        } else {
            openCmdPalette();
        }
    }

    // Escape closes palette
    if (e.key === 'Escape') {
        closeCmdPalette();
    }

    // Arrow navigation in palette
    var overlay = document.getElementById('cmdPalette');
    if (!overlay || !overlay.classList.contains('active')) return;

    var items = overlay.querySelectorAll('.cmd-palette-item');
    if (items.length === 0) return;

    if (e.key === 'ArrowDown') {
        e.preventDefault();
        cmdPaletteSelectedIndex = (cmdPaletteSelectedIndex + 1) % items.length;
        items.forEach(function(el, i) { el.classList.toggle('selected', i === cmdPaletteSelectedIndex); });
        items[cmdPaletteSelectedIndex].scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        cmdPaletteSelectedIndex = (cmdPaletteSelectedIndex - 1 + items.length) % items.length;
        items.forEach(function(el, i) { el.classList.toggle('selected', i === cmdPaletteSelectedIndex); });
        items[cmdPaletteSelectedIndex].scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter') {
        e.preventDefault();
        if (items[cmdPaletteSelectedIndex]) items[cmdPaletteSelectedIndex].click();
    }
});

// Filter on input
document.addEventListener('DOMContentLoaded', function() {
    var input = document.getElementById('cmdPaletteInput');
    if (input) {
        input.addEventListener('input', function() {
            cmdPaletteSelectedIndex = 0;
            renderCmdResults(this.value);
        });
    }

    // Close on overlay click
    var overlay = document.getElementById('cmdPalette');
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) closeCmdPalette();
        });
    }
});

// Reveal once, with no persistent animation layers or per-card timers.
document.addEventListener('DOMContentLoaded', function() {
    var reveals = document.querySelectorAll('.reveal');
    var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motion.matches || !('IntersectionObserver' in window)) return;
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.remove('reveal-pending');
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.05 });
    reveals.forEach(function(el) {
        el.classList.add('reveal-pending');
        el.style.transitionDelay = Math.min(Number(el.dataset.delay) || 0, 160) + 'ms';
        observer.observe(el);
    });
    motion.addEventListener('change', function(e) {
        if (!e.matches) return;
        observer.disconnect();
        reveals.forEach(function(el) { el.classList.remove('reveal-pending'); });
    });
});

// One scheduled update per frame, only when scrolling or resizing.
(function() {
    var bar = document.createElement('div');
    bar.className = 'scroll-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);
    var pending = false;
    function update() {
        pending = false;
        var height = document.documentElement.scrollHeight - window.innerHeight;
        var progress = height > 0 ? Math.max(0, Math.min(1, window.scrollY / height)) : 0;
        bar.style.transform = 'scaleX(' + progress + ')';
    }
    function schedule() {
        if (pending) return;
        pending = true;
        requestAnimationFrame(update);
    }
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    window.addEventListener('load', schedule);
    if ('ResizeObserver' in window) new ResizeObserver(schedule).observe(document.body);
    update();
})();

// Vibration is an explicit preference; visual press feedback works everywhere.
(function() {
    if (typeof navigator.vibrate !== 'function') return;
    var footer = document.querySelector('footer, #footer');
    if (!footer) return;
    var enabled = false;
    try { enabled = localStorage.getItem('portfolio-haptics') === 'on'; } catch (e) {}
    var toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'haptics-toggle';
    toggle.id = 'haptics-toggle';
    function render() {
        toggle.textContent = 'Touch vibration: ' + (enabled ? 'on' : 'off');
        toggle.setAttribute('aria-pressed', String(enabled));
    }
    render();
    footer.appendChild(toggle);
    toggle.addEventListener('click', function() {
        enabled = !enabled;
        try { localStorage.setItem('portfolio-haptics', enabled ? 'on' : 'off'); } catch (e) {}
        render();
    });
    var lastPulse = 0;
    document.addEventListener('click', function(e) {
        if (!e.isTrusted || !enabled || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        var control = e.target.closest('button, a, [role="button"]');
        if (!control || control.disabled || Date.now() - lastPulse < 100) return;
        lastPulse = Date.now();
        navigator.vibrate(8);
    });
})();
