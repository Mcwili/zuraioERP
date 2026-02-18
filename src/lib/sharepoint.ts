import { Client } from "@microsoft/microsoft-graph-client";
import { ClientSecretCredential } from "@azure/identity";

/**
 * SharePoint / Microsoft Graph API Client für Zuraio ERP
 *
 * Voraussetzungen:
 * - Azure AD App Registration mit Client Credentials
 * - Berechtigungen: Sites.ReadWrite.All oder Files.ReadWrite.All
 * - Admin-Einwilligung erteilt
 *
 * Umgebungsvariablen:
 * - AZURE_CLIENT_ID
 * - AZURE_CLIENT_SECRET
 * - AZURE_TENANT_ID
 * - SHAREPOINT_SITE_ID oder SHAREPOINT_DRIVE_ID
 */

let cachedCredential: ClientSecretCredential | null = null;

function getCredential(): ClientSecretCredential {
  if (cachedCredential) return cachedCredential;

  const clientId = process.env.AZURE_CLIENT_ID;
  const clientSecret = process.env.AZURE_CLIENT_SECRET;
  const tenantId = process.env.AZURE_TENANT_ID;

  if (!clientId || !clientSecret || !tenantId) {
    throw new Error(
      "SharePoint-Konfiguration fehlt: AZURE_CLIENT_ID, AZURE_CLIENT_SECRET, AZURE_TENANT_ID müssen gesetzt sein."
    );
  }

  cachedCredential = new ClientSecretCredential(
    tenantId,
    clientId,
    clientSecret
  );
  return cachedCredential;
}

async function getAccessToken(): Promise<string> {
  const credential = getCredential();
  const token = await credential.getToken(
    "https://graph.microsoft.com/.default"
  );
  if (!token) throw new Error("Kein Access Token erhalten");
  return token.token;
}

export function getGraphClient(): Client {
  return Client.init({
    authProvider: (done) => {
      getAccessToken()
        .then((token) => done(null, token))
        .catch((err) => done(err, null));
    },
  });
}

export async function uploadDocument(
  organizationId: string,
  orderId: string | null,
  documentType: "CONTRACT" | "NDA" | "OFFER" | "ORDER" | "CORRESPONDENCE" | "TASK_ATTACHMENT",
  fileName: string,
  fileContent: Buffer,
  mimeType: string,
  taskId?: string | null
): Promise<{ driveId: string; itemId: string; webUrl?: string }> {
  const driveId = process.env.SHAREPOINT_DRIVE_ID;
  const siteId = process.env.SHAREPOINT_SITE_ID;

  if (!driveId && !siteId) {
    throw new Error(
      "SharePoint-Konfiguration fehlt: SHAREPOINT_DRIVE_ID oder SHAREPOINT_SITE_ID müssen gesetzt sein."
    );
  }

  const client = getGraphClient();

  const folderPath = orderId
    ? documentType === "TASK_ATTACHMENT" && taskId
      ? `Auftraege/${orderId}/Aufgaben/${taskId}`
      : `Auftraege/${orderId}/${
          documentType === "OFFER"
            ? "Offerten"
            : documentType === "ORDER"
            ? "Bestellungen"
            : "Sonstiges"
        }`
    : `Organisationen/${organizationId}/${
        documentType === "CONTRACT"
          ? "Vertraege"
          : documentType === "NDA"
          ? "NDAs"
          : "Korrespondenz"
      }`;

  let targetDriveId = driveId;
  if (!targetDriveId && siteId) {
    const site = await client.api(`/sites/${siteId}/drive`).get();
    targetDriveId = site.id;
  }

  if (!targetDriveId) {
    throw new Error("SharePoint Drive-ID konnte nicht ermittelt werden.");
  }

  const uploadResult = await client
    .api(`/drives/${targetDriveId}/root:/${folderPath}/${fileName}:/content`)
    .put(fileContent);

  return {
    driveId: uploadResult.parentReference?.driveId ?? targetDriveId,
    itemId: uploadResult.id,
    webUrl: uploadResult.webUrl,
  };
}

export async function downloadDocument(
  driveId: string,
  itemId: string
): Promise<Buffer> {
  const client = getGraphClient();
  const stream = await client
    .api(`/drives/${driveId}/items/${itemId}/content`)
    .getStream();

  const chunks: Buffer[] = [];
  for await (const chunk of stream) {
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

export async function deleteDocument(
  driveId: string,
  itemId: string
): Promise<void> {
  const client = getGraphClient();
  await client.api(`/drives/${driveId}/items/${itemId}`).delete();
}
