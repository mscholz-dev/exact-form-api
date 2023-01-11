import express, {
  Request,
  Response,
} from "express";
const router = express.Router();
import tryCatch from "../utils/tryCatch.js";
import multer from "multer";
const upload = multer();

import Controller from "./user.controller.js";
const UserController = new Controller();

// create
router.route("/").post(
  upload.array(
    "username",
    "email",
    "password",
    "password2",
  ),
  tryCatch(async (req: Request, res: Response) =>
    UserController.createUser(req, res),
  ),
);

export default router;
