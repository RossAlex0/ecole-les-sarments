"use client";

import { useCallback, useState } from "react";
import { useUploadImage } from "@/utils/hooks/files/useUploadImage";
import type { FieldDef, FormValues } from "@/utils/form/fields";

type ResourceFormProps = {
  fields: FieldDef[];
  values: FormValues;
  onChange: (name: string, value: string | boolean) => void;
  /** Called with the resolved values (image fields already uploaded). */
  onSubmit: (values: FormValues) => void | Promise<void>;
  onCancel?: () => void;
  busy: boolean;
  error: string | null;
  submitLabel: string;
};

export default function ResourceForm({
  fields,
  values,
  onChange,
  onSubmit,
  onCancel,
  busy,
  error,
  submitLabel,
}: ResourceFormProps) {
  const uploadImage = useUploadImage();
  // Files are kept in memory and only uploaded on submit.
  const [pendingFiles, setPendingFiles] = useState<Record<string, File>>({});
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const selectFile = useCallback((field: FieldDef, file: File | undefined) => {
    setLocalError(null);
    setPendingFiles((prev) => {
      const next = { ...prev };
      if (file) next[field.name] = file;
      else delete next[field.name];
      return next;
    });
    setPreviews((prev) => {
      if (prev[field.name]) URL.revokeObjectURL(prev[field.name]);
      const next = { ...prev };
      if (file) next[field.name] = URL.createObjectURL(file);
      else delete next[field.name];
      return next;
    });
  }, []);

  const handleSubmit = useCallback(async () => {
    // Validate (a pending file satisfies a required image).
    for (const field of fields) {
      if (!field.required || field.type === "checkbox" || field.type === "hidden") continue;
      const filled =
        field.type === "image"
          ? String(values[field.name] ?? "").trim() !== "" || Boolean(pendingFiles[field.name])
          : String(values[field.name] ?? "").trim() !== "";
      if (!filled) {
        setLocalError(`Le champ « ${field.label} » est requis.`);
        return;
      }
    }

    setUploading(true);
    setLocalError(null);
    try {
      // Upload selected images now, then submit the resolved values.
      const finalValues: FormValues = { ...values };
      for (const field of fields) {
        const file = pendingFiles[field.name];
        if (field.type === "image" && file) {
          const existingPath = field.pathField ? String(values[field.pathField] ?? "") : "";
          const { url, path } = await uploadImage(
            field.folder ?? "uploads",
            file,
            existingPath || undefined,
          );
          finalValues[field.name] = url;
          if (field.pathField) finalValues[field.pathField] = path;
        }
      }
      await onSubmit(finalValues);
    } catch (e) {
      setLocalError(e instanceof Error ? e.message : "Une erreur est survenue");
    } finally {
      setUploading(false);
    }
  }, [fields, values, pendingFiles, uploadImage, onSubmit]);

  const busyAll = busy || uploading;

  return (
    <form
      className="admin_form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      {fields.map((field) => {
        if (field.type === "hidden") return null;

        return (
          <div key={field.name} className="admin_field">
            {field.type === "checkbox" ? (
              <label className="admin_check">
                <input
                  type="checkbox"
                  checked={Boolean(values[field.name])}
                  onChange={(e) => onChange(field.name, e.target.checked)}
                  disabled={busyAll}
                />
                <span className="admin_field_label">{field.label}</span>
              </label>
            ) : field.type === "image" ? (
              <div className="admin_field_label_wrap">
                <span className="admin_field_label">
                  {field.label}
                  {field.required && <span className="admin_req"> *</span>}
                </span>
                {previews[field.name] || values[field.name] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={previews[field.name] || String(values[field.name])}
                    alt="Aperçu"
                    className="admin_image_preview"
                  />
                ) : (
                  <span className="admin_field_hint">Aucune image pour le moment.</span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="admin_input"
                  disabled={busyAll}
                  onChange={(e) => selectFile(field, e.target.files?.[0])}
                />
              </div>
            ) : (
              <label className="admin_field_label_wrap">
                <span className="admin_field_label">
                  {field.label}
                  {field.required && <span className="admin_req"> *</span>}
                </span>
                {field.type === "textarea" ? (
                  <textarea
                    className="admin_input admin_textarea"
                    value={String(values[field.name])}
                    onChange={(e) => onChange(field.name, e.target.value)}
                    disabled={busyAll}
                    rows={3}
                  />
                ) : (
                  <input
                    className="admin_input"
                    type={field.type === "datetime" ? "datetime-local" : "text"}
                    value={String(values[field.name])}
                    onChange={(e) => onChange(field.name, e.target.value)}
                    disabled={busyAll}
                  />
                )}
              </label>
            )}
            {field.hint && <p className="admin_field_hint">{field.hint}</p>}
          </div>
        );
      })}

      {(localError || error) && <p className="admin_error">{localError || error}</p>}

      <div className="admin_form_actions">
        {onCancel && (
          <button type="button" className="admin_btn admin_btn_ghost" onClick={onCancel} disabled={busyAll}>
            Annuler
          </button>
        )}
        <button type="submit" className="admin_btn admin_btn_primary" disabled={busyAll}>
          {uploading ? "Envoi de l'image…" : busy ? "Enregistrement…" : submitLabel}
        </button>
      </div>
    </form>
  );
}
