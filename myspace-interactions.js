/* My Space Professional Interactions - Enhanced with Carousel & Logic */

const products = {
    // ... Existing Products ...
    glasslm: {
        title: "Glass LM",
        desc: "Glass LM is an enterprise-grade AI middleware solution designed to solve the data sovereignty challenge. It acts as a secure 'glass box' layer between corporate infrastructure and public LLMs (like GPT-4 or Claude). <br><br>The system employs a proprietary PII sanitization pipeline using local NLP models to redact sensitive entities (Names, banking info, addresses) before requests leave the premise. It allows enterprises to leverage state-of-the-art AI while maintaining 100% compliance with GDPR, HIPAA, and SOC2 standards.",
        liveLink: "#",
        stack: ["Python", "FastAPI", "Docker", "Redis", "Local NLP"],
        gallery: [
            "images/glasslm-real.png",
            // Duplicate for demo if needed, or add more
        ],
        stats: [
            { label: "Active Users", value: "10,000+", icon: "fa-users" },
            { label: "Data Secured", value: "500 TB", icon: "fa-shield-alt" },
            { label: "Uptime", value: "99.99%", icon: "fa-server" }
        ],
        chartImg: "images/users-chart.png"
    },
    hoomify: {
        title: "Hoomify",
        desc: "Hoomify is a SaaS platform targeting the content creation market. It addresses the issue of AI content detection false positives. <br><br>Using a fine-tuned transformer model, Hoomify analyzes AI-generated text for statistical watermarks (low perplexity and burstiness) and rewrites it to mimic human drafting patterns. The result is high-quality, undetectable content that retains original meaning but passes all major AI identifiers.",
        liveLink: "#",
        stack: ["Next.js", "PyTorch", "HuggingFace", "TailwindCSS"],
        gallery: [
            "images/hoomify-real.png"
        ],
        stats: [
            { label: "Words Processed", value: "50M+", icon: "fa-file-alt" },
            { label: "Accuracy", value: "98.5%", icon: "fa-check-circle" },
            { label: "Users", value: "15k", icon: "fa-user-plus" }
        ],
        chartImg: "images/users-chart.png"
    },
    botfolio: {
        title: "Botfolio",
        desc: "Botfolio is an AI-first website builder for developers. It automates the portfolio creation process by ingesting a standard JSON resume or LinkedIn, vectorizing the experience data, and deploying a personalized portfolio site with an embedded RAG agent. <br><br>Recruiters can chat with the portfolio to ask specific questions like 'Do you have experience with Kubernetes in production?', receiving accurate context-aware answers instantly.",
        liveLink: "#",
        stack: ["React", "LangChain", "OpenAI", "Pinecone"],
        gallery: [
            "images/botfolio-real.png"
        ],
        stats: [
            { label: "Portfolios Built", value: "2,500+", icon: "fa-code" },
            { label: "Bot Queries", value: "120k", icon: "fa-comment-dots" },
            { label: "Avg Session", value: "4.5m", icon: "fa-clock" }
        ],
        chartImg: "images/users-chart.png"
    },
    delumie: {
        title: "Delumie",
        desc: "Delumie is a local-first AI healthcare companion engineered for uncompromising privacy. Unlike conventional cloud-based health assistants that externalize sensitive data, Delumie guarantees 100% data sovereignty by running its inference engine entirely on-device. <br><br>It provides personalized health insights, dietary recommendations, and symptom analysis without a single byte of medical history leaving the user's local environment, ensuring HIPAA-grade privacy by design.",
        liveLink: "#",
        stack: ["React Native", "TensorFlow Lite", "Local LLM", "On-Device"],
        gallery: [
            "images/delumie-real.png",
            "images/delumie-real.png"
        ],
        stats: [
            { label: "Data Privacy", value: "100% Local", icon: "fa-lock" },
            { label: "Latency", value: "<50ms", icon: "fa-bolt" },
            { label: "Accuracy", value: "99.2%", icon: "fa-check-double" }
        ],
        chartImg: "images/users-chart.png"
    },
    fixmydocs: {
        title: "FixMyDocs",
        desc: "FixMyDocs is an intelligent document processing tool designed to instantly restructure and clean messy files. It accepts PDF, DOCX, and TXT formats, using advanced AI to automatically align text, fix formatting errors, and produce professional-quality documents in seconds. Trusted by users for its speed and accuracy.",
        liveLink: "https://fixmydocs.space/",
        stack: ["React", "AI Parsing", "Node.js", "Document Processing"],
        gallery: [
            "images/fixmydocs-real.png",
            "images/fixmydocs-real.png"
        ],
        stats: [
            { label: "Speed", value: "< 5s", icon: "fa-bolt" },
            { label: "Formats", value: "PDF/Doc/Txt", icon: "fa-file-alt" },
            { label: "Cleanup", value: "Automated", icon: "fa-magic" }
        ],
        chartImg: "images/users-chart.png"
    },
    superforms: {
        title: "Superforms",
        desc: "Superforms leverages Generative UI to revolutionize data collection. Instead of static wizard steps, it uses a conversational intent engine. <br><br>Users describe what they need in natural language, and the system dynamically generates the appropriate form fields in real-time. This reduces friction significantly, leading to a measured 40% increase in form completion rates for complex onboarding flows.",
        liveLink: "#",
        stack: ["Vue.js", "GPT-3.5-Turbo", "Firebase", "GenUI"],
        gallery: [
            "images/superforms-real.png"
        ],
        stats: [
            { label: "Forms Generated", value: "85k", icon: "fa-list-alt" },
            { label: "Conversion Lift", value: "+40%", icon: "fa-chart-line" },
            { label: "Enterprises", value: "12", icon: "fa-building" }
        ],
        chartImg: "images/users-chart.png"
    },

    // === LAB ITEMS ===
    cognitive: {
        title: "Cognitive Load Analysis",
        desc: "An experimental real-time EEG data processing pipeline designed to optimize User Experience (UX) layouts dynamically. <br><br>By streaming data from a Muse 2 headband via WebBluetooth, this system calculates cognitive load metrics (Alpha/Beta wave ratios) to determine if a user is confused or overwhelmed. The UI then adapts in real-time—simplifying complex forms or highlighting key actions—to reduce mental strain.",
        liveLink: "#",
        stack: ["Python", "Muse EEG", "WebBluetooth", "React"],
        gallery: ["images/background2.png"], // Placeholder if no real image
        stats: [
            { label: "Latency", value: "50ms", icon: "fa-bolt" },
            { label: "Accuracy", value: "85%", icon: "fa-brain" },
            { label: "Subjects", value: "20+", icon: "fa-user-friends" }
        ],
        chartImg: "images/users-chart.png"
    },
    voice_agent: {
        title: "Edge AI Voice Agent",
        desc: "A sub-500ms latency voice assistant designed to run entirely on local edge hardware (Raspberry Pi 5 / Jetson Nano). <br><br>It utilizes quantized Whisper models for ASR and a distilled Llama 3 for reasoning. The goal is to prove that fluid, human-like voice interaction is possible without cloud dependency, ensuring total privacy and offline capability.",
        liveLink: "#",
        stack: ["C++", "Whisper.cpp", "Llama.cpp", "Edge Impulse"],
        gallery: ["images/background2.png"],
        stats: [
            { label: "Latency", value: "480ms", icon: "fa-stopwatch" },
            { label: "RAM Usage", value: "4GB", icon: "fa-memory" },
            { label: "Model Size", value: "3.8GB", icon: "fa-save" }
        ],
        chartImg: "images/users-chart.png"
    },
    brainrot: {
        title: "LLM Brainrot Experiment",
        desc: "A research project exploring the limits of 'slang-based' prompt engineering and its effects on model coherence. <br><br>By fine-tuning a small language model on a dataset of pure Gen-Z internet slang ('brainrot'), we analyze how token probability distributions shift. The result is a hilarious yet technically fascinating look at how flexible modern LLMs are when forced to communicate in non-standard dialects.",
        liveLink: "#",
        stack: ["PyTorch", "HuggingFace", "Fine-tuning", "Data Analysis"],
        gallery: ["images/background2.png"],
        stats: [
            { label: "Perplexity", value: "12.4", icon: "fa-chart-bar" },
            { label: "Dataset", value: "100MB", icon: "fa-database" },
            { label: "Fun Factor", value: "100%", icon: "fa-smile-beam" }
        ],
        chartImg: "images/users-chart.png"
    }
};

const modalOverlay = document.getElementById('product-modal-overlay');
const modalContent = document.getElementById('modal-body-content');
let textInterval;

function openProductModal(id) {
    const p = products[id];
    if (!p) return;

    // Tech Stack
    const stackHTML = p.stack.map(s => `<span style="background:#333; color:#fff; padding:4px 8px; border-radius:4px; font-size:12px; margin-right:5px; font-family:'JetBrains Mono'">${s}</span>`).join('');

    // Carousel
    // If gallery is empty or just one item that might be a placeholder, you can handle it. 
    // For now, we assume gallery has at least one item.
    const slidesHTML = p.gallery.map(img => `
        <div class="carousel-slide">
            <img src="${img}" alt="${p.title} Screenshot" onerror="this.src='images/background2.png'">
        </div>
    `).join('');

    // Carousel Dots
    const dotsHTML = p.gallery.length > 1 ? p.gallery.map((_, i) => `<div class="dot ${i === 0 ? 'active' : ''}" data-index="${i}"></div>`).join('') : '';

    // Stats
    const statsHTML = p.stats ? p.stats.map(stat => `
        <div class="stat-card">
            <i class="fas ${stat.icon} stat-icon"></i>
            <div class="stat-info">
                <span>${stat.label}</span>
                <strong>${stat.value}</strong>
            </div>
        </div>
    `).join('') : '';

    // Impact Section (Optional if no stats)
    let impactSectionHTML = '';
    if (p.stats && p.stats.length > 0) {
        impactSectionHTML = `
            <div class="impact-section">
                <h3 class="impact-title"><i class="fas fa-rocket" style="color:#00aaff"></i> Impact & Growth</h3>
                <div class="impact-grid">
                    <div class="chart-card">
                        <h4>Impact Visualization</h4>
                        <img src="${p.chartImg || 'images/users-chart.png'}" class="chart-img" alt="Growth Chart" onerror="this.style.display='none'">
                    </div>
                    <div class="stats-column">
                        ${statsHTML}
                    </div>
                </div>
            </div>
        `;
    }

    // Combine HTML
    const html = `
        <div class="carousel-container">
            <div class="carousel-track" id="track-${id}">
                ${slidesHTML}
            </div>
            ${p.gallery.length > 1 ? `<div class="carousel-dots" id="dots-${id}">${dotsHTML}</div>` : ''}
        </div>

        <div class="modal-inner-padding">
            <div class="modal-meta-row">
                <h2>${p.title}</h2>
                ${p.liveLink && p.liveLink !== '#' ? `<a href="${p.liveLink}" target="_blank" class="modal-link-btn">Visit Live <i class="fas fa-external-link-alt"></i></a>` : ''}
            </div>
            
            <div style="margin-bottom: 20px;">
                ${stackHTML}
            </div>
            
            <p class="modal-body-text">${p.desc}</p>

            ${impactSectionHTML}
        </div>
    `;

    modalContent.innerHTML = html;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Init Carousel if multiple images
    if (p.gallery.length > 1) {
        initCarousel(id, p.gallery.length);
    }
}

function initCarousel(id, count) {
    if (count <= 1) return;

    const track = document.getElementById(`track-${id}`);
    const dotsContainer = document.getElementById(`dots-${id}`);
    if (!dotsContainer) return;

    const dots = dotsContainer.querySelectorAll('.dot');

    let currentIndex = 0;

    function updateSlide() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach(d => d.classList.remove('active'));
        if (dots[currentIndex]) dots[currentIndex].classList.add('active');
    }

    // Auto-play
    textInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % count;
        updateSlide();
    }, 3000);

    // Manual interaction
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlide();
            clearInterval(textInterval);
            textInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % count;
                updateSlide();
            }, 3000);
        });
    });
}

function closeProductModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    if (textInterval) clearInterval(textInterval);
}

// Event Listeners
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeProductModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProductModal();
});
