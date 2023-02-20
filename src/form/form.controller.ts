import { Request, Response } from "express";
import FormServiceClass from "./form.service.js";
import FormValidatorClass from "../utils/validators/FormValidator.js";
import CookieClass from "../utils/Cookie.js";
import EmailClass from "../utils/email/Email.js";

// types
import {
  TCookieMiddleware,
  TFormDeleteItemData,
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

    const { page, trash } =
      FormValidator.inspectGetAllData(
        req.query as TFormGetAllQuery,
      );

    const data = await FormService.getAll(
      userCookie.id,
      Number(page),
      trash as boolean,
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

    await FormService.createItem(req, schema);

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
        schema.trash,
      );

    const jwt = Cookie.signJwt(userCookie);

    res
      .status(200)
      .cookie("user", jwt, Cookie.cookieOptions())
      .json({
        name: data.name,
        timezone: data.timezone,
        items: data.items,
        countAll: data.countAll,
        username: userCookie.username,
        email: userCookie.email,
        role: userCookie.role,
      })
      .end();
  }

  async deleteItem(req: Request, res: Response) {
    // get cookie data already validate by db call
    const userCookie: TCookieMiddleware =
      req.cookies.userJwt;

    const schema =
      FormValidator.inspectDeleteItemData(
        req.params as TFormDeleteItemData,
        req.query.trash as string,
      );

    await FormService.deleteItem(
      schema,
      userCookie.id,
    );

    const jwt = Cookie.signJwt(userCookie);

    res
      .status(200)
      .cookie("user", jwt, Cookie.cookieOptions())
      .end();
  }

  async deleteManyItem(
    req: Request,
    res: Response,
  ) {
    // get cookie data already validate by db call
    const userCookie: TCookieMiddleware =
      req.cookies.userJwt;

    const schema =
      FormValidator.inspectDeleteManyItemData(
        req.params.key,
        req.query as { trash: string },
      );

    await FormService.deleteManyItem(
      schema,
      userCookie.id,
    );

    const jwt = Cookie.signJwt(userCookie);

    res
      .status(200)
      .cookie("user", jwt, Cookie.cookieOptions())
      .end();
  }

  async editItem(req: Request, res: Response) {
    // get cookie data already validate by db call
    const userCookie: TCookieMiddleware =
      req.cookies.userJwt;

    const schema =
      FormValidator.inspectEditItemData(
        req.params.key,
        req.params.id,
        req.body,
      );

    await FormService.editItem(
      schema,
      userCookie.id,
    );

    const jwt = Cookie.signJwt(userCookie);

    res
      .status(200)
      .cookie("user", jwt, Cookie.cookieOptions())
      .end();
  }

  async deleteForm(req: Request, res: Response) {
    // get cookie data already validate by db call
    const userCookie: TCookieMiddleware =
      req.cookies.userJwt;

    const { key } =
      FormValidator.inspectDeleteFormData(
        req.params.key,
      );

    await FormService.deleteForm(
      key,
      userCookie.id,
    );

    const jwt = Cookie.signJwt(userCookie);

    res
      .status(200)
      .cookie("user", jwt, Cookie.cookieOptions())
      .end();
  }

  async updateForm(req: Request, res: Response) {
    // get cookie data already validate by db call
    const userCookie: TCookieMiddleware =
      req.cookies.userJwt;

    const schema =
      FormValidator.inspectUpdateFormData(
        req.params.key,
        req.body,
      );

    await FormService.updateForm(
      schema,
      userCookie.id,
    );

    const jwt = Cookie.signJwt(userCookie);

    res
      .status(200)
      .cookie("user", jwt, Cookie.cookieOptions())
      .end();
  }

  async recoverItem(req: Request, res: Response) {
    // get cookie data already validate by db call
    const userCookie: TCookieMiddleware =
      req.cookies.userJwt;

    const schema =
      FormValidator.inspectRecoverItemData(
        req.params,
      );

    await FormService.recoverItem(
      schema.key,
      schema.id,
      userCookie.id,
    );

    const jwt = Cookie.signJwt(userCookie);

    res
      .status(200)
      .cookie("user", jwt, Cookie.cookieOptions())
      .end();
  }

  async recoverManyItem(
    req: Request,
    res: Response,
  ) {
    // get cookie data already validate by db call
    const userCookie: TCookieMiddleware =
      req.cookies.userJwt;

    const schema =
      FormValidator.inspectRecoverManyItemData(
        req.params.key as string,
        req.body.ids,
      );

    await FormService.recoverManyItem(
      schema.key,
      schema.ids,
      userCookie.id,
    );

    const jwt = Cookie.signJwt(userCookie);

    res
      .status(200)
      .cookie("user", jwt, Cookie.cookieOptions())
      .end();
  }
}
