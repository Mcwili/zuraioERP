"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { canAccessContacts } from "@/lib/permissions";
import { revalidatePath } from "next/cache";
import { uploadDocument } from "@/lib/sharepoint";
import type { DocumentType } from "@prisma/client";

const ALLOWED_MIME = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
];
const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

export async function uploadOrganizationDocument(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session || !canAccessContacts(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  const organizationId = formData.get("organizationId") as string;
  const file = formData.get("file") as File;
  const type = formData.get("type") as DocumentType;

  if (!organizationId) throw new Error("Organisation erforderlich");

  if (!file || !type) throw new Error("Datei und Typ erforderlich");
  if (!ALLOWED_MIME.includes(file.type))
    throw new Error("Dateityp nicht erlaubt (PDF, DOC, DOCX, JPEG, PNG)");
  if (file.size > MAX_SIZE) throw new Error("Datei zu gross (max 10 MB)");

  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = sanitizeFileName(file.name);

  try {
    const result = await uploadDocument(
      organizationId,
      null,
      type,
      fileName,
      buffer,
      file.type
    );

    const doc = await prisma.document.create({
      data: {
        organizationId,
        type,
        fileName,
        sharePointDriveId: result.driveId,
        sharePointItemId: result.itemId,
        sharePointWebUrl: result.webUrl ?? null,
        mimeType: file.type,
        size: file.size,
        uploadedById: session.user.id,
      },
    });

    revalidatePath("/dashboard/contacts");
    revalidatePath(`/dashboard/contacts/${organizationId}`);
    return doc;
  } catch (err) {
    console.error("SharePoint upload error:", err);
    throw new Error(
      "Upload fehlgeschlagen. Prüfen Sie die SharePoint-Konfiguration."
    );
  }
}

function sanitizeFileName(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 200);
}
