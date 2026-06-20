import { TeamMemberController } from "@/server/controller/teamMember.controller";
import { adminRoute } from "@/server/http/route";

export const GET = adminRoute(TeamMemberController.getAll);
export const POST = adminRoute(TeamMemberController.create);
