import EventsManager from "@/components/block/admin-manager/events-manager/EventsManager";
import AdminInfo from "@/components/block/admin-manager/admin-info/AdminInfo";
import SarmentsText from "@/components/ui/sarmentsText/SarmentsText";

export default function AdminEventsPage() {
  return (
    <section className="admin_page">
      <header className="admin_page_head">
        <h1 className="admin_h1">Événements</h1>
        <AdminInfo>
          <SarmentsText format="text" color="blue">
            Gérez les événements et actualités. Le champ « Événement » contrôle l&apos;affichage en
            page d&apos;accueil / vie scolaire.
          </SarmentsText>
        </AdminInfo>
      </header>

      <EventsManager />
    </section>
  );
}
