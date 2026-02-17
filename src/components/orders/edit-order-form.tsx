"use client";

import { useState } from "react";
import { updateOrderFromForm } from "@/server/actions/orders";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import { useTranslations } from "next-intl";
import type { Order, Organization, User, Contact } from "@prisma/client";

interface EditOrderFormProps {
  order: Order & {
    organization: Organization;
    accountOwner?: User | null;
    projectLead?: Contact | null;
  };
  users: { id: string; name: string | null; email: string }[];
  contacts: { id: string; firstName: string; lastName: string }[];
}

export function EditOrderForm({ order, users, contacts }: EditOrderFormProps) {
  const t = useTranslations("orders");
  const tActions = useTranslations("actions");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const formatDate = (d: Date) => d.toISOString().slice(0, 10);

  async function handleSubmit(formData: FormData) {
    await updateOrderFromForm(order.id, formData);
    setOpen(false);
    router.refresh();
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        type="button"
        className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-[rgba(0,0,0,0.12)]"
        style={{
          backgroundColor: "rgba(0,0,0,0.08)",
          color: "#000000",
          border: "1px solid rgba(0,0,0,0.12)",
        }}
        title={tActions("edit")}
      >
        <Pencil className="h-4 w-4" />
        <span className="text-sm font-medium">{tActions("edit")}</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-lg shadow-xl overflow-hidden my-8"
            style={{ backgroundColor: "#ffffff" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b" style={{ borderColor: "#e1dfdd" }}>
              <h3 className="text-lg font-semibold" style={{ color: "#1c1c1c" }}>
                Auftrag bearbeiten
              </h3>
            </div>
            <form action={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-zuraio-textMuted mb-1.5">
                  {t("orderNumber")}
                </label>
                <input
                  name="orderNumber"
                  defaultValue={order.orderNumber ?? ""}
                  className="w-full px-3 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DCE6B5]"
                  style={{ borderColor: "#e1dfdd" }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zuraio-textMuted mb-1.5">
                  {t("projectName")}
                </label>
                <input
                  name="projectName"
                  defaultValue={order.projectName ?? ""}
                  className="w-full px-3 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DCE6B5]"
                  style={{ borderColor: "#e1dfdd" }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zuraio-textMuted mb-1.5">
                  {t("status")}
                </label>
                <select
                  name="status"
                  defaultValue={order.status}
                  className="w-full px-3 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DCE6B5]"
                  style={{ borderColor: "#e1dfdd" }}
                >
                  <option value="DRAFT">{t("statusDraft")}</option>
                  <option value="ACTIVE">{t("statusActive")}</option>
                  <option value="PAUSED">{t("statusPaused")}</option>
                  <option value="COMPLETED">{t("statusCompleted")}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zuraio-textMuted mb-1.5">
                  {t("contractType")}
                </label>
                <select
                  name="contractType"
                  defaultValue={order.contractType}
                  className="w-full px-3 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DCE6B5]"
                  style={{ borderColor: "#e1dfdd" }}
                >
                  <option value="PROJECT">{t("contractTypeProject")}</option>
                  <option value="LICENSE">{t("contractTypeLicense")}</option>
                  <option value="MIXED">{t("contractTypeMixed")}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zuraio-textMuted mb-1.5">
                  {t("endDate")}
                </label>
                <input
                  name="endDate"
                  type="date"
                  defaultValue={order.endDate ? formatDate(order.endDate) : ""}
                  className="w-full px-3 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DCE6B5]"
                  style={{ borderColor: "#e1dfdd" }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zuraio-textMuted mb-1.5">
                  {t("totalValue")}
                </label>
                <input
                  name="totalValue"
                  type="number"
                  step="0.01"
                  defaultValue={order.totalValue ? Number(order.totalValue) : ""}
                  className="w-full px-3 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DCE6B5]"
                  style={{ borderColor: "#e1dfdd" }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zuraio-textMuted mb-1.5">
                  {t("currency")}
                </label>
                <input
                  name="currency"
                  defaultValue={order.currency ?? "CHF"}
                  className="w-full px-3 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DCE6B5]"
                  style={{ borderColor: "#e1dfdd" }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zuraio-textMuted mb-1.5">
                  {t("paymentTerms")}
                </label>
                <input
                  name="paymentTerms"
                  defaultValue={order.paymentTerms ?? ""}
                  className="w-full px-3 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DCE6B5]"
                  style={{ borderColor: "#e1dfdd" }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zuraio-textMuted mb-1.5">
                  {t("internalProjectNumber")}
                </label>
                <input
                  name="internalProjectNumber"
                  defaultValue={order.internalProjectNumber ?? ""}
                  className="w-full px-3 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DCE6B5]"
                  style={{ borderColor: "#e1dfdd" }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zuraio-textMuted mb-1.5">
                  {t("accountOwner")}
                </label>
                <select
                  name="accountOwnerId"
                  defaultValue={order.accountOwnerId ?? ""}
                  className="w-full px-3 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DCE6B5]"
                  style={{ borderColor: "#e1dfdd" }}
                >
                  <option value="">–</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name || u.email}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zuraio-textMuted mb-1.5">
                  {t("projectLead")}
                </label>
                <select
                  name="projectLeadId"
                  defaultValue={order.projectLeadId ?? ""}
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
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md text-black font-medium"
                  style={{ backgroundColor: "#9FAF52" }}
                >
                  {tActions("save")}
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 border rounded-md"
                  style={{ borderColor: "#e1dfdd" }}
                >
                  {tActions("cancel")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
