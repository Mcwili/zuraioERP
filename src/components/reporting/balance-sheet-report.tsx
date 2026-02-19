"use client";

import { useTranslations } from "next-intl";

interface BalanceSheetData {
  receivables: number;
  note: string;
  currency: string;
}

interface BalanceSheetReportProps {
  data: BalanceSheetData;
}

export function BalanceSheetReport({ data }: BalanceSheetReportProps) {
  const t = useTranslations("reporting");
  const format = (v: number) =>
    v.toLocaleString("de-CH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-4">
      <div
        className="rounded-lg border overflow-hidden bg-white"
        style={{ borderColor: "#e1dfdd" }}
      >
        <table className="w-full text-sm">
          <tbody>
            <tr className="border-t" style={{ borderColor: "#e1dfdd" }}>
              <td className="px-4 py-3 font-semibold" style={{ color: "#1c1c1c" }}>
                {t("receivables")}
              </td>
              <td className="px-4 py-3 text-right tabular-nums font-semibold">
                {format(data.receivables)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm" style={{ color: "#605e5c" }}>
        {data.note}
      </p>
    </div>
  );
}
