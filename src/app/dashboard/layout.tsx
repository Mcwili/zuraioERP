import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { canManageUsers } from "@/lib/permissions";
import { getCurrentUserProfile } from "@/server/actions/users";
import { DashboardShell } from "@/components/dashboard/shell";
import { serializeForRSC } from "@/lib/serialize-order";

// #region agent log
const _log = (msg: string, data: Record<string, unknown>) => {
  const payload = { sessionId: "faa0f8", location: "layout.tsx", message: msg, data, timestamp: Date.now(), hypothesisId: "R1" };
  console.log("[DEBUG][faa0f8]", JSON.stringify(payload));
  fetch("http://127.0.0.1:7618/ingest/a69c7205-1643-4ebf-93f3-fc833731c99f", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "faa0f8" },
    body: JSON.stringify(payload),
  }).catch(() => {});
};
// #endregion

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  _log("layout: session check", {
    hasSession: !!session,
    nextAuthUrl: process.env.NEXTAUTH_URL,
    authTrustHost: process.env.AUTH_TRUST_HOST,
  });
  if (!session) redirect("/login");

  const profileRaw = await getCurrentUserProfile();
  const profile = profileRaw ? serializeForRSC(profileRaw) : null;
  const isAdmin = canManageUsers(session.user.role);

  _log("layout: before shell", {
    profileKeys: profile ? Object.keys(profile) : null,
    hasDate: profile && typeof profile === "object" && "createdAt" in profile,
  });

  return (
    <DashboardShell userProfile={profile} isAdmin={isAdmin}>
      {children}
    </DashboardShell>
  );
}
