"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Pencil, ChevronUp, ChevronDown, Plus } from "lucide-react";
import { AddRateModal } from "./add-rate-modal";
import type { BillingPlanItem, Invoice, Address, Contact } from "@prisma/client";

type SortKey = "dueDate" | "description" | "amount" | "status" | "invoiceNumber" | "paidAt" | null;

interface BillingPlanItemWithInvoice extends BillingPlanItem {
  invoice?: Pick<Invoice, "id" | "number" | "status"> | null;
}

interface OrderPaymentTabProps {
  items: BillingPlanItemWithInvoice[];
  orderId: string;
  currency: string;
  totalValue: number;
  addresses: Address[];
  contacts: Contact[];
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
  totalValue,
  addresses,
  contacts,
}: OrderPaymentTabProps) {
  const t = useTranslations("orders");
  const tActions = useTranslations("actions");
  const [addRateOpen, setAddRateOpen] = useState(false);
  const [editItem, setEditItem] = useState<BillingPlanItemWithInvoice | null>(null);
  const [sortColumn, setSortColumn] = useState<SortKey>("dueDate");
  const [sortAsc, setSortAsc] = useState(true);

  const formatDate = (d: Date | string) =>
    typeof d === "string" ? new Date(d).toLocaleDateString("de-CH") : d.toLocaleDateString("de-CH");
  const formatAmount = (val: number) =>
    `${val.toLocaleString("de-CH")} ${currency}`;

  function handleSort(key: SortKey) {
    if (!key) return;
    if (sortColumn === key) {
      setSortAsc((a) => !a);
    } else {
      setSortColumn(key);
      setSortAsc(true);
    }
  }

  const sortedItems = useMemo(() => {
    if (!sortColumn) return items;
    const arr = [...items];
    const mult = sortAsc ? 1 : -1;
    arr.sort((a, b) => {
      let cmp = 0;
      switch (sortColumn) {
        case "dueDate":
          cmp = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
          break;
        case "description":
          cmp = (a.description || "").localeCompare(b.description || "");
          break;
        case "amount":
          cmp = Number(a.amount) - Number(b.amount);
          break;
        case "status":
          cmp = (a.status || "").localeCompare(b.status || "");
          break;
        case "invoiceNumber":
          cmp = (a.invoice?.number || "").localeCompare(b.invoice?.number || "");
          break;
        case "paidAt":
          cmp = (a.paidAt ? new Date(a.paidAt).getTime() : 0) - (b.paidAt ? new Date(b.paidAt).getTime() : 0);
          break;
        default:
          return 0;
      }
      return mult * cmp;
    });
    return arr;
  }, [items, sortColumn, sortAsc]);

  const SortHeader = ({
    sortKey,
    label,
    align = "left",
  }: {
    sortKey: SortKey;
    label: string;
    align?: "left" | "right";
  }) => (
    <th
      className={`px-3 py-2 text-xs font-medium text-zuraio-textMuted cursor-pointer select-none hover:bg-[#e8e8e6] transition-colors ${align === "right" ? "text-right" : "text-left"}`}
      onClick={() => handleSort(sortKey)}
    >
      <span className="inline-flex items-center gap-1">
        {label}
        {sortColumn === sortKey && (sortAsc ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />)}
      </span>
    </th>
  );

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
            onClick={() => setAddRateOpen(true)}
            className="flex items-center gap-1.5 px-2 py-1.5 text-sm rounded transition-colors hover:bg-[#DCE6B5]"
            style={{ color: "#9FAF52" }}
          >
            <Plus className="h-4 w-4" />
            {t("addRate")}
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
              <SortHeader sortKey="dueDate" label={t("columnDueDate")} />
              <SortHeader sortKey="description" label={t("columnDescription")} />
              <SortHeader sortKey="amount" label={t("columnAmount")} align="right" />
              <SortHeader sortKey="status" label={t("columnStatus")} />
              <SortHeader sortKey="invoiceNumber" label={t("columnInvoiceNumber")} />
              <SortHeader sortKey="paidAt" label={t("columnPaymentReceived")} />
              <th className="w-10 px-3 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {sortedItems.map((item) => (
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
                <td className="px-3 py-2">
                  {item.status === "PLANNED" && (
                    <button
                      type="button"
                      onClick={() => setEditItem(item)}
                      className="p-2 rounded-md transition-colors hover:bg-[#DCE6B5]"
                      title={tActions("edit")}
                    >
                      <Pencil className="h-4 w-4" style={{ color: "#9FAF52" }} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {addRateOpen && (
        <AddRateModal
          orderId={orderId}
          totalValue={totalValue}
          currency={currency}
          addresses={addresses}
          contacts={contacts}
          onClose={() => setAddRateOpen(false)}
        />
      )}
      {editItem && (
        <AddRateModal
          orderId={orderId}
          totalValue={totalValue}
          currency={currency}
          addresses={addresses}
          contacts={contacts}
          item={editItem}
          onClose={() => setEditItem(null)}
        />
      )}
    </div>
  );
}
