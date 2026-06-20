import Image from "next/image";
import SarmentsText from "@/components/ui/sarmentsText/SarmentsText";
import SarmentsButton from "@/components/ui/sarmentsButton/SarmentsButton";
import "./supportFeature.css";

type SupportFeatureProps = {
  title: string;
  image: { src: string; alt: string };
  cta: { label: string; href: string };
  /** When true, the image sits on the left and the card on the right. */
  reverse?: boolean;
  /** Set on the first above-the-fold image only (LCP). */
  priority?: boolean;
  footnote?: string;
  children: React.ReactNode;
};

export default function SupportFeature({
  title,
  image,
  cta,
  reverse = false,
  priority = false,
  footnote,
  children,
}: SupportFeatureProps) {
  return (
    <section className="support_feature">
      <div className={`support_feature_inner ${reverse ? "support_feature_reverse" : ""}`.trim()}>
        <div className="support_feature_card">
          <SarmentsText format="title">{title}</SarmentsText>
          <div className="support_feature_body">{children}</div>
          {footnote && (
            <SarmentsText format="small" className="support_feature_footnote">
              {footnote}
            </SarmentsText>
          )}
          <SarmentsButton theme="light" href={cta.href} hasBorder>
            {cta.label}
          </SarmentsButton>
        </div>

        <div className="support_feature_image">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 900px) 100vw, 600px"
            priority={priority}
            loading={priority ? undefined : "lazy"}
          />
        </div>
      </div>
    </section>
  );
}
