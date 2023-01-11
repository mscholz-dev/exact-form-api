import { Request, Response } from "express";
import AppError from "../utils/AppError.js";
import errorCode from "../utils/errorCode.js";
import xss from "xss";
import argon from "argon2";

export default class UserController {
  async createUser(req: Request, res: Response) {
    const reqData = {
      username: "",
      email: "",
      password: "",
      password2: "",
    };

    console.log(req.body);

    Object.entries(reqData).forEach((item) => {
      // console.log(xss(req.body[item[0]]));
      // reqData[item[0]] = xss(req.body[item[0]]);
    });

    console.log(reqData);

    // throw new AppError(
    //   errorCode.TEST,
    //   "Message",
    //   400,
    // );

    res.status(200).send("ok");
  }
}
