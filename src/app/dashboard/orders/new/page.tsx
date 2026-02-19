import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { canAccessOrders } from "@/lib/permissions";
import { redirect } from "next/navigation";
import { OrderForm } from "@/components/orders/order-form";
import { PageBanner } from "@/components/dashboard/page-banner";
import { FileText } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { generateOrderNumber } from "@/lib/order-number";
import { serializeForRSC } from "@/lib/serialize-order";

export default async function NewOrderPage() {
  const t = await getTranslations("orders");
  const session = await getServerSession(authOptions);
  if (!session || !canAccessOrders(session.user.role)) {
    redirect("/dashboard");
  }

  const organizationsRaw = await prisma.organization.findMany({
    where: { type: "CUSTOMER" },
    orderBy: { name: "asc" },
  });
  const organizations = serializeForRSC(organizationsRaw);

  async function createOrder(formData: FormData) {
    "use server";
    const orgId = formData.get("organizationId") as string;
    if (!orgId?.trim()) throw new Error("Kunde erforderlich");
    const orderNumber = await generateOrderNumber(orgId);
    const order = await prisma.order.create({
      data: {
        organizationId: orgId,
        orderNumber,
        startDate: new Date(),
        billingModel: "PERIODIC",
        status: "DRAFT",
        contractType: "PROJECT",
      },
    });
    redirect(`/dashboard/orders/${order.id}`);
  }

  return (
    <div className="flex flex-col min-h-0">
      <PageBanner title={t("newOrder")} icon={FileText} />
      <div className="px-4 sm:px-6 md:px-8 pt-6 pb-8">
        <OrderForm
          action={createOrder}
          organizations={organizations}
        />
      </div>
    </div>
  );
}
