export const CONTACT_EMAIL = "gestion.les.sarments.31@gmail.com";

/** Builds a mailto link to the school address with an optional prefilled subject. */
export const contactMailto = (subject = "Demande d'information — École Les Sarments"): string =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
