import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import cuid from "cuid";

async function main() {
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
