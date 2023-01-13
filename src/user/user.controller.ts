import { Request, Response } from "express";
import AppError from "../utils/AppError.js";
import xss from "xss";

import Service from "./user.service.js";
const UserService = new Service();

import ValidatorClass from "../utils/Validator.js";
const Validator = new ValidatorClass();

import CookieClass from "../utils/Cookie.js";
const Cookie = new CookieClass();

type Create = {
  username: string;
  email: string;
  password: string;
  password2: string;
};

export default class UserController {
  async create(req: Request, res: Response) {
    const reqData: Create = {
      username: "",
      email: "",
      password: "",
      password2: "",
    };

    Object.entries(reqData).forEach((item) => {
      const errorMessage = Validator.errorMessage(
        item[0],
        req.body[item[0]],
      );

      if (errorMessage.length !== 0)
        throw new AppError(errorMessage, 400);

      reqData[item[0] as keyof Create] = xss(
        req.body[item[0]],
      );
    });

    if (reqData.password !== reqData.password2)
      throw new AppError(
        "passwords not matching",
        400,
      );

    const user = await UserService.create(
      reqData,
    );

    const jwt = Cookie.signJwt(user);

    res
      .status(200)
      .cookie("user", jwt, Cookie.cookieOptions())
      .end();
  }
}
