/* ==========================================
   SHARED JS - Common across all pages
   ========================================== */

// --- Mobile Menu ---
var sidemenu = document.getElementById("sidemenu");
function openmenu() {
    if (sidemenu) sidemenu.style.right = "0";
}
function closemenu() {
    if (sidemenu) sidemenu.style.right = "-300px";
}

// Close menu on link click (mobile)
document.addEventListener('DOMContentLoaded', function() {
    var menuLinks = document.querySelectorAll('#sidemenu a');
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
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    { label: 'My Works', icon: 'fas fa-rocket', url: '/product-studio.html' },
    { label: 'Blogs', icon: 'fas fa-pen-fancy', url: '/blogs.html' },
    { label: 'Research', icon: 'fas fa-flask', url: '/research.html' },
    { label: 'Contact', icon: 'fas fa-envelope', url: '/#contact' },
    { label: 'Download Resume', icon: 'fas fa-download', url: '/images/resume.pdf' }
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
