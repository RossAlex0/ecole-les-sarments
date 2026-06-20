"use client";

import { useCallback, useMemo, useState } from "react";
import useFetch from "@/utils/hooks/useFetch";
import type { Testimonials } from "@/utils/types/table";
import ConfirmDialog from "@/components/block/admin-manager/confirm-dialog/ConfirmDialog";
import ResourceForm from "@/components/block/admin-manager/resource-form/ResourceForm";
import { type FormValues, initialValues, valuesToPayload } from "@/utils/form/fields";
import { TESTIMONIAL_FIELDS } from "@/utils/form/resourceConfigs";
import { useAdminCreateTestimonial } from "@/utils/hooks/testimonials/useAdminCreateTestimonial";
import { useUpdateTestimonial } from "@/utils/hooks/testimonials/useUpdateTestimonial";
import { useDeleteTestimonial } from "@/utils/hooks/testimonials/useDeleteTestimonial";

type Filter = "all" | "published" | "pending";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "Tous" },
  { key: "published", label: "Publiés" },
  { key: "pending", label: "En attente" },
];

export default function TestimonialsManager() {
  const createTestimonial = useAdminCreateTestimonial();
  const publishTestimonial = useUpdateTestimonial();
  const deleteTestimonial = useDeleteTestimonial();

  const [version, setVersion] = useState(0);
  const {
    data,
    loading,
    error: fetchError,
  } = useFetch<Testimonials[]>(`/api/testimonial/admin?v=${version}`);
  const all = useMemo(() => data ?? [], [data]);

  const [filter, setFilter] = useState<Filter>("all");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [toDelete, setToDelete] = useState<Testimonials | null>(null);

  // Create form (admin can add a testimonial directly).
  const emptyForm = useMemo(() => initialValues(TESTIMONIAL_FIELDS), []);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<FormValues>(emptyForm);
  const [formBusy, setFormBusy] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const rows = useMemo(() => {
    if (filter === "published") return all.filter((t) => t.is_published);
    if (filter === "pending") return all.filter((t) => !t.is_published);
    return all;
  }, [all, filter]);

  const onFormChange = useCallback((name: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const submitCreate = useCallback(
    async (formValues: FormValues) => {
      setFormBusy(true);
      setFormError(null);
      try {
        await createTestimonial(valuesToPayload(formValues, TESTIMONIAL_FIELDS));
        setForm(emptyForm);
        setCreating(false);
        setVersion((v) => v + 1);
      } catch (e) {
        setFormError(e instanceof Error ? e.message : "Une erreur est survenue");
      } finally {
        setFormBusy(false);
      }
    },
    [createTestimonial, emptyForm],
  );

  const publish = useCallback(
    async (id: string) => {
      setBusyId(id);
      setError(null);
      try {
        await publishTestimonial(id, { is_published: true });
        setVersion((v) => v + 1);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Une erreur est survenue");
      } finally {
        setBusyId(null);
      }
    },
    [publishTestimonial],
  );

  const confirmDelete = useCallback(async () => {
    if (!toDelete) return;
    setBusyId(toDelete.id);
    setError(null);
    try {
      await deleteTestimonial(toDelete.id);
      setToDelete(null);
      setVersion((v) => v + 1);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Une erreur est survenue");
    } finally {
      setBusyId(null);
    }
  }, [toDelete, deleteTestimonial]);

  return (
    <div className="admin_manager">
      <div className="admin_manager_head">
        <span className="admin_count">{all.length} témoignage(s)</span>
        {!creating && (
          <button
            type="button"
            className="admin_btn admin_btn_primary"
            onClick={() => {
              setForm(emptyForm);
              setFormError(null);
              setCreating(true);
            }}
          >
            Ajouter un témoignage
          </button>
        )}
      </div>

      {creating && (
        <div className="admin_card admin_card_form">
          <h2 className="admin_card_title">Ajouter</h2>
          <ResourceForm
            fields={TESTIMONIAL_FIELDS}
            values={form}
            onChange={onFormChange}
            onSubmit={submitCreate}
            onCancel={() => setCreating(false)}
            busy={formBusy}
            error={formError}
            submitLabel="Créer"
          />
        </div>
      )}

      <div className="admin_filter">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            className={`admin_filter_btn ${filter === f.key ? "admin_filter_btn_active" : ""}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
        <span className="admin_count">{rows.length} affiché(s)</span>
      </div>

      {error && <p className="admin_error">{error}</p>}
      {fetchError && <p className="admin_error">Impossible de charger les témoignages.</p>}
      {loading && all.length === 0 && <p className="admin_empty">Chargement…</p>}
      {loading && all.length > 0 && <p className="admin_field_hint">Actualisation…</p>}

      <ul className="admin_list">
        {rows.map((testimonial) => (
          <li key={testimonial.id} className="admin_card">
            <div className="admin_testimonial_head">
              <span className="admin_row_label">
                {testimonial.author}
                <span
                  className={`admin_badge ${testimonial.is_published ? "admin_badge_success" : "admin_badge_news"}`}
                >
                  {testimonial.is_published ? "Publié" : "En attente"}
                </span>
              </span>
              {testimonial.school_level && (
                <span className="admin_field_hint">{testimonial.school_level}</span>
              )}
            </div>

            <p className="admin_testimonial_content">{testimonial.content}</p>

            <div className="admin_row_actions">
              {!testimonial.is_published && (
                <button
                  type="button"
                  className="admin_btn admin_btn_primary"
                  onClick={() => publish(testimonial.id)}
                  disabled={busyId === testimonial.id}
                >
                  {busyId === testimonial.id ? "…" : "Valider"}
                </button>
              )}
              <button
                type="button"
                className="admin_btn admin_btn_danger"
                onClick={() => setToDelete(testimonial)}
                disabled={busyId === testimonial.id}
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
        {!loading && rows.length === 0 && (
          <li className="admin_empty">Aucun témoignage dans cette vue.</li>
        )}
      </ul>

      <ConfirmDialog
        open={toDelete !== null}
        title="Supprimer définitivement ?"
        message={
          toDelete
            ? `Le témoignage de « ${toDelete.author} » sera supprimé définitivement. Cette action est irréversible.`
            : ""
        }
        confirmLabel="Supprimer définitivement"
        busy={busyId !== null}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}
