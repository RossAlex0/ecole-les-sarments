"use client";

import { useCallback } from "react";
import { parseError } from "@/utils/http/parseError";

/** Returns a memoized function that updates a team member via the API. */
export function useUpdateTeamMember() {
  return useCallback(async (id: string, payload: Record<string, unknown>) => {
    const res = await fetch(`/api/team-member/admin/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw await parseError(res);
    return res.json();
  }, []);
}
