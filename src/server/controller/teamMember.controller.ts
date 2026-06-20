import { revalidateTag } from "next/cache";
import { TeamMemberService } from "../service/team-member/teamMember.service";
import { getCachedTeamMembers } from "../service/team-member/teamMember.cache";
import { CacheTag } from "../cache/tags";
import type { RouteContext } from "../http/route";

export const TeamMemberController = {
  // Public (read through the Next cache)
  getPublished: async () => ({ data: await getCachedTeamMembers() }),

  // Admin
  getAll: () => new TeamMemberService().getAll(),

  create: async (request: Request) => {
    const body = await request.json();
    const { data, error } = await new TeamMemberService().create(body);
    if (error) throw error;
    revalidateTag(CacheTag.TEAM_MEMBERS, "max");
    return data;
  },

  update: async (request: Request, context: RouteContext) => {
    const { id } = await context.params;
    const body = await request.json();
    const { data, error } = await new TeamMemberService().update(id, body);
    if (error) throw error;
    revalidateTag(CacheTag.TEAM_MEMBERS, "max");
    return data;
  },

  remove: async (_request: Request, context: RouteContext) => {
    const { id } = await context.params;
    const { error } = await new TeamMemberService().remove(id);
    if (error) throw error;
    revalidateTag(CacheTag.TEAM_MEMBERS, "max");
    return { success: true };
  },
};
