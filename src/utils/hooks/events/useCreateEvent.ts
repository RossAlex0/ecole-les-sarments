"use client";

import { useCallback } from "react";
import { parseError } from "@/utils/http/parseError";

/** Returns a memoized function that creates an event via the API. */
export function useCreateEvent() {
  return useCallback(async (payload: Record<string, unknown>) => {
    const res = await fetch("/api/event/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw await parseError(res);
    return res.json();
  }, []);
}
