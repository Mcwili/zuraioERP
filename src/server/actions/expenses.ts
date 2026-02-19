"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { canAccessExpenses } from "@/lib/permissions";
import { revalidatePath } from "next/cache";
import { logAudit } from "@/lib/audit";
import type { ExpenseCostType, PlannedExpenseStatus } from "@prisma/client";

// --- Geplante Ausgaben ---

export async function createPlannedExpense(data: {
  organizationId?: string | null;
  orderId?: string | null;
  description: string;
  estimatedAmount: number;
  currency?: string;
  plannedDate?: Date | null;
  costType: ExpenseCostType;
}) {
  const session = await getServerSession(authOptions);
  if (!session || !canAccessExpenses(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  const expense = await prisma.plannedExpense.create({
    data: {
      organizationId: data.organizationId || null,
      orderId: data.orderId ?? null,
      description: data.description,
      estimatedAmount: data.estimatedAmount,
      currency: data.currency ?? "CHF",
      plannedDate: data.plannedDate ?? undefined,
      costType: data.costType,
    },
  });

  await logAudit({
    userId: session.user?.id,
    action: "Planned expense created",
    entityType: "PlannedExpense",
    entityId: expense.id,
    newValues: { ...data },
  });

  revalidatePath("/dashboard/expenses");
  if (data.orderId) revalidatePath(`/dashboard/orders/${data.orderId}`);
  return expense;
}

export async function updatePlannedExpense(
  id: string,
  data: {
    description?: string;
    estimatedAmount?: number;
    currency?: string;
    plannedDate?: Date | null;
    costType?: ExpenseCostType;
    status?: PlannedExpenseStatus;
    organizationId?: string;
    orderId?: string | null;
  }
) {
  const session = await getServerSession(authOptions);
  if (!session || !canAccessExpenses(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  const old = await prisma.plannedExpense.findUnique({
    where: { id },
    select: { orderId: true },
  });
  if (!old) throw new Error("Geplante Ausgabe nicht gefunden");

  const expense = await prisma.plannedExpense.update({
    where: { id },
    data: {
      ...(data.description !== undefined && { description: data.description }),
      ...(data.estimatedAmount !== undefined && { estimatedAmount: data.estimatedAmount }),
      ...(data.currency !== undefined && { currency: data.currency }),
      ...(data.plannedDate !== undefined && { plannedDate: data.plannedDate }),
      ...(data.costType !== undefined && { costType: data.costType }),
      ...(data.status !== undefined && { status: data.status }),
      ...(data.organizationId !== undefined && { organizationId: data.organizationId }),
      ...(data.orderId !== undefined && { orderId: data.orderId }),
    },
  });

  await logAudit({
    userId: session.user?.id,
    action: "Planned expense updated",
    entityType: "PlannedExpense",
    entityId: id,
    newValues: data,
  });

  revalidatePath("/dashboard/expenses");
  if (old.orderId) revalidatePath(`/dashboard/orders/${old.orderId}`);
  return expense;
}

export async function deletePlannedExpense(id: string) {
  const session = await getServerSession(authOptions);
  if (!session || !canAccessExpenses(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  const old = await prisma.plannedExpense.findUnique({
    where: { id },
    select: { orderId: true },
  });
  if (!old) throw new Error("Geplante Ausgabe nicht gefunden");

  await prisma.plannedExpense.delete({ where: { id } });

  await logAudit({
    userId: session.user?.id,
    action: "Planned expense deleted",
    entityType: "PlannedExpense",
    entityId: id,
  });

  revalidatePath("/dashboard/expenses");
  if (old.orderId) revalidatePath(`/dashboard/orders/${old.orderId}`);
}

// --- Effektive Kosten ---

export async function createExpenseActualCost(data: {
  organizationId?: string | null;
  orderId?: string | null;
  plannedExpenseId?: string | null;
  description?: string | null;
  amount: number;
  vatAmount?: number;
  currency?: string;
  paidAt: Date;
  supplier?: string | null;
  assignedMonth?: string | null;
}) {
  const session = await getServerSession(authOptions);
  if (!session || !canAccessExpenses(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  const cost = await prisma.expenseActualCost.create({
    data: {
      ...(data.organizationId?.trim() && {
        organization: { connect: { id: data.organizationId } },
      }),
      ...(data.orderId?.trim() && {
        order: { connect: { id: data.orderId } },
      }),
      ...(data.plannedExpenseId?.trim() && {
        plannedExpense: { connect: { id: data.plannedExpenseId } },
      }),
      description: data.description?.trim() || null,
      amount: data.amount,
      vatAmount: data.vatAmount ?? 0,
      currency: data.currency ?? "CHF",
      paidAt: data.paidAt,
      supplier: data.supplier?.trim() || null,
      assignedMonth: data.assignedMonth?.trim() || null,
    },
  });

  await logAudit({
    userId: session.user?.id,
    action: "Expense actual cost created",
    entityType: "ExpenseActualCost",
    entityId: cost.id,
    newValues: { ...data },
  });

  revalidatePath("/dashboard/expenses");
  if (data.orderId) revalidatePath(`/dashboard/orders/${data.orderId}`);
  return cost;
}

export async function updateExpenseActualCost(
  id: string,
  data: {
    description?: string | null;
    amount?: number;
    currency?: string;
    paidAt?: Date;
    supplier?: string | null;
    assignedMonth?: string | null;
  }
) {
  const session = await getServerSession(authOptions);
  if (!session || !canAccessExpenses(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  const old = await prisma.expenseActualCost.findUnique({
    where: { id },
    select: { orderId: true },
  });
  if (!old) throw new Error("Effektive Kosten nicht gefunden");

  const cost = await prisma.expenseActualCost.update({
    where: { id },
    data: {
      ...(data.description !== undefined && { description: data.description }),
      ...(data.amount !== undefined && { amount: data.amount }),
      ...(data.currency !== undefined && { currency: data.currency }),
      ...(data.paidAt !== undefined && { paidAt: data.paidAt }),
      ...(data.supplier !== undefined && { supplier: data.supplier }),
      ...(data.assignedMonth !== undefined && { assignedMonth: data.assignedMonth }),
    },
  });

  await logAudit({
    userId: session.user?.id,
    action: "Expense actual cost updated",
    entityType: "ExpenseActualCost",
    entityId: id,
    newValues: data,
  });

  revalidatePath("/dashboard/expenses");
  if (old.orderId) revalidatePath(`/dashboard/orders/${old.orderId}`);
  return cost;
}

export async function deleteExpenseActualCost(id: string) {
  const session = await getServerSession(authOptions);
  if (!session || !canAccessExpenses(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  const old = await prisma.expenseActualCost.findUnique({
    where: { id },
    select: { orderId: true },
  });
  if (!old) throw new Error("Effektive Kosten nicht gefunden");

  await prisma.expenseActualCost.delete({ where: { id } });

  await logAudit({
    userId: session.user?.id,
    action: "Expense actual cost deleted",
    entityType: "ExpenseActualCost",
    entityId: id,
  });

  revalidatePath("/dashboard/expenses");
  if (old.orderId) revalidatePath(`/dashboard/orders/${old.orderId}`);
}

// --- Abfragen ---

export async function getExpensesData(filters?: {
  orderId?: string | null;
  organizationId?: string | null;
  status?: PlannedExpenseStatus | null;
  costType?: ExpenseCostType | null;
  dateFrom?: Date | null;
  dateTo?: Date | null;
  search?: string | null;
}) {
  const session = await getServerSession(authOptions);
  if (!session || !canAccessExpenses(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  const wherePlanned: Record<string, unknown> = {};
  const whereActual: Record<string, unknown> = {};

  if (filters?.orderId) {
    wherePlanned.orderId = filters.orderId;
    whereActual.orderId = filters.orderId;
  }
  if (filters?.organizationId) {
    wherePlanned.organizationId = filters.organizationId;
    whereActual.organizationId = filters.organizationId;
  }
  if (filters?.status) {
    wherePlanned.status = filters.status;
  }
  if (filters?.costType) {
    wherePlanned.costType = filters.costType;
  }
  if (filters?.dateFrom || filters?.dateTo) {
    wherePlanned.plannedDate = {};
    if (filters.dateFrom) (wherePlanned.plannedDate as Record<string, Date>).gte = filters.dateFrom;
    if (filters.dateTo) (wherePlanned.plannedDate as Record<string, Date>).lte = filters.dateTo;
  }
  if (filters?.dateFrom || filters?.dateTo) {
    whereActual.paidAt = {};
    if (filters.dateFrom) (whereActual.paidAt as Record<string, Date>).gte = filters.dateFrom;
    if (filters.dateTo) (whereActual.paidAt as Record<string, Date>).lte = filters.dateTo;
  }
  if (filters?.search) {
    wherePlanned.description = { contains: filters.search, mode: "insensitive" };
    const searchOr = [
      { description: { contains: filters.search, mode: "insensitive" as const } },
      { supplier: { contains: filters.search, mode: "insensitive" as const } },
    ];
    whereActual.AND = whereActual.AND ? [...(whereActual.AND as object[]), { OR: searchOr }] : [{ OR: searchOr }];
  }

  const [plannedExpenses, actualCosts, organizations, orders] = await Promise.all([
    prisma.plannedExpense.findMany({
      where: wherePlanned as object,
      include: {
        organization: { select: { id: true, name: true } },
        order: { select: { id: true, orderNumber: true, projectName: true } },
      },
      orderBy: [{ plannedDate: "asc" }, { createdAt: "desc" }],
    }),
    prisma.expenseActualCost.findMany({
      where: whereActual as object,
      include: {
        organization: { select: { id: true, name: true } },
        order: { select: { id: true, orderNumber: true, projectName: true } },
        plannedExpense: { select: { id: true, description: true } },
        documents: true,
      },
      orderBy: { paidAt: "desc" },
    }),
    prisma.organization.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
    prisma.order.findMany({
      select: { id: true, orderNumber: true, projectName: true },
      orderBy: { orderNumber: "asc" },
    }),
  ]);

  return {
    plannedExpenses,
    actualCosts,
    organizations,
    orders,
  };
}

/** Chart-Daten: Geplante und effektive Ausgaben pro Monat */
export async function getExpensesChartData(
  filters?: {
    orderId?: string | null;
    organizationId?: string | null;
  },
  range?: { startMonth: string; endMonth: string }
) {
  const session = await getServerSession(authOptions);
  if (!session || !canAccessExpenses(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  const now = new Date();
  let startOfChart: Date;
  let endOfChart: Date;
  if (range?.startMonth && range?.endMonth) {
    const [sy, sm] = range.startMonth.split("-").map(Number);
    const [ey, em] = range.endMonth.split("-").map(Number);
    startOfChart = new Date(sy, (sm ?? 1) - 1, 1);
    endOfChart = new Date(ey, (em ?? 12) - 1, 31);
  } else {
    startOfChart = new Date(now.getFullYear(), now.getMonth() - 6, 1);
    endOfChart = new Date(now.getFullYear(), 11, 31);
  }

  const wherePlanned: Record<string, unknown> = {
    plannedDate: { gte: startOfChart, lte: endOfChart },
  };
  const whereActual: Record<string, unknown> = {
    paidAt: { gte: startOfChart, lte: endOfChart },
  };
  if (filters?.orderId) {
    wherePlanned.orderId = filters.orderId;
    whereActual.orderId = filters.orderId;
  }
  if (filters?.organizationId) {
    wherePlanned.organizationId = filters.organizationId;
    whereActual.organizationId = filters.organizationId;
  }

  const [plannedExpenses, actualCosts] = await Promise.all([
    prisma.plannedExpense.findMany({
      where: wherePlanned as object,
      select: { plannedDate: true, estimatedAmount: true },
    }),
    prisma.expenseActualCost.findMany({
      where: whereActual as object,
      select: { paidAt: true, amount: true },
    }),
  ]);

  const monthMap = new Map<string, { planned: number; actual: number }>();
  let d = new Date(startOfChart.getFullYear(), startOfChart.getMonth(), 1);
  while (d <= endOfChart) {
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    monthMap.set(key, { planned: 0, actual: 0 });
    d.setMonth(d.getMonth() + 1);
  }

  for (const p of plannedExpenses) {
    if (p.plannedDate) {
      const d = new Date(p.plannedDate);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const entry = monthMap.get(key);
      if (entry) {
        entry.planned += Number(p.estimatedAmount);
      }
    }
  }
  for (const a of actualCosts) {
    const d = new Date(a.paidAt);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const entry = monthMap.get(key);
    if (entry) {
      entry.actual += Number(a.amount);
    }
  }

  const months = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
  return Array.from(monthMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, values]) => {
      const [y, m] = key.split("-");
      return {
        month: key,
        label: `${months[parseInt(m || "1", 10) - 1]} ${y}`,
        planned: Math.round(values.planned * 100) / 100,
        actual: Math.round(values.actual * 100) / 100,
      };
    });
}
