"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export type AlertType = "todo" | "milestone" | "plannedExpense" | "invoice";

export interface AlertItem {
  id: string;
  type: AlertType;
  title: string;
  description?: string;
  date: Date;
  orderId?: string;
  orderNumber?: string;
  projectName?: string;
  link?: string;
  categoryLabel?: string;
}

export async function getAlerts(): Promise<{
  important: AlertItem[];
  todos: AlertItem[];
  milestones: AlertItem[];
  plannedExpenses: AlertItem[];
  invoices: AlertItem[];
}> {
  const session = await getServerSession(authOptions);
  if (!session) return { important: [], todos: [], milestones: [], plannedExpenses: [], invoices: [] };

  const now = new Date();
  const in30Days = new Date(now);
  in30Days.setDate(in30Days.getDate() + 30);
  const nextWeekEnd = new Date(now);
  nextWeekEnd.setDate(nextWeekEnd.getDate() + 7);

  const [
    orderTasks,
    milestones,
    plannedExpenses,
    billingItems,
    overdueInvoices,
    overdueTodos,
    overdueMilestones,
    overduePlannedExpenses,
    overdueBillingItems,
    nextWeekTodos,
    nextWeekMilestones,
    nextWeekPlannedExpenses,
    nextWeekBillingItems,
  ] =
    await Promise.all([
      prisma.orderTask.findMany({
        where: {
          type: "TODO",
          completedAt: null,
          dueDate: { not: null, lte: in30Days },
        },
        include: { order: { select: { id: true, orderNumber: true, projectName: true } } },
        orderBy: { dueDate: "asc" },
        take: 50,
      }),
      prisma.milestone.findMany({
        where: {
          completedAt: null,
          dueDate: { not: null, lte: in30Days },
        },
        include: { order: { select: { id: true, orderNumber: true, projectName: true } } },
        orderBy: { dueDate: "asc" },
        take: 50,
      }),
      prisma.plannedExpense.findMany({
        where: {
          plannedDate: { gte: now, lte: in30Days },
        },
        include: {
          order: { select: { id: true, orderNumber: true, projectName: true } },
          organization: { select: { name: true } },
        },
        orderBy: { plannedDate: "asc" },
        take: 50,
      }),
      prisma.billingPlanItem.findMany({
        where: {
          status: { in: ["PLANNED"] },
          dueDate: { gte: now, lte: in30Days },
        },
        include: {
          billingPlan: {
            include: { order: { select: { id: true, orderNumber: true, projectName: true } } },
          },
        },
        orderBy: { dueDate: "asc" },
        take: 50,
      }),
      prisma.invoice.findMany({
        where: {
          status: { not: "PAID" },
          dueDate: { lt: now },
        },
        include: { order: { select: { id: true, orderNumber: true, projectName: true } } },
        orderBy: { dueDate: "asc" },
        take: 50,
      }),
      prisma.orderTask.findMany({
        where: {
          type: "TODO",
          completedAt: null,
          dueDate: { lt: now },
        },
        include: { order: { select: { id: true, orderNumber: true, projectName: true } } },
        orderBy: { dueDate: "asc" },
        take: 50,
      }),
      prisma.milestone.findMany({
        where: {
          completedAt: null,
          dueDate: { lt: now },
        },
        include: { order: { select: { id: true, orderNumber: true, projectName: true } } },
        orderBy: { dueDate: "asc" },
        take: 50,
      }),
      prisma.plannedExpense.findMany({
        where: { plannedDate: { lt: now } },
        include: {
          order: { select: { id: true, orderNumber: true, projectName: true } },
          organization: { select: { name: true } },
          actualCosts: { take: 1 },
        },
        orderBy: { plannedDate: "asc" },
        take: 50,
      }),
      prisma.billingPlanItem.findMany({
        where: {
          status: { in: ["PLANNED"] },
          dueDate: { lt: now },
        },
        include: {
          billingPlan: {
            include: { order: { select: { id: true, orderNumber: true, projectName: true } } },
          },
        },
        orderBy: { dueDate: "asc" },
        take: 50,
      }),
      prisma.orderTask.findMany({
        where: {
          type: "TODO",
          completedAt: null,
          dueDate: { gte: now, lte: nextWeekEnd },
        },
        include: { order: { select: { id: true, orderNumber: true, projectName: true } } },
        orderBy: { dueDate: "asc" },
        take: 50,
      }),
      prisma.milestone.findMany({
        where: {
          completedAt: null,
          dueDate: { gte: now, lte: nextWeekEnd },
        },
        include: { order: { select: { id: true, orderNumber: true, projectName: true } } },
        orderBy: { dueDate: "asc" },
        take: 50,
      }),
      prisma.plannedExpense.findMany({
        where: {
          plannedDate: { gte: now, lte: nextWeekEnd },
        },
        include: {
          order: { select: { id: true, orderNumber: true, projectName: true } },
          organization: { select: { name: true } },
        },
        orderBy: { plannedDate: "asc" },
        take: 50,
      }),
      prisma.billingPlanItem.findMany({
        where: {
          status: { in: ["PLANNED"] },
          dueDate: { gte: now, lte: nextWeekEnd },
        },
        include: {
          billingPlan: {
            include: { order: { select: { id: true, orderNumber: true, projectName: true } } },
          },
        },
        orderBy: { dueDate: "asc" },
        take: 50,
      }),
    ]);

  const todos: AlertItem[] = orderTasks.map((t) => ({
    id: t.id,
    type: "todo",
    title: t.title,
    description: t.notes ?? undefined,
    date: t.dueDate!,
    orderId: t.order?.id,
    orderNumber: t.order?.orderNumber ?? undefined,
    projectName: t.order?.projectName ?? undefined,
    link: `/dashboard/orders/${t.orderId}`,
  }));

  const milestoneAlerts: AlertItem[] = milestones.map((m) => ({
    id: m.id,
    type: "milestone",
    title: m.name,
    description: m.description ?? undefined,
    date: m.dueDate!,
    orderId: m.order?.id,
    orderNumber: m.order?.orderNumber ?? undefined,
    projectName: m.order?.projectName ?? undefined,
    link: `/dashboard/orders/${m.orderId}`,
  }));

  const expenseAlerts: AlertItem[] = plannedExpenses.map((e) => ({
    id: e.id,
    type: "plannedExpense",
    title: e.description,
    description: e.organization?.name ?? e.order?.projectName ?? undefined,
    date: e.plannedDate!,
    orderId: e.orderId ?? undefined,
    orderNumber: e.order?.orderNumber ?? undefined,
    projectName: e.order?.projectName ?? undefined,
    link: "/dashboard/expenses",
  }));

  const billingAlerts: AlertItem[] = billingItems.map((b) => ({
    id: b.id,
    type: "invoice",
    title: `Rechnung fällig: ${b.amount} CHF`,
    description: b.description ?? undefined,
    date: b.dueDate,
    orderId: b.billingPlan?.order?.id,
    orderNumber: b.billingPlan?.order?.orderNumber ?? undefined,
    projectName: b.billingPlan?.order?.projectName ?? undefined,
    link: "/dashboard/invoices",
  }));

  const invoiceAlerts: AlertItem[] = overdueInvoices.map((inv) => ({
    id: inv.id,
    type: "invoice",
    title: `Rechnung ${inv.number} überfällig`,
    description: undefined,
    date: inv.dueDate,
    orderId: inv.orderId ?? undefined,
    orderNumber: inv.order?.orderNumber ?? undefined,
    projectName: inv.order?.projectName ?? undefined,
    link: "/dashboard/invoices",
  }));

  const importantItems: AlertItem[] = [];

  overdueTodos.forEach((t) => {
    importantItems.push({
      id: t.id,
      type: "todo",
      title: t.title,
      description: t.notes ?? undefined,
      date: t.dueDate!,
      orderId: t.order?.id,
      orderNumber: t.order?.orderNumber ?? undefined,
      projectName: t.order?.projectName ?? undefined,
      link: `/dashboard/orders/${t.orderId}`,
      categoryLabel: "categoryTodo",
    });
  });

  overdueMilestones.forEach((m) => {
    importantItems.push({
      id: m.id,
      type: "milestone",
      title: m.name,
      description: m.description ?? undefined,
      date: m.dueDate!,
      orderId: m.order?.id,
      orderNumber: m.order?.orderNumber ?? undefined,
      projectName: m.order?.projectName ?? undefined,
      link: `/dashboard/orders/${m.orderId}`,
      categoryLabel: "categoryMilestone",
    });
  });

  overduePlannedExpenses
    .filter((e) => e.actualCosts.length === 0)
    .forEach((e) => {
      importantItems.push({
        id: e.id,
        type: "plannedExpense",
        title: e.description,
        description: e.organization?.name ?? e.order?.projectName ?? undefined,
        date: e.plannedDate!,
        orderId: e.orderId ?? undefined,
        orderNumber: e.order?.orderNumber ?? undefined,
        projectName: e.order?.projectName ?? undefined,
        link: "/dashboard/expenses",
        categoryLabel: "categoryPlannedExpense",
      });
    });

  overdueBillingItems.forEach((b) => {
    importantItems.push({
      id: b.id,
      type: "invoice",
      title: `Rechnung fällig: ${b.amount} CHF`,
      description: b.description ?? undefined,
      date: b.dueDate,
      orderId: b.billingPlan?.order?.id,
      orderNumber: b.billingPlan?.order?.orderNumber ?? undefined,
      projectName: b.billingPlan?.order?.projectName ?? undefined,
      link: "/dashboard/invoices",
      categoryLabel: "categoryBilling",
    });
  });

  overdueInvoices.forEach((inv) => {
    importantItems.push({
      id: inv.id,
      type: "invoice",
      title: `Rechnung ${inv.number} überfällig`,
      date: inv.dueDate,
      orderId: inv.orderId ?? undefined,
      orderNumber: inv.order?.orderNumber ?? undefined,
      projectName: inv.order?.projectName ?? undefined,
      link: "/dashboard/invoices",
      categoryLabel: "categoryInvoice",
    });
  });

  nextWeekTodos.forEach((t) => {
    if (!importantItems.some((i) => i.type === "todo" && i.id === t.id)) {
      importantItems.push({
        id: t.id,
        type: "todo",
        title: t.title,
        description: t.notes ?? undefined,
        date: t.dueDate!,
        orderId: t.order?.id,
        orderNumber: t.order?.orderNumber ?? undefined,
        projectName: t.order?.projectName ?? undefined,
        link: `/dashboard/orders/${t.orderId}`,
        categoryLabel: "categoryTodo",
      });
    }
  });

  nextWeekMilestones.forEach((m) => {
    if (!importantItems.some((i) => i.type === "milestone" && i.id === m.id)) {
      importantItems.push({
        id: m.id,
        type: "milestone",
        title: m.name,
        description: m.description ?? undefined,
        date: m.dueDate!,
        orderId: m.order?.id,
        orderNumber: m.order?.orderNumber ?? undefined,
        projectName: m.order?.projectName ?? undefined,
        link: `/dashboard/orders/${m.orderId}`,
        categoryLabel: "categoryMilestone",
      });
    }
  });

  nextWeekPlannedExpenses.forEach((e) => {
    if (!importantItems.some((i) => i.type === "plannedExpense" && i.id === e.id)) {
      importantItems.push({
        id: e.id,
        type: "plannedExpense",
        title: e.description,
        description: e.organization?.name ?? e.order?.projectName ?? undefined,
        date: e.plannedDate!,
        orderId: e.orderId ?? undefined,
        orderNumber: e.order?.orderNumber ?? undefined,
        projectName: e.order?.projectName ?? undefined,
        link: "/dashboard/expenses",
        categoryLabel: "categoryPlannedExpense",
      });
    }
  });

  nextWeekBillingItems.forEach((b) => {
    if (!importantItems.some((i) => i.type === "invoice" && i.id === b.id)) {
      importantItems.push({
        id: b.id,
        type: "invoice",
        title: `Rechnung fällig: ${b.amount} CHF`,
        description: b.description ?? undefined,
        date: b.dueDate,
        orderId: b.billingPlan?.order?.id,
        orderNumber: b.billingPlan?.order?.orderNumber ?? undefined,
        projectName: b.billingPlan?.order?.projectName ?? undefined,
        link: "/dashboard/invoices",
        categoryLabel: "categoryBilling",
      });
    }
  });

  importantItems.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return {
    important: importantItems,
    todos,
    milestones: milestoneAlerts,
    plannedExpenses: expenseAlerts,
    invoices: [...invoiceAlerts, ...billingAlerts].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    ),
  };
}
