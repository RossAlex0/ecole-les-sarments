import SarmentsText from "@/components/ui/sarmentsText/SarmentsText";
import "./supportHero.css";

export default function SupportHero() {
  return (
    <header className="support_hero">
      <SarmentsText format="fat-title">Comment soutenir l&apos;école ?</SarmentsText>
      <SarmentsText format="text" className="support_hero_lead">
        Une école indépendante portée par une communauté engagée. Soutenir Les Sarments, c&apos;est
        contribuer à faire grandir un projet éducatif vivant, que ce soit par un don, du bénévolat
        ou un engagement à nos côtés.
      </SarmentsText>
    </header>
  );
}
