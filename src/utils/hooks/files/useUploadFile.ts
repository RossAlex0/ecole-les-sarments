"use client";

import { useCallback } from "react";
import { parseError } from "@/utils/http/parseError";

export type UploadKind = "director-image" | "frais-pdf" | "uniformes-pdf" | "ifi-pdf" | "legs-pdf";

/** Returns a memoized function that uploads a managed file (fixed path, overwrite). */
export function useUploadFile() {
  return useCallback(async (kind: UploadKind, file: File) => {
    const formData = new FormData();
    formData.append("kind", kind);
    formData.append("file", file);

    const res = await fetch("/api/files", { method: "POST", body: formData });
    if (!res.ok) throw await parseError(res);
    return res.json() as Promise<{ url: string }>;
  }, []);
}
