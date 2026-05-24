import SarmentsText from "@/components/ui/sarmentsText/SarmentsText";
import Image from "next/image";
import "./schoolBase.css";
type SchoolBaseProps = {
  title: string;
  urlImage: string;
  horaire: string;
};

export default function SchoolBase({ title, urlImage, horaire }: SchoolBaseProps) {
  return (
    <div className="school_base">
      <SarmentsText format="title">{title}</SarmentsText>
      <SarmentsText format="text">
        Aux Sarments, les enfants sont accompagnés dès 2 ans et demi dans leurs premiers
        apprentissages, à travers des activités variées favorisant le langage, la concentration,
        l’autonomie et la vie en groupe. Les découvertes se font progressivement, écriture, lecture,
        mathématiques, et s’enrichissent par la musique, les arts, la motricité et les sciences,
        dans un cadre bienveillant qui encourage le goût d’apprendre.
      </SarmentsText>
      <div>
        <Image src={urlImage} fill loading="lazy" alt="classroom/" />
      </div>
      <SarmentsText format="title">La journée type</SarmentsText>
      {/* component timeline */}
      <div>
        <SarmentsText format="semi-title-medium">Midi</SarmentsText>
        <SarmentsText format="semi-title-medium" color="gold">
          {horaire}
        </SarmentsText>
        <SarmentsText format="text">
          Temps du repas (panier repas fourni par les familles) et récréation
        </SarmentsText>
      </div>
      {/* component timeline */}
    </div>
  );
}
