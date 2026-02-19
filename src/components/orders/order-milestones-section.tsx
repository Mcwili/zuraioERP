"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { Plus, Pencil, Trash2, Calendar } from "lucide-react";
import {
  createMilestoneAction,
  updateMilestoneAction,
  deleteMilestone,
} from "@/server/actions/milestones";
import { formatDateCHDot, parseDateCH } from "@/lib/date-format";
import { CalendarPopover } from "@/components/ui/calendar-popover";

interface Milestone {
  id: string;
  name: string;
  description: string | null;
  dueDate: Date | string | null;
  percentage?: number;
}

interface OrderMilestonesSectionProps {
  milestones: Milestone[];
  orderId: string;
}

export function OrderMilestonesSection({ milestones, orderId }: OrderMilestonesSectionProps) {
  const t = useTranslations("orders");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const formatDate = (d: Date | string | null) =>
    d ? (typeof d === "string" ? formatDateCHDot(new Date(d)) : formatDateCHDot(d)) : "–";

  return (
    <div
      className="rounded-lg border overflow-hidden bg-white"
      style={{ borderColor: "#e1dfdd" }}
    >
      <div className="flex justify-between items-center p-3 border-b" style={{ borderColor: "#e1dfdd" }}>
        <h3 className="font-semibold text-zuraio-text">{t("milestones")}</h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              setShowForm(true);
              setEditingId(null);
            }}
            className="flex items-center gap-1.5 px-2 py-1.5 text-sm rounded transition-colors hover:bg-[#DCE6B5]"
            style={{ color: "#9FAF52" }}
          >
            <Plus className="h-4 w-4" />
            {t("addMilestone")}
          </button>
        </div>
      </div>

      {showForm && !editingId && (
        <div className="p-4 border-b" style={{ borderColor: "#e1dfdd" }}>
          <MilestoneForm
            orderId={orderId}
            onSuccess={() => setShowForm(false)}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {milestones.length === 0 && !showForm ? (
        <div className="p-6 text-center text-zuraio-textMuted text-sm">
          {t("noMilestones")}
        </div>
      ) : (
        <table className="w-full text-sm">
          <thead style={{ backgroundColor: "#f8f8f7", borderBottom: "1px solid #e1dfdd" }}>
            <tr>
              <th className="text-left px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                {t("milestoneTitle")}
              </th>
              <th className="text-left px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                {t("milestoneDescription")}
              </th>
              <th className="text-left px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                {t("milestoneDueDate")}
              </th>
              <th className="w-10 px-3 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {milestones.map((m) => (
              <tr
                key={m.id}
                className="border-t transition-colors hover:bg-[#DCE6B5]"
                style={{ borderColor: "#e1dfdd" }}
              >
                {editingId === m.id ? (
                  <td colSpan={4} className="p-4" style={{ borderColor: "#e1dfdd" }}>
                    <MilestoneForm
                      orderId={orderId}
                      milestone={m}
                      onSuccess={() => setEditingId(null)}
                      onCancel={() => setEditingId(null)}
                    />
                  </td>
                ) : (
                  <>
                    <td className="px-3 py-2 font-medium text-zuraio-text">{m.name}</td>
                    <td className="px-3 py-2 text-zuraio-textMuted">{m.description || "–"}</td>
                    <td className="px-3 py-2 text-zuraio-textMuted">{formatDate(m.dueDate)}</td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setEditingId(m.id)}
                          className="p-2 rounded-md transition-colors hover:bg-[#DCE6B5]"
                          title={t("editMilestone")}
                        >
                          <Pencil className="h-4 w-4" style={{ color: "#9FAF52" }} />
                        </button>
                        <DeleteMilestoneButton
                          milestoneName={m.name}
                          onDelete={async () => {
                            await deleteMilestone(m.id, orderId);
                            if (editingId === m.id) setEditingId(null);
                          }}
                        />
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function MilestoneForm({
  orderId,
  milestone,
  onSuccess,
  onCancel,
}: {
  orderId: string;
  milestone?: Milestone;
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const t = useTranslations("orders");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAction = async (formData: FormData) => {
    setPending(true);
    setError(null);
    const result = milestone
      ? await updateMilestoneAction(formData)
      : await createMilestoneAction(formData);
    if (result.error) {
      setError(result.error);
      setPending(false);
      return;
    }
    onSuccess();
  };

  const [dueDateStr, setDueDateStr] = useState(
    milestone?.dueDate
      ? formatDateCHDot(
          typeof milestone.dueDate === "string"
            ? new Date(milestone.dueDate)
            : milestone.dueDate
        )
      : ""
  );
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarPos, setCalendarPos] = useState({ top: 0, left: 0 });
  const [viewMonth, setViewMonth] = useState(
    milestone?.dueDate
      ? new Date(
          typeof milestone.dueDate === "string"
            ? milestone.dueDate
            : milestone.dueDate
        )
      : new Date()
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  const MONTHS = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
  const WEEKDAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

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
      if (!inputRef.current?.closest(".milestone-date-wrapper")?.contains(target) && !popoverRef.current?.contains(target)) {
        setCalendarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [calendarOpen]);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await handleAction(new FormData(e.currentTarget));
      }}
      className="space-y-3"
    >
      <input type="hidden" name="orderId" value={orderId} />
      {milestone && (
        <input type="hidden" name="milestoneId" value={milestone.id} />
      )}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      <div>
        <label className="block text-sm font-medium text-zuraio-textMuted mb-1">
          {t("milestoneTitle")}
        </label>
        <input
          name="name"
          required
          defaultValue={milestone?.name}
          className="w-full px-3 py-2 text-sm border rounded"
          style={{ borderColor: "#e1dfdd" }}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zuraio-textMuted mb-1">
          {t("milestoneDescription")}
        </label>
        <textarea
          name="description"
          rows={2}
          defaultValue={milestone?.description ?? ""}
          className="w-full px-3 py-2 text-sm border rounded resize-none"
          style={{ borderColor: "#e1dfdd" }}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zuraio-textMuted mb-1">
          {t("milestoneDueDate")}
        </label>
        <div className="relative milestone-date-wrapper">
          <input
            ref={inputRef}
            name="dueDate"
            type="text"
            placeholder="dd.mm.yyyy"
            value={dueDateStr}
            readOnly
            onClick={() => setCalendarOpen((o) => !o)}
            className="w-full px-3 py-2 pr-10 text-sm border rounded"
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
                selectedDate={parseDateCH(dueDateStr)}
                onSelect={(d) => {
                  setDueDateStr(formatDateCHDot(d));
                  setCalendarOpen(false);
                }}
                months={MONTHS}
                weekdays={WEEKDAYS}
              />,
              document.body
            )}
        </div>
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={pending}
          className="px-3 py-1.5 text-sm rounded transition-colors bg-[#DCE6B5] hover:opacity-90 disabled:opacity-50"
        >
          {milestone ? t("saveMilestone") : t("addMilestone")}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1.5 text-sm rounded border bg-white hover:bg-[#f8f8f7]"
          style={{ borderColor: "#e1dfdd" }}
        >
          {t("cancel")}
        </button>
      </div>
    </form>
  );
}

function DeleteMilestoneButton({
  milestoneName,
  onDelete,
}: {
  milestoneName: string;
  onDelete: () => Promise<void>;
}) {
  const t = useTranslations("orders");
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-zuraio-textMuted">
          {t("deleteMilestoneConfirm")}
        </span>
        <button
          type="button"
          onClick={async () => {
            await onDelete();
            setConfirming(false);
          }}
          className="flex items-center gap-1 px-2 py-1 text-xs rounded bg-red-100 text-red-700 hover:bg-red-200"
        >
          {t("deleteMilestone")}
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          className="text-xs text-zuraio-textMuted hover:text-zuraio-text"
        >
          {t("cancel")}
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      className="p-1.5 rounded hover:bg-red-50"
      style={{ color: "#605e5c" }}
      title={t("deleteMilestone")}
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
