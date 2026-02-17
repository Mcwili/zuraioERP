"use client";

import { useTranslations } from "next-intl";

interface BudgetPlanMonth {
  yearMonth: string;
  plannedPersonnel: unknown;
  plannedExternal: unknown;
  plannedInfrastructure: unknown;
  plannedRevenue?: unknown;
}

interface BudgetPlan {
  id: string;
  version: number;
  comment: string | null;
  months: BudgetPlanMonth[];
}

interface OrderBudgetTabProps {
  budgetPlans: BudgetPlan[];
  orderId: string;
  currency: string;
}

export function OrderBudgetTab({
  budgetPlans,
  orderId,
  currency,
}: OrderBudgetTabProps) {
  const t = useTranslations("orders");

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

  const plan = budgetPlans[0];
  const months = plan?.months ?? [];

  return (
    <div
      className="rounded-lg border overflow-hidden bg-white"
      style={{ borderColor: "#e1dfdd" }}
    >
      <div className="flex justify-between items-center p-3 border-b" style={{ borderColor: "#e1dfdd" }}>
        <h3 className="font-semibold text-zuraio-text">{t("budget")}</h3>
        {plan && (
          <span className="text-xs text-zuraio-textMuted">
            Budget V{plan.version}
            {plan.comment && ` – ${plan.comment}`}
          </span>
        )}
      </div>
      {months.length === 0 ? (
        <div className="p-6 text-center text-zuraio-textMuted text-sm">
          {t("noBudget")}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead style={{ backgroundColor: "#f8f8f7", borderBottom: "1px solid #e1dfdd" }}>
              <tr>
                <th className="text-left px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                  Monat
                </th>
                <th className="text-right px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                  Geplante Personalkosten
                </th>
                <th className="text-right px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                  Geplante Fremdkosten
                </th>
                <th className="text-right px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                  Geplante Infrastruktur
                </th>
                <th className="text-right px-3 py-2 text-xs font-medium text-zuraio-textMuted">
                  Gesamt geplante Kosten
                </th>
              </tr>
            </thead>
            <tbody>
              {months.map((m) => {
                const total =
                  Number(m.plannedPersonnel || 0) +
                  Number(m.plannedExternal || 0) +
                  Number(m.plannedInfrastructure || 0);
                return (
                  <tr
                    key={m.yearMonth}
                    className="border-t transition-colors hover:bg-[#DCE6B5]"
                    style={{ borderColor: "#e1dfdd" }}
                  >
                    <td className="px-3 py-2 font-medium">
                      {formatMonth(m.yearMonth)}
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums">
                      {formatAmount(m.plannedPersonnel)}
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums">
                      {formatAmount(m.plannedExternal)}
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums">
                      {formatAmount(m.plannedInfrastructure)}
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums font-medium">
                      {formatAmount(total)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
