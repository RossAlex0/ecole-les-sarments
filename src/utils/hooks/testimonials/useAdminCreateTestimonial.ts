"use client";

import { useCallback } from "react";
import { parseError } from "@/utils/http/parseError";

/** Admin testimonial creation (authenticated): can publish directly. */
export function useAdminCreateTestimonial() {
  return useCallback(async (payload: Record<string, unknown>) => {
    const res = await fetch("/api/testimonial/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw await parseError(res);
    return res.json();
  }, []);
}
