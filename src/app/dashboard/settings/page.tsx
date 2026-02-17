import { getTranslations } from "next-intl/server";
import { Settings } from "lucide-react";
import { PageBanner } from "@/components/dashboard/page-banner";

export default async function SettingsPage() {
  const t = await getTranslations("nav");

  return (
    <div className="flex flex-col min-h-0">
      <PageBanner title={t("settings")} icon={Settings} />
      <div className="px-4 sm:px-6 md:px-8 pt-6 pb-8">
        <p className="text-zuraio-textMuted text-sm">
          Einstellungen – In Entwicklung.
        </p>
      </div>
    </div>
  );
}
