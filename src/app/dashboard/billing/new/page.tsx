import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { canAccessBilling } from "@/lib/permissions";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { Receipt } from "lucide-react";
import { PageBanner } from "@/components/dashboard/page-banner";
import { InvoiceForm } from "@/components/billing/invoice-form";
import { generateInvoiceNumber } from "@/lib/invoice-number";

export default async function NewInvoicePage() {
  const t = await getTranslations("billing");
  const session = await getServerSession(authOptions);
  if (!session || !canAccessBilling(session.user.role)) {
    redirect("/dashboard");
  }

  const orders = await prisma.order.findMany({
    where: { status: { in: ["ACTIVE", "DRAFT"] } },
    include: {
      organization: { select: { name: true } },
      billingPlan: {
        include: {
          items: {
            where: { invoiced: false },
            orderBy: { dueDate: "asc" },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  const ordersWithPlanItems = orders.map((o) => ({
    id: o.id,
    orderNumber: o.orderNumber,
    projectName: o.projectName,
    organization: o.organization,
    planItems: (o.billingPlan?.items ?? []).map((i) => ({
      id: i.id,
      dueDate: i.dueDate,
      amount: Number(i.amount),
      description: i.description,
    })),
  }));

  async function createInvoice(formData: FormData) {
    "use server";
    const orderId = (formData.get("orderId") as string)?.trim();
    const planItemIds = formData.getAll("planItemIds") as string[];

    if (!orderId) throw new Error("Auftrag erforderlich");

    const number = await generateInvoiceNumber();

    const dueDate =
      planItemIds.length > 0
        ? await prisma.billingPlanItem
            .findFirst({
              where: { id: { in: planItemIds } },
              select: { dueDate: true },
              orderBy: { dueDate: "desc" },
            })
            .then((r) => r?.dueDate ?? new Date())
        : new Date();

    const invoice = await prisma.invoice.create({
      data: {
        number,
        status: "DRAFT",
        dueDate,
        orderId,
      },
    });

    if (planItemIds.length > 0) {
      const planItems = await prisma.billingPlanItem.findMany({
        where: { id: { in: planItemIds }, invoiced: false },
      });

      for (const item of planItems) {
        await prisma.invoiceItem.create({
          data: {
            invoiceId: invoice.id,
            description: item.description || `Rate ${item.dueDate.toLocaleDateString("de-CH")}`,
            quantity: 1,
            unitPrice: item.amount,
          },
        });
      }

      await prisma.billingPlanItem.updateMany({
        where: { id: { in: planItemIds } },
        data: {
          invoiceId: invoice.id,
          invoiced: true,
          status: "INVOICED",
        },
      });

      revalidatePath(`/dashboard/orders/${orderId}`);
    }

    revalidatePath("/dashboard/billing");
    redirect(`/dashboard/billing/${invoice.id}`);
  }

  return (
    <div className="flex flex-col min-h-0">
      <PageBanner
        title={t("newInvoice")}
        icon={Receipt}
        backHref="/dashboard/billing"
      />
      <div className="px-4 sm:px-6 md:px-8 pt-6 pb-8">
        <InvoiceForm action={createInvoice} orders={ordersWithPlanItems} />
      </div>
    </div>
  );
}
