import { PrismaClient } from "@prisma/client";

// classes
const prisma = new PrismaClient();

export default class TestService {
  async reset() {
    await prisma.user_ip.deleteMany();
    await prisma.user.deleteMany();
  }
}
