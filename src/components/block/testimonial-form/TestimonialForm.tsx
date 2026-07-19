"use client";

import { useCallback, useState } from "react";
import Modal from "@/components/ui/modal/Modal";
import SarmentsButton from "@/components/ui/sarmentsButton/SarmentsButton";
import SarmentsText from "@/components/ui/sarmentsText/SarmentsText";
import { useCreateTestimonial } from "@/utils/hooks/testimonials/useCreateTestimonial";
import "./testimonialForm.css";

// Mirror the server-side Zod bounds (testimonial.schema.ts) to fail fast client-side.
const MAX_AUTHOR = 120;
const MAX_LEVEL = 80;
const MAX_CONTENT = 5000;

const EMPTY_FORM = { author: "", school_level: "", content: "" };

export default function TestimonialForm() {
  const createTestimonial = useCreateTestimonial();

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const openModal = useCallback(() => setOpen(true), []);

  // Reset everything when the modal closes so it reopens clean.
  const closeModal = useCallback(() => {
    setOpen(false);
    setForm(EMPTY_FORM);
    setError(null);
    setDone(false);
    setSubmitting(false);
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(null);

      const author = form.author.trim();
      const content = form.content.trim();
      const schoolLevel = form.school_level.trim();

      if (!author || !content) {
        setError("Merci de renseigner votre nom et votre témoignage.");
        return;
      }

      setSubmitting(true);
      try {
        await createTestimonial({
          author,
          content,
          school_level: schoolLevel || null,
        });
        setDone(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Une erreur est survenue, réessayez.");
      } finally {
        setSubmitting(false);
      }
    },
    [form, createTestimonial],
  );

  return (
    <>
      <SarmentsButton theme="dark" hasBorder onClick={openModal}>
        Partager mon témoignage
      </SarmentsButton>

      <Modal open={open} onClose={closeModal} labelledBy="testimonial_form_title">
        {done ? (
          <div className="testimonial_form_done">
            <SarmentsText format="title" color="blue" id="testimonial_form_title">
              Merci pour votre témoignage&nbsp;!
            </SarmentsText>
            <SarmentsText format="text" color="blue">
              Il a bien été envoyé et sera publié après validation par l&apos;école.
            </SarmentsText>
            <SarmentsButton theme="light" onClick={closeModal}>
              Fermer
            </SarmentsButton>
          </div>
        ) : (
          <form className="testimonial_form" onSubmit={handleSubmit} noValidate>
            <SarmentsText format="title" color="blue" id="testimonial_form_title">
              Partager mon témoignage
            </SarmentsText>
            <SarmentsText format="text" color="blue" className="testimonial_form_intro">
              Parents des Sarments, partagez votre expérience. Votre message sera relu avant
              publication.
            </SarmentsText>

            <label className="testimonial_form_field">
              <span className="testimonial_form_label">Votre nom *</span>
              <input
                type="text"
                name="author"
                value={form.author}
                onChange={handleChange}
                maxLength={MAX_AUTHOR}
                required
                autoComplete="name"
                placeholder="Ex. Marie D."
                className="testimonial_form_input"
              />
            </label>

            <label className="testimonial_form_field">
              <span className="testimonial_form_label">Classe de votre enfant (facultatif)</span>
              <input
                type="text"
                name="school_level"
                value={form.school_level}
                onChange={handleChange}
                maxLength={MAX_LEVEL}
                placeholder="Ex. parent de CE2"
                className="testimonial_form_input"
              />
            </label>

            <label className="testimonial_form_field">
              <span className="testimonial_form_label">Votre témoignage *</span>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                maxLength={MAX_CONTENT}
                required
                rows={6}
                placeholder="Racontez votre expérience à l'école Les Sarments…"
                className="testimonial_form_input testimonial_form_textarea"
              />
            </label>

            {error && (
              <SarmentsText format="small" color="danger" className="testimonial_form_error">
                {error}
              </SarmentsText>
            )}

            <SarmentsButton theme="light" type="submit" disabled={submitting}>
              {submitting ? "Envoi…" : "Envoyer mon témoignage"}
            </SarmentsButton>
          </form>
        )}
      </Modal>
    </>
  );
}
