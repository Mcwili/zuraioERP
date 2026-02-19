"use client";

import { useTranslations } from "next-intl";
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
import type { CashflowMonthData } from "@/server/actions/reporting";

interface CashflowReportProps {
  data: CashflowMonthData[];
}

function getMonthValue(m: CashflowMonthData, key: "inflows" | "outflows" | "net"): number {
  return m.isActual ? m[key] : (key === "inflows" ? m.plannedInflows : key === "outflows" ? m.plannedOutflows : m.plannedNet);
}

export function CashflowReport({ data }: CashflowReportProps) {
  const t = useTranslations("reporting");

  const chartData = data.map((m) => ({
    ...m,
    chartInflows: getMonthValue(m, "inflows"),
    chartOutflows: getMonthValue(m, "outflows"),
  }));

  const format = (v: number) =>
    v.toLocaleString("de-CH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const yearTotalInflows = data.reduce((s, m) => s + getMonthValue(m, "inflows"), 0);
  const yearTotalOutflows = data.reduce((s, m) => s + getMonthValue(m, "outflows"), 0);
  const yearTotalNet = yearTotalInflows - yearTotalOutflows;
  const year = data[0] ? data[0].month.split("-")[0] : String(new Date().getFullYear());

  return (
    <div className="space-y-4">
      <div
        className="rounded-lg border bg-white p-4 overflow-hidden"
        style={{ borderColor: "#e1dfdd" }}
      >
        <h3 className="mb-4 text-sm font-medium" style={{ color: "#1c1c1c" }}>
          {t("cashflow")} – {t("inflows")} vs. {t("outflows")}
        </h3>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
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
                tickFormatter={(v) =>
                  v >= 1000 ? `${v / 1000}k` : String(v)
                }
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e1dfdd",
                  borderRadius: "6px",
                }}
                formatter={(value: number, name: string) => [
                  format(value),
                  name === "chartInflows" ? t("inflows") : t("outflows"),
                ]}
                labelFormatter={(label) => label}
              />
              <Legend
                wrapperStyle={{ fontSize: 12 }}
                formatter={(value) =>
                  value === "chartInflows" ? t("inflows") : t("outflows")
                }
              />
              <Area
                type="monotone"
                dataKey="chartInflows"
                name="chartInflows"
                stroke="#9FAF52"
                fill="#9FAF52"
                fillOpacity={0.6}
                strokeWidth={1.5}
              />
              <Area
                type="monotone"
                dataKey="chartOutflows"
                name="chartOutflows"
                stroke="#605e5c"
                fill="#605e5c"
                fillOpacity={0.6}
                strokeWidth={1.5}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap gap-4 mt-2 text-xs" style={{ color: "#605e5c" }}>
          <span>{t("legendACashflow")}</span>
          <span>{t("legendBCashflow")}</span>
        </div>
      </div>
      <div
        className="rounded-lg border overflow-hidden bg-white overflow-x-auto"
        style={{ borderColor: "#e1dfdd" }}
      >
        <table className="w-full text-sm" style={{ tableLayout: "fixed", minWidth: 800 }}>
          <colgroup>
            <col style={{ width: 120 }} />
            {data.map((m) => (
              <col key={m.month} style={{ width: 90 }} />
            ))}
            <col style={{ width: 120 }} />
          </colgroup>
          <thead style={{ backgroundColor: "#f8f8f7", borderBottom: "1px solid #e1dfdd" }}>
            <tr>
              <th
                className="text-left px-3 py-2 text-xs font-medium text-zuraio-textMuted sticky left-0 bg-[#f8f8f7]"
                rowSpan={2}
              >
                {year}
              </th>
              {data.map((m) => (
                <th
                  key={m.month}
                  className="text-right px-2 py-1.5 text-xs font-medium text-zuraio-textMuted"
                  style={{
                    backgroundColor: m.isActual ? "#e8f0d4" : "#f0f0ee",
                  }}
                >
                  {m.label}
                </th>
              ))}
              <th
                className="text-right px-3 py-2 text-xs font-medium text-zuraio-textMuted border-l sticky right-0 bg-[#f8f8f7]"
                style={{ borderColor: "#e1dfdd", minWidth: 120 }}
                rowSpan={2}
              >
                {t("yearTotal")}
              </th>
            </tr>
            <tr>
              {data.map((m) => {
                const ab = m.isActual ? "A" : "B";
                return (
                  <th
                    key={m.month}
                    className="text-center px-2 py-1 text-xs font-bold"
                    style={{
                      backgroundColor: m.isActual ? "#e8f0d4" : "#f0f0ee",
                      color: m.isActual ? "#1c1c1c" : "#605e5c",
                    }}
                    title={m.isActual ? t("actual") : t("planned")}
                  >
                    {ab}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            <tr className="border-t" style={{ borderColor: "#e1dfdd" }}>
              <td className="px-3 py-2 sticky left-0 bg-white font-medium" style={{ color: "#1c1c1c" }}>
                {t("inflows")}
              </td>
              {data.map((m) => (
                <td
                  key={m.month}
                  className="px-2 py-2 text-right tabular-nums"
                  style={{
                    backgroundColor: m.isActual ? "#e8f0d4" : "#f0f0ee",
                    color: "#1c1c1c",
                  }}
                >
                  {format(getMonthValue(m, "inflows"))}
                </td>
              ))}
              <td
                className="px-3 py-2 text-right tabular-nums border-l sticky right-0 bg-white"
                style={{ borderColor: "#e1dfdd", color: "#1c1c1c" }}
              >
                {format(yearTotalInflows)}
              </td>
            </tr>
            <tr className="border-t" style={{ borderColor: "#e1dfdd" }}>
              <td className="px-3 py-2 sticky left-0 bg-white font-medium" style={{ color: "#1c1c1c" }}>
                {t("outflows")}
              </td>
              {data.map((m) => (
                <td
                  key={m.month}
                  className="px-2 py-2 text-right tabular-nums"
                  style={{
                    backgroundColor: m.isActual ? "#e8f0d4" : "#f0f0ee",
                    color: "#1c1c1c",
                  }}
                >
                  {format(getMonthValue(m, "outflows"))}
                </td>
              ))}
              <td
                className="px-3 py-2 text-right tabular-nums border-l sticky right-0 bg-white"
                style={{ borderColor: "#e1dfdd", color: "#1c1c1c" }}
              >
                {format(yearTotalOutflows)}
              </td>
            </tr>
            <tr className="border-t" style={{ borderColor: "#e1dfdd" }}>
              <td className="px-3 py-2 sticky left-0 bg-white font-semibold" style={{ color: "#1c1c1c" }}>
                {t("net")}
              </td>
              {data.map((m) => {
                const net = getMonthValue(m, "net");
                return (
                  <td
                    key={m.month}
                    className="px-2 py-2 text-right tabular-nums font-semibold"
                    style={{
                      backgroundColor: m.isActual ? "#e8f0d4" : "#f0f0ee",
                      color: net < 0 ? "#c00" : "#1c1c1c",
                    }}
                  >
                    {format(net)}
                  </td>
                );
              })}
              <td
                className="px-3 py-2 text-right tabular-nums font-semibold border-l sticky right-0 bg-white"
                style={{
                  borderColor: "#e1dfdd",
                  color: yearTotalNet < 0 ? "#c00" : "#1c1c1c",
                }}
              >
                {format(yearTotalNet)}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="px-3 py-2 border-t text-xs" style={{ borderColor: "#e1dfdd", color: "#605e5c" }}>
          <span className="inline-flex items-center gap-1.5 mr-4">
            <span
              className="inline-block w-5 h-4 rounded text-center font-bold text-[10px] leading-4"
              style={{ backgroundColor: "#DCE6B5", color: "#1c1c1c" }}
            >
              A
            </span>
            {t("legendACashflow")}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span
              className="inline-block w-5 h-4 rounded text-center font-bold text-[10px] leading-4"
              style={{ backgroundColor: "#e8e8e6", color: "#605e5c" }}
            >
              B
            </span>
            {t("legendBCashflow")}
          </span>
        </div>
      </div>
    </div>
  );
}
