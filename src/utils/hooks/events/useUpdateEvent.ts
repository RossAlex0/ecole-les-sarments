"use client";

import { useCallback } from "react";
import { parseError } from "@/utils/http/parseError";

/** Returns a memoized function that updates an event via the API. */
export function useUpdateEvent() {
  return useCallback(async (id: string, payload: Record<string, unknown>) => {
    const res = await fetch(`/api/event/admin/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw await parseError(res);
    return res.json();
  }, []);
}
