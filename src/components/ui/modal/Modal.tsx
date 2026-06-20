"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";
import "./modal.css";

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  /** id of the element labelling the dialog (for accessibility) */
  labelledBy?: string;
  className?: string;
};

export default function Modal({ open, onClose, children, labelledBy, className }: ModalProps) {
  // Close on Escape and lock body scroll while the modal is open.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  // No portal target during SSR; the modal only opens after hydration on interaction.
  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="modal_overlay" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className={`modal_panel ${className ?? ""}`.trim()}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="modal_close" onClick={onClose} aria-label="Fermer">
          <IoClose />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
