"use client";

import { useState, useCallback, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getExpensesChartData } from "@/server/actions/expenses";

export interface ChartDataPoint {
  month: string;
  label: string;
  planned: number;
  actual: number;
}

function addMonths(ym: string, delta: number): string {
  const [y, m] = ym.split("-").map(Number);
  const d = new Date(y, (m ?? 1) - 1, 1);
  d.setMonth(d.getMonth() + delta);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

const MIN_START = addMonths(
  `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`,
  -24
);
const MAX_END = addMonths(
  `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`,
  24
);

interface ExpensesChartProps {
  data: ChartDataPoint[];
  filters?: { orderId?: string; organizationId?: string };
}

export function ExpensesChart({ data: initialData, filters }: ExpensesChartProps) {
  const t = useTranslations("expenses");
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const startMonth = data[0]?.month ?? "";
  const endMonth = data[data.length - 1]?.month ?? "";
  const stepMonths = Math.max(1, Math.floor(data.length / 2));
  const canGoPrev = startMonth && startMonth > MIN_START;
  const canGoNext = endMonth && endMonth < MAX_END;

  const loadRange = useCallback(
    async (newStart: string, newEnd: string) => {
      setLoading(true);
      try {
        const result = await getExpensesChartData(filters, {
          startMonth: newStart,
          endMonth: newEnd,
        });
        setData(result);
      } finally {
        setLoading(false);
      }
    },
    [filters]
  );

  function handlePrev() {
    if (!canGoPrev || loading) return;
    const newStart = addMonths(startMonth, -stepMonths);
    const newEnd = addMonths(endMonth, -stepMonths);
    loadRange(newStart, newEnd);
  }

  function handleNext() {
    if (!canGoNext || loading) return;
    const newStart = addMonths(startMonth, stepMonths);
    const newEnd = addMonths(endMonth, stepMonths);
    loadRange(newStart, newEnd);
  }

  return (
    <div className="rounded-lg border bg-white p-4" style={{ borderColor: "#e1dfdd" }}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium" style={{ color: "#1c1c1c" }}>
          {t("chartPlannedVsActual")}
        </h3>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handlePrev}
            disabled={!canGoPrev || loading}
            className="rounded p-1.5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#e1dfdd]"
            title="Früherer Zeitraum"
          >
            <ChevronLeft className="h-5 w-5" style={{ color: "#605e5c" }} />
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={!canGoNext || loading}
            className="rounded p-1.5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#e1dfdd]"
            title="Späterer Zeitraum"
          >
            <ChevronRight className="h-5 w-5" style={{ color: "#605e5c" }} />
          </button>
        </div>
      </div>
      <div className="relative h-[280px] w-full">
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70">
            <span className="text-sm" style={{ color: "#605e5c" }}>{t("loading")}</span>
          </div>
        )}
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e1dfdd" />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: "#605e5c" }}
              tickLine={{ stroke: "#e1dfdd" }}
              axisLine={{ stroke: "#e1dfdd" }}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#605e5c" }}
              tickLine={{ stroke: "#e1dfdd" }}
              axisLine={{ stroke: "#e1dfdd" }}
              tickFormatter={(v) => (v >= 1000 ? `${v / 1000}k` : String(v))}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e1dfdd",
                borderRadius: "6px",
              }}
              formatter={(value: number | undefined, name?: string) => [
                `CHF ${Number(value ?? 0).toLocaleString("de-CH")}`,
                name === "planned" ? t("chartPlanned") : t("chartActual"),
              ]}
              labelFormatter={(label) => label}
            />
            <Legend
              wrapperStyle={{ fontSize: 12 }}
              formatter={(value) =>
                value === "planned" ? t("chartPlanned") : t("chartActual")
              }
            />
            <Area
              type="monotone"
              dataKey="planned"
              name="planned"
              stroke="#9FAF52"
              fill="#9FAF52"
              fillOpacity={0.6}
              strokeWidth={1.5}
            />
            <Area
              type="monotone"
              dataKey="actual"
              name="actual"
              stroke="#605e5c"
              fill="#605e5c"
              fillOpacity={0.6}
              strokeWidth={1.5}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
