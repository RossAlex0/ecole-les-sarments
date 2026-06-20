"use client";

import { useCallback } from "react";
import { parseError } from "@/utils/http/parseError";

/**
 * Returns a memoized function that uploads an image into a bucket folder.
 * When `existingPath` is given, the file overwrites it (same public URL).
 */
export function useUploadImage() {
  return useCallback(async (folder: string, file: File, existingPath?: string) => {
    const formData = new FormData();
    formData.append("folder", folder);
    formData.append("file", file);
    if (existingPath) formData.append("path", existingPath);

    const res = await fetch("/api/files/image", { method: "POST", body: formData });
    if (!res.ok) throw await parseError(res);
    return res.json() as Promise<{ url: string; path: string }>;
  }, []);
}
