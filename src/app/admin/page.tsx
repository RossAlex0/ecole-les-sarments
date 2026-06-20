import Link from "next/link";

const SECTIONS = [
  {
    href: "/admin/team-members",
    title: "Équipe",
    desc: "Ajouter, modifier ou supprimer les membres de l'équipe affichés sur la page « Notre école ».",
  },
  {
    href: "/admin/events",
    title: "Événements",
    desc: "Gérer les événements et actualités. Un événement « mis en avant » devient le prochain événement ; sinon il rejoint la liste des actualités.",
  },
  {
    href: "/admin/testimonials",
    title: "Témoignages",
    desc: "Ajouter de nouveaux témoignages de parents.",
  },
  {
    href: "/admin/files",
    title: "Fichiers",
    desc: "Mettre à jour la photo de la directrice et les PDF (frais de scolarité, uniformes).",
  },
];

export default function AdminHome() {
  return (
    <section className="admin_page">
      <header className="admin_page_head">
        <h1 className="admin_h1">Back office</h1>
        <p className="admin_lead">
          Espace de gestion du contenu du site. ⚠️ Accès non restreint pour l&apos;instant : ne pas
          diffuser cette URL tant que l&apos;authentification n&apos;est pas en place.
        </p>
      </header>

      <div className="admin_grid">
        {SECTIONS.map((section) => (
          <Link key={section.href} href={section.href} className="admin_card admin_card_link">
            <h2 className="admin_card_title">{section.title}</h2>
            <p className="admin_card_desc">{section.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
