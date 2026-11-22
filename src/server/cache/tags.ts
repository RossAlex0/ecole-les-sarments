import { revalidateTag } from "next/cache";

/**
 * Centralized cache tags.
 * Read: used by the `unstable_cache` wrappers (src/server/service/*.cache.ts).
 * Write: the controllers call `expireTag(CacheTag.X)` after a mutation so the
 * public cache is regenerated only after a change.
 */
export const CacheTag = {
  EVENTS: "events",
  TEAM_MEMBERS: "team_members",
  TESTIMONIALS: "testimonials",
} as const;

export type CacheTag = (typeof CacheTag)[keyof typeof CacheTag];

/**
 * Expires a tag immediately: the next visit refetches fresh data.
 * (`"max"` would only mark it stale and still serve the old data once.)
 */
export function expireTag(tag: CacheTag) {
  revalidateTag(tag, { expire: 0 });
}
