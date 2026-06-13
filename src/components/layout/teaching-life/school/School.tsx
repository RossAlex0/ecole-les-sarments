import { schoolTimelineAfternoon, schoolTimelineMorning } from "./schoolUtils";

import SchoolBase from "../school-base/SchoolBase";

export default function School() {
  const schoolProps = {
    title: "La vie en primaire",
    urlImage: "/image/school-classroom.webp",
    horaire: "12h - 13h30",
    morning: schoolTimelineMorning,
    afternoon: schoolTimelineAfternoon,
  };
  return <SchoolBase {...schoolProps} />;
}
