// External links used across the "Nous soutenir" page.

import { STORAGE_PATHS, publicFileUrl } from "@/lib/supabase/storage";

// HelloAsso — online donation platform for the school's association.
export const HELLOASSO_URL =
  "https://www.helloasso.com/associations/association-louis-antoine-ormieres";

// PDFs managed from the back office (Files): uploading replaces the file at the
// same fixed path, so these URLs stay stable.
export const PDF_IFI_URL = publicFileUrl(STORAGE_PATHS.ifiPdf);
export const PDF_LEGS_URL = publicFileUrl(STORAGE_PATHS.legsPdf);
