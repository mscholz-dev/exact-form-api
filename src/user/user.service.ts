import argon from "argon2";
import { PrismaClient } from "@prisma/client";

// types
import {
  TUserCreate,
  TUserConnect,
} from "../utils/type.js";
import AppError from "../utils/AppError.js";

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
      select: {
        email: true,
        username: true,
      },
    });
  }

  async connect({
    email,
    password,
  }: TUserConnect) {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
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

    return user;
  }
}
