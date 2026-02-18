import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const usersToCreate = [
    {
      email: "admin@zuraio.local",
      password: "Admin123!@#",
      name: "Admin",
      role: "ADMIN" as const,
    },
    {
      email: "michael.wili@zuraio.ch",
      password: "ImSand11",
      name: "Michael Wili",
      role: "ADMIN" as const,
    },
  ];

  for (const u of usersToCreate) {
    const existing = await prisma.user.findUnique({ where: { email: u.email } });
    if (existing) {
      console.log(`Benutzer ${u.email} bereits vorhanden.`);
      continue;
    }
    const passwordHash = await hash(u.password, 12);
    await prisma.user.create({
      data: {
        email: u.email,
        passwordHash,
        name: u.name,
        role: u.role,
      },
    });
    console.log(`Benutzer erstellt: ${u.email}`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
