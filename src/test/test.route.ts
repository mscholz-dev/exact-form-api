import express, {
  Request,
  Response,
  NextFunction,
} from "express";
const router = express.Router();
import tryCatch from "../utils/tryCatch.js";
import TestControllerClass from "./test.controller.js";
import AuthMiddlewareClass from "../auth/auth.middleware.js";

// classes
const TestController = new TestControllerClass();
const AuthMiddleware = new AuthMiddlewareClass();

// route: new-db
router
  .route("/new-db")
  .get(
    tryCatch(
      async (req: Request, res: Response) =>
        TestController.newDB(req, res),
    ),
  );

// route: get email token
router.route("/user/token/email").get(
  tryCatch(
    async (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => AuthMiddleware.index(req, res, next),
  ),
  tryCatch(async (req: Request, res: Response) =>
    TestController.getTokenEmail(req, res),
  ),
);

export default router;
