import argon from "argon2";
import { PrismaClient } from "@prisma/client";
import EmailClass from "../utils/email/Email.js";

// types
import {
  TUserCreate,
  TUserConnect,
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

    const user = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hash,
      },
      select: {
        id: true,
        email: true,
        username: true,
      },
    });

    if (ip) await this.addIP(user.id, ip);

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
