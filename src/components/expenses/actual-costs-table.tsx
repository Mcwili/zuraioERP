"use client";

import { useTranslations } from "next-intl";
import { Trash2, Plus, Paperclip, ExternalLink, ChevronUp, ChevronDown } from "lucide-react";
import { ExpenseDocumentUpload } from "./expense-document-upload";
import { deleteExpenseActualCost } from "@/server/actions/expenses";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

interface ActualCost {
  id: string;
  description: string | null;
  amount: number;
  vatAmount: number | null;
  currency: string;
  paidAt: string;
  supplier: string | null;
  assignedMonth: string | null;
  organizationId: string | null;
  orderId: string | null;
  plannedExpenseId: string | null;
  organization: { id: string; name: string } | null;
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

interface PlannedExpense {
  id: string;
  description: string;
  organizationId: string | null;
  orderId: string | null;
}

interface ActualCostsTableProps {
  costs: ActualCost[];
  organizations: Organization[];
  orders: Order[];
  plannedExpenses: PlannedExpense[];
  onAdd: () => void;
}

type SortKey = "description" | "amount" | "vatAmount" | "paidAt" | "supplier" | "order";

export function ActualCostsTable({
  costs,
  organizations,
  orders,
  plannedExpenses,
  onAdd,
}: ActualCostsTableProps) {
  const t = useTranslations("expenses");
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploadCostId, setUploadCostId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortKey>("paidAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const sortedCosts = useMemo(() => {
    const arr = [...costs];
    arr.sort((a, b) => {
      let cmp = 0;
      switch (sortBy) {
        case "description":
          cmp = (a.description ?? a.plannedExpense?.description ?? "").localeCompare(
            b.description ?? b.plannedExpense?.description ?? ""
          );
          break;
        case "amount":
          cmp = a.amount - b.amount;
          break;
        case "vatAmount":
          cmp = (a.vatAmount ?? 0) - (b.vatAmount ?? 0);
          break;
        case "paidAt": {
          const da = a.paidAt ?? "";
          const db = b.paidAt ?? "";
          cmp = da.localeCompare(db);
          break;
        }
        case "supplier":
          cmp = (a.supplier ?? "").localeCompare(b.supplier ?? "");
          break;
        case "order":
          cmp = String(a.order?.orderNumber ?? a.order?.projectName ?? "").localeCompare(
            String(b.order?.orderNumber ?? b.order?.projectName ?? "")
          );
          break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
    return arr;
  }, [costs, sortBy, sortDir]);

  const handleSort = (key: SortKey) => {
    if (sortBy === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortDir(key === "paidAt" || key === "amount" || key === "vatAmount" ? "desc" : "asc");
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

  const formatDate = (d: string) => new Date(d).toLocaleDateString("de-CH");
  const formatAmount = (val: number, currency: string) =>
    `${Number(val).toLocaleString("de-CH")} ${currency}`;

  const handleDelete = async (id: string) => {
    if (!confirm(t("deleteActualCostConfirm"))) return;
    setDeletingId(id);
    try {
      await deleteExpenseActualCost(id);
      router.refresh();
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      {costs.length === 0 ? (
        <div className="p-6 text-center text-zuraio-textMuted text-sm">
          {t("noActualCosts")}
          <button
            type="button"
            onClick={onAdd}
            className="ml-2 flex items-center gap-1 text-[#9FAF52] hover:underline"
          >
            <Plus className="h-4 w-4" />
            {t("addActualCost")}
          </button>
        </div>
      ) : (
        <table className="w-full text-sm">
          <thead style={{ backgroundColor: "#f8f8f7", borderBottom: "1px solid #e1dfdd" }}>
            <tr>
              <SortHeader sortKey="description">{t("description")}</SortHeader>
              <SortHeader sortKey="amount" align="right">{t("amountInclVat")}</SortHeader>
              <SortHeader sortKey="vatAmount" align="right">{t("vatAmount")}</SortHeader>
              <SortHeader sortKey="paidAt">{t("paidAt")}</SortHeader>
              <SortHeader sortKey="supplier">{t("supplier")}</SortHeader>
              <SortHeader sortKey="order">{t("order")}</SortHeader>
              <th className="text-left px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                {t("documents")}
              </th>
              <th className="w-24 px-3 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {sortedCosts.map((c) => (
              <tr
                key={c.id}
                className="border-t transition-colors hover:bg-[#DCE6B5]"
                style={{ borderColor: "#e1dfdd" }}
              >
                <td className="px-3 py-2 font-medium text-zuraio-text">
                  {c.description || c.plannedExpense?.description || "–"}
                </td>
                <td className="px-3 py-2 text-right tabular-nums">
                  {formatAmount(c.amount, c.currency)}
                </td>
                <td className="px-3 py-2 text-right tabular-nums text-zuraio-textMuted">
                  {c.vatAmount != null && Number(c.vatAmount) > 0
                    ? formatAmount(Number(c.vatAmount), c.currency)
                    : "–"}
                </td>
                <td className="px-3 py-2 text-zuraio-textMuted">{formatDate(c.paidAt)}</td>
                <td className="px-3 py-2 text-zuraio-textMuted">{c.supplier || "–"}</td>
                <td className="px-3 py-2 text-zuraio-textMuted">
                  {c.order ? c.order.orderNumber || c.order.projectName || "–" : t("noOrder")}
                </td>
                <td className="px-3 py-2">
                  <div className="flex flex-wrap gap-1 items-center">
                    {c.documents.map((doc) =>
                      doc.sharePointWebUrl ? (
                        <a
                          key={doc.id}
                          href={doc.sharePointWebUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-[#9FAF52] hover:underline"
                        >
                          <ExternalLink className="h-3 w-3" />
                          {doc.fileName}
                        </a>
                      ) : (
                        <span key={doc.id} className="inline-flex items-center gap-1 text-xs text-zuraio-textMuted">
                          {doc.fileName}
                        </span>
                      )
                    )}
                    <button
                      type="button"
                      onClick={() => setUploadCostId(c.id)}
                      className="inline-flex items-center gap-1 text-xs text-[#9FAF52] hover:underline"
                    >
                      <Paperclip className="h-3 w-3" />
                      {t("addDocument")}
                    </button>
                  </div>
                </td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleDelete(c.id)}
                      disabled={deletingId === c.id}
                      className="p-2 rounded-md transition-colors hover:bg-red-50 disabled:opacity-50"
                      title={t("deleteActualCost")}
                    >
                      <Trash2 className="h-4 w-4" style={{ color: "#605e5c" }} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {uploadCostId && (
        <ExpenseDocumentUpload
          expenseActualCostId={uploadCostId}
          onClose={() => setUploadCostId(null)}
          onSuccess={() => {
            setUploadCostId(null);
            router.refresh();
          }}
        />
      )}
    </>
  );
}
