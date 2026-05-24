"use client";
import Toggle from "@/components/ui/toggle/Toggle";
import { useState } from "react";

import "./teachingLife.css";
import School from "./school/School";
import PreSchool from "./pre-school/PreSchool";

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
    </div>
  );
}
