import { Request, Response } from "express";
import CookieClass from "../utils/Cookie.js";
import AuthServiceClass from "./auth.service.js";

// types
import { TCookieMiddleware } from "../utils/type.js";

// classes
const Cookie = new CookieClass();
const AuthService = new AuthServiceClass();

export default class AuthController {
  async index(req: Request, res: Response) {
    // get cookie data already validate by db call
    const userCookie: TCookieMiddleware =
      req.cookies.userJwt;

    // update user cookie
    const jwt = Cookie.signJwt(userCookie);

    // TODO: session
    res
      .status(200)
      // .cookie("user", jwt, Cookie.cookieOptions())
      .json({
        email: userCookie.email,
        username: userCookie.username,
        role: userCookie.role,
      })
      .end();
  }

  async hasEmailToken(
    req: Request,
    res: Response,
  ) {
    // get cookie data already validate by db call
    const userCookie: TCookieMiddleware =
      req.cookies.userJwt;

    const token = req.params.token;

    await AuthService.hasEmailToken(
      token,
      userCookie.id,
    );

    // update user cookie
    const jwt = Cookie.signJwt(userCookie);

    res
      .status(200)
      .cookie("user", jwt, Cookie.cookieOptions())
      .json({
        email: userCookie.email,
        username: userCookie.username,
        role: userCookie.role,
      })
      .end();
  }
}
