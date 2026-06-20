"use client";

import { useCallback } from "react";
import { parseError } from "@/utils/http/parseError";

/** Returns a memoized function that deletes a team member via the API. */
export function useDeleteTeamMember() {
  return useCallback(async (id: string) => {
    const res = await fetch(`/api/team-member/admin/${id}`, { method: "DELETE" });
    if (!res.ok) throw await parseError(res);
    return res.json();
  }, []);
}
