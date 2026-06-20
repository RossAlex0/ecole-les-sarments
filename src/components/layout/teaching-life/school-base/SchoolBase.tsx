"use client";
import SarmentsText from "@/components/ui/sarmentsText/SarmentsText";
import Image from "next/image";
import "./schoolBase.css";
import Timeline, { TimelineProps } from "@/components/ui/timeline/Timeline";

type SchoolBaseProps = {
  title: string;
  urlImage: string;
  horaire: string;
  morning: TimelineProps;
  afternoon: TimelineProps;
};

export default function SchoolBase({
  title,
  urlImage,
  horaire,
  morning,
  afternoon,
}: SchoolBaseProps) {
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
      <div className="school_base_image">
        <Image src={urlImage} fill loading="lazy" alt="classroom/" />
      </div>
      <SarmentsText format="title">La journée type</SarmentsText>
      <Timeline title={morning.title} steps={morning.steps} />
      <div className="school_base_midi">
        <SarmentsText format="semi-title-medium">Midi</SarmentsText>
        <SarmentsText format="semi-title-medium" color="gold">
          {horaire}
        </SarmentsText>
        <SarmentsText format="text">
          Temps du repas (panier repas fourni par les familles, surveillance par les enseignants) et
          récréation
        </SarmentsText>
      </div>
      <Timeline title={afternoon.title} steps={afternoon.steps} />
    </div>
  );
}
