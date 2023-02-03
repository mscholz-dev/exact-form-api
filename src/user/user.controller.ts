import { Request, Response } from "express";
import UserServiceClass from "./user.service.js";
import UserValidatorClass from "../utils/validator/UserValidator.js";
import CookieClass from "../utils/Cookie.js";
import EmailClass from "../utils/email/Email.js";
import SecurityClass from "../utils/Security.js";

// types
import { TCookieMiddleware } from "../utils/type.js";

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

  async update(req: Request, res: Response) {
    // get cookie data already validate by db call
    const userCookie: TCookieMiddleware =
      req.cookies.userJwt;

    const schema =
      UserValidator.inspectUpdateData(req.body);

    await UserService.update(
      schema,
      userCookie.id,
    );

    const jwt = Cookie.signJwt({
      ...userCookie,
      username: schema.username,
    });

    res
      .status(200)
      .cookie("user", jwt, Cookie.cookieOptions())
      .end();
  }

  async createEmailToken(
    req: Request,
    res: Response,
  ) {
    // get cookie data already validate by db call
    const userCookie: TCookieMiddleware =
      req.cookies.userJwt;

    const { locale } =
      UserValidator.inspectCreateEmailTokenData(
        req.body,
      );

    const token = Security.createUUID();

    await UserService.createEmailToken(
      token,
      userCookie.id,
    );

    await Email.userCreateEmailTokenTemplate(
      userCookie.email,
      locale,
      token,
    );

    const jwt = Cookie.signJwt(userCookie);

    res
      .status(200)
      .cookie("user", jwt, Cookie.cookieOptions())
      .end();
  }

  async updateEmail(req: Request, res: Response) {
    // get cookie data already validate by db call
    const userCookie: TCookieMiddleware =
      req.cookies.userJwt;

    const schema =
      UserValidator.inspectUpdateEmailData(
        req.body,
        userCookie.email,
      );

    await UserService.updateEmail(
      schema,
      userCookie.id,
    );

    await Email.userUpdateEmailTemplate(schema);

    const jwt = Cookie.signJwt({
      ...userCookie,
      email: schema.newEmail,
    });

    res
      .status(200)
      .cookie("user", jwt, Cookie.cookieOptions())
      .end();
  }

  async disconnection(
    req: Request,
    res: Response,
  ) {
    res.status(200).clearCookie("user").end();
  }
}
