import Image from "next/image";
import SarmentsText from "@/components/ui/sarmentsText/SarmentsText";
import SarmentsButton from "@/components/ui/sarmentsButton/SarmentsButton";
import "./schoolHero.css";

export default function SchoolHero() {
  return (
    <section className="school_hero">
      <div className="school_hero_content">
        <SarmentsText format="fat-title">Notre école</SarmentsText>
        <SarmentsText format="view" className="school_hero_text">
          L&apos;école les Sarments de Toulouse a été créée en 2018. Hors contrat, elle bénéficie
          d&apos;une grande liberté pour choisir ses enseignants, ses programmes, ses activités à
          partir de ses propres supports pédagogiques. Aconfessionnelle, elle transmet aux élèves
          les savoirs fondamentaux en s&apos;appuyant sur notre héritage gréco-romain et
          judéo-chrétien. Le port de l&apos;uniforme, symbole de simplicité et d&apos;unité,
          favorise la cohésion de tous les élèves.
        </SarmentsText>

        <div className="school_hero_buttons">
          <SarmentsButton href="/admission" hasBorder theme="dark">
            Demande d&apos;admission
          </SarmentsButton>
          <SarmentsButton href="/informations" hasBorder theme="dark">
            Informations pratiques
          </SarmentsButton>
        </div>
      </div>

      <div className="school_hero_image">
        <Image
          src="/image/children-school-page.webp"
          alt="Élève écrivant au tableau"
          fill
          priority
        />
      </div>
    </section>
  );
}
