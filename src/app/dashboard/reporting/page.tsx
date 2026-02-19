import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { canAccessReporting } from "@/lib/permissions";
import { getTranslations } from "next-intl/server";
import { BarChart3 } from "lucide-react";
import { PageBanner } from "@/components/dashboard/page-banner";
import { ReportingShell } from "@/components/reporting/reporting-shell";
import { IncomeStatementReport } from "@/components/reporting/income-statement-report";
import { BalanceSheetReport } from "@/components/reporting/balance-sheet-report";
import { CashflowReport } from "@/components/reporting/cashflow-report";
import { RevenueOverviewReport } from "@/components/reporting/revenue-overview-report";
import { OpenItemsReport } from "@/components/reporting/open-items-report";
import { BudgetVsActualReport } from "@/components/reporting/budget-vs-actual-report";
import { serializeForRSC } from "@/lib/serialize-order";
import {
  getIncomeStatementData,
  getBalanceSheetData,
  getCashflowData,
  getRevenueOverviewData,
  getOpenItemsData,
  getBudgetVsActualData,
  getReportingFiltersData,
  type ReportType,
} from "@/server/actions/reporting";

const VALID_REPORTS: ReportType[] = [
  "income-statement",
  "balance-sheet",
  "cashflow",
  "revenue",
  "open-items",
  "budget-vs-actual",
];

function parseReport(s: string | null): ReportType {
  if (s && VALID_REPORTS.includes(s as ReportType)) return s as ReportType;
  return "income-statement";
}

export default async function ReportingPage({
  searchParams,
}: {
  searchParams: Promise<{
    report?: string;
    year?: string;
    month?: string;
    organizationId?: string;
    orderId?: string;
  }>;
}) {
  const t = await getTranslations("nav");
  const tErrors = await getTranslations("errors");
  const session = await getServerSession(authOptions);
  if (!session || !canAccessReporting(session.user.role)) {
    return <p>{tErrors("unauthorized")}</p>;
  }

  const params = await searchParams;
  const report = parseReport(params.report ?? null);
  const year = params.year ? parseInt(params.year, 10) : new Date().getFullYear();
  const month = params.month ? parseInt(params.month, 10) : undefined;

  const filters = {
    year: isNaN(year) ? new Date().getFullYear() : year,
    month,
    organizationId: params.organizationId || undefined,
    orderId: params.orderId || undefined,
  };

  const dateFrom = month
    ? new Date(year, month - 1, 1)
    : new Date(year, 0, 1);
  const dateTo = month
    ? new Date(year, month, 0)
    : new Date(year, 11, 31);

  const filtersWithDates = {
    ...filters,
    dateFrom,
    dateTo,
  };

  const [reportDataRaw, filtersData] = await Promise.all([
    (async () => {
      switch (report) {
        case "income-statement":
          return getIncomeStatementData(filtersWithDates);
        case "balance-sheet":
          return getBalanceSheetData({ ...filtersWithDates, dateTo });
        case "cashflow":
          return getCashflowData(filtersWithDates);
        case "revenue":
          return getRevenueOverviewData(filtersWithDates);
        case "open-items":
          return getOpenItemsData(filtersWithDates);
        case "budget-vs-actual":
          return getBudgetVsActualData(filtersWithDates);
        default:
          return getIncomeStatementData(filtersWithDates);
      }
    })(),
    getReportingFiltersData(),
  ]);

  const reportData = serializeForRSC(reportDataRaw);

  let ReportContent: React.ReactNode;
  switch (report) {
    case "income-statement":
      ReportContent = <IncomeStatementReport data={reportData as Awaited<ReturnType<typeof getIncomeStatementData>>} />;
      break;
    case "balance-sheet":
      ReportContent = <BalanceSheetReport data={reportData as Awaited<ReturnType<typeof getBalanceSheetData>>} />;
      break;
    case "cashflow":
      ReportContent = <CashflowReport data={reportData as Awaited<ReturnType<typeof getCashflowData>>} />;
      break;
    case "revenue":
      ReportContent = <RevenueOverviewReport data={reportData as Awaited<ReturnType<typeof getRevenueOverviewData>>} />;
      break;
    case "open-items":
      ReportContent = <OpenItemsReport data={reportData as Awaited<ReturnType<typeof getOpenItemsData>>} />;
      break;
    case "budget-vs-actual":
      ReportContent = <BudgetVsActualReport data={reportData as Awaited<ReturnType<typeof getBudgetVsActualData>>} />;
      break;
    default:
      ReportContent = <IncomeStatementReport data={reportData as Awaited<ReturnType<typeof getIncomeStatementData>>} />;
  }

  return (
    <div className="flex flex-col min-h-0">
      <PageBanner title={t("reporting")} icon={BarChart3} />
      <div className="px-4 sm:px-6 md:px-8 pt-6 pb-8">
        <Suspense fallback={<div className="text-zuraio-textMuted text-sm">Laden…</div>}>
          <ReportingShell
            activeReport={report}
            organizations={filtersData.organizations}
            orders={filtersData.orders}
          >
            {ReportContent}
          </ReportingShell>
        </Suspense>
      </div>
    </div>
  );
}
