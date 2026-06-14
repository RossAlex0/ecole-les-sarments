import { TeamMemberService } from "../service/team-member/teamMember.service";
import { NextResponse } from "next/server";

export const TeamMemberController = {
  getAllTeamMembers: async () => {
    try {
      const teamMemberService = new TeamMemberService();

      const team = await teamMemberService.getAll();
      return NextResponse.json(team);
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }
  },
};
