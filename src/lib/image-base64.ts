/**
 * Konvertiert eine Bild-Datei in eine Base64-Data-URL für Speicherung in der DB.
 * Gleiches Format wie bei Profilbildern (users.imageUrl).
 */
export async function fileToBase64DataUrl(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const base64 = buffer.toString("base64");
  return `data:${file.type};base64,${base64}`;
}
