/**
 * Canonical site origin (no trailing slash), resolved in order:
 * custom domain (env) → Vercel production domain → localhost (dev).
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const SITE_NAME = "École Les Sarments";
