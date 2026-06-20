import Image from "next/image";
import { FaRegHeart } from "react-icons/fa6";
import SarmentsText from "@/components/ui/sarmentsText/SarmentsText";
import SarmentsButton from "@/components/ui/sarmentsButton/SarmentsButton";
import { HELLOASSO_URL } from "../supportLinks";
import "./supportProjects.css";

type ProjectItem = { title: string; description: string };
type Project = {
  title: string;
  intro: string;
  items: ProjectItem[];
  image: { src: string; alt: string };
};

const PROJECTS: Project[] = [
  {
    title: "Enrichir notre formation musicale",
    intro: "Pour renforcer l'identité musicale de l'école, nous recherchons :",
    image: {
      src: "/image/musical.webp",
      alt: "Élèves des Sarments jouant du violon en cours de musique",
    },
    items: [
      {
        title: "Des instruments d'initiation",
        description: "Permettre aux enfants de découvrir la musique",
      },
      {
        title: "du matériel de sonorisation de qualité pour les représentations",
        description: "Améliorer la qualité des représentations",
      },
      {
        title: "une location de salles pouvant accueillir nos concerts",
        description: "Accueillir nos concerts dans les meilleures conditions.",
      },
    ],
  },
  {
    title: "Rénover et équiper notre école",
    intro: "Pour offrir de bonnes conditions d'apprentissage et de convivialité à nos élèves au quotidien.",
    image: {
      src: "/image/rebuild.webp",
      alt: "Cour de l'école Les Sarments à rénover",
    },
    items: [
      {
        title: "Isolation thermique de la classe des CM",
        description: "Améliorer le confort été comme hiver",
      },
      {
        title: "Végétaliser la cour",
        description: "Protéger les enfants de la chaleur estivale",
      },
      {
        title: "Installer une aire de jeux",
        description: "Développer la motricité et le bien-être des enfants",
      },
    ],
  },
];

export default function SupportProjects() {
  return (
    <section className="support_projects">
      <SarmentsText format="title" className="support_projects_heading">
        Les projets de l&apos;école
      </SarmentsText>

      <div className="support_projects_grid">
        {PROJECTS.map((project) => (
          <article key={project.title} className="support_projects_card">
            <div className="support_projects_image">
              <Image
                src={project.image.src}
                alt={project.image.alt}
                fill
                sizes="(max-width: 900px) 100vw, 580px"
                loading="lazy"
              />
            </div>

            <div className="support_projects_content">
              <SarmentsText format="semi-title" color="blue">
                {project.title}
              </SarmentsText>
              <SarmentsText format="small" color="muted">
                {project.intro}
              </SarmentsText>

              <ul className="support_projects_items">
                {project.items.map((item) => (
                  <li key={item.title}>
                    <SarmentsText format="view" color="blue">
                      {item.title}
                    </SarmentsText>
                    <SarmentsText format="small" color="muted">
                      {item.description}
                    </SarmentsText>
                  </li>
                ))}
              </ul>

              <SarmentsButton theme="dark" href={HELLOASSO_URL} className="support_projects_cta">
                <FaRegHeart />
                Je soutiens un projet
              </SarmentsButton>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
