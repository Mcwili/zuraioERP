"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { canAccessOrders } from "@/lib/permissions";
import { revalidatePath } from "next/cache";
import { logAudit } from "@/lib/audit";
import type { OrderTaskType } from "@prisma/client";

export async function createOrderTask(
  orderId: string,
  data: {
    title: string;
    type?: OrderTaskType;
    dueDate?: Date | null;
    notes?: string | null;
  }
) {
  const session = await getServerSession(authOptions);
  if (!session || !canAccessOrders(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  const task = await prisma.orderTask.create({
    data: {
      orderId,
      title: data.title.trim(),
      type: (data.type as "TODO" | "REMARK") ?? "TODO",
      dueDate: data.dueDate ?? undefined,
      notes: data.notes?.trim() || undefined,
    },
  });

  await logAudit({
    userId: session.user?.id,
    action: "Order task created",
    entityType: "Order",
    entityId: orderId,
    newValues: { taskId: task.id, ...data },
  });

  revalidatePath(`/dashboard/orders/${orderId}`);
  return task;
}

export async function updateOrderTask(
  taskId: string,
  orderId: string,
  data: {
    title?: string;
    type?: OrderTaskType;
    dueDate?: Date | null;
    notes?: string | null;
    completedAt?: Date | null;
  }
) {
  const session = await getServerSession(authOptions);
  if (!session || !canAccessOrders(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  const existing = await prisma.orderTask.findFirst({
    where: { id: taskId, orderId },
  });
  if (!existing) throw new Error("Aufgabe nicht gefunden");

  const task = await prisma.orderTask.update({
    where: { id: taskId },
    data: {
      ...(data.title !== undefined && { title: data.title.trim() }),
      ...(data.type !== undefined && { type: data.type }),
      ...(data.dueDate !== undefined && { dueDate: data.dueDate }),
      ...(data.notes !== undefined && { notes: data.notes?.trim() || null }),
      ...(data.completedAt !== undefined && { completedAt: data.completedAt }),
    },
  });

  await logAudit({
    userId: session.user?.id,
    action: "Order task updated",
    entityType: "Order",
    entityId: orderId,
    newValues: { taskId, ...data },
  });

  revalidatePath(`/dashboard/orders/${orderId}`);
  return task;
}

export async function deleteOrderTask(taskId: string, orderId: string) {
  const session = await getServerSession(authOptions);
  if (!session || !canAccessOrders(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  const existing = await prisma.orderTask.findFirst({
    where: { id: taskId, orderId },
  });
  if (!existing) throw new Error("Aufgabe nicht gefunden");

  await prisma.orderTask.delete({
    where: { id: taskId },
  });

  await logAudit({
    userId: session.user?.id,
    action: "Order task deleted",
    entityType: "Order",
    entityId: orderId,
    newValues: { taskId },
  });

  revalidatePath(`/dashboard/orders/${orderId}`);
}
