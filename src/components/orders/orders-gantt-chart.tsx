"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

interface GanttMilestone {
  id: string;
  name: string;
  dueDate: Date | string | null;
  completedAt: Date | string | null;
}

interface GanttOrder {
  id: string;
  orderNumber: string | null;
  projectName: string | null;
  startDate: Date | string;
  endDate: Date | string | null;
  organization: { name: string };
  milestones?: GanttMilestone[];
}

interface OrdersGanttChartProps {
  orders: GanttOrder[];
  /** Bei true wird beim Klick auf eine Zeile nicht navigiert (z.B. bei Einzelauftragsansicht) */
  disableNavigation?: boolean;
}

const MONTHS_PAST = 2;
const MONTHS_FUTURE = 18;
const MONTHS_TOTAL = MONTHS_PAST + 1 + MONTHS_FUTURE; // 2 Vergangenheit + aktueller + 18 Zukunft
const MONTH_WIDTH = 72;
const LABEL_WIDTH = 200;

function getMonthKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function getMonthsForTimeline(): string[] {
  const months: string[] = [];
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth() - MONTHS_PAST, 1);
  for (let i = 0; i < MONTHS_TOTAL; i++) {
    const d = new Date(start.getFullYear(), start.getMonth() + i, 1);
    months.push(getMonthKey(d));
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

export function OrdersGanttChart({ orders, disableNavigation }: OrdersGanttChartProps) {
  const t = useTranslations("orders");
  const router = useRouter();

  const today = new Date();
  const minDate = new Date(today.getFullYear(), today.getMonth() - MONTHS_PAST, 1);
  const maxDate = new Date(today.getFullYear(), today.getMonth() + MONTHS_FUTURE + 1, 0);
  const rangeMs = maxDate.getTime() - minDate.getTime();

  const months = getMonthsForTimeline();
  const timelineWidth = months.length * MONTH_WIDTH;

  const ordersWithDates = orders.filter((o) => o.startDate);

  if (ordersWithDates.length === 0) {
    return (
      <div className="px-4 py-8 text-center text-zuraio-textMuted text-sm">
        {t("noOrdersForGantt")}
      </div>
    );
  }

  const dateToPx = (d: Date): number => {
    const pct = (d.getTime() - minDate.getTime()) / rangeMs;
    return Math.max(0, Math.min(timelineWidth, pct * timelineWidth));
  };

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
            {t("projectName")}
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
        {ordersWithDates.map((o) => {
          const start = new Date(o.startDate);
          const end = o.endDate
            ? new Date(o.endDate)
            : new Date(start.getFullYear() + 1, start.getMonth(), start.getDate());
          const leftPx = dateToPx(start);
          const rightPx = dateToPx(end);
          const widthPx = Math.max(rightPx - leftPx - 4, 8);
          const milestones = (o.milestones || []).filter((m) => m.dueDate);

          return (
            <div
              key={o.id}
              onClick={() => !disableNavigation && router.push(`/dashboard/orders/${o.id}`)}
              className={`flex items-center border-t transition-colors ${!disableNavigation ? "cursor-pointer hover:bg-[#f8f8f7]" : ""}`}
              style={{ borderColor: "#e1dfdd" }}
            >
              <div
                style={{ width: LABEL_WIDTH }}
                className="shrink-0 px-3 py-2"
              >
                <span className="font-medium text-zuraio-text block truncate text-sm">
                  {o.projectName || o.orderNumber || o.organization.name}
                </span>
                <span className="text-zuraio-textMuted text-xs block truncate">
                  {o.organization.name}
                </span>
              </div>
              <div
                className="relative h-10 shrink-0 pl-2"
                style={{ width: timelineWidth }}
              >
                <div
                  className="absolute top-1.5 bottom-1.5 rounded transition-colors hover:opacity-90"
                  style={{
                    left: leftPx + 4,
                    width: widthPx,
                    backgroundColor: "#DCE6B5",
                  }}
                  title={`${start.toLocaleDateString("de-CH")} – ${end.toLocaleDateString("de-CH")}${!o.endDate ? " (offen)" : ""}`}
                />
                {milestones.map((m) => {
                  const due = new Date(m.dueDate as string | Date);
                  const px = dateToPx(due);
                  const isCompleted = !!m.completedAt;
                  return (
                    <div
                      key={m.id}
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rotate-45 shrink-0"
                      style={{
                        left: px + 4,
                        backgroundColor: isCompleted ? "#9FAF52" : "#605e5c",
                      }}
                      title={`${m.name}${isCompleted ? ` – ${t("statusCompleted")}` : ""} (${due.toLocaleDateString("de-CH")})`}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
