/**
 * Tags de cache centralisés.
 * Lecture : utilisés par les wrappers `unstable_cache` (src/server/service/*.cache.ts).
 * Écriture : l'admin appellera `revalidateTag(CacheTag.X)` dans ses Server Actions
 * pour régénérer le cache public uniquement après une modification.
 */
export const CacheTag = {
  EVENTS: "events",
  TEAM_MEMBERS: "team_members",
  TESTIMONIALS: "testimonials",
} as const;

export type CacheTag = (typeof CacheTag)[keyof typeof CacheTag];
