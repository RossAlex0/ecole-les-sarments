import { supabase } from "@/lib/supabase/client";
import { SupabaseTable } from "@/utils/types/table";

export class TestimonialService {
  async getAll() {
    return await supabase
      .from(SupabaseTable.TESTIMONIALS)
      .select("*")
      .order("created_at", { ascending: false });
  }
}
