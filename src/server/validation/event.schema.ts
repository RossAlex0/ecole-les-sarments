import { z } from "zod";
import { isoDate, optionalIsoDate, optionalText, text, url } from "./common";

const slug = z
  .string()
  .trim()
  .min(1)
  .max(160)
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Slug invalide : minuscules, chiffres et tirets uniquement.",
  );

export const eventCreateSchema = z.object({
  title: text(160),
  slug,
  short_description: text(500),
  description: text(10000),
  start_at: isoDate,
  end_at: optionalIsoDate,
  location: optionalText(200),
  image_url: url,
  is_event: z.boolean().optional(),
  is_published: z.boolean().optional(),
});

export const eventUpdateSchema = eventCreateSchema.partial();
