import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { serializeForRSC } from "@/lib/serialize-order";
import { authOptions } from "@/lib/auth";
import { canAccessBilling } from "@/lib/permissions";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Plus, Receipt } from "lucide-react";
import { PageBanner } from "@/components/dashboard/page-banner";
import { InvoicesTable } from "@/components/billing/invoices-table";

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

  const invoiceRows = serializeForRSC(
    invoices.map((i) => ({
      id: i.id,
      number: i.number,
      status: i.status,
      dueDate: i.dueDate,
    }))
  );

  return (
    <div className="flex flex-col min-h-0">
      <PageBanner
        title={t("title")}
        icon={Receipt}
        actions={
          <Link
            href="/dashboard/billing/new"
            className="flex items-center justify-center p-2 rounded-md transition-colors hover:bg-[rgba(0,0,0,0.12)]"
            style={{
              backgroundColor: "rgba(0,0,0,0.08)",
              color: "#000000",
              border: "1px solid rgba(0,0,0,0.12)",
            }}
            title={t("newInvoice")}
          >
            <Plus className="h-5 w-5" />
          </Link>
        }
      />
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
            {t("title")}
          </h2>
          <InvoicesTable invoices={invoiceRows} />
        </div>
      </div>
    </div>
  );
}
