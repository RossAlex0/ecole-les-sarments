/**
 * Builds the public URL of a Supabase Storage object from its path.
 * Avoids hardcoding the project URL (derived from NEXT_PUBLIC_SUPABASE_URL).
 *
 * @example storageUrl("ecole-les-sarments/team/direcfrice.webp")
 */
export function storageUrl(path: string): string {
  const base = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public`;
  return `${base}/${path.replace(/^\/+/, "")}`;
}
