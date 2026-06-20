import SarmentsButton from "@/components/ui/sarmentsButton/SarmentsButton";
import SarmentsText from "@/components/ui/sarmentsText/SarmentsText";

import "./cardInfo.css";

export type CardInfoProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  text: string;
  label?: string;
  hideBtn?: boolean;
};

export default function CardInfo({ title, text, label, hideBtn, ...props }: CardInfoProps) {
  return (
    <div {...props} className={`card_support ${props.className ?? ""}`.trim()}>
      <SarmentsText format="title">{title}</SarmentsText>
      <SarmentsText format="text">{text}</SarmentsText>
      {hideBtn ? undefined : (
        <SarmentsButton href="/" hasBorder className="card_support_btn">
          {label ?? "Nous soutenir"}
        </SarmentsButton>
      )}
    </div>
  );
}
