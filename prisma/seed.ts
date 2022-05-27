import * as bcrypt from 'bcrypt';

import { PrismaClient } from '@prisma/client';
import { users } from './users';

const prisma = new PrismaClient();

async function main() {
  await prisma.users.deleteMany();
  users.forEach(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await prisma.users.create({
      data: {
        ...user,
        password: hashedPassword,
      },
    });
  });
  await prisma.$disconnect();
}

main().catch((e) => {
  console.log(e);
  process.exit(1);
});
