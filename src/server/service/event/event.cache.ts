import { unstable_cache } from "next/cache";
import { EventService } from "./event.service";
import { CacheTag } from "../../cache/tags";

/**
 * Lectures cachées des événements.
 * `getNext`/`getNews` dépendent de la date courante : `revalidate` court (1h) pour
 * que le "prochain événement" reste juste sans retaper Supabase à chaque visite.
 * `getAll` est régénéré via `revalidateTag(CacheTag.EVENTS)` depuis l'admin.
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
    // `.single()` renvoie une erreur s'il n'y a aucun événement à venir : on tolère ce cas.
    if (error && error.code !== "PGRST116") throw error;
    return data ?? null;
  },
  ["events:next"],
  { tags: [CacheTag.EVENTS], revalidate: 3600 },
);
