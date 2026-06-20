"use client";

import Modal from "@/components/ui/modal/Modal";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  busy?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirmer",
  busy = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={onCancel} className="admin_confirm_modal">
      <div className="admin_confirm">
        <h2 className="admin_confirm_title">{title}</h2>
        <p className="admin_confirm_message">{message}</p>
        <div className="admin_confirm_actions">
          <button
            type="button"
            className="admin_btn admin_btn_ghost"
            onClick={onCancel}
            disabled={busy}
          >
            Annuler
          </button>
          <button
            type="button"
            className="admin_btn admin_btn_danger"
            onClick={onConfirm}
            disabled={busy}
          >
            {busy ? "Suppression…" : confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
}
