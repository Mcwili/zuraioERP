"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { canAccessContacts } from "@/lib/permissions";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { AddressType } from "@prisma/client";

const addressSchema = z.object({
  organizationId: z.string().min(1),
  type: z.enum(["INVOICE", "DELIVERY", "HEADQUARTERS"]),
  street: z.string().optional(),
  postalCode: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
});

export async function listAddresses(organizationId: string) {
  const session = await getServerSession(authOptions);
  if (!session || !canAccessContacts(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  return prisma.address.findMany({
    where: { organizationId },
    orderBy: { type: "asc" },
  });
}

export async function createAddress(data: z.infer<typeof addressSchema>) {
  const session = await getServerSession(authOptions);
  if (!session || !canAccessContacts(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  const parsed = addressSchema.parse(data);
  const address = await prisma.address.create({
    data: {
      organizationId: parsed.organizationId,
      type: parsed.type as AddressType,
      street: parsed.street ?? null,
      postalCode: parsed.postalCode ?? null,
      city: parsed.city ?? null,
      country: parsed.country ?? "CH",
    },
  });
  revalidatePath("/dashboard/contacts");
  revalidatePath(`/dashboard/contacts/${parsed.organizationId}`);
  return address;
}

export async function updateAddress(
  id: string,
  data: Partial<z.infer<typeof addressSchema>>
) {
  const session = await getServerSession(authOptions);
  if (!session || !canAccessContacts(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  const parsed = addressSchema.partial().parse(data);
  const address = await prisma.address.update({
    where: { id },
    data: parsed,
  });
  revalidatePath("/dashboard/contacts");
  revalidatePath(`/dashboard/contacts/${address.organizationId}`);
  return address;
}

export async function deleteAddress(id: string) {
  const session = await getServerSession(authOptions);
  if (!session || !canAccessContacts(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  const address = await prisma.address.findUnique({ where: { id } });
  await prisma.address.delete({ where: { id } });
  if (address) {
    revalidatePath(`/dashboard/contacts/${address.organizationId}`);
  }
  revalidatePath("/dashboard/contacts");
}
