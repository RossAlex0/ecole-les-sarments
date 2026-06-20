"use client";

import { useCallback, useState } from "react";
import { useUploadFile, type UploadKind } from "@/utils/hooks/files/useUploadFile";
import SarmentsButton from "@/components/ui/sarmentsButton/SarmentsButton";

type Upload = {
  kind: UploadKind;
  label: string;
  accept: string;
  hint: string;
};

const UPLOADS: Upload[] = [
  {
    kind: "director-image",
    label: "Photo de la directrice",
    accept: "image/*",
    hint: "Téléversez une photo (WebP de préférence). Si l'image est trop lourde et que vous n'arrivez pas à créer ou modifier la photo, vous pouvez essayer de convertir votre image sur un site comme https://squoosh.app/.",
  },
  {
    kind: "frais-pdf",
    label: "PDF — Frais de scolarité",
    accept: "application/pdf",
    hint: "Remplace définitivement l'ancien PDF des frais de scolarité.",
  },
  {
    kind: "uniformes-pdf",
    label: "PDF — Uniformes scolaires",
    accept: "application/pdf",
    hint: "Remplace définitivement l'ancien PDF des uniformes.",
  },
];

function UploadCard({ kind, label, accept, hint }: Upload) {
  const uploadFile = useUploadFile();
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const input = form.elements.namedItem("file") as HTMLInputElement | null;
      const file = input?.files?.[0];
      if (!file) {
        setError("Sélectionnez un fichier.");
        return;
      }

      setBusy(true);
      setError(null);
      setStatus(null);
      try {
        await uploadFile(kind, file);
        setStatus("Fichier mis à jour avec succès.");
        form.reset();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Échec de l'envoi");
      } finally {
        setBusy(false);
      }
    },
    [kind, uploadFile],
  );

  return (
    <form className="admin_card" onSubmit={onSubmit}>
      <h2 className="admin_card_title">{label}</h2>
      <p className="admin_field_hint">{hint}</p>
      <input name="file" type="file" accept={accept} className="admin_input" disabled={busy} />
      {error && <p className="admin_error">{error}</p>}
      {status && <p className="admin_success">{status}</p>}
      <div className="admin_form_actions">
        <SarmentsButton theme="primary" type="submit" disabled={busy}>
          {busy ? "Envoi…" : "Mettre à jour"}
        </SarmentsButton>
      </div>
    </form>
  );
}

export default function FilesManager() {
  return (
    <div className="admin_list">
      {UPLOADS.map((upload) => (
        <UploadCard key={upload.kind} {...upload} />
      ))}
    </div>
  );
}
