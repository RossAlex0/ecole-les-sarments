"use client";
import SarmentsText from "@/components/ui/sarmentsText/SarmentsText";
import Image from "next/image";
import "./schoolBase.css";
import Timeline, { TimelineProps } from "@/components/ui/timeline/Timeline";

type SchoolBaseProps = {
  title: string;
  desc: string;
  urlImage: string;
  horaire: string;
  morning: TimelineProps;
  afternoon: TimelineProps;
};

export default function SchoolBase({
  title,
  desc,
  urlImage,
  horaire,
  morning,
  afternoon,
}: SchoolBaseProps) {
  return (
    <div className="school_base">
      <SarmentsText format="title">{title}</SarmentsText>
      <SarmentsText format="text">{desc}</SarmentsText>
      <div className="school_base_image">
        <Image
          src={urlImage}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 800px"
          alt={`Salle de classe de l'école Les Sarments — ${title}`}
        />
      </div>
      <SarmentsText format="title">La journée type</SarmentsText>
      <Timeline title={morning.title} steps={morning.steps} />
      <div className="school_base_midi">
        <SarmentsText format="semi-title-medium">Midi</SarmentsText>
        <SarmentsText format="semi-title-medium" color="gold">
          {horaire}
        </SarmentsText>
        <SarmentsText format="text">
          Temps du repas (panier-repas fourni par les familles), avec surveillance par les
          institutrices, suivi d&apos;un temps de récréation.
        </SarmentsText>
      </div>
      <Timeline title={afternoon.title} steps={afternoon.steps} />
    </div>
  );
}
