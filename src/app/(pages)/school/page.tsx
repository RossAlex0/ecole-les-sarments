import type { Metadata } from "next";
import Image from "next/image";
import SarmentsText from "@/components/ui/sarmentsText/SarmentsText";
import SchoolHero from "@/components/layout/school/school-hero/SchoolHero";
import SchoolValues from "@/components/layout/school/school-values/SchoolValues";
import SchoolTeam from "@/components/layout/school/school-team/SchoolTeam";
import Timeline from "@/components/ui/timeline/Timeline";
import { schoolUtilsData } from "@/components/layout/school/schoolUtilsData";
import Link from "next/link";
import SarmentsButton from "@/components/ui/sarmentsButton/SarmentsButton";
import SchoolTestimonials from "@/components/layout/school/school-testimonials/SchoolTestimonials";
import { getCachedTeamMembers } from "@/server/service/team-member/teamMember.cache";
import { getCachedTestimonials } from "@/server/service/testimonial/testimonial.cache";
import { publicFileUrl, STORAGE_PATHS } from "@/lib/supabase/storage";
import "./school.css";

export const metadata: Metadata = {
  title: "Notre école",
  description:
    "École Les Sarments : école maternelle et primaire privée hors contrat à Toulouse. Découvrez notre équipe, nos valeurs et la vie de l'école.",
  alternates: { canonical: "/school" },
};

export default async function SchoolPage() {
  const [team, testimonials] = await Promise.all([getCachedTeamMembers(), getCachedTestimonials()]);

  return (
    <section className="school">
      <SchoolHero />
      <SchoolValues />

      <div className="school_director">
        <div className="school_director_image">
          <Image
            src={publicFileUrl(STORAGE_PATHS.directorImage)}
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
      {team.length > 0 && <SchoolTeam team={team} />}
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
          <SarmentsButton href="/support-us" hasBorder className="parents_hero_btn">
            Soutenir l&apos;école
          </SarmentsButton>
        </div>
      </div>
      <div className="school_testimonial_container">
        <SchoolTestimonials testimonials={testimonials} />
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
            <Link
              href={publicFileUrl(STORAGE_PATHS.fraisPdf)}
              target="_blank"
              className="school_footer_info_text"
            >
              Télécharger
            </Link>
          </div>
          <div id="informations">
            <SarmentsText format="text">Uniformes scolaires</SarmentsText>
            <Link
              href={publicFileUrl(STORAGE_PATHS.uniformesPdf)}
              target="_blank"
              className="school_footer_info_text"
            >
              Télécharger
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
