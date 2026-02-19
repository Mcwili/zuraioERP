"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { Calendar } from "lucide-react";
import { createOrderTask, updateOrderTask } from "@/server/actions/order-tasks";
import { uploadOrderTaskDocument } from "@/server/actions/documents";
import { useRouter } from "next/navigation";
import { parseDateCH, formatDateCHDot } from "@/lib/date-format";
import { CalendarPopover } from "@/components/ui/calendar-popover";

interface OrderTaskForEdit {
  id: string;
  type: string;
  title: string;
  dueDate: Date | string | null;
  completedAt: Date | string | null;
  notes: string | null;
}

interface AddTaskModalProps {
  orderId: string;
  organizationId: string;
  task?: OrderTaskForEdit | null;
  onClose: () => void;
}

const MONTHS = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
const WEEKDAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

export function AddTaskModal({ orderId, organizationId, task, onClose }: AddTaskModalProps) {
  const t = useTranslations("orders");
  const tActions = useTranslations("actions");
  const router = useRouter();
  const isEdit = !!task;
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [dueDateStr, setDueDateStr] = useState(
    task?.dueDate
      ? formatDateCHDot(typeof task.dueDate === "string" ? new Date(task.dueDate) : task.dueDate)
      : ""
  );
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarPos, setCalendarPos] = useState({ top: 0, left: 0 });
  const [viewMonth, setViewMonth] = useState(new Date());
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

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
      if (!inputRef.current?.closest(".task-date-wrapper")?.contains(target) && !popoverRef.current?.contains(target)) {
        setCalendarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [calendarOpen]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setPending(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const title = (formData.get("title") as string)?.trim();
    const type = (formData.get("type") as string) || "TODO";
    const dueDateStr = (formData.get("dueDate") as string)?.trim() || "";
    const notes = (formData.get("notes") as string)?.trim() || null;

    if (!title) {
      setError("Titel ist erforderlich.");
      setPending(false);
      return;
    }

    const dueDate = dueDateStr ? parseDateCH(dueDateStr) : null;
    const files = formData.getAll("files") as File[];

    try {
      if (isEdit && task) {
        await updateOrderTask(task.id, orderId, {
          title,
          type: type as "TODO" | "REMARK",
          dueDate,
          notes,
        });
        for (const file of files) {
          if (file.size > 0) {
            const fd = new FormData();
            fd.set("file", file);
            await uploadOrderTaskDocument(fd, orderId, task.id, organizationId);
          }
        }
      } else {
        const created = await createOrderTask(orderId, {
          title,
          type: type as "TODO" | "REMARK",
          dueDate,
          notes,
        });

        for (const file of files) {
          if (file.size > 0) {
            const fd = new FormData();
            fd.set("file", file);
            await uploadOrderTaskDocument(fd, orderId, created.id, organizationId);
          }
        }
      }
      onClose();
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Fehler beim Speichern");
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
        className="w-full max-w-md rounded-lg shadow-xl overflow-hidden bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b" style={{ borderColor: "#e1dfdd" }}>
          <h3 className="text-lg font-semibold" style={{ color: "#1c1c1c" }}>
            {isEdit ? t("editTaskTitle") : t("addTaskTitle")}
          </h3>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-zuraio-textMuted mb-1">
              {t("taskTitle")} *
            </label>
            <input
              name="title"
              type="text"
              required
              defaultValue={task?.title}
              placeholder={t("taskTitle")}
              className="w-full px-3 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DCE6B5]"
              style={{ borderColor: "#e1dfdd" }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zuraio-textMuted mb-1">
              {t("taskType")}
            </label>
            <select
              name="type"
              defaultValue={task?.type ?? "TODO"}
              className="w-full px-3 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DCE6B5]"
              style={{ borderColor: "#e1dfdd" }}
            >
              <option value="TODO">{t("taskTypeTodo")}</option>
              <option value="REMARK">{t("taskTypeRemark")}</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-zuraio-textMuted mb-1">
              {t("columnDueDate")}
            </label>
            <div className="relative task-date-wrapper">
              <input
                ref={inputRef}
                name="dueDate"
                type="text"
                placeholder="dd.mm.yyyy"
                value={dueDateStr}
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
          <div>
            <label className="block text-sm font-medium text-zuraio-textMuted mb-1">
              {t("remarks")}
            </label>
            <textarea
              name="notes"
              rows={3}
              defaultValue={task?.notes ?? ""}
              placeholder={t("remarks")}
              className="w-full px-3 py-2 text-base border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-[#DCE6B5]"
              style={{ borderColor: "#e1dfdd" }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zuraio-textMuted mb-1">
              {t("taskAttachments")}
            </label>
            <input
              name="files"
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              className="w-full text-base py-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-[#DCE6B5] file:text-black hover:file:opacity-90"
            />
            <p className="text-xs text-zuraio-textMuted mt-1">
              {t("taskAttachmentsHint")}
            </p>
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
