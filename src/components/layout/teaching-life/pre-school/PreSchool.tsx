import SchoolBase from "../school-base/SchoolBase";
import { preSchoolTimelineAfternoon, preSchoolTimelineMorning } from "./preSchoolUtils";

export default function PreSchool() {
  const schoolProps = {
    title: "La vie en maternelle",
    desc: "Aux Sarments, les enfants sont accompagnés dès 2 ans et demi dans leurs premiers apprentissages, à travers des activités variées favorisant le langage, la concentration, l’autonomie et la vie en groupe. Les découvertes se font progressivement,  écriture, lecture, mathématiques,  et s’enrichissent par la musique, les arts, la motricité et les sciences, dans un cadre bienveillant qui encourage le goût d’apprendre.",
    urlImage: "/image/pre-school-classroom.webp",
    horaire: "11h45 - 13h30",
    morning: preSchoolTimelineMorning,
    afternoon: preSchoolTimelineAfternoon,
  };
  return <SchoolBase {...schoolProps} />;
}
