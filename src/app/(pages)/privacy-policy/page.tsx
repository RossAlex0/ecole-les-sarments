import type { Metadata } from "next";
import LegalLayout from "@/components/layout/legal/LegalLayout";
import { CONTACT_EMAIL } from "@/utils/contact/contact";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité de l'école Les Sarments : données collectées, finalités, durées de conservation et vos droits (RGPD).",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Politique de confidentialité" updatedAt="21 juin 2026">
      <p>
        La présente politique décrit la manière dont l&apos;école Les Sarments collecte et traite
        vos données personnelles, conformément au Règlement général sur la protection des données
        (RGPD) et à la loi « Informatique et Libertés ».
      </p>

      <h2>1. Responsable du traitement</h2>
      <p>
        Le responsable du traitement est l&apos;association Ecole privée hors contrat Les sarments,
        dont le siège est situé 20 avenue Didier Daurat, 31400 Toulouse. Pour toute question
        relative à vos données : <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>

      <h2>2. Données collectées et finalités</h2>
      <p>Le site collecte un minimum de données, uniquement lorsque vous les fournissez :</p>
      <ul>
        <li>
          <strong>Témoignages</strong> : nom ou pseudonyme, contenu du témoignage et, le cas
          échéant, niveau scolaire. Finalité : afficher des témoignages sur le site, après
          validation par l&apos;école.
        </li>
        <li>
          <strong>Demande de contact ou d&apos;admission</strong> : lorsque vous nous écrivez par
          e-mail, nous traitons les informations que vous nous transmettez afin de répondre à votre
          demande. Ces échanges ne sont pas stockés via un formulaire sur le site.
        </li>
      </ul>
      <p>
        Le site n&apos;utilise{" "}
        <strong>aucun outil de mesure d&apos;audience ni cookie de suivi publicitaire</strong>.
      </p>

      <h2>3. Base légale</h2>
      <ul>
        <li>
          Témoignages : votre <strong>consentement</strong> (soumission volontaire), retirable à
          tout moment.
        </li>
        <li>
          Réponses à vos demandes : l&apos;<strong>intérêt légitime</strong> de l&apos;école à
          communiquer avec les familles.
        </li>
      </ul>

      <h2>4. Durée de conservation</h2>
      <ul>
        <li>
          Témoignages publiés : conservés tant qu&apos;ils sont affichés, et supprimés sur simple
          demande.
        </li>
      </ul>

      <h2>5. Destinataires et sous-traitants</h2>
      <p>
        Vos données ne sont ni vendues ni cédées. Elles sont uniquement accessibles à l&apos;équipe
        de l&apos;école et aux prestataires techniques nécessaires au fonctionnement du site :
      </p>
      <ul>
        <li>
          <strong>Supabase</strong> — hébergement de la base de données (région d&apos;hébergement :
          Europe (Francfort)).
        </li>
        <li>
          <strong>Vercel Inc.</strong> — hébergement du site (États-Unis).
        </li>
      </ul>

      <h2>6. Transferts hors Union européenne</h2>
      <p>
        L&apos;hébergement du site par Vercel (États-Unis) peut impliquer un transfert de données
        hors de l&apos;Union européenne, encadré par les garanties appropriées prévues par le RGPD
        (clauses contractuelles types).
      </p>

      <h2>7. Cookies</h2>
      <ul>
        <li>
          <strong>Cookie de session</strong> : strictement nécessaire, utilisé uniquement pour
          l&apos;authentification de l&apos;espace d&apos;administration (back-office). Il ne
          concerne pas les visiteurs du site public.
        </li>
        <li>
          <strong>Cookies tiers</strong> : l&apos;affichage des contenus intégrés (vidéo YouTube,
          carte Google Maps) peut entraîner le dépôt de cookies par ces services, soumis à leurs
          propres politiques de confidentialité.
        </li>
      </ul>

      <h2>8. Vos droits</h2>
      <p>
        Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement,
        d&apos;opposition et de limitation du traitement de vos données. Pour les exercer, écrivez à{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
      <p>
        Vous pouvez également introduire une réclamation auprès de la CNIL (Commission nationale de
        l&apos;informatique et des libertés) :{" "}
        <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
          www.cnil.fr
        </a>
        .
      </p>

      <h2>9. Modifications</h2>
      <p>
        La présente politique peut être mise à jour. La date de dernière mise à jour est indiquée en
        haut de page.
      </p>
    </LegalLayout>
  );
}
