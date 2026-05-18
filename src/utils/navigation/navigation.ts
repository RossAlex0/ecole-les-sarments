export const headerNavigation = [
  { label: "Accueil", link: "/", style: "list" },
  { label: "Notre pédagogie", link: "/teaching-approach", style: "list" },
  { label: "Notre école", link: "/school", style: "list" },
  { label: "Vie scolaire", link: "/student-life", style: "list" },
  { label: "Contact", link: "/contact", style: "list" },
  { label: "Nous soutenir", link: "/support-us", style: "button" },
] as const;

export type NavigationLabel = (typeof headerNavigation)[number]["label"];

export const findNavigationLink = (label: NavigationLabel) => {
  return headerNavigation.find((item) => item.label === label)!.link;
};
