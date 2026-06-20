/**
 * Centralized cache tags.
 * Read: used by the `unstable_cache` wrappers (src/server/service/*.cache.ts).
 * Write: the admin will call `revalidateTag(CacheTag.X)` in its Server Actions
 * to regenerate the public cache only after a change.
 */
export const CacheTag = {
  EVENTS: "events",
  TEAM_MEMBERS: "team_members",
  TESTIMONIALS: "testimonials",
} as const;

export type CacheTag = (typeof CacheTag)[keyof typeof CacheTag];
