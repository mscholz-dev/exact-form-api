import { Request, Response } from "express";
import TestServiceClass from "./test.service.js";
import SeedClass from "../utils/Seed.js";

// types
import { TCookieMiddleware } from "../utils/types.js";

// classes
const TestService = new TestServiceClass();
const Seed = new SeedClass();

export default class TestController {
  async newDB(req: Request, res: Response) {
    await TestService.newDB();

    // run seeders only in dev
    if (process.env.NODE_ENV === "dev")
      await Seed.execute();

    res.status(200).end();
  }

  async getTokenEmail(
    req: Request,
    res: Response,
  ) {
    // get cookie data already validate by db call
    const userCookie: TCookieMiddleware =
      req.cookies.userJwt;

    const token = await TestService.getTokenEmail(
      userCookie.id,
    );

    res.status(200).json({ token }).end();
  }
}
