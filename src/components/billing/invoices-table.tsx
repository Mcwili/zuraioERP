"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown, ChevronRight, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Link from "next/link";

type SortKey = "number" | "status" | "dueDate";

interface Invoice {
  id: string;
  number: string;
  status: string;
  dueDate: Date | string;
}

interface InvoicesTableProps {
  invoices: Invoice[];
}

export function InvoicesTable({ invoices }: InvoicesTableProps) {
  const t = useTranslations("billing");
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("dueDate");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const filtered = invoices.filter((i) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return i.number.toLowerCase().includes(q);
  });

  const handleSort = (key: SortKey) => {
    if (sortBy === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortOrder(key === "dueDate" ? "desc" : "asc");
    }
  };

  const sorted = [...filtered].sort((a, b) => {
    let cmp = 0;
    if (sortBy === "number") {
      cmp = a.number.localeCompare(b.number);
    } else if (sortBy === "status") {
      cmp = a.status.localeCompare(b.status);
    } else {
      const da = new Date(a.dueDate).getTime();
      const db = new Date(b.dueDate).getTime();
      cmp = da - db;
    }
    return sortOrder === "asc" ? cmp : -cmp;
  });

  const SortIcon = ({ column }: { column: SortKey }) => (
    <span className="inline-flex w-4 h-4 ml-0.5 shrink-0 items-center justify-center">
      {sortBy === column ? (
        sortOrder === "asc" ? (
          <ChevronUp className="h-3.5 w-3.5" />
        ) : (
          <ChevronDown className="h-3.5 w-3.5" />
        )
      ) : null}
    </span>
  );

  const statusLabels: Record<string, string> = {
    DRAFT: "statusDraft",
    PLANNED: "statusPlanned",
    INVOICED: "statusInvoiced",
    PAID: "statusPaid",
  };

  return (
    <div className="space-y-3">
      <div className="relative flex items-center gap-2" style={{ borderColor: "#e1dfdd" }}>
        <div className="relative flex-1">
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
        </div>
      </div>
      <div
        className="bg-white overflow-x-auto overflow-y-hidden border"
        style={{ borderColor: "#e1dfdd" }}
      >
        <table className="w-full text-sm">
          <thead style={{ borderBottom: "1px solid #e1dfdd", backgroundColor: "#f8f8f7" }}>
            <tr>
              <th className="text-left px-3 py-2 w-32">
                <button
                  type="button"
                  onClick={() => handleSort("number")}
                  className="text-xs font-medium text-zuraio-textMuted uppercase tracking-wider hover:text-zuraio-text transition-colors flex items-center cursor-pointer"
                >
                  {t("columnNumber")}
                  <SortIcon column="number" />
                </button>
              </th>
              <th className="text-left px-3 py-2">
                <button
                  type="button"
                  onClick={() => handleSort("status")}
                  className="text-xs font-medium text-zuraio-textMuted uppercase tracking-wider hover:text-zuraio-text transition-colors flex items-center cursor-pointer"
                >
                  {t("columnStatus")}
                  <SortIcon column="status" />
                </button>
              </th>
              <th className="text-left px-3 py-2 whitespace-nowrap" style={{ width: "1%" }}>
                <button
                  type="button"
                  onClick={() => handleSort("dueDate")}
                  className="text-xs font-medium text-zuraio-textMuted uppercase tracking-wider hover:text-zuraio-text transition-colors flex items-center cursor-pointer"
                >
                  {t("columnDueDate")}
                  <SortIcon column="dueDate" />
                </button>
              </th>
              <th className="w-10 px-2 py-2" />
            </tr>
          </thead>
          <tbody>
            {sorted.map((inv) => (
              <tr
                key={inv.id}
                onClick={() => router.push(`/dashboard/billing/${inv.id}`)}
                className="border-t transition-colors hover:bg-[#DCE6B5] cursor-pointer"
                style={{ borderColor: "#e1dfdd" }}
              >
                <td className="px-3 py-2 font-medium text-zuraio-text tabular-nums w-32">
                  {inv.number}
                </td>
                <td className="px-3 py-2">
                  <span
                    className="inline-block px-2 py-0.5 rounded text-xs font-medium"
                    style={{
                      backgroundColor:
                        inv.status === "PAID"
                          ? "#e5e7eb"
                          : inv.status === "DRAFT"
                            ? "#f8f8f7"
                            : "#DCE6B5",
                      color: "#1c1c1c",
                    }}
                  >
                    {t(statusLabels[inv.status] || inv.status)}
                  </span>
                </td>
                <td className="px-3 py-2 text-zuraio-textMuted text-xs whitespace-nowrap">
                  {new Date(inv.dueDate).toLocaleDateString("de-CH")}
                </td>
                <td className="px-2 py-2">
                  <Link
                    href={`/dashboard/billing/${inv.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center justify-center w-7 h-7 rounded transition-colors hover:bg-[#DCE6B5]"
                    style={{ color: "#9FAF52" }}
                    title={t("open")}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {invoices.length === 0 && (
          <div className="px-4 py-8 text-center text-zuraio-textMuted text-sm">
            {t("noInvoices")}
          </div>
        )}
        {invoices.length > 0 && filtered.length === 0 && (
          <div className="px-4 py-8 text-center text-zuraio-textMuted text-sm">
            {t("noInvoicesFound")}
          </div>
        )}
      </div>
    </div>
  );
}
