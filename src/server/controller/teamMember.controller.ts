import { TeamMemberService } from "../service/team-member/teamMember.service";
import { handleRequest } from "./handleRequest";

export const TeamMemberController = {
  getAllTeamMembers: () => handleRequest(() => new TeamMemberService().getAll()),
};
