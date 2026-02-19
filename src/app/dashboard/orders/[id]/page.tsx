import { getOrderDetail } from "@/server/actions/orders";
import { getUsersForAccountOwner } from "@/server/actions/users";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { PageBanner } from "@/components/dashboard/page-banner";
import { OrderDetailTabs } from "@/components/orders/order-detail-tabs";
import { EditOrderForm } from "@/components/orders/edit-order-form";
import { FileText } from "lucide-react";
import { serializeOrder, serializeForRSC } from "@/lib/serialize-order";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const orderRaw = await getOrderDetail(id);

  if (!orderRaw) notFound();

  const order = serializeOrder(orderRaw);

  const [usersRaw, contactsRaw] = await Promise.all([
    getUsersForAccountOwner(),
    prisma.contact.findMany({
      where: { organizationId: order.organizationId },
      select: { id: true, firstName: true, lastName: true },
      orderBy: [{ lastName: "asc" }, { firstName: "asc" }],
    }),
  ]);
  const users = serializeForRSC(usersRaw);
  const contacts = serializeForRSC(contactsRaw);

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
        <OrderDetailTabs order={order} />
      </div>
    </div>
  );
}
