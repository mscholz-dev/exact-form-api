import { CookieOptions } from "express-serve-static-core";
import AppError from "./AppError.js";
import jwt from "jsonwebtoken";

type SignJwt = {
  username: string;
  email: string;
};

export default class Cookie {
  cookieOptions(): CookieOptions {
    return {
      // 8 weeks
      maxAge: 1000 * 60 * 60 * 24 * 7 * 8,
      path: "/",
      sameSite: "lax",
      secure: true,
      httpOnly: true,
      domain: process.env.BASE_URL_FRONT,
    };
  }

  signJwt({ username, email }: SignJwt) {
    if (!process.env.JWT_SECRET)
      throw new AppError(
        "process.env.JWT_SECRET not defined",
        400,
      );

    return jwt.sign(
      JSON.stringify({
        username,
        email,
      }),
      process.env.JWT_SECRET,
      {},
    );
  }
}
