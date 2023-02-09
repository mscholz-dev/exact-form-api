import { PrismaClient } from "@prisma/client";

// classes
const Prisma = new PrismaClient();

export default class ErrorService {
  async create(stack: string): Promise<void> {
    await Prisma.error.create({
      data: {
        stack,
      },
    });

    return;
  }
}
