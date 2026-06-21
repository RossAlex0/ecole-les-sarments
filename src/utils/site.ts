/**
 * Canonical site origin (no trailing slash), resolved in order:
 * custom domain (env) → Vercel production domain → localhost (dev).
 *
 * Hardened so a malformed env value can't crash `new URL()` at build time:
 * an empty var falls through, and a bare domain gets an https:// scheme.
 */
const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

const raw = envUrl
  ? envUrl
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";

export const SITE_URL = (/^https?:\/\//i.test(raw) ? raw : `https://${raw}`).replace(/\/+$/, "");

export const SITE_NAME = "École Les Sarments";
