import SchoolBase from "../school-base/SchoolBase";

export default function School() {
  const schoolProps = {
    title: "La vie en primaire",
    urlImage: "/",
    horaire: "12h - 13h30",
  };
  return <SchoolBase {...schoolProps} />;
}
