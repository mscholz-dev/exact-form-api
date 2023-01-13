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

    return await userModel.create({
      username: username,
      email: email,
      password: hash,
    });
  }
}
