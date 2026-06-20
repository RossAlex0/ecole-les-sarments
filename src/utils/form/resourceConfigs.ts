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
    hint: "Téléversez une photo (WebP de préférence). Si l'image est trop lourde et que vous n'arrivez pas à créer ou modifier la photo, vous pouvez essayer de convertir votre image sur un site comme https://squoosh.app/.",
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
    hint: "Résumé affiché par défaut dans les listes et les cartes.",
  },
  {
    name: "description",
    label: "Description complète",
    hint: "Texte complet affiché lorsqu'un visiteur clique sur « Voir plus ».",
    type: "textarea",
    required: true,
  },
  {
    name: "start_at",
    label: "Date de début",
    hint: "Attention, la date ne peut être inférieure à la date d'aujourd'hui. Cette date servira de référence à un scheduler pour nettoyer les événements de plus de 10 mois.",
    type: "datetime",
    required: true,
  },
  { name: "end_at", label: "Date de fin", type: "datetime", hint: "Optionnel." },
  { name: "location", label: "Lieu", type: "text", hint: "Optionnel." },
  {
    name: "image_url",
    label: "Image",
    type: "image",
    folder: "event",
    required: true,
    hint: "Téléversez une photo (WebP de préférence). Si l'image est trop lourde et que vous n'arrivez pas à créer ou modifier la photo, vous pouvez essayer de convertir votre image sur un site comme https://squoosh.app/.",
  },
  {
    name: "is_event",
    label: "Événement",
    type: "checkbox",
    defaultValue: false,
    hint: "Coché : mis en avant et affiché sur la page d'accueil, et en grand sur la page Vie scolaire. Décoché : apparaît uniquement dans la liste des actualités de la page Vie scolaire.",
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
    hint: "Nom ou intitulé (ex. : Une maman de CE2 / John Doe).",
  },
  { name: "content", label: "Témoignage", type: "textarea", required: true },
  {
    name: "school_level",
    label: "Niveau scolaire",
    type: "text",
    hint: "Optionnel (ex. : Maternelle, CM1…).",
  },
  {
    name: "is_published",
    label: "Publié sur le site",
    type: "checkbox",
    defaultValue: true,
    hint: "Décoché = le témoignage est masqué du site public. Il sera possible de le rendre public par la suite.",
  },
];
