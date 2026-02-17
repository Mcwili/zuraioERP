"use client";

import { useTranslations } from "next-intl";

interface BudgetActualCost {
  id: string;
  date: Date;
  costType: string;
  amount: unknown;
  supplier: string | null;
  assignedMonth: string;
  paid: boolean;
}

interface OrderActualCostsTabProps {
  actualCosts: BudgetActualCost[];
  orderId: string;
  currency: string;
}

const costTypeKeys: Record<string, string> = {
  PERSONNEL: "costTypePersonnel",
  EXTERNAL: "costTypeExternal",
  INFRASTRUCTURE: "costTypeInfrastructure",
};

export function OrderActualCostsTab({
  actualCosts,
  orderId,
  currency,
}: OrderActualCostsTabProps) {
  const t = useTranslations("orders");

  const formatDate = (d: Date) => d.toLocaleDateString("de-CH");
  const formatAmount = (val: unknown) =>
    `${Number(val || 0).toLocaleString("de-CH")} ${currency}`;

  const formatMonth = (ym: string) => {
    const [y, m] = ym.split("-");
    const months = [
      "Jan", "Feb", "Mär", "Apr", "Mai", "Jun",
      "Jul", "Aug", "Sep", "Okt", "Nov", "Dez",
    ];
    return `${months[parseInt(m || "1", 10) - 1]} ${y}`;
  };

  return (
    <div
      className="rounded-lg border overflow-hidden bg-white"
      style={{ borderColor: "#e1dfdd" }}
    >
      <div className="p-3 border-b" style={{ borderColor: "#e1dfdd" }}>
        <h3 className="font-semibold text-zuraio-text">{t("actualCosts")}</h3>
      </div>
      {actualCosts.length === 0 ? (
        <div className="p-6 text-center text-zuraio-textMuted text-sm">
          {t("noActualCosts")}
        </div>
      ) : (
        <table className="w-full text-sm">
          <thead style={{ backgroundColor: "#f8f8f7", borderBottom: "1px solid #e1dfdd" }}>
            <tr>
              <th className="text-left px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                Datum
              </th>
              <th className="text-left px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                Kostenart
              </th>
              <th className="text-right px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                Betrag
              </th>
              <th className="text-left px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                Lieferant
              </th>
              <th className="text-left px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                Monat
              </th>
              <th className="text-left px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                Bezahlt
              </th>
            </tr>
          </thead>
          <tbody>
            {actualCosts.map((c) => (
              <tr
                key={c.id}
                className="border-t transition-colors hover:bg-[#DCE6B5]"
                style={{ borderColor: "#e1dfdd" }}
              >
                <td className="px-3 py-2">{formatDate(c.date)}</td>
                <td className="px-3 py-2">
                  {t(costTypeKeys[c.costType] || c.costType)}
                </td>
                <td className="px-3 py-2 text-right tabular-nums">
                  {formatAmount(c.amount)}
                </td>
                <td className="px-3 py-2">{c.supplier || "–"}</td>
                <td className="px-3 py-2">{formatMonth(c.assignedMonth)}</td>
                <td className="px-3 py-2">{c.paid ? "Ja" : "Offen"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
