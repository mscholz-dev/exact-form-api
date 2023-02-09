import { Request, Response } from "express";
import FormServiceClass from "./form.service.js";
import FormValidatorClass from "../utils/validators/FormValidator.js";
import CookieClass from "../utils/Cookie.js";
import EmailClass from "../utils/email/Email.js";

// types
import { TCookieMiddleware } from "../utils/types.js";

// classes
const FormService = new FormServiceClass();
const FormValidator = new FormValidatorClass();
const Cookie = new CookieClass();
const Email = new EmailClass();

export default class FormController {
  async create(req: Request, res: Response) {
    // get cookie data already validate by db call
    const userCookie: TCookieMiddleware =
      req.cookies.userJwt;

    const schema =
      FormValidator.inspectCreateData(req.body);

    await FormService.create(
      schema,
      userCookie.id,
    );

    const jwt = Cookie.signJwt(userCookie);

    res
      .status(200)
      .cookie("user", jwt, Cookie.cookieOptions())
      .end();

    // send email after request
    await Email.formCreateTemplate(
      schema,
      userCookie.email,
    );
  }

  async getAll(req: Request, res: Response) {
    // get cookie data already validate by db call
    const userCookie: TCookieMiddleware =
      req.cookies.userJwt;

    const forms = await FormService.getAll(
      userCookie.id,
    );

    const jwt = Cookie.signJwt(userCookie);

    res
      .status(200)
      .cookie("user", jwt, Cookie.cookieOptions())
      .json({
        forms,
        username: userCookie.username,
        email: userCookie.email,
        role: userCookie.role,
      })
      .end();
  }
}
