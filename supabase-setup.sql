-- =============================================
-- SUPABASE SETUP SCRIPT
-- Run this in Supabase SQL Editor (supabase.com > your project > SQL Editor)
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==================
-- 1. BLOG POSTS
-- ==================
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT,
    excerpt TEXT,
    cover_image TEXT,
    tags TEXT[] DEFAULT '{}',
    category TEXT,
    reading_time INTEGER DEFAULT 5,
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==================
-- 2. PAGE VIEWS
-- ==================
CREATE TABLE IF NOT EXISTS page_views (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    page_path TEXT NOT NULL,
    page_title TEXT,
    referrer TEXT,
    session_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==================
-- 3. CLICK EVENTS
-- ==================
CREATE TABLE IF NOT EXISTS click_events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    page_path TEXT NOT NULL,
    element_id TEXT,
    element_text TEXT,
    element_type TEXT,
    session_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==================
-- 4. CONTACT SUBMISSIONS
-- ==================
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==================
-- ROW LEVEL SECURITY
-- ==================

-- Enable RLS on all tables
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE click_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- BLOG POSTS: Public can read published, authenticated can do everything
CREATE POLICY "Public can read published posts" ON blog_posts
    FOR SELECT USING (is_published = TRUE);

CREATE POLICY "Authenticated users full access to posts" ON blog_posts
    FOR ALL USING (auth.role() = 'authenticated');

-- PAGE VIEWS: Public can insert, authenticated can read
CREATE POLICY "Anyone can insert page views" ON page_views
    FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Authenticated users can read page views" ON page_views
    FOR SELECT USING (auth.role() = 'authenticated');

-- CLICK EVENTS: Public can insert, authenticated can read
CREATE POLICY "Anyone can insert click events" ON click_events
    FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Authenticated users can read click events" ON click_events
    FOR SELECT USING (auth.role() = 'authenticated');

-- CONTACT SUBMISSIONS: Public can insert, authenticated can read/update
CREATE POLICY "Anyone can submit contact form" ON contact_submissions
    FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Authenticated users full access to messages" ON contact_submissions
    FOR ALL USING (auth.role() = 'authenticated');

-- ==================
-- INDEXES (for performance)
-- ==================
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts (is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts (slug);
CREATE INDEX IF NOT EXISTS idx_page_views_created ON page_views (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_session ON page_views (session_id);
CREATE INDEX IF NOT EXISTS idx_click_events_created ON click_events (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_unread ON contact_submissions (is_read, created_at DESC);

-- =============================================
-- SETUP COMPLETE!
--
-- Next steps:
-- 1. Go to Authentication > Users > "Add User" to create your admin account
-- 2. Copy your Project URL and anon key from Settings > API
-- 3. Paste them into js/supabase-client.js in your project
-- =============================================
