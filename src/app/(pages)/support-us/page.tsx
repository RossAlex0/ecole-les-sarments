import type { Metadata } from "next";
import SarmentsText from "@/components/ui/sarmentsText/SarmentsText";
import SupportHero from "@/components/layout/support/support-hero/SupportHero";
import SupportFeature from "@/components/layout/support/support-feature/SupportFeature";
import SupportProjects from "@/components/layout/support/support-projects/SupportProjects";
import SupportVolunteer from "@/components/layout/support/support-volunteer/SupportVolunteer";
import SupportTax from "@/components/layout/support/support-tax/SupportTax";
import SupportTrust from "@/components/layout/support/support-trust/SupportTrust";
import { HELLOASSO_URL, PDF_LEGS_URL } from "@/components/layout/support/supportLinks";

export const metadata: Metadata = {
  title: "Soutenir l'école — École Les Sarments",
  description:
    "Soutenez l'école Les Sarments à Toulouse : parrainage d'un enfant, dons défiscalisés (IFI, IS, IR), legs et bénévolat. Contribuez à un projet éducatif indépendant.",
};

export default function SupportPage() {
  return (
    <section style={{ paddingTop: "10vh" }}>
      <SupportHero />

      <SupportFeature
        title="Parrainer un enfant"
        image={{
          src: "/image/parc-children.webp",
          alt: "Un enfant de l'école Les Sarments souriant dans la cour de récréation",
        }}
        cta={{ label: "Parrainer un enfant", href: HELLOASSO_URL }}
        priority
      >
        <SarmentsText format="text">
          Les frais de scolarité, d&apos;un montant moyen de 235 € par mois, ne couvrent qu&apos;une
          partie du coût réel de l&apos;enseignement, estimé à 370 € mensuels par élève. Afin de
          soutenir le développement de l&apos;école, nous recherchons 80 parrains engagés. Par votre
          soutien, vous pouvez contribuer à financer tout ou partie de cette différence et
          participer concrètement à l&apos;éducation des enfants des Sarments.
        </SarmentsText>
      </SupportFeature>

      <SupportProjects />

      <SupportVolunteer />

      <SupportTax />

      <SupportFeature
        title={"Connaissez-vous le dispositif LEGS ?"}
        image={{
          src: "/image/legs.webp",
          alt: "Enfants de l'école Les Sarments jouant ensemble",
        }}
        cta={{ label: "En savoir plus", href: PDF_LEGS_URL }}
        footnote="*Les chiffres indiqués sont indicatifs. Ils sont à préciser en fonction de votre situation personnelle. Nous sommes à votre écoute pour en discuter plus en détail."
      >
        <SarmentsText format="text">
          En l&apos;absence d&apos;héritier direct, vous pouvez soutenir une association sans
          pénaliser financièrement vos héritiers.
        </SarmentsText>
        <SarmentsText format="text">
          Par exemple* : si vous léguez 100 000 € à vos neveux, ceux-ci doivent reverser environ 60
          % à l&apos;État, percevant ainsi 40 000 €. En faisant un legs à l&apos;école, vos neveux
          conservent 40 000 € et vous offrez 36 000 € à l&apos;école sur la part reversée à
          l&apos;État.
        </SarmentsText>
      </SupportFeature>

      <SupportTrust />
    </section>
  );
}
