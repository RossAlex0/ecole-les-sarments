import FilesManager from "@/components/block/admin-manager/files-manager/FilesManager";
import AdminInfo from "@/components/block/admin-manager/admin-info/AdminInfo";
import SarmentsText from "@/components/ui/sarmentsText/SarmentsText";

export default function AdminFilesPage() {
  return (
    <section className="admin_page">
      <header className="admin_page_head">
        <h1 className="admin_h1">Fichiers</h1>
        <AdminInfo>
          <SarmentsText format="text" color="blue">
            Mettez à jour les documents téléchargeables. Chaque envoi remplace définitivement
            l&apos;ancien fichier (emplacement réservé dans le bucket — le serveur qui contient tous
            les fichiers).
          </SarmentsText>
          <SarmentsText format="text" color="blue">
            Tous les fichiers, images et PDF sont accessibles publiquement en lecture mais ne sont
            pas modifiables par un tiers.
          </SarmentsText>
        </AdminInfo>
      </header>

      <FilesManager />
    </section>
  );
}
