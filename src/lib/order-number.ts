import { prisma } from "@/lib/prisma";

/**
 * Generiert eine Auftragsnummer im Format: JJJJ + erste 3 Buchstaben des Kunden + fortlaufende Nummer (2-stellig)
 * Beispiel: 2026NEU01
 */
export async function generateOrderNumber(organizationId: string): Promise<string> {
  const org = await prisma.organization.findUnique({
    where: { id: organizationId },
    select: { name: true },
  });
  if (!org) throw new Error("Organisation nicht gefunden");

  const year = new Date().getFullYear().toString();
  const customerCode = getCustomerCode(org.name);
  const prefix = `${year}${customerCode}`;

  const existingOrders = await prisma.order.findMany({
    where: {
      orderNumber: { startsWith: prefix },
    },
    select: { orderNumber: true },
  });

  const numbers = existingOrders
    .map((o) => {
      const numPart = o.orderNumber?.slice(prefix.length) ?? "";
      const n = parseInt(numPart, 10);
      return isNaN(n) ? 0 : n;
    })
    .filter((n) => n >= 0);

  const nextNum = numbers.length === 0 ? 1 : Math.max(...numbers) + 1;
  const seq = nextNum.toString().padStart(2, "0");

  if (nextNum > 99) {
    throw new Error(
      `Fortlaufende Nummer für ${prefix} überschritten (max 99). Bitte Kontakt aufnehmen.`
    );
  }

  return `${prefix}${seq}`;
}

/**
 * Extrahiert die ersten 3 Buchstaben des Kundennamens (nur A-Z, a-z, ÄÖÜäöüß), uppercase.
 * Falls weniger als 3 Buchstaben: wird mit dem vorhandenen gearbeitet.
 */
function getCustomerCode(name: string): string {
  const letters = name
    .replace(/[^A-Za-zÄÖÜäöüß]/g, "")
    .toUpperCase()
    .slice(0, 3);
  return letters || "XXX";
}
