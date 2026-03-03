/* ==========================================
   SUPABASE CLIENT INITIALIZATION
   ========================================== */

// TODO: Replace with your Supabase credentials
// 1. Go to https://supabase.com and create a free project
// 2. Run supabase-setup.sql in SQL Editor to create tables
// 3. Go to Settings > API and copy your URL and anon key below
// 4. Go to Authentication > Users > "Add User" to create your admin login
var SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co';
var SUPABASE_ANON_KEY = 'YOUR_ANON_KEY';

var supabaseClient = null;

(function() {
    if (typeof window.supabase !== 'undefined' && window.supabase.createClient) {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    } else {
        console.warn('Supabase JS library not loaded. Some features may not work.');
    }
})();

/* Helper to get or create a session ID for analytics */
function getSessionId() {
    var sid = sessionStorage.getItem('_session_id');
    if (!sid) {
        sid = 'sess_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
        sessionStorage.setItem('_session_id', sid);
    }
    return sid;
}
