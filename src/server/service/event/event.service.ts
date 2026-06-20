import { supabase } from "@/lib/supabase/client";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { SupabaseTable } from "@/utils/types/table";
import { STORAGE_BUCKET, bucketPathFromUrl } from "@/lib/supabase/storage";
import type { TablesInsert, TablesUpdate } from "@/lib/supabase/database.types";

export class EventService {
  /** Admin: all events (published + unpublished), via service role (bypass RLS). */
  async getAll() {
    return await supabaseAdmin
      .from(SupabaseTable.EVENTS)
      .select("*")
      .order("start_at", { ascending: false });
  }

  /** Public: only published events. */
  async getPublished() {
    return await supabase
      .from(SupabaseTable.EVENTS)
      .select("*")
      .eq("is_published", true)
      .order("start_at", { ascending: false });
  }

  async getNext() {
    const now = new Date().toISOString();

    return await supabase
      .from(SupabaseTable.EVENTS)
      .select("*")
      .eq("is_published", true)
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
      .eq("is_published", true)
      .gte("start_at", now)
      .order("start_at", { ascending: true });
  }

  async create(data: TablesInsert<"events">) {
    return await supabaseAdmin.from(SupabaseTable.EVENTS).insert(data).select().single();
  }

  async update(id: string, data: TablesUpdate<"events">) {
    // If the image changed, delete the previous file from storage.
    if (data.image_url !== undefined) {
      const { data: existing } = await supabaseAdmin
        .from(SupabaseTable.EVENTS)
        .select("image_url")
        .eq("id", id)
        .single();

      const oldUrl = existing?.image_url;
      if (oldUrl && oldUrl !== data.image_url) {
        const path = bucketPathFromUrl(oldUrl);
        if (path) await supabaseAdmin.storage.from(STORAGE_BUCKET).remove([path]);
      }
    }

    return await supabaseAdmin
      .from(SupabaseTable.EVENTS)
      .update(data)
      .eq("id", id)
      .select()
      .single();
  }

  async remove(id: string) {
    // Best-effort: delete the associated image from storage before the row.
    const { data: existing } = await supabaseAdmin
      .from(SupabaseTable.EVENTS)
      .select("image_url")
      .eq("id", id)
      .single();

    if (existing?.image_url) {
      const path = bucketPathFromUrl(existing.image_url);
      if (path) await supabaseAdmin.storage.from(STORAGE_BUCKET).remove([path]);
    }

    return await supabaseAdmin.from(SupabaseTable.EVENTS).delete().eq("id", id);
  }
}
