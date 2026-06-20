import type { FieldDef } from "./fields";

export const TEAM_FIELDS: FieldDef[] = [
  { name: "first_name", label: "Prénom", type: "text", required: true },
  { name: "last_name", label: "Nom", type: "text", required: true },
  {
    name: "role",
    label: "Rôle / fonction",
    type: "text",
    required: true,
    hint: "Ex. : Enseignante des CM1 et CM2.",
  },
  {
    name: "short_bio",
    label: "Courte biographie",
    type: "textarea",
    hint: "Optionnel — quelques lignes de présentation.",
  },
  {
    name: "image_url",
    label: "Photo",
    type: "image",
    folder: "team",
    pathField: "image_path",
    hint: "Téléversez une photo (WebP de préférence). En modification, la nouvelle remplace l'ancienne au même emplacement.",
  },
  { name: "image_path", label: "", type: "hidden" },
  {
    name: "is_published",
    label: "Publié sur le site",
    type: "checkbox",
    defaultValue: true,
    hint: "Décoché = le membre est masqué du site public.",
  },
];

export const EVENT_FIELDS: FieldDef[] = [
  { name: "title", label: "Titre", type: "text", required: true },
  {
    name: "slug",
    label: "Slug (identifiant URL)",
    type: "text",
    required: true,
    hint: "Identifiant unique en minuscules, sans espaces. Ex. : portes-ouvertes-2026.",
  },
  {
    name: "short_description",
    label: "Description courte",
    type: "textarea",
    required: true,
    hint: "Résumé affiché dans les listes et les cartes.",
  },
  { name: "description", label: "Description complète", type: "textarea", required: true },
  { name: "start_at", label: "Date de début", type: "datetime", required: true },
  { name: "end_at", label: "Date de fin", type: "datetime", hint: "Optionnel." },
  { name: "location", label: "Lieu", type: "text", hint: "Optionnel." },
  {
    name: "image_url",
    label: "Image",
    type: "image",
    folder: "event",
    required: true,
    hint: "Téléversez une image pour l'événement.",
  },
  {
    name: "is_event",
    label: "Événement",
    type: "checkbox",
    defaultValue: false,
    hint: "Coché : mis en avant comme « prochain événement » et affiché en priorité. Décoché : apparaît uniquement dans la liste des actualités de la page Vie scolaire.",
  },
  {
    name: "is_published",
    label: "Publié sur le site",
    type: "checkbox",
    defaultValue: true,
    hint: "Décoché = l'événement est masqué du site public.",
  },
];

export const TESTIMONIAL_FIELDS: FieldDef[] = [
  {
    name: "author",
    label: "Auteur",
    type: "text",
    required: true,
    hint: "Nom ou intitulé (ex. : Une maman de CE2).",
  },
  { name: "content", label: "Témoignage", type: "textarea", required: true },
  {
    name: "school_level",
    label: "Niveau scolaire",
    type: "text",
    hint: "Optionnel (ex. : Maternelle, CM1…).",
  },
  { name: "is_published", label: "Publié sur le site", type: "checkbox", defaultValue: true },
];
