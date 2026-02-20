"use client";

import { Fragment, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import type { IncomeStatementData, IncomeStatementMonthData } from "@/server/actions/reporting";
import { costTypeToI18nKey } from "@/lib/expense-cost-types";
import { IncomeStatementChart } from "./income-statement-chart";

interface IncomeStatementReportProps {
  data: IncomeStatementData;
}

/** Reihenfolge Personalaufwand wie im Referenzbild (costTypes werden summiert) */
const PERSONNEL_ORDER: { costTypes: string[]; labelKey: string }[] = [
  { costTypes: ["LOHN", "PERSONNEL"], labelKey: "costTypeLohn" },
  { costTypes: [], labelKey: "costTypeSozialversicherung" },
  { costTypes: ["SPESEN"], labelKey: "costTypeSpesen" },
  { costTypes: [], labelKey: "costTypeBenefits" },
  { costTypes: [], labelKey: "costTypeRekrutierung" },
  { costTypes: [], labelKey: "costTypePersonalausfluege" },
  { costTypes: ["AUS_WEITERBILDUNG"], labelKey: "costTypeAusWeiterbildung" },
  { costTypes: ["SONSTIGES"], labelKey: "costTypeSonstiges" },
];

/** Unterpositionen für Property Cost (Platzhalter für künftige Aufschlüsselung) */
const PROPERTY_ORDER: { costTypes: string[]; labelKey: string }[] = [];

/** Reihenfolge Betriebsaufwand wie im Referenzbild */
const OPERATING_ORDER: { costTypes: string[]; labelKey: string }[] = [
  { costTypes: ["BUCHFUEHRUNG"], labelKey: "costTypeBuchfuehrungBeratungAudit" },
  { costTypes: ["FAHRZEUG"], labelKey: "costTypeFahrzeug" },
  { costTypes: ["INFORMATIK", "INFRASTRUCTURE"], labelKey: "costTypeInformatik" },
  { costTypes: [], labelKey: "costTypeSchadenRechtsfaelle" },
  { costTypes: ["UNTERHALT_REPARATUR_ERSATZ"], labelKey: "costTypeUnterhaltReparaturErsatz" },
  { costTypes: ["VERWALTUNG"], labelKey: "costTypeVerwaltung" },
  { costTypes: [], labelKey: "costTypeVersicherungenAbgaben" },
  { costTypes: ["WERBUNG_AKQUISITION"], labelKey: "costTypeWerbungAkquisition" },
  { costTypes: ["EXTERNAL"], labelKey: "costTypeSonstiges" },
];

type RowType =
  | { type: "revenue" }
  | { type: "directCost" }
  | { type: "directCostSub"; costType: string }
  | { type: "grossProfit" }
  | { type: "grossProfitMargin" }
  | { type: "personnelCost" }
  | { type: "personnelCostSub"; costTypes: string[]; labelKey: string }
  | { type: "propertyCost" }
  | { type: "propertyCostSub"; costTypes: string[]; labelKey: string }
  | { type: "operatingCost" }
  | { type: "operatingCostSub"; costTypes: string[]; labelKey: string }
  | { type: "ebitda" }
  | { type: "normalizations" }
  | { type: "normalizedEbitda" };

function getMonthValue(
  month: IncomeStatementMonthData,
  row: RowType,
  useActual: boolean
): number {
  const actual = useActual;
  switch (row.type) {
    case "revenue":
      return actual ? month.revenue : month.budgetRevenue;
    case "directCost":
      return actual ? month.directCost : month.budgetDirectCost;
    case "directCostSub":
      return actual && row.costType
        ? (month.directCostByType[row.costType] ?? 0)
        : 0;
    case "grossProfit":
      return actual ? month.grossProfit : month.budgetGrossProfit;
    case "grossProfitMargin": {
      const rev = actual ? month.revenue : month.budgetRevenue;
      const gp = actual ? month.grossProfit : month.budgetGrossProfit;
      return rev > 0 ? (gp / rev) * 100 : 0;
    }
    case "personnelCost":
      return actual ? month.personnelCost : month.budgetPersonnelCost;
    case "personnelCostSub":
      return actual
        ? row.costTypes.reduce(
            (s, ct) => s + (month.personnelCostByType[ct] ?? 0),
            0
          )
        : 0;
    case "propertyCost":
      return actual ? month.propertyCost : month.budgetPropertyCost;
    case "propertyCostSub":
      return 0;
    case "operatingCost":
      return actual ? month.operatingCost : month.budgetOperatingCost;
    case "operatingCostSub":
      return actual
        ? row.costTypes.reduce(
            (s, ct) => s + (month.operatingCostByType[ct] ?? 0),
            0
          )
        : 0;
    case "ebitda":
      return actual ? month.ebitda : month.budgetEbitda;
    case "normalizations":
      return actual ? month.normalizations : month.budgetNormalizations;
    case "normalizedEbitda":
      return actual ? month.normalizedEbitda : month.budgetNormalizedEbitda;
    default:
      return 0;
  }
}

function buildRows(months: IncomeStatementMonthData[]): RowType[] {
  const directTypes = new Set<string>();
  for (const m of months) {
    Object.keys(m.directCostByType).forEach((k) => directTypes.add(k));
  }
  const directOrder = ["EXTERNAL", "INFRASTRUCTURE"];

  const rows: RowType[] = [
    { type: "revenue" },
    { type: "directCost" },
    ...Array.from(directTypes)
      .sort((a, b) => directOrder.indexOf(a) - directOrder.indexOf(b) || a.localeCompare(b))
      .map((costType) => ({ type: "directCostSub" as const, costType })),
    { type: "grossProfit" },
    { type: "grossProfitMargin" },
    { type: "personnelCost" },
    ...PERSONNEL_ORDER.map(({ costTypes, labelKey }) => ({
      type: "personnelCostSub" as const,
      costTypes,
      labelKey,
    })),
    { type: "propertyCost" },
    ...PROPERTY_ORDER.map(({ costTypes, labelKey }) => ({
      type: "propertyCostSub" as const,
      costTypes,
      labelKey,
    })),
    { type: "operatingCost" },
    ...OPERATING_ORDER.map(({ costTypes, labelKey }) => ({
      type: "operatingCostSub" as const,
      costTypes,
      labelKey,
    })),
    { type: "ebitda" },
    { type: "normalizations" },
    { type: "normalizedEbitda" },
  ];

  return rows;
}

export function IncomeStatementReport({ data }: IncomeStatementReportProps) {
  const t = useTranslations("reporting");
  const tExpenses = useTranslations("expenses");
  const [directCostCollapsed, setDirectCostCollapsed] = useState(true);
  const [personnelCollapsed, setPersonnelCollapsed] = useState(true);
  const [operatingCollapsed, setOperatingCollapsed] = useState(true);
  const format = (v: number) =>
    v.toLocaleString("de-CH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const allRows = buildRows(data.months);
  const [propertyCostCollapsed, setPropertyCostCollapsed] = useState(true);

  const rows = allRows.filter((row) => {
    if (row.type === "directCostSub" && directCostCollapsed) return false;
    if (row.type === "personnelCostSub" && personnelCollapsed) return false;
    if (row.type === "propertyCostSub" && propertyCostCollapsed) return false;
    if (row.type === "operatingCostSub" && operatingCollapsed) return false;
    return true;
  });

  function getYearSum(row: RowType): number {
    if (row.type === "grossProfitMargin") {
      const totalRevenue = data.months.reduce(
        (s, m) => s + (m.isActual ? m.revenue : m.budgetRevenue),
        0
      );
      const totalGrossProfit = data.months.reduce(
        (s, m) =>
          s + (m.isActual ? m.grossProfit : m.budgetGrossProfit),
        0
      );
      return totalRevenue > 0 ? (totalGrossProfit / totalRevenue) * 100 : 0;
    }
    return data.months.reduce(
      (s, m) => s + getMonthValue(m, row, m.isActual),
      0
    );
  }

  function getRowLabel(row: RowType): string {
    switch (row.type) {
      case "revenue":
        return t("ertrag");
      case "directCost":
        return t("directCost");
      case "directCostSub":
        return `  ${tExpenses(costTypeToI18nKey[row.costType] ?? "costTypeSonstiges")}`;
      case "grossProfit":
        return t("grossProfit");
      case "grossProfitMargin":
        return t("grossProfitMargin");
      case "personnelCost":
        return t("personnelCost");
      case "personnelCostSub":
        return `  ${tExpenses(row.labelKey)}`;
      case "propertyCost":
        return t("propertyCost");
      case "propertyCostSub":
        return `  ${tExpenses(row.labelKey)}`;
      case "operatingCost":
        return t("operatingCost");
      case "operatingCostSub":
        return `  ${tExpenses(row.labelKey)}`;
      case "ebitda":
        return t("ebitda");
      case "normalizations":
        return t("normalizations");
      case "normalizedEbitda":
        return t("normalizedEbitda");
      default:
        return "";
    }
  }

  const isSubRow = (row: RowType) =>
    row.type === "directCostSub" ||
    row.type === "personnelCostSub" ||
    row.type === "propertyCostSub" ||
    row.type === "operatingCostSub";
  const isBold = (row: RowType) =>
    row.type === "grossProfit" ||
    row.type === "ebitda" ||
    row.type === "normalizedEbitda";

  const isMarginRow = (row: RowType) => row.type === "grossProfitMargin";

  const isExpenseRow = (row: RowType) =>
    row.type === "directCost" ||
    row.type === "directCostSub" ||
    row.type === "personnelCost" ||
    row.type === "personnelCostSub" ||
    row.type === "propertyCost" ||
    row.type === "propertyCostSub" ||
    row.type === "operatingCost" ||
    row.type === "operatingCostSub";

  const isPersonnelRow = (row: RowType) =>
    row.type === "personnelCost" || row.type === "personnelCostSub";
  const isOperatingRow = (row: RowType) =>
    row.type === "operatingCost" || row.type === "operatingCostSub";

  return (
    <div className="space-y-6">
      <IncomeStatementChart data={data} />
      <div
        className="rounded-lg border overflow-hidden bg-white overflow-x-auto"
        style={{ borderColor: "#e1dfdd" }}
      >
      <table className="w-full text-sm" style={{ tableLayout: "fixed", minWidth: 1196 }}>
        <colgroup>
          <col style={{ width: 200 }} />
          {data.months.map((m) => (
            <col key={m.month} style={{ width: 68 }} />
          ))}
          <col style={{ width: 180 }} />
        </colgroup>
        <thead style={{ backgroundColor: "#f8f8f7", borderBottom: "1px solid #e1dfdd" }}>
          <tr>
            <th
              className="text-left px-3 py-2 text-xs font-medium text-zuraio-textMuted sticky left-0 bg-[#f8f8f7]"
              rowSpan={2}
            >
              {data.year}
            </th>
            {data.months.map((m) => {
              const [y, mo] = m.month.split("-").map(Number);
              const now = new Date();
              const isActual =
                y < now.getFullYear() ||
                (y === now.getFullYear() && mo < now.getMonth() + 1);
              return (
                <th
                  key={m.month}
                  className="text-right px-2 py-1.5 text-xs font-medium text-zuraio-textMuted"
                  style={{
                    backgroundColor: isActual ? "#e8f0d4" : "#f0f0ee",
                  }}
                >
                  {m.label}
                </th>
              );
            })}
            <th
              className="text-right px-3 py-2 text-xs font-medium text-zuraio-textMuted border-l sticky right-0 bg-[#f8f8f7] shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.05)]"
              style={{ borderColor: "#e1dfdd", minWidth: 180 }}
              rowSpan={2}
            >
              {t("yearTotal")}
            </th>
          </tr>
          <tr>
            {data.months.map((m) => {
              const [y, mo] = m.month.split("-").map(Number);
              const now = new Date();
              const isActual =
                y < now.getFullYear() ||
                (y === now.getFullYear() && mo < now.getMonth() + 1);
              const ab = isActual ? "A" : "B";
              return (
                <th
                  key={m.month}
                  className="text-center px-2 py-1 text-xs font-bold"
                  style={{
                    backgroundColor: isActual ? "#e8f0d4" : "#f0f0ee",
                    color: isActual ? "#1c1c1c" : "#605e5c",
                  }}
                  title={isActual ? t("actual") : t("planned")}
                >
                  {ab}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <Fragment
              key={
                "labelKey" in row
                  ? `${row.type}-${row.labelKey}`
                  : `${row.type}-${idx}`
              }
            >
              <tr className="border-t" style={{ borderColor: "#e1dfdd" }}>
              <td
                className={`px-3 py-2 sticky left-0 bg-white ${isSubRow(row) ? "pl-6" : ""} ${isBold(row) ? "font-semibold" : ""} ${isMarginRow(row) ? "italic" : ""}`}
                style={{ color: "#1c1c1c" }}
              >
                <span className="inline-flex items-center gap-1">
                  {row.type === "directCost" && (
                    <button
                      type="button"
                      onClick={() => setDirectCostCollapsed((c) => !c)}
                      className="p-0.5 rounded hover:bg-[#e8e8e6] transition-colors"
                      aria-label={directCostCollapsed ? t("expand") : t("collapse")}
                    >
                      {directCostCollapsed ? (
                        <ChevronRight className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                  )}
                  {row.type === "personnelCost" && (
                    <button
                      type="button"
                      onClick={() => setPersonnelCollapsed((c) => !c)}
                      className="p-0.5 rounded hover:bg-[#e8e8e6] transition-colors"
                      aria-label={personnelCollapsed ? t("expand") : t("collapse")}
                    >
                      {personnelCollapsed ? (
                        <ChevronRight className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                  )}
                  {row.type === "propertyCost" && (
                    <button
                      type="button"
                      onClick={() => setPropertyCostCollapsed((c) => !c)}
                      className="p-0.5 rounded hover:bg-[#e8e8e6] transition-colors"
                      aria-label={propertyCostCollapsed ? t("expand") : t("collapse")}
                    >
                      {propertyCostCollapsed ? (
                        <ChevronRight className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                  )}
                  {row.type === "operatingCost" && (
                    <button
                      type="button"
                      onClick={() => setOperatingCollapsed((c) => !c)}
                      className="p-0.5 rounded hover:bg-[#e8e8e6] transition-colors"
                      aria-label={operatingCollapsed ? t("expand") : t("collapse")}
                    >
                      {operatingCollapsed ? (
                        <ChevronRight className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                  )}
                  {getRowLabel(row)}
                </span>
              </td>
              {data.months.map((month) => {
                const val = getMonthValue(month, row, month.isActual);
                const isNegative = isExpenseRow(row);
                const displayVal = isNegative && val !== 0 ? -Math.abs(val) : val;
                const cellContent = isMarginRow(row)
                  ? `${displayVal.toLocaleString("de-CH", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} %`
                  : format(displayVal);
                return (
                  <td
                    key={month.month}
                    className={`px-2 py-2 text-right tabular-nums ${isBold(row) ? "font-semibold" : ""} ${isMarginRow(row) ? "italic" : ""}`}
                    style={{
                      backgroundColor: month.isActual ? "#e8f0d4" : "#f0f0ee",
                      color: !isMarginRow(row) && displayVal < 0 ? "#c00" : "#1c1c1c",
                    }}
                  >
                    {cellContent}
                  </td>
                );
              })}
              <td
                className={`px-3 py-2 text-right tabular-nums border-l sticky right-0 bg-white ${isBold(row) ? "font-semibold" : ""} ${isMarginRow(row) ? "italic" : ""}`}
                style={{
                  minWidth: 180,
                  color:
                    !isMarginRow(row) &&
                    ((isExpenseRow(row) && getYearSum(row) !== 0) ||
                      getYearSum(row) < 0)
                      ? "#c00"
                      : "#1c1c1c",
                  borderColor: "#e1dfdd",
                  boxShadow: "-4px 0 6px -2px rgba(0,0,0,0.05)",
                }}
              >
                {isMarginRow(row)
                  ? `${getYearSum(row).toLocaleString("de-CH", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} %`
                  : format(
                      isExpenseRow(row) && getYearSum(row) !== 0
                        ? -Math.abs(getYearSum(row))
                        : getYearSum(row)
                    )}
              </td>
            </tr>
            {isMarginRow(row) && (
              <tr>
                <td
                  colSpan={(data.months?.length ?? 12) + 2}
                  className="py-1"
                  style={{ backgroundColor: "#f8f8f7" }}
                  aria-hidden
                />
              </tr>
            )}
          </Fragment>
          ))}
        </tbody>
      </table>
      <div className="px-3 py-2 border-t text-xs" style={{ borderColor: "#e1dfdd", color: "#605e5c" }}>
        <span className="inline-flex items-center gap-1.5 mr-4">
          <span className="inline-block w-5 h-4 rounded text-center font-bold text-[10px] leading-4" style={{ backgroundColor: "#DCE6B5", color: "#1c1c1c" }}>A</span>
          {t("legendA")}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block w-5 h-4 rounded text-center font-bold text-[10px] leading-4" style={{ backgroundColor: "#e8e8e6", color: "#605e5c" }}>B</span>
          {t("legendB")}
        </span>
      </div>
    </div>
    </div>
  );
}
