import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Bell } from "lucide-react";
import { PageBanner } from "@/components/dashboard/page-banner";

export default async function AlertsPage() {
  const t = await getTranslations("nav");
  const session = await getServerSession(authOptions);
  if (!session) return null;

  const overdueInvoices = await prisma.invoice.findMany({
    where: {
      status: { not: "PAID" },
      dueDate: { lt: new Date() },
    },
    take: 10,
  });

  return (
    <div className="flex flex-col min-h-0">
      <PageBanner title={t("alerts")} icon={Bell} />
      <div className="px-4 sm:px-6 md:px-8 pt-6 pb-8">
      <div className="space-y-4">
        <h2 className="font-semibold text-zuraio-text">Mahnungshinweise</h2>
        {overdueInvoices.length === 0 ? (
          <p className="text-zuraio-textMuted text-sm">
            Keine überfälligen Rechnungen.
          </p>
        ) : (
          <ul className="space-y-2">
            {overdueInvoices.map((inv) => (
              <li
                key={inv.id}
                className="p-4 border rounded-lg transition-colors hover:bg-[#DCE6B5]"
                style={{ borderColor: "#e1dfdd" }}
              >
                <p className="font-medium text-zuraio-text">
                  Rechnung {inv.number} überfällig
                </p>
                <p className="text-sm text-zuraio-textMuted">
                  Fällig seit {inv.dueDate.toLocaleDateString("de-CH")}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
      </div>
    </div>
  );
}
