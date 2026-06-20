"use client";
import Image from "next/image";
import SarmentsText from "@/components/ui/sarmentsText/SarmentsText";
import SchoolHero from "@/components/layout/school/school-hero/SchoolHero";
import SchoolValues from "@/components/layout/school/school-values/SchoolValues";
import SchoolTeam, { TeamMember } from "@/components/layout/school/school-team/SchoolTeam";
import useFetch from "@/utils/hooks/useFetch";
import Loading from "../loading";
import Timeline from "@/components/ui/timeline/Timeline";
import { schoolUtilsData } from "@/components/layout/school/schoolUtilsData";
import Link from "next/link";
import "./school.css";
import SarmentsButton from "@/components/ui/sarmentsButton/SarmentsButton";
import SchoolTestimonials from "@/components/layout/school/school-testimonials/SchoolTestimonials";
import { Testimonials } from "@/utils/types/table";

export default function SchoolPage() {
  const {
    data: teams,
    loading: teamsLoading,
    error: teamsError,
  } = useFetch<TeamMember[]>("/api/team-member");
  const {
    data: testimonials,
    loading: testimonialsLoading,
    error: testimonialsError,
  } = useFetch<Testimonials[]>("/api/testimonial");

  if (teamsLoading || testimonialsLoading) {
    return <Loading />;
  }

  return (
    <section className="school">
      <SchoolHero />
      <SchoolValues />

      <div className="school_director">
        <div className="school_director_image">
          <Image
            src="https://funnkywkqepwqnasuuxe.supabase.co/storage/v1/object/public/ecole-les-sarments/team/direcfrice.webp"
            alt="Armelle Da Rocha, directrice de l'école"
            fill
            sizes="(max-width: 768px) 100vw, 380px"
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="school_director_content">
          <SarmentsText format="title">Mot de la directrice</SarmentsText>
          <SarmentsText format="semi-title-medium">
            Armelle Da Rocha, Directrice et Enseignante des CM1 et CM2
          </SarmentsText>
          <SarmentsText format="text" className="school_director_text">
            {`Aux côtés des parents, notre école accompagne chaque enfant avec exigence et bienveillance afin de lui transmettre le goût de l’effort, la curiosité et la joie d’apprendre. Nous souhaitons aider nos élèves à grandir avec confiance, persévérance et respect des autres, dans un cadre attentif et profondément humain.  “Connaître pour aimer, aimer pour connaître” résume pleinement l’esprit des Sarments.`}
          </SarmentsText>
        </div>
      </div>
      {teamsError ? undefined : <SchoolTeam team={teams!} />}
      <div className="parents_hero">
        <div className="parents_hero_image">
          <Image
            src="/image/children-and-teacher.webp"
            alt="Groupe de parents et d'enfants devant l'école"
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>

        <div className="parents_hero_card">
          <SarmentsText format="title">
            Les parents jouent un rôle clé dans la vie de l&apos;école
          </SarmentsText>
          <SarmentsText format="text" className="parents_hero_text">
            L&apos;association constituée de parents joue un rôle essentiel dans la vie de
            l&apos;école. Composée de parents volontaires, elle est à l&apos;origine de nombreux
            projets et initiatives qui participent activement au développement des Sarments. Elle
            organise des événements, soutient les actions pédagogiques et crée un lien fort entre
            les familles et l&apos;équipe éducative.
          </SarmentsText>
          <SarmentsButton href="/support" hasBorder className="parents_hero_btn">
            Soutenir l&apos;école
          </SarmentsButton>
        </div>
      </div>
      <div className="school_testimonial_container">
        {testimonialsError ? undefined : <SchoolTestimonials testimonials={testimonials!} />}
      </div>
      <div className="school_footer">
        <div className="school_footer_timeline">
          <Timeline title={schoolUtilsData.title} steps={schoolUtilsData.steps} />
        </div>
        <div className="school_footer_info">
          <SarmentsText format="title" className="school_footer_info_title">
            Informations pratiques
          </SarmentsText>
          <div>
            <SarmentsText format="text">Frais de scolarité</SarmentsText>
            {/* TODO - ajouter les link vers les fichiers */}
            <Link href={"/"} className="school_footer_info_text">
              Télécharger
            </Link>
          </div>
          <div>
            <SarmentsText format="text">Uniformes scolaires</SarmentsText>
            {/* TODO - ajouter les link vers les fichiers */}
            <Link href={"/"} className="school_footer_info_text">
              Télécharger
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
