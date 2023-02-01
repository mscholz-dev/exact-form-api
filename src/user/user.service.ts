import argon from "argon2";
import { PrismaClient } from "@prisma/client";
import EmailClass from "../utils/email/Email.js";

// types
import {
  TUserCreate,
  TUserConnect,
  TUserUpdateData,
  TUserUpdateEmailData,
} from "../utils/type.js";
import AppError from "../utils/AppError.js";

// classes
const prisma = new PrismaClient();
const Email = new EmailClass();

export default class UserService {
  async create(
    { username, email, password }: TUserCreate,
    ip: string,
  ) {
    const hash = await argon.hash(password);

    const createIpObject = ip
      ? {
          create: {
            ip,
          },
        }
      : {};

    const user = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hash,
        user_ip: createIpObject,
      },
      select: {
        email: true,
        username: true,
      },
    });

    return user;
  }

  async connection(
    { email, password, locale }: TUserConnect,
    ip: string,
  ) {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
        role: true,
        user_ip: {
          select: {
            ip: true,
          },
        },
      },
    });

    if (!user)
      throw new AppError("user not found", 400);

    const passwordMatch = await argon.verify(
      user.password,
      password,
    );

    if (!passwordMatch)
      throw new AppError(
        "password incorrect",
        400,
      );

    console.log(user);

    if (ip) {
      const isNewIP = await this.verifyIP(
        user.id,
        ip,
      );

      if (isNewIP) {
        this.addIP(user.id, ip);

        await Email.userNewIp(
          {
            email,
            locale,
          },
          ip,
        );
      }
    }

    return user;
  }

  async update(
    {
      username,
      oldPassword,
      newPassword,
    }: TUserUpdateData,
    id: string,
  ) {
    if (!oldPassword) {
      await prisma.user.update({
        where: {
          id,
        },
        data: {
          username,
        },
        select: {
          id: true,
        },
      });

      return;
    }

    const userPassword =
      await prisma.user.findUnique({
        where: {
          id,
        },
        select: {
          password: true,
        },
      });

    if (!userPassword)
      throw new AppError("user not found", 400);

    const passwordMatch = await argon.verify(
      userPassword.password,
      oldPassword,
    );

    if (!passwordMatch)
      throw new AppError(
        "oldPassword incorrect",
        400,
      );

    const hash = await argon.hash(newPassword);

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        username,
        password: hash,
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
      await prisma.user_token.findMany({
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

    await prisma.user_token.create({
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
      await prisma.user_token.findFirst({
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

    await prisma.user_token.update({
      where: {
        token,
      },
      data: {
        used: true,
      },
      select: {
        id: true,
      },
    });

    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        email: newEmail,
      },
      select: {
        id: true,
      },
    });

    return;
  }

  async addIP(id: string, ip: string) {
    await prisma.user_ip.create({
      data: {
        ip,
        user_id: id,
      },
      select: { id: true },
    });
  }

  async verifyIP(id: string, ip: string) {
    const allIP = await prisma.user_ip.findMany({
      where: { user_id: id },
      select: { ip: true },
    });

    for (const item of allIP) {
      if (item.ip === ip) return false;
    }

    return true;
  }
}
