import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

// Client admin - (Route Handlers, Server Actions)
// Bypass RLS
// ⚠️ Don't use in file "use client"
export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } },
);
