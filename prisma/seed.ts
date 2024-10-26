// prisma/seed.ts
import { PrismaClient, UserRole } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Hapus data yang ada (optional)
  await prisma.user.deleteMany({
    where: {
      email: "ardiman@umkendari.ac.id",
    },
  });

  const hashedPassword = await hash("Ardiman123_", 10);

  // Create admin user
  const admin = await prisma.user.upsert({
    where: {
      email: "ardiman@umkendari.ac.id",
    },
    update: {},
    create: {
      email: "ardiman@umkendari.ac.id",
      name: "Ardiman",
      username: "ardian",
      password: hashedPassword,
      role: UserRole.ADMIN,
    },
  });

  console.log({ admin });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
