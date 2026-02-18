/**
 * Konvertiert Prisma-Order-Objekt in ein serialisierbares Format für Client Components.
 * Prisma Decimal-Objekte werden zu number konvertiert, da sie sonst einen 500-Fehler verursachen.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toSerializable(value: unknown): any {
  if (value === null || value === undefined) return value;
  if (typeof value === "number" || typeof value === "string" || typeof value === "boolean") return value;
  if (value instanceof Date) return value;
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
