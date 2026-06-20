import { unstable_cache } from "next/cache";
import { TeamMemberService } from "./teamMember.service";
import { CacheTag } from "../../cache/tags";

/**
 * Lecture cachée des membres de l'équipe.
 * `revalidate: false` → Supabase n'est interrogé qu'une fois puis servi depuis le cache.
 * Le cache est régénéré via `revalidateTag(CacheTag.TEAM_MEMBERS)` depuis l'admin.
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
