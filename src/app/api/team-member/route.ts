import { TeamMemberController } from "@/server/controller/teamMember.controller";
import { publicRoute } from "@/server/http/route";

// Public: published team members.
export const GET = publicRoute(TeamMemberController.getPublished);
