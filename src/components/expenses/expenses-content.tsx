"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Search, Plus } from "lucide-react";
import { formatDateCHDot, toISODate } from "@/lib/date-format";
import { EXPENSE_COST_TYPES, costTypeToI18nKey } from "@/lib/expense-cost-types";
import { PlannedExpensesTable } from "./planned-expenses-table";
import { ActualCostsTable } from "./actual-costs-table";
import { PlannedExpenseForm } from "./planned-expense-form";
import { ActualCostForm } from "./actual-cost-form";
import { ExpensesChart, type ChartDataPoint } from "./expenses-chart";

interface PlannedExpense {
  id: string;
  description: string;
  estimatedAmount: number;
  currency: string;
  plannedDate: string | null;
  costType: string;
  status: string;
  organizationId: string | null;
  orderId: string | null;
  organization: { id: string; name: string } | null;
  order: { id: string; orderNumber: string | null; projectName: string | null } | null;
}

interface ActualCost {
  id: string;
  description: string | null;
  amount: number;
  vatAmount: number | null;
  currency: string;
  paidAt: string;
  supplier: string | null;
  assignedMonth: string | null;
  organizationId: string;
  orderId: string | null;
  plannedExpenseId: string | null;
  organization: { id: string; name: string };
  order: { id: string; orderNumber: string | null; projectName: string | null } | null;
  plannedExpense: { id: string; description: string } | null;
  documents: { id: string; fileName: string; sharePointWebUrl: string | null }[];
}

interface Organization {
  id: string;
  name: string;
}

interface Order {
  id: string;
  orderNumber: string | null;
  projectName: string | null;
}

interface ExpensesContentProps {
  plannedExpenses: PlannedExpense[];
  actualCosts: ActualCost[];
  organizations: Organization[];
  orders: Order[];
  chartData?: ChartDataPoint[];
  filters: {
    orderId?: string;
    organizationId?: string;
    status?: string;
    costType?: string;
    dateFrom?: string;
    dateTo?: string;
    search?: string;
  };
}

export function ExpensesContent({
  plannedExpenses,
  actualCosts,
  organizations,
  orders,
  chartData = [],
  filters,
}: ExpensesContentProps) {
  const t = useTranslations("expenses");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"planned" | "actual">("planned");
  const [search, setSearch] = useState(filters.search ?? "");
  const [addPlannedOpen, setAddPlannedOpen] = useState(false);
  const [addActualOpen, setAddActualOpen] = useState(false);

  // useSearchParams() kann bei statischem Rendering null zurückgeben
  const params = searchParams ?? new URLSearchParams();

  function updateFilters(updates: Record<string, string | undefined>) {
    const next = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(updates)) {
      if (v) next.set(k, v);
      else next.delete(k);
    }
    router.push(`/dashboard/expenses?${next.toString()}`);
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    updateFilters({ search: search.trim() || undefined });
  }

  const tabs = [
    { id: "planned" as const, label: t("plannedExpenses") },
    { id: "actual" as const, label: t("actualCosts") },
  ];

  return (
    <div className="space-y-4">
      {chartData.length > 0 && (
        <ExpensesChart
          data={chartData}
          filters={{
            orderId: filters.orderId,
            organizationId: filters.organizationId,
          }}
        />
      )}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-start">
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none"
            style={{ color: "#605e5c" }}
          />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="w-full pl-9 pr-3 py-2 text-sm border rounded border-[#e1dfdd] bg-white placeholder:text-zuraio-textMuted focus:outline-none focus:ring-2 focus:ring-[#DCE6B5]"
          />
        </form>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setAddPlannedOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-sm rounded transition-colors hover:bg-[#DCE6B5]"
            style={{ color: "#9FAF52", border: "1px solid #e1dfdd" }}
          >
            <Plus className="h-4 w-4" />
            {t("addPlannedExpense")}
          </button>
          <button
            type="button"
            onClick={() => setAddActualOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-sm rounded transition-colors hover:bg-[#DCE6B5]"
            style={{ color: "#9FAF52", border: "1px solid #e1dfdd" }}
          >
            <Plus className="h-4 w-4" />
            {t("addActualCost")}
          </button>
        </div>
      </div>

      <ExpensesFilters
        filters={filters}
        organizations={organizations}
        orders={orders}
        onFilterChange={updateFilters}
      />

      <div className="rounded-lg border overflow-hidden bg-white" style={{ borderColor: "#e1dfdd" }}>
        <div className="flex border-b" style={{ borderColor: "#e1dfdd" }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className="px-4 py-3 text-sm font-medium transition-colors"
              style={{
                backgroundColor: activeTab === tab.id ? "#DCE6B5" : "transparent",
                color: activeTab === tab.id ? "#1c1c1c" : "#605e5c",
                borderBottom: activeTab === tab.id ? "2px solid #9FAF52" : "2px solid transparent",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "planned" && (
          <PlannedExpensesTable
            expenses={plannedExpenses}
            organizations={organizations}
            orders={orders}
            onAdd={() => setAddPlannedOpen(true)}
          />
        )}
        {activeTab === "actual" && (
          <ActualCostsTable
            costs={actualCosts}
            organizations={organizations}
            orders={orders}
            plannedExpenses={plannedExpenses}
            onAdd={() => setAddActualOpen(true)}
          />
        )}
      </div>

      {addPlannedOpen && (
        <PlannedExpenseForm
          organizations={organizations}
          orders={orders}
          onClose={() => setAddPlannedOpen(false)}
          onSuccess={() => setAddPlannedOpen(false)}
        />
      )}
      {addActualOpen && (
        <ActualCostForm
          organizations={organizations}
          orders={orders}
          plannedExpenses={plannedExpenses}
          onClose={() => setAddActualOpen(false)}
          onSuccess={() => setAddActualOpen(false)}
        />
      )}
    </div>
  );
}

function ExpensesFilters({
  filters,
  organizations,
  orders,
  onFilterChange,
}: {
  filters: ExpensesContentProps["filters"];
  organizations: Organization[];
  orders: Order[];
  onFilterChange: (updates: Record<string, string | undefined>) => void;
}) {
  const t = useTranslations("expenses");
  const [dateFromStr, setDateFromStr] = useState("");
  const [dateToStr, setDateToStr] = useState("");

  useEffect(() => {
    setDateFromStr(
      filters.dateFrom ? formatDateCHDot(new Date(filters.dateFrom)) : ""
    );
  }, [filters.dateFrom]);
  useEffect(() => {
    setDateToStr(
      filters.dateTo ? formatDateCHDot(new Date(filters.dateTo)) : ""
    );
  }, [filters.dateTo]);

  function handleDateFromChange(value: string) {
    setDateFromStr(value);
    if (value.trim() === "") {
      onFilterChange({ dateFrom: undefined });
    } else {
      const iso = toISODate(value);
      if (iso) onFilterChange({ dateFrom: iso });
    }
  }
  function handleDateToChange(value: string) {
    setDateToStr(value);
    if (value.trim() === "") {
      onFilterChange({ dateTo: undefined });
    } else {
      const iso = toISODate(value);
      if (iso) onFilterChange({ dateTo: iso });
    }
  }

  return (
    <div className="flex flex-wrap gap-3 items-center text-sm">
      <select
        value={filters.organizationId ?? ""}
        onChange={(e) => onFilterChange({ organizationId: e.target.value || undefined })}
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
        value={filters.orderId ?? ""}
        onChange={(e) => onFilterChange({ orderId: e.target.value || undefined })}
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
      <select
        value={filters.status ?? ""}
        onChange={(e) => onFilterChange({ status: e.target.value || undefined })}
        className="px-3 py-2 border rounded bg-white"
        style={{ borderColor: "#e1dfdd" }}
      >
        <option value="">{t("allStatuses")}</option>
        <option value="PLANNED">{t("statusPlanned")}</option>
        <option value="IN_PROGRESS">{t("statusInProgress")}</option>
        <option value="PAID">{t("statusPaid")}</option>
      </select>
      <select
        value={filters.costType ?? ""}
        onChange={(e) => onFilterChange({ costType: e.target.value || undefined })}
        className="px-3 py-2 border rounded bg-white"
        style={{ borderColor: "#e1dfdd" }}
      >
        <option value="">{t("filterByCostType")}</option>
        {EXPENSE_COST_TYPES.map((v) => (
          <option key={v} value={v}>
            {t(costTypeToI18nKey[v])}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={dateFromStr}
        onChange={(e) => handleDateFromChange(e.target.value)}
        className="px-3 py-2 border rounded bg-white w-[120px]"
        style={{ borderColor: "#e1dfdd" }}
        placeholder="dd.mm.yyyy"
      />
      <input
        type="text"
        value={dateToStr}
        onChange={(e) => handleDateToChange(e.target.value)}
        className="px-3 py-2 border rounded bg-white w-[120px]"
        style={{ borderColor: "#e1dfdd" }}
        placeholder="dd.mm.yyyy"
      />
    </div>
  );
}
