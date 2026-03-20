/* ===============================
🔌 SUPABASE (ESM)
=============================== */

// import langsung dari CDN (ESM)
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

/* ===============================
🔐 CONFIG
=============================== */

const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_PUBLIC_KEY';

/* ===============================
🚀 CLIENT
=============================== */

const supabase = createClient(
SUPABASE_URL,
SUPABASE_ANON_KEY,
{
auth: {
persistSession: true,
autoRefreshToken: true
}
}
);

/* ===============================
📤 EXPORT
=============================== */

export default supabase;
