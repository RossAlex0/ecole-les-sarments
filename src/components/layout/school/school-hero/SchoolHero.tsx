"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import SarmentsText from "@/components/ui/sarmentsText/SarmentsText";
import SarmentsButton from "@/components/ui/sarmentsButton/SarmentsButton";
import AdmissionModal from "@/components/block/admission-modal/AdmissionModal";
import "./schoolHero.css";

export default function SchoolHero() {
  const [admissionOpen, setAdmissionOpen] = useState(false);
  const openAdmission = useCallback(() => setAdmissionOpen(true), []);
  const closeAdmission = useCallback(() => setAdmissionOpen(false), []);

  return (
    <section className="school_hero">
      <div className="school_hero_content">
        <SarmentsText format="fat-title">Notre école</SarmentsText>
        <SarmentsText format="view" className="school_hero_text">
          L&apos;école les Sarments de Toulouse a été créée en 2018. Elle est indépendante et
          choisit ses enseignants, ses programmes, ses activités à partir de ses propres supports
          pédagogiques. Aconfessionnelle, elle transmet aux élèves les savoirs fondamentaux en
          s&apos;appuyant sur notre héritage gréco-romain et judéo-chrétien. Le port de
          l&apos;uniforme, symbole de simplicité et d&apos;unité, favorise la cohésion de tous les
          élèves.
        </SarmentsText>

        <div className="school_hero_buttons">
          <SarmentsButton hasBorder theme="dark" onClick={openAdmission}>
            Demande d&apos;admission
          </SarmentsButton>
          <SarmentsButton href="#informations" hasBorder theme="dark">
            Informations pratiques
          </SarmentsButton>
        </div>
      </div>

      <AdmissionModal open={admissionOpen} onClose={closeAdmission} />

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
