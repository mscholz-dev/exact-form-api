import { Request, Response } from "express";
// import AuthServiceClass from "./auth.service.js";
import CookieClass from "../utils/Cookie.js";
import AuthValidatorClass from "../utils/validator/AuthValidator.js";

// classes
// const AuthService = new AuthServiceClass();
const Cookie = new CookieClass();
const AuthValidator = new AuthValidatorClass();

export default class AuthController {
  async index(req: Request, res: Response) {
    console.log("test");
    // validate for prevent hacked cookies
    // const schema = AuthValidator.inspectCookieData()
  }
}
