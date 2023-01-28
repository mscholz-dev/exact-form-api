import express, {
  Request,
  Response,
  NextFunction,
} from "express";
const router = express.Router();
import tryCatch from "../utils/tryCatch.js";
import UserControllerClass from "./user.controller.js";
import AuthMiddlewareClass from "../auth/auth.middleware.js";

// classes
const UserController = new UserControllerClass();
const AuthMiddleware = new AuthMiddlewareClass();

// route: create
router
  .route("/")
  .post(
    tryCatch(
      async (req: Request, res: Response) =>
        UserController.create(req, res),
    ),
  );

// route: connection
router
  .route("/connection")
  .post(
    tryCatch(
      async (req: Request, res: Response) =>
        UserController.connection(req, res),
    ),
  );

// route: update
// add middleware id user
router.route("/").put(
  tryCatch(
    async (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => AuthMiddleware.index(req, res, next),
  ),
  tryCatch(async (req: Request, res: Response) =>
    UserController.update(req, res),
  ),
);

export default router;
