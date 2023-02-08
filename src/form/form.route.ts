import express, {
  Request,
  Response,
  NextFunction,
} from "express";
const router = express.Router();
import tryCatch from "../utils/tryCatch.js";
import FormControllerClass from "./form.controller.js";
import AuthMiddlewareClass from "../auth/auth.middleware.js";

// classes
const FormController = new FormControllerClass();
const AuthMiddleware = new AuthMiddlewareClass();

// route: profile
router.route("/").post(
  tryCatch(
    async (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => AuthMiddleware.index(req, res, next),
  ),
  tryCatch(async (req: Request, res: Response) =>
    FormController.create(req, res),
  ),
);

export default router;
