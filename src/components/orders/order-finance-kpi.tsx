"use client";

import { useTranslations } from "next-intl";
import { CheckCircle, AlertCircle } from "lucide-react";

interface OrderFinanceKpiProps {
  contractValue: number;
  invoiced: number;
  paid: number;
  open: number;
  plannedRevenueRemaining: number;
  plannedCosts: number;
  actualCosts: number;
  currency: string;
  budgetOk: boolean;
  paymentOk: boolean;
  marginOnTarget: boolean;
}

export function OrderFinanceKpi({
  contractValue,
  invoiced,
  paid,
  open,
  plannedRevenueRemaining,
  plannedCosts,
  actualCosts,
  currency,
  budgetOk,
  paymentOk,
  marginOnTarget,
}: OrderFinanceKpiProps) {
  const t = useTranslations("orders.finance");

  const format = (val: number) =>
    `${val.toLocaleString("de-CH")} ${currency}`;

  const contributionMargin = invoiced - actualCosts;
  const contributionPercent =
    invoiced > 0 ? ((contributionMargin / invoiced) * 100).toFixed(1) : "0";

  const kpis = [
    { label: t("contractValue"), value: format(contractValue) },
    { label: t("invoiced"), value: format(invoiced) },
    { label: t("paid"), value: format(paid) },
    { label: t("open"), value: format(open) },
    { label: t("plannedRevenueRemaining"), value: format(plannedRevenueRemaining) },
    { label: t("plannedCosts"), value: format(plannedCosts) },
    { label: t("actualCosts"), value: format(actualCosts) },
    {
      label: t("contributionMargin"),
      value: `${format(contributionMargin)} (${contributionPercent}%)`,
    },
  ];

  const indicators = [
    {
      ok: budgetOk,
      labelOk: t("budgetOk"),
      labelCritical: t("budgetCritical"),
    },
    {
      ok: paymentOk,
      labelOk: t("paymentOk"),
      labelCritical: t("paymentReminder"),
    },
    {
      ok: marginOnTarget,
      labelOk: t("marginOnTarget"),
      labelCritical: t("marginBelowTarget"),
    },
  ];

  return (
    <div className="space-y-4">
      <div
        className="p-4 rounded-lg border bg-white"
        style={{ borderColor: "#e1dfdd" }}
      >
        <h3 className="font-semibold text-zuraio-text mb-3 text-sm">
          Finanzübersicht
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {kpis.map(({ label, value }) => (
            <div key={label}>
              <span className="text-zuraio-textMuted block text-xs">{label}</span>
              <span className="font-medium text-zuraio-text text-sm">{value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        {indicators.map(({ ok, labelOk, labelCritical }) => (
          <div
            key={labelOk}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm"
            style={{
              backgroundColor: ok ? "#DCE6B5" : "rgba(220, 38, 38, 0.15)",
              color: ok ? "#1c1c1c" : "#dc2626",
            }}
          >
            {ok ? (
              <CheckCircle className="h-4 w-4 shrink-0" />
            ) : (
              <AlertCircle className="h-4 w-4 shrink-0" />
            )}
            <span>{ok ? labelOk : labelCritical}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
