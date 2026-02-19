import type { ExpenseCostType } from "@prisma/client";

/** Alle Kostenarten für Ausgaben */
export const EXPENSE_COST_TYPES: ExpenseCostType[] = [
  "LOHN",
  "SPESEN",
  "AUS_WEITERBILDUNG",
  "SONSTIGES",
  "BUCHFUEHRUNG",
  "FAHRZEUG",
  "INFORMATIK",
  "UNTERHALT_REPARATUR_ERSATZ",
  "VERWALTUNG",
  "WERBUNG_AKQUISITION",
];

/** Mapping Enum-Wert -> i18n-Key */
export const costTypeToI18nKey: Record<string, string> = {
  LOHN: "costTypeLohn",
  SPESEN: "costTypeSpesen",
  AUS_WEITERBILDUNG: "costTypeAusWeiterbildung",
  SONSTIGES: "costTypeSonstiges",
  BUCHFUEHRUNG: "costTypeBuchfuehrung",
  FAHRZEUG: "costTypeFahrzeug",
  INFORMATIK: "costTypeInformatik",
  UNTERHALT_REPARATUR_ERSATZ: "costTypeUnterhaltReparaturErsatz",
  VERWALTUNG: "costTypeVerwaltung",
  WERBUNG_AKQUISITION: "costTypeWerbungAkquisition",
  // Legacy (Budget/alt)
  PERSONNEL: "costTypeLohn",
  EXTERNAL: "costTypeSonstiges",
  INFRASTRUCTURE: "costTypeInformatik",
};
