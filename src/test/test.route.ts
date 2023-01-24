import express, {
  Request,
  Response,
} from "express";
const router = express.Router();
import tryCatch from "../utils/tryCatch.js";
import TestControllerClass from "./test.controller.js";

// classes
const TestController = new TestControllerClass();

// route: new-db
router
  .route("/new-db")
  .get(
    tryCatch(
      async (req: Request, res: Response) =>
        TestController.newDB(req, res),
    ),
  );

export default router;
