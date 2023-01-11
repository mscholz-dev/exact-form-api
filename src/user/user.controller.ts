import { Request, Response } from "express";
import AppError from "../utils/AppError.js";
import errorCode from "../utils/errorCode.js";
import xss from "xss";
import { handleValidator } from "../utils/form.js";

import Service from "./user.service.js";
const UserService = new Service();

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
      const errorMessage = handleValidator(
        item[0],
        req.body[item[0]],
      );

      if (errorMessage.length !== 0)
        throw new AppError(
          errorCode.TEST,
          errorMessage,
          400,
        );

      reqData[item[0] as keyof Create] = xss(
        req.body[item[0]],
      );
    });

    if (reqData.password !== reqData.password2)
      throw new AppError(
        errorCode.TEST,
        "passwords not matching",
        400,
      );

    const user = await UserService.create(
      reqData,
    );

    console.log(user);

    res.status(200).end();
  }
}
