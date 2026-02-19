/**
 * Konvertiert Prisma-Objekte in ein serialisierbares Format für Client Components.
 * Prisma Decimal-Objekte werden zu number konvertiert, da sie sonst einen 500-Fehler verursachen.
 */

export function toSerializable(value: unknown): unknown {
  if (value === null || value === undefined) return value;
  if (typeof value === "number" || typeof value === "string" || typeof value === "boolean") return value;
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "object" && value !== null) {
    const obj = value as Record<string, unknown>;
    if (typeof obj.toNumber === "function") {
      return (obj.toNumber as () => number)();
    }
  }
  if (Array.isArray(value)) return value.map(toSerializable);
  if (typeof value === "object" && value !== null) {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      out[k] = toSerializable(v);
    }
    return out;
  }
  return value;
}

export type SerializedOrder = ReturnType<typeof serializeOrder>;

export function serializeOrder<T extends Record<string, unknown>>(order: T): T {
  return toSerializable(order) as T;
}

/** Serialisiert beliebige Daten für RSC→Client (Decimal, etc.). */
export function serializeForRSC<T>(data: T): T {
  return toSerializable(data) as T;
}
