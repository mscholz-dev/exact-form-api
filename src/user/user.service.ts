import argon from "argon2";
import { PrismaClient } from "@prisma/client";
import ip from "ip";
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
  async create({
    username,
    email,
    password,
  }: TUserCreate) {
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

    await this.addIP(user.id);

    return user;
  }

  async connect({
    email,
    password,
    locale,
  }: TUserConnect) {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
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

    const isNewIP = await this.verifyIP(user.id);

    console.log("isNewIPi", isNewIP);

    if (isNewIP) {
      await this.addIP(user.id);

      await Email.newIP({
        email: user.email,
        locale,
      });
    }

    return user;
  }

  async addIP(id: string) {
    await prisma.user_ip.create({
      data: {
        number: ip.address() as string,
        user_id: id,
      },
      select: { id: true },
    });
    console.log("add ip", ip.address());
  }

  async verifyIP(id: string) {
    console.log("verif ip", ip.address());

    const allIP = await prisma.user_ip.findMany({
      where: { user_id: id },
      select: { number: true },
    });

    const iP = ip.address();

    for (const { number } of allIP) {
      if (number === iP) return false;
    }

    return true;
  }
}
