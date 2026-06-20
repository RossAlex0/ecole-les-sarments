import { unstable_cache } from "next/cache";
import { TeamMemberService } from "./teamMember.service";
import { CacheTag } from "../../cache/tags";

/**
 * Cached read of team members.
 * `revalidate: false` → Supabase is queried only once, then served from cache.
 * The cache is regenerated via `revalidateTag(CacheTag.TEAM_MEMBERS)` from the admin.
 */
export const getCachedTeamMembers = unstable_cache(
  async () => {
    const { data, error } = await new TeamMemberService().getAll();
    if (error) throw error;
    return data ?? [];
  },
  ["team-members:all"],
  { tags: [CacheTag.TEAM_MEMBERS], revalidate: false },
);
