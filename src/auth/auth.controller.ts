import { Request, Response } from "express";
import CookieClass from "../utils/Cookie.js";
import AuthServiceClass from "./auth.service.js";

// types
import { TCookie } from "../utils/type.js";
import AppError from "../utils/AppError.js";

// classes
const Cookie = new CookieClass();
const AuthService = new AuthServiceClass();

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

  async hasEmailToken(
    req: Request,
    res: Response,
  ) {
    // get cookie data already validate by db call
    const userCookie: TCookie =
      req.cookies.userJwt;

    const token = req.params.token;

    await AuthService.hasEmailToken(
      token,
      userCookie.email,
    );

    // update user cookie
    const jwt = Cookie.signJwt(userCookie);

    res
      .status(200)
      .cookie("user", jwt, Cookie.cookieOptions())
      .json(userCookie)
      .end();
  }
}
