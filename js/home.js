/* ==========================================
   HOME PAGE JS - Counters, Typing, Tabs, Skills
   ========================================== */

// --- Counter Animation ---
document.addEventListener('DOMContentLoaded', function() {
    var DIGIT_HEIGHT = 48;

    function rollToNumber(elementId, targetValue) {
        var container = document.getElementById(elementId);
        if (!container) return;

        container.innerHTML = '';
        var digits = targetValue.toString().split('');

        digits.forEach(function(digit, index) {
            var digitWrapper = document.createElement('div');
            digitWrapper.classList.add('digit-wrapper');

            var digitList = document.createElement('div');
            digitList.classList.add('digit-list');

            for (var i = 0; i < 10; i++) {
                var d = document.createElement('div');
                d.textContent = i;
                digitList.appendChild(d);
            }

            digitWrapper.appendChild(digitList);
            container.appendChild(digitWrapper);

            setTimeout(function() {
                var h = digitWrapper.clientHeight || DIGIT_HEIGHT;
                digitList.style.transform = 'translateY(-' + (parseInt(digit) * h) + 'px)';
            }, index * 100);
        });
    }

    rollToNumber('xp-counter', 2);
    rollToNumber('project-counter', 10);
    rollToNumber('works-counter', 2);
    rollToNumber('pub-counter', 3);
});

// --- Experience Tab Switching ---
function openTab(tabName) {
    var tabContents = document.getElementsByClassName("tab-content");
    for (var i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove("active-tab");
    }

    var tabButtons = document.getElementsByClassName("tab-btn");
    for (var i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove("active");
    }

    var targetTab = document.getElementById(tabName);
    if (targetTab) targetTab.classList.add("active-tab");
    if (event && event.currentTarget) event.currentTarget.classList.add("active");
}

// --- Skill Category Switching ---
function showSkillCategory(event, categoryId) {
    var categories = document.querySelectorAll('.skill-category');
    categories.forEach(function(cat) { cat.classList.remove('active'); });

    var tabs = document.querySelectorAll('.tab-button');
    tabs.forEach(function(tab) { tab.classList.remove('active'); });

    var selectedCategory = document.getElementById(categoryId);
    if (selectedCategory) {
        selectedCategory.classList.add('active');
    }

    event.currentTarget.classList.add('active');
}

// --- Typing Animation ---
document.addEventListener('DOMContentLoaded', function() {
    var typingText = document.querySelector('.typing-text');
    if (!typingText) return;

    var designations = ["AI Engineer", "Researcher", "Graphic Designer"];
    var currentDesignation = 0;
    var charIndex = 0;
    var isDeleting = false;
    var typingSpeed = 150;

    function type() {
        var fullText = designations[currentDesignation];

        if (isDeleting) {
            typingText.textContent = fullText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = fullText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150;
        }

        if (!isDeleting && charIndex === fullText.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            currentDesignation = (currentDesignation + 1) % designations.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    setTimeout(type, 1000);
});

// --- Chatbot ---
var BACKEND_URL = 'https://botiee-backend-production.up.railway.app';

function toggleChatbot() {
    var chatWindow = document.getElementById('chatbotWindow');
    if (!chatWindow) return;
    chatWindow.classList.toggle('active');

    if (chatWindow.classList.contains('active')) {
        var notification = document.querySelector('.chat-notification');
        if (notification) notification.style.display = 'none';
        var input = document.getElementById('chatbotInput');
        if (input) input.focus();
    }
}

function addMessage(text, isUser) {
    var messagesContainer = document.getElementById('chatbotMessages');
    if (!messagesContainer) return;
    var time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    var messageDiv = document.createElement('div');
    messageDiv.className = isUser ? 'user-message' : 'bot-message';

    var avatarContent = isUser
        ? '<i class="fas fa-user"></i>'
        : '<img src="/images/Botiy.webp" alt="Botiee" class="message-avatar-image">';

    messageDiv.innerHTML =
        '<div class="message-avatar ' + (isUser ? 'user-avatar' : '') + '">' +
            avatarContent +
        '</div>' +
        '<div class="message-bubble">' +
            '<p>' + text + '</p>' +
            '<span class="message-time">' + time + '</span>' +
        '</div>';

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showTyping(show) {
    var typingIndicator = document.getElementById('typingIndicator');
    if (!typingIndicator) return;
    typingIndicator.style.display = show ? 'flex' : 'none';

    if (show) {
        var messagesContainer = document.getElementById('chatbotMessages');
        if (messagesContainer) messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

async function sendChatMessage() {
    var input = document.getElementById('chatbotInput');
    if (!input) return;
    var message = input.value.trim();
    if (!message) return;

    addMessage(message, true);
    input.value = '';
    showTyping(true);

    var controller = new AbortController();
    var timeoutId = setTimeout(function() { controller.abort(); }, 10000);

    try {
        var response = await fetch(BACKEND_URL + '/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message }),
            signal: controller.signal
        });

        clearTimeout(timeoutId);
        if (!response.ok) throw new Error('HTTP error: ' + response.status);

        var data = await response.json();

        setTimeout(function() {
            showTyping(false);
            addMessage(data.response || "Sorry, I couldn't process that.");
        }, 800);
    } catch (error) {
        clearTimeout(timeoutId);
        showTyping(false);
        if (error.name === 'AbortError') {
            addMessage("Botiee is waking up — give it a moment and try again!");
        } else {
            addMessage("Sorry, I'm having trouble connecting right now. Please try again!");
        }
    }
}

function handleChatEnter(event) {
    if (event.key === 'Enter') sendChatMessage();
}

// --- Skill Progress Bar Converter ---
document.addEventListener('DOMContentLoaded', function() {
    var categories = document.querySelectorAll('.skill-category');
    categories.forEach(function(category) {
        var tags = category.querySelectorAll('.skill-tag');
        if (tags.length === 0) return;

        var gridContainer = document.createElement('div');
        gridContainer.className = 'skills-grid-tags';

        tags.forEach(function(tag) {
            var name = tag.getAttribute('data-skill') || tag.textContent.trim();
            var percent = tag.getAttribute('data-percent') || '80';
            var icon = tag.getAttribute('data-icon') || 'fas fa-code';

            var skillItem = document.createElement('div');
            skillItem.className = 'skill-item';
            skillItem.innerHTML =
                '<div class="skill-header">' +
                    '<span class="skill-name"><i class="' + icon + '"></i> ' + name + '</span>' +
                    '<span class="skill-percentage">' + percent + '%</span>' +
                '</div>' +
                '<div class="progress-bar">' +
                    '<div class="progress-fill" style="width: 0%;" data-width="' + percent + '%"></div>' +
                '</div>';

            gridContainer.appendChild(skillItem);
        });

        var tagContainer = tags[0].parentElement;
        tagContainer.parentElement.insertBefore(gridContainer, tagContainer.nextSibling);

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var fills = gridContainer.querySelectorAll('.progress-fill');
                    fills.forEach(function(fill) {
                        fill.style.width = fill.getAttribute('data-width');
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        observer.observe(gridContainer);
    });
});

// --- GitHub Stats ---
document.addEventListener('DOMContentLoaded', function() {
    var reposEl    = document.getElementById('gh-repos');
    var starsEl    = document.getElementById('gh-stars');
    var followersEl = document.getElementById('gh-followers');
    if (!reposEl) return;

    // Fetch user profile + all repos in parallel
    Promise.all([
        fetch('https://api.github.com/users/AkshaySasi').then(function(r) { return r.json(); }),
        fetch('https://api.github.com/users/AkshaySasi/repos?per_page=100').then(function(r) { return r.json(); })
    ]).then(function(results) {
        var user  = results[0];
        var repos = results[1];

        var totalStars = 0;
        if (Array.isArray(repos)) {
            repos.forEach(function(r) { totalStars += r.stargazers_count || 0; });
        }

        if (reposEl)     reposEl.textContent     = user.public_repos  || '—';
        if (starsEl)     starsEl.textContent      = totalStars         || '—';
        if (followersEl) followersEl.textContent  = user.followers     || '—';
    }).catch(function() {
        // Leave dashes on error — looks intentional, not broken
    });
});

// --- 4D Tesseract Animation (HyperShadow Paper) ---
document.addEventListener('DOMContentLoaded', function() {
    var canvas = document.getElementById('tesseract-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var W = canvas.width, H = canvas.height;
    var cx = W / 2, cy = H / 2;
    var a1 = 0, a2 = 0;

    // 16 vertices of a 4D hypercube (all ±1 combinations)
    var verts = [];
    for (var i = 0; i < 16; i++) {
        verts.push([(i&1)?1:-1, (i&2)?1:-1, (i&4)?1:-1, (i&8)?1:-1]);
    }
    // 32 edges: pairs differing in exactly 1 coordinate
    var edges = [];
    for (var i = 0; i < 16; i++) {
        for (var j = i + 1; j < 16; j++) {
            var d = i ^ j;
            if (d && !(d & (d - 1))) edges.push([i, j]);
        }
    }

    function rotate4D(v) {
        var x = v[0], y = v[1], z = v[2], w = v[3];
        // XW plane rotation
        var nx = x * Math.cos(a1) - w * Math.sin(a1);
        var nw = x * Math.sin(a1) + w * Math.cos(a1);
        // YZ plane rotation
        var ny = y * Math.cos(a2) - z * Math.sin(a2);
        var nz = y * Math.sin(a2) + z * Math.cos(a2);
        return [nx, ny, nz, nw];
    }

    function project4Dto2D(v) {
        // 4D → 3D (perspective on w)
        var d1 = 2.8 / (2.8 - v[3]);
        var x3 = v[0] * d1, y3 = v[1] * d1, z3 = v[2] * d1;
        // 3D → 2D (perspective on z)
        var d2 = 2.8 / (2.8 - z3);
        return [cx + x3 * d2 * 50, cy + y3 * d2 * 50, v[3]];
    }

    function drawTesseract() {
        ctx.clearRect(0, 0, W, H);
        var pts = verts.map(function(v) { return project4Dto2D(rotate4D(v)); });

        edges.forEach(function(e) {
            var p = pts[e[0]], q = pts[e[1]];
            var depth = ((p[2] + q[2]) / 2 + 1) / 2; // 0–1
            ctx.beginPath();
            ctx.moveTo(p[0], p[1]);
            ctx.lineTo(q[0], q[1]);
            ctx.strokeStyle = 'rgba(0,170,255,' + (0.15 + depth * 0.75) + ')';
            ctx.lineWidth = depth > 0.65 ? 1.5 : 0.7;
            ctx.stroke();
        });

        pts.forEach(function(p, i) {
            var depth = (verts[i][3] + 1) / 2;
            ctx.beginPath();
            ctx.arc(p[0], p[1], 1.8, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0,170,255,' + (0.35 + depth * 0.55) + ')';
            ctx.fill();
        });

        a1 += 0.007;
        a2 += 0.011;
        requestAnimationFrame(drawTesseract);
    }

    drawTesseract();
});

// --- ECG Waveform Animation (Heart-Brain Paper) ---
document.addEventListener('DOMContentLoaded', function() {
    var canvas = document.getElementById('ecg-canvas');
    if (!canvas) return;

    // Set canvas pixel buffer to match rendered size
    var rect = canvas.getBoundingClientRect();
    if (rect.width > 0) canvas.width = rect.width;

    var ctx = canvas.getContext('2d');
    var W = canvas.width, H = canvas.height;
    var offset = 0;

    function ecgY(t) {
        var x = ((t % 1) + 1) % 1;
        if (x < 0.08) return 0;
        if (x < 0.18) return 0.13 * Math.sin((x - 0.08) / 0.1 * Math.PI);
        if (x < 0.29) return 0;
        if (x < 0.31) return -0.07 * ((x - 0.29) / 0.02);
        if (x < 0.33) return -0.07 + (x - 0.31) / 0.02 * 1.07;
        if (x < 0.36) return 1.0 - (x - 0.33) / 0.03 * 1.12;
        if (x < 0.38) return -0.12 + (x - 0.36) / 0.02 * 0.12;
        if (x < 0.5) return 0;
        if (x < 0.68) return 0.2 * Math.sin((x - 0.5) / 0.18 * Math.PI);
        return 0;
    }

    function drawECG() {
        ctx.clearRect(0, 0, W, H);

        // Subtle grid
        ctx.strokeStyle = 'rgba(0,93,216,0.08)';
        ctx.lineWidth = 0.5;
        for (var gx = 0; gx < W; gx += 20) {
            ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke();
        }
        for (var gy = 0; gy < H; gy += 15) {
            ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke();
        }

        var cycleLen = 100;
        var amp = H * 0.33;
        var mid = H * 0.62;

        // Glowing waveform
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0,170,255,0.85)';
        ctx.lineWidth = 1.5;
        ctx.shadowColor = 'rgba(0,170,255,0.4)';
        ctx.shadowBlur = 6;

        for (var px = 0; px < W; px++) {
            var y = mid - ecgY((px + offset) / cycleLen) * amp;
            if (px === 0) ctx.moveTo(px, y);
            else ctx.lineTo(px, y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Glowing dot at right edge (latest sample)
        var rT = (W - 1 + offset) / cycleLen;
        var rY = mid - ecgY(rT) * amp;
        ctx.beginPath();
        ctx.arc(W - 1, rY, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#00aaff';
        ctx.shadowColor = 'rgba(0,170,255,0.9)';
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;

        offset += 1.2;
        requestAnimationFrame(drawECG);
    }

    drawECG();
});

// --- Scroll Reveal (IntersectionObserver) ---
document.addEventListener('DOMContentLoaded', function() {
    var reveals = document.querySelectorAll('.reveal');
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var delay = entry.target.dataset.delay || 0;
                setTimeout(function() {
                    entry.target.classList.add('visible');
                }, parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(function(el) { observer.observe(el); });
});

// --- Abstract Toggle ---
function toggleAbstract(btn) {
    var card = btn.closest('.publication-card');
    var abstract = card.querySelector('.pub-abstract');
    var isOpen = abstract.classList.contains('open');
    abstract.classList.toggle('open', !isOpen);
    btn.classList.toggle('open', !isOpen);
    btn.querySelector('.toggle-text').textContent = isOpen ? 'Read abstract' : 'Collapse abstract';
}

