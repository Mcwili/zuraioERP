"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { canAccessOrders } from "@/lib/permissions";
import { revalidatePath } from "next/cache";
import { logAudit } from "@/lib/audit";

export async function createBudgetPlan(
  orderId: string,
  data: {
    version?: number;
    comment?: string;
    months: {
      yearMonth: string;
      plannedPersonnel: number;
      plannedExternal: number;
      plannedInfrastructure: number;
      plannedRevenue?: number;
    }[];
  }
) {
  const session = await getServerSession(authOptions);
  if (!session || !canAccessOrders(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  const latestVersion = await prisma.budgetPlan.findFirst({
    where: { orderId },
    orderBy: { version: "desc" },
    select: { version: true },
  });

  const version = data.version ?? (latestVersion?.version ?? 0) + 1;

  const plan = await prisma.budgetPlan.create({
    data: {
      orderId,
      version,
      comment: data.comment,
      months: {
        create: data.months.map((m) => ({
          yearMonth: m.yearMonth,
          plannedPersonnel: m.plannedPersonnel,
          plannedExternal: m.plannedExternal,
          plannedInfrastructure: m.plannedInfrastructure,
          plannedRevenue: m.plannedRevenue,
        })),
      },
    },
    include: { months: true },
  });

  await logAudit({
    userId: session.user?.id,
    action: "Budget plan created",
    entityType: "Order",
    entityId: orderId,
    newValues: { planId: plan.id, version },
  });

  revalidatePath(`/dashboard/orders/${orderId}`);
  return plan;
}

export async function addActualCost(
  orderId: string,
  data: {
    date: Date;
    costType: string;
    amount: number;
    supplier?: string;
    assignedMonth: string;
    paid?: boolean;
  }
) {
  const session = await getServerSession(authOptions);
  if (!session || !canAccessOrders(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  const cost = await prisma.budgetActualCost.create({
    data: {
      orderId,
      date: data.date,
      costType: data.costType,
      amount: data.amount,
      supplier: data.supplier,
      assignedMonth: data.assignedMonth,
      paid: data.paid ?? false,
    },
  });

  await logAudit({
    userId: session.user?.id,
    action: "Actual cost added",
    entityType: "Order",
    entityId: orderId,
    newValues: { costId: cost.id, ...data },
  });

  revalidatePath(`/dashboard/orders/${orderId}`);
  return cost;
}
