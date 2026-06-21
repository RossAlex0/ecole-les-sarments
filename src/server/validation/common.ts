import { z } from "zod";

/**
 * Shared field validators (Zod v4).
 *
 * All strings are trimmed and length-capped to curb DoS / egress abuse.
 * Optional fields normalize empty/absent values to `null` to match the DB schema.
 */

/** Trimmed required string, 1..max chars. */
export const text = (max: number) => z.string().trim().min(1).max(max);

/** Trimmed optional string → `null` when empty or absent. */
export const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .nullish()
    .transform((v) => (v && v.length > 0 ? v : null));

/** Required absolute URL, capped length. */
export const url = z.url().max(2048);

/** Optional URL → `null` when empty or absent. */
export const optionalUrl = z.preprocess(
  (v) => (v === "" || v == null ? null : v),
  z.url().max(2048).nullable(),
);

/** Required ISO-8601 datetime (e.g. produced by Date.toISOString()). */
export const isoDate = z.iso.datetime();

/** Optional ISO-8601 datetime → `null` when empty or absent. */
export const optionalIsoDate = z.preprocess(
  (v) => (v === "" || v == null ? null : v),
  z.iso.datetime().nullable(),
);
