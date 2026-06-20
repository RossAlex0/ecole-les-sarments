"use client";

import { useCallback, useMemo, useState } from "react";
import SarmentsText from "@/components/ui/sarmentsText/SarmentsText";
import SarmentsButton from "@/components/ui/sarmentsButton/SarmentsButton";
import AdmissionModal from "@/components/block/admission-modal/AdmissionModal";
import { findNavigationLink } from "@/utils/navigation/navigation";
import "./hero.css";

export default function Hero() {
  const linkSchool = useMemo(() => findNavigationLink("Notre école"), []);
  const [admissionOpen, setAdmissionOpen] = useState(false);
  const openAdmission = useCallback(() => setAdmissionOpen(true), []);
  const closeAdmission = useCallback(() => setAdmissionOpen(false), []);

  return (
    <section className="hero">
      <div className="hero_text">
        <SarmentsText format="fat-title">
          <span>
            L&apos;école Les Sarments
            <br />
            école maternelle & primaire
            <br />
            libre à Toulouse
          </span>
        </SarmentsText>
        <SarmentsButton href={linkSchool}>Découvrir notre pédagogie</SarmentsButton>
        <SarmentsButton theme="transparent" onClick={openAdmission}>
          Faire une demande d&apos;admission
        </SarmentsButton>
      </div>

      <AdmissionModal open={admissionOpen} onClose={closeAdmission} />
    </section>
  );
}
