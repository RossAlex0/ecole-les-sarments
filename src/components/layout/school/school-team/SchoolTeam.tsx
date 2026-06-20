import Image from "next/image";
import { MdGroups2 } from "react-icons/md";
import SarmentsText from "@/components/ui/sarmentsText/SarmentsText";
import { TeamMembers } from "@/utils/types/table";
import "./schoolTeam.css";

export const teamStats = [
  { number: 5, label: "Membres du conseil d'administration" },
  { number: 3, label: "Contrats pros" },
  { number: 5, label: "Intervenants bénévoles" },
];

export default function SchoolTeam({ team }: { team: TeamMembers[] }) {
  return (
    <section className="school_team">
      <div className="school_team_header">
        <SarmentsText format="title" color="blue">
          Notre équipe
        </SarmentsText>
        <SarmentsText format="text" color="blue" className="school_team_subtitle">
          Une équipe enseignante formée, engagée et expérimentée
        </SarmentsText>
      </div>

      <div className="school_team_list">
        {team?.map((member) => (
          <div key={member.id} className="school_team_card">
            <div className="school_team_avatar">
              {member.image_url && (
                <Image
                  src={member.image_url}
                  alt={`${member.first_name} ${member.last_name}`}
                  fill
                  sizes="100px"
                  style={{ objectFit: "cover" }}
                />
              )}
            </div>
            <div className="school_team_info">
              <SarmentsText format="semi-title-medium" color="blue">
                {member.first_name} {member.last_name}
              </SarmentsText>
              <SarmentsText format="text" color="blue" className="school_team_role">
                {member.role}
              </SarmentsText>
            </div>
          </div>
        ))}
      </div>

      <div className="school_team_stats">
        {teamStats.map((stat) => (
          <div key={stat.label} className="school_team_stat">
            <MdGroups2 className="school_team_stat_icon" />
            <span className="school_team_stat_number">{stat.number}</span>
            <span className="school_team_stat_label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
