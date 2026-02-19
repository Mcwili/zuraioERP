/**
 * Konvertiert Prisma-Objekte in ein serialisierbares Format für Client Components.
 * Prisma Decimal-Objekte werden zu number konvertiert, da sie sonst einen 500-Fehler verursachen.
 */

function isDecimalLike(value: unknown): value is { toNumber: () => number } {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    !(value instanceof Date) &&
    typeof (value as Record<string, unknown>).toNumber === "function"
  );
}

export function toSerializable(value: unknown): unknown {
  if (value === null || value === undefined) return value;
  if (typeof value === "number" || typeof value === "string" || typeof value === "boolean") return value;
  if (value instanceof Date) return value.toISOString();
  if (isDecimalLike(value)) {
    try {
      return value.toNumber();
    } catch {
      return Number(String(value));
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
