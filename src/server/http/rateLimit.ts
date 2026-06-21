/**
 * In-memory per-IP rate limiter (fixed window).
 *
 * Zero dependency / zero cost: a single global limit applied to every API route
 * through the route wrappers (`publicRoute` / `adminRoute`).
 *
 * Caveat: on serverless (Vercel) the counter lives in the function instance's
 * memory, so it is per-instance and resets on cold starts. It curbs bursts and
 * casual abuse from a single client, but is not a globally exact count. Swap the
 * store here (e.g. Upstash) later if a durable cross-instance limit is needed —
 * call sites won't change.
 */

const LIMIT = 60; // max requests per window, per IP
const WINDOW_MS = 60_000; // 1 minute

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
let lastSweep = Date.now();

/** Best-effort client IP from proxy headers (Vercel sets x-forwarded-for). */
function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

/** Drop expired buckets periodically so the map can't grow unbounded. */
function sweep(now: number) {
  if (now - lastSweep < WINDOW_MS) return;
  lastSweep = now;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export type RateResult = { ok: boolean; retryAfter: number };

/** Counts the request against the caller's IP; returns whether it's allowed. */
export function checkRateLimit(request: Request): RateResult {
  const now = Date.now();
  sweep(now);

  const ip = clientIp(request);
  const bucket = buckets.get(ip);

  // New IP or window elapsed → start a fresh window.
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, retryAfter: 0 };
  }

  bucket.count += 1;
  if (bucket.count > LIMIT) {
    return { ok: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  }
  return { ok: true, retryAfter: 0 };
}
