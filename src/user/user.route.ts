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

// route: create email token
router.route("/email").post(
  tryCatch(
    async (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => AuthMiddleware.index(req, res, next),
  ),
  tryCatch(async (req: Request, res: Response) =>
    UserController.createEmailToken(req, res),
  ),
);

export default router;
