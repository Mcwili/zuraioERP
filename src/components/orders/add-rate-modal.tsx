"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { addPaymentScheduleItem, updatePaymentScheduleItem } from "@/server/actions/payment-schedule";
import { useRouter } from "next/navigation";
import { parseDateCH, formatDateCHDot } from "@/lib/date-format";
import type { Address, Contact } from "@prisma/client";

interface BillingPlanItemWithIds {
  id: string;
  amount: number | { toNumber: () => number };
  dueDate: Date | string;
  description: string | null;
  addressId: string | null;
  contactId: string | null;
  status: string;
}

interface AddRateModalProps {
  orderId: string;
  totalValue: number;
  currency: string;
  addresses: Address[];
  contacts: Contact[];
  item?: BillingPlanItemWithIds | null;
  onClose: () => void;
}

const addressTypeLabel = (type: string, t: (k: string) => string) =>
  type === "INVOICE" ? t("addressInvoice") : type === "DELIVERY" ? t("addressDelivery") : t("addressHeadquarters");

export function AddRateModal({
  orderId,
  totalValue,
  currency,
  addresses,
  contacts,
  item,
  onClose,
}: AddRateModalProps) {
  const t = useTranslations("orders");
  const tContacts = useTranslations("contacts");
  const tActions = useTranslations("actions");
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const isEdit = !!item;

  const amountVal = item ? (typeof item.amount === "object" && "toNumber" in item.amount ? (item.amount as { toNumber: () => number }).toNumber() : Number(item.amount)) : "";
  const dueDateVal = item ? (typeof item.dueDate === "string" ? new Date(item.dueDate) : item.dueDate) : null;
  const dueDateStr = dueDateVal ? formatDateCHDot(dueDateVal) : "";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setPending(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const amount = parseFloat((formData.get("amount") as string) || "0");
    const dueDateStr = (formData.get("dueDate") as string) || "";
    const dueDate = parseDateCH(dueDateStr);
    const addressId = (formData.get("addressId") as string) || null;
    const contactId = (formData.get("contactId") as string) || null;
    const description = (formData.get("description") as string)?.trim() || null;

    if (!dueDate || amount <= 0) {
      setError("Betrag und Fälligkeitsdatum sind erforderlich.");
      setPending(false);
      return;
    }

    try {
      if (isEdit && item) {
        await updatePaymentScheduleItem(item.id, orderId, {
          amount,
          dueDate,
          description: description ?? null,
          addressId: addressId || null,
          contactId: contactId || null,
        });
      } else {
        await addPaymentScheduleItem(orderId, {
          amount,
          dueDate,
          description: description ?? undefined,
          addressId: addressId || undefined,
          contactId: contactId || undefined,
        });
      }
      onClose();
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Fehler beim Speichern");
    } finally {
      setPending(false);
    }
  }

  const formatAmount = (val: number) =>
    `${val.toLocaleString("de-CH")} ${currency}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
    >
      <div
        className="w-full max-w-md rounded-lg shadow-xl overflow-hidden bg-white max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b" style={{ borderColor: "#e1dfdd" }}>
          <h3 className="text-lg font-semibold" style={{ color: "#1c1c1c" }}>
            {isEdit ? t("editRateTitle") : t("addRateTitle")}
          </h3>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          {!isEdit && (
            <div>
              <label className="block text-sm font-medium text-zuraio-textMuted mb-1">
                {t("orderTotal")}
              </label>
              <p className="px-3 py-2 text-base font-medium" style={{ backgroundColor: "#f8f8f7", borderRadius: "6px" }}>
                {formatAmount(totalValue)}
              </p>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-zuraio-textMuted mb-1">
              {t("rateAmount")} *
            </label>
            <input
              name="amount"
              type="number"
              step="0.01"
              min="0"
              required
              defaultValue={amountVal}
              className="w-full px-3 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DCE6B5]"
              style={{ borderColor: "#e1dfdd" }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zuraio-textMuted mb-1">
              {t("dueDate")} *
            </label>
            <input
              name="dueDate"
              type="text"
              placeholder="dd.mm.yyyy"
              required
              defaultValue={dueDateStr}
              className="w-full px-3 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DCE6B5]"
              style={{ borderColor: "#e1dfdd" }}
            />
          </div>
          {addresses.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-zuraio-textMuted mb-1">
                {t("invoiceAddress")}
              </label>
              <select
                name="addressId"
                defaultValue={item?.addressId ?? ""}
                className="w-full px-3 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DCE6B5]"
                style={{ borderColor: "#e1dfdd" }}
              >
                <option value="">–</option>
                {addresses.map((a) => (
                  <option key={a.id} value={a.id}>
                    {addressTypeLabel(a.type, tContacts)}: {[a.street, a.postalCode, a.city, a.country].filter(Boolean).join(", ") || "–"}
                  </option>
                ))}
              </select>
            </div>
          )}
          {contacts.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-zuraio-textMuted mb-1">
                {t("contactPerson")}
              </label>
              <select
                name="contactId"
                defaultValue={item?.contactId ?? ""}
                className="w-full px-3 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DCE6B5]"
                style={{ borderColor: "#e1dfdd" }}
              >
                <option value="">–</option>
                {contacts.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.firstName} {c.lastName}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-zuraio-textMuted mb-1">
              {t("remarks")}
            </label>
            <textarea
              name="description"
              rows={2}
              defaultValue={item?.description ?? ""}
              className="w-full px-3 py-2 text-base border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-[#DCE6B5]"
              style={{ borderColor: "#e1dfdd" }}
            />
          </div>
          {error && (
            <div
              className="p-3 rounded-lg text-sm"
              style={{
                backgroundColor: "rgba(209, 52, 56, 0.05)",
                border: "1px solid rgba(209, 52, 56, 0.2)",
                color: "#d13438",
              }}
            >
              {error}
            </div>
          )}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={pending}
              className="px-4 py-2 rounded-md text-black font-medium disabled:opacity-50"
              style={{ backgroundColor: "#9FAF52" }}
            >
              {pending ? `${tActions("save")}…` : tActions("save")}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md"
              style={{ borderColor: "#e1dfdd" }}
            >
              {tActions("cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
