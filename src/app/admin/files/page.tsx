import FilesManager from "@/components/block/files-manager/FilesManager";

export default function AdminFilesPage() {
  return (
    <section className="admin_page">
      <header className="admin_page_head">
        <h1 className="admin_h1">Fichiers</h1>
        <p className="admin_lead">
          Mettez à jour les documents téléchargeables et la photo de la directrice. Chaque envoi
          remplace définitivement l&apos;ancien fichier (même emplacement dans le bucket).
        </p>
      </header>

      <FilesManager />
    </section>
  );
}
