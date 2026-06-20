"use client";

import { useCallback } from "react";
import { parseError } from "@/utils/http/parseError";

/** Returns a memoized function that deletes a testimonial via the API (admin only). */
export function useDeleteTestimonial() {
  return useCallback(async (id: string) => {
    const res = await fetch(`/api/testimonial/admin/${id}`, { method: "DELETE" });
    if (!res.ok) throw await parseError(res);
    return res.json();
  }, []);
}
