import { HttpError } from "../http/httpError";

/**
 * Ensures a request comes from Vercel Cron.
 * Vercel automatically sends `Authorization: Bearer <CRON_SECRET>` when the
 * CRON_SECRET env var is set. We fail closed: no secret configured → reject.
 */
export function requireCron(request: Request) {
  const secret = process.env.CRON_SECRET;
  const authorization = request.headers.get("authorization");

  if (!secret || authorization !== `Bearer ${secret}`) {
    throw new HttpError(401, "Unauthorized");
  }
}
