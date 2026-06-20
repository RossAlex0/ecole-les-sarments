import Image from "next/image";
import SarmentsText from "@/components/ui/sarmentsText/SarmentsText";
import SarmentsButton from "@/components/ui/sarmentsButton/SarmentsButton";
import { HELLOASSO_URL, PDF_IFI_URL } from "../supportLinks";
import "./supportTax.css";

type TaxBenefit = {
  code: string;
  rate: string;
  tax: string;
  example: string;
  limit: string;
  href: string;
  image: { src: string; alt: string };
};

const BENEFITS: TaxBenefit[] = [
  {
    code: "Don IFI",
    rate: "75 %",
    tax: "Impôt sur la fortune immobilière",
    example: "Un don de 5 000 € ne vous coûte que 1 250 €",
    limit: "dans la limite de 50 000 €",
    href: PDF_IFI_URL,
    image: { src: "/image/ifi.webp", alt: "Chorale d'élèves des Sarments" },
  },
  {
    code: "Don IS",
    rate: "60 %",
    tax: "Impôt sur les sociétés",
    example: "Un don de 2 500 € ne vous coûte que 1 000 €",
    limit:
      "Dans la limite de 20 000 € ou de 0,5 % du chiffre d'affaires si ce dernier montant est plus élevé",
    href: HELLOASSO_URL,
    image: { src: "/image/is.webp", alt: "Élèves des Sarments travaillant en classe" },
  },
  {
    code: "Don IR",
    rate: "66 %",
    tax: "Impôt sur le revenu",
    example: "Un don de 1 000 € ne vous coûte que 340 €",
    limit: "Dans la limite de 20 % de votre revenu imposable",
    href: HELLOASSO_URL,
    image: { src: "/image/ir.webp", alt: "Chorale d'élèves des Sarments en concert" },
  },
];

export default function SupportTax() {
  return (
    <section className="support_tax">
      <SarmentsText format="title" className="support_tax_heading">
        Avantages fiscaux
      </SarmentsText>

      <div className="support_tax_rows">
        {BENEFITS.map((benefit) => (
          <article key={benefit.code} className="support_tax_row">
            <div className="support_tax_image">
              <Image
                src={benefit.image.src}
                alt={benefit.image.alt}
                fill
                sizes="(max-width: 900px) 100vw, 420px"
                loading="lazy"
              />
            </div>

            <div className="support_tax_card">
              <div className="support_tax_badge">
                <div>
                  <SarmentsText format="semi-title">{benefit.rate}</SarmentsText>
                  <SarmentsText format="small">déductibles d&apos;impôt</SarmentsText>
                </div>
              </div>

              <SarmentsText format="title" color="blue">
                {benefit.code}
              </SarmentsText>
              <SarmentsText format="view" color="blue">
                {benefit.tax}
              </SarmentsText>
              <SarmentsText format="view" color="blue">
                {benefit.example}
              </SarmentsText>
              <SarmentsText format="small" color="muted" className="support_tax_limit">
                {benefit.limit}
              </SarmentsText>

              <SarmentsButton theme="dark" href={benefit.href}>
                En savoir plus
              </SarmentsButton>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
