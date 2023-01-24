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

// import multer from "multer";
// const upload = multer();
//
// upload.fields([
//   { name: "username", maxCount: 1 },
//   { name: "email", maxCount: 1 },
//   { name: "password", maxCount: 1 },
//   { name: "password2", maxCount: 1 },
// ]),
