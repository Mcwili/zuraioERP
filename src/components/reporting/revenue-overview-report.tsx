"use client";

import { useTranslations } from "next-intl";

interface RevenueOverviewData {
  byMonth: { month: string; label: string; invoiced: number; paid: number; open: number }[];
  byCustomer: { id: string; name: string; invoiced: number; paid: number; open: number }[];
  byOrder: { id: string; label: string; invoiced: number; paid: number; open: number }[];
}

interface RevenueOverviewReportProps {
  data: RevenueOverviewData;
}

export function RevenueOverviewReport({ data }: RevenueOverviewReportProps) {
  const t = useTranslations("reporting");
  const format = (v: number) => v.toLocaleString("de-CH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <div
        className="rounded-lg border overflow-hidden bg-white"
        style={{ borderColor: "#e1dfdd" }}
      >
        <h3 className="px-4 py-3 text-sm font-medium" style={{ backgroundColor: "#f8f8f7", borderBottom: "1px solid #e1dfdd" }}>
          {t("month")}
        </h3>
        <table className="w-full text-sm">
          <thead style={{ backgroundColor: "#f8f8f7", borderBottom: "1px solid #e1dfdd" }}>
            <tr>
              <th className="text-left px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                {t("month")}
              </th>
              <th className="text-right px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                {t("invoiced")}
              </th>
              <th className="text-right px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                {t("paid")}
              </th>
              <th className="text-right px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                {t("open")}
              </th>
            </tr>
          </thead>
          <tbody>
            {data.byMonth.map((row) => (
              <tr
                key={row.month}
                className="border-t transition-colors hover:bg-[#DCE6B5]"
                style={{ borderColor: "#e1dfdd" }}
              >
                <td className="px-3 py-2">{row.label}</td>
                <td className="px-3 py-2 text-right tabular-nums">{format(row.invoiced)}</td>
                <td className="px-3 py-2 text-right tabular-nums">{format(row.paid)}</td>
                <td className="px-3 py-2 text-right tabular-nums">{format(row.open)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        className="rounded-lg border overflow-hidden bg-white"
        style={{ borderColor: "#e1dfdd" }}
      >
        <h3 className="px-4 py-3 text-sm font-medium" style={{ backgroundColor: "#f8f8f7", borderBottom: "1px solid #e1dfdd" }}>
          {t("customer")}
        </h3>
        <table className="w-full text-sm">
          <thead style={{ backgroundColor: "#f8f8f7", borderBottom: "1px solid #e1dfdd" }}>
            <tr>
              <th className="text-left px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                {t("customer")}
              </th>
              <th className="text-right px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                {t("invoiced")}
              </th>
              <th className="text-right px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                {t("paid")}
              </th>
              <th className="text-right px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                {t("open")}
              </th>
            </tr>
          </thead>
          <tbody>
            {data.byCustomer.map((row) => (
              <tr
                key={row.id}
                className="border-t transition-colors hover:bg-[#DCE6B5]"
                style={{ borderColor: "#e1dfdd" }}
              >
                <td className="px-3 py-2">{row.name}</td>
                <td className="px-3 py-2 text-right tabular-nums">{format(row.invoiced)}</td>
                <td className="px-3 py-2 text-right tabular-nums">{format(row.paid)}</td>
                <td className="px-3 py-2 text-right tabular-nums">{format(row.open)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        className="rounded-lg border overflow-hidden bg-white"
        style={{ borderColor: "#e1dfdd" }}
      >
        <h3 className="px-4 py-3 text-sm font-medium" style={{ backgroundColor: "#f8f8f7", borderBottom: "1px solid #e1dfdd" }}>
          {t("order")}
        </h3>
        <table className="w-full text-sm">
          <thead style={{ backgroundColor: "#f8f8f7", borderBottom: "1px solid #e1dfdd" }}>
            <tr>
              <th className="text-left px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                {t("order")}
              </th>
              <th className="text-right px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                {t("invoiced")}
              </th>
              <th className="text-right px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                {t("paid")}
              </th>
              <th className="text-right px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                {t("open")}
              </th>
            </tr>
          </thead>
          <tbody>
            {data.byOrder.map((row) => (
              <tr
                key={row.id}
                className="border-t transition-colors hover:bg-[#DCE6B5]"
                style={{ borderColor: "#e1dfdd" }}
              >
                <td className="px-3 py-2">{row.label}</td>
                <td className="px-3 py-2 text-right tabular-nums">{format(row.invoiced)}</td>
                <td className="px-3 py-2 text-right tabular-nums">{format(row.paid)}</td>
                <td className="px-3 py-2 text-right tabular-nums">{format(row.open)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
