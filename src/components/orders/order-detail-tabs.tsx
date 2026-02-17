"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { OrderHeader } from "./order-header";
import { OrderFinanceKpi } from "./order-finance-kpi";
import { OrderPaymentTab } from "./order-payment-tab";
import { OrderInvoicesTab } from "./order-invoices-tab";
import { OrderBudgetTab } from "./order-budget-tab";
import { OrderActualCostsTab } from "./order-actual-costs-tab";
import { OrderTasksTab } from "./order-tasks-tab";
import { OrderDocumentsTab } from "./order-documents-tab";
import { OrderHistoryTab } from "./order-history-tab";

type TabId =
  | "overview"
  | "payment"
  | "invoices"
  | "budget"
  | "costs"
  | "tasks"
  | "documents"
  | "history";

interface OrderDetailTabsProps {
  order: Awaited<ReturnType<typeof import("@/server/actions/orders").getOrderDetail>>;
  auditLogs: { id: string; action: string; entityType: string; entityId: string | null; oldValues: unknown; newValues: unknown; createdAt: Date; user?: { name: string | null; email: string } | null }[];
}

export function OrderDetailTabs({ order, auditLogs }: OrderDetailTabsProps) {
  const t = useTranslations("orders");
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  const currency = order.currency || "CHF";

  const contractValue = order.totalValue ? Number(order.totalValue) : 0;
  const invoiced = order.invoices.reduce((sum, inv) => {
    const total = inv.items.reduce(
      (s, i) => s + Number(i.quantity) * Number(i.unitPrice),
      0
    );
    return sum + total;
  }, 0);
  const paid = order.invoices.reduce((sum, inv) => {
    return sum + inv.payments.reduce((s, p) => s + Number(p.amount), 0);
  }, 0);
  const open = invoiced - paid;
  const plannedRevenueRemaining =
    order.billingPlan?.items
      .filter(
        (i) =>
          new Date(i.dueDate) > new Date() && (i.status === "PLANNED" || !i.status)
      )
      .reduce((s, i) => s + Number(i.amount), 0) ?? 0;
  const plannedCosts =
    order.budgetPlans[0]?.months.reduce(
      (s, m) =>
        s +
        Number(m.plannedPersonnel || 0) +
        Number(m.plannedExternal || 0) +
        Number(m.plannedInfrastructure || 0),
      0
    ) ?? 0;
  const actualCosts = order.actualCosts.reduce(
    (s, c) => s + Number(c.amount),
    0
  );
  const budgetOk = plannedCosts === 0 || actualCosts <= plannedCosts * 1.1;
  const paymentOk = open <= 0 || !order.invoices.some((i) => new Date(i.dueDate) < new Date());
  const marginOnTarget = invoiced === 0 || (invoiced - actualCosts) / invoiced >= 0.2;

  const tabs: { id: TabId; label: string }[] = [
    { id: "overview", label: "Positionen" },
    { id: "payment", label: t("paymentPlan") },
    { id: "invoices", label: t("invoices") },
    { id: "budget", label: t("budget") },
    { id: "costs", label: t("actualCosts") },
    { id: "tasks", label: t("tasks") },
    { id: "documents", label: t("documents") },
    { id: "history", label: t("history") },
  ];

  const orderDocuments = order.documents ?? [];

  return (
    <div className="space-y-4">
      <OrderHeader order={order} />

      <OrderFinanceKpi
        contractValue={contractValue}
        invoiced={invoiced}
        paid={paid}
        open={open}
        plannedRevenueRemaining={plannedRevenueRemaining}
        plannedCosts={plannedCosts}
        actualCosts={actualCosts}
        currency={currency}
        budgetOk={budgetOk}
        paymentOk={paymentOk}
        marginOnTarget={marginOnTarget}
      />

      <div className="flex flex-wrap gap-1 border-b" style={{ borderColor: "#e1dfdd" }}>
        {tabs.slice(1).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className="px-3 py-2 text-sm font-medium transition-colors rounded-t"
            style={{
              backgroundColor: activeTab === tab.id ? "#DCE6B5" : "transparent",
              color: activeTab === tab.id ? "#1c1c1c" : "#605e5c",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div
          className="rounded-lg border overflow-hidden bg-white space-y-4"
          style={{ borderColor: "#e1dfdd" }}
        >
          <div className="p-4">
            <h3 className="font-semibold text-zuraio-text mb-3">Positionen</h3>
            {order.items.length === 0 ? (
              <p className="text-zuraio-textMuted text-sm">{t("noItems")}</p>
            ) : (
              <ul className="space-y-2">
                {order.items.map((i) => (
                  <li
                    key={i.id}
                    className="p-3 border rounded"
                    style={{ borderColor: "#e1dfdd" }}
                  >
                    {i.description} – {Number(i.quantity)} × {currency}{" "}
                    {Number(i.unitPrice).toLocaleString("de-CH")}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="p-4 border-t" style={{ borderColor: "#e1dfdd" }}>
            <h3 className="font-semibold text-zuraio-text mb-3">Meilensteine</h3>
            {order.milestones.length === 0 ? (
              <p className="text-zuraio-textMuted text-sm">{t("noMilestones")}</p>
            ) : (
              <ul className="space-y-2">
                {order.milestones.map((m) => (
                  <li
                    key={m.id}
                    className="p-3 border rounded"
                    style={{ borderColor: "#e1dfdd" }}
                  >
                    {m.name} – {m.percentage}%
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
      {activeTab === "payment" && (
        <OrderPaymentTab
          items={order.billingPlan?.items ?? []}
          orderId={order.id}
          currency={currency}
        />
      )}
      {activeTab === "invoices" && (
        <OrderInvoicesTab
          invoices={order.invoices}
          orderId={order.id}
          currency={currency}
        />
      )}
      {activeTab === "budget" && (
        <OrderBudgetTab
          budgetPlans={order.budgetPlans}
          orderId={order.id}
          currency={currency}
        />
      )}
      {activeTab === "costs" && (
        <OrderActualCostsTab
          actualCosts={order.actualCosts}
          orderId={order.id}
          currency={currency}
        />
      )}
      {activeTab === "tasks" && (
        <OrderTasksTab tasks={order.tasks} orderId={order.id} />
      )}
      {activeTab === "documents" && (
        <OrderDocumentsTab
          documents={orderDocuments}
          orderId={order.id}
          organizationId={order.organizationId}
        />
      )}
      {activeTab === "history" && (
        <OrderHistoryTab auditLogs={auditLogs} orderId={order.id} />
      )}
    </div>
  );
}
