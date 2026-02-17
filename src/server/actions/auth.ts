"use server";

import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";

export async function createInitialAdmin(
  email: string,
  password: string,
  name?: string
) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error("Benutzer existiert bereits");

  const passwordHash = await hash(password, 12);
  await prisma.user.create({
    data: {
      email,
      passwordHash,
      name: name ?? "Admin",
      role: Role.ADMIN,
    },
  });
  redirect("/login");
}
