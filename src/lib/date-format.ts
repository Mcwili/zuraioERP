/**
 * Datumsformat: dd/mm/yyyy (DD/MM/YYYY)
 */

/** Formatiert ein Date-Objekt ins Format dd/mm/yyyy */
export function formatDateCH(d: Date): string {
  const day = d.getDate().toString().padStart(2, "0");
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

/** Parst eine Datumszeichenkette im Format dd/mm/yyyy zu Date (akzeptiert / und .) */
export function parseDateCH(s: string): Date | null {
  const trimmed = s?.trim();
  if (!trimmed) return null;
  const match = trimmed.match(/^(\d{1,2})[./](\d{1,2})[./](\d{4})$/);
  if (!match) return null;
  const [, day, month, year] = match;
  const d = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
  return isNaN(d.getTime()) ? null : d;
}

/** Konvertiert Schweizer Format zu ISO (YYYY-MM-DD) für HTML date input / API */
export function toISODate(s: string): string | null {
  const d = parseDateCH(s);
  if (!d) return null;
  return d.toISOString().slice(0, 10);
}
