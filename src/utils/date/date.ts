// "31 mai 2026"
export function formatEventDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// "Janvier 2026"
export function formatMonthYear(iso: string): string {
  const formatted = new Date(iso).toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}
