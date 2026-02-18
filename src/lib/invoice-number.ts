import { prisma } from "@/lib/prisma";

/**
 * Generiert eine Rechnungsnummer im Format: INV-JJJJ-NNN
 * Beispiel: INV-2026-001
 */
export async function generateInvoiceNumber(): Promise<string> {
  const year = new Date().getFullYear().toString();
  const prefix = `INV-${year}-`;

  const existing = await prisma.invoice.findMany({
    where: { number: { startsWith: prefix } },
    select: { number: true },
  });

  const numbers = existing
    .map((i) => {
      const numPart = i.number.slice(prefix.length);
      const n = parseInt(numPart, 10);
      return isNaN(n) ? 0 : n;
    })
    .filter((n) => n >= 0);

  const nextNum = numbers.length === 0 ? 1 : Math.max(...numbers) + 1;
  return `${prefix}${nextNum.toString().padStart(3, "0")}`;
}
