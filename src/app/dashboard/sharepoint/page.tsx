import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { canManageUsers } from "@/lib/permissions";
import { getSharePointStatus } from "@/server/actions/sharepoint-settings";
import { getTranslations } from "next-intl/server";
import { Cloud } from "lucide-react";
import { PageBanner } from "@/components/dashboard/page-banner";
import { SharePointExplorer } from "@/components/sharepoint/sharepoint-explorer";

export default async function SharePointPage() {
  const t = await getTranslations("settings");
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  if (!canManageUsers(session.user.role)) {
    redirect("/dashboard");
  }

  let configured = false;
  try {
    const status = await getSharePointStatus();
    configured = status.configured;
  } catch {
    configured = false;
  }

  if (!configured) {
    redirect("/dashboard/settings#sharepoint");
  }

  return (
    <div className="flex flex-col min-h-0">
      <PageBanner title={t("sharePointExplorerTitle")} icon={Cloud} />
      <div className="px-4 sm:px-6 md:px-8 pt-6 pb-8">
        <SharePointExplorer />
      </div>
    </div>
  );
}
