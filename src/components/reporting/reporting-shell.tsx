"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import type { ReportType } from "@/server/actions/reporting";

const REPORT_IDS: ReportType[] = [
  "income-statement",
  "balance-sheet",
  "cashflow",
  "revenue",
  "open-items",
  "budget-vs-actual",
];

const REPORT_KEYS: Record<ReportType, string> = {
  "income-statement": "incomeStatement",
  "balance-sheet": "balanceSheet",
  cashflow: "cashflow",
  revenue: "revenue",
  "open-items": "openItems",
  "budget-vs-actual": "budgetVsActual",
};

interface ReportingShellProps {
  activeReport: ReportType;
  children: React.ReactNode;
  organizations?: { id: string; name: string }[];
  orders?: { id: string; orderNumber: string | null; projectName: string | null }[];
}

export function ReportingShell({
  activeReport,
  children,
  organizations = [],
  orders = [],
}: ReportingShellProps) {
  const t = useTranslations("reporting");
  const router = useRouter();
  const searchParams = useSearchParams();

  function setReport(report: ReportType) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("report", report);
    router.push(`/dashboard/reporting?${params.toString()}`);
  }

  function updateFilter(key: string, value: string | undefined) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/dashboard/reporting?${params.toString()}`);
  }

  const year = searchParams.get("year") ?? new Date().getFullYear().toString();
  const organizationId = searchParams.get("organizationId") ?? "";
  const orderId = searchParams.get("orderId") ?? "";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-1 border-b" style={{ borderColor: "#e1dfdd" }}>
          {REPORT_IDS.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setReport(id)}
              className="px-3 py-2 text-sm font-medium transition-colors"
              style={{
                backgroundColor: activeReport === id ? "#DCE6B5" : "transparent",
                color: activeReport === id ? "#1c1c1c" : "#605e5c",
                borderBottom: activeReport === id ? "2px solid #9FAF52" : "2px solid transparent",
              }}
            >
              {t(REPORT_KEYS[id])}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 items-center text-sm">
          <select
            value={year}
            onChange={(e) => updateFilter("year", e.target.value || undefined)}
            className="px-3 py-2 border rounded bg-white"
            style={{ borderColor: "#e1dfdd" }}
          >
            {[0, 1, 2, 3].map((i) => {
              const y = new Date().getFullYear() - i;
              return (
                <option key={y} value={y}>
                  {y}
                </option>
              );
            })}
          </select>
          <select
            value={organizationId}
            onChange={(e) => {
              updateFilter("organizationId", e.target.value || undefined);
              updateFilter("orderId", undefined);
            }}
            className="px-3 py-2 border rounded bg-white"
            style={{ borderColor: "#e1dfdd" }}
          >
            <option value="">{t("allOrganizations")}</option>
            {organizations.map((o) => (
              <option key={o.id} value={o.id}>
                {o.name}
              </option>
            ))}
          </select>
          <select
            value={orderId}
            onChange={(e) => updateFilter("orderId", e.target.value || undefined)}
            className="px-3 py-2 border rounded bg-white"
            style={{ borderColor: "#e1dfdd" }}
          >
            <option value="">{t("allOrders")}</option>
            {orders.map((o) => (
              <option key={o.id} value={o.id}>
                {o.orderNumber || o.projectName || o.id}
              </option>
            ))}
          </select>
        </div>
      </div>
      <p className="text-xs" style={{ color: "#605e5c" }}>
        {t("allAmountsInChf")}
      </p>
      {children}
    </div>
  );
}
