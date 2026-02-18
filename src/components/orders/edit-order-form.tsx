"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { updateOrderFromForm, deleteOrder } from "@/server/actions/orders";
import { useRouter } from "next/navigation";
import { Pencil, Calendar, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { formatDateCH, parseDateCH } from "@/lib/date-format";
import { CalendarPopover } from "@/components/ui/calendar-popover";
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
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [endDateStr, setEndDateStr] = useState("");
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarPos, setCalendarPos] = useState({ top: 0, left: 0 });
  const [viewMonth, setViewMonth] = useState(new Date());
  const inputRef = useRef<HTMLInputElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  const MONTHS = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
  const WEEKDAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (open) {
      setEndDateStr(order.endDate ? formatDateCH(new Date(order.endDate)) : "");
      setCalendarOpen(false);
      setViewMonth(order.endDate ? new Date(order.endDate) : new Date());
    }
  }, [open, order.endDate]);

  useEffect(() => {
    if (!calendarOpen || !inputRef.current) return;
    const rect = inputRef.current.getBoundingClientRect();
    setCalendarPos({ top: rect.bottom + 4, left: rect.left });
  }, [calendarOpen]);

  useEffect(() => {
    if (!calendarOpen) return;
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (!inputRef.current?.closest(".end-date-wrapper")?.contains(target) && !popoverRef.current?.contains(target)) {
        setCalendarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [calendarOpen]);

  async function handleSubmit(formData: FormData) {
    await updateOrderFromForm(order.id, formData);
    setOpen(false);
    router.refresh();
  }

  async function handleDelete() {
    setDeleteError("");
    try {
      await deleteOrder(order.id);
      setOpen(false);
      setDeleteOpen(false);
      router.push("/dashboard/orders");
      router.refresh();
    } catch (e) {
      setDeleteError(e instanceof Error ? e.message : "Fehler");
    }
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
                <div
                  className="w-full px-3 py-2 text-base border rounded-md bg-[#f8f8f7]"
                  style={{ borderColor: "#e1dfdd", color: "#605e5c" }}
                >
                  {order.orderNumber || "–"}
                </div>
                <p className="text-xs text-zuraio-textMuted mt-1">
                  {t("orderNumberAutoHint")}
                </p>
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
                <div className="relative end-date-wrapper">
                  <input
                    ref={inputRef}
                    name="endDate"
                    type="text"
                    placeholder="DD/MM/YYYY"
                    value={endDateStr}
                    readOnly
                    onClick={() => setCalendarOpen((o) => !o)}
                    className="w-full px-3 py-2 pr-10 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DCE6B5]"
                    style={{ borderColor: "#e1dfdd" }}
                  />
                  <button
                    type="button"
                    onClick={() => setCalendarOpen((o) => !o)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-black/5 text-zuraio-textMuted hover:text-zuraio-text"
                    aria-label="Kalender öffnen"
                  >
                    <Calendar className="h-5 w-5" />
                  </button>
                  {mounted && calendarOpen &&
                    createPortal(
                      <CalendarPopover
                        ref={popoverRef}
                        style={{ top: calendarPos.top, left: calendarPos.left }}
                        viewMonth={viewMonth}
                        onViewMonthChange={setViewMonth}
                        selectedDate={parseDateCH(endDateStr)}
                        onSelect={(d) => {
                          setEndDateStr(formatDateCH(d));
                          setCalendarOpen(false);
                        }}
                        months={MONTHS}
                        weekdays={WEEKDAYS}
                      />,
                      document.body
                    )}
                </div>
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
                <button
                  type="button"
                  onClick={() => setDeleteOpen(true)}
                  className="p-2 rounded-md transition-colors hover:bg-red-50 ml-auto"
                  title={t("deleteOrder")}
                >
                  <Trash2 className="h-5 w-5" style={{ color: "#d13438" }} />
                </button>
              </div>
            </form>
            {deleteOpen && (
              <div
                className="fixed inset-0 z-[60] flex items-center justify-center p-4"
                style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
                onClick={() => setDeleteOpen(false)}
              >
                <div
                  className="w-full max-w-md rounded-lg shadow-xl overflow-hidden"
                  style={{ backgroundColor: "#ffffff" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-6 border-b" style={{ borderColor: "#e1dfdd" }}>
                    <h3 className="text-lg font-semibold" style={{ color: "#1c1c1c" }}>
                      {t("deleteOrder")}
                    </h3>
                  </div>
                  <div className="p-6 space-y-4">
                    <p className="text-sm text-zuraio-textMuted">
                      {t("deleteOrderConfirm", {
                        orderNumber: order.orderNumber || order.projectName || order.id,
                      })}
                    </p>
                    {deleteError && (
                      <div
                        className="p-3 rounded-lg text-sm"
                        style={{
                          backgroundColor: "rgba(209, 52, 56, 0.05)",
                          borderColor: "rgba(209, 52, 56, 0.2)",
                          border: "1px solid",
                          color: "#d13438",
                        }}
                      >
                        {deleteError}
                      </div>
                    )}
                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={handleDelete}
                        className="px-4 py-2 rounded-md text-white font-medium"
                        style={{ backgroundColor: "#d13438" }}
                      >
                        {tActions("delete")}
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteOpen(false)}
                        className="px-4 py-2 border rounded-md"
                        style={{ borderColor: "#e1dfdd" }}
                      >
                        {tActions("cancel")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
