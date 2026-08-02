/* ==========================================
   BLOGS PAGE - Fetch, Render, Filter, Detail
   ========================================== */

(function() {
    'use strict';

    var blogGrid = document.getElementById('blogGrid');
    var blogDetail = document.getElementById('blog-detail');
    var blogListing = document.getElementById('blog-listing');
    var searchInput = document.getElementById('blogSearch');
    var tagButtons = document.querySelectorAll('.blog-tag-btn');
    var loadMoreBtn = document.getElementById('loadMoreBtn');
    var emptyState = document.getElementById('emptyState');

    // Medium articles — always shown, open in new tab
    var mediumPosts = [
        {
            slug: 'quantization-memorization',
            title: 'Does Shrinking a Language Model Erase the Private Data It Memorized? I Tested It',
            excerpt: 'Quantization forgets memorized training data faster than it loses capability — but not fast enough to count as a privacy defense. At 4 bits, the largest model still reproduces most of what it memorized.',
            cover_image: 'images/medium-memories-image.webp',
            published_at: '2026-07-28',
            reading_time: '9',
            tags: ['AI', 'Research', 'Privacy'],
            category: 'Research',
            external_url: 'https://medium.com/@akshaysasi12.knr/does-shrinking-a-language-model-erase-the-private-data-it-memorized-i-tested-it-20a48d061566'
        },
        {
            slug: 'hypershadow-4d-ai',
            title: 'I Taught an AI to Recognize the Shadows of Four-Dimensional Objects',
            excerpt: 'A 190k-parameter PointNet achieves 96.6% accuracy distinguishing native 3D point clouds from projections of 4D–6D objects. A novel "rigidity witness" statistic reaches AUROC 0.982.',
            cover_image: 'images/hypershadow-medium-article-image.webp',
            published_at: '2026-07-17',
            reading_time: '8',
            tags: ['AI', 'Research', 'Mathematics'],
            category: 'Research',
            external_url: 'https://medium.com/@akshaysasi12.knr/i-taught-an-ai-to-recognize-the-shadows-of-four-dimensional-objects-28fa7076c9bf'
        },
        {
            slug: 'heart-brain-thinking',
            title: 'Your Heart Knows How Hard You\'re Thinking!',
            excerpt: 'How ECG signals reveal cognitive load — the research behind my M.Tech thesis on using heart rate variability to classify mental effort with 92% accuracy.',
            cover_image: 'images/heartbrain-medium_image.webp',
            published_at: '2025-07-05',
            reading_time: '6',
            tags: ['AI', 'Research', 'Neuroscience'],
            category: 'Research',
            external_url: 'https://medium.com/@akshaysasi12.knr/your-heart-knows-how-hard-youre-thinking-2bd30cce1fa9'
        },
        {
            slug: 'clique-subspace-clustering',
            title: 'Clique: A Novel Framework for Subspace Clustering of High Dimensional Data',
            excerpt: 'An exploration of the CLIQUE algorithm for density-based subspace clustering — how it finds clusters in high-dimensional spaces where traditional methods fail.',
            cover_image: 'images/cliq.webp',
            published_at: '2023-12-22',
            reading_time: '7',
            tags: ['AI', 'Engineering', 'Machine Learning'],
            category: 'Engineering',
            external_url: 'https://medium.com/@akshaysasi12.knr/clique-a-novel-framework-for-subspace-clustering-of-high-dimensional-data-fac971c5096b'
        }
    ];

    var allPosts = [];
    var filteredPosts = [];
    var currentTag = 'all';
    var currentSearch = '';
    var postsPerPage = 6;
    var currentPage = 1;

    // Fetch blog posts from Supabase
    async function fetchPosts() {
        if (!supabaseClient) {
            // No Supabase — show Medium posts only
            allPosts = mediumPosts.slice();
            filteredPosts = allPosts.slice();
            hideEmptyState();
            renderPosts();
            return;
        }

        try {
            var result = await supabaseClient
                .from('blog_posts')
                .select('*')
                .eq('is_published', true)
                .order('published_at', { ascending: false });

            if (result.error) throw result.error;

            var supabasePosts = result.data || [];
            // Merge: Supabase posts first (newest), then Medium articles
            allPosts = supabasePosts.concat(mediumPosts);
            filteredPosts = allPosts.slice();
            hideEmptyState();
            renderPosts();
        } catch (err) {
            console.warn('Blog fetch error:', err);
            // Still show Medium posts even if Supabase fails
            allPosts = mediumPosts.slice();
            filteredPosts = allPosts.slice();
            hideEmptyState();
            renderPosts();
        }
    }

    // Render posts to grid
    function renderPosts() {
        if (!blogGrid) return;
        blogGrid.innerHTML = '';

        var visiblePosts = filteredPosts.slice(0, currentPage * postsPerPage);

        visiblePosts.forEach(function(post) {
            var card = document.createElement('div');
            card.className = 'blog-card';
            card.setAttribute('data-slug', post.slug);

            var tagsHTML = '';
            if (post.tags && post.tags.length > 0) {
                tagsHTML = post.tags.map(function(tag) {
                    return '<span class="blog-card-tag">' + escapeHtml(tag) + '</span>';
                }).join('');
            }

            var publishedDate = post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', {
                year: 'numeric', month: 'short', day: 'numeric'
            }) : '';

            var isExternal = !!post.external_url;
            var externalBadge = isExternal ? '<span class="blog-card-external"><i class="fab fa-medium"></i> Medium</span>' : '';

            card.innerHTML =
                '<div class="blog-card-image">' +
                    '<img src="' + (post.cover_image || '/images/blog-placeholder.webp') + '" alt="' + escapeHtml(post.title) + '" onerror="this.src=\'/images/background2.webp\'">' +
                    externalBadge +
                '</div>' +
                '<div class="blog-card-body">' +
                    '<div class="blog-card-tags">' + tagsHTML + '</div>' +
                    '<h3 class="blog-card-title">' + escapeHtml(post.title) + '</h3>' +
                    '<p class="blog-card-excerpt">' + escapeHtml(post.excerpt || '') + '</p>' +
                    '<div class="blog-card-meta">' +
                        '<span><i class="fas fa-calendar-alt"></i> ' + publishedDate + '</span>' +
                        '<span><i class="fas fa-clock"></i> ' + (post.reading_time || '5') + ' min read</span>' +
                    '</div>' +
                '</div>';

            if (isExternal) {
                card.addEventListener('click', function() {
                    window.open(post.external_url, '_blank', 'noopener noreferrer');
                });
                card.style.cursor = 'pointer';
            } else {
                card.addEventListener('click', function() {
                    openBlogDetail(post);
                });
            }

            blogGrid.appendChild(card);
        });

        // Show/hide load more
        if (loadMoreBtn) {
            loadMoreBtn.style.display = visiblePosts.length < filteredPosts.length ? 'inline-flex' : 'none';
        }
    }

    // Open blog detail view
    function openBlogDetail(post) {
        if (!blogDetail || !blogListing) return;

        window.location.hash = post.slug;

        blogListing.style.display = 'none';
        blogDetail.style.display = 'block';

        var publishedDate = post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        }) : '';

        var tagsHTML = '';
        if (post.tags && post.tags.length > 0) {
            tagsHTML = post.tags.map(function(tag) {
                return '<span class="blog-detail-tag">' + escapeHtml(tag) + '</span>';
            }).join('');
        }

        var contentHTML = '';
        if (typeof marked !== 'undefined' && marked.parse) {
            contentHTML = marked.parse(post.content || '');
        } else {
            contentHTML = '<p>' + escapeHtml(post.content || '') + '</p>';
        }

        blogDetail.innerHTML =
            '<button class="blog-back-btn" onclick="closeBlogDetail()"><i class="fas fa-arrow-left"></i> Back to Blogs</button>' +
            '<article class="blog-article">' +
                (post.cover_image ? '<img src="' + post.cover_image + '" alt="' + escapeHtml(post.title) + '" class="blog-detail-cover">' : '') +
                '<div class="blog-article-header">' +
                    '<h1>' + escapeHtml(post.title) + '</h1>' +
                    '<div class="blog-article-meta">' +
                        '<span><i class="fas fa-calendar-alt"></i> ' + publishedDate + '</span>' +
                        '<span><i class="fas fa-clock"></i> ' + (post.reading_time || '5') + ' min read</span>' +
                        '<span><i class="fas fa-tag"></i> ' + (post.category || 'General') + '</span>' +
                    '</div>' +
                    '<div class="blog-detail-tags">' + tagsHTML + '</div>' +
                '</div>' +
                '<div class="blog-article-content">' + contentHTML + '</div>' +
            '</article>';

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Close blog detail - go back to listing
    window.closeBlogDetail = function() {
        if (!blogDetail || !blogListing) return;
        window.location.hash = '';
        blogDetail.style.display = 'none';
        blogListing.style.display = 'block';
    };

    // Filter posts
    function filterPosts() {
        filteredPosts = allPosts.filter(function(post) {
            var matchesTag = currentTag === 'all' || (post.tags && post.tags.indexOf(currentTag) !== -1) || (post.category && post.category.toLowerCase() === currentTag.toLowerCase());
            var matchesSearch = !currentSearch || post.title.toLowerCase().indexOf(currentSearch) !== -1 || (post.excerpt && post.excerpt.toLowerCase().indexOf(currentSearch) !== -1);
            return matchesTag && matchesSearch;
        });

        currentPage = 1;

        if (filteredPosts.length === 0) {
            showEmptyState();
        } else {
            hideEmptyState();
        }

        renderPosts();
    }

    function showEmptyState() {
        if (emptyState) emptyState.style.display = 'flex';
        if (blogGrid) blogGrid.innerHTML = '';
        if (loadMoreBtn) loadMoreBtn.style.display = 'none';
    }

    function hideEmptyState() {
        if (emptyState) emptyState.style.display = 'none';
    }

    function escapeHtml(text) {
        var div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Tag filter click
    tagButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            tagButtons.forEach(function(b) { b.classList.remove('active'); });
            this.classList.add('active');
            currentTag = this.getAttribute('data-tag') || 'all';
            filterPosts();
        });
    });

    // Search input
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            currentSearch = this.value.toLowerCase().trim();
            filterPosts();
        });
    }

    // Load more
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            currentPage++;
            renderPosts();
        });
    }

    // Handle hash-based routing for back button
    window.addEventListener('hashchange', function() {
        if (!window.location.hash || window.location.hash === '#') {
            if (blogDetail && blogDetail.style.display !== 'none') {
                closeBlogDetail();
            }
        }
    });

    // Check hash on load (direct link to post)
    function checkInitialHash() {
        var hash = window.location.hash.replace('#', '');
        if (hash && allPosts.length > 0) {
            var post = allPosts.find(function(p) { return p.slug === hash; });
            if (post) openBlogDetail(post);
        }
    }

    // Init
    document.addEventListener('DOMContentLoaded', function() {
        fetchPosts().then(function() {
            checkInitialHash();
        });
    });
})();
