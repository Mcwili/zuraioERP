"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { Calendar } from "lucide-react";
import { createPlannedExpense, updatePlannedExpense } from "@/server/actions/expenses";
import { formatDateCHDot, parseDateCH } from "@/lib/date-format";
import { CalendarPopover } from "@/components/ui/calendar-popover";
import { EXPENSE_COST_TYPES, costTypeToI18nKey } from "@/lib/expense-cost-types";

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
  estimatedAmount: number;
  currency: string;
  plannedDate: string | null;
  costType: string;
  status: string;
  organizationId: string | null;
  orderId: string | null;
}

interface PlannedExpenseFormProps {
  organizations: Organization[];
  orders: Order[];
  expense?: PlannedExpense;
  onClose: () => void;
  onSuccess: () => void;
}

const MONTHS = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember",
];
const WEEKDAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

export function PlannedExpenseForm({
  organizations,
  orders,
  expense,
  onClose,
  onSuccess,
}: PlannedExpenseFormProps) {
  const t = useTranslations("expenses");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [description, setDescription] = useState(expense?.description ?? "");
  const [estimatedAmount, setEstimatedAmount] = useState(
    expense?.estimatedAmount ? String(expense.estimatedAmount) : ""
  );
  const [currency, setCurrency] = useState(expense?.currency ?? "CHF");
  const [plannedDateStr, setPlannedDateStr] = useState(
    expense?.plannedDate ? formatDateCHDot(new Date(expense.plannedDate)) : ""
  );
  const [costType, setCostType] = useState(expense?.costType ?? "SONSTIGES");
  const [organizationId, setOrganizationId] = useState(expense?.organizationId ?? "");
  const [orderId, setOrderId] = useState(expense?.orderId ?? "");
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarPos, setCalendarPos] = useState({ top: 0, left: 0 });
  const [viewMonth, setViewMonth] = useState(
    expense?.plannedDate ? new Date(expense.plannedDate) : new Date()
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

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
        !inputRef.current?.closest(".planned-date-wrapper")?.contains(target) &&
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
      const amount = parseFloat(estimatedAmount.replace(",", "."));
      if (isNaN(amount) || amount <= 0) {
        setError("Ungültiger Betrag");
        setPending(false);
        return;
      }
      const plannedDate = parseDateCH(plannedDateStr);

      if (expense) {
        await updatePlannedExpense(expense.id, {
          description,
          estimatedAmount: amount,
          currency,
          plannedDate,
          costType: costType as import("@prisma/client").ExpenseCostType,
          organizationId: organizationId || undefined,
          orderId: orderId || null,
        });
      } else {
        await createPlannedExpense({
          organizationId: organizationId || undefined,
          orderId: orderId || undefined,
          description,
          estimatedAmount: amount,
          currency,
          plannedDate: plannedDate ?? undefined,
          costType: costType as import("@prisma/client").ExpenseCostType,
        });
      }
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Fehler");
    } finally {
      setPending(false);
    }
  }

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-4">
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
            {t("estimatedAmount")} *
          </label>
          <input
            type="text"
            value={estimatedAmount}
            onChange={(e) => setEstimatedAmount(e.target.value)}
            required
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
          {t("plannedDate")}
        </label>
        <div className="relative planned-date-wrapper">
          <input
            ref={inputRef}
            type="text"
            placeholder="dd.mm.yyyy"
            value={plannedDateStr}
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
                selectedDate={parseDateCH(plannedDateStr)}
                onSelect={(d) => {
                  setPlannedDateStr(formatDateCHDot(d));
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
          {t("costType")} *
        </label>
        <select
          value={costType}
          onChange={(e) => setCostType(e.target.value)}
          required
          className="w-full px-3 py-2 text-sm border rounded"
          style={{ borderColor: "#e1dfdd" }}
        >
          {EXPENSE_COST_TYPES.map((v) => (
            <option key={v} value={v}>
              {t(costTypeToI18nKey[v])}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="px-4 py-2 text-sm rounded transition-colors bg-[#DCE6B5] hover:opacity-90 disabled:opacity-50"
        >
          {expense ? t("save") : t("addPlannedExpense")}
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
  );

  if (expense) {
    return <div className="p-4">{formContent}</div>;
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
          <h3 className="text-lg font-semibold text-zuraio-text">{t("addPlannedExpense")}</h3>
        </div>
        <div className="p-6">{formContent}</div>
      </div>
    </div>
  );
}
