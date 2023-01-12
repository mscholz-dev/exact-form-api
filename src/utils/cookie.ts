import { CookieOptions } from "express-serve-static-core";

export const cookieOptions: CookieOptions = {
  // 8 weeks
  maxAge: 1000 * 60 * 60 * 24 * 7 * 8,
  path: "/",
  sameSite: "lax",
  secure: true,
  httpOnly: true,
  domain: process.env.BASE_URL_FRONT,
};
