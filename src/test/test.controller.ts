import { Request, Response } from "express";
import TestServiceClass from "./test.service.js";

// classes
const TestService = new TestServiceClass();

export default class TestController {
  async reset(req: Request, res: Response) {
    await TestService.reset();

    res.status(200).end();
  }
}
