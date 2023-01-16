import express, {
  Request,
  Response,
} from "express";
const router = express.Router();
import multer from "multer";
const upload = multer();
import tryCatch from "../utils/tryCatch.js";
import ContactControllerClass from "./contact.controller.js";

// classes
const ContactController =
  new ContactControllerClass();

// route: contact
router.route("/contact").post(
  upload.fields([
    { name: "lastName", maxCount: 1 },
    { name: "firstName", maxCount: 1 },
    { name: "email", maxCount: 1 },
    { name: "phone", maxCount: 1 },
    { name: "message", maxCount: 1 },
  ]),
  tryCatch(async (req: Request, res: Response) =>
    ContactController.contact(req, res),
  ),
);

export default router;
