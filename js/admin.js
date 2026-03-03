/* ==========================================
   ADMIN PANEL - Auth, Dashboard, Blog CRUD, Messages
   ========================================== */

(function() {
    'use strict';

    var loginScreen = document.getElementById('admin-login');
    var dashboard = document.getElementById('admin-dashboard');
    var loginForm = document.getElementById('loginForm');
    var loginError = document.getElementById('loginError');
    var logoutBtn = document.getElementById('logoutBtn');

    // --- Auth ---
    async function handleLogin(email, password) {
        if (!supabaseClient) {
            showLoginError('Supabase not configured.');
            return;
        }
        try {
            var result = await supabaseClient.auth.signInWithPassword({ email: email, password: password });
            if (result.error) throw result.error;
            showDashboard();
        } catch (err) {
            showLoginError(err.message || 'Login failed.');
        }
    }

    async function handleLogout() {
        if (supabaseClient) {
            await supabaseClient.auth.signOut();
        }
        showLogin();
    }

    async function checkSession() {
        if (!supabaseClient) return;
        try {
            var result = await supabaseClient.auth.getSession();
            if (result.data && result.data.session) {
                showDashboard();
            }
        } catch (err) {
            // not logged in
        }
    }

    function showLogin() {
        if (loginScreen) loginScreen.style.display = 'flex';
        if (dashboard) dashboard.classList.remove('active');
    }

    function showDashboard() {
        if (loginScreen) loginScreen.style.display = 'none';
        if (dashboard) dashboard.classList.add('active');
        loadDashboardData();
        loadBlogPosts();
        loadMessages();
    }

    function showLoginError(msg) {
        if (loginError) {
            loginError.textContent = msg;
            loginError.style.display = 'block';
        }
    }

    // --- Nav Tabs ---
    var navBtns = document.querySelectorAll('.admin-nav-btn');
    var panels = document.querySelectorAll('.admin-panel');

    navBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            navBtns.forEach(function(b) { b.classList.remove('active'); });
            panels.forEach(function(p) { p.classList.remove('active'); });
            this.classList.add('active');
            var target = document.getElementById(this.getAttribute('data-panel'));
            if (target) target.classList.add('active');
        });
    });

    // --- Dashboard Data ---
    var dailyChart = null;
    var topPagesChart = null;

    async function loadDashboardData() {
        if (!supabaseClient) return;

        // Total page views
        var viewsResult = await supabaseClient.from('page_views').select('id', { count: 'exact', head: true });
        var totalViews = (viewsResult.count || 0);
        updateStat('stat-views', totalViews.toLocaleString());

        // Unique sessions (visitors)
        var sessionsResult = await supabaseClient.from('page_views').select('session_id');
        var uniqueSessions = new Set();
        if (sessionsResult.data) {
            sessionsResult.data.forEach(function(r) { uniqueSessions.add(r.session_id); });
        }
        updateStat('stat-visitors', uniqueSessions.size.toLocaleString());

        // Total blog posts
        var postsResult = await supabaseClient.from('blog_posts').select('id', { count: 'exact', head: true });
        updateStat('stat-posts', (postsResult.count || 0).toString());

        // Unread messages
        var msgResult = await supabaseClient.from('contact_submissions').select('id', { count: 'exact', head: true }).eq('is_read', false);
        updateStat('stat-messages', (msgResult.count || 0).toString());

        // Charts
        await loadDailyVisitorsChart();
        await loadTopPagesChart();
        await loadClicksTable();
    }

    function updateStat(id, value) {
        var el = document.getElementById(id);
        if (el) el.textContent = value;
    }

    async function loadDailyVisitorsChart() {
        if (!supabaseClient || typeof Chart === 'undefined') return;

        // Get last 14 days of page views
        var since = new Date();
        since.setDate(since.getDate() - 14);

        var result = await supabaseClient
            .from('page_views')
            .select('created_at, session_id')
            .gte('created_at', since.toISOString())
            .order('created_at', { ascending: true });

        var dayMap = {};
        var labels = [];
        for (var i = 13; i >= 0; i--) {
            var d = new Date();
            d.setDate(d.getDate() - i);
            var key = d.toISOString().split('T')[0];
            dayMap[key] = new Set();
            labels.push(d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        }

        if (result.data) {
            result.data.forEach(function(row) {
                var day = row.created_at.split('T')[0];
                if (dayMap[day]) dayMap[day].add(row.session_id);
            });
        }

        var values = Object.keys(dayMap).map(function(k) { return dayMap[k].size; });

        var ctx = document.getElementById('dailyVisitorsChart');
        if (!ctx) return;

        if (dailyChart) dailyChart.destroy();
        dailyChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Unique Visitors',
                    data: values,
                    borderColor: '#005dd8',
                    backgroundColor: 'rgba(0,93,216,0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointBackgroundColor: '#005dd8'
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, ticks: { color: '#888' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                    x: { ticks: { color: '#888' }, grid: { display: false } }
                }
            }
        });
    }

    async function loadTopPagesChart() {
        if (!supabaseClient || typeof Chart === 'undefined') return;

        var result = await supabaseClient.from('page_views').select('page_path');
        var pageCount = {};
        if (result.data) {
            result.data.forEach(function(row) {
                var p = row.page_path || '/';
                pageCount[p] = (pageCount[p] || 0) + 1;
            });
        }

        var sorted = Object.entries(pageCount).sort(function(a, b) { return b[1] - a[1]; }).slice(0, 6);
        var labels = sorted.map(function(e) { return e[0]; });
        var values = sorted.map(function(e) { return e[1]; });

        var ctx = document.getElementById('topPagesChart');
        if (!ctx) return;

        if (topPagesChart) topPagesChart.destroy();
        topPagesChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Page Views',
                    data: values,
                    backgroundColor: 'rgba(0,170,255,0.3)',
                    borderColor: '#00aaff',
                    borderWidth: 1,
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                indexAxis: 'y',
                plugins: { legend: { display: false } },
                scales: {
                    x: { beginAtZero: true, ticks: { color: '#888' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                    y: { ticks: { color: '#888' }, grid: { display: false } }
                }
            }
        });
    }

    async function loadClicksTable() {
        if (!supabaseClient) return;

        var result = await supabaseClient.from('click_events').select('element_text, element_type, page_path');
        var clickCount = {};
        if (result.data) {
            result.data.forEach(function(row) {
                var key = (row.element_text || 'Unknown').substring(0, 50);
                if (!clickCount[key]) clickCount[key] = { count: 0, type: row.element_type, page: row.page_path };
                clickCount[key].count++;
            });
        }

        var sorted = Object.entries(clickCount).sort(function(a, b) { return b[1].count - a[1].count; }).slice(0, 10);
        var tbody = document.getElementById('clicksTableBody');
        if (!tbody) return;

        tbody.innerHTML = sorted.map(function(entry) {
            return '<tr><td>' + escapeHtml(entry[0]) + '</td><td>' + escapeHtml(entry[1].type) + '</td><td>' + escapeHtml(entry[1].page) + '</td><td>' + entry[1].count + '</td></tr>';
        }).join('');
    }

    // --- Blog CRUD ---
    var blogPostsList = document.getElementById('blogPostsList');
    var blogEditorSection = document.getElementById('blogEditorSection');
    var blogListSection = document.getElementById('blogListSection');
    var editingPostId = null;

    async function loadBlogPosts() {
        if (!supabaseClient || !blogPostsList) return;

        var result = await supabaseClient
            .from('blog_posts')
            .select('*')
            .order('created_at', { ascending: false });

        if (result.error || !result.data) {
            blogPostsList.innerHTML = '<p style="color:var(--text-muted);padding:20px;">No posts yet.</p>';
            return;
        }

        blogPostsList.innerHTML = result.data.map(function(post) {
            var date = post.published_at ? new Date(post.published_at).toLocaleDateString() : 'Draft';
            var statusClass = post.is_published ? 'published' : 'draft';
            var statusText = post.is_published ? 'Published' : 'Draft';

            return '<div class="blog-post-row" data-id="' + post.id + '">' +
                '<div class="post-info">' +
                    '<h4>' + escapeHtml(post.title) + ' <span class="status-badge ' + statusClass + '">' + statusText + '</span></h4>' +
                    '<p>' + date + ' &middot; ' + (post.reading_time || '5') + ' min read</p>' +
                '</div>' +
                '<div class="post-actions">' +
                    '<button class="btn-sm" onclick="editPost(\'' + post.id + '\')"><i class="fas fa-edit"></i> Edit</button>' +
                    '<button class="btn-sm" onclick="togglePublish(\'' + post.id + '\',' + !post.is_published + ')">' + (post.is_published ? 'Unpublish' : 'Publish') + '</button>' +
                    '<button class="btn-sm danger" onclick="deletePost(\'' + post.id + '\')"><i class="fas fa-trash"></i></button>' +
                '</div>' +
            '</div>';
        }).join('');
    }

    window.showBlogEditor = function(post) {
        if (blogEditorSection) blogEditorSection.style.display = 'block';
        if (blogListSection) blogListSection.style.display = 'none';

        document.getElementById('postTitle').value = post ? post.title : '';
        document.getElementById('postSlug').value = post ? post.slug : '';
        document.getElementById('postExcerpt').value = post ? (post.excerpt || '') : '';
        document.getElementById('postCategory').value = post ? (post.category || '') : '';
        document.getElementById('postTags').value = post ? (post.tags || []).join(', ') : '';
        document.getElementById('postCoverImage').value = post ? (post.cover_image || '') : '';
        document.getElementById('postReadingTime').value = post ? (post.reading_time || '5') : '5';
        document.getElementById('postContent').value = post ? (post.content || '') : '';

        editingPostId = post ? post.id : null;
    };

    window.hideBlogEditor = function() {
        if (blogEditorSection) blogEditorSection.style.display = 'none';
        if (blogListSection) blogListSection.style.display = 'block';
        editingPostId = null;
    };

    window.editPost = async function(id) {
        if (!supabaseClient) return;
        var result = await supabaseClient.from('blog_posts').select('*').eq('id', id).single();
        if (result.data) showBlogEditor(result.data);
    };

    window.saveBlogPost = async function(publish) {
        if (!supabaseClient) return;

        var title = document.getElementById('postTitle').value.trim();
        var slug = document.getElementById('postSlug').value.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        var content = document.getElementById('postContent').value;
        var excerpt = document.getElementById('postExcerpt').value.trim();
        var category = document.getElementById('postCategory').value.trim();
        var tags = document.getElementById('postTags').value.split(',').map(function(t) { return t.trim(); }).filter(Boolean);
        var coverImage = document.getElementById('postCoverImage').value.trim();
        var readingTime = parseInt(document.getElementById('postReadingTime').value) || 5;

        if (!title || !content) {
            alert('Title and content are required.');
            return;
        }

        var postData = {
            title: title,
            slug: slug,
            content: content,
            excerpt: excerpt,
            category: category,
            tags: tags,
            cover_image: coverImage,
            reading_time: readingTime,
            is_published: !!publish,
            updated_at: new Date().toISOString()
        };

        if (publish && !editingPostId) {
            postData.published_at = new Date().toISOString();
        }

        var result;
        if (editingPostId) {
            result = await supabaseClient.from('blog_posts').update(postData).eq('id', editingPostId);
        } else {
            postData.created_at = new Date().toISOString();
            if (publish) postData.published_at = new Date().toISOString();
            result = await supabaseClient.from('blog_posts').insert([postData]);
        }

        if (result.error) {
            alert('Error saving post: ' + result.error.message);
            return;
        }

        hideBlogEditor();
        loadBlogPosts();
    };

    window.togglePublish = async function(id, publishState) {
        if (!supabaseClient) return;
        var updateData = { is_published: publishState, updated_at: new Date().toISOString() };
        if (publishState) updateData.published_at = new Date().toISOString();
        await supabaseClient.from('blog_posts').update(updateData).eq('id', id);
        loadBlogPosts();
    };

    window.deletePost = async function(id) {
        if (!confirm('Are you sure you want to delete this post?')) return;
        if (!supabaseClient) return;
        await supabaseClient.from('blog_posts').delete().eq('id', id);
        loadBlogPosts();
    };

    // Auto-generate slug from title
    var titleInput = document.getElementById('postTitle');
    var slugInput = document.getElementById('postSlug');
    if (titleInput && slugInput) {
        titleInput.addEventListener('input', function() {
            if (!editingPostId) {
                slugInput.value = this.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
            }
        });
    }

    // --- Messages ---
    var messagesList = document.getElementById('messagesList');

    async function loadMessages() {
        if (!supabaseClient || !messagesList) return;

        var result = await supabaseClient
            .from('contact_submissions')
            .select('*')
            .order('created_at', { ascending: false });

        if (result.error || !result.data || result.data.length === 0) {
            messagesList.innerHTML = '<p style="color:var(--text-muted);padding:20px;">No messages yet.</p>';
            return;
        }

        messagesList.innerHTML = result.data.map(function(msg) {
            var date = new Date(msg.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            var time = new Date(msg.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

            return '<div class="message-card ' + (msg.is_read ? '' : 'unread') + '" onclick="markAsRead(\'' + msg.id + '\')">' +
                '<div class="msg-header">' +
                    '<h4>' + escapeHtml(msg.name) + '</h4>' +
                    '<span>' + date + ' at ' + time + '</span>' +
                '</div>' +
                '<div class="msg-email">' + escapeHtml(msg.email) + '</div>' +
                '<div class="msg-body">' + escapeHtml(msg.message) + '</div>' +
            '</div>';
        }).join('');
    }

    window.markAsRead = async function(id) {
        if (!supabaseClient) return;
        await supabaseClient.from('contact_submissions').update({ is_read: true }).eq('id', id);
        loadMessages();
        // Update unread count
        var msgResult = await supabaseClient.from('contact_submissions').select('id', { count: 'exact', head: true }).eq('is_read', false);
        updateStat('stat-messages', (msgResult.count || 0).toString());
    };

    // --- Helpers ---
    function escapeHtml(text) {
        var div = document.createElement('div');
        div.textContent = text || '';
        return div.innerHTML;
    }

    // --- Init ---
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var email = document.getElementById('adminEmail').value.trim();
            var password = document.getElementById('adminPassword').value;
            handleLogin(email, password);
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            handleLogout();
        });
    }

    // Check existing session on load
    checkSession();
})();
