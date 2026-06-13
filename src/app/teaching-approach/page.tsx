import CardInfo from "@/components/block/card-info/CardInfo";

import "./teachingApproach.css";
import Advantage from "@/components/layout/advantage/Advantage";
import Toggle from "@/components/ui/toggle/Toggle";
import TeachingLife from "@/components/layout/teaching-life/TeachingLife";

export default function TeachingApproachePage() {
  return (
    <section style={{ paddingTop: "14vh" }}>
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
