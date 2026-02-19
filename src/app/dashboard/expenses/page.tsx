import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { canAccessExpenses } from "@/lib/permissions";
import { getTranslations } from "next-intl/server";
import { Wallet } from "lucide-react";
import { PageBanner } from "@/components/dashboard/page-banner";
import { ExpensesContent } from "@/components/expenses/expenses-content";
import { getExpensesData, getExpensesChartData } from "@/server/actions/expenses";
import { serializeOrder } from "@/lib/serialize-order";
import type { PlannedExpenseStatus, ExpenseCostType } from "@prisma/client";

export default async function ExpensesPage({
  searchParams,
}: {
  searchParams: Promise<{
    orderId?: string;
    organizationId?: string;
    status?: string;
    costType?: string;
    dateFrom?: string;
    dateTo?: string;
    search?: string;
  }>;
}) {
  const t = await getTranslations("nav");
  const session = await getServerSession(authOptions);
  if (!session || !canAccessExpenses(session.user.role)) {
    return <p>Nicht berechtigt</p>;
  }

  const params = await searchParams;
  const dateFrom = params.dateFrom ? new Date(params.dateFrom) : null;
  const dateTo = params.dateTo ? new Date(params.dateTo) : null;

  const filters = {
    orderId: params.orderId ?? null,
    organizationId: params.organizationId ?? null,
    status: (params.status as PlannedExpenseStatus) ?? null,
    costType: (params.costType as ExpenseCostType) ?? null,
    dateFrom: dateFrom && !isNaN(dateFrom.getTime()) ? dateFrom : null,
    dateTo: dateTo && !isNaN(dateTo.getTime()) ? dateTo : null,
    search: params.search ?? null,
  };

  const [data, chartData] = await Promise.all([
    getExpensesData(filters),
    getExpensesChartData({
      orderId: filters.orderId ?? undefined,
      organizationId: filters.organizationId ?? undefined,
    }),
  ]);

  const plannedExpenses = data.plannedExpenses.map((p) =>
    serializeOrder(p as Record<string, unknown>)
  );
  const actualCosts = data.actualCosts.map((a) =>
    serializeOrder(a as Record<string, unknown>)
  );

  return (
    <div className="flex flex-col min-h-0">
      <PageBanner title={t("expenses")} icon={Wallet} />
      <div className="px-4 sm:px-6 md:px-8 pt-6 pb-8">
        <Suspense fallback={<div className="text-zuraio-textMuted text-sm">Laden…</div>}>
          <ExpensesContent
          plannedExpenses={plannedExpenses as unknown as Parameters<typeof ExpensesContent>[0]["plannedExpenses"]}
          actualCosts={actualCosts as unknown as Parameters<typeof ExpensesContent>[0]["actualCosts"]}
          organizations={data.organizations}
          orders={data.orders}
          filters={params}
          chartData={chartData}
        />
        </Suspense>
      </div>
    </div>
  );
}
