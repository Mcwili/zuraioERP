"use client";

import { useTranslations } from "next-intl";

interface BudgetVsActualRow {
  orderId: string;
  orderLabel: string;
  customerName: string;
  plannedPersonnel: number;
  plannedExternal: number;
  plannedInfrastructure: number;
  plannedRevenue: number;
  plannedTotal: number;
  actualBudget: number;
  actualExpense: number;
  actualTotal: number;
  variance: number;
}

interface BudgetVsActualData {
  rows: BudgetVsActualRow[];
}

interface BudgetVsActualReportProps {
  data: BudgetVsActualData;
}

export function BudgetVsActualReport({ data }: BudgetVsActualReportProps) {
  const t = useTranslations("reporting");
  const format = (v: number) => v.toLocaleString("de-CH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div
      className="rounded-lg border overflow-hidden bg-white"
      style={{ borderColor: "#e1dfdd" }}
    >
      <table className="w-full text-sm">
        <thead style={{ backgroundColor: "#f8f8f7", borderBottom: "1px solid #e1dfdd" }}>
          <tr>
            <th className="text-left px-3 py-2 text-xs font-medium text-zuraio-textMuted">
              {t("order")}
            </th>
            <th className="text-left px-3 py-2 text-xs font-medium text-zuraio-textMuted">
              {t("customer")}
            </th>
            <th className="text-right px-3 py-2 text-xs font-medium text-zuraio-textMuted">
              {t("planned")} (Person)
            </th>
            <th className="text-right px-3 py-2 text-xs font-medium text-zuraio-textMuted">
              {t("planned")} (Ext.)
            </th>
            <th className="text-right px-3 py-2 text-xs font-medium text-zuraio-textMuted">
              {t("planned")} (Infra)
            </th>
            <th className="text-right px-3 py-2 text-xs font-medium text-zuraio-textMuted">
              {t("planned")} Total
            </th>
            <th className="text-right px-3 py-2 text-xs font-medium text-zuraio-textMuted">
              {t("actual")}
            </th>
            <th className="text-right px-3 py-2 text-xs font-medium text-zuraio-textMuted">
              {t("variance")}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.rows.length === 0 ? (
            <tr>
              <td colSpan={8} className="px-4 py-6 text-center text-zuraio-textMuted text-sm">
                {t("noData")}
              </td>
            </tr>
          ) : (
            data.rows.map((row) => (
              <tr
                key={row.orderId}
                className="border-t transition-colors hover:bg-[#DCE6B5]"
                style={{ borderColor: "#e1dfdd" }}
              >
                <td className="px-3 py-2">{row.orderLabel}</td>
                <td className="px-3 py-2">{row.customerName}</td>
                <td className="px-3 py-2 text-right tabular-nums">
                  {format(row.plannedPersonnel)}
                </td>
                <td className="px-3 py-2 text-right tabular-nums">
                  {format(row.plannedExternal)}
                </td>
                <td className="px-3 py-2 text-right tabular-nums">
                  {format(row.plannedInfrastructure)}
                </td>
                <td className="px-3 py-2 text-right tabular-nums">
                  {format(row.plannedTotal)}
                </td>
                <td className="px-3 py-2 text-right tabular-nums">
                  {format(row.actualTotal)}
                </td>
                <td
                  className="px-3 py-2 text-right tabular-nums"
                  style={{ color: row.variance > 0 ? "#c00" : "#1c1c1c" }}
                >
                  {format(row.variance)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
