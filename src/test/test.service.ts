import { PrismaClient } from "@prisma/client";
import AppError from "../utils/AppError.js";

// classes
const prisma = new PrismaClient();

export default class TestService {
  async newDB() {
    // delete users
    await prisma.user_token.deleteMany();
    await prisma.user_ip.deleteMany();
    await prisma.user.deleteMany();

    // delete contact
    await prisma.contact_phone.deleteMany();
    await prisma.contact.deleteMany();
  }

  async getTokenEmail(email: string) {
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

    const now = new Date().getTime();
    const nowMinusOne = new Date(
      now - 60 * 60 * 24 * 1000,
    );

    const userEmailToken =
      await prisma.user_token.findFirst({
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
              created_at: {
                gt: nowMinusOne,
              },
            },
          ],
        },
        select: {
          token: true,
        },
      });

    if (!userEmailToken)
      throw new AppError("token not found", 400);

    return userEmailToken.token;
  }
}
