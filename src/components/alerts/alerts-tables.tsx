"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CheckSquare, Flag, Receipt, FileText, ChevronRight, TriangleAlert } from "lucide-react";
import Link from "next/link";

/** Serialisiertes Format (date als string nach RSC-Übergabe) */
interface AlertItem {
  id: string;
  title: string;
  description?: string;
  date: string | Date;
  orderNumber?: string;
  projectName?: string;
  link?: string;
  categoryLabel?: string;
}

interface AlertsTablesProps {
  data: {
    important: AlertItem[];
    todos: AlertItem[];
    milestones: AlertItem[];
    plannedExpenses: AlertItem[];
    invoices: AlertItem[];
  };
}

const TYPE_COLORS: Record<string, { border: string; bg: string }> = {
  todo: { border: "border-l-amber-500", bg: "bg-amber-50/30" },
  milestone: { border: "border-l-blue-500", bg: "bg-blue-50/30" },
  plannedExpense: { border: "border-l-emerald-600", bg: "bg-emerald-50/30" },
  invoice: { border: "border-l-rose-500", bg: "bg-rose-50/30" },
};

export function AlertsTables({ data }: AlertsTablesProps) {
  const t = useTranslations("alerts");
  const [activeTab, setActiveTab] = useState<"todos" | "milestones" | "expenses" | "invoices">("todos");

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("de-CH", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  const isOverdue = (d: string) => new Date(d) < new Date();

  const tabs = [
    { id: "todos" as const, label: t("sectionTodos"), icon: CheckSquare, items: data.todos },
    { id: "milestones" as const, label: t("sectionMilestones"), icon: Flag, items: data.milestones },
    { id: "expenses" as const, label: t("sectionPlannedExpenses"), icon: Receipt, items: data.plannedExpenses },
    { id: "invoices" as const, label: t("sectionInvoices"), icon: FileText, items: data.invoices },
  ];

  const emptyMessages: Record<string, string> = {
    todos: t("noTodos"),
    milestones: t("noMilestones"),
    expenses: t("noPlannedExpenses"),
    invoices: t("noInvoices"),
  };

  const typeKeys = {
    todos: "todo" as const,
    milestones: "milestone" as const,
    expenses: "plannedExpense" as const,
    invoices: "invoice" as const,
  };

  const currentTab = tabs.find((tab) => tab.id === activeTab)!;
  const colors = TYPE_COLORS[typeKeys[activeTab]];

  const getTypeFromCategory = (label?: string) => {
    if (!label) return "todo";
    if (label === "categoryMilestone") return "milestone";
    if (label === "categoryPlannedExpense") return "plannedExpense";
    if (label === "categoryBilling" || label === "categoryInvoice") return "invoice";
    return "todo";
  };

  return (
    <div className="space-y-6">
      {/* Wichtig-Tabelle */}
      <div
        className="rounded-lg border overflow-hidden bg-white overflow-x-auto"
        style={{ borderColor: "#e1dfdd" }}
      >
        <div className="px-4 py-3 border-b flex items-center gap-2" style={{ borderColor: "#e1dfdd", backgroundColor: "#fef3c7" }}>
          <TriangleAlert className="h-5 w-5" style={{ color: "#d97706" }} />
          <h2 className="font-semibold text-zuraio-text">{t("sectionImportant")}</h2>
        </div>
        {data.important.length === 0 ? (
          <div className="p-6 text-center text-zuraio-textMuted text-sm">
            {t("noImportant")}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[600px]">
              <thead style={{ backgroundColor: "#f8f8f7", borderBottom: "1px solid #e1dfdd" }}>
                <tr>
                  <th className="text-left px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                    {t("description")}
                  </th>
                  <th className="text-left px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                    {t("order")}
                  </th>
                  <th className="text-left px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                    {t("category")}
                  </th>
                  <th className="text-left px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                    {t("dueDate")}
                  </th>
                  <th className="w-10 px-3 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {data.important.map((item) => {
                  const overdue = isOverdue(item.date);
                  const typeKey = getTypeFromCategory(item.categoryLabel);
                  const itemColors = TYPE_COLORS[typeKey] ?? TYPE_COLORS.todo;
                  return (
                    <tr
                      key={`${item.categoryLabel}-${item.id}`}
                      className={`border-t transition-colors hover:bg-[#DCE6B5] ${itemColors.bg}`}
                      style={{ borderColor: "#e1dfdd" }}
                    >
                      <td
                        className={`px-3 py-2 font-medium text-zuraio-text border-l-4 ${itemColors.border}`}
                      >
                        <Link href={item.link ?? "#"} className="hover:underline block">
                          {item.title}
                        </Link>
                        {item.description && (
                          <p className="text-xs text-zuraio-textMuted mt-0.5 font-normal">
                            {item.description}
                          </p>
                        )}
                      </td>
                      <td className="px-3 py-2 text-zuraio-textMuted">
                        {item.orderNumber || item.projectName || "–"}
                      </td>
                      <td className="px-3 py-2">
                        <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: "#f8f8f7" }}>
                          {item.categoryLabel ? t(item.categoryLabel) : "–"}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-zuraio-textMuted">
                        <span className={overdue ? "text-rose-600 font-medium" : ""}>
                          {overdue ? `${t("overdue")} ` : ""}
                          {formatDate(item.date)}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <Link
                          href={item.link ?? "#"}
                          className="p-1 rounded hover:bg-[#e8e8e6] transition-colors inline-block"
                          aria-label={t("open")}
                        >
                          <ChevronRight className="h-4 w-4 text-zuraio-textMuted" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Tabs mit Detail-Tabellen */}
    <div
      className="rounded-lg border overflow-hidden bg-white overflow-x-auto"
      style={{ borderColor: "#e1dfdd" }}
    >
      <div className="flex border-b" style={{ borderColor: "#e1dfdd" }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className="px-4 py-3 text-sm font-medium transition-colors flex items-center gap-2"
            style={{
              backgroundColor: activeTab === tab.id ? "#DCE6B5" : "transparent",
              color: activeTab === tab.id ? "#1c1c1c" : "#605e5c",
              borderBottom: activeTab === tab.id ? "2px solid #9FAF52" : "2px solid transparent",
            }}
          >
            <tab.icon className="h-4 w-4 shrink-0" />
            {tab.label}
            <span className="text-xs opacity-75">({tab.items.length})</span>
          </button>
        ))}
      </div>

      {currentTab.items.length === 0 ? (
        <div className="p-6 text-center text-zuraio-textMuted text-sm">
          {emptyMessages[activeTab]}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead style={{ backgroundColor: "#f8f8f7", borderBottom: "1px solid #e1dfdd" }}>
              <tr>
                <th className="text-left px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                  {t("description")}
                </th>
                <th className="text-left px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                  {t("order")}
                </th>
                <th className="text-left px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                  {t("dueDate")}
                </th>
                <th className="w-10 px-3 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {currentTab.items.map((item) => {
                const overdue = activeTab === "invoices" && isOverdue(item.date);
                return (
                  <tr
                    key={item.id}
                    className={`border-t transition-colors hover:bg-[#DCE6B5] ${colors.bg}`}
                    style={{ borderColor: "#e1dfdd" }}
                  >
                    <td
                      className={`px-3 py-2 font-medium text-zuraio-text border-l-4 ${colors.border}`}
                    >
                      <Link
                        href={item.link ?? "#"}
                        className="hover:underline block"
                      >
                        {item.title}
                      </Link>
                      {item.description && (
                        <p className="text-xs text-zuraio-textMuted mt-0.5 font-normal">
                          {item.description}
                        </p>
                      )}
                    </td>
                    <td className="px-3 py-2 text-zuraio-textMuted">
                      {item.orderNumber || item.projectName || "–"}
                    </td>
                    <td className="px-3 py-2 text-zuraio-textMuted">
                      <span className={overdue ? "text-rose-600 font-medium" : ""}>
                        {overdue ? `${t("overdue")} ` : ""}
                        {formatDate(item.date)}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <Link
                        href={item.link ?? "#"}
                        className="p-1 rounded hover:bg-[#e8e8e6] transition-colors inline-block"
                        aria-label={t("open")}
                      >
                        <ChevronRight className="h-4 w-4 text-zuraio-textMuted" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </div>
  );
}
