"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { canAccessContacts } from "@/lib/permissions";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { ContactRole } from "@prisma/client";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const contactSchema = z.object({
  organizationId: z.string().min(1),
  firstName: z.string().min(1, "Vorname erforderlich"),
  lastName: z.string().min(1, "Nachname erforderlich"),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  photoUrl: z.string().optional().nullable(),
  role: z.enum(["BILLING", "PROJECT_LEAD", "PURCHASING", "TECHNICAL", "OTHER"]),
  isPrimary: z.boolean().optional(),
  preferredLocale: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
});

export async function listContacts(organizationId: string) {
  const session = await getServerSession(authOptions);
  if (!session || !canAccessContacts(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  return prisma.contact.findMany({
    where: { organizationId },
    orderBy: [{ isPrimary: "desc" }, { lastName: "asc" }],
  });
}

export async function getContact(id: string) {
  const session = await getServerSession(authOptions);
  if (!session || !canAccessContacts(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  return prisma.contact.findUnique({
    where: { id },
    include: { organization: true },
  });
}

const PHOTO_MIME = ["image/jpeg", "image/png", "image/webp"];
const PHOTO_MAX_SIZE = 2 * 1024 * 1024; // 2 MB

export async function createContact(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session || !canAccessContacts(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  const photo = formData.get("photo") as File | null;
  const data = {
    organizationId: formData.get("organizationId") as string,
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: (formData.get("email") as string) || undefined,
    phone: (formData.get("phone") as string) || undefined,
    role: (formData.get("role") as string) ?? "OTHER",
    isPrimary: formData.get("isPrimary") === "on",
  };
  const parsed = contactSchema.parse(data);
  if (parsed.isPrimary) {
    await prisma.contact.updateMany({
      where: { organizationId: parsed.organizationId },
      data: { isPrimary: false },
    });
  }
  const contact = await prisma.contact.create({
    data: {
      organizationId: parsed.organizationId,
      firstName: parsed.firstName,
      lastName: parsed.lastName,
      email: parsed.email || null,
      phone: parsed.phone || null,
      role: parsed.role as ContactRole,
      isPrimary: parsed.isPrimary ?? false,
      preferredLocale: parsed.preferredLocale ?? null,
      notes: parsed.notes ?? null,
    },
  });

  let photoUrl: string | null = null;
  if (photo && typeof photo !== "string" && photo.size > 0 && PHOTO_MIME.includes(photo.type)) {
    if (photo.size > PHOTO_MAX_SIZE) {
      throw new Error("Foto zu gross (max 2 MB)");
    }
    const ext = photo.type === "image/png" ? ".png" : photo.type === "image/webp" ? ".webp" : ".jpg";
    const dir = path.join(process.cwd(), "public", "uploads", "contacts");
    await mkdir(dir, { recursive: true });
    const fileName = `${contact.id}${ext}`;
    const filePath = path.join(dir, fileName);
    const buffer = Buffer.from(await photo.arrayBuffer());
    await writeFile(filePath, buffer);
    photoUrl = `/uploads/contacts/${fileName}`;
    await prisma.contact.update({
      where: { id: contact.id },
      data: { photoUrl },
    });
  }

  revalidatePath("/dashboard/contacts");
  revalidatePath(`/dashboard/contacts/${parsed.organizationId}`);
  return photoUrl
    ? { ...contact, photoUrl }
    : contact;
}

export async function updateContact(
  id: string,
  data: Partial<z.infer<typeof contactSchema>>
) {
  const session = await getServerSession(authOptions);
  if (!session || !canAccessContacts(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  const parsed = contactSchema.partial().parse(data);
  if (parsed.isPrimary && parsed.organizationId) {
    await prisma.contact.updateMany({
      where: { organizationId: parsed.organizationId },
      data: { isPrimary: false },
    });
  }
  const contact = await prisma.contact.update({
    where: { id },
    data: parsed,
  });
  revalidatePath("/dashboard/contacts");
  revalidatePath(`/dashboard/contacts/${contact.organizationId}`);
  return contact;
}

export async function updateContactFromForm(id: string, formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session || !canAccessContacts(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  const contact = await prisma.contact.findUnique({ where: { id } });
  if (!contact) throw new Error("Kontakt nicht gefunden");

  const photo = formData.get("photo") as File | null;
  const data = {
    organizationId: contact.organizationId,
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: (formData.get("email") as string) || undefined,
    phone: (formData.get("phone") as string) || undefined,
    role: (formData.get("role") as string) ?? "OTHER",
    isPrimary: formData.get("isPrimary") === "on",
  };
  const parsed = contactSchema.parse(data);
  if (parsed.isPrimary) {
    await prisma.contact.updateMany({
      where: { organizationId: contact.organizationId },
      data: { isPrimary: false },
    });
  }

  let photoUrl: string | null = contact.photoUrl;
  if (photo && typeof photo !== "string" && photo.size > 0 && PHOTO_MIME.includes(photo.type)) {
    if (photo.size > PHOTO_MAX_SIZE) {
      throw new Error("Foto zu gross (max 2 MB)");
    }
    const ext = photo.type === "image/png" ? ".png" : photo.type === "image/webp" ? ".webp" : ".jpg";
    const dir = path.join(process.cwd(), "public", "uploads", "contacts");
    await mkdir(dir, { recursive: true });
    const fileName = `${contact.id}${ext}`;
    const filePath = path.join(dir, fileName);
    const buffer = Buffer.from(await photo.arrayBuffer());
    await writeFile(filePath, buffer);
    photoUrl = `/uploads/contacts/${fileName}`;
  }

  const updated = await prisma.contact.update({
    where: { id },
    data: {
      firstName: parsed.firstName,
      lastName: parsed.lastName,
      email: parsed.email || null,
      phone: parsed.phone || null,
      role: parsed.role as ContactRole,
      isPrimary: parsed.isPrimary ?? false,
      photoUrl,
    },
  });

  revalidatePath("/dashboard/contacts");
  revalidatePath(`/dashboard/contacts/${contact.organizationId}`);
  return updated;
}

export async function deleteContact(id: string) {
  const session = await getServerSession(authOptions);
  if (!session || !canAccessContacts(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  const contact = await prisma.contact.findUnique({ where: { id } });
  await prisma.contact.delete({ where: { id } });
  if (contact) {
    revalidatePath(`/dashboard/contacts/${contact.organizationId}`);
  }
  revalidatePath("/dashboard/contacts");
}
