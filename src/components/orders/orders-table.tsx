"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown, Search, Calendar } from "lucide-react";
import { useTranslations } from "next-intl";
import { OrderTableRow } from "./order-table-row";
import { OrdersGanttChart } from "./orders-gantt-chart";

type SortKey = "orderNumber" | "projectName" | "customer" | "status";

interface Order {
  id: string;
  orderNumber: string | null;
  projectName: string | null;
  status: string;
  startDate: Date | string;
  endDate: Date | string | null;
  organization: { name: string };
  milestones?: { id: string; name: string; dueDate: Date | string | null; completedAt: Date | string | null }[];
}

interface OrdersTableProps {
  orders: Order[];
}

export function OrdersTable({ orders }: OrdersTableProps) {
  const t = useTranslations("orders");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("orderNumber");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [showGantt, setShowGantt] = useState(false);

  const filtered = orders.filter((o) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      (o.orderNumber || "").toLowerCase().includes(q) ||
      (o.projectName || "").toLowerCase().includes(q) ||
      o.organization.name.toLowerCase().includes(q)
    );
  });

  const handleSort = (key: SortKey) => {
    if (sortBy === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortOrder(key === "orderNumber" ? "desc" : "asc");
    }
  };

  const sorted = [...filtered].sort((a, b) => {
    let cmp = 0;
    if (sortBy === "orderNumber") {
      cmp = (a.orderNumber || "").localeCompare(b.orderNumber || "");
    } else if (sortBy === "projectName") {
      cmp = (a.projectName || a.orderNumber || "").localeCompare(b.projectName || b.orderNumber || "");
    } else if (sortBy === "customer") {
      cmp = a.organization.name.localeCompare(b.organization.name);
    } else {
      cmp = a.status.localeCompare(b.status);
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

  return (
    <div className="space-y-3">
      <div
        className="relative flex items-center gap-2"
        style={{ borderColor: "#e1dfdd" }}
      >
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
        <button
          type="button"
          onClick={() => setShowGantt((prev) => !prev)}
          className={`flex items-center justify-center w-10 h-10 rounded border transition-colors shrink-0 ${
            showGantt ? "bg-[#DCE6B5] border-[#DCE6B5]" : "border-[#e1dfdd] bg-white hover:bg-[#f8f8f7]"
          }`}
          style={{ borderColor: showGantt ? "#DCE6B5" : "#e1dfdd" }}
          title={t("ganttToggle")}
        >
          <Calendar className="h-5 w-5" style={{ color: showGantt ? "#1c1c1c" : "#605e5c" }} />
        </button>
      </div>
      {showGantt && <OrdersGanttChart orders={filtered} />}
      <div
        className="bg-white overflow-x-auto overflow-y-hidden border"
        style={{ borderColor: "#e1dfdd" }}
      >
        <table className="w-full text-sm">
          <thead style={{ borderBottom: "1px solid #e1dfdd", backgroundColor: "#f8f8f7" }}>
            <tr>
              <th className="text-left px-3 py-2 w-24">
                <button
                  type="button"
                  onClick={() => handleSort("orderNumber")}
                  className="text-xs font-medium text-zuraio-textMuted uppercase tracking-wider hover:text-zuraio-text transition-colors flex items-center cursor-pointer"
                >
                  {t("orderNumber")}
                  <SortIcon column="orderNumber" />
                </button>
              </th>
              <th className="text-left px-3 py-2">
                <button
                  type="button"
                  onClick={() => handleSort("projectName")}
                  className="text-xs font-medium text-zuraio-textMuted uppercase tracking-wider hover:text-zuraio-text transition-colors flex items-center cursor-pointer"
                >
                  {t("projectName")}
                  <SortIcon column="projectName" />
                </button>
              </th>
              <th className="text-left px-3 py-2">
                <button
                  type="button"
                  onClick={() => handleSort("customer")}
                  className="text-xs font-medium text-zuraio-textMuted uppercase tracking-wider hover:text-zuraio-text transition-colors flex items-center cursor-pointer"
                >
                  {t("customer")}
                  <SortIcon column="customer" />
                </button>
              </th>
              <th className="text-left px-3 py-2 whitespace-nowrap" style={{ width: "1%" }}>
                <button
                  type="button"
                  onClick={() => handleSort("status")}
                  className="text-xs font-medium text-zuraio-textMuted uppercase tracking-wider hover:text-zuraio-text transition-colors flex items-center cursor-pointer"
                >
                  {t("status")}
                  <SortIcon column="status" />
                </button>
              </th>
              <th className="w-10 px-2 py-2" />
            </tr>
          </thead>
          <tbody>
            {sorted.map((o) => (
              <OrderTableRow key={o.id} order={o} />
            ))}
          </tbody>
        </table>
        {orders.length === 0 && (
          <div className="px-4 py-8 text-center text-zuraio-textMuted text-sm">
            {t("noOrders")}
          </div>
        )}
        {orders.length > 0 && filtered.length === 0 && (
          <div className="px-4 py-8 text-center text-zuraio-textMuted text-sm">
            {t("noOrdersFound")}
          </div>
        )}
      </div>
    </div>
  );
}
