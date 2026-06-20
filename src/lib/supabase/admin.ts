import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

// Client admin - (Route Handlers, Server Actions)
// Bypass RLS
// ⚠️ Don't use in file "use client"
// `?? " "` : fallback non-vide pour que le build ne lève pas "supabaseKey is
// required" quand SUPABASE_SERVICE_ROLE_KEY est absente (ex. CI). La vraie clé
// est présente au runtime ; ce client n'est jamais utilisé pendant le build.
export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? " ",
  { auth: { persistSession: false } },
);
