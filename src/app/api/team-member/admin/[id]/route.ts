import { TeamMemberController } from "@/server/controller/teamMember.controller";
import { adminRoute } from "@/server/http/route";

export const PATCH = adminRoute(TeamMemberController.update);
export const DELETE = adminRoute(TeamMemberController.remove);
