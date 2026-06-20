import { NextResponse } from "next/server";
import { HttpError } from "./httpError";
import { requireAdmin } from "../auth/requireAdmin";

export type RouteContext = { params: Promise<Record<string, string>> };
type RouteHandler = (request: Request, context: RouteContext) => Promise<unknown>;

/** Runs a controller handler and serializes the result / errors as JSON. */
async function execute(action: () => Promise<unknown>) {
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

/** Public route: JSON + error handling, no auth. */
export function publicRoute(handler: RouteHandler) {
  return (request: Request, context: RouteContext) => execute(() => handler(request, context));
}

/** Admin route: requires a valid session, then JSON + error handling. */
export function adminRoute(handler: RouteHandler) {
  return (request: Request, context: RouteContext) =>
    execute(async () => {
      await requireAdmin();
      return handler(request, context);
    });
}
