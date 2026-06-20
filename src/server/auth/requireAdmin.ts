import { createServerSupabase } from "@/lib/supabase/server";
import { HttpError } from "../http/httpError";

/**
 * Ensures the request carries a valid Supabase session.
 * The app has a single user (sign-ups disabled), so an authenticated
 * session IS the admin — we rely solely on Supabase's session cookie.
 */
export async function requireAdmin() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new HttpError(401, "Authentification requise");
  return user;
}
