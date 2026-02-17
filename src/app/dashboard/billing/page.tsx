import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { canAccessBilling } from "@/lib/permissions";
import { getTranslations } from "next-intl/server";
import { Receipt } from "lucide-react";
import { PageBanner } from "@/components/dashboard/page-banner";

export default async function BillingPage() {
  const t = await getTranslations("billing");
  const session = await getServerSession(authOptions);
  if (!session || !canAccessBilling(session.user.role)) {
    return <p>Nicht berechtigt</p>;
  }

  const invoices = await prisma.invoice.findMany({
    orderBy: { dueDate: "desc" },
    take: 50,
  });

  const openInvoices = invoices.filter(
    (i) => i.status !== "PAID" && new Date(i.dueDate) < new Date()
  );

  return (
    <div className="flex flex-col min-h-0">
      <PageBanner title={t("title")} icon={Receipt} />
      <div className="px-4 sm:px-6 md:px-8 pt-6 pb-8">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="p-4 border rounded-lg bg-white" style={{ borderColor: "#e1dfdd" }}>
          <h2 className="font-semibold text-zuraio-text">Offene Posten</h2>
          <p className="text-2xl font-bold text-zuraio-text mt-2">
            {openInvoices.length}
          </p>
          <p className="text-sm text-zuraio-textMuted">überfällige Rechnungen</p>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="font-semibold text-zuraio-text mb-4">
          Rechnungen
        </h2>
        <div className="bg-white rounded-lg overflow-hidden border" style={{ borderColor: "#e1dfdd" }}>
          <table className="w-full">
            <thead className="bg-zuraio-sidebar" style={{ borderBottom: "1px solid #e1dfdd" }}>
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-zuraio-text">
                  Nr.
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-zuraio-text">
                  Status
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-zuraio-text">
                  Fällig
                </th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((i) => (
                <tr
                  key={i.id}
                  className="border-t transition-colors hover:bg-[#DCE6B5]"
                  style={{ borderColor: "#e1dfdd" }}
                >
                  <td className="px-4 py-3 font-medium text-zuraio-text">
                    {i.number}
                  </td>
                  <td className="px-4 py-3 text-zuraio-textMuted text-sm">
                    {i.status}
                  </td>
                  <td className="px-4 py-3 text-zuraio-textMuted text-sm">
                    {i.dueDate.toLocaleDateString("de-CH")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {invoices.length === 0 && (
            <div className="px-4 py-12 text-center text-zuraio-textMuted">
              Keine Rechnungen vorhanden.
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
