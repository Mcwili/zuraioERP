import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.user.findFirst();
  if (existing) {
    console.log("Admin bereits vorhanden.");
    return;
  }

  const passwordHash = await hash("Admin123!@#", 12);
  await prisma.user.create({
    data: {
      email: "admin@zuraio.local",
      passwordHash,
      name: "Admin",
      role: "ADMIN",
    },
  });
  console.log("Admin-Benutzer erstellt: admin@zuraio.local / Admin123!@#");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
