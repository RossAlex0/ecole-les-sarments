"use client";

import { useCallback, useMemo, useState } from "react";
import useFetch from "@/utils/hooks/useFetch";
import ResourceForm from "@/components/block/admin-manager/resource-form/ResourceForm";
import ConfirmDialog from "@/components/block/admin-manager/confirm-dialog/ConfirmDialog";
import {
  type FieldDef,
  type FormValues,
  initialValues,
  rowToValues,
  valuesToPayload,
} from "@/utils/form/fields";

export type AdminRow = { id: string } & Record<string, unknown>;

export type BadgeTone = "event" | "news" | "success" | "danger";
export type RowBadge = { label: string; tone: BadgeTone };

type ResourceManagerProps = {
  /** API endpoint to read the list from (GET -> controller -> service). */
  apiUrl: string;
  fields: FieldDef[];
  /** Row fields joined to build the displayed label. */
  labelFields: string[];
  addLabel: string;
  onCreate: (payload: Record<string, unknown>) => Promise<unknown>;
  onUpdate: (id: string, payload: Record<string, unknown>) => Promise<unknown>;
  onDelete: (id: string) => Promise<unknown>;
  /** Optional badge shown next to each row label. */
  getBadge?: (row: AdminRow) => RowBadge | null;
};

export default function ResourceManager({
  apiUrl,
  fields,
  labelFields,
  addLabel,
  onCreate,
  onUpdate,
  onDelete,
  getBadge,
}: ResourceManagerProps) {
  const empty = useMemo(() => initialValues(fields), [fields]);

  // Read through the API (route -> controller -> service). `version` bumps after
  // a mutation to re-fetch (the changed URL bypasses the useFetch cache).
  const [version, setVersion] = useState(0);
  const { data, loading, error: fetchError } = useFetch<AdminRow[]>(`${apiUrl}?v=${version}`);
  const rows = useMemo(() => data ?? [], [data]);

  const [mode, setMode] = useState<"idle" | "create" | "edit">("idle");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [values, setValues] = useState<FormValues>(empty);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toDelete, setToDelete] = useState<AdminRow | null>(null);

  const labelOf = useCallback(
    (row: AdminRow) =>
      labelFields
        .map((field) => row[field])
        .filter(Boolean)
        .join(" ") || "(sans titre)",
    [labelFields],
  );

  const onChange = useCallback((name: string, value: string | boolean) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const startCreate = useCallback(() => {
    setMode("create");
    setEditingId(null);
    setValues(empty);
    setError(null);
  }, [empty]);

  const startEdit = useCallback(
    (row: AdminRow) => {
      setMode("edit");
      setEditingId(row.id);
      setValues(rowToValues(row, fields));
      setError(null);
    },
    [fields],
  );

  const cancel = useCallback(() => {
    setMode("idle");
    setEditingId(null);
    setError(null);
  }, []);

  const submit = useCallback(
    async (formValues: FormValues) => {
      setBusy(true);
      setError(null);
      try {
        const payload = valuesToPayload(formValues, fields);
        if (mode === "edit" && editingId) await onUpdate(editingId, payload);
        else await onCreate(payload);
        setMode("idle");
        setEditingId(null);
        setValues(empty);
        setVersion((v) => v + 1);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Une erreur est survenue");
      } finally {
        setBusy(false);
      }
    },
    [fields, mode, editingId, onCreate, onUpdate, empty],
  );

  const confirmDelete = useCallback(async () => {
    if (!toDelete) return;
    setBusy(true);
    setError(null);
    try {
      await onDelete(toDelete.id);
      setToDelete(null);
      setVersion((v) => v + 1);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Une erreur est survenue");
    } finally {
      setBusy(false);
    }
  }, [toDelete, onDelete]);

  return (
    <div className="admin_manager">
      <div className="admin_manager_head">
        <span className="admin_count">{rows.length} élément(s)</span>
        {mode !== "create" && (
          <button type="button" className="admin_btn admin_btn_primary" onClick={startCreate}>
            {addLabel}
          </button>
        )}
      </div>

      {mode === "create" && (
        <div className="admin_card admin_card_form">
          <h2 className="admin_card_title">Ajouter</h2>
          <ResourceForm
            fields={fields}
            values={values}
            onChange={onChange}
            onSubmit={submit}
            onCancel={cancel}
            busy={busy}
            error={error}
            submitLabel="Créer"
          />
        </div>
      )}

      {fetchError && <p className="admin_error">Impossible de charger les données.</p>}
      {loading && rows.length === 0 && <p className="admin_empty">Chargement…</p>}
      {loading && rows.length > 0 && <p className="admin_field_hint">Actualisation…</p>}

      <ul className="admin_list">
        {rows.map((row) => (
          <li key={row.id} className="admin_card">
            {mode === "edit" && editingId === row.id ? (
              <>
                <h2 className="admin_card_title">Modifier — {labelOf(row)}</h2>
                <ResourceForm
                  fields={fields}
                  values={values}
                  onChange={onChange}
                  onSubmit={submit}
                  onCancel={cancel}
                  busy={busy}
                  error={error}
                  submitLabel="Enregistrer"
                />
              </>
            ) : (
              <div className="admin_row">
                <span className="admin_row_label">
                  {labelOf(row)}
                  {(() => {
                    const badge = getBadge?.(row);
                    return badge ? (
                      <span className={`admin_badge admin_badge_${badge.tone}`}>{badge.label}</span>
                    ) : null;
                  })()}
                </span>
                <div className="admin_row_actions">
                  <button
                    type="button"
                    className="admin_btn admin_btn_ghost"
                    onClick={() => startEdit(row)}
                    disabled={busy}
                  >
                    Modifier
                  </button>
                  <button
                    type="button"
                    className="admin_btn admin_btn_danger"
                    onClick={() => setToDelete(row)}
                    disabled={busy}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
        {!loading && rows.length === 0 && (
          <li className="admin_empty">Aucun élément pour le moment.</li>
        )}
      </ul>

      <ConfirmDialog
        open={toDelete !== null}
        title="Supprimer définitivement ?"
        message={
          toDelete
            ? `« ${labelOf(toDelete)} » sera supprimé définitivement. Cette action est irréversible.`
            : ""
        }
        confirmLabel="Supprimer définitivement"
        busy={busy}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}
