import Image from "next/image";
import { MdGroups2 } from "react-icons/md";
import SarmentsText from "@/components/ui/sarmentsText/SarmentsText";
import "./schoolTeam.css";

// src/lib/mocks/teamMembers.ts
import type { Database } from "@/lib/supabase/database.types";
import { TeamMembers } from "@/utils/types/table";

export type TeamMember = Database["public"]["Tables"]["team_members"]["Row"];

// export const mockTeamMembers: TeamMember[] = [
//   {
//     id: "1",
//     first_name: "Nathalie",
//     last_name: "Weber",
//     role: "Enseignante des maternelles",
//     short_bio: null,
//     image_url:
//       "https://funnkywkqepwqnasuuxe.supabase.co/storage/v1/object/public/ecole-les-sarments/team/nathalie-weber.webp",
//     image_path: "team/nathalie-weber.webp",
//     is_published: true,
//     created_at: new Date().toISOString(),
//     updated_at: new Date().toISOString(),
//   },
//   {
//     id: "2",
//     first_name: "Chantal",
//     last_name: "Vonau",
//     role: "Enseignante des CP1 et CP2",
//     short_bio: null,
//     image_url:
//       "https://funnkywkqepwqnasuuxe.supabase.co/storage/v1/object/public/ecole-les-sarments/team/chantal-vonau.webp",
//     image_path: "team/chantal-vonau.webp",
//     is_published: true,
//     created_at: new Date().toISOString(),
//     updated_at: new Date().toISOString(),
//   },
//   {
//     id: "3",
//     first_name: "Laure",
//     last_name: "Dupety",
//     role: "Enseignante des CE1 et CE2",
//     short_bio: null,
//     image_url:
//       "https://funnkywkqepwqnasuuxe.supabase.co/storage/v1/object/public/ecole-les-sarments/team/laure-dupety.webp",
//     image_path: "team/laure-dupety.webp",
//     is_published: true,
//     created_at: new Date().toISOString(),
//     updated_at: new Date().toISOString(),
//   },
//   {
//     id: "4",
//     first_name: "Armelle",
//     last_name: "Da Rocha",
//     role: "Directrice et Enseignante des CM1 et CM2",
//     short_bio: null,
//     image_url:
//       "https://funnkywkqepwqnasuuxe.supabase.co/storage/v1/object/public/ecole-les-sarments/team/armelle-da-rocha.webp",
//     image_path: "team/armelle-da-rocha.webp",
//     is_published: true,
//     created_at: new Date().toISOString(),
//     updated_at: new Date().toISOString(),
//   },
//   {
//     id: "5",
//     first_name: "Sibyle",
//     last_name: "Pomel",
//     role: "Enseignante de musique",
//     short_bio: null,
//     image_url:
//       "https://funnkywkqepwqnasuuxe.supabase.co/storage/v1/object/public/ecole-les-sarments/team/sibyle-pomel.webp",
//     image_path: "team/sibyle-pomel.webp",
//     is_published: true,
//     created_at: new Date().toISOString(),
//     updated_at: new Date().toISOString(),
//   },
// ];

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
