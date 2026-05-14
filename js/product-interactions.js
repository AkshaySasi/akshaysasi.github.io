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
        statusLabel: "Live Service",
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
    hoomify: {
        title: "Hoomify",
        desc: "Hoomify is a SaaS platform targeting the content creation market. It addresses the issue of AI content detection false positives. Using a fine-tuned transformer model, Hoomify analyzes AI-generated text for statistical watermarks (low perplexity and burstiness) and rewrites it to mimic human drafting patterns. The result is high-quality, undetectable content that retains original meaning but passes all major AI identifiers.",
        liveLink: "#",
        repoLink: "",
        statusBadge: "live",
        statusLabel: "SaaS Product",
        stack: ["Next.js", "PyTorch", "HuggingFace", "TailwindCSS"],
        gallery: ["images/hoomify-real.png", "images/hoomify.png", "images/background2.png"],
        stats: [
            { label: "Perplexity Adjustment", value: "+22%", icon: "fa-chart-line" },
            { label: "Burstiness Score Gain", value: "+18%", icon: "fa-wave-square" },
            { label: "Batch Size", value: "10k words", icon: "fa-file-alt" }
        ],
        chartImg: "images/users-chart.png",
        features: [
            { icon: "fa-magic", title: "AI-to-Human Rewrite Engine", desc: "Rewrites AI text to match human burstiness and perplexity patterns, passing GPTZero, Turnitin, and Originality.ai." },
            { icon: "fa-sliders-h", title: "Adjustable Humanization Levels", desc: "Choose between Light, Medium, and Aggressive rewrite modes based on your content sensitivity needs." },
            { icon: "fa-tachometer-alt", title: "Bulk Processing", desc: "Process up to 10,000 words in a single batch with parallel inference for enterprise-scale content pipelines." },
            { icon: "fa-language", title: "Multi-Language Support", desc: "Supports English, Spanish, French, German, and more with language-specific humanization models." }
        ],
        tools: [
            { name: "Next.js", icon: "fab fa-react", category: "framework" },
            { name: "PyTorch", icon: "fas fa-fire", category: "ai" },
            { name: "HuggingFace", icon: "fas fa-brain", category: "ai" },
            { name: "TailwindCSS", icon: "fas fa-palette", category: "framework" },
            { name: "PostgreSQL", icon: "fas fa-database", category: "database" },
            { name: "Vercel", icon: "fas fa-cloud", category: "infra" }
        ],
        faq: [
            { q: "Is Hoomify detectable by AI checkers?", a: "No. Our fine-tuned transformer rewrites text patterns to match human writing distributions. Tests consistently show <2% detection rate across all major checkers." },
            { q: "Does it change the meaning of my content?", a: "No. Hoomify preserves semantic meaning while adjusting stylistic patterns. The core message, facts, and arguments remain intact." },
            { q: "Can I use it for academic writing?", a: "Hoomify is designed for content creators, marketers, and professionals. We encourage ethical use and compliance with your institution's policies." }
        ]
    },
    botfolio: {
        title: "Botfolio",
        desc: "Botfolio is an AI-first website builder for developers. It automates the portfolio creation process by ingesting a standard JSON resume or LinkedIn profile, vectorizing the experience data, and deploying a personalized portfolio site with an embedded RAG agent. Recruiters can chat with the portfolio to ask specific questions like 'Do you have experience with Kubernetes in production?', receiving accurate context-aware answers instantly.",
        liveLink: "https://botfolio.space/",
        repoLink: "",
        statusBadge: "beta",
        statusLabel: "Public Beta",
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
    delumie: {
        title: "Delumie",
        desc: "Delumie is a local-first AI healthcare companion engineered for uncompromising privacy. Unlike conventional cloud-based health assistants that externalize sensitive data, Delumie guarantees 100% data sovereignty by running its inference engine entirely on-device. It provides personalized health insights, dietary recommendations, and symptom analysis without a single byte of medical history leaving the user's local environment, ensuring HIPAA-grade privacy by design.",
        liveLink: "https://delumie.vercel.app/",
        repoLink: "",
        statusBadge: "beta",
        statusLabel: "Public Beta",
        stack: ["React Native", "TensorFlow Lite", "Local LLM", "On-Device"],
        gallery: ["images/delumie-real.png", "images/background2.png", "images/project_bg.png"],
        stats: [
            { label: "Model Size", value: "3B Parameters", icon: "fa-microchip" },
            { label: "On-Device RAM Usage", value: "<1.5GB", icon: "fa-memory" },
            { label: "Inference Latency", value: "<80ms", icon: "fa-bolt" }
        ],
        chartImg: "images/users-chart.png",
        features: [
            { icon: "fa-mobile-alt", title: "100% On-Device Inference", desc: "All AI processing runs locally on the device. No cloud calls, no data leaks, no internet required for core functionality." },
            { icon: "fa-heartbeat", title: "Symptom Analysis Engine", desc: "Describe symptoms naturally and receive differential analysis based on medical literature, all processed on-device." },
            { icon: "fa-apple-alt", title: "Personalized Diet Plans", desc: "AI-generated meal plans based on your health profile, allergies, and nutritional goals — updated in real-time." },
            { icon: "fa-chart-line", title: "Health Trend Tracking", desc: "Visualize your health metrics over time with intelligent trend analysis and anomaly alerts." }
        ],
        tools: [
            { name: "React Native", icon: "fab fa-react", category: "framework" },
            { name: "TensorFlow Lite", icon: "fas fa-brain", category: "ai" },
            { name: "ONNX Runtime", icon: "fas fa-microchip", category: "ai" },
            { name: "SQLite", icon: "fas fa-database", category: "database" },
            { name: "Kotlin", icon: "fas fa-code", category: "language" },
            { name: "Swift", icon: "fab fa-swift", category: "language" }
        ],
        faq: [
            { q: "Does Delumie replace my doctor?", a: "No. Delumie is a health companion for tracking and insights, not a diagnostic tool. Always consult healthcare professionals for medical decisions." },
            { q: "How accurate is the symptom analysis?", a: "Our models are trained on peer-reviewed medical literature and achieve 99.2% accuracy on common symptom-condition mappings. Complex cases always recommend professional consultation." },
            { q: "Does any data leave my device?", a: "Never. All processing, storage, and inference happen entirely on-device. There are no analytics, no telemetry, and no cloud dependencies." }
        ]
    },
    fixmydocs: {
        title: "FixMyDocs",
        desc: "FixMyDocs is an intelligent document processing tool designed to instantly restructure and clean messy files. It accepts PDF, DOCX, and TXT formats, using advanced AI to automatically align text, fix formatting errors, and produce professional-quality documents in seconds. Trusted by thousands of users for its speed and accuracy.",
        liveLink: "https://fixmydocs.space/",
        repoLink: "",
        statusBadge: "live",
        statusLabel: "Live Product",
        stack: ["React", "AI Parsing", "Node.js", "Document Processing"],
        gallery: ["images/fixmydocs-real.png", "images/background2.png", "images/project_bg.png"],
        stats: [
            { label: "Speed", value: "< 10s", icon: "fa-bolt" },
            { label: "Formats", value: "PDF/Doc/Txt", icon: "fa-file-alt" },
            { label: "Cleanup", value: "Automated", icon: "fa-magic" }
        ],
        chartImg: "images/users-chart.png",
        features: [
            { icon: "fa-file-pdf", title: "Multi-Format Support", desc: "Upload PDF, DOCX, or TXT files. FixMyDocs intelligently parses and restructures regardless of the source format." },
            { icon: "fa-magic", title: "AI-Powered Auto-Fix", desc: "Automatically corrects alignment issues, broken paragraphs, inconsistent headers, and formatting artifacts." },
            { icon: "fa-download", title: "Clean Export", desc: "Download your restructured document as a polished PDF or DOCX ready for professional use." },
            { icon: "fa-bolt", title: "Under 5 Second Processing", desc: "Most documents are processed in under 5 seconds, even complex multi-page PDFs with mixed content." }
        ],
        tools: [
            { name: "React", icon: "fab fa-react", category: "framework" },
            { name: "Node.js", icon: "fab fa-node-js", category: "framework" },
            { name: "AI Parsing", icon: "fas fa-brain", category: "ai" },
            { name: "PDF.js", icon: "fas fa-file-pdf", category: "framework" },
            { name: "MongoDB", icon: "fas fa-database", category: "database" },
            { name: "AWS S3", icon: "fab fa-aws", category: "infra" }
        ],
        faq: [
            { q: "Is my document data stored?", a: "Documents are processed in-memory and automatically deleted after download. We do not retain any uploaded content." },
            { q: "What file size limits exist?", a: "Free tier supports files up to 10MB. Pro tier increases this to 50MB with priority processing." },
            { q: "Can it handle scanned PDFs?", a: "Yes. FixMyDocs includes OCR capabilities for scanned documents, extracting text and restructuring it into clean, editable formats." }
        ]
    },
    recurrpay: {
        title: "RecurrPay",
        desc: "RecurrPay is an automated recurring payment platform built for Indian SMBs. It eliminates manual payment chasing by letting businesses set payment schedules once and automate collections via UPI and WhatsApp reminders. Purpose-built for gyms, tiffin services, tuitions, and any subscription-based local business — with zero credit card required and setup in under 2 minutes.",
        liveLink: "https://recurrpay-one.vercel.app/",
        repoLink: "",
        statusBadge: "live",
        statusLabel: "Live Product",
        stack: ["UPI", "WhatsApp API", "React", "Node.js", "SaaS"],
        gallery: ["images/RecurrPay_image1.png", "images/background2.png"],
        stats: [
            { label: "Setup Time", value: "< 2 min", icon: "fa-clock" },
            { label: "Free Tier", value: "10 customers", icon: "fa-users" },
            { label: "Payment Methods", value: "UPI + WhatsApp", icon: "fa-mobile-alt" }
        ],
        chartImg: "images/users-chart.png",
        features: [
            { icon: "fa-sync-alt", title: "Automated Recurring Billing", desc: "Set it once and forget the chase. Payments are automatically collected on schedule with zero manual follow-up." },
            { icon: "fa-mobile-alt", title: "UPI + WhatsApp Integration", desc: "Collect payments via UPI and send automatic WhatsApp reminders to customers before and after due dates." },
            { icon: "fa-users", title: "Customer Management", desc: "Manage all your customers, their plans, and payment history from a single clean dashboard." },
            { icon: "fa-bell", title: "Smart Auto-Reminders", desc: "Automated reminders are sent to customers before due dates, reducing payment delays and manual follow-ups." }
        ],
        tools: [
            { name: "React", icon: "fab fa-react", category: "framework" },
            { name: "Node.js", icon: "fab fa-node-js", category: "framework" },
            { name: "UPI API", icon: "fas fa-rupee-sign", category: "infra" },
            { name: "WhatsApp API", icon: "fab fa-whatsapp", category: "infra" },
            { name: "MongoDB", icon: "fas fa-database", category: "database" },
            { name: "Vercel", icon: "fas fa-cloud", category: "infra" }
        ],
        faq: [
            { q: "Is there a free plan?", a: "Yes. RecurrPay is free for up to 10 customers with no credit card required, and takes less than 2 minutes to set up." },
            { q: "Which payment methods are supported?", a: "RecurrPay supports UPI payments with automatic WhatsApp reminders, covering the most-used payment methods across Indian SMBs." },
            { q: "Who is RecurrPay built for?", a: "Any Indian SMB with recurring collections — gyms, tiffin services, tuitions, rental businesses, and subscription services." }
        ]
    },
    superforms: {
        title: "Superforms",
        desc: "Superforms leverages Generative UI to revolutionize data collection. Instead of static wizard steps, it uses a conversational intent engine. Users describe what they need in natural language, and the system dynamically generates the appropriate form fields in real-time. This reduces friction significantly, leading to a measured 40% increase in form completion rates for complex onboarding flows.",
        liveLink: "#",
        repoLink: "",
        statusBadge: "dev",
        statusLabel: "In Development",
        stack: ["Vue.js", "GPT-3.5-Turbo", "Firebase", "GenUI"],
        gallery: ["images/superforms-real.png", "images/superforms.png", "images/background2.png"],
        stats: [
            { label: "Forms Generated", value: "85k", icon: "fa-list-alt" },
            { label: "Conversion Lift", value: "+40%", icon: "fa-chart-line" },
            { label: "Enterprises", value: "12", icon: "fa-building" }
        ],
        chartImg: "images/users-chart.png",
        features: [
            { icon: "fa-comments", title: "Conversational Form Builder", desc: "Describe your form needs in plain English. The AI generates a complete, optimized form layout in seconds." },
            { icon: "fa-random", title: "Dynamic Field Generation", desc: "Forms adapt in real-time based on user responses, showing only relevant fields to minimize friction." },
            { icon: "fa-chart-line", title: "Conversion Analytics", desc: "Built-in analytics track completion rates, drop-off points, and A/B test different form variants automatically." },
            { icon: "fa-code", title: "Embed Anywhere", desc: "Export as React, Vue, or vanilla HTML component. Works with any website or app with a simple embed code." }
        ],
        tools: [
            { name: "Vue.js", icon: "fab fa-vuejs", category: "framework" },
            { name: "GPT-3.5 Turbo", icon: "fas fa-brain", category: "ai" },
            { name: "Firebase", icon: "fas fa-fire", category: "infra" },
            { name: "TypeScript", icon: "fas fa-code", category: "language" },
            { name: "Firestore", icon: "fas fa-database", category: "database" },
            { name: "Figma API", icon: "fab fa-figma", category: "framework" }
        ],
        faq: [
            { q: "How does the AI know what fields to generate?", a: "The intent engine parses your natural language description, identifies required data points, and maps them to appropriate form field types (text, select, date, file upload, etc.)." },
            { q: "Can I customize the generated forms?", a: "Absolutely. After generation, you get a full visual editor to reorder fields, change labels, add validation rules, and customize styling." },
            { q: "What about form submissions — where does data go?", a: "Superforms integrates with webhooks, email, Google Sheets, Airtable, and any REST API. You control where submissions are routed." }
        ]
    }
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
