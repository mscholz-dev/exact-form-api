import { Request, Response } from "express";
import FormServiceClass from "./form.service.js";
import FormValidatorClass from "../utils/validators/FormValidator.js";
import CookieClass from "../utils/Cookie.js";
import EmailClass from "../utils/email/Email.js";

// types
import {
  TCookieMiddleware,
  TFormGetAllQuery,
} from "../utils/types.js";

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

    const { page } =
      FormValidator.inspectGetAllData(
        req.query as TFormGetAllQuery,
      );

    const data = await FormService.getAll(
      userCookie.id,
      Number(page),
    );

    const jwt = Cookie.signJwt(userCookie);

    res
      .status(200)
      .cookie("user", jwt, Cookie.cookieOptions())
      .json({
        forms: data.forms,
        countAll: data.countAll,
        username: userCookie.username,
        email: userCookie.email,
        role: userCookie.role,
      })
      .end();
  }

  async createItem(req: Request, res: Response) {
    const schema =
      FormValidator.inspectCreateItemData(
        req.params.key,
        req.body,
      );

    await FormService.createItem(schema);

    res.status(200).end();
  }

  async getSpecificForm(
    req: Request,
    res: Response,
  ) {
    // get cookie data already validate by db call
    const userCookie: TCookieMiddleware =
      req.cookies.userJwt;

    const schema =
      FormValidator.inspectGetSpecificForm(
        req.params.key,
        req.query,
      );

    const data =
      await FormService.getSpecificForm(
        schema.key,
        Number(schema.page),
      );

    const jwt = Cookie.signJwt(userCookie);

    res
      .status(200)
      .cookie("user", jwt, Cookie.cookieOptions())
      .json({
        name: data.name,
        items: data.items,
        countAll: data.countAll,
        username: userCookie.username,
        email: userCookie.email,
        role: userCookie.role,
      })
      .end();
  }
}
