import AppError from "../utils/AppError.js";
import errorCode from "../utils/errorCode.js";
import argon from "argon2";
import userModel from "./user.model.js";

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

    // unique username and email
    const userAlreadyExist =
      await userModel.findOne(
        {
          $or: [
            { username: username },
            { email: email },
          ],
        },
        {
          username: 1,
          email: 1,
        },
      );

    if (userAlreadyExist) {
      if (
        userAlreadyExist.username === username &&
        userAlreadyExist.email === email
      )
        throw new AppError(
          errorCode.TEST,
          "username and email already exist",
          400,
        );

      if (userAlreadyExist.username === username)
        throw new AppError(
          errorCode.TEST,
          "username already exists",
          400,
        );

      throw new AppError(
        errorCode.TEST,
        "email already exists",
        400,
      );
    }

    return await userModel.create({
      username: username,
      email: email,
      password: hash,
    });
  }
}
