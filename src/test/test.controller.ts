import { Request, Response } from "express";
import TestServiceClass from "./test.service.js";

// types
import { TCookieMiddleware } from "../utils/type.js";

// classes
const TestService = new TestServiceClass();

export default class TestController {
  async newDB(req: Request, res: Response) {
    await TestService.newDB();

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
