import { supabaseAdmin } from "@/lib/supabase/admin";
import { STORAGE_BUCKET, STORAGE_PATHS, publicFileUrl } from "@/lib/supabase/storage";

export type FileKind = "director-image" | "frais-pdf" | "uniformes-pdf" | "ifi-pdf" | "legs-pdf";

const PATH_BY_KIND: Record<FileKind, string> = {
  "director-image": STORAGE_PATHS.directorImage,
  "frais-pdf": STORAGE_PATHS.fraisPdf,
  "uniformes-pdf": STORAGE_PATHS.uniformesPdf,
  "ifi-pdf": STORAGE_PATHS.ifiPdf,
  "legs-pdf": STORAGE_PATHS.legsPdf,
};

export class FileService {
  /**
   * Uploads a managed file to its fixed path with `upsert` so the previous
   * file is overwritten (delete + insert) and the public URL stays stable.
   */
  async upload(kind: FileKind, file: File) {
    const path = PATH_BY_KIND[kind];
    const { error } = await supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .upload(path, file, { upsert: true, contentType: file.type });
    if (error) throw error;
    return publicFileUrl(path);
  }

  /**
   * Uploads an arbitrary image into `folder`. When `existingPath` is provided,
   * the file is overwritten at the same path (same public URL); otherwise a new
   * stable path is generated. Returns both the public URL and the in-bucket path.
   */
  async uploadImage(folder: string, file: File, existingPath?: string) {
    if (!/^[a-z0-9_-]+$/.test(folder)) throw new Error("Dossier invalide");

    const safeExisting =
      existingPath && /^[a-z0-9/_.-]+$/.test(existingPath) ? existingPath : undefined;
    const path = safeExisting ?? `${folder}/${crypto.randomUUID()}`;

    const { error } = await supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .upload(path, file, { upsert: true, contentType: file.type });
    if (error) throw error;

    // Cache-busting query: when overwriting the same path, the public URL is
    // otherwise identical and the old (cached) image would keep showing.
    return { url: `${publicFileUrl(path)}?v=${Date.now()}`, path };
  }
}
