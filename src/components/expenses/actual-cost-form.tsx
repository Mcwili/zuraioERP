"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { Calendar } from "lucide-react";
import { createExpenseActualCost } from "@/server/actions/expenses";
import { uploadExpenseReceipt } from "@/server/actions/documents";
import { formatDateCHDot, parseDateCH } from "@/lib/date-format";
import { CalendarPopover } from "@/components/ui/calendar-popover";

interface Organization {
  id: string;
  name: string;
}

interface Order {
  id: string;
  orderNumber: string | null;
  projectName: string | null;
}

interface PlannedExpense {
  id: string;
  description: string;
  organizationId: string | null;
  orderId: string | null;
}

interface ActualCostFormProps {
  organizations: Organization[];
  orders: Order[];
  plannedExpenses: PlannedExpense[];
  onClose: () => void;
  onSuccess: () => void;
}

const MONTHS = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember",
];
const WEEKDAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

function getAssignedMonth(d: Date): string {
  const y = d.getFullYear();
  const m = (d.getMonth() + 1).toString().padStart(2, "0");
  return `${y}-${m}`;
}

export function ActualCostForm({
  organizations,
  orders,
  plannedExpenses,
  onClose,
  onSuccess,
}: ActualCostFormProps) {
  const t = useTranslations("expenses");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [vatAmount, setVatAmount] = useState("");
  const [currency, setCurrency] = useState("CHF");
  const [paidAtStr, setPaidAtStr] = useState(formatDateCHDot(new Date()));
  const [supplier, setSupplier] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [orderId, setOrderId] = useState("");
  const [plannedExpenseId, setPlannedExpenseId] = useState("");
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarPos, setCalendarPos] = useState({ top: 0, left: 0 });
  const [viewMonth, setViewMonth] = useState(new Date());
  const inputRef = useRef<HTMLInputElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (plannedExpenseId) {
      const pe = plannedExpenses.find((p) => p.id === plannedExpenseId);
      if (pe) {
        setDescription(pe.description);
        setOrganizationId(pe.organizationId ?? "");
        setOrderId(pe.orderId ?? "");
      }
    }
  }, [plannedExpenseId, plannedExpenses]);

  useEffect(() => {
    if (!calendarOpen || !inputRef.current) return;
    const rect = inputRef.current.getBoundingClientRect();
    setCalendarPos({ top: rect.bottom + 4, left: rect.left });
  }, [calendarOpen]);

  useEffect(() => {
    if (!calendarOpen) return;
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        !inputRef.current?.closest(".actual-paid-wrapper")?.contains(target) &&
        !popoverRef.current?.contains(target)
      ) {
        setCalendarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [calendarOpen]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const amountNum = parseFloat(amount.replace(",", "."));
      if (isNaN(amountNum) || amountNum <= 0) {
        setError("Ungültiger Betrag");
        setPending(false);
        return;
      }
      const vatNum = parseFloat((vatAmount || "0").replace(",", "."));
      if (isNaN(vatNum) || vatNum < 0) {
        setError("Ungültige MWST");
        setPending(false);
        return;
      }
      const paidAt = parseDateCH(paidAtStr);
      if (!paidAt) {
        setError("Ungültiges Datum");
        setPending(false);
        return;
      }

      const cost = await createExpenseActualCost({
        organizationId: organizationId || undefined,
        orderId: orderId || undefined,
        plannedExpenseId: plannedExpenseId || undefined,
        description: description || undefined,
        amount: amountNum,
        vatAmount: vatNum,
        currency,
        paidAt,
        supplier: supplier || undefined,
        assignedMonth: getAssignedMonth(paidAt),
      });

      const fileInput = fileInputRef.current;
      if (fileInput?.files?.length) {
        const formData = new FormData();
        formData.append("file", fileInput.files[0]);
        await uploadExpenseReceipt(formData, cost.id);
      }
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Fehler");
    } finally {
      setPending(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
    >
      <div
        className="w-full max-w-lg rounded-lg shadow-xl overflow-hidden bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b" style={{ borderColor: "#e1dfdd" }}>
          <h3 className="text-lg font-semibold text-zuraio-text">{t("addActualCost")}</h3>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div>
            <label className="block text-sm font-medium text-zuraio-textMuted mb-1">
              {t("customer")}
            </label>
            <select
              value={organizationId}
              onChange={(e) => setOrganizationId(e.target.value)}
              className="w-full px-3 py-2 text-sm border rounded"
              style={{ borderColor: "#e1dfdd" }}
            >
              <option value="">{t("noCustomerRelatedCosts")}</option>
              {organizations.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-zuraio-textMuted mb-1">
              {t("order")}
            </label>
            <select
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="w-full px-3 py-2 text-sm border rounded"
              style={{ borderColor: "#e1dfdd" }}
            >
              <option value="">{t("noOrder")}</option>
              {orders.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.orderNumber || o.projectName || o.id}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-zuraio-textMuted mb-1">
              Geplante Ausgabe (optional)
            </label>
            <select
              value={plannedExpenseId}
              onChange={(e) => setPlannedExpenseId(e.target.value)}
              className="w-full px-3 py-2 text-sm border rounded"
              style={{ borderColor: "#e1dfdd" }}
            >
              <option value="">–</option>
              {plannedExpenses.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.description}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-zuraio-textMuted mb-1">
              {t("description")} *
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-3 py-2 text-sm border rounded"
              style={{ borderColor: "#e1dfdd" }}
            />
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-sm font-medium text-zuraio-textMuted mb-1">
                {t("amountInclVat")} *
              </label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                placeholder="0.00"
                className="w-full px-3 py-2 text-sm border rounded"
                style={{ borderColor: "#e1dfdd" }}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-zuraio-textMuted mb-1">
                {t("vatAmount")}
              </label>
              <input
                type="text"
                value={vatAmount}
                onChange={(e) => setVatAmount(e.target.value)}
                placeholder="0.00"
                className="w-full px-3 py-2 text-sm border rounded"
                style={{ borderColor: "#e1dfdd" }}
              />
            </div>
            <div className="w-24">
              <label className="block text-sm font-medium text-zuraio-textMuted mb-1">
                {t("currency")}
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded"
                style={{ borderColor: "#e1dfdd" }}
              >
                <option value="CHF">CHF</option>
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-zuraio-textMuted mb-1">
              {t("paidAt")} *
            </label>
            <div className="relative actual-paid-wrapper">
              <input
                ref={inputRef}
                type="text"
                placeholder="dd.mm.yyyy"
                value={paidAtStr}
                readOnly
                onClick={() => setCalendarOpen((o) => !o)}
                className="w-full px-3 py-2 pr-10 text-sm border rounded"
                style={{ borderColor: "#e1dfdd" }}
              />
              <button
                type="button"
                onClick={() => setCalendarOpen((o) => !o)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-black/5"
                aria-label="Kalender öffnen"
              >
                <Calendar className="h-5 w-5 text-zuraio-textMuted" />
              </button>
              {mounted &&
                calendarOpen &&
                createPortal(
                  <CalendarPopover
                    ref={popoverRef}
                    style={{ top: calendarPos.top, left: calendarPos.left }}
                    viewMonth={viewMonth}
                    onViewMonthChange={setViewMonth}
                    selectedDate={parseDateCH(paidAtStr)}
                    onSelect={(d) => {
                      setPaidAtStr(formatDateCHDot(d));
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
            <label className="block text-sm font-medium text-zuraio-textMuted mb-1">
              {t("supplier")}
            </label>
            <input
              type="text"
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              className="w-full px-3 py-2 text-sm border rounded"
              style={{ borderColor: "#e1dfdd" }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zuraio-textMuted mb-1">
              {t("addDocument")} (optional)
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.csv,.jpg,.jpeg,.png,.gif,.webp"
              className="w-full text-sm py-2"
            />
            <p className="text-xs text-zuraio-textMuted mt-1">{t("fileHint")}</p>
          </div>
          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              disabled={pending}
              className="px-4 py-2 text-sm rounded transition-colors bg-[#DCE6B5] hover:opacity-90 disabled:opacity-50"
            >
              {t("addActualCost")}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded border bg-white hover:bg-[#f8f8f7]"
              style={{ borderColor: "#e1dfdd" }}
            >
              {t("cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
