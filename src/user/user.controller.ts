import { Request, Response } from "express";
import UserServiceClass from "./user.service.js";
import UserValidatorClass from "../validator/UserValidator.js";
import CookieClass from "../utils/Cookie.js";

// classes
const UserService = new UserServiceClass();
const UserValidator = new UserValidatorClass();
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
