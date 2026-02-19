"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

interface OpenItem {
  id: string;
  number: string;
  dueDate: string;
  total: number;
  paid: number;
  open: number;
  daysOverdue: number;
  aging: string;
  customerName: string;
  orderLabel: string;
}

interface OpenItemsData {
  items: OpenItem[];
  byAging: { aging: string; sum: number }[];
}

interface OpenItemsReportProps {
  data: OpenItemsData;
}

export function OpenItemsReport({ data }: OpenItemsReportProps) {
  const t = useTranslations("reporting");
  const format = (v: number) => v.toLocaleString("de-CH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const formatDate = (d: string) => new Date(d).toLocaleDateString("de-CH");

  return (
    <div className="space-y-6">
      {data.byAging.length > 0 && (
        <div
          className="rounded-lg border overflow-hidden bg-white p-4"
          style={{ borderColor: "#e1dfdd" }}
        >
          <h3 className="mb-3 text-sm font-medium" style={{ color: "#1c1c1c" }}>
            {t("sumsByAging")}
          </h3>
          <div className="flex flex-wrap gap-4">
            {data.byAging.map((a) => (
              <div key={a.aging} className="flex items-center gap-2">
                <span className="text-zuraio-textMuted text-sm">{a.aging} Tage:</span>
                <span className="font-medium tabular-nums">{format(a.sum)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div
        className="rounded-lg border overflow-hidden bg-white"
        style={{ borderColor: "#e1dfdd" }}
      >
        <table className="w-full text-sm">
          <thead style={{ backgroundColor: "#f8f8f7", borderBottom: "1px solid #e1dfdd" }}>
            <tr>
              <th className="text-left px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                {t("invoiceNumber")}
              </th>
              <th className="text-left px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                {t("customer")}
              </th>
              <th className="text-left px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                {t("order")}
              </th>
              <th className="text-left px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                {t("dueDate")}
              </th>
              <th className="text-right px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                {t("open")}
              </th>
              <th className="text-right px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                {t("daysOverdue")}
              </th>
              <th className="text-left px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                {t("aging")}
              </th>
            </tr>
          </thead>
          <tbody>
            {data.items.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-zuraio-textMuted text-sm">
                  {t("noData")}
                </td>
              </tr>
            ) : (
              data.items.map((row) => (
                <tr
                  key={row.id}
                  className="border-t transition-colors hover:bg-[#DCE6B5]"
                  style={{ borderColor: "#e1dfdd" }}
                >
                  <td className="px-3 py-2">
                    <Link
                      href="/dashboard/billing"
                      className="font-medium hover:underline"
                      style={{ color: "#9FAF52" }}
                    >
                      {row.number}
                    </Link>
                  </td>
                  <td className="px-3 py-2">{row.customerName}</td>
                  <td className="px-3 py-2">{row.orderLabel}</td>
                  <td className="px-3 py-2">{formatDate(row.dueDate)}</td>
                  <td className="px-3 py-2 text-right tabular-nums">{format(row.open)}</td>
                  <td
                    className="px-3 py-2 text-right tabular-nums"
                    style={{ color: row.daysOverdue > 0 ? "#c00" : "#1c1c1c" }}
                  >
                    {row.daysOverdue > 0 ? row.daysOverdue : "–"}
                  </td>
                  <td className="px-3 py-2">{row.aging}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
