import { CookieOptions } from "express-serve-static-core";
import jwt from "jsonwebtoken";

// types
import { TCookie } from "./types.js";

export default class Cookie {
  cookieOptions(): CookieOptions {
    return {
      // 8 weeks
      maxAge: 1000 * 60 * 60 * 24 * 7 * 8,
      path: "/",
      sameSite: "lax",
      secure: true,
      httpOnly: true,
      domain: process.env.JWT_DOMAIN,
    };
  }

  // TODO: verifier le algo swap fail
  signJwt({ email }: TCookie) {
    return jwt.sign(
      JSON.stringify({
        email,
      }),
      process.env.JWT_SECRET as string,
      {},
    );
  }

  verifyJwt(cookie: string): boolean {
    let isValid = true;

    jwt.verify(
      cookie,
      process.env.JWT_SECRET as string,
      (err) => (isValid = !err),
    );

    return isValid;
  }

  decodedJwt(cookie: string): TCookie {
    let decoded = {};

    jwt.verify(
      cookie,
      process.env.JWT_SECRET as string,
      (__, data) => (decoded = data as TCookie),
    );

    return decoded as TCookie;
  }
}
