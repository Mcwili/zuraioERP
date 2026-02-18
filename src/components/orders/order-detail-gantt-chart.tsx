"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";

function EventTooltip({
  content,
  children,
  leftPx,
  align = "center",
  width,
}: {
  content: React.ReactNode;
  children: React.ReactElement;
  leftPx: number;
  align?: "left" | "center";
  width?: number;
}) {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    setPos({
      top: rect.top - 4,
      left: centerX,
    });
  }, [visible]);

  return (
    <>
      <div
        ref={ref}
        className="absolute cursor-default flex items-center justify-center"
        style={{
          left: leftPx + 4,
          top: "50%",
          transform: align === "center" ? "translate(-50%, -50%)" : "translateY(-50%)",
          minWidth: width ?? 20,
          minHeight: 20,
          width: width,
        }}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        {children}
      </div>
      {visible &&
        createPortal(
          <div
            className="fixed z-[100] px-3 py-2 text-sm rounded-lg shadow-lg border pointer-events-none max-w-xs flex flex-col gap-0.5"
            style={{
              backgroundColor: "#1c1c1c",
              color: "#fff",
              borderColor: "#e1dfdd",
              transform: "translate(-50%, -100%)",
              top: pos.top,
              left: pos.left,
              whiteSpace: "normal",
            }}
          >
            {content}
          </div>,
          document.body
        )}
    </>
  );
}

interface Milestone {
  id: string;
  name: string;
  dueDate: Date | string | null;
  completedAt: Date | string | null;
}

interface BillingPlanItem {
  id: string;
  dueDate: Date | string;
  paidAt?: Date | string | null;
  amount?: number;
  description?: string | null;
}

interface Task {
  id: string;
  title: string;
  type: string;
  dueDate: Date | string | null;
  completedAt: Date | string | null;
}

interface OrderDetailGanttChartProps {
  projectName: string | null;
  orderNumber: string | null;
  startDate: Date | string;
  endDate: Date | string | null;
  milestones: Milestone[];
  tasks: Task[];
  billingPlanItems: BillingPlanItem[];
}

const MONTHS_PAST = 2;
const MONTHS_FUTURE = 18;
const MONTHS_TOTAL = MONTHS_PAST + 1 + MONTHS_FUTURE;
const MONTH_WIDTH = 72;
const LABEL_WIDTH = 200;
const ROW_HEIGHT = 36;

function getMonthsForTimeline(): string[] {
  const months: string[] = [];
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth() - MONTHS_PAST, 1);
  for (let i = 0; i < MONTHS_TOTAL; i++) {
    const d = new Date(start.getFullYear(), start.getMonth() + i, 1);
    months.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
  }
  return months;
}

function formatMonthLabel(key: string): string {
  const [y, m] = key.split("-");
  const monthNames = [
    "Jan", "Feb", "Mär", "Apr", "Mai", "Jun",
    "Jul", "Aug", "Sep", "Okt", "Nov", "Dez",
  ];
  return `${monthNames[parseInt(m, 10) - 1]} ${y}`;
}

function GanttRow({
  label,
  timelineWidth,
  children,
}: {
  label: string;
  timelineWidth: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex items-center border-t"
      style={{ borderColor: "#e1dfdd", minHeight: ROW_HEIGHT }}
    >
      <div
        style={{ width: LABEL_WIDTH }}
        className="shrink-0 px-3 py-2 text-sm font-medium text-zuraio-textMuted"
      >
        {label}
      </div>
      <div
        className="relative shrink-0 pl-2"
        style={{ width: timelineWidth, height: ROW_HEIGHT }}
      >
        {children}
      </div>
    </div>
  );
}

const taskTypeKeys: Record<string, string> = {
  TODO: "taskTypeTodo",
  REMARK: "taskTypeRemark",
  MILESTONE: "taskTypeMilestone",
  RENEWAL: "taskTypeRenewal",
};

export function OrderDetailGanttChart({
  projectName,
  orderNumber,
  startDate,
  endDate,
  milestones,
  tasks,
  billingPlanItems,
}: OrderDetailGanttChartProps) {
  const t = useTranslations("orders");
  const today = new Date();
  const minDate = new Date(today.getFullYear(), today.getMonth() - MONTHS_PAST, 1);
  const maxDate = new Date(today.getFullYear(), today.getMonth() + MONTHS_FUTURE + 1, 0);
  const rangeMs = maxDate.getTime() - minDate.getTime();
  const months = getMonthsForTimeline();
  const timelineWidth = months.length * MONTH_WIDTH;

  const dateToPx = (d: Date): number => {
    const pct = (d.getTime() - minDate.getTime()) / rangeMs;
    return Math.max(0, Math.min(timelineWidth, pct * timelineWidth));
  };

  const start = new Date(startDate);
  const end = endDate
    ? new Date(endDate)
    : new Date(start.getFullYear() + 1, start.getMonth(), start.getDate());
  const leftPx = dateToPx(start);
  const rightPx = dateToPx(end);
  const widthPx = Math.max(rightPx - leftPx - 4, 8);

  const milestonesWithDate = milestones.filter((m) => m.dueDate);
  const tasksWithDate = tasks.filter((t) => t.dueDate);
  const payments = billingPlanItems.filter((i) => i.dueDate);
  const receipts = billingPlanItems.filter((i) => i.paidAt);

  return (
    <div
      className="bg-white overflow-x-auto overflow-y-hidden border rounded-lg"
      style={{ borderColor: "#e1dfdd" }}
    >
      <div className="min-w-max">
        <div
          className="flex text-xs font-medium text-zuraio-textMuted uppercase tracking-wider px-3 py-2"
          style={{ borderBottom: "1px solid #e1dfdd", backgroundColor: "#f8f8f7" }}
        >
          <div style={{ width: LABEL_WIDTH }} className="shrink-0">
            {projectName || orderNumber || "–"}
          </div>
          <div
            className="flex shrink-0 pl-2"
            style={{ width: timelineWidth }}
          >
            {months.map((m) => (
              <div
                key={m}
                className="shrink-0 border-r px-1"
                style={{
                  borderColor: "#e1dfdd",
                  width: MONTH_WIDTH,
                }}
              >
                {formatMonthLabel(m)}
              </div>
            ))}
          </div>
        </div>

        <GanttRow label={t("projectDuration")} timelineWidth={timelineWidth}>
          <EventTooltip
            leftPx={leftPx}
            align="left"
            width={widthPx}
            content={
              <>
                <div className="font-medium">{t("projectDuration")}</div>
                <div className="text-white/90">
                  {start.toLocaleDateString("de-CH")} – {end.toLocaleDateString("de-CH")}
                  {!endDate && " (offen)"}
                </div>
              </>
            }
          >
            <div
              className="rounded h-4 transition-colors hover:opacity-90 pointer-events-none"
              style={{
                width: widthPx,
                backgroundColor: "#DCE6B5",
              }}
            />
          </EventTooltip>
        </GanttRow>

        <GanttRow label={t("milestones")} timelineWidth={timelineWidth}>
          {milestonesWithDate.map((m) => {
            const due = new Date(m.dueDate as string | Date);
            const px = dateToPx(due);
            const isCompleted = !!m.completedAt;
            return (
              <EventTooltip
                key={m.id}
                leftPx={px}
                content={
                  <>
                    <div className="font-medium">{m.name}</div>
                    <div className="text-white/90">
                      {t("columnDueDate")}: {due.toLocaleDateString("de-CH")}
                    </div>
                    {isCompleted && (
                      <div className="text-white/90">{t("statusCompleted")}</div>
                    )}
                  </>
                }
              >
                <div
                  className="w-2.5 h-2.5 rotate-45 shrink-0 pointer-events-none"
                  style={{
                    backgroundColor: isCompleted ? "#9FAF52" : "#605e5c",
                  }}
                />
              </EventTooltip>
            );
          })}
        </GanttRow>

        <GanttRow label={t("tasks")} timelineWidth={timelineWidth}>
          {tasksWithDate.map((task) => {
            const due = new Date(task.dueDate as string | Date);
            const px = dateToPx(due);
            const isCompleted = !!task.completedAt;
            const typeLabel = t(taskTypeKeys[task.type] || "taskTypeTodo");
            return (
              <EventTooltip
                key={task.id}
                leftPx={px}
                content={
                  <>
                    <div className="font-medium">{task.title}</div>
                    <div className="text-white/90">{typeLabel}</div>
                    <div className="text-white/90">
                      {t("columnDueDate")}: {due.toLocaleDateString("de-CH")}
                    </div>
                    {isCompleted && (
                      <div className="text-white/90">{t("statusCompleted")}</div>
                    )}
                  </>
                }
              >
                <div
                  className="w-2.5 h-2.5 rounded shrink-0 pointer-events-none"
                  style={{
                    backgroundColor: isCompleted ? "#9FAF52" : "#605e5c",
                  }}
                />
              </EventTooltip>
            );
          })}
        </GanttRow>

        <GanttRow label={t("paymentsRow")} timelineWidth={timelineWidth}>
          {payments.map((p) => {
            const due = new Date(p.dueDate);
            const px = dateToPx(due);
            const amountStr =
              p.amount != null ? ` ${Number(p.amount).toLocaleString("de-CH")} CHF` : "";
            return (
              <EventTooltip
                key={p.id}
                leftPx={px}
                content={
                  <>
                    <div className="font-medium">{t("paymentsRow")}</div>
                    <div className="text-white/90">
                      {t("columnDueDate")}: {due.toLocaleDateString("de-CH")}
                    </div>
                    {amountStr && (
                      <div className="text-white/90">
                        {t("columnAmount")}:{amountStr}
                      </div>
                    )}
                    {p.description && (
                      <div className="text-white/90">{p.description}</div>
                    )}
                  </>
                }
              >
                <div
                  className="w-2 h-2 rounded-full shrink-0 pointer-events-none"
                  style={{
                    backgroundColor: "#9FAF52",
                    border: "2px solid #7a8a42",
                  }}
                />
              </EventTooltip>
            );
          })}
        </GanttRow>

        <GanttRow label={t("invoiceReceipts")} timelineWidth={timelineWidth}>
          {receipts.map((p) => {
            const paid = new Date(p.paidAt!);
            const px = dateToPx(paid);
            const amountStr =
              p.amount != null ? ` ${Number(p.amount).toLocaleString("de-CH")} CHF` : "";
            return (
              <EventTooltip
                key={`${p.id}-paid`}
                leftPx={px}
                content={
                  <>
                    <div className="font-medium">{t("invoiceReceipts")}</div>
                    <div className="text-white/90">
                      {t("columnPaymentReceived")}: {paid.toLocaleDateString("de-CH")}
                    </div>
                    {amountStr && (
                      <div className="text-white/90">
                        {t("columnAmount")}:{amountStr}
                      </div>
                    )}
                  </>
                }
              >
                <div
                  className="w-2 h-2 rounded-full shrink-0 pointer-events-none"
                  style={{
                    backgroundColor: "#9FAF52",
                  }}
                />
              </EventTooltip>
            );
          })}
        </GanttRow>
      </div>
    </div>
  );
}
