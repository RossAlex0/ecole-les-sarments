"use client";

import ResourceManager from "@/components/block/admin-manager/resource-manager/ResourceManager";
import { TEAM_FIELDS } from "@/utils/form/resourceConfigs";
import { useCreateTeamMember } from "@/utils/hooks/team-members/useCreateTeamMember";
import { useUpdateTeamMember } from "@/utils/hooks/team-members/useUpdateTeamMember";
import { useDeleteTeamMember } from "@/utils/hooks/team-members/useDeleteTeamMember";

export default function TeamMembersManager() {
  const createTeamMember = useCreateTeamMember();
  const updateTeamMember = useUpdateTeamMember();
  const deleteTeamMember = useDeleteTeamMember();

  return (
    <ResourceManager
      apiUrl="/api/team-member/admin"
      fields={TEAM_FIELDS}
      labelFields={["first_name", "last_name"]}
      addLabel="Ajouter un membre"
      onCreate={createTeamMember}
      onUpdate={updateTeamMember}
      onDelete={deleteTeamMember}
      getBadge={(row) =>
        row.is_published
          ? { label: "Publié", tone: "success" }
          : { label: "Non publié", tone: "danger" }
      }
    />
  );
}
