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

  /**
   * Cron cleanup: delete events that started before `beforeIso`, along with
   * their storage images. Returns the number of deleted rows.
   */
  async removeStartedBefore(beforeIso: string) {
    const { data: stale, error: selectError } = await supabaseAdmin
      .from(SupabaseTable.EVENTS)
      .select("id, image_url")
      .lt("start_at", beforeIso);

    if (selectError) return { deleted: 0, error: selectError };

    const rows = stale ?? [];
    if (rows.length === 0) return { deleted: 0, error: null };

    // Best-effort: remove associated images from storage.
    const paths = rows
      .map((row) => (row.image_url ? bucketPathFromUrl(row.image_url) : null))
      .filter((path): path is string => Boolean(path));
    if (paths.length > 0) await supabaseAdmin.storage.from(STORAGE_BUCKET).remove(paths);

    const { error: deleteError } = await supabaseAdmin
      .from(SupabaseTable.EVENTS)
      .delete()
      .in(
        "id",
        rows.map((row) => row.id),
      );

    return { deleted: deleteError ? 0 : rows.length, error: deleteError };
  }
}
