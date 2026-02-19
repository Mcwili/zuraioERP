import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { serializeForRSC } from "@/lib/serialize-order";
import { getTranslations } from "next-intl/server";
import { Settings } from "lucide-react";
import { PageBanner } from "@/components/dashboard/page-banner";
import { canManageUsers } from "@/lib/permissions";
import { getUsers, getCurrentUserProfile } from "@/server/actions/users";
import { getSharePointStatus } from "@/server/actions/sharepoint-settings";
import { CreateUserForm } from "@/components/settings/create-user-form";
import { SharePointSettingsForm } from "@/components/settings/sharepoint-settings-form";
import { EditUserForm } from "@/components/settings/edit-user-form";
import { DeleteUserButton } from "@/components/settings/delete-user-button";
import { ChangePasswordForm } from "@/components/settings/change-password-form";
import { ProfileSection } from "@/components/settings/profile-section";

export default async function SettingsPage() {
  const t = await getTranslations("nav");
  const tSettings = await getTranslations("settings");
  const session = await getServerSession(authOptions);

  if (!session?.user) return null;

  let profile: Awaited<ReturnType<typeof getCurrentUserProfile>> = null;
  let users: Awaited<ReturnType<typeof getUsers>> = [];
  let sharePointStatus: Awaited<ReturnType<typeof getSharePointStatus>> | null = null;

  const isAdmin = canManageUsers(session.user.role);

  try {
    profile = await getCurrentUserProfile();
    if (isAdmin) {
      const usersRaw = await getUsers();
      users = serializeForRSC(usersRaw) as typeof users;
      try {
        sharePointStatus = await getSharePointStatus();
      } catch (spErr) {
        console.error("SharePoint status error:", spErr);
      }
    }
  } catch (err) {
    console.error("Settings page error:", err);
  }

  return (
    <div className="flex flex-col min-h-0">
      <PageBanner title={t("settings")} icon={Settings} />
      <div className="px-4 sm:px-6 md:px-8 pt-6 pb-8 space-y-8">
        {/* Profil mit Bild und Passwort – für alle Benutzer */}
        {profile ? (
          <ProfileSection
            userId={profile.id}
            email={profile.email}
            name={profile.name}
            imageUrl={profile.imageUrl}
          />
        ) : (
          <section>
            <h2 className="font-semibold text-zuraio-text mb-3">
              {tSettings("myPassword")}
            </h2>
            <div
              className="p-6 rounded-lg border flex items-center justify-between"
              style={{ borderColor: "#e1dfdd", backgroundColor: "#fff" }}
            >
              <p className="text-sm text-zuraio-textMuted">{session.user.email}</p>
              <ChangePasswordForm userId={session.user.id} showCurrentPassword={true} />
            </div>
          </section>
        )}

        {/* Benutzerverwaltung – nur für Admin */}
        {isAdmin && (
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-zuraio-text">
                {tSettings("userManagement")}
              </h2>
              <CreateUserForm />
            </div>
            <div
              className="rounded-lg border overflow-hidden"
              style={{ borderColor: "#e1dfdd" }}
            >
              <table className="w-full">
                <thead>
                  <tr style={{ backgroundColor: "#f9f9f8" }}>
                    <th style={{ borderColor: "#e1dfdd" }} className="text-left text-sm font-medium text-zuraio-textMuted px-4 py-3 border-b">
                      {tSettings("email")}
                    </th>
                    <th style={{ borderColor: "#e1dfdd" }} className="text-left text-sm font-medium text-zuraio-textMuted px-4 py-3 border-b">
                      {tSettings("name")}
                    </th>
                    <th style={{ borderColor: "#e1dfdd" }} className="text-left text-sm font-medium text-zuraio-textMuted px-4 py-3 border-b">
                      {tSettings("role")}
                    </th>
                    <th style={{ borderColor: "#e1dfdd" }} className="text-left text-sm font-medium text-zuraio-textMuted px-4 py-3 border-b">
                      {tSettings("status")}
                    </th>
                    <th style={{ borderColor: "#e1dfdd" }} className="text-right text-sm font-medium text-zuraio-textMuted px-4 py-3 border-b">
                      {tSettings("actions")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="border-b" style={{ borderColor: "#e1dfdd" }}>
                      <td className="px-4 py-3 text-sm text-zuraio-text">
                        {u.email}
                      </td>
                      <td className="px-4 py-3 text-sm text-zuraio-text">
                        {u.name || "–"}
                      </td>
                      <td className="px-4 py-3 text-sm text-zuraio-text">
                        {u.role}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={
                            u.isActive
                              ? "text-green-600"
                              : "text-zuraio-textMuted"
                          }
                        >
                          {u.isActive ? tSettings("active") : tSettings("inactive")}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <ChangePasswordForm
                            userId={u.id}
                            showCurrentPassword={false}
                          />
                          <EditUserForm user={u} />
                          <DeleteUserButton
                            userId={u.id}
                            email={u.email}
                            canDelete={u.id !== session.user.id}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* SharePoint – nur für Admin */}
        {isAdmin && (
          <section id="sharepoint">
            <h2 className="font-semibold text-zuraio-text mb-4">
              {tSettings("sharePoint")}
            </h2>
            <SharePointSettingsForm
              initialStatus={
                sharePointStatus ?? {
                  configured: false,
                  hasSiteId: false,
                  hasDriveId: false,
                  siteId: null,
                  driveId: null,
                }
              }
            />
          </section>
        )}
      </div>
    </div>
  );
}
