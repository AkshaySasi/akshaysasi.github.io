/* ==========================================
   RESEARCH PAGE - Lab Data & Modal Logic
   ========================================== */

var researchItems = {
    cognitive: {
        title: "Cognitive Load Analysis",
        desc: "An experimental real-time EEG data processing pipeline designed to optimize User Experience (UX) layouts dynamically. By streaming data from a Muse 2 headband via WebBluetooth, this system calculates cognitive load metrics (Alpha/Beta wave ratios) to determine if a user is confused or overwhelmed. The UI then adapts in real-time\u2014simplifying complex forms or highlighting key actions\u2014to reduce mental strain.",
        liveLink: "#",
        repoLink: "https://github.com/AkshaySasi/cognitive-load-analysis",
        paperLink: "",
        stack: ["Python", "Muse EEG", "WebBluetooth", "React"],
        gallery: ["images/background2.png", "images/project_bg.png", "images/users-chart.png"],
        status: "Research",
        icon: "fas fa-brain",
        stats: [
            { label: "Latency", value: "50ms", icon: "fa-bolt" },
            { label: "Accuracy", value: "85%", icon: "fa-brain" },
            { label: "Subjects", value: "20+", icon: "fa-user-friends" }
        ],
        chartImg: "images/users-chart.png",
        methodology: "This study employs a Muse 2 EEG headband connected via WebBluetooth to stream real-time brainwave data. Alpha/Beta wave ratios are computed using a sliding window FFT pipeline, and the resulting cognitive load index is mapped to UX adaptation rules that dynamically simplify or emphasize interface elements.",
        results: [
            { metric: "Cognitive Load Detection", value: "85%", baseline: "62%", improvement: "+23%" },
            { metric: "UX Task Completion Rate", value: "94%", baseline: "78%", improvement: "+16%" },
            { metric: "Processing Latency", value: "50ms", baseline: "200ms", improvement: "-75%" }
        ],
        keyFindings: [
            "Alpha/Beta ratio above 1.2 reliably indicates cognitive overload in 85% of subjects",
            "Dynamic UI simplification reduced task abandonment by 34%",
            "Real-time EEG processing at 50ms latency is achievable with WebBluetooth on modern browsers"
        ],
        graphImages: ["images/users-chart.png", "images/background2.png"]
    },
    voice_agent: {
        title: "Edge AI Voice Agent",
        desc: "A sub-500ms latency voice assistant designed to run entirely on local edge hardware (Raspberry Pi 5 / Jetson Nano). It utilizes quantized Whisper models for ASR and a distilled Llama 3 for reasoning. The goal is to prove that fluid, human-like voice interaction is possible without cloud dependency, ensuring total privacy and offline capability.",
        liveLink: "#",
        repoLink: "https://github.com/AkshaySasi/edge-voice-agent",
        paperLink: "",
        stack: ["C++", "Whisper.cpp", "Llama.cpp", "Edge Impulse"],
        gallery: ["images/background2.png", "images/project_bg.png", "images/users-chart.png"],
        status: "Prototype",
        icon: "fas fa-microchip",
        stats: [
            { label: "Latency", value: "480ms", icon: "fa-stopwatch" },
            { label: "RAM Usage", value: "4GB", icon: "fa-memory" },
            { label: "Model Size", value: "3.8GB", icon: "fa-save" }
        ],
        chartImg: "images/users-chart.png",
        methodology: "The system runs quantized Whisper (tiny.en) for ASR and a 4-bit GPTQ-quantized Llama 3 (3.8B) for reasoning, both compiled with ONNX Runtime on Raspberry Pi 5. Audio capture, VAD, and TTS are handled in a C++ pipeline with Edge Impulse for wake-word detection.",
        results: [
            { metric: "End-to-End Latency", value: "480ms", baseline: "1200ms", improvement: "-60%" },
            { metric: "Word Error Rate (ASR)", value: "8.2%", baseline: "12.5%", improvement: "-34%" },
            { metric: "Peak RAM Usage", value: "4GB", baseline: "8GB", improvement: "-50%" }
        ],
        keyFindings: [
            "Sub-500ms voice interaction is achievable on consumer-grade edge hardware",
            "4-bit quantization of Llama 3 preserves 94% of reasoning quality on conversational benchmarks",
            "Wake-word detection via Edge Impulse achieves 97% accuracy with <10ms trigger latency"
        ],
        graphImages: ["images/users-chart.png", "images/background2.png"]
    },
    brainrot: {
        title: "Alignment Stability Under Progressive Data Corruption",
        desc: "A systematic study investigating how safety alignment degrades under controlled data corruption during fine-tuning. Instead of treating alignment as binary (safe vs. broken), this work maps the full 0%–100% corruption trajectory across four corruption types (toxic, misinformation, semantic noise, slang compression). The research reveals that alignment degradation is non-linear, internally detectable before behavioral collapse, and structurally irreversible after severe corruption.",
        liveLink: "#",
        repoLink: "https://github.com/AkshaySasi/llm-alignment-corruption",
        paperLink: "",
        stack: ["PyTorch", "HuggingFace", "LoRA", "KL Divergence", "CKA Analysis"],
        gallery: ["images/background2.png", "images/project_bg.png", "images/users-chart.png"],
        status: "Research",
        icon: "fas fa-shield-alt",

        stats: [
            { label: "Models Trained", value: "18 Variants", icon: "fa-layer-group" },
            { label: "Max KL Drift", value: "96× Increase", icon: "fa-chart-line" },
            { label: "Corruption Types", value: "4", icon: "fa-random" }
        ],

        chartImg: "images/users-chart.png",

        methodology: "Using GPT-2 Medium (355M) with LoRA fine-tuning, we progressively replaced 0% to 100% of clean instruction-following data with structured corruption (toxic, misinformation, semantic noise, slang). We evaluated 18 model variants across four dimensions: alignment score (toxicity, refusal rate, adherence), language modeling capability (perplexity, coherence, accuracy), distributional drift via KL divergence between logits, and representation geometry using CKA similarity across layers.",

        results: [
            { 
                metric: "Drift–Alignment Decoupling", 
                value: "3.8× Drift @ 25%", 
                baseline: "Alignment -2.6%", 
                improvement: "Early Damage Hidden" 
            },
            { 
                metric: "Max Toxic KL Drift", 
                value: "8.199", 
                baseline: "0.085 @ 10%", 
                improvement: "96× Increase" 
            },
            { 
                metric: "Recovery CKA Similarity", 
                value: "0.764", 
                baseline: "0.807 (Corrupted)", 
                improvement: "Worse After Recovery" 
            }
        ],

        keyFindings: [
            "Alignment degradation is highly non-linear, with deceptive stability plateaus before sudden collapse",
            "KL divergence detects internal corruption up to 96× earlier than behavioral alignment metrics",
            "Clean-data recovery does not restore original representations — it creates a third, structurally distinct model state",
            "Structured corruption (toxic, misinformation) is far more damaging than unstructured semantic noise",
            "Representation geometry (CKA) provides continuous early warning even when safety scores appear stable"
        ],

        graphImages: ["images/users-chart.png", "images/background2.png"]
    }
};

/* ==========================================
   MODAL DOM REFERENCES
   ========================================== */
var researchModalOverlay = document.getElementById('research-modal-overlay');
var researchModalContent = document.getElementById('research-modal-body');

/* ==========================================
   RESEARCH-SPECIFIC BUILDERS
   ========================================== */

function buildResearchActionsHTML(p) {
    var html = '';
    if (p.repoLink && p.repoLink !== '') {
        html += '<a href="' + p.repoLink + '" target="_blank" rel="noopener noreferrer" class="pd-action-btn pd-btn-repo"><i class="fab fa-github"></i> Repository</a>';
    }
    if (p.paperLink && p.paperLink !== '') {
        html += '<a href="' + p.paperLink + '" target="_blank" rel="noopener noreferrer" class="pd-action-btn pd-btn-live"><i class="fas fa-file-alt"></i> Published Paper</a>';
    }
    return html;
}

function buildResearchToolsHTML(p) {
    if (!p.stack || p.stack.length === 0) return '';
    var tags = p.stack.map(function(s) {
        return '<div class="pd-tool-tag"><span>' + s + '</span></div>';
    }).join('');
    return '<div class="pd-section"><h3 class="pd-section-title"><i class="fas fa-tools"></i> Tech Stack</h3><div class="pd-tools-grid">' + tags + '</div></div>';
}

function buildResearchImpactHTML(p) {
    if (!p.stats || p.stats.length === 0) return '';
    var statsCards = p.stats.map(function(stat) {
        return '<div class="pd-stat-card"><i class="fas ' + stat.icon + ' pd-stat-icon"></i>' +
            '<div class="pd-stat-info"><span>' + stat.label + '</span><strong>' + stat.value + '</strong></div></div>';
    }).join('');
    var chartHTML = p.chartImg ? '<div class="pd-chart-card"><h4>Visualization</h4><img src="' + p.chartImg + '" class="chart-img" alt="Chart" onerror="this.style.display=\'none\'"></div>' : '';
    return '<div class="pd-section"><h3 class="pd-section-title"><i class="fas fa-flask"></i> Research Metrics</h3>' +
        '<div class="pd-impact-grid">' + chartHTML + '<div class="pd-stats-column">' + statsCards + '</div></div></div>';
}

/* ==========================================
   MODAL OPEN / CLOSE
   ========================================== */

function openResearchModal(id) {
    var p = researchItems[id];
    if (!p) return;

    var actionsHTML = buildResearchActionsHTML(p);
    var statusHTML = '<span class="research-tag ' + p.status.toLowerCase() + '">' + p.status + '</span>';

    var html = '<div class="pd-hero">' + buildCarouselHTML(id, p) + '</div>' +
        '<div class="pd-content">' +
            '<div class="pd-title-bar">' +
                '<div class="pd-title-left"><h2 class="pd-title">' + p.title + '</h2>' + statusHTML + '</div>' +
                (actionsHTML ? '<div class="pd-actions">' + actionsHTML + '</div>' : '') +
            '</div>' +
            '<div class="pd-section pd-section-first"><p class="pd-description">' + p.desc + '</p></div>' +
            buildMethodologyHTML(p) +
            buildResultsTableHTML(p) +
            buildKeyFindingsHTML(p) +
            buildGraphGridHTML(p) +
            buildResearchToolsHTML(p) +
            buildResearchImpactHTML(p) +
        '</div>';

    researchModalContent.innerHTML = html;
    researchModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    var modalEl = document.querySelector('.modal-content-pro');
    if (modalEl) modalEl.scrollTop = 0;

    if (p.gallery.length > 1) {
        initCarousel(id, p.gallery.length);
    }
}

function closeResearchModal() {
    if (!researchModalOverlay) return;
    researchModalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    if (textInterval) clearInterval(textInterval);
    carouselState = {};
}

/* ==========================================
   EVENT LISTENERS
   ========================================== */

if (researchModalOverlay) {
    researchModalOverlay.addEventListener('click', function(e) {
        if (e.target === researchModalOverlay) closeResearchModal();
    });
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && researchModalOverlay && researchModalOverlay.classList.contains('active')) {
        closeResearchModal();
    }
});

/* ==========================================
   FILTER
   ========================================== */
document.addEventListener('DOMContentLoaded', function() {
    var filterBtns = document.querySelectorAll('.research-filter-btn');
    var cards = document.querySelectorAll('.research-card');

    filterBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            filterBtns.forEach(function(b) { b.classList.remove('active'); });
            btn.classList.add('active');

            var filter = btn.getAttribute('data-filter');
            cards.forEach(function(card) {
                if (filter === 'all' || card.getAttribute('data-status') === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});
