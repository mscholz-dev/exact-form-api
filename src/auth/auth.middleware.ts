import {
  NextFunction,
  Request,
  Response,
} from "express";
import AppError from "../utils/AppError.js";
import CookieClass from "../utils/Cookie.js";
import AuthServiceClass from "./auth.service.js";

// classes
const Cookie = new CookieClass();
const AuthService = new AuthServiceClass();

export default class AuthMiddleware {
  async index(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const userCookie = req.cookies.user;

    console.log("AUTH MIDDLEWARE", req.cookies);

    // no user cookie
    if (!userCookie)
      throw new AppError(
        "user cookie not found",
        401,
      );

    // cookie invalid
    if (!Cookie.verifyJwt(userCookie))
      throw new AppError(
        "user cookie invalid",
        401,
      );

    // get cookie data
    const { email } =
      Cookie.decodedJwt(userCookie);

    // user data in db
    const user =
      await AuthService.getUserCookieData(email);

    // user not found
    if (!user)
      throw new AppError("user not found", 401);

    // other route controllers can access to it
    req.cookies.userJwt = user;

    // update updated_at in db
    await AuthService.updateUserDate(email);

    next();
  }
}
