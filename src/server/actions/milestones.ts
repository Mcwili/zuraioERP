"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { canAccessOrders } from "@/lib/permissions";
import { revalidatePath } from "next/cache";
import { parseDateCH } from "@/lib/date-format";

function parseDueDate(s: string | null): Date | null {
  if (!s?.trim()) return null;
  const ch = parseDateCH(s);
  if (ch) return ch;
  const iso = new Date(s);
  return isNaN(iso.getTime()) ? null : iso;
}

export async function createMilestoneAction(formData: FormData) {
  const orderId = formData.get("orderId") as string;
  if (!orderId?.trim()) return { error: "Auftrag fehlt" };
  try {
    await createMilestone(orderId, formData);
    return { error: null };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Fehler beim Speichern";
    return { error: msg };
  }
}

export async function updateMilestoneAction(formData: FormData) {
  const id = formData.get("milestoneId") as string;
  const orderId = formData.get("orderId") as string;
  if (!id?.trim() || !orderId?.trim()) return { error: "Daten fehlen" };
  try {
    await updateMilestone(id, orderId, formData);
    return { error: null };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Fehler beim Speichern" };
  }
}

export async function createMilestone(orderId: string, formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session || !canAccessOrders(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  const name = (formData.get("name") as string)?.trim();
  if (!name) throw new Error("Titel erforderlich");

  const desc = (formData.get("description") as string)?.trim();
  const description = desc && desc.length > 0 ? desc : undefined;
  const dueDateStr = formData.get("dueDate") as string | null;
  const dueDate = parseDueDate(dueDateStr);

  const data: {
    orderId: string;
    name: string;
    description?: string;
    dueDate?: Date;
  } = { orderId, name };
  if (description !== undefined) data.description = description;
  if (dueDate !== undefined && dueDate !== null) data.dueDate = dueDate;

  await prisma.milestone.create({
    data,
  });

  revalidatePath(`/dashboard/orders/${orderId}`);
  revalidatePath("/dashboard/orders");
}

export async function updateMilestone(
  id: string,
  orderId: string,
  formData: FormData
) {
  const session = await getServerSession(authOptions);
  if (!session || !canAccessOrders(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  const name = (formData.get("name") as string)?.trim();
  if (!name) throw new Error("Titel erforderlich");

  const desc = (formData.get("description") as string)?.trim();
  const description = desc && desc.length > 0 ? desc : undefined;
  const dueDateStr = formData.get("dueDate") as string | null;
  const dueDate = parseDueDate(dueDateStr);

  const data: {
    name: string;
    description?: string;
    dueDate?: Date | null;
  } = { name };
  if (description !== undefined) data.description = description;
  if (dueDate !== undefined) data.dueDate = dueDate;

  await prisma.milestone.update({
    where: { id },
    data,
  });

  revalidatePath(`/dashboard/orders/${orderId}`);
  revalidatePath("/dashboard/orders");
}

export async function deleteMilestone(id: string, orderId: string) {
  const session = await getServerSession(authOptions);
  if (!session || !canAccessOrders(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  await prisma.milestone.delete({ where: { id } });

  revalidatePath(`/dashboard/orders/${orderId}`);
  revalidatePath("/dashboard/orders");
}
