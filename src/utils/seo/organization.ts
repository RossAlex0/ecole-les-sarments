import { SITE_NAME, SITE_URL } from "@/utils/site";
import { CONTACT_EMAIL } from "@/utils/contact/contact";

/**
 * Schema.org EducationalOrganization for the homepage (rich results / SEO).
 * Rendered as a <script type="application/ld+json"> — all data is static.
 */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: SITE_NAME,
  alternateName: "Les Sarments",
  description:
    "École libre (hors contrat) maternelle et primaire à Toulouse : effectifs réduits, excellence et bienveillance pour l'épanouissement de chaque enfant.",
  url: SITE_URL,
  logo: `${SITE_URL}/image/image-og.png`,
  image: `${SITE_URL}/image/image-og.png`,
  email: CONTACT_EMAIL,
  telephone: "+33769413544",
  address: {
    "@type": "PostalAddress",
    streetAddress: "20 avenue Didier Daurat",
    postalCode: "31400",
    addressLocality: "Toulouse",
    addressRegion: "Occitanie",
    addressCountry: "FR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 43.56824647110625,
    longitude: 1.4900748761100928,
  },
  areaServed: "Toulouse",
  openingHours: "Mo-Fr 08:30-17:00",
  sameAs: [
    "https://www.facebook.com/profile.php?id=61587126793877",
    "https://www.instagram.com/ecole_les_sarments_toulouse/",
  ],
} as const;
