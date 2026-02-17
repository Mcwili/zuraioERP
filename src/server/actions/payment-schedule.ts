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
