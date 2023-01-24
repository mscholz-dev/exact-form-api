import { Request, Response } from "express";
import UserServiceClass from "./user.service.js";
import UserValidatorClass from "../utils/validator/UserValidator.js";
import CookieClass from "../utils/Cookie.js";
import EmailClass from "../utils/email/Email.js";
import SecurityClass from "../utils/Security.js";

// classes
const UserService = new UserServiceClass();
const UserValidator = new UserValidatorClass();
const Cookie = new CookieClass();
const Email = new EmailClass();
const Security = new SecurityClass();

export default class UserController {
  async create(req: Request, res: Response) {
    const ip = Security.getIP(req);

    const schema =
      UserValidator.inspectCreateData(req.body);

    const user = await UserService.create(
      schema,
      ip,
    );

    await Email.userCreateTemplate(schema);

    const jwt = Cookie.signJwt({
      ...user,
      role: "CLIENT",
    });

    res
      .status(200)
      .cookie("user", jwt, Cookie.cookieOptions())
      .end();
  }

  async connection(req: Request, res: Response) {
    const ip = Security.getIP(req);

    const schema =
      UserValidator.inspectConnectionData(
        req.body,
      );

    const user = await UserService.connection(
      schema,
      ip,
    );

    const jwt = Cookie.signJwt(user);

    res
      .status(200)
      .cookie("user", jwt, Cookie.cookieOptions())
      .end();
  }
}
