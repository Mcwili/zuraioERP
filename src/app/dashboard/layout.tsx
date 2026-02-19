import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { canManageUsers } from "@/lib/permissions";
import { getCurrentUserProfile } from "@/server/actions/users";
import { DashboardShell } from "@/components/dashboard/shell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const profile = await getCurrentUserProfile();
  const isAdmin = canManageUsers(session.user.role);

  return (
    <DashboardShell userProfile={profile} isAdmin={isAdmin}>
      {children}
    </DashboardShell>
  );
}
