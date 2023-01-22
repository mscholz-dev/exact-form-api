import { Request, Response } from "express";
import ContactValidatorClass from "../utils/validator/ContactValidator.js";
import EmailClass from "../utils/email/Email.js";
import ContactServiceClass from "./contact.service.js";

// classes
const ContactValidator =
  new ContactValidatorClass();
const Email = new EmailClass();
const ContactService = new ContactServiceClass();

export default class ContactController {
  async contact(req: Request, res: Response) {
    const schema =
      ContactValidator.inspectContactData(
        req.body,
      );

    await ContactService.contact(schema);

    await Email.contactTemplate(schema);

    res.status(200).end();
  }
}
