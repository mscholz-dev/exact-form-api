import { PrismaClient } from "@prisma/client";

// classes
const prisma = new PrismaClient();

export default class TestService {
  async reset() {
    // delete users
    await prisma.user_ip.deleteMany();
    await prisma.user.deleteMany();

    // delete contact
    await prisma.contact_phone.deleteMany();
    await prisma.contact.deleteMany();
  }
}
