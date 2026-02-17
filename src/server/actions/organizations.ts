"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { canAccessContacts } from "@/lib/permissions";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { OrganizationType } from "@prisma/client";

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
