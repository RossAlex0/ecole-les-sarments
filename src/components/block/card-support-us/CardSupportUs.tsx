import SarmentsButton from "@/components/ui/sarmentsButton/SarmentsButton";
import SarmentsText from "@/components/ui/sarmentsText/SarmentsText";

import "./cardSupportUs.css";

export type CardSupportUsProps = {
  title: string;
  text: string;
};

export default function CardSupportUs({ title, text }: CardSupportUsProps) {
  return (
    <div className="card_support">
      <SarmentsText format="title">{title}</SarmentsText>
      <SarmentsText format="text">{text}</SarmentsText>
      <SarmentsButton href="/" hasBorder className="card_support_btn">
        Nous soutenir
      </SarmentsButton>
    </div>
  );
}
