import SchoolBase from "../school-base/SchoolBase";
import { preSchoolTimelineAfternoon, preSchoolTimelineMorning } from "./preSchoolUtils";

export default function PreSchool() {
  const schoolProps = {
    title: "La vie en maternelle",
    urlImage: "/image/pre-school-classroom.webp",
    horaire: "11h45 - 13h30",
    morning: preSchoolTimelineMorning,
    afternoon: preSchoolTimelineAfternoon,
  };
  return <SchoolBase {...schoolProps} />;
}
