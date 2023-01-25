import { PrismaClient } from "@prisma/client";
import AppError from "../utils/AppError.js";

// types
import { TCookie } from "../utils/type.js";

// classes
const prisma = new PrismaClient();

export default class AuthService {
  async getUserCookieData(
    email: string,
  ): Promise<TCookie | null> {
    return await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        email: true,
        username: true,
        role: true,
      },
    });
  }

  async updateUserDate(email: string) {
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        updated_at: new Date(),
      },
    });

    return;
  }
}
