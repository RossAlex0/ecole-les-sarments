import { z } from "zod";
import { optionalText, optionalUrl, text } from "./common";

export const teamMemberCreateSchema = z.object({
  first_name: text(80),
  last_name: text(80),
  role: text(160),
  short_bio: optionalText(2000),
  image_url: optionalUrl,
  image_path: optionalText(512),
  is_published: z.boolean().optional(),
});

export const teamMemberUpdateSchema = teamMemberCreateSchema.partial();
