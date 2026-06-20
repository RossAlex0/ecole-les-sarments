import { supabase } from "@/lib/supabase/client";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { SupabaseTable } from "@/utils/types/table";
import type { TablesInsert, TablesUpdate } from "@/lib/supabase/database.types";

export class TeamMemberService {
  /** Admin: all members (published + unpublished), via service role (bypass RLS). */
  async getAll() {
    return await supabaseAdmin.from(SupabaseTable.TEAM_MEMBERS).select("*");
  }

  /** Public: only published members. */
  async getPublished() {
    return await supabase.from(SupabaseTable.TEAM_MEMBERS).select("*").eq("is_published", true);
  }

  async create(data: TablesInsert<"team_members">) {
    return await supabaseAdmin.from(SupabaseTable.TEAM_MEMBERS).insert(data).select().single();
  }

  async update(id: string, data: TablesUpdate<"team_members">) {
    return await supabaseAdmin
      .from(SupabaseTable.TEAM_MEMBERS)
      .update(data)
      .eq("id", id)
      .select()
      .single();
  }

  async remove(id: string) {
    return await supabaseAdmin.from(SupabaseTable.TEAM_MEMBERS).delete().eq("id", id);
  }
}
