"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { canAccessOrders } from "@/lib/permissions";
import { revalidatePath } from "next/cache";
import { logAudit } from "@/lib/audit";

export async function addPaymentScheduleItem(
  orderId: string,
  data: {
    amount: number;
    dueDate: Date;
    description?: string;
    addressId?: string | null;
    contactId?: string | null;
  }
) {
  const session = await getServerSession(authOptions);
  if (!session || !canAccessOrders(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  let billingPlan = await prisma.billingPlan.findUnique({
    where: { orderId },
  });

  if (!billingPlan) {
    billingPlan = await prisma.billingPlan.create({
      data: {
        orderId,
        interval: "MONTHLY",
      },
    });
  }

  const item = await prisma.billingPlanItem.create({
    data: {
      billingPlanId: billingPlan.id,
      amount: data.amount,
      dueDate: data.dueDate,
      description: data.description,
      addressId: data.addressId ?? undefined,
      contactId: data.contactId ?? undefined,
      status: "PLANNED",
    },
  });

  await logAudit({
    userId: session.user?.id,
    action: "Payment schedule item added",
    entityType: "Order",
    entityId: orderId,
    newValues: { itemId: item.id, ...data },
  });

  revalidatePath(`/dashboard/orders/${orderId}`);
  return item;
}

export async function updatePaymentScheduleItem(
  itemId: string,
  orderId: string,
  data: {
    amount: number;
    dueDate: Date;
    description?: string | null;
    addressId?: string | null;
    contactId?: string | null;
  }
) {
  const session = await getServerSession(authOptions);
  if (!session || !canAccessOrders(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  const existing = await prisma.billingPlanItem.findFirst({
    where: { id: itemId },
    include: { billingPlan: true },
  });
  if (!existing || existing.billingPlan.orderId !== orderId) {
    throw new Error("Rate nicht gefunden");
  }
  if (existing.status !== "PLANNED") {
    throw new Error("Nur geplante Raten können bearbeitet werden");
  }

  await prisma.billingPlanItem.update({
    where: { id: itemId },
    data: {
      amount: data.amount,
      dueDate: data.dueDate,
      description: data.description ?? undefined,
      addressId: data.addressId ?? undefined,
      contactId: data.contactId ?? undefined,
    },
  });

  await logAudit({
    userId: session.user?.id,
    action: "Payment schedule item updated",
    entityType: "Order",
    entityId: orderId,
    newValues: { itemId, ...data },
  });

  revalidatePath(`/dashboard/orders/${orderId}`);
}
