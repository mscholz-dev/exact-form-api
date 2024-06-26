import { PrismaClient } from "@prisma/client";
import AppError from "../utils/AppError.js";
import SecurityClass from "../utils/Security.js";

// types
import {
  TUserCreate,
  TUserConnect,
  TUserUpdateData,
  TUserUpdateEmailData,
} from "../utils/types.js";

// classes
const Prisma = new PrismaClient();
const Security = new SecurityClass();

export default class UserService {
  async create(
    {
      username,
      email,
      password,
      market,
    }: TUserCreate,
    ip: string,
  ) {
    const hash = await Security.createHash(
      password,
    );

    const createIpObject = ip
      ? {
          create: {
            ip,
          },
        }
      : {};

    const user = await Prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hash,
        market: market as boolean,
        user_ip: createIpObject,
      },
      select: {
        email: true,
      },
    });

    return user;
  }

  async connection(
    { email, password }: TUserConnect,
    ip: string,
  ) {
    const user = await Prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        password: true,
        user_ip: {
          select: {
            ip: true,
          },
        },
      },
    });

    if (!user)
      throw new AppError("user not found", 400);

    const passwordMatch =
      await Security.verifyHash(
        user.password,
        password,
      );

    if (!passwordMatch)
      throw new AppError(
        "password incorrect",
        400,
      );

    if (!ip) return { user, newIp: false };

    for (const item of user.user_ip) {
      if (item.ip !== ip) {
        this.addIP(user.id, ip);

        return { user, newIp: true };
      }
    }

    return { user, newIp: false };
  }

  async update(
    {
      username,
      oldPassword,
      newPassword,
      market,
    }: TUserUpdateData,
    id: string,
  ) {
    if (!oldPassword) {
      const updateUser =
        await Prisma.user.updateMany({
          where: {
            id,
            // username and market must not be equals to parameters
            NOT: {
              AND: [
                {
                  username: { equals: username },
                },
                {
                  market: {
                    equals: market as boolean,
                  },
                },
              ],
            },
          },
          data: {
            username,
            market: market as boolean,
            updated_at: new Date(),
          },
        });

      if (!updateUser.count)
        throw new AppError(
          "username or market must be different",
          400,
        );

      return;
    }

    const userPassword =
      await Prisma.user.findUnique({
        where: {
          id,
        },
        select: {
          password: true,
        },
      });

    if (!userPassword)
      throw new AppError("user not found", 400);

    const passwordMatch =
      await Security.verifyHash(
        userPassword.password,
        oldPassword,
      );

    if (!passwordMatch)
      throw new AppError(
        "oldPassword incorrect",
        400,
      );

    const hash = await Security.createHash(
      newPassword,
    );

    await Prisma.user.update({
      where: {
        id,
      },
      data: {
        username,
        password: hash,
        market: market as boolean,
      },
      select: {
        id: true,
      },
    });

    return;
  }

  async createEmailToken(
    token: string,
    id: string,
  ) {
    const userEmailToken =
      await Prisma.user_token.findMany({
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
          ],
        },
        select: {
          created_at: true,
        },
      });

    if (userEmailToken) {
      const now = new Date().getTime();
      const nowMinusOne = new Date(
        now - 60 * 60 * 24 * 1000,
      );

      for (const { created_at } of userEmailToken)
        if (nowMinusOne < created_at)
          throw new AppError(
            "token already exists",
            400,
          );
    }

    await Prisma.user_token.create({
      data: {
        user_id: id,
        type: "CHANGE_EMAIL",
        token,
        used: false,
      },
      select: {
        id: true,
      },
    });

    return;
  }

  async updateEmail(
    { newEmail, token }: TUserUpdateEmailData,
    id: string,
  ) {
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

    await Prisma.$transaction([
      Prisma.user.update({
        where: {
          id: id,
        },
        data: {
          email: newEmail,
          updated_at: new Date(),
        },
        select: {
          id: true,
        },
      }),
      Prisma.user_token.update({
        where: {
          token,
        },
        data: {
          used: true,
        },
        select: {
          id: true,
        },
      }),
    ]);

    return;
  }

  async addIP(id: string, ip: string) {
    await Prisma.user_ip.create({
      data: {
        ip,
        user_id: id,
      },
      select: { id: true },
    });
  }

  async getMarket(email: string) {
    const request = await Prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        market: true,
      },
    });

    if (!request)
      throw new AppError("user not found", 400);

    return request.market;
  }
}
