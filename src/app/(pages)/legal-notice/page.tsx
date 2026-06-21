import type { Metadata } from "next";
import LegalLayout from "@/components/layout/legal/LegalLayout";
import { CONTACT_EMAIL } from "@/utils/contact/contact";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site de l'école Les Sarments à Toulouse : éditeur, hébergeur et directeur de la publication.",
  alternates: { canonical: "/legal-notice" },
};

export default function LegalNoticePage() {
  return (
    <LegalLayout title="Mentions légales" updatedAt="21 juin 2026">
      <p>
        Conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie
        numérique (LCEN), les informations suivantes sont portées à la connaissance des visiteurs du
        site.
      </p>

      <h2>1. Éditeur du site</h2>
      <p>
        Le site est édité par l&apos;association Ecole privée hors contrat Les sarments, association
        régie par la loi du 1<sup>er</sup> juillet 1901.
      </p>
      <ul>
        <li>Siège social : 20 avenue Didier Daurat, 31400 Toulouse, France</li>
        <li>Numéro UAI : 0312979V</li>
        <li>
          Adresse e-mail : <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </li>
        <li>
          Téléphone : <a href="tel:+33769413544">07 69 41 35 44</a>
        </li>
      </ul>

      <h2>2. Directeur de la publication</h2>
      <p>
        Le directeur de la publication est Mme.Armelle Da Rocha , en sa qualité de représentant(e)
        légal(e) de l&apos;association.
      </p>

      <h2>3. Hébergement</h2>
      <p>Le site est hébergé par :</p>
      <ul>
        <li>Vercel Inc.</li>
        <li>340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</li>
        <li>
          Site web :{" "}
          <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
            vercel.com
          </a>
        </li>
      </ul>
      <p>
        Les données du site (témoignages, contenus du back-office) sont stockées via Supabase
        (hébergement de base de données). Voir la{" "}
        <a href="/privacy-policy">politique de confidentialité</a>.
      </p>

      <h2>4. Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble des éléments du site (textes, images, logo, charte graphique, structure) est
        protégé par le droit de la propriété intellectuelle et demeure la propriété de
        l&apos;association éditrice, sauf mention contraire. Toute reproduction, représentation ou
        diffusion, totale ou partielle, sans autorisation écrite préalable, est interdite et
        constituerait une contrefaçon.
      </p>

      <h2>5. Données personnelles</h2>
      <p>
        Le traitement des données personnelles est détaillé dans notre{" "}
        <a href="/privacy-policy">politique de confidentialité</a>. Conformément au RGPD et à la loi
        « Informatique et Libertés », vous disposez de droits d&apos;accès, de rectification et de
        suppression de vos données, exerçables à l&apos;adresse{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>

      <h2>6. Liens hypertextes</h2>
      <p>
        Le site peut contenir des liens vers des sites tiers (notamment des contenus intégrés
        YouTube et Google Maps). L&apos;association éditrice n&apos;exerce aucun contrôle sur ces
        sites et décline toute responsabilité quant à leur contenu.
      </p>

      <h2>7. Responsabilité</h2>
      <p>
        L&apos;association s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des
        informations diffusées, sans pouvoir en garantir l&apos;exhaustivité. Elle ne saurait être
        tenue responsable des erreurs, d&apos;une absence de disponibilité du site, ou de la
        présence de virus.
      </p>

      <h2>8. Droit applicable</h2>
      <p>
        Les présentes mentions légales sont régies par le droit français. Tout litige relatif à
        l&apos;utilisation du site relève de la compétence des tribunaux français.
      </p>
    </LegalLayout>
  );
}
