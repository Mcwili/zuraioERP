"use client";

import { useTranslations } from "next-intl";
import { Pencil, Trash2, Plus, ChevronUp, ChevronDown } from "lucide-react";
import { PlannedExpenseForm } from "./planned-expense-form";
import {
  createPlannedExpense,
  updatePlannedExpense,
  deletePlannedExpense,
} from "@/server/actions/expenses";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { costTypeToI18nKey } from "@/lib/expense-cost-types";

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

interface Organization {
  id: string;
  name: string;
}

interface Order {
  id: string;
  orderNumber: string | null;
  projectName: string | null;
}

interface PlannedExpensesTableProps {
  expenses: PlannedExpense[];
  organizations: Organization[];
  orders: Order[];
  onAdd: () => void;
}


const statusKeys: Record<string, string> = {
  PLANNED: "statusPlanned",
  IN_PROGRESS: "statusInProgress",
  PAID: "statusPaid",
};

type SortKey = "description" | "estimatedAmount" | "plannedDate" | "costType" | "order" | "status";

export function PlannedExpensesTable({
  expenses,
  organizations,
  orders,
  onAdd,
}: PlannedExpensesTableProps) {
  const t = useTranslations("expenses");
  const tActions = useTranslations("actions");
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortKey>("plannedDate");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const sortedExpenses = useMemo(() => {
    const arr = [...expenses];
    arr.sort((a, b) => {
      let cmp = 0;
      switch (sortBy) {
        case "description":
          cmp = (a.description ?? "").localeCompare(b.description ?? "");
          break;
        case "estimatedAmount":
          cmp = a.estimatedAmount - b.estimatedAmount;
          break;
        case "plannedDate": {
          const da = a.plannedDate instanceof Date ? a.plannedDate.toISOString() : String(a.plannedDate ?? "");
          const db = b.plannedDate instanceof Date ? b.plannedDate.toISOString() : String(b.plannedDate ?? "");
          cmp = da.localeCompare(db);
          break;
        }
        case "costType":
          cmp = (a.costType ?? "").localeCompare(b.costType ?? "");
          break;
        case "order":
          cmp = (a.order?.orderNumber ?? a.order?.projectName ?? "").localeCompare(
            (b.order?.orderNumber ?? b.order?.projectName ?? "")
          );
          break;
        case "status":
          cmp = (a.status ?? "").localeCompare(b.status ?? "");
          break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
    return arr;
  }, [expenses, sortBy, sortDir]);

  const handleSort = (key: SortKey) => {
    if (sortBy === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortDir("asc");
    }
  };

  const SortHeader = ({
    sortKey,
    align = "left",
    children,
  }: {
    sortKey: SortKey;
    align?: "left" | "right";
    children: React.ReactNode;
  }) => (
    <th
      className={`${align === "right" ? "text-right" : "text-left"} px-3 py-2 text-xs font-medium text-zuraio-textMuted cursor-pointer select-none hover:bg-[#e1dfdd] transition-colors`}
      onClick={() => handleSort(sortKey)}
    >
      <span className="inline-flex items-center gap-1">
        {children}
        <span className="inline-flex w-3.5 shrink-0 items-center justify-center">
          {sortBy === sortKey ? (
            sortDir === "asc" ? (
              <ChevronUp className="h-3.5 w-3.5" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" />
            )
          ) : (
            <span className="h-3.5 w-3.5" aria-hidden />
          )}
        </span>
      </span>
    </th>
  );

  const formatDate = (d: string | null) =>
    d ? new Date(d).toLocaleDateString("de-CH") : "–";
  const formatAmount = (val: number, currency: string) =>
    `${Number(val).toLocaleString("de-CH")} ${currency}`;

  const handleDelete = async (id: string) => {
    if (!confirm(t("deletePlannedExpenseConfirm"))) return;
    setDeletingId(id);
    try {
      await deletePlannedExpense(id);
      router.refresh();
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      {expenses.length === 0 ? (
        <div className="p-6 text-center text-zuraio-textMuted text-sm">
          {t("noPlannedExpenses")}
          <button
            type="button"
            onClick={onAdd}
            className="ml-2 flex items-center gap-1 text-[#9FAF52] hover:underline"
          >
            <Plus className="h-4 w-4" />
            {t("addPlannedExpense")}
          </button>
        </div>
      ) : (
        <table className="w-full text-sm">
          <thead style={{ backgroundColor: "#f8f8f7", borderBottom: "1px solid #e1dfdd" }}>
            <tr>
              <SortHeader sortKey="description">{t("description")}</SortHeader>
              <SortHeader sortKey="estimatedAmount" align="right">
                {t("estimatedAmount")}
              </SortHeader>
              <SortHeader sortKey="plannedDate">{t("plannedDate")}</SortHeader>
              <SortHeader sortKey="costType">{t("costType")}</SortHeader>
              <SortHeader sortKey="order">{t("order")}</SortHeader>
              <SortHeader sortKey="status">{t("status")}</SortHeader>
              <th className="w-20 px-3 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {sortedExpenses.map((e) => (
              <tr
                key={e.id}
                className="border-t transition-colors hover:bg-[#DCE6B5]"
                style={{ borderColor: "#e1dfdd" }}
              >
                {editingId === e.id ? (
                  <td colSpan={7} className="p-4" style={{ borderColor: "#e1dfdd" }}>
                    <PlannedExpenseForm
                      organizations={organizations}
                      orders={orders}
                      expense={e}
                      onClose={() => setEditingId(null)}
                      onSuccess={() => {
                        setEditingId(null);
                        router.refresh();
                      }}
                    />
                  </td>
                ) : (
                  <>
                    <td className="px-3 py-2 font-medium text-zuraio-text">{e.description}</td>
                    <td className="px-3 py-2 text-right tabular-nums">
                      {formatAmount(e.estimatedAmount, e.currency)}
                    </td>
                    <td className="px-3 py-2 text-zuraio-textMuted">{formatDate(e.plannedDate)}</td>
                    <td className="px-3 py-2 text-zuraio-textMuted">
                      {t(costTypeToI18nKey[e.costType] ?? e.costType)}
                    </td>
                    <td className="px-3 py-2 text-zuraio-textMuted">
                      {e.order ? e.order.orderNumber || e.order.projectName || "–" : t("noOrder")}
                    </td>
                    <td className="px-3 py-2">
                      <span
                        className="inline-block px-2 py-0.5 rounded text-xs"
                        style={{
                          backgroundColor:
                            e.status === "PAID" ? "#DCE6B5" : "#f8f8f7",
                          color: "#1c1c1c",
                        }}
                      >
                        {t(statusKeys[e.status] || e.status)}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setEditingId(e.id)}
                          className="p-2 rounded-md transition-colors hover:bg-[#DCE6B5]"
                          title={t("editPlannedExpense")}
                        >
                          <Pencil className="h-4 w-4" style={{ color: "#9FAF52" }} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(e.id)}
                          disabled={deletingId === e.id}
                          className="p-2 rounded-md transition-colors hover:bg-red-50 disabled:opacity-50"
                          title={t("deletePlannedExpense")}
                        >
                          <Trash2 className="h-4 w-4" style={{ color: "#605e5c" }} />
                        </button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
