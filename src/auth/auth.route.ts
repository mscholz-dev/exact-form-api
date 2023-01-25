import express, {
  NextFunction,
  Request,
  Response,
} from "express";
const router = express.Router();
import tryCatch from "../utils/tryCatch.js";
import AuthControllerClass from "./auth.controller.js";
import AuthMiddlewareClass from "./auth.middleware.js";

// classes
const AuthController = new AuthControllerClass();
const AuthMiddleware = new AuthMiddlewareClass();

// route: index
router.route("/").get(
  tryCatch(
    async (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => AuthMiddleware.index(req, res, next),
  ),
  tryCatch(async (req: Request, res: Response) =>
    AuthController.index(req, res),
  ),
);

export default router;
