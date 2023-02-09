import { PrismaClient } from "@prisma/client";
import AppError from "../utils/AppError.js";

// types
import { TCookieMiddleware } from "../utils/types.js";

// classes
const Prisma = new PrismaClient();

export default class AuthService {
  async getUserCookieData(
    email: string,
  ): Promise<TCookieMiddleware | null> {
    return await Prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
      },
    });
  }

  async updateUserDate(email: string) {
    await Prisma.user.update({
      where: {
        email,
      },
      data: {
        updated_at: new Date(),
      },
    });

    return;
  }

  async hasEmailToken(token: string, id: string) {
    const now = new Date().getTime();
    const nowMinusOne = new Date(
      now - 60 * 60 * 24 * 1000,
    );

    const userEmailToken =
      await Prisma.user_token.findFirst({
        where: {
          AND: [
            {
              user_id: id,
            },
            {
              type: "CHANGE_EMAIL",
            },
            {
              used: false,
            },
            {
              token,
            },
            {
              created_at: {
                gt: nowMinusOne,
              },
            },
          ],
        },
        select: {
          id: true,
        },
      });

    if (!userEmailToken)
      throw new AppError("token not found", 400);

    return;
  }
}
