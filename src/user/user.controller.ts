import { Request, Response } from "express";

import Service from "./user.service.js";
const UserService = new Service();

import UserValidatorClass from "../validator/UserValidator.js";
const UserValidator = new UserValidatorClass();

import CookieClass from "../utils/Cookie.js";
const Cookie = new CookieClass();

export default class UserController {
  async create(req: Request, res: Response) {
    const schema = UserValidator.inspectUserData(
      req.body,
    );

    const user = await UserService.create(schema);

    const jwt = Cookie.signJwt(user);

    res
      .status(200)
      .cookie("user", jwt, Cookie.cookieOptions())
      .end();
  }
}
