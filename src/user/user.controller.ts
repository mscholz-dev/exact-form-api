import { Request, Response } from "express";
import UserServiceClass from "./user.service.js";
import UserValidatorClass from "../utils/validator/UserValidator.js";
import CookieClass from "../utils/cookie.js";

// classes
const UserService = new UserServiceClass();
const UserValidator = new UserValidatorClass();
const Cookie = new CookieClass();

export default class UserController {
  async create(req: Request, res: Response) {
    const schema =
      UserValidator.inspectCreateData(req.body);

    const user = await UserService.create(schema);

    const jwt = Cookie.signJwt(user);

    res
      .status(200)
      .cookie("user", jwt, Cookie.cookieOptions())
      .end();
  }

  async connect(req: Request, res: Response) {
    const schema =
      UserValidator.inspectConnectData(req.body);

    const user = await UserService.connect(
      schema,
    );

    const jwt = Cookie.signJwt(user);

    res
      .status(200)
      .cookie("user", jwt, Cookie.cookieOptions())
      .end();
  }
}
