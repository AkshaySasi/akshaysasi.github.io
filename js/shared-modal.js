/* ==========================================
   SHARED MODAL UTILITIES
   Carousel, Results Table, Methodology,
   Key Findings, Graph Grid — used by
   product-studio, research, and projects pages
   ========================================== */

var carouselState = {};
var textInterval;

/* ==========================================
   CAROUSEL
   ========================================== */

function buildCarouselHTML(id, p) {
    var slides = p.gallery.map(function(img) {
        return '<div class="carousel-slide"><img src="' + img + '" alt="' + p.title + ' Screenshot" onerror="this.src=\'images/background2.png\'"></div>';
    }).join('');

    var arrows = p.gallery.length > 1 ?
        '<button class="carousel-arrow carousel-prev" onclick="carouselPrev(\'' + id + '\')"><i class="fas fa-chevron-left"></i></button>' +
        '<button class="carousel-arrow carousel-next" onclick="carouselNext(\'' + id + '\')"><i class="fas fa-chevron-right"></i></button>' : '';

    var dots = p.gallery.length > 1 ? '<div class="carousel-dots" id="dots-' + id + '">' +
        p.gallery.map(function(_, i) {
            return '<div class="dot ' + (i === 0 ? 'active' : '') + '" data-index="' + i + '"></div>';
        }).join('') + '</div>' : '';

    return '<div class="carousel-container"><div class="carousel-track" id="track-' + id + '">' + slides + '</div>' + arrows + dots + '</div>';
}

function initCarousel(id, count) {
    if (count <= 1) return;
    var track = document.getElementById('track-' + id);
    var dotsContainer = document.getElementById('dots-' + id);
    if (!dotsContainer) return;
    var dots = dotsContainer.querySelectorAll('.dot');

    carouselState[id] = { current: 0, total: count };

    function updateSlide() {
        var idx = carouselState[id].current;
        track.style.transform = 'translateX(-' + (idx * 100) + '%)';
        dots.forEach(function(d) { d.classList.remove('active'); });
        if (dots[idx]) dots[idx].classList.add('active');
    }

    carouselState[id].update = updateSlide;

    if (textInterval) clearInterval(textInterval);
    textInterval = setInterval(function() {
        carouselState[id].current = (carouselState[id].current + 1) % count;
        updateSlide();
    }, 4000);

    dots.forEach(function(dot, index) {
        dot.addEventListener('click', function() {
            carouselState[id].current = index;
            updateSlide();
            resetAutoplay(id);
        });
    });
}

function carouselPrev(id) {
    if (!carouselState[id]) return;
    var s = carouselState[id];
    s.current = (s.current - 1 + s.total) % s.total;
    s.update();
    resetAutoplay(id);
}

function carouselNext(id) {
    if (!carouselState[id]) return;
    var s = carouselState[id];
    s.current = (s.current + 1) % s.total;
    s.update();
    resetAutoplay(id);
}

function resetAutoplay(id) {
    if (textInterval) clearInterval(textInterval);
    var s = carouselState[id];
    if (!s) return;
    textInterval = setInterval(function() {
        s.current = (s.current + 1) % s.total;
        s.update();
    }, 4000);
}

/* ==========================================
   SHARED BUILDER FUNCTIONS
   ========================================== */

function buildMethodologyHTML(p) {
    if (!p.methodology) return '';
    return '<div class="pd-section"><h3 class="pd-section-title"><i class="fas fa-microscope"></i> Methodology</h3>' +
        '<p class="pd-description">' + p.methodology + '</p></div>';
}

function buildResultsTableHTML(p) {
    if (!p.results || p.results.length === 0) return '';
    var rows = p.results.map(function(r) {
        return '<tr><td>' + r.metric + '</td><td>' + r.value + '</td><td>' + r.baseline + '</td><td class="rd-improvement">' + r.improvement + '</td></tr>';
    }).join('');
    return '<div class="pd-section"><h3 class="pd-section-title"><i class="fas fa-table"></i> Results</h3>' +
        '<div class="rd-table-wrap"><table class="rd-results-table"><thead><tr><th>Metric</th><th>Result</th><th>Baseline</th><th>Improvement</th></tr></thead><tbody>' + rows + '</tbody></table></div></div>';
}

function buildKeyFindingsHTML(p) {
    if (!p.keyFindings || p.keyFindings.length === 0) return '';
    var items = p.keyFindings.map(function(f) {
        return '<li><i class="fas fa-check-circle"></i> ' + f + '</li>';
    }).join('');
    return '<div class="pd-section"><h3 class="pd-section-title"><i class="fas fa-lightbulb"></i> Key Findings</h3>' +
        '<ul class="rd-findings-list">' + items + '</ul></div>';
}

function buildGraphGridHTML(p) {
    if (!p.graphImages || p.graphImages.length === 0) return '';
    var imgs = p.graphImages.map(function(img) {
        return '<div class="rd-graph-item"><img src="' + img + '" alt="Visualization" onerror="this.style.display=\'none\'"></div>';
    }).join('');
    return '<div class="pd-section"><h3 class="pd-section-title"><i class="fas fa-chart-area"></i> Visualizations</h3>' +
        '<div class="rd-graph-grid">' + imgs + '</div></div>';
}
