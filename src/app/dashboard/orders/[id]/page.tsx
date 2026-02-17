import { getOrderDetail } from "@/server/actions/orders";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { PageBanner } from "@/components/dashboard/page-banner";
import { OrderDetailTabs } from "@/components/orders/order-detail-tabs";
import { EditOrderForm } from "@/components/orders/edit-order-form";
import { FileText } from "lucide-react";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getOrderDetail(id);

  if (!order) notFound();

  const [auditLogs, users, contacts] = await Promise.all([
    prisma.auditLog.findMany({
      where: { entityType: "Order", entityId: id },
      include: { user: { select: { name: true, email: true } } },
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
    prisma.user.findMany({
      where: { isActive: true },
      select: { id: true, name: true, email: true },
      orderBy: { name: "asc" },
    }),
    prisma.contact.findMany({
      where: { organizationId: order.organizationId },
      select: { id: true, firstName: true, lastName: true },
      orderBy: [{ lastName: "asc" }, { firstName: "asc" }],
    }),
  ]);

  const bannerTitle = order.orderNumber
    ? `Auftrag ${order.orderNumber} – ${order.organization.name}`
    : `Auftrag – ${order.organization.name}`;

  return (
    <div className="flex flex-col min-h-0">
      <PageBanner
        title={bannerTitle}
        icon={FileText}
        backHref="/dashboard/orders"
        actions={<EditOrderForm order={order} users={users} contacts={contacts} />}
      />
      <div className="px-4 sm:px-6 md:px-8 pt-6 pb-8">
        <OrderDetailTabs order={order} auditLogs={auditLogs} />
      </div>
    </div>
  );
}
