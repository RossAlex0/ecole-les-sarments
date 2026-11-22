import { unstable_cache } from "next/cache";
import { EventService } from "./event.service";
import { CacheTag } from "../../cache/tags";

/**
 * Versioned key prefix: bump it when the cached data shape or the query logic
 * changes, so a deploy never serves entries computed by the previous code.
 */
const EVENTS_CACHE_KEY = "events:v2";

/**
 * Cached reads of events.
 * `getNext`/`getNews` depend on the current date: short `revalidate` (1h) so the
 * "next event" stays accurate without re-querying Supabase on every visit.
 * `getAll` is regenerated via `expireTag(CacheTag.EVENTS)` from the admin.
 */
export const getCachedEvents = unstable_cache(
  async () => {
    const { data, error } = await new EventService().getAll();
    if (error) throw error;
    return data ?? [];
  },
  [EVENTS_CACHE_KEY, "all"],
  { tags: [CacheTag.EVENTS], revalidate: false },
);

export const getCachedPublishedEvents = unstable_cache(
  async () => {
    const { data, error } = await new EventService().getPublished();
    if (error) throw error;
    return data ?? [];
  },
  [EVENTS_CACHE_KEY, "published"],
  { tags: [CacheTag.EVENTS], revalidate: false },
);

export const getCachedUpcomingNews = unstable_cache(
  async () => {
    const { data, error } = await new EventService().getNews();
    if (error) throw error;
    return data ?? [];
  },
  [EVENTS_CACHE_KEY, "news"],
  { tags: [CacheTag.EVENTS], revalidate: 3600 },
);

export const getCachedNextEvent = unstable_cache(
  async () => {
    const { data, error } = await new EventService().getNext();
    if (error) throw error;
    return data;
  },
  [EVENTS_CACHE_KEY, "next"],
  { tags: [CacheTag.EVENTS], revalidate: 3600 },
);
