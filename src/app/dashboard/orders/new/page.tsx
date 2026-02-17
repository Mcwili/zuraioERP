import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { canAccessOrders } from "@/lib/permissions";
import { redirect } from "next/navigation";
import { OrderForm } from "@/components/orders/order-form";
import { PageBanner } from "@/components/dashboard/page-banner";
import { FileText } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function NewOrderPage() {
  const t = await getTranslations("orders");
  const session = await getServerSession(authOptions);
  if (!session || !canAccessOrders(session.user.role)) {
    redirect("/dashboard");
  }

  const organizations = await prisma.organization.findMany({
    where: { type: "CUSTOMER" },
    orderBy: { name: "asc" },
  });

  async function createOrder(formData: FormData) {
    "use server";
    const orgId = formData.get("organizationId") as string;
    const startDate = new Date(formData.get("startDate") as string);
    await prisma.order.create({
      data: {
        organizationId: orgId,
        startDate,
        billingModel: "PERIODIC",
        status: "DRAFT",
        contractType: "PROJECT",
      },
    });
    redirect("/dashboard/orders");
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
