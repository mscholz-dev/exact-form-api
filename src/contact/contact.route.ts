import express, {
  Request,
  Response,
} from "express";
const router = express.Router();
import tryCatch from "../utils/tryCatch.js";
import ContactControllerClass from "./contact.controller.js";

// classes
const ContactController =
  new ContactControllerClass();

// route: contact
router
  .route("/contact")
  .post(
    tryCatch(
      async (req: Request, res: Response) =>
        ContactController.contact(req, res),
    ),
  );

export default router;
