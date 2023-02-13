import { PrismaClient } from "@prisma/client";
import AppError from "../utils/AppError.js";

// classes
const Prisma = new PrismaClient();

export default class TestService {
  async newDB() {
    await Prisma.$transaction([
      Prisma.form_item.deleteMany(),
      Prisma.form_user.deleteMany(),
      Prisma.form.deleteMany(),
      Prisma.user_token.deleteMany(),
      Prisma.user_ip.deleteMany(),
      Prisma.user.deleteMany(),
      Prisma.contact_phone.deleteMany(),
      Prisma.contact.deleteMany(),
      Prisma.error.deleteMany(),
    ]);
  }

  async getTokenEmail(id: string) {
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
