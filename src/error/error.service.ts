import { PrismaClient } from "@prisma/client";

// classes
const prisma = new PrismaClient();

export default class ErrorService {
  async create(stack: string): Promise<void> {
    await prisma.error.create({
      data: {
        stack,
      },
    });

    return;
  }
}
