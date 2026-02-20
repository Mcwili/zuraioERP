import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { canManageUsers } from "@/lib/permissions";
import { getCurrentUserProfile } from "@/server/actions/users";
import { getAlerts } from "@/server/actions/alerts";
import { getSharePointStatus } from "@/server/actions/sharepoint-settings";
import { DashboardShell } from "@/components/dashboard/shell";
import { serializeForRSC } from "@/lib/serialize-order";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const isAdmin = canManageUsers(session.user.role);

  const [profileRaw, alerts, sharePointStatus] = await Promise.all([
    getCurrentUserProfile(),
    getAlerts(),
    isAdmin
      ? getSharePointStatus().catch(() => ({ configured: false }))
      : Promise.resolve({ configured: false }),
  ]);
  const profile = profileRaw ? serializeForRSC(profileRaw) : null;
  const importantCount = alerts.important.length;
  const sharePointConfigured = sharePointStatus.configured;

  return (
    <DashboardShell
      userProfile={profile}
      isAdmin={isAdmin}
      importantAlertsCount={importantCount}
      sharePointConfigured={sharePointConfigured}
    >
      {children}
    </DashboardShell>
  );
}
