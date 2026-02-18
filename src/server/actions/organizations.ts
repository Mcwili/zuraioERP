"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { canAccessContacts } from "@/lib/permissions";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { OrganizationType } from "@prisma/client";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const LOGO_MIME = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"];
const LOGO_MAX_SIZE = 2 * 1024 * 1024; // 2 MB

const organizationSchema = z.object({
  name: z.string().min(1, "Name erforderlich"),
  type: z.enum(["CUSTOMER", "PARTNER", "SUPPLIER"]),
  parentOrganizationId: z.string().optional().nullable(),
  keyAccount: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
});

export async function listOrganizations(filters?: {
  type?: OrganizationType;
  search?: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session || !canAccessContacts(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  const where: Record<string, unknown> = {};
  if (filters?.type) where.type = filters.type;
  if (filters?.search) {
    where.OR = [
      { name: { contains: filters.search, mode: "insensitive" } },
    ];
  }

  return prisma.organization.findMany({
    where,
    include: {
      contacts: { where: { isPrimary: true }, take: 1 },
      addresses: true,
      _count: { select: { contacts: true } },
    },
    orderBy: { name: "asc" },
  });
}

export async function getOrganization(id: string) {
  const session = await getServerSession(authOptions);
  if (!session || !canAccessContacts(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  return prisma.organization.findUnique({
    where: { id },
    include: {
      contacts: true,
      addresses: true,
      documents: true,
    },
  });
}

export async function createOrganization(data: z.infer<typeof organizationSchema>) {
  const session = await getServerSession(authOptions);
  if (!session || !canAccessContacts(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  const parsed = organizationSchema.parse(data);
  const org = await prisma.organization.create({
    data: {
      name: parsed.name,
      type: parsed.type as OrganizationType,
      parentOrganizationId: parsed.parentOrganizationId ?? undefined,
      keyAccount: parsed.keyAccount ?? false,
      tags: parsed.tags ?? [],
    },
  });
  revalidatePath("/dashboard/contacts");
  return org;
}

export async function updateOrganization(
  id: string,
  data: Partial<z.infer<typeof organizationSchema>>
) {
  const session = await getServerSession(authOptions);
  if (!session || !canAccessContacts(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  const parsed = organizationSchema.partial().parse(data);
  const org = await prisma.organization.update({
    where: { id },
    data: parsed,
  });
  revalidatePath("/dashboard/contacts");
  revalidatePath(`/dashboard/contacts/${id}`);
  return org;
}

export async function deleteOrganization(id: string) {
  const session = await getServerSession(authOptions);
  if (!session || !canAccessContacts(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  await prisma.organization.delete({ where: { id } });
  revalidatePath("/dashboard/contacts");
}

export async function uploadOrganizationLogo(organizationId: string, formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session || !canAccessContacts(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  const org = await prisma.organization.findUnique({ where: { id: organizationId } });
  if (!org) throw new Error("Organisation nicht gefunden");

  const logo = formData.get("logo") as File | null;
  if (!logo || typeof logo === "string" || logo.size === 0 || !LOGO_MIME.includes(logo.type)) {
    throw new Error("Ungültiges Logo (JPEG, PNG, WebP oder SVG, max 2 MB)");
  }
  if (logo.size > LOGO_MAX_SIZE) {
    throw new Error("Logo zu gross (max 2 MB)");
  }

  const ext = logo.type === "image/svg+xml" ? ".svg" : logo.type === "image/png" ? ".png" : logo.type === "image/webp" ? ".webp" : ".jpg";
  const dir = path.join(process.cwd(), "public", "uploads", "organizations");
  await mkdir(dir, { recursive: true });
  const fileName = `${organizationId}${ext}`;
  const filePath = path.join(dir, fileName);
  const buffer = Buffer.from(await logo.arrayBuffer());
  await writeFile(filePath, buffer);
  const logoUrl = `/uploads/organizations/${fileName}`;

  await prisma.$executeRaw`UPDATE organizations SET logo_url = ${logoUrl} WHERE id = ${organizationId}`;

  revalidatePath("/dashboard/contacts");
  revalidatePath(`/dashboard/contacts/${organizationId}`);
  return logoUrl;
}
