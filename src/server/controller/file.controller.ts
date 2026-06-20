import { HttpError } from "../http/httpError";
import { FileService, type FileKind } from "../service/file/file.service";

const ALLOWED_KINDS: FileKind[] = [
  "director-image",
  "frais-pdf",
  "uniformes-pdf",
  "ifi-pdf",
  "legs-pdf",
];

export const FileController = {
  // Admin
  upload: async (request: Request) => {
    const form = await request.formData();
    const kind = form.get("kind");
    const file = form.get("file");

    if (typeof kind !== "string" || !ALLOWED_KINDS.includes(kind as FileKind)) {
      throw new HttpError(400, "Type de fichier inconnu");
    }
    if (!(file instanceof File)) {
      throw new HttpError(400, "Aucun fichier fourni");
    }

    const url = await new FileService().upload(kind as FileKind, file);
    return { url };
  },

  uploadImage: async (request: Request) => {
    const form = await request.formData();
    const folder = form.get("folder");
    const file = form.get("file");
    const path = form.get("path");

    if (typeof folder !== "string" || folder === "") throw new HttpError(400, "Dossier manquant");
    if (!(file instanceof File)) throw new HttpError(400, "Aucun fichier fourni");

    const existingPath = typeof path === "string" && path !== "" ? path : undefined;
    return new FileService().uploadImage(folder, file, existingPath);
  },
};
