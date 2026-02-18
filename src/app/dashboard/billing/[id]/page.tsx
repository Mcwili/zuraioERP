import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { canAccessBilling } from "@/lib/permissions";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Receipt } from "lucide-react";
import { PageBanner } from "@/components/dashboard/page-banner";
import { GenerateInvoicePdfButton } from "@/components/billing/generate-invoice-pdf-button";

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session || !canAccessBilling(session.user.role)) {
    notFound();
  }

  const resolvedParams = params instanceof Promise ? await params : params;
  const { id } = resolvedParams;
  const t = await getTranslations("billing");

  const invoice = await prisma.invoice.findUnique({
    where: { id },
    include: {
      order: { select: { id: true, orderNumber: true, projectName: true } },
      items: true,
    },
  });

  if (!invoice) notFound();

  const total = invoice.items.reduce(
    (sum, i) => sum + Number(i.quantity) * Number(i.unitPrice),
    0
  );

  return (
    <div className="flex flex-col min-h-0">
      <PageBanner
        title={`${t("title")} ${invoice.number}`}
        icon={Receipt}
        backHref="/dashboard/billing"
        actions={
          <GenerateInvoicePdfButton
            invoiceId={invoice.id}
            hasOrder={!!invoice.orderId}
          />
        }
      />
      <div className="px-4 sm:px-6 md:px-8 pt-6 pb-8">
        <div
          className="rounded-lg border overflow-hidden bg-white p-6"
          style={{ borderColor: "#e1dfdd" }}
        >
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-zuraio-textMuted">
                {t("columnNumber")}
              </dt>
              <dd className="mt-1 font-medium text-zuraio-text">{invoice.number}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-zuraio-textMuted">
                {t("columnStatus")}
              </dt>
              <dd className="mt-1">
                <span
                  className="inline-block px-2 py-0.5 rounded text-xs font-medium"
                  style={{
                    backgroundColor:
                      invoice.status === "PAID"
                        ? "#e5e7eb"
                        : invoice.status === "DRAFT"
                          ? "#f8f8f7"
                          : "#DCE6B5",
                    color: "#1c1c1c",
                  }}
                >
                  {t(
                    (invoice.status === "DRAFT" && "statusDraft") ||
                    (invoice.status === "PLANNED" && "statusPlanned") ||
                    (invoice.status === "INVOICED" && "statusInvoiced") ||
                    (invoice.status === "PAID" && "statusPaid") ||
                    "statusDraft"
                  )}
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-zuraio-textMuted">
                {t("columnDueDate")}
              </dt>
              <dd className="mt-1 text-zuraio-text">
                {invoice.dueDate.toLocaleDateString("de-CH")}
              </dd>
            </div>
            {invoice.order && (
              <div>
                <dt className="text-sm font-medium text-zuraio-textMuted">
                  Auftrag
                </dt>
                <dd className="mt-1">
                  <Link
                    href={`/dashboard/orders/${invoice.order.id}`}
                    className="text-[#9FAF52] hover:underline"
                  >
                    {invoice.order.orderNumber || invoice.order.projectName || invoice.order.id}
                  </Link>
                </dd>
              </div>
            )}
          </dl>

          {invoice.items.length > 0 && (
            <div className="mt-6 pt-6 border-t" style={{ borderColor: "#e1dfdd" }}>
              <h3 className="font-semibold text-zuraio-text mb-3">Positionen</h3>
              <table className="w-full text-sm">
                <thead style={{ backgroundColor: "#f8f8f7", borderBottom: "1px solid #e1dfdd" }}>
                  <tr>
                    <th className="text-left px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                      Beschreibung
                    </th>
                    <th className="text-right px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                      Menge
                    </th>
                    <th className="text-right px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                      Einzelpreis
                    </th>
                    <th className="text-right px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                      Betrag
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t"
                      style={{ borderColor: "#e1dfdd" }}
                    >
                      <td className="px-3 py-2 text-zuraio-text">{item.description}</td>
                      <td className="px-3 py-2 text-right tabular-nums">
                        {Number(item.quantity).toLocaleString("de-CH")}
                      </td>
                      <td className="px-3 py-2 text-right tabular-nums">
                        {Number(item.unitPrice).toLocaleString("de-CH")} CHF
                      </td>
                      <td className="px-3 py-2 text-right font-medium tabular-nums">
                        {(Number(item.quantity) * Number(item.unitPrice)).toLocaleString(
                          "de-CH"
                        )}{" "}
                        CHF
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-3 text-right font-semibold text-zuraio-text">
                Total: {total.toLocaleString("de-CH")} CHF
              </p>
            </div>
          )}

          {invoice.items.length === 0 && (
            <p className="mt-6 text-sm text-zuraio-textMuted">
              Keine Positionen. Rechnung kann im zugehörigen Auftrag bearbeitet werden.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
