/* ==========================================
   PRODUCT STUDIO - Product Data & Modal Logic
   ========================================== */

var products = {
    glasslm: {
        title: "Glass LM",
        desc: "Glass LM is an enterprise-grade AI middleware solution designed to solve the data sovereignty challenge. It acts as a secure 'glass box' layer between corporate infrastructure and public LLMs (like GPT-4 or Claude). The system employs a proprietary PII sanitization pipeline using local NLP models to redact sensitive entities before requests leave the premise, allowing enterprises to leverage state-of-the-art AI while maintaining 100% compliance with GDPR, HIPAA, and SOC2 standards.",
        liveLink: "https://glasslm.space/",
        repoLink: "",
        statusBadge: "live",
        statusLabel: "Personal Project",
        stack: ["Python", "FastAPI", "Docker", "Redis", "Local NLP"],
        gallery: ["images/glasslm-real.png", "images/glasslm.png", "images/background2.png"],
        stats: [
            { label: "PII Entities Supported", value: "40+", icon: "fa-shield-alt" },
            { label: "Avg Sanitization Latency", value: "<45ms", icon: "fa-bolt" },
            { label: "LLM Providers Compatible", value: "5+", icon: "fa-plug" }
        ],
        chartImg: "images/users-chart.png",
        features: [
            { icon: "fa-shield-alt", title: "PII Sanitization Pipeline", desc: "Automatically detects and redacts 40+ entity types including names, banking info, and addresses before data leaves the premise." },
            { icon: "fa-lock", title: "Data Sovereignty Guarantee", desc: "All processing happens on-premise. Zero sensitive data transmitted to external LLM providers." },
            { icon: "fa-plug", title: "Drop-in API Integration", desc: "Works as a transparent proxy layer. Swap in with a single endpoint change — no code refactoring required." },
            { icon: "fa-chart-bar", title: "Compliance Dashboard", desc: "Real-time monitoring of data flows, redaction events, and compliance status across GDPR, HIPAA, SOC2." }
        ],
        tools: [
            { name: "Python", icon: "fab fa-python", category: "language" },
            { name: "FastAPI", icon: "fas fa-bolt", category: "framework" },
            { name: "Docker", icon: "fab fa-docker", category: "infra" },
            { name: "Redis", icon: "fas fa-database", category: "database" },
            { name: "spaCy NER", icon: "fas fa-brain", category: "ai" },
            { name: "Presidio", icon: "fas fa-user-shield", category: "ai" }
        ],
        faq: [
            { q: "Does Glass LM support all major LLM providers?", a: "Yes. Glass LM acts as a proxy layer compatible with OpenAI, Anthropic, Google, and any OpenAI-compatible API endpoint." },
            { q: "How does PII detection work?", a: "We use a multi-layered pipeline: regex patterns for structured data (SSN, credit cards), spaCy NER models for named entities, and custom classifiers for domain-specific sensitive data." },
            { q: "What is the latency overhead?", a: "Typical overhead is under 50ms per request. The sanitization pipeline runs in-memory with pre-loaded models." }
        ]
    },
    botfolio: {
        title: "Botfolio",
        desc: "Botfolio is an AI-first website builder for developers. It automates the portfolio creation process by ingesting a standard JSON resume or LinkedIn profile, vectorizing the experience data, and deploying a personalized portfolio site with an embedded RAG agent. Recruiters can chat with the portfolio to ask specific questions like 'Do you have experience with Kubernetes in production?', receiving accurate context-aware answers instantly.",
        liveLink: "https://botfolio.space/",
        repoLink: "",
        statusBadge: "beta",
        statusLabel: "Open Source",
        stack: ["React", "LangChain", "OpenAI", "Pinecone"],
        gallery: ["images/botfolio-real.png", "images/Botfolio.png", "images/background2.png"],
        stats: [
            { label: "Embedding Dimensions", value: "1536", icon: "fa-database" },
            { label: "Avg Query Response", value: "<1.2s", icon: "fa-clock" },
            { label: "Context Window Used", value: "8k tokens", icon: "fa-brain" }
        ],
        chartImg: "images/users-chart.png",
        features: [
            { icon: "fa-robot", title: "Embedded RAG Chatbot", desc: "Every portfolio comes with an AI agent that accurately answers recruiter questions using your actual experience data." },
            { icon: "fa-file-import", title: "JSON Resume / LinkedIn Import", desc: "Import your professional data in seconds. Supports JSON Resume standard and LinkedIn profile exports." },
            { icon: "fa-paint-brush", title: "Auto-Generated Design", desc: "AI selects color schemes, layouts, and typography based on your industry and role for a polished look." },
            { icon: "fa-rocket", title: "One-Click Deploy", desc: "Deploy to a custom subdomain instantly. No server configuration needed — fully managed hosting included." }
        ],
        tools: [
            { name: "React", icon: "fab fa-react", category: "framework" },
            { name: "LangChain", icon: "fas fa-link", category: "ai" },
            { name: "OpenAI", icon: "fas fa-brain", category: "ai" },
            { name: "Pinecone", icon: "fas fa-database", category: "database" },
            { name: "Vercel", icon: "fas fa-cloud", category: "infra" },
            { name: "TypeScript", icon: "fas fa-code", category: "language" }
        ],
        faq: [
            { q: "How does the chatbot know my experience?", a: "Your resume data is vectorized using embeddings and stored in Pinecone. The RAG agent retrieves relevant context for each query and generates accurate, sourced answers." },
            { q: "Can I customize the generated portfolio?", a: "Yes. After generation, you get full access to edit content, change themes, reorder sections, and customize the chatbot's personality." },
            { q: "Is there a free tier?", a: "Yes. The free tier includes 1 portfolio with the chatbot, basic themes, and a botfolio.dev subdomain." }
        ]
    },
};

/* ==========================================
   MODAL DOM REFERENCES
   ========================================== */
var modalOverlay = document.getElementById('product-modal-overlay');
var modalContent = document.getElementById('modal-body-content');
/* ==========================================
   BUILDER FUNCTIONS
   ========================================== */

function buildActionsHTML(p) {
    var html = '';
    if (p.liveLink && p.liveLink !== '#') {
        html += '<a href="' + p.liveLink + '" target="_blank" rel="noopener noreferrer" class="pd-action-btn pd-btn-live"><i class="fas fa-external-link-alt"></i> Live Demo</a>';
    }
    if (p.repoLink && p.repoLink !== '') {
        html += '<a href="' + p.repoLink + '" target="_blank" rel="noopener noreferrer" class="pd-action-btn pd-btn-repo"><i class="fab fa-github"></i> Source Code</a>';
    }
    return html;
}

function buildFeaturesHTML(p) {
    if (!p.features || p.features.length === 0) return '';
    var cards = p.features.map(function(f) {
        return '<div class="pd-feature-card">' +
            '<div class="pd-feature-icon"><i class="fas ' + f.icon + '"></i></div>' +
            '<h4>' + f.title + '</h4>' +
            '<p>' + f.desc + '</p></div>';
    }).join('');
    return '<div class="pd-section"><h3 class="pd-section-title"><i class="fas fa-star"></i> Key Features</h3><div class="pd-features-grid">' + cards + '</div></div>';
}

function buildToolsHTML(p) {
    if (!p.tools || p.tools.length === 0) return '';
    var tags = p.tools.map(function(t) {
        return '<div class="pd-tool-tag" data-category="' + (t.category || 'general') + '">' +
            '<i class="' + t.icon + '"></i><span>' + t.name + '</span></div>';
    }).join('');
    return '<div class="pd-section"><h3 class="pd-section-title"><i class="fas fa-tools"></i> Tools & Techniques</h3><div class="pd-tools-grid">' + tags + '</div></div>';
}

function buildImpactHTML(p) {
    if (!p.stats || p.stats.length === 0) return '';
    var statsCards = p.stats.map(function(stat) {
        return '<div class="pd-stat-card"><i class="fas ' + stat.icon + ' pd-stat-icon"></i>' +
            '<div class="pd-stat-info"><span>' + stat.label + '</span><strong>' + stat.value + '</strong></div></div>';
    }).join('');
    var chartHTML = p.chartImg ? '<div class="pd-chart-card"><h4>Growth Visualization</h4><img src="' + p.chartImg + '" class="chart-img" alt="Growth Chart" onerror="this.style.display=\'none\'"></div>' : '';
    return '<div class="pd-section"><h3 class="pd-section-title"><i class="fas fa-rocket"></i> Impact & Growth</h3>' +
        '<div class="pd-impact-grid">' + chartHTML + '<div class="pd-stats-column">' + statsCards + '</div></div></div>';
}

function buildFaqHTML(p) {
    if (!p.faq || p.faq.length === 0) return '';
    var items = p.faq.map(function(f) {
        return '<div class="pd-faq-item">' +
            '<button class="pd-faq-question" onclick="toggleFaq(this)">' +
            '<span>' + f.q + '</span><i class="fas fa-chevron-down pd-faq-arrow"></i></button>' +
            '<div class="pd-faq-answer"><p>' + f.a + '</p></div></div>';
    }).join('');
    return '<div class="pd-section"><h3 class="pd-section-title"><i class="fas fa-question-circle"></i> Frequently Asked Questions</h3>' +
        '<div class="pd-faq-list">' + items + '</div></div>';
}

/* ==========================================
   MODAL OPEN / CLOSE
   ========================================== */

function openProductModal(id) {
    var p = products[id];
    if (!p) return;

    var actionsHTML = buildActionsHTML(p);
    var statusHTML = p.statusLabel ? '<span class="status-badge ' + (p.statusBadge || '') + '">' + p.statusLabel + '</span>' : '';

    var html = '<div class="pd-hero">' + buildCarouselHTML(id, p) + '</div>' +
        '<div class="pd-content">' +
            '<div class="pd-title-bar">' +
                '<div class="pd-title-left"><h2 class="pd-title">' + p.title + '</h2>' + statusHTML + '</div>' +
                (actionsHTML ? '<div class="pd-actions">' + actionsHTML + '</div>' : '') +
            '</div>' +
            '<div class="pd-section pd-section-first"><p class="pd-description">' + p.desc + '</p></div>' +
            buildFeaturesHTML(p) +
            buildToolsHTML(p) +
            buildImpactHTML(p) +
            buildFaqHTML(p) +
        '</div>';

    modalContent.innerHTML = html;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    var modalEl = document.querySelector('.modal-content-pro');
    if (modalEl) modalEl.scrollTop = 0;

    if (p.gallery.length > 1) {
        initCarousel(id, p.gallery.length);
    }
}

function closeProductModal() {
    if (modalOverlay) modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    if (textInterval) clearInterval(textInterval);
    carouselState = {};
}

/* ==========================================
   FAQ ACCORDION
   ========================================== */

function toggleFaq(button) {
    var item = button.parentElement;
    var isOpen = item.classList.contains('active');
    var allItems = item.parentElement.querySelectorAll('.pd-faq-item');
    allItems.forEach(function(el) { el.classList.remove('active'); });
    if (!isOpen) item.classList.add('active');
}

/* ==========================================
   EVENT LISTENERS
   ========================================== */

if (modalOverlay) {
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) closeProductModal();
    });
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeProductModal();
});

/* ==========================================
   WORKS FILTER
   ========================================== */
(function initWorksFilter() {
    var activeType = 'all';
    var activeTech = null;

    function applyFilters() {
        var cards = document.querySelectorAll('#worksGrid .pro-card');
        cards.forEach(function(card) {
            var type = card.getAttribute('data-type') || '';
            var tech = card.getAttribute('data-tech') || '';
            var typeMatch = (activeType === 'all') || (type === activeType);
            var techMatch = !activeTech || (tech.indexOf(activeTech) !== -1);
            card.classList.toggle('hidden', !(typeMatch && techMatch));
        });
    }

    document.addEventListener('click', function(e) {
        var btn = e.target.closest('.works-filter-btn');
        if (!btn) return;

        if (btn.hasAttribute('data-filter')) {
            activeType = btn.getAttribute('data-filter');
            document.querySelectorAll('.works-filter-btn[data-filter]').forEach(function(b) {
                b.classList.toggle('active', b === btn);
            });
        } else if (btn.hasAttribute('data-tech')) {
            var tech = btn.getAttribute('data-tech');
            if (activeTech === tech) {
                activeTech = null;
                btn.classList.remove('active');
            } else {
                activeTech = tech;
                document.querySelectorAll('.works-filter-btn[data-tech]').forEach(function(b) {
                    b.classList.toggle('active', b === btn);
                });
            }
        }

        applyFilters();
    });
})();
