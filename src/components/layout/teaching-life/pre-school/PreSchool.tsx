import SchoolBase from "../school-base/SchoolBase";

export default function PreSchool() {
  const schoolProps = {
    title: "La vie en maternelle",
    urlImage: "/",
    horaire: "11h45 - 13h30",
  };
  return <SchoolBase {...schoolProps} />;
}
