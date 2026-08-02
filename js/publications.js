// ==========================================
//  Publications — shared by index.html and publications.html
//  Card visuals (quantization ladder, tesseract, ECG) and the
//  abstract expand/collapse. Each animation no-ops when its
//  canvas is absent, so both pages can load this file safely.
// ==========================================

// Run a canvas animation only while it is actually on screen. Three rAF
// loops repainting behind a scroll is a real source of mobile jank.
function runWhenVisible(canvas, step) {
    var visible = false;
    var running = false;

    function frame() {
        if (!visible) { running = false; return; }
        step();
        requestAnimationFrame(frame);
    }

    new IntersectionObserver(function(entries) {
        visible = entries[0].isIntersecting;
        if (visible && !running) {
            running = true;
            requestAnimationFrame(frame);
        }
    }, { rootMargin: '100px' }).observe(canvas);
}

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
    }

    runWhenVisible(canvas, drawTesseract);
});

// --- Quantization Ladder Animation (Bits and Memories Paper) ---
// A smooth signal is progressively crushed onto fewer discrete levels
// (16 → 8 → 4 → 2), mirroring the paper's precision sweep.
document.addEventListener('DOMContentLoaded', function() {
    var canvas = document.getElementById('quant-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var W = canvas.width, H = canvas.height;
    var pad = 12;
    var plotW = W - pad * 2, plotH = H - pad * 2;
    var t = 0;

    var STEPS = [16, 8, 4, 2];   // bit levels to cycle through
    var HOLD = 150;              // frames held at each level
    var FADE = 45;               // frames spent morphing between levels

    // The underlying continuous signal (fixed shape, gently drifting)
    function signal(x) {
        return 0.5
            + 0.30 * Math.sin(x * Math.PI * 2 + t * 0.012)
            + 0.14 * Math.sin(x * Math.PI * 5.3 - t * 0.008);
    }

    function quantize(v, levels) {
        var c = Math.max(0, Math.min(1, v));
        return Math.round(c * (levels - 1)) / (levels - 1);
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);

        // Where we are in the 16 → 8 → 4 → 2 cycle
        var cycle = HOLD * STEPS.length;
        var phase = t % cycle;
        var idx = Math.floor(phase / HOLD);
        var into = phase - idx * HOLD;
        var next = (idx + 1) % STEPS.length;
        // Ease the last FADE frames of each hold into the next level
        var mix = into > HOLD - FADE
            ? (into - (HOLD - FADE)) / FADE
            : 0;
        mix = mix * mix * (3 - 2 * mix); // smoothstep

        // Level guide lines for the level count currently dominant
        var shown = mix > 0.5 ? STEPS[next] : STEPS[idx];
        for (var l = 0; l < shown; l++) {
            var gy = pad + plotH - (l / (shown - 1)) * plotH;
            ctx.beginPath();
            ctx.moveTo(pad, gy);
            ctx.lineTo(W - pad, gy);
            ctx.strokeStyle = 'rgba(0,170,255,0.07)';
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        // Ghost of the original full-precision signal
        ctx.beginPath();
        for (var i = 0; i <= plotW; i++) {
            var x = i / plotW;
            var y = pad + plotH - signal(x) * plotH;
            i === 0 ? ctx.moveTo(pad + i, y) : ctx.lineTo(pad + i, y);
        }
        ctx.strokeStyle = 'rgba(0,170,255,0.18)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // The quantized staircase, morphing between two level counts
        ctx.beginPath();
        for (var i = 0; i <= plotW; i++) {
            var x = i / plotW;
            var v = signal(x);
            var q = quantize(v, STEPS[idx]) * (1 - mix)
                  + quantize(v, STEPS[next]) * mix;
            var y = pad + plotH - q * plotH;
            i === 0 ? ctx.moveTo(pad + i, y) : ctx.lineTo(pad + i, y);
        }
        ctx.strokeStyle = 'rgba(0,170,255,0.9)';
        ctx.lineWidth = 1.6;
        ctx.lineJoin = 'miter';
        ctx.stroke();

        t++;
    }

    runWhenVisible(canvas, draw);
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
    }

    runWhenVisible(canvas, drawECG);
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
