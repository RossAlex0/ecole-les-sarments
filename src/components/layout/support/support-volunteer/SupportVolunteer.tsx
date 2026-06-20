import SarmentsText from "@/components/ui/sarmentsText/SarmentsText";
import "./supportVolunteer.css";

export default function SupportVolunteer() {
  return (
    <section className="support_volunteer">
      <div className="support_volunteer_banner">
        <SarmentsText format="title">Devenir bénévole</SarmentsText>
        <SarmentsText format="semi-title-medium">Participer à la vie des Sarments</SarmentsText>
        <SarmentsText format="text" className="support_volunteer_text">
          Ateliers d&apos;aide aux enfants à besoins particuliers, soutien hebdomadaire à la lecture,
          enrichissement des cours d&apos;anglais et de sport, découverte des métiers et présentation
          d&apos;activités professionnelles.
        </SarmentsText>
      </div>
    </section>
  );
}
