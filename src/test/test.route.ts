import express, {
  Request,
  Response,
} from "express";
const router = express.Router();
import tryCatch from "../utils/tryCatch.js";
import TestControllerClass from "./test.controller.js";

// classes
const TestController = new TestControllerClass();

// route: reset
router
  .route("/reset")
  .post(
    tryCatch(
      async (req: Request, res: Response) =>
        TestController.reset(req, res),
    ),
  );

export default router;
