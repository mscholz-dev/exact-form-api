import argon from "argon2";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type Create = {
  username: string;
  email: string;
  password: string;
};

export default class UserService {
  async create({
    username,
    email,
    password,
  }: Create) {
    const hash = await argon.hash(password);

    return await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hash,
      },
    });
  }
}
