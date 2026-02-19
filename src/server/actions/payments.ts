"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { canAccessBilling } from "@/lib/permissions";
import { revalidatePath } from "next/cache";
import { logAudit } from "@/lib/audit";

export async function createPayment(data: {
  invoiceId: string;
  amount: number;
  paidAt: Date;
  reference?: string | null;
}) {
  const session = await getServerSession(authOptions);
  if (!session || !canAccessBilling(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  const invoice = await prisma.invoice.findUnique({
    where: { id: data.invoiceId },
    include: { items: true, payments: true },
  });

  if (!invoice) throw new Error("Rechnung nicht gefunden");

  const total = invoice.items.reduce(
    (s, i) => s + Number(i.quantity) * Number(i.unitPrice),
    0
  );
  const paidSoFar = invoice.payments.reduce((s, p) => s + Number(p.amount), 0);
  const newPaid = paidSoFar + data.amount;

  if (data.amount <= 0) throw new Error("Betrag muss größer als 0 sein");

  const payment = await prisma.payment.create({
    data: {
      invoiceId: data.invoiceId,
      amount: data.amount,
      paidAt: data.paidAt,
      reference: data.reference ?? null,
    },
  });

  if (newPaid >= total - 0.01) {
    await prisma.invoice.update({
      where: { id: data.invoiceId },
      data: { status: "PAID" },
    });
  }

  await logAudit({
    userId: session.user?.id,
    action: "Payment created",
    entityType: "Payment",
    entityId: payment.id,
    newValues: data,
  });

  revalidatePath("/dashboard/billing");
  revalidatePath(`/dashboard/billing/${data.invoiceId}`);
  if (invoice.orderId) {
    revalidatePath(`/dashboard/orders/${invoice.orderId}`);
  }

  return payment;
}
