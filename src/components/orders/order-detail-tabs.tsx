"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { OrderHeader } from "./order-header";
import { OrderFinanceKpi } from "./order-finance-kpi";
import { OrderPaymentTab } from "./order-payment-tab";
import { OrderInvoicesTab } from "./order-invoices-tab";
import { OrderTasksTab } from "./order-tasks-tab";
import { OrderDocumentsTab } from "./order-documents-tab";
import { OrderMilestonesSection } from "./order-milestones-section";
import { OrderDetailGanttChart } from "./order-detail-gantt-chart";

type TabId =
  | "calendar"
  | "milestones"
  | "payment"
  | "invoices"
  | "tasks"
  | "documents";

interface OrderDetailTabsProps {
  order: Awaited<ReturnType<typeof import("@/server/actions/orders").getOrderDetail>>;
}

export function OrderDetailTabs({ order }: OrderDetailTabsProps) {
  const t = useTranslations("orders");
  const [activeTab, setActiveTab] = useState<TabId>("calendar");

  if (!order) return null;

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
    { id: "calendar", label: t("calendar") },
    { id: "milestones", label: t("milestones") },
    { id: "payment", label: t("paymentPlan") },
    { id: "invoices", label: t("invoices") },
    { id: "tasks", label: t("tasks") },
    { id: "documents", label: t("documents") },
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
        {tabs.map((tab) => (
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

      {activeTab === "milestones" && (
        <div
          className="rounded-lg border overflow-hidden bg-white space-y-4"
          style={{ borderColor: "#e1dfdd" }}
        >
          <OrderMilestonesSection
            milestones={order.milestones}
            orderId={order.id}
          />
        </div>
      )}
      {activeTab === "calendar" && (
        <div
          className="rounded-lg border overflow-hidden bg-white"
          style={{ borderColor: "#e1dfdd" }}
        >
          <OrderDetailGanttChart
            projectName={order.projectName}
            orderNumber={order.orderNumber}
            startDate={order.startDate}
            endDate={order.endDate}
            milestones={order.milestones.map((m) => ({
              id: m.id,
              name: m.name,
              dueDate: m.dueDate,
              completedAt: m.completedAt,
            }))}
            tasks={(order.tasks ?? []).map((t) => ({
              id: t.id,
              title: t.title,
              type: t.type,
              dueDate: t.dueDate,
              completedAt: t.completedAt,
            }))}
            billingPlanItems={(order.billingPlan?.items ?? []).map((i) => ({
              id: i.id,
              dueDate: i.dueDate,
              paidAt: i.paidAt,
              amount: Number(i.amount),
              description: i.description,
            }))}
          />
        </div>
      )}
      {activeTab === "payment" && (
        <OrderPaymentTab
          items={order.billingPlan?.items ?? []}
          orderId={order.id}
          currency={currency}
          totalValue={contractValue}
          addresses={order.organization?.addresses ?? []}
          contacts={order.organization?.contacts ?? []}
        />
      )}
      {activeTab === "invoices" && (
        <OrderInvoicesTab
          invoices={order.invoices}
          orderId={order.id}
          currency={currency}
        />
      )}
      {activeTab === "tasks" && (
        <OrderTasksTab
          tasks={order.tasks}
          orderId={order.id}
          organizationId={order.organizationId}
        />
      )}
      {activeTab === "documents" && (
        <OrderDocumentsTab
          documents={orderDocuments}
          orderId={order.id}
          organizationId={order.organizationId}
        />
      )}
    </div>
  );
}
