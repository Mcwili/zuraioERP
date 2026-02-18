"use client";

import { forwardRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function getCalendarDays(year: number, month: number): (number | null)[] {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const daysInMonth = last.getDate();
  const startOffset = (first.getDay() + 6) % 7;
  const cells: (number | null)[] = Array(startOffset).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  const total = Math.ceil(cells.length / 7) * 7;
  while (cells.length < total) cells.push(null);
  return cells;
}

export const CalendarPopover = forwardRef<
  HTMLDivElement,
  {
    style: { top: number; left: number };
    viewMonth: Date;
    onViewMonthChange: (d: Date) => void;
    selectedDate: Date | null;
    onSelect: (d: Date) => void;
    months: string[];
    weekdays: string[];
  }
>(function CalendarPopover(
  { style, viewMonth, onViewMonthChange, selectedDate, onSelect, months, weekdays },
  ref
) {
  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const days = getCalendarDays(year, month);

  const isSelected = (d: number) =>
    selectedDate &&
    selectedDate.getFullYear() === year &&
    selectedDate.getMonth() === month &&
    selectedDate.getDate() === d;

  const isToday = (d: number) => {
    const t = new Date();
    return t.getFullYear() === year && t.getMonth() === month && t.getDate() === d;
  };

  return (
    <div
      ref={ref}
      className="fixed z-[100] w-64 p-3 rounded-lg shadow-lg border bg-white"
      style={{ borderColor: "#e1dfdd", ...style }}
    >
      <div className="flex items-center justify-between mb-2">
        <button
          type="button"
          onClick={() => onViewMonthChange(new Date(year, month - 1))}
          className="p-1 rounded hover:bg-black/5 text-zuraio-text"
          aria-label="Vorheriger Monat"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="text-sm font-medium text-zuraio-text">
          {months[month]} {year}
        </span>
        <button
          type="button"
          onClick={() => onViewMonthChange(new Date(year, month + 1))}
          className="p-1 rounded hover:bg-black/5 text-zuraio-text"
          aria-label="Nächster Monat"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-0.5 text-center text-xs">
        {weekdays.map((w) => (
          <div key={w} className="py-1 text-zuraio-textMuted font-medium">
            {w}
          </div>
        ))}
        {days.map((d, i) =>
          d ? (
            <button
              key={i}
              type="button"
              onClick={() => onSelect(new Date(year, month, d))}
              className={`py-2 rounded text-sm ${
                isSelected(d)
                  ? "bg-[#9FAF52] text-white font-medium"
                  : isToday(d)
                    ? "ring-1 ring-[#9FAF52] text-zuraio-text"
                    : "hover:bg-black/5 text-zuraio-text"
              }`}
            >
              {d}
            </button>
          ) : (
            <div key={i} />
          )
        )}
      </div>
    </div>
  );
});
