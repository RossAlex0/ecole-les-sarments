import { NextResponse } from "next/server";
import { HttpError } from "./httpError";
import { requireAdmin } from "../auth/requireAdmin";
import { checkRateLimit } from "./rateLimit";

export type RouteContext = { params: Promise<Record<string, string>> };
type RouteHandler = (request: Request, context: RouteContext) => Promise<unknown>;

/** Runs a controller handler and serializes the result / errors as JSON. */
async function execute(request: Request, action: () => Promise<unknown>) {
  // Global per-IP rate limit on every API route (see rateLimit.ts).
  const rate = checkRateLimit(request);
  if (!rate.ok) {
    return NextResponse.json(
      { error: { message: "Trop de requêtes. Veuillez réessayer dans un instant." } },
      { status: 429, headers: { "Retry-After": String(rate.retryAfter) } },
    );
  }

  try {
    return NextResponse.json(await action());
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json({ error: { message: error.message } }, { status: error.status });
    }
    const message = error instanceof Error ? error.message : "Erreur interne";
    console.error("[API error]", error);
    return NextResponse.json({ error: { message } }, { status: 500 });
  }
}

/** Public route: rate limit + JSON + error handling, no auth. */
export function publicRoute(handler: RouteHandler) {
  return (request: Request, context: RouteContext) =>
    execute(request, () => handler(request, context));
}

/** Admin route: rate limit, requires a valid session, then JSON + error handling. */
export function adminRoute(handler: RouteHandler) {
  return (request: Request, context: RouteContext) =>
    execute(request, async () => {
      await requireAdmin();
      return handler(request, context);
    });
}
