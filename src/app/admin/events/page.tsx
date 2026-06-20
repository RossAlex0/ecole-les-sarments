import EventsManager from "@/components/block/events-manager/EventsManager";

export default function AdminEventsPage() {
  return (
    <section className="admin_page">
      <header className="admin_page_head">
        <h1 className="admin_h1">Événements</h1>
        <p className="admin_lead">
          Gérez les événements et actualités. Le champ « Mettre en avant » contrôle l&apos;affichage
          en page d&apos;accueil / vie scolaire.
        </p>
      </header>

      <EventsManager />
    </section>
  );
}
