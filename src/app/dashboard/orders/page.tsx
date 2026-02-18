import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { canAccessOrders } from "@/lib/permissions";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Plus, FileText } from "lucide-react";
import { PageBanner } from "@/components/dashboard/page-banner";
import { OrdersTable } from "@/components/orders/orders-table";

export default async function OrdersPage() {
  const t = await getTranslations("orders");
  const session = await getServerSession(authOptions);
  if (!session || !canAccessOrders(session.user.role)) {
    return <p>Nicht berechtigt</p>;
  }

  const rows = await prisma.order.findMany({
    include: {
      organization: { select: { name: true } },
      milestones: { select: { id: true, name: true, dueDate: true, completedAt: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const orders = rows.map((o) => ({
    id: o.id,
    orderNumber: o.orderNumber,
    projectName: o.projectName,
    status: o.status,
    startDate: o.startDate,
    endDate: o.endDate,
    organization: o.organization,
    milestones: o.milestones,
  }));

  return (
    <div className="flex flex-col min-h-0">
      <PageBanner
        title={t("title")}
        icon={FileText}
        actions={
          <Link
            href="/dashboard/orders/new"
            className="flex items-center justify-center p-2 rounded-md transition-colors hover:bg-[rgba(0,0,0,0.12)]"
            style={{
              backgroundColor: "rgba(0,0,0,0.08)",
              color: "#000000",
              border: "1px solid rgba(0,0,0,0.12)",
            }}
            title="Auftrag"
          >
            <Plus className="h-5 w-5" />
          </Link>
        }
      />
      <div className="px-4 sm:px-6 md:px-8 pt-6 pb-8">
        <OrdersTable orders={orders} />
      </div>
    </div>
  );
}
