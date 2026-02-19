"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

interface InvoiceWithItems {
  id: string;
  number: string;
  status: string;
  dueDate: Date | string;
  items: { quantity: unknown; unitPrice: unknown }[];
  payments: { amount: unknown }[];
}

interface OrderInvoicesTabProps {
  invoices: InvoiceWithItems[];
  orderId: string;
  currency: string;
}

export function OrderInvoicesTab({
  invoices,
  orderId,
  currency,
}: OrderInvoicesTabProps) {
  const t = useTranslations("orders");

  const formatDate = (d: Date | string) => new Date(d).toLocaleDateString("de-CH");

  const getTotal = (inv: InvoiceWithItems) => {
    const itemsTotal = inv.items.reduce(
      (sum, i) => sum + Number(i.quantity) * Number(i.unitPrice),
      0
    );
    return itemsTotal;
  };

  return (
    <div
      className="rounded-lg border overflow-hidden bg-white"
      style={{ borderColor: "#e1dfdd" }}
    >
      <div className="flex justify-between items-center p-3 border-b" style={{ borderColor: "#e1dfdd" }}>
        <h3 className="font-semibold text-zuraio-text">{t("invoices")}</h3>
        <div className="flex gap-2">
          <button
            type="button"
            className="text-xs px-2 py-1 rounded transition-colors hover:bg-[#DCE6B5]"
            style={{ color: "#9FAF52" }}
          >
            {t("createInvoice")}
          </button>
          <button
            type="button"
            className="text-xs px-2 py-1 rounded transition-colors hover:bg-[#DCE6B5]"
            style={{ color: "#9FAF52" }}
          >
            {t("createCreditNote")}
          </button>
          <button
            type="button"
            className="text-xs px-2 py-1 rounded transition-colors hover:bg-[#DCE6B5]"
            style={{ color: "#9FAF52" }}
          >
            {t("recordPayment")}
          </button>
        </div>
      </div>
      {invoices.length === 0 ? (
        <div className="p-6 text-center text-zuraio-textMuted text-sm">
          {t("noInvoices")}
        </div>
      ) : (
        <table className="w-full text-sm">
          <thead style={{ backgroundColor: "#f8f8f7", borderBottom: "1px solid #e1dfdd" }}>
            <tr>
              <th className="text-left px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                Rechnungsnummer
              </th>
              <th className="text-left px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                Datum
              </th>
              <th className="text-right px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                Betrag
              </th>
              <th className="text-left px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                Status
              </th>
              <th className="text-left px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                Fälligkeit
              </th>
              <th className="text-left px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                Mahnstufe
              </th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr
                key={inv.id}
                className="border-t transition-colors hover:bg-[#DCE6B5]"
                style={{ borderColor: "#e1dfdd" }}
              >
                <td className="px-3 py-2">
                  <Link
                    href={`/dashboard/billing`}
                    className="font-medium hover:underline"
                    style={{ color: "#9FAF52" }}
                  >
                    {inv.number}
                  </Link>
                </td>
                <td className="px-3 py-2 text-zuraio-textMuted">
                  {formatDate(inv.dueDate)}
                </td>
                <td className="px-3 py-2 text-right tabular-nums">
                  {getTotal(inv).toLocaleString("de-CH")} {currency}
                </td>
                <td className="px-3 py-2">{inv.status}</td>
                <td className="px-3 py-2">{formatDate(inv.dueDate)}</td>
                <td className="px-3 py-2">–</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
