import { Request, Response } from "express";
import CookieClass from "../utils/Cookie.js";

// types
import { TCookie } from "../utils/type.js";

// classes
const Cookie = new CookieClass();

export default class AuthController {
  async index(req: Request, res: Response) {
    // get cookie data already validate by db call
    const userCookie: TCookie =
      req.cookies.userJwt;

    // update user cookie
    const jwt = Cookie.signJwt(userCookie);

    res
      .status(200)
      .cookie("user", jwt, Cookie.cookieOptions())
      .json(userCookie)
      .end();
  }
}
