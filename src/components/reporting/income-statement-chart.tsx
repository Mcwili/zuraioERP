"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTranslations } from "next-intl";
import type { IncomeStatementData, IncomeStatementMonthData } from "@/server/actions/reporting";

export interface IncomeStatementChartDataPoint {
  month: string;
  label: string;
  revenue: number;
  directCost: number;
  personnelCost: number;
  propertyCost: number;
  operatingCost: number;
  isActual: boolean;
}

function toChartData(months: IncomeStatementMonthData[]): IncomeStatementChartDataPoint[] {
  return months.map((m) => ({
    month: m.month,
    label: m.label,
    revenue: m.isActual ? m.revenue : m.budgetRevenue,
    directCost: m.isActual ? m.directCost : m.budgetDirectCost,
    personnelCost: m.isActual ? m.personnelCost : m.budgetPersonnelCost,
    propertyCost: m.isActual ? m.propertyCost : m.budgetPropertyCost,
    operatingCost: m.isActual ? m.operatingCost : m.budgetOperatingCost,
    isActual: m.isActual,
  }));
}

interface IncomeStatementChartProps {
  data: IncomeStatementData;
}

const CHART_COLORS = {
  revenue: "#5ebc67",
  directCost: "#c55a5a",
  personnelCost: "#e07b7b",
  propertyCost: "#a04545",
  operatingCost: "#8b3a3a",
};

export function IncomeStatementChart({ data }: IncomeStatementChartProps) {
  const t = useTranslations("reporting");
  const chartData = toChartData(data.months);

  if (chartData.length === 0) return null;

  const formatValue = (v: number) =>
    v.toLocaleString("de-CH", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <div
      className="rounded-lg border overflow-hidden bg-white p-4 mb-6"
      style={{ borderColor: "#e1dfdd" }}
    >
      <h3 className="text-sm font-medium mb-4" style={{ color: "#1c1c1c" }}>
        {t("incomeStatement")} – {data.year}
      </h3>
      <div className="relative h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            barCategoryGap="20%"
            barGap={4}
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
              tickFormatter={(v) =>
                v >= 1000000 ? `${v / 1000000}M` : v >= 1000 ? `${v / 1000}k` : String(v)
              }
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e1dfdd",
                borderRadius: "6px",
              }}
              formatter={(value: number | undefined, name?: string) => [
                formatValue(value ?? 0),
                t((name ?? "") as "ertrag" | "directCost" | "personnelCost" | "propertyCost" | "operatingCost"),
              ]}
              labelFormatter={(label) => label}
            />
            <Legend
              wrapperStyle={{ fontSize: 12 }}
              formatter={(value) =>
                t(value as "ertrag" | "directCost" | "personnelCost" | "propertyCost" | "operatingCost")
              }
            />
            <Bar dataKey="revenue" name="ertrag" fill={CHART_COLORS.revenue} radius={[2, 2, 0, 0]} />
            <Bar
              dataKey="directCost"
              name="directCost"
              stackId="expenses"
              fill={CHART_COLORS.directCost}
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="personnelCost"
              name="personnelCost"
              stackId="expenses"
              fill={CHART_COLORS.personnelCost}
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="propertyCost"
              name="propertyCost"
              stackId="expenses"
              fill={CHART_COLORS.propertyCost}
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="operatingCost"
              name="operatingCost"
              stackId="expenses"
              fill={CHART_COLORS.operatingCost}
              radius={[0, 0, 2, 2]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap gap-4 mt-2 text-xs" style={{ color: "#605e5c" }}>
        <span>{t("legendA")}</span>
        <span>{t("legendB")}</span>
      </div>
    </div>
  );
}
