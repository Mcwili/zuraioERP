import { getTranslations } from "next-intl/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Bell } from "lucide-react";
import { PageBanner } from "@/components/dashboard/page-banner";
import { getAlerts } from "@/server/actions/alerts";
import { serializeForRSC } from "@/lib/serialize-order";
import { AlertsTables } from "@/components/alerts/alerts-tables";

export default async function AlertsPage() {
  const t = await getTranslations("nav");
  const session = await getServerSession(authOptions);
  if (!session) return null;

  const alerts = await getAlerts();
  const serialized = {
    important: serializeForRSC(alerts.important),
    todos: serializeForRSC(alerts.todos),
    milestones: serializeForRSC(alerts.milestones),
    plannedExpenses: serializeForRSC(alerts.plannedExpenses),
    invoices: serializeForRSC(alerts.invoices),
  };

  return (
    <div className="flex flex-col min-h-0">
      <PageBanner title={t("alerts")} icon={Bell} />
      <div className="px-4 sm:px-6 md:px-8 pt-6 pb-8 space-y-6">
        <AlertsTables data={serialized} />
      </div>
    </div>
  );
}
