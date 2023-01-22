import {
  NextFunction,
  Request,
  Response,
} from "express";
import AppError from "../utils/AppError.js";
import CookieClass from "../utils/Cookie.js";

// classes
const Cookie = new CookieClass();

export default class AuthMiddleware {
  async index(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const userCookie = req.cookies.user;

    if (!userCookie)
      return res.status(200).json({
        isAuth: false,
        reason: "user cookie not found",
      });

    // TODO: here

    next();
  }
}
