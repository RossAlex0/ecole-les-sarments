import sharp from "sharp";
import { HttpError } from "../../http/httpError";

/** Largest box an uploaded image is shrunk into (never enlarged), in pixels. */
export const IMAGE_MAX_SIZE = { width: 1200, height: 1300 } as const;

const WEBP_QUALITY = 95;

/**
 * Normalizes an uploaded image: applies the EXIF orientation, shrinks it to fit
 * `IMAGE_MAX_SIZE` (ratio kept) and encodes it as WebP.
 * Returns the encoded bytes with their final dimensions.
 */
export async function optimizeImage(file: File) {
  try {
    const { data, info } = await sharp(Buffer.from(await file.arrayBuffer()))
      .rotate()
      .resize({ ...IMAGE_MAX_SIZE, fit: "inside", withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toBuffer({ resolveWithObject: true });

    return { buffer: data, width: info.width, height: info.height };
  } catch {
    throw new HttpError(400, "Fichier image illisible ou format non supporté.");
  }
}
