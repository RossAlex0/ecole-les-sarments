/** Public Storage bucket holding the school assets. */
export const STORAGE_BUCKET = "ecole-les-sarments";

/** Fixed paths (within the bucket) for the files managed from the back office. */
export const STORAGE_PATHS = {
  directorImage: "team/direcfrice.webp",
  fraisPdf: "doc/tarifs-inscriptions-ecole-les-sarments.pdf",
  uniformesPdf: "doc/uniformes.pdf",
  ifiPdf: "doc/SARMENTS - Flyer IFI 2026.pdf",
  legsPdf: "doc/SARMENTS - Flyer LEG A5 .pdf",
} as const;

/**
 * Builds the public URL of a Supabase Storage object from its full path
 * (bucket included). Avoids hardcoding the project URL (derived from
 * NEXT_PUBLIC_SUPABASE_URL).
 *
 * @example storageUrl("ecole-les-sarments/team/direcfrice.webp")
 */
export function storageUrl(path: string): string {
  const base = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public`;
  // encodeURI keeps the "/" separators but percent-encodes spaces and the like.
  return `${base}/${encodeURI(path.replace(/^\/+/, ""))}`;
}

/** Builds the public URL of an object inside the school bucket from its in-bucket path. */
export function publicFileUrl(pathInBucket: string): string {
  return storageUrl(`${STORAGE_BUCKET}/${pathInBucket}`);
}

/** Extracts the in-bucket path from a public Storage URL (or null if it doesn't match). */
export function bucketPathFromUrl(url: string): string | null {
  const marker = `/storage/v1/object/public/${STORAGE_BUCKET}/`;
  const index = url.indexOf(marker);
  if (index === -1) return null;
  return url.slice(index + marker.length).split("?")[0];
}
