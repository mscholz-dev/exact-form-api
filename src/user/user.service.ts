import argon from "argon2";
import { PrismaClient } from "@prisma/client";

// types
import { TUserCreate } from "src/validator/type";

// classes
const prisma = new PrismaClient();

export default class UserService {
  async create({
    username,
    email,
    password,
  }: TUserCreate) {
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
