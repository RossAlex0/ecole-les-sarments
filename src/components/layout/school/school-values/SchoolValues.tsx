import { PiCompassRoseBold } from "react-icons/pi";
import SarmentsText from "@/components/ui/sarmentsText/SarmentsText";
import "./schoolValues.css";
import { GiOlive, GiMountainRoad } from "react-icons/gi";

const values = [
  {
    Icon: GiOlive,
    title: "Croissance intégrale",
    description: "Chaque enfant est écouté, respecté et encouragé.",
  },
  {
    Icon: GiMountainRoad,
    title: "Exigence",
    description: "Nous aidons chaque élève à donner le meilleur de lui-même.",
  },
  {
    Icon: PiCompassRoseBold,
    title: "Sens",
    description: "Apprendre pour comprendre et grandir.",
  },
];

export default function SchoolValues() {
  return (
    <section className="school_values">
      <div className="school_values_container">
        <SarmentsText format="title" color="blue" className="school_values_title">
          Des valeurs qui guident chaque moment de la journée à l&apos;école
        </SarmentsText>

        <ul className="school_values_list">
          {values.map(({ Icon, title, description }) => (
            <li key={title} className="school_values_item">
              <Icon className="school_values_icon" />
              <SarmentsText format="semi-title-medium" color="blue">
                {title}
              </SarmentsText>
              <SarmentsText format="text" color="blue" className="school_values_desc">
                {description}
              </SarmentsText>
            </li>
          ))}
        </ul>
      </div>
      <div className="school_values_yellow" />
    </section>
  );
}
