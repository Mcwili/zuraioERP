"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";

interface PlanItem {
  id: string;
  dueDate: Date | string;
  amount: number;
  description: string | null;
}

interface Order {
  id: string;
  orderNumber: string | null;
  projectName: string | null;
  organization: { name: string };
  planItems: PlanItem[];
}

export function InvoiceForm({
  action,
  orders,
}: {
  action: (formData: FormData) => Promise<void>;
  orders: Order[];
}) {
  const t = useTranslations("billing");
  const tActions = useTranslations("actions");
  const [isPending, startTransition] = useTransition();
  const [selectedOrderId, setSelectedOrderId] = useState<string>("");

  const selectedOrder = orders.find((o) => o.id === selectedOrderId);
  const planItems = selectedOrder?.planItems ?? [];

  const formatDate = (d: Date | string) =>
    typeof d === "string" ? new Date(d).toLocaleDateString("de-CH") : d.toLocaleDateString("de-CH");
  const formatAmount = (val: number) => val.toLocaleString("de-CH") + " CHF";

  return (
    <form
      action={(fd) => startTransition(() => action(fd))}
      className="max-w-lg space-y-6"
    >
      <div>
        <label className="block text-sm font-medium text-zuraio-text mb-1">
          {t("selectOrder")} *
        </label>
        <select
          name="orderId"
          required
          value={selectedOrderId}
          onChange={(e) => setSelectedOrderId(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DCE6B5]"
          style={{ borderColor: "#e1dfdd" }}
        >
          <option value="">– Bitte wählen –</option>
          {orders.map((o) => (
            <option key={o.id} value={o.id}>
              {o.orderNumber || "–"} – {o.projectName || o.organization.name}
            </option>
          ))}
        </select>
      </div>

      {selectedOrderId && (
        <div>
          <label className="block text-sm font-medium text-zuraio-text mb-2">
            {t("selectPlanItems")}
          </label>
          {planItems.length === 0 ? (
            <p className="text-sm text-zuraio-textMuted py-3">
              {t("noPlanItems")}
            </p>
          ) : (
            <div
              className="rounded-lg border overflow-hidden"
              style={{ borderColor: "#e1dfdd" }}
            >
              <table className="w-full text-sm">
                <thead style={{ backgroundColor: "#f8f8f7", borderBottom: "1px solid #e1dfdd" }}>
                  <tr>
                    <th className="text-left px-3 py-2 w-10" />
                    <th className="text-left px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                      {t("columnDueDate")}
                    </th>
                    <th className="text-left px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                      {t("columnDescription")}
                    </th>
                    <th className="text-right px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                      {t("columnAmount")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {planItems.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t transition-colors hover:bg-[#DCE6B5]"
                      style={{ borderColor: "#e1dfdd" }}
                    >
                      <td className="px-3 py-2">
                        <input
                          type="checkbox"
                          name="planItemIds"
                          value={item.id}
                          className="rounded"
                        />
                      </td>
                      <td className="px-3 py-2">{formatDate(item.dueDate)}</td>
                      <td className="px-3 py-2">
                        {item.description || "–"}
                      </td>
                      <td className="px-3 py-2 text-right tabular-nums">
                        {formatAmount(item.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      <p className="text-xs text-zuraio-textMuted">
        Die Rechnungsnummer wird automatisch vergeben.
      </p>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2 rounded-md disabled:opacity-50 text-black font-medium hover:opacity-90"
          style={{ backgroundColor: "#9FAF52" }}
        >
          {isPending ? "…" : t("newInvoice")}
        </button>
        <a
          href="/dashboard/billing"
          className="px-4 py-2 border rounded-md"
          style={{ borderColor: "#e1dfdd" }}
        >
          {tActions("cancel")}
        </a>
      </div>
    </form>
  );
}
