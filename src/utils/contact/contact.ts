export const CONTACT_EMAIL = "dirtoulouselessarments@gmail.com";

/** Builds a mailto link to the school address with an optional prefilled subject. */
export const contactMailto = (subject = "Demande d'information — École Les Sarments"): string =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
