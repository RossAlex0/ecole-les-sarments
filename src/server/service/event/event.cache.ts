import { unstable_cache } from "next/cache";
import { EventService } from "./event.service";
import { CacheTag } from "../../cache/tags";

/**
 * Cached reads of events.
 * `getNext`/`getNews` depend on the current date: short `revalidate` (1h) so the
 * "next event" stays accurate without re-querying Supabase on every visit.
 * `getAll` is regenerated via `revalidateTag(CacheTag.EVENTS)` from the admin.
 */
export const getCachedEvents = unstable_cache(
  async () => {
    const { data, error } = await new EventService().getAll();
    if (error) throw error;
    return data ?? [];
  },
  ["events:all"],
  { tags: [CacheTag.EVENTS], revalidate: false },
);

export const getCachedPublishedEvents = unstable_cache(
  async () => {
    const { data, error } = await new EventService().getPublished();
    if (error) throw error;
    return data ?? [];
  },
  ["events:published"],
  { tags: [CacheTag.EVENTS], revalidate: false },
);

export const getCachedUpcomingNews = unstable_cache(
  async () => {
    const { data, error } = await new EventService().getNews();
    if (error) throw error;
    return data ?? [];
  },
  ["events:news"],
  { tags: [CacheTag.EVENTS], revalidate: 3600 },
);

export const getCachedNextEvent = unstable_cache(
  async () => {
    const { data, error } = await new EventService().getNext();
    // `.single()` errors when there is no upcoming event: tolerate that case.
    if (error && error.code !== "PGRST116") throw error;
    return data ?? null;
  },
  ["events:next"],
  { tags: [CacheTag.EVENTS], revalidate: 3600 },
);
