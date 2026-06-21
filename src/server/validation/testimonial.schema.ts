import { z } from "zod";
import { optionalText, text } from "./common";

/** Public submission: never trusts `is_published` (forced to false in the controller). */
export const testimonialPublicCreateSchema = z.object({
  author: text(120),
  content: text(5000),
  school_level: optionalText(80),
});

/** Admin creation: may set the published flag. */
export const testimonialAdminCreateSchema = testimonialPublicCreateSchema.extend({
  is_published: z.boolean().optional(),
});

/** Admin update: every field optional. */
export const testimonialUpdateSchema = z.object({
  author: text(120).optional(),
  content: text(5000).optional(),
  school_level: optionalText(80),
  is_published: z.boolean().optional(),
});
