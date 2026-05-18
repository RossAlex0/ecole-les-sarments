import SarmentsText from "@/components/ui/sarmentsText/SarmentsText";
import SarmentsButton from "@/components/ui/sarmentsButton/SarmentsButton";
import { findNavigationLink } from "@/utils/navigation/navigation";
import React from "react";
import "./hero.css";

export default function Hero() {
  const linkSchool = React.useMemo(() => {
    return findNavigationLink("Notre école");
  }, []);
  return (
    <section className="hero">
      <div className="hero_text">
        <SarmentsText format="fat-title">
          <span>
            L&apos;école Les Sarments
            <br />
            école maternelle et primaire
            <br />
            hors contrat
          </span>
        </SarmentsText>
        <SarmentsText format="text">Voir phrase avec Anne</SarmentsText>
        <SarmentsButton href={linkSchool}>Découvrir l&apos;école</SarmentsButton>
      </div>
    </section>
  );
}
