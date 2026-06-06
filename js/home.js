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
        : '<img src="/images/Botiy.png" alt="Botiee" class="message-avatar-image">';

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

// --- Terminal Card Typing Animation ---
document.addEventListener('DOMContentLoaded', function() {
    var terminalBody = document.getElementById('terminal-body');
    if (!terminalBody) return;

    var lines = terminalBody.children;
    // Hide all lines initially
    for (var i = 0; i < lines.length; i++) {
        lines[i].style.opacity = '0';
        lines[i].style.transform = 'translateY(8px)';
        lines[i].style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    }

    var terminalObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                // Reveal lines one by one
                for (var j = 0; j < lines.length; j++) {
                    (function(index) {
                        setTimeout(function() {
                            lines[index].style.opacity = '1';
                            lines[index].style.transform = 'translateY(0)';
                        }, index * 200);
                    })(j);
                }
                terminalObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    terminalObserver.observe(terminalBody);
});
