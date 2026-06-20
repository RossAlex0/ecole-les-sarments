import Link from "next/link";
import AdminInfo from "@/components/block/admin-manager/admin-info/AdminInfo";
import SarmentsText from "@/components/ui/sarmentsText/SarmentsText";

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
        <SarmentsText format="text" color="blue">
          Espace de gestion du contenu du site. ⚠️ Toute manipulation est irréversible !
        </SarmentsText>
      </header>

      <div className="admin_grid">
        {SECTIONS.map((section) => (
          <Link key={section.href} href={section.href} className="admin_card admin_card_link">
            <h2 className="admin_card_title">{section.title}</h2>
            <p className="admin_card_desc">{section.desc}</p>
          </Link>
        ))}
      </div>

      <AdminInfo title="À quoi sert cet espace ?">
        <SarmentsText format="text" color="blue">
          Le back-office est l&apos;interface privée qui vous permet de gérer le contenu du site
          <strong> sans toucher au code</strong>. Depuis ici, vous pouvez ajouter, modifier ou
          supprimer les membres de l&apos;équipe et les événements, modérer et publier les
          témoignages, et mettre à jour les fichiers (photo de la directrice, PDF). Chaque
          changement enregistré est appliqué directement sur le site public.
        </SarmentsText>
        <SarmentsText format="text" color="blue">
          ⏳ Une modification peut parfois ne pas apparaître <strong>immédiatement</strong> à cause
          du cache (mémoire locale où se trouve la donnée) : rafraîchissez la page ou patientez
          quelques secondes de plus.
        </SarmentsText>
      </AdminInfo>
    </section>
  );
}
