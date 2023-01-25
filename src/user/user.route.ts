import express, {
  Request,
  Response,
} from "express";
const router = express.Router();
import tryCatch from "../utils/tryCatch.js";
import UserControllerClass from "./user.controller.js";

// classes
const UserController = new UserControllerClass();

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

export default router;
