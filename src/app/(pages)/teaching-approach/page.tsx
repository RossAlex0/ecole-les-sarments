import type { Metadata } from "next";
import CardInfo from "@/components/block/card-info/CardInfo";
import Advantage from "@/components/layout/advantage/Advantage";
import TeachingLife from "@/components/layout/teaching-life/TeachingLife";

import "./teachingApproach.css";

export const metadata: Metadata = {
  title: "Notre approche pédagogique",
  description:
    "L'approche pédagogique de l'école Les Sarments à Toulouse : école privée hors contrat, effectifs réduits et transmission des savoirs fondamentaux dans l'exigence et la bienveillance.",
  alternates: { canonical: "/teaching-approach" },
};

export default function TeachingApproachePage() {
  return (
    <section style={{ paddingTop: "10vh" }}>
      <div className="hero_teaching">
        <CardInfo
          text="Transmettre l’excellence et former chaque enfant dans toutes ses dimensions intellectuelles et humaines : telle est la vocation des Sarments où chaque élève découvre, s’épanouit et rayonne."
          title="Notre pédagogie"
          hideBtn
          className="hero_teaching_card"
        />
      </div>
      <Advantage />
      <TeachingLife />
    </section>
  );
}
