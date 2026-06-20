/** Builds an Error from a failed fetch Response, extracting the API message. */
export async function parseError(res: Response): Promise<Error> {
  const data = await res.json().catch(() => null);
  const message =
    data?.error?.message ??
    (typeof data?.error === "string" ? data.error : null) ??
    `Erreur ${res.status}`;
  return new Error(message);
}
