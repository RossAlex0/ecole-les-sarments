import { supabase } from "@/lib/supabase/client";
import { SupabaseTable } from "@/utils/types/table";

export class TeamMemberService {
  async getAll() {
    return await supabase.from(SupabaseTable.TEAM_MEMBERS).select("*");
  }
}
