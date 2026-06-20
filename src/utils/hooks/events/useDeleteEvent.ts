"use client";

import { useCallback } from "react";
import { parseError } from "@/utils/http/parseError";

/** Returns a memoized function that deletes an event via the API. */
export function useDeleteEvent() {
  return useCallback(async (id: string) => {
    const res = await fetch(`/api/event/admin/${id}`, { method: "DELETE" });
    if (!res.ok) throw await parseError(res);
    return res.json();
  }, []);
}
