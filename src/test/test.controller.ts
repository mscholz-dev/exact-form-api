import { Request, Response } from "express";
import TestServiceClass from "./test.service.js";

// classes
const TestService = new TestServiceClass();

export default class TestController {
  async newDB(req: Request, res: Response) {
    await TestService.newDB();

    res.status(200).end();
  }
}
