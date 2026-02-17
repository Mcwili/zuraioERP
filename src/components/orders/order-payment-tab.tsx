"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import type { BillingPlanItem, Invoice } from "@prisma/client";

interface BillingPlanItemWithInvoice extends BillingPlanItem {
  invoice?: Pick<Invoice, "id" | "number" | "status"> | null;
}

interface OrderPaymentTabProps {
  items: BillingPlanItemWithInvoice[];
  orderId: string;
  currency: string;
}

const statusKeys: Record<string, string> = {
  PLANNED: "statusPlanned",
  INVOICED: "statusInvoiced",
  PAID: "statusPaid",
};

export function OrderPaymentTab({
  items,
  orderId,
  currency,
}: OrderPaymentTabProps) {
  const t = useTranslations("orders");

  const formatDate = (d: Date) => d.toLocaleDateString("de-CH");
  const formatAmount = (val: number) =>
    `${val.toLocaleString("de-CH")} ${currency}`;

  return (
    <div
      className="rounded-lg border overflow-hidden bg-white"
      style={{ borderColor: "#e1dfdd" }}
    >
      <div className="flex justify-between items-center p-3 border-b" style={{ borderColor: "#e1dfdd" }}>
        <h3 className="font-semibold text-zuraio-text">{t("paymentPlan")}</h3>
        <div className="flex gap-2">
          <button
            type="button"
            className="text-xs px-2 py-1 rounded transition-colors hover:bg-[#DCE6B5]"
            style={{ color: "#9FAF52" }}
          >
            {t("addRate")}
          </button>
          <button
            type="button"
            className="text-xs px-2 py-1 rounded transition-colors hover:bg-[#DCE6B5]"
            style={{ color: "#9FAF52" }}
          >
            {t("periodicRates")}
          </button>
        </div>
      </div>
      {items.length === 0 ? (
        <div className="p-6 text-center text-zuraio-textMuted text-sm">
          {t("noPaymentPlan")}
        </div>
      ) : (
        <table className="w-full text-sm">
          <thead style={{ backgroundColor: "#f8f8f7", borderBottom: "1px solid #e1dfdd" }}>
            <tr>
              <th className="text-left px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                Fälligkeitsdatum
              </th>
              <th className="text-left px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                Beschreibung
              </th>
              <th className="text-right px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                Betrag
              </th>
              <th className="text-left px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                Status
              </th>
              <th className="text-left px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                Rechnungsnummer
              </th>
              <th className="text-left px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                Zahlungseingang
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                className="border-t transition-colors hover:bg-[#DCE6B5]"
                style={{ borderColor: "#e1dfdd" }}
              >
                <td className="px-3 py-2">{formatDate(item.dueDate)}</td>
                <td className="px-3 py-2">{item.description || "–"}</td>
                <td className="px-3 py-2 text-right tabular-nums">
                  {formatAmount(Number(item.amount))}
                </td>
                <td className="px-3 py-2">
                  <span
                    className="inline-block px-2 py-0.5 rounded text-xs"
                    style={{
                      backgroundColor: item.status === "PAID" ? "#DCE6B5" : "#f8f8f7",
                      color: "#1c1c1c",
                    }}
                  >
                    {t(statusKeys[item.status] || "statusPlanned")}
                  </span>
                </td>
                <td className="px-3 py-2">
                  {item.invoice ? (
                    <Link
                      href={`/dashboard/billing?invoice=${item.invoice.id}`}
                      className="hover:underline"
                      style={{ color: "#9FAF52" }}
                    >
                      {item.invoice.number}
                    </Link>
                  ) : (
                    "–"
                  )}
                </td>
                <td className="px-3 py-2">
                  {item.paidAt
                    ? formatDate(item.paidAt)
                    : "–"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
