import { Request, Response } from "express";
import ContactValidatorClass from "../utils/validators/ContactValidator.js";
import EmailClass from "../utils/email/Email.js";
import ContactServiceClass from "./contact.service.js";

// classes
const ContactValidator =
  new ContactValidatorClass();
const Email = new EmailClass();
const ContactService = new ContactServiceClass();

export default class ContactController {
  async create(req: Request, res: Response) {
    const schema =
      ContactValidator.inspectContactData(
        req.body,
      );

    await ContactService.create(schema);

    await Email.contactCreateTemplate(schema);

    res.status(200).end();
  }
}
