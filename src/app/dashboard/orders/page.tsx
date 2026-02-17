import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { canAccessOrders } from "@/lib/permissions";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Plus, FileText, ChevronRight } from "lucide-react";
import { PageBanner } from "@/components/dashboard/page-banner";

export default async function OrdersPage() {
  const t = await getTranslations("orders");
  const session = await getServerSession(authOptions);
  if (!session || !canAccessOrders(session.user.role)) {
    return <p>Nicht berechtigt</p>;
  }

  const orders = await prisma.order.findMany({
    include: { organization: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });

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
      <div className="bg-white rounded-lg overflow-hidden border" style={{ borderColor: "#e1dfdd" }}>
        <table className="w-full text-sm">
          <thead style={{ borderBottom: "1px solid #e1dfdd", backgroundColor: "#f8f8f7" }}>
            <tr>
              <th className="text-left px-3 py-2 text-xs font-medium text-zuraio-textMuted uppercase tracking-wider">
                {t("orderNumber")}
              </th>
              <th className="text-left px-3 py-2 text-xs font-medium text-zuraio-textMuted uppercase tracking-wider">
                {t("projectName")}
              </th>
              <th className="text-left px-3 py-2 text-xs font-medium text-zuraio-textMuted uppercase tracking-wider">
                {t("customer")}
              </th>
              <th className="text-left px-3 py-2 text-xs font-medium text-zuraio-textMuted uppercase tracking-wider">
                {t("status")}
              </th>
              <th className="w-10 px-2 py-2" />
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr
                key={o.id}
                className="border-t transition-colors hover:bg-[#DCE6B5]"
                style={{ borderColor: "#e1dfdd" }}
              >
                <td className="px-3 py-2 font-medium text-zuraio-text tabular-nums">
                  {o.orderNumber || "–"}
                </td>
                <td className="px-3 py-2">
                  <Link
                    href={`/dashboard/orders/${o.id}`}
                    className="font-medium text-zuraio-text hover:underline"
                  >
                    {o.projectName || o.orderNumber || o.organization.name}
                  </Link>
                </td>
                <td className="px-3 py-2 text-zuraio-textMuted text-xs">
                  {o.organization.name}
                </td>
                <td className="px-3 py-2">
                  <span
                    className="inline-block px-2 py-0.5 rounded text-xs font-medium"
                    style={{
                      backgroundColor:
                        o.status === "ACTIVE"
                          ? "#DCE6B5"
                          : o.status === "COMPLETED"
                            ? "#e5e7eb"
                            : "#f8f8f7",
                      color: "#1c1c1c",
                    }}
                  >
                    {t(`status${String(o.status).charAt(0) + String(o.status).slice(1).toLowerCase()}`)}
                  </span>
                </td>
                <td className="px-2 py-2">
                  <Link
                    href={`/dashboard/orders/${o.id}`}
                    className="inline-flex items-center justify-center w-7 h-7 rounded transition-colors hover:bg-[#DCE6B5]"
                    style={{ color: "#9FAF52" }}
                    title="Öffnen"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && (
          <div className="px-4 py-12 text-center text-zuraio-textMuted">
            Keine Aufträge. Erstellen Sie einen neuen Auftrag.
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
