import { getTranslations } from "next-intl/server";
import { BarChart3 } from "lucide-react";
import { PageBanner } from "@/components/dashboard/page-banner";

export default async function ReportingPage() {
  const t = await getTranslations("nav");

  return (
    <div className="flex flex-col min-h-0">
      <PageBanner title={t("reporting")} icon={BarChart3} />
      <div className="px-4 sm:px-6 md:px-8 pt-6 pb-8">
        <p className="text-zuraio-textMuted text-sm">
          Reporting – In Entwicklung.
        </p>
      </div>
    </div>
  );
}
