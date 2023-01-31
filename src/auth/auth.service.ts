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

  async hasEmailToken(
    token: string,
    email: string,
  ) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });

    if (!user)
      throw new AppError("user not found", 400);

    const userEmailToken =
      await prisma.user_token.findMany({
        where: {
          AND: [
            {
              user_id: user.id,
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
          ],
        },
        select: {
          created_at: true,
        },
      });

    if (!userEmailToken)
      throw new AppError("token not found", 400);

    const now = new Date().getTime();
    const nowMinusOne = new Date(
      now - 60 * 60 * 24 * 1000,
    );

    // is valid
    for (const { created_at } of userEmailToken)
      if (nowMinusOne < created_at) return;

    // no one is valid
    throw new AppError("token not found", 400);
  }
}
