import SarmentsText from "@/components/ui/sarmentsText/SarmentsText";
import Image from "next/image";

import "./advantage.css";

export default function Advantage() {
  const advantages = [
    {
      title: "Effectifs réduits",
      description:
        "Chaque classe est composée d’un maximum de 20 enfants pour assurer un suivi personnalisé de chaque élève.",
      iconUrl: "/icons/children.svg",
    },
    {
      title: "L’excellence pour tous",
      description:
        "Dictée et lecture quotidiennes, poésie hebdomadaire, méthode de Singapour, boulier chinois et lecture syllabique dès la maternelle.",
      iconUrl: "/icons/student.svg",
    },
    {
      title: "Emploi du temps adapté au rythme de l’enfant",
      description:
        "Culture générale et fondamentaux le matin, ouverture aux arts, au sport et au monde l’après-midi.",
      iconUrl: "/icons/activities-school.svg",
    },
    {
      title: "Etude Dirigée",
      description:
        "En fin de journée, une étude dirigée est mise en place afin de limiter le travail à la maison  et pour faciliter la mémorisation des leçons.",
      iconUrl: "/icons/book.svg",
    },
    {
      title: "Formation musicale",
      description:
        "Chant et solfège trois fois par semaine, avec des concerts accompagnés par un orchestre professionnel et des chœurs.",
      iconUrl: "/icons/music.svg",
    },
    {
      title: "Lien intergénérationnel",
      description:
        "Rencontres régulières en EHPAD, échanges intergénérationnels et aide à la lecture par des bénévoles seniors.",
      iconUrl: "/icons/teach.svg",
    },
  ];
  return (
    <div className="advantage">
      <SarmentsText format="fat-title">Les atouts de notre écoles</SarmentsText>
      <div className="advantage_content">
        {advantages.map((advantage) => (
          <div key={advantage.title} className="advantage_content_card">
            <Image height={65} width={65} src={advantage.iconUrl} alt={advantage.title} />
            <div className="advantage_content_card_text">
              <SarmentsText format="view" className="advantage_content_card_bold">
                {advantage.title}
              </SarmentsText>
              <SarmentsText format="text">{advantage.description}</SarmentsText>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
