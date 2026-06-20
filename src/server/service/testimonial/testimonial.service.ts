import { supabase } from "@/lib/supabase/client";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { SupabaseTable } from "@/utils/types/table";
import type { TablesInsert, TablesUpdate } from "@/lib/supabase/database.types";

export class TestimonialService {
  /**
   * Admin: all testimonials (published and pending).
   * Uses the service role to bypass RLS — the route is guarded by requireAdmin.
   */
  async getAll() {
    return await supabaseAdmin
      .from(SupabaseTable.TESTIMONIALS)
      .select("*")
      .order("created_at", { ascending: false });
  }

  /** Public: only validated testimonials. */
  async getPublished() {
    return await supabase
      .from(SupabaseTable.TESTIMONIALS)
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false });
  }

  async create(data: TablesInsert<"testimonials">) {
    return await supabaseAdmin.from(SupabaseTable.TESTIMONIALS).insert(data).select().single();
  }

  async update(id: string, data: TablesUpdate<"testimonials">) {
    return await supabaseAdmin
      .from(SupabaseTable.TESTIMONIALS)
      .update(data)
      .eq("id", id)
      .select()
      .single();
  }

  async remove(id: string) {
    return await supabaseAdmin.from(SupabaseTable.TESTIMONIALS).delete().eq("id", id);
  }
}
