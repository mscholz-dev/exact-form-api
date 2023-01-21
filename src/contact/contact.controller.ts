import { Request, Response } from "express";
import ContactValidatorClass from "../utils/validator/ContactValidator.js";
import EmailClass from "../utils/email/Email.js";

// classes
const ContactValidator =
  new ContactValidatorClass();
const Email = new EmailClass();

export default class ContactController {
  async contact(req: Request, res: Response) {
    const schema =
      ContactValidator.inspectContactData(
        req.body,
      );

    await Email.contactTemplate(schema);

    res.status(200).end();
  }
}
