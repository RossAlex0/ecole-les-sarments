import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

// Admin client (Route Handlers, Server Actions) — bypasses RLS.
// ⚠️ Never import in a "use client" file.
// `?? " "`: non-empty fallback so the build doesn't throw "supabaseKey is
// required" when SUPABASE_SERVICE_ROLE_KEY is absent (e.g. CI). The real key is
// present at runtime; this client is never used during the build.
export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? " ",
  { auth: { persistSession: false } },
);
