# akshaysasi.github.io

Personal portfolio of **Akshay Sasi** — AI Engineer, Researcher, Builder.

→ [akshaysasi.github.io](https://akshaysasi.github.io)

---

## Stack

Static HTML/CSS/JS · GitHub Pages · Supabase · EmailJS

No frameworks. No build step. Just fast.

---

## What's inside

```
/
├── index.html              ← Home
├── projects.html           ← Projects
├── product-studio.html     ← Work / Products
├── blogs.html              ← Blog (Supabase + Medium)
├── css/
│   ├── theme.css           ← Design tokens, typography
│   ├── components.css      ← Nav, cards, shared UI
│   └── pages.css           ← Page-specific styles
├── js/
│   ├── home.js             ← Counters, tesseract, ECG, scroll reveal
│   ├── blogs.js            ← Blog fetch + render
│   ├── projects.js         ← Project grid + filters
│   └── shared.js           ← Nav, command palette
└── images/                 ← All WebP (optimized)
```

---

## Highlights

- **4D tesseract** — rotating wireframe hypercube animation on the HyperShadow publication card (relevant: the paper is literally about 4D projections)
- **Live ECG waveform** — animated heartbeat monitor on the Heart-Brain paper card
- **GitHub activity strip** — live commit feed via public GitHub API
- **Command palette** — Ctrl+K search across the whole site
- **WebP images** — all assets converted, ~19MB saved vs original

---

## Running locally

```bash
# Any static server works
npx serve .
# or
python -m http.server 8000
```

---

## License

Code: MIT · Content & design: © Akshay Sasi
