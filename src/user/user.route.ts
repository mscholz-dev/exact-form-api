import express, {
  Request,
  Response,
} from "express";
const router = express.Router();
import multer from "multer";
const upload = multer();
import tryCatch from "../utils/tryCatch.js";
import UserControllerClass from "./user.controller.js";

// classes
const UserController = new UserControllerClass();

// route: create
router.route("/create").post(
  upload.fields([
    { name: "username", maxCount: 1 },
    { name: "email", maxCount: 1 },
    { name: "password", maxCount: 1 },
    { name: "password2", maxCount: 1 },
  ]),
  tryCatch(async (req: Request, res: Response) =>
    UserController.create(req, res),
  ),
);

// route: connect
router.route("/connect").post(
  upload.fields([
    { name: "email", maxCount: 1 },
    { name: "password", maxCount: 1 },
  ]),
  tryCatch(async (req: Request, res: Response) =>
    UserController.connect(req, res),
  ),
);

export default router;
