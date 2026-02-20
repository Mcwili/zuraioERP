"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { canManageUsers } from "@/lib/permissions";
import { getGraphClient } from "@/lib/sharepoint";

const KEY_SITE_ID = "sharepoint_site_id";
const KEY_DRIVE_ID = "sharepoint_drive_id";

async function getSetting(key: string): Promise<string | null> {
  const row = await prisma.systemSetting.findUnique({
    where: { key },
    select: { value: true },
  });
  return row?.value ?? null;
}

export async function getSharePointStatus(): Promise<{
  configured: boolean;
  hasSiteId: boolean;
  hasDriveId: boolean;
  siteId: string | null;
  driveId: string | null;
}> {
  const session = await getServerSession(authOptions);
  if (!session || !canManageUsers(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  const hasAzureCreds =
    !!process.env.AZURE_CLIENT_ID &&
    !!process.env.AZURE_CLIENT_SECRET &&
    !!process.env.AZURE_TENANT_ID;

  const siteIdFromDb = await getSetting(KEY_SITE_ID);
  const driveIdFromDb = await getSetting(KEY_DRIVE_ID);
  const siteId = siteIdFromDb ?? process.env.SHAREPOINT_SITE_ID ?? null;
  const driveId = driveIdFromDb ?? process.env.SHAREPOINT_DRIVE_ID ?? null;

  const hasSiteId = !!siteId?.trim();
  const hasDriveId = !!driveId?.trim();
  const configured = hasAzureCreds && (hasSiteId || hasDriveId);

  return {
    configured,
    hasSiteId,
    hasDriveId,
    siteId: siteId?.trim() || null,
    driveId: driveId?.trim() || null,
  };
}

export async function updateSharePointSettings(
  siteId?: string | null,
  driveId?: string | null
): Promise<void> {
  const session = await getServerSession(authOptions);
  if (!session || !canManageUsers(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  if (siteId !== undefined) {
    const value = siteId?.trim() || null;
    await prisma.systemSetting.upsert({
      where: { key: KEY_SITE_ID },
      create: { key: KEY_SITE_ID, value },
      update: { value },
    });
  }
  if (driveId !== undefined) {
    const value = driveId?.trim() || null;
    await prisma.systemSetting.upsert({
      where: { key: KEY_DRIVE_ID },
      create: { key: KEY_DRIVE_ID, value },
      update: { value },
    });
  }
}

export async function testSharePointConnection(): Promise<{
  success: boolean;
  message: string;
}> {
  const session = await getServerSession(authOptions);
  if (!session || !canManageUsers(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  try {
    const client = getGraphClient();
    const siteId = (await getSetting(KEY_SITE_ID)) ?? process.env.SHAREPOINT_SITE_ID;
    const driveId = (await getSetting(KEY_DRIVE_ID)) ?? process.env.SHAREPOINT_DRIVE_ID;

    if (driveId) {
      await client.api(`/drives/${driveId}`).get();
    } else if (siteId) {
      await client.api(`/sites/${siteId}/drive`).get();
    } else {
      return {
        success: false,
        message: "SharePoint-Konfiguration fehlt: Site ID oder Drive ID erforderlich.",
      };
    }

    return { success: true, message: "Verbindung erfolgreich." };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unbekannter Fehler";
    return { success: false, message: msg };
  }
}

export type SharePointDriveItem = {
  id: string;
  name: string;
  isFolder: boolean;
  size?: number;
  lastModified?: string;
  webUrl?: string;
};

export async function listSharePointItems(
  itemId?: string | null
): Promise<{ items: SharePointDriveItem[]; driveId: string; webUrl?: string } | null> {
  const session = await getServerSession(authOptions);
  if (!session || !canManageUsers(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  const status = await getSharePointStatus();
  if (!status.configured) return null;

  const client = getGraphClient();
  let driveId = status.driveId;

  if (!driveId && status.siteId) {
    const site = await client.api(`/sites/${status.siteId}/drive`).get();
    driveId = site.id;
  }
  if (!driveId) return null;

  const endpoint = itemId
    ? `/drives/${driveId}/items/${itemId}/children`
    : `/drives/${driveId}/root/children`;

  const response = await client.api(endpoint).top(200).get();
  const value = response.value;

  const items: SharePointDriveItem[] = (value || []).map((item: { id: string; name: string; folder?: unknown; size?: number; lastModifiedDateTime?: string; webUrl?: string }) => ({
    id: item.id,
    name: item.name,
    isFolder: !!item.folder,
    size: item.size,
    lastModified: item.lastModifiedDateTime,
    webUrl: item.webUrl,
  }));

  let webUrl: string | undefined;
  if (itemId) {
    const folderInfo = await client.api(`/drives/${driveId}/items/${itemId}`).select("webUrl").get();
    webUrl = folderInfo?.webUrl;
  } else {
    const rootInfo = await client.api(`/drives/${driveId}/root`).select("webUrl").get();
    webUrl = rootInfo?.webUrl;
  }

  return {
    items,
    driveId,
    webUrl,
  };
}
