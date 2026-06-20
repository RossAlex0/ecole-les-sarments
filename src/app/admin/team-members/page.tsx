import TeamMembersManager from "@/components/block/admin-manager/team-members-manager/TeamMembersManager";
import AdminInfo from "@/components/block/admin-manager/admin-info/AdminInfo";
import SarmentsText from "@/components/ui/sarmentsText/SarmentsText";

export default function AdminTeamMembersPage() {
  return (
    <section className="admin_page">
      <header className="admin_page_head">
        <h1 className="admin_h1">Équipe</h1>
        <AdminInfo>
          <SarmentsText format="text" color="blue">
            Gérez les membres de l&apos;équipe affichés sur la page « Notre école ». Ajout,
            modification et suppression.
          </SarmentsText>
        </AdminInfo>
      </header>

      <TeamMembersManager />
    </section>
  );
}
