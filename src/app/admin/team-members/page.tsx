import TeamMembersManager from "@/components/block/team-members-manager/TeamMembersManager";

export default function AdminTeamMembersPage() {
  return (
    <section className="admin_page">
      <header className="admin_page_head">
        <h1 className="admin_h1">Équipe</h1>
        <p className="admin_lead">
          Gérez les membres de l&apos;équipe affichés sur la page « Notre école ». Ajout,
          modification et suppression.
        </p>
      </header>

      <TeamMembersManager />
    </section>
  );
}
