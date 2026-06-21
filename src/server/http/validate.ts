import { z } from "zod";
import { HttpError } from "./httpError";

/**
 * Reads the JSON body and validates it against a Zod schema.
 * - Malformed JSON → 400 (instead of a generic 500).
 * - Schema mismatch → 400 with the first issue's path + message.
 *
 * Zod strips unknown keys by default, so the returned object only ever contains
 * the declared fields (anti mass-assignment).
 */
export async function parseBody<T extends z.ZodType>(
  request: Request,
  schema: T,
): Promise<z.infer<T>> {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    throw new HttpError(400, "Corps de requête invalide (JSON attendu).");
  }

  const result = schema.safeParse(raw);
  if (!result.success) {
    const issue = result.error.issues[0];
    const path = issue?.path?.length ? `« ${issue.path.join(".")} » : ` : "";
    throw new HttpError(400, `${path}${issue?.message ?? "Données invalides."}`);
  }
  return result.data;
}
