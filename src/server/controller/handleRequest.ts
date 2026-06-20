import { NextResponse } from "next/server";

/**
 * Runs a controller action and serializes its result as JSON.
 * Centralizes error handling (try/catch + 500 status) for all controllers.
 */
export async function handleRequest<T>(action: () => Promise<T>) {
  try {
    return NextResponse.json(await action());
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
