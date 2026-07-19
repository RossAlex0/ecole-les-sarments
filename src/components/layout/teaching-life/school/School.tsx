import { schoolTimelineAfternoon, schoolTimelineMorning } from "./schoolUtils";

import SchoolBase from "../school-base/SchoolBase";

export default function School() {
  const schoolProps = {
    title: "La vie en primaire",
    desc: "Aux Sarments, les élèves du primaire consolident les apprentissages fondamentaux à travers une pédagogie exigeante et bienveillante. Lecture, écriture, mathématiques, histoire, sciences et culture générale sont abordées de manière progressive afin de développer la réflexion, l’autonomie et la confiance en soi. Les enseignements s’enrichissent également par la musique, les arts, les projets collectifs et les activités de découverte, permettant à chaque enfant de cultiver sa curiosité et le plaisir d’apprendre.",
    urlImage: "/image/school-classroom.webp",
    horaire: "12h - 13h30",
    morning: schoolTimelineMorning,
    afternoon: schoolTimelineAfternoon,
  };
  return <SchoolBase {...schoolProps} />;
}
