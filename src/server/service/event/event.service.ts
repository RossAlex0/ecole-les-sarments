import { supabase } from "@/lib/supabase/client";
import { SupabaseTable } from "@/utils/types/table";

export class EventService {
  async getAll() {
    return await supabase.from(SupabaseTable.EVENTS).select("*");
  }

  async getNext() {
    const now = new Date().toISOString();

    return await supabase
      .from(SupabaseTable.EVENTS)
      .select("*")
      .eq("is_event", true)
      .gte("start_at", now)
      .order("start_at", { ascending: true })
      .limit(1)
      .single();
  }

  async getNews() {
    const now = new Date().toISOString();

    return await supabase
      .from(SupabaseTable.EVENTS)
      .select("*")
      .gte("start_at", now)
      .order("start_at", { ascending: true });
  }
}
