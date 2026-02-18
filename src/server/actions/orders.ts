"use server";

import { prisma } from "@/lib/prisma";
import { parseDateCH } from "@/lib/date-format";

function parseEndDate(s: string | null): Date | null {
  if (!s?.trim()) return null;
  const ch = parseDateCH(s);
  if (ch) return ch;
  const iso = new Date(s);
  return isNaN(iso.getTime()) ? null : iso;
}
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { canAccessOrders } from "@/lib/permissions";
import { revalidatePath } from "next/cache";
import { logAudit } from "@/lib/audit";
import type { OrderStatus, ContractType } from "@prisma/client";

export async function getOrderDetail(id: string) {
  const session = await getServerSession(authOptions);
  if (!session || !canAccessOrders(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      organization: true,
      accountOwner: true,
      projectLead: true,
      items: true,
      milestones: true,
      billingPlan: {
        include: {
          items: {
            include: { invoice: true },
          },
        },
      },
      invoices: {
        include: {
          items: true,
          payments: true,
        },
      },
      budgetPlans: {
        include: { months: true },
        orderBy: { version: "desc" },
      },
      actualCosts: true,
      tasks: true,
      documents: true,
    },
  });

  return order;
}

export async function updateOrder(
  id: string,
  data: {
    orderNumber?: string;
    projectName?: string;
    status?: OrderStatus;
    contractType?: ContractType;
    endDate?: Date | null;
    totalValue?: number | null;
    currency?: string | null;
    paymentTerms?: string | null;
    internalProjectNumber?: string | null;
    accountOwnerId?: string | null;
    projectLeadId?: string | null;
  }
) {
  const session = await getServerSession(authOptions);
  if (!session || !canAccessOrders(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  const oldOrder = await prisma.order.findUnique({
    where: { id },
    select: {
      orderNumber: true,
      projectName: true,
      status: true,
      contractType: true,
      endDate: true,
      totalValue: true,
      currency: true,
      paymentTerms: true,
      internalProjectNumber: true,
      accountOwnerId: true,
      projectLeadId: true,
    },
  });

  await prisma.order.update({
    where: { id },
    data,
  });

  await logAudit({
    userId: session.user?.id,
    action: "Order updated",
    entityType: "Order",
    entityId: id,
    oldValues: oldOrder as Record<string, unknown>,
    newValues: data as Record<string, unknown>,
  });

  revalidatePath(`/dashboard/orders/${id}`);
  revalidatePath("/dashboard/orders");
}

export async function updateOrderFromForm(id: string, formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session || !canAccessOrders(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  const projectName = formData.get("projectName") as string | null;
  const status = formData.get("status") as OrderStatus | null;
  const contractType = formData.get("contractType") as ContractType | null;
  const endDateStr = formData.get("endDate") as string | null;
  const endDateParsed = parseEndDate(endDateStr);
  const totalValueStr = formData.get("totalValue") as string | null;
  const currency = formData.get("currency") as string | null;
  const paymentTerms = formData.get("paymentTerms") as string | null;
  const internalProjectNumber = formData.get("internalProjectNumber") as string | null;
  const accountOwnerId = formData.get("accountOwnerId") as string | null;
  const projectLeadId = formData.get("projectLeadId") as string | null;

  const data: Parameters<typeof updateOrder>[1] = {
    projectName: projectName?.trim() || undefined,
    status: (status as OrderStatus) || undefined,
    contractType: (contractType as ContractType) || undefined,
    endDate: endDateParsed ?? undefined,
    totalValue: totalValueStr?.trim() ? parseFloat(totalValueStr) : undefined,
    currency: currency?.trim() || undefined,
    paymentTerms: paymentTerms?.trim() || undefined,
    internalProjectNumber: internalProjectNumber?.trim() || undefined,
    accountOwnerId: accountOwnerId?.trim() || undefined,
    projectLeadId: projectLeadId?.trim() || undefined,
  };

  await updateOrder(id, data);
}

export async function deleteOrder(id: string) {
  const session = await getServerSession(authOptions);
  if (!session || !canAccessOrders(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  const order = await prisma.order.findUnique({
    where: { id },
    select: { orderNumber: true, projectName: true, organizationId: true },
  });
  if (!order) throw new Error("Auftrag nicht gefunden");

  await prisma.order.delete({ where: { id } });

  await logAudit({
    userId: session.user?.id,
    action: "Order deleted",
    entityType: "Order",
    entityId: id,
    oldValues: { orderNumber: order.orderNumber, projectName: order.projectName } as Record<string, unknown>,
  });

  revalidatePath("/dashboard/orders");
  revalidatePath(`/dashboard/contacts/${order.organizationId}`);
}
