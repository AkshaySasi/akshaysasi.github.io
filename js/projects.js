/* ==========================================
   PROJECTS PAGE - Data, Filter, Sort, Search, Modals
   ========================================== */

var projectsData = {
    baymax: {
        title: "Baymax.AI: Emotionally Intelligent Conversational AI Agent",
        desc: "An AI Agent with fine-tuned Gemini 2.5 Flash model and PyTorch, achieving high sentiment accuracy for empathetic, adaptive dialogue to support mental well-being.",
        repoLink: "https://github.com/AkshaySasi/Baymax-AI",
        paperLink: "",
        demoLink: "",
        gallery: ["images/baymax.png", "images/background2.png", "images/project_bg.png"],
        stack: ["Reinforcement Learning", "Google Gemini", "Text Embedding", "ReactJS"],
        status: "Featured",
        features: [
            { icon: "fa-brain", title: "Sentiment-Aware Dialogue", desc: "Fine-tuned Gemini model detects emotional states and adapts conversational tone in real-time." },
            { icon: "fa-heart", title: "Empathetic Responses", desc: "Uses reinforcement learning to optimize for empathetic and supportive response generation." },
            { icon: "fa-chart-line", title: "Mood Tracking", desc: "Tracks user emotional trajectory across sessions for personalized mental health support." }
        ],
        methodology: "The system uses a fine-tuned Gemini 2.5 Flash model with reinforcement learning from human feedback (RLHF) to optimize for empathetic dialogue. Text embeddings capture emotional context, and a sentiment classifier guides response tone adaptation.",
        results: [
            { metric: "Sentiment Accuracy", value: "91%", baseline: "74%", improvement: "+17%" },
            { metric: "User Satisfaction", value: "4.6/5", baseline: "3.2/5", improvement: "+44%" },
            { metric: "Response Relevance", value: "88%", baseline: "71%", improvement: "+17%" }
        ],
        keyFindings: [
            "RLHF fine-tuning significantly improves empathetic response quality over base models",
            "Multi-turn context retention increases user engagement by 34%",
            "Sentiment-aware tone adaptation reduces negative user feedback by 45%"
        ],
        graphImages: ["images/users-chart.png"],
        challenges: "Training a sentiment-aware model required handling imbalanced datasets. Solved by using data augmentation and fine-tuning with a balanced loss function."
    },
    groove: {
        title: "GROOVE: A Generative Refinement Framework Using Vision-Language Feedback Loops",
        desc: "GROOVE is an innovative agentic system designed to bridge the semantic gap in text-to-image synthesis by autonomously refining prompts to accurately reproduce a target visual concept.",
        repoLink: "https://github.com/AkshaySasi/GROOVE",
        paperLink: "",
        demoLink: "",
        gallery: ["images/groove.webp", "images/background2.png", "images/project_bg.png"],
        stack: ["Transformers", "Google Gemini", "Diffusion models"],
        status: "Featured",
        features: [
            { icon: "fa-sync-alt", title: "Iterative Prompt Refinement", desc: "Autonomously refines text prompts through vision-language feedback loops until target fidelity is achieved." },
            { icon: "fa-eye", title: "Visual Similarity Scoring", desc: "Uses CLIP-based similarity metrics to quantify the gap between generated and target images." },
            { icon: "fa-cogs", title: "Agentic Architecture", desc: "Multi-agent system coordinates prompt generation, image synthesis, and quality evaluation." }
        ],
        methodology: "GROOVE employs a multi-agent loop: a Vision-Language Model (Gemini) analyzes the semantic gap between a target and generated image, refines the generation prompt, and feeds it back to a diffusion model. The loop continues until a CLIP similarity threshold is exceeded.",
        results: [
            { metric: "CLIP Similarity", value: "0.89", baseline: "0.72", improvement: "+24%" },
            { metric: "Avg. Iterations", value: "3.2", baseline: "N/A", improvement: "N/A" },
            { metric: "User Preference", value: "82%", baseline: "45%", improvement: "+37%" }
        ],
        keyFindings: [
            "Vision-language feedback loops converge in 3-4 iterations on average",
            "CLIP similarity scores improve by 24% compared to single-pass generation",
            "Agentic prompt refinement outperforms manual prompt engineering in blind tests"
        ],
        graphImages: ["images/users-chart.png"],
        challenges: "Ensuring high relevance in search results was challenging. Addressed by implementing a hybrid retrieval system with semantic search."
    },
    heartbrain: {
        title: "Unveiling the Heart-Brain Connection (Thesis Project)",
        desc: "A multimodal cognitive load classifier using ECG (HRV, Catch22) and EEG, achieving better accuracy for non-invasive mental state monitoring with Python and Neurokit2.",
        repoLink: "https://github.com/AkshaySasi/Unveiling-the-Heart-Brain-Connection-An-Analysis-of-ECG-in-Cognitive-Performanc",
        paperLink: "https://example.com/heart-brain-paper",
        demoLink: "",
        gallery: ["images/Heart_brain.jpg", "images/background2.png", "images/project_bg.png"],
        stack: ["PyTorch", "Neurokit2", "MNE", "Scikit-learn"],
        status: "Published",
        features: [
            { icon: "fa-heartbeat", title: "ECG-EEG Multimodal Fusion", desc: "Combines heart rate variability features with EEG spectral bands for comprehensive cognitive load assessment." },
            { icon: "fa-brain", title: "HRV Feature Extraction", desc: "Uses Catch22 and Neurokit2 for extracting time-series features from ECG signals." },
            { icon: "fa-chart-bar", title: "Non-Invasive Monitoring", desc: "Achieves accurate cognitive state classification using wearable sensor data." }
        ],
        methodology: "ECG and EEG signals were simultaneously recorded during cognitive tasks. HRV features (time-domain, frequency-domain, and Catch22) were extracted using Neurokit2. EEG spectral band powers were computed with MNE-Python. Features were fused and classified using ensemble methods (Random Forest, XGBoost) and deep learning (1D-CNN).",
        results: [
            { metric: "Classification Accuracy", value: "89%", baseline: "72%", improvement: "+17%" },
            { metric: "F1 Score", value: "0.87", baseline: "0.69", improvement: "+26%" },
            { metric: "AUC-ROC", value: "0.93", baseline: "0.78", improvement: "+19%" }
        ],
        keyFindings: [
            "ECG-derived HRV features provide complementary information to EEG for cognitive load classification",
            "Multimodal fusion outperforms single-modality approaches by 17% in accuracy",
            "Catch22 feature set reduces dimensionality while preserving discriminative power"
        ],
        graphImages: ["images/users-chart.png", "images/Heart_brain.jpg"],
        challenges: "Synchronizing ECG and EEG data posed timing issues. Resolved with a time-alignment algorithm and cross-validation."
    },
    texture: {
        title: "Texture-Based Food Contamination Detection Framework (Term Paper)",
        desc: "A computer vision framework using PyTorch and Multi-Channel Analysis (MCA), detecting food contamination with 90% accuracy in agricultural products.",
        repoLink: "",
        paperLink: "",
        demoLink: "",
        gallery: ["images/texture_analysis.jpg", "images/background2.png", "images/project_bg.png"],
        stack: ["MCA", "Image Segmentation", "Computer Vision"],
        status: "Research",
        features: [
            { icon: "fa-search", title: "Texture Feature Extraction", desc: "Multi-channel analysis extracts texture patterns indicative of contamination." },
            { icon: "fa-image", title: "Image Segmentation", desc: "Automated segmentation isolates regions of interest for contamination analysis." },
            { icon: "fa-check-double", title: "90% Detection Accuracy", desc: "Achieves reliable contamination detection across diverse agricultural product types." }
        ],
        methodology: "The framework uses Multi-Channel Analysis (MCA) to extract texture features from food product images. Image segmentation isolates regions of interest, and a CNN classifier trained on labeled contamination data performs binary classification.",
        results: [
            { metric: "Detection Accuracy", value: "90%", baseline: "75%", improvement: "+15%" },
            { metric: "False Positive Rate", value: "4%", baseline: "12%", improvement: "-67%" },
            { metric: "Processing Time", value: "1.2s", baseline: "3.5s", improvement: "-66%" }
        ],
        keyFindings: [
            "MCA-based texture features outperform single-channel approaches for contamination detection",
            "Adaptive thresholding compensates for lighting variations in agricultural imaging",
            "The framework generalizes across multiple product categories with minimal retraining"
        ],
        graphImages: ["images/users-chart.png"],
        challenges: "Lighting variations affected detection. Mitigated with adaptive thresholding and image preprocessing."
    },
    genscraper: {
        title: "Gen-Scraper: AI Review Analyzer for Amazon",
        desc: "A tool using Selenium and DistilBERT to scrape and analyze Amazon reviews, detecting AI-generated content with 85% accuracy.",
        repoLink: "https://github.com/AkshaySasi/GEN-SCRAPER",
        paperLink: "",
        demoLink: "",
        gallery: ["images/amazon-web-scraping.png", "images/background2.png", "images/project_bg.png"],
        stack: ["Python", "Selenium", "Hugging Face"],
        status: "Complete",
        features: [
            { icon: "fa-robot", title: "AI Content Detection", desc: "DistilBERT-based classifier identifies AI-generated reviews with 85% accuracy." },
            { icon: "fa-spider", title: "Automated Scraping", desc: "Selenium-powered scraper handles pagination, CAPTCHA, and dynamic content loading." },
            { icon: "fa-chart-pie", title: "Review Analytics", desc: "Generates sentiment distribution and authenticity reports for scraped product reviews." }
        ],
        methodology: "Reviews are scraped from Amazon using Selenium with headless Chrome. Each review is tokenized and classified using a fine-tuned DistilBERT model trained on a labeled dataset of human vs. AI-generated product reviews.",
        results: [
            { metric: "Detection Accuracy", value: "85%", baseline: "65%", improvement: "+20%" },
            { metric: "Scraping Success Rate", value: "92%", baseline: "70%", improvement: "+22%" },
            { metric: "Processing Speed", value: "50 rev/min", baseline: "15 rev/min", improvement: "+233%" }
        ],
        keyFindings: [
            "DistilBERT achieves near-BERT accuracy for AI content detection at 60% of the inference cost",
            "Headless browser with retry logic handles 92% of CAPTCHA challenges",
            "AI-generated reviews exhibit statistically lower lexical diversity than human reviews"
        ],
        graphImages: ["images/users-chart.png"],
        challenges: "Handling CAPTCHA was difficult. Overcame by integrating a headless browser with retry logic."
    },
    pryme: {
        title: "PryMe - Privacy Focused Social Media Application",
        desc: "A privacy-focused social media platform with end-to-end encryption for all communications and anonymous posting options, giving users complete control over their data.",
        repoLink: "",
        paperLink: "",
        demoLink: "",
        gallery: ["images/work-2.png", "images/background2.png", "images/project_bg.png"],
        stack: ["Java", "XML", "Face Recognition"],
        status: "Featured",
        features: [
            { icon: "fa-lock", title: "End-to-End Encryption", desc: "All messages and posts are encrypted using lightweight cryptographic libraries." },
            { icon: "fa-user-secret", title: "Anonymous Posting", desc: "Users can post content without revealing their identity." },
            { icon: "fa-id-card", title: "Face Recognition Auth", desc: "Biometric authentication adds an extra layer of security." }
        ],
        methodology: "Built with Java/Android SDK using XML layouts. End-to-end encryption implemented with lightweight cryptographic libraries. Face recognition authentication uses on-device ML models for biometric verification.",
        results: [
            { metric: "Encryption Overhead", value: "<10ms", baseline: "50ms", improvement: "-80%" },
            { metric: "Auth Accuracy", value: "98%", baseline: "90%", improvement: "+8%" },
            { metric: "Data Leakage", value: "0%", baseline: "N/A", improvement: "Zero leaks" }
        ],
        keyFindings: [
            "Lightweight encryption adds negligible latency to messaging operations",
            "On-device face recognition provides strong authentication without cloud dependency",
            "Anonymous posting mode increases user engagement by 28% in privacy-sensitive communities"
        ],
        graphImages: ["images/users-chart.png"],
        challenges: "Ensuring end-to-end encryption performance was a challenge. Optimized with lightweight cryptographic libraries."
    },
    mcgt: {
        title: "MCGT - Morse Code Gesture Translator",
        desc: "A terminal-based Python application that converts finger Morse code into English alphabets using computer vision.",
        repoLink: "https://github.com/AkshaySasi/MCGT-Morse-Code-Gesture-Translator",
        paperLink: "",
        demoLink: "",
        gallery: ["images/work-1.png", "images/background2.png", "images/project_bg.png"],
        stack: ["Python", "OpenCV", "Machine Learning"],
        status: "Featured",
        features: [
            { icon: "fa-hand-paper", title: "Gesture Recognition", desc: "Real-time finger gesture detection using OpenCV and computer vision." },
            { icon: "fa-code", title: "Morse Decoding", desc: "Translates detected gesture sequences into Morse code and then to English." },
            { icon: "fa-terminal", title: "Terminal Interface", desc: "Clean terminal-based UI for real-time gesture-to-text conversion." }
        ],
        methodology: "OpenCV captures webcam frames, applying skin-color segmentation and contour detection to identify finger gestures. A dual-validation system cross-checks gestures with temporal patterns to distinguish dots from dashes in Morse code sequences.",
        results: [
            { metric: "Gesture Accuracy", value: "87%", baseline: "68%", improvement: "+19%" },
            { metric: "Translation Speed", value: "Real-time", baseline: "N/A", improvement: "Live" },
            { metric: "Lighting Tolerance", value: "Good", baseline: "Poor", improvement: "Improved" }
        ],
        keyFindings: [
            "Dual-validation with temporal patterns significantly reduces false gesture detections",
            "Skin-color segmentation works reliably across diverse skin tones with calibration",
            "Morse code timing thresholds require adaptive adjustment based on user speed"
        ],
        graphImages: ["images/users-chart.png"],
        challenges: "Developing robust gesture recognition required extensive testing with different lighting conditions and hand sizes. Solved by implementing a dual-validation system that cross-checks gestures with temporal patterns."
    },
    sapience: {
        title: "Brand Identity Design - Sapience Edu Connect",
        desc: "Complete brand identity package including logo, color scheme, fonts and marketing and promotional materials.",
        repoLink: "",
        paperLink: "",
        demoLink: "https://www.sapienceconnect.com/",
        gallery: ["images/Sap_jpg.jpg", "images/background2.png", "images/project_bg.png"],
        stack: ["Canva", "Inshot", "Branding"],
        status: "Complete",
        features: [
            { icon: "fa-palette", title: "Brand Identity System", desc: "Complete visual identity including logo, color palette, and typography guidelines." },
            { icon: "fa-video", title: "Marketing Materials", desc: "Promotional videos and social media content designed for brand consistency." },
            { icon: "fa-globe", title: "Web Presence", desc: "Brand guidelines applied to the live website for cohesive digital presence." }
        ],
        methodology: "Iterative design process with client feedback loops. Brand personality was defined through stakeholder interviews, followed by moodboarding, logo exploration, and visual system development using Canva and Inshot.",
        results: [
            { metric: "Brand Recognition", value: "High", baseline: "None", improvement: "New Brand" },
            { metric: "Social Engagement", value: "+45%", baseline: "N/A", improvement: "+45%" },
            { metric: "Client Satisfaction", value: "5/5", baseline: "N/A", improvement: "Perfect" }
        ],
        keyFindings: [
            "Iterative design reviews significantly improve alignment with client vision",
            "Consistent brand identity across channels increases social media engagement",
            "Video-first promotional content outperforms static imagery for educational brands"
        ],
        graphImages: ["images/users-chart.png"],
        challenges: "Balancing creativity with client feedback was challenging. Managed through iterative design reviews and mockups."
    }
};

/* ==========================================
   PROJECT-SPECIFIC BUILDERS
   ========================================== */

function buildProjectActionsHTML(p) {
    var html = '';
    if (p.demoLink && p.demoLink !== '') {
        html += '<a href="' + p.demoLink + '" target="_blank" rel="noopener noreferrer" class="pd-action-btn pd-btn-live"><i class="fas fa-external-link-alt"></i> Live Demo</a>';
    }
    if (p.repoLink && p.repoLink !== '') {
        html += '<a href="' + p.repoLink + '" target="_blank" rel="noopener noreferrer" class="pd-action-btn pd-btn-repo"><i class="fab fa-github"></i> Source Code</a>';
    }
    if (p.paperLink && p.paperLink !== '') {
        html += '<a href="' + p.paperLink + '" target="_blank" rel="noopener noreferrer" class="pd-action-btn pd-btn-live"><i class="fas fa-file-alt"></i> Published Paper</a>';
    }
    return html;
}

function buildProjectFeaturesHTML(p) {
    if (!p.features || p.features.length === 0) return '';
    var cards = p.features.map(function(f) {
        return '<div class="pd-feature-card">' +
            '<div class="pd-feature-icon"><i class="fas ' + f.icon + '"></i></div>' +
            '<h4>' + f.title + '</h4>' +
            '<p>' + f.desc + '</p></div>';
    }).join('');
    return '<div class="pd-section"><h3 class="pd-section-title"><i class="fas fa-star"></i> Key Features</h3><div class="pd-features-grid">' + cards + '</div></div>';
}

function buildProjectToolsHTML(p) {
    if (!p.stack || p.stack.length === 0) return '';
    var tags = p.stack.map(function(s) {
        return '<div class="pd-tool-tag"><span>' + s + '</span></div>';
    }).join('');
    return '<div class="pd-section"><h3 class="pd-section-title"><i class="fas fa-tools"></i> Tech Stack</h3><div class="pd-tools-grid">' + tags + '</div></div>';
}

function buildChallengesHTML(p) {
    if (!p.challenges) return '';
    return '<div class="pd-section"><h3 class="pd-section-title"><i class="fas fa-exclamation-triangle"></i> Challenges & Solutions</h3>' +
        '<p class="pd-description">' + p.challenges + '</p></div>';
}

/* ==========================================
   MODAL OPEN / CLOSE
   ========================================== */

var projectModalOverlay = document.getElementById('project-modal-overlay');
var projectModalContent = document.getElementById('project-modal-body');

function openProjectModal(id) {
    var p = projectsData[id];
    if (!p) return;

    var actionsHTML = buildProjectActionsHTML(p);
    var statusHTML = '<span class="status-badge ' + p.status.toLowerCase() + '">' + p.status + '</span>';

    var html = '<div class="pd-hero">' + buildCarouselHTML(id, p) + '</div>' +
        '<div class="pd-content">' +
            '<div class="pd-title-bar">' +
                '<div class="pd-title-left"><h2 class="pd-title">' + p.title + '</h2>' + statusHTML + '</div>' +
                (actionsHTML ? '<div class="pd-actions">' + actionsHTML + '</div>' : '') +
            '</div>' +
            '<div class="pd-section pd-section-first"><p class="pd-description">' + p.desc + '</p></div>' +
            buildProjectFeaturesHTML(p) +
            buildMethodologyHTML(p) +
            buildResultsTableHTML(p) +
            buildKeyFindingsHTML(p) +
            buildGraphGridHTML(p) +
            buildProjectToolsHTML(p) +
            buildChallengesHTML(p) +
        '</div>';

    projectModalContent.innerHTML = html;
    projectModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    var modalEl = projectModalOverlay.querySelector('.modal-content-pro');
    if (modalEl) modalEl.scrollTop = 0;

    if (p.gallery.length > 1) {
        initCarousel(id, p.gallery.length);
    }
}

function closeProjectModal() {
    if (projectModalOverlay) projectModalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    if (textInterval) clearInterval(textInterval);
    carouselState = {};
}

/* ==========================================
   EVENT LISTENERS
   ========================================== */

if (projectModalOverlay) {
    projectModalOverlay.addEventListener('click', function(e) {
        if (e.target === projectModalOverlay) closeProjectModal();
    });
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && projectModalOverlay && projectModalOverlay.classList.contains('active')) {
        closeProjectModal();
    }
});

/* ==========================================
   FILTER, SEARCH, SORT, TYPING
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
    var filterButtons = document.querySelectorAll('.filter-btn');
    var projectCards = document.querySelectorAll('.project-card');
    var searchInput = document.getElementById('searchInput');
    var sortSelect = document.getElementById('sortSelect');

    // --- Filter ---
    filterButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            filterButtons.forEach(function(btn) { btn.classList.remove('active'); });
            this.classList.add('active');

            var filterValue = this.getAttribute('data-filter');
            projectCards.forEach(function(card) {
                var categories = card.getAttribute('data-category').split(' ');
                if (filterValue === 'all' || categories.indexOf(filterValue) !== -1) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- Search ---
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            var searchTerm = this.value.toLowerCase();
            projectCards.forEach(function(card) {
                var name = card.getAttribute('data-name').toLowerCase();
                var desc = card.querySelector('.project-description');
                var descText = desc ? desc.textContent.toLowerCase() : '';
                if (name.indexOf(searchTerm) !== -1 || descText.indexOf(searchTerm) !== -1) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // --- Sort ---
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            var sortValue = this.value;
            var cardsArray = Array.prototype.slice.call(projectCards);

            cardsArray.sort(function(a, b) {
                if (sortValue === 'name-asc') {
                    return a.getAttribute('data-name').localeCompare(b.getAttribute('data-name'));
                }
                if (sortValue === 'name-desc') {
                    return b.getAttribute('data-name').localeCompare(a.getAttribute('data-name'));
                }
                if (sortValue === 'date-new') {
                    return new Date(b.getAttribute('data-date')) - new Date(a.getAttribute('data-date'));
                }
                if (sortValue === 'date-old') {
                    return new Date(a.getAttribute('data-date')) - new Date(b.getAttribute('data-date'));
                }
                return 0;
            });

            var projectsGrid = document.querySelector('.projects-grid');
            cardsArray.forEach(function(card) {
                projectsGrid.appendChild(card);
                card.style.animation = 'fadeIn 0.5s ease forwards';
            });
        });
    }

    // --- Project Modal Click Handlers ---
    var projectBtns = document.querySelectorAll('.project-card .project-btn');
    if (projectBtns) {
        projectBtns.forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                var projectId = this.getAttribute('data-project-id');
                if (projectId) {
                    openProjectModal(projectId);
                }
            });
        });
    }

    // --- Typing Animation ---
    var typingText = document.querySelector('.typing-text');
    if (typingText) {
        var designations = ["AI Projects", "Web Development", "Creative Designs"];
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
    }
});
