"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { revalidatePath } from "next/cache";
import { Role } from "@prisma/client";
import { logAudit } from "@/lib/audit";
import { canAccessOrders } from "@/lib/permissions";
const PHOTO_MIME = ["image/jpeg", "image/png", "image/webp"];
const PHOTO_MAX_SIZE = 500 * 1024; // 500 KB (Base64 in DB – klein halten)

const ROLES: Role[] = [
  "ADMIN",
  "SALES",
  "PROJECT_LEAD",
  "FINANCE",
  "DELIVERY",
  "MANAGEMENT",
];

export async function getCurrentUserProfile() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { id: true, email: true, name: true, imageUrl: true },
    });
    return user;
  } catch {
    return {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name ?? null,
      imageUrl: null,
    };
  }
}

/** Benutzer für Account-Owner-Auswahl (gleiche Quelle wie Benutzerverwaltung) */
export async function getUsersForAccountOwner() {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Nicht angemeldet");
  if (!canAccessOrders(session.user.role)) throw new Error("Keine Berechtigung");

  return prisma.user.findMany({
    orderBy: { email: "asc" },
    select: { id: true, name: true, email: true },
  });
}

export async function getUsers() {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Nicht angemeldet");
  if (session.user.role !== "ADMIN") throw new Error("Keine Berechtigung");

  return prisma.user.findMany({
    orderBy: { email: "asc" },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
  });
}

export async function createUser(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Nicht angemeldet");
  if (session.user.role !== "ADMIN") throw new Error("Keine Berechtigung");

  const email = (formData.get("email") as string)?.trim();
  const password = formData.get("password") as string;
  const name = (formData.get("name") as string)?.trim() || null;
  const role = (formData.get("role") as Role) || "SALES";

  if (!email || !password) throw new Error("E-Mail und Passwort erforderlich");
  if (!ROLES.includes(role)) throw new Error("Ungültige Rolle");

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error("Benutzer mit dieser E-Mail existiert bereits");

  const passwordHash = await hash(password, 12);
  const user = await prisma.user.create({
    data: { email, passwordHash, name, role },
  });

  await logAudit({
    userId: session.user.id,
    action: "CREATE",
    entityType: "User",
    entityId: user.id,
    newValues: { email, role },
  });

  revalidatePath("/dashboard/settings");
  return { success: true };
}

export async function updateUser(
  id: string,
  data: { name?: string | null; role?: Role; isActive?: boolean }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Nicht angemeldet");
  if (session.user.role !== "ADMIN") throw new Error("Keine Berechtigung");

  const old = await prisma.user.findUnique({ where: { id } });
  if (!old) throw new Error("Benutzer nicht gefunden");

  await prisma.user.update({
    where: { id },
    data: {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.role && { role: data.role }),
      ...(data.isActive !== undefined && { isActive: data.isActive }),
    },
  });

  await logAudit({
    userId: session.user.id,
    action: "UPDATE",
    entityType: "User",
    entityId: id,
    oldValues: { name: old.name, role: old.role, isActive: old.isActive },
    newValues: data,
  });

  revalidatePath("/dashboard/settings");
  return { success: true };
}

export async function deleteUser(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Nicht angemeldet");
  if (session.user.role !== "ADMIN") throw new Error("Keine Berechtigung");
  if (session.user.id === id) throw new Error("Sie können sich nicht selbst löschen");

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new Error("Benutzer nicht gefunden");

  await prisma.user.delete({ where: { id } });

  await logAudit({
    userId: session.user.id,
    action: "DELETE",
    entityType: "User",
    entityId: id,
    oldValues: { email: user.email },
  });

  revalidatePath("/dashboard/settings");
  return { success: true };
}

export async function changePassword(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Nicht angemeldet");

  const userId = formData.get("userId") as string;
  const newPassword = formData.get("newPassword") as string;
  const currentPassword = formData.get("currentPassword") as string | null;

  if (!userId || !newPassword) throw new Error("Passwort erforderlich");

  const isOwnPassword = session.user.id === userId;
  if (!isOwnPassword && session.user.role !== "ADMIN") {
    throw new Error("Keine Berechtigung");
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("Benutzer nicht gefunden");

  if (isOwnPassword && currentPassword) {
    const { compare } = await import("bcryptjs");
    const valid = await compare(currentPassword, user.passwordHash);
    if (!valid) throw new Error("Aktuelles Passwort ist falsch");
  }

  const passwordHash = await hash(newPassword, 12);
  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash },
  });

  revalidatePath("/dashboard/settings");
  return { success: true };
}

export async function updateProfileImage(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Nicht angemeldet");

  const photo = formData.get("photo") as File | null;
  if (!photo || typeof photo === "string" || photo.size === 0) {
    throw new Error("Kein Bild ausgewählt");
  }
  if (!PHOTO_MIME.includes(photo.type)) {
    throw new Error("Nur JPEG, PNG oder WebP erlaubt");
  }
  if (photo.size > PHOTO_MAX_SIZE) {
    throw new Error(`Bild zu gross (max ${PHOTO_MAX_SIZE / 1024} KB)`);
  }

  const buffer = Buffer.from(await photo.arrayBuffer());
  const base64 = buffer.toString("base64");
  const mime = photo.type;
  const imageUrl = `data:${mime};base64,${base64}`;

  await prisma.user.update({
    where: { id: session.user.id },
    data: { imageUrl },
  });

  return { success: true, imageUrl };
}
