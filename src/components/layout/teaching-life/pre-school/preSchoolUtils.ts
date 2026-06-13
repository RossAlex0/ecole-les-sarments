import { TimelineProps } from "@/components/ui/timeline/Timeline";

export const preSchoolTimelineMorning: TimelineProps = {
  title: "Matin",
  steps: [
    {
      id: "1",
      time: "8h30 – 9h",
      description: "Accueil/jeux",
      side: "left",
    },
    {
      id: "2",
      time: "9h – 9h30",
      description: "Rituel : jour, mois, comptine ou chanson",
      side: "right",
    },
    {
      id: "3",
      time: "9h30 – 10h",
      description: "Langage écrit/geste graphique",
      side: "left",
    },
    {
      id: "4",
      time: "10h – 10h30",
      description: "Activité physique",
      side: "right",
    },
    {
      id: "5",
      time: "10h30 – 11h",
      description: "Récréation",
      side: "left",
    },
    {
      id: "6",
      time: "11h – 11h30",
      description: "Phonologie et manipulations mathématiques",
      side: "right",
    },
  ],
};

export const preSchoolTimelineAfternoon: TimelineProps = {
  title: "Après-Midi",
  steps: [
    {
      id: "1",
      time: "13h30 – 14h",
      description: "Temps calme",
      badges: [{ label: "MS" }],
      side: "left",
    },
    {
      id: "2",
      time: "13h30 – 15h30",
      description: "Sieste",
      badges: [{ label: "PS" }],
      side: "right",
    },
    {
      id: "3",
      time: "14h30 – 15h",
      description: "Phonologie & méthode Singapour",
      badges: [{ label: "MS" }],
      side: "left",
    },
    {
      id: "4",
      time: "15h – 15h30",
      description: "Cuisine & activités",
      badges: [{ label: "MS" }],
      side: "left",
    },
    {
      id: "5",
      time: "15h30 – 16h",
      description: "Goûter & récréation",
      side: "right",
    },
    {
      id: "6",
      time: "16h – 16h30",
      description: "Lecture, musique & ateliers",
      side: "left",
    },
    {
      id: "7",
      time: "16h30 – 17h",
      description: "Jeux libres",
      side: "right",
    },
  ],
};
