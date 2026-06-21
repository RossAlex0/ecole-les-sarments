"use client";
import Toggle from "@/components/ui/toggle/Toggle";
import { useState } from "react";

import School from "./school/School";
import PreSchool from "./pre-school/PreSchool";
import "./teachingLife.css";
import CardInfo from "@/components/block/card-info/CardInfo";
import { HELLOASSO_URL } from "../support/supportLinks";

export default function TeachingLife() {
  const [active, setActive] = useState(0);
  return (
    <div className="teaching">
      <Toggle
        options={["Découvrir la maternelle", "Découvrir la primaire"]}
        value={active}
        onChange={(i) => setActive(i)}
      />
      {active === 1 ? <School /> : <PreSchool />}
      <CardInfo
        title="Offrez à un enfant la possibilité de grandir et d’apprendre"
        text="Participer à un projet ou parrainer un enfant"
        label="Parrainer un enfant"
        className="teaching_card"
        href={HELLOASSO_URL}
      />
    </div>
  );
}
