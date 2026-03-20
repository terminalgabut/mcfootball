/* ===============================
🔌 SUPABASE CLIENT
=============================== */

// pastikan script CDN sudah ada di index.html:
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js"></script>

const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_PUBLIC_KEY';

/* ===============================
🚀 CREATE CLIENT
=============================== */
const supabase = window.supabase.createClient(
SUPABASE_URL,
SUPABASE_ANON_KEY
);

/* ===============================
📤 EXPORT
=============================== */
export default supabase;
