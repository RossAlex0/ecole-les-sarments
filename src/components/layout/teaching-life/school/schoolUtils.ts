import { TimelineProps } from "@/components/ui/timeline/Timeline";

export const schoolTimelineMorning: TimelineProps = {
  title: "Matin",
  steps: [
    {
      id: "1",
      time: "8h30 – 9h",
      description: "Culture générale",
      side: "left",
    },
    {
      id: "2",
      time: "9h – 9h30",
      description: "Lecture & dictée",
      side: "right",
    },
    {
      id: "3",
      time: "9h30 – 10h",
      description: "Écriture, grammaire & conjugaison",
      side: "left",
    },
    {
      id: "4",
      time: "10h – 10h30",
      description: "Récréation",
      side: "right",
    },
    {
      id: "5",
      time: "10h30 – 11h",
      description: "Calcul mental & mathématiques",
      side: "left",
    },
  ],
};

export const schoolTimelineAfternoon: TimelineProps = {
  title: "Après-Midi",
  steps: [
    {
      id: "1",
      time: "13h30 – 14h30",
      description: "Temps calme, lecture offerte & chant choral",
      side: "left",
    },
    {
      id: "2",
      time: "13h30 – 14h30",
      description: "Ateliers, phonologie, sciences, histoire",
      badges: [{ label: "CP" }],
      side: "left",
    },
    {
      id: "3",
      time: "14h30 – 15h",
      description: "Histoire, géographie, sciences, anglais & arts visuels",
      badges: [{ label: "CE" }, { label: "CM" }],
      side: "right",
    },
    {
      id: "4",
      time: "15h30 – 16h",
      description: "Goûter & récréation",
      side: "left",
    },
    {
      id: "5",
      time: "16h – 16h30",
      description: "Sport",
      badges: [{ label: "CP" }],
      side: "left",
    },
    {
      id: "6",
      time: "16h – 16h30",
      description: "Étude",
      badges: [{ label: "CE" }, { label: "CM" }],
      side: "right",
    },
    {
      id: "7",
      time: "16h30 – 17h",
      description: "Sport",
      badges: [{ label: "CP" }],
      side: "left",
    },
    {
      id: "8",
      time: "16h30 – 17h",
      description: "Sport",
      badges: [{ label: "CE" }, { label: "CM" }],
      side: "right",
    },
  ],
};
